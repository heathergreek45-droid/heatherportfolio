// Standalone Playwright PDF + theme verification used by CI and locally.
// Boots `vite preview` against a production build, then asserts:
//  - localStorage theme persistence survives a reload
//  - Generated PDF is A4 portrait (210x297mm)
//  - Download fires with expected filename
//  - Single-page range subsetting works
// Writes a short verification report to ./pdf-verification/report.txt and saves the PDF.

import { chromium } from "playwright";
import { PDFDocument } from "pdf-lib";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("pdf-verification");
const BASE = process.env.BASE_URL || "http://127.0.0.1:4173";

async function main() {
  await mkdir(OUT, { recursive: true });
  const lines: string[] = [];
  const log = (s: string) => {
    console.log(s);
    lines.push(s);
  };

  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 1800 }, acceptDownloads: true });
  const page = await ctx.newPage();
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

  log(`# PDF / Theme verification`);
  log(`Base URL: ${BASE}`);
  log(`Started: ${new Date().toISOString()}`);
  log("");

  await page.goto(BASE + "/", { waitUntil: "networkidle" });

  // --- Theme persistence ---
  const initial = await page.evaluate(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );
  await page.locator('button[aria-label^="Switch to"]').first().click();
  await page.waitForTimeout(200);
  const toggled = await page.evaluate(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );
  const stored = await page.evaluate(() => localStorage.getItem("theme"));
  if (toggled === initial) throw new Error("Theme toggle did not change theme");
  if (stored !== toggled) throw new Error(`localStorage(${stored}) != toggled(${toggled})`);
  await page.reload({ waitUntil: "networkidle" });
  const afterReload = await page.evaluate(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );
  if (afterReload !== toggled) throw new Error("Theme did not persist after reload");
  log(`✓ Theme persistence: ${initial} -> ${toggled} -> reload kept ${afterReload}`);

  // --- Generate PDF preview ---
  await page.getByTestId("download-portfolio-btn").click();
  await page.waitForSelector('[data-testid="confirm-download-btn"]', { timeout: 90_000 });
  const src = await page.locator('[data-testid="pdf-preview-iframe"]').getAttribute("src");
  if (!src) throw new Error("No preview iframe src");

  const pdfB64 = await page.evaluate(async (url: string) => {
    const r = await fetch(url);
    const b = await r.arrayBuffer();
    let s = "";
    const u = new Uint8Array(b);
    for (let i = 0; i < u.length; i++) s += String.fromCharCode(u[i]);
    return btoa(s);
  }, src);
  const fullBytes = Uint8Array.from(atob(pdfB64), (c) => c.charCodeAt(0));
  await writeFile(path.join(OUT, "portfolio-full.pdf"), fullBytes);

  const fullDoc = await PDFDocument.load(fullBytes);
  const p0 = fullDoc.getPage(0);
  const wMm = (p0.getWidth() * 25.4) / 72;
  const hMm = (p0.getHeight() * 25.4) / 72;
  if (Math.abs(wMm - 210) > 2 || Math.abs(hMm - 297) > 2)
    throw new Error(`Not A4: ${wMm}x${hMm}mm`);
  if (hMm <= wMm) throw new Error("Not portrait");
  log(
    `✓ PDF page size: ${wMm.toFixed(1)} x ${hMm.toFixed(1)} mm (A4 portrait), ${fullDoc.getPageCount()} pages, ${fullBytes.byteLength} bytes`
  );

  // --- Range subsetting: single page ---
  await page.getByTestId("range-single").click();
  await page.waitForTimeout(1500);
  const singleSrc = await page.locator('[data-testid="pdf-preview-iframe"]').getAttribute("src");
  const singleB64 = await page.evaluate(async (url: string) => {
    const r = await fetch(url);
    const b = await r.arrayBuffer();
    let s = "";
    const u = new Uint8Array(b);
    for (let i = 0; i < u.length; i++) s += String.fromCharCode(u[i]);
    return btoa(s);
  }, singleSrc);
  const singleBytes = Uint8Array.from(atob(singleB64), (c) => c.charCodeAt(0));
  const singleDoc = await PDFDocument.load(singleBytes);
  if (singleDoc.getPageCount() !== 1)
    throw new Error(`Single-page range returned ${singleDoc.getPageCount()} pages`);
  log(`✓ Single-page range: 1 page, ${singleBytes.byteLength} bytes`);

  // --- Download triggers ---
  const [dl] = await Promise.all([
    page.waitForEvent("download"),
    page.getByTestId("confirm-download-btn").click(),
  ]);
  const suggested = dl.suggestedFilename();
  if (!/^heather-greek-portfolio.*\.pdf$/.test(suggested))
    throw new Error(`Unexpected download filename: ${suggested}`);
  log(`✓ Download triggered: ${suggested}`);

  if (errors.length) log(`! Console/page errors observed: ${errors.slice(0, 5).join(" | ")}`);

  await browser.close();
  log("");
  log("ALL CHECKS PASSED");
  await writeFile(path.join(OUT, "report.txt"), lines.join("\n") + "\n");
}

main().catch(async (err) => {
  console.error(err);
  await mkdir(OUT, { recursive: true }).catch(() => {});
  await writeFile(path.join(OUT, "report.txt"), `FAILED: ${err?.stack || err}\n`).catch(() => {});
  process.exit(1);
});
