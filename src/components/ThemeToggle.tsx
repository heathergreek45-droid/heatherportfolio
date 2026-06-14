import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const getInitialTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const ThemeToggle = ({ className = "" }: { className?: string }) => {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background text-foreground hover:bg-muted transition-colors font-medium text-sm ${className}`}
    >
      {isDark ? <Sun size={18} className="text-accent" /> : <Moon size={18} className="text-primary" />}
      <span className="hidden sm:inline">{isDark ? "Light Mode" : "Dark Mode"}</span>
      <span className="sm:hidden">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
};

export default ThemeToggle;
