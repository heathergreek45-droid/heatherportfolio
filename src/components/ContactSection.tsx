import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import DownloadPortfolioButton from "./DownloadPortfolioButton";

const ContactSection = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const contactInfo = [
    { icon: Mail, title: t("contact.label_email"), value: "heathergreek45@gmail.com", href: "mailto:heathergreek45@gmail.com" },
    { icon: Linkedin, title: t("contact.label_linkedin"), value: "linkedin.com/in/heather-greek", href: "https://www.linkedin.com/in/heather-greek-939b18228/" },
    { icon: Github, title: t("contact.label_github"), value: "heathergreek45-droid", href: "https://github.com/heathergreek45-droid" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;

    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string).trim();
    const email = (formData.get("email") as string).trim();
    const subject = (formData.get("subject") as string).trim();
    const message = (formData.get("message") as string).trim();

    if (!name || !email || !message) {
      toast.error(t("contact.toast_fields"));
      return;
    }

    setSending(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: { name, email, subject: subject || "No subject", message },
      });
      if (error) throw error;

      setSubmitted(true);
      toast.success(t("contact.toast_success"));
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error("Failed to send message:", err);
      toast.error(t("contact.toast_error"));
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="font-heading text-4xl font-bold mb-4">
            {t("contact.get")} <span className="text-gradient">{t("contact.touch")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t("contact.subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="md:col-span-2 space-y-6">
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{t("contact.info_title")}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">{t("contact.info_subtitle")}</p>
            {contactInfo.map((item) => (
              <div key={item.title} className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-lg bg-gradient-theme flex items-center justify-center shrink-0">
                  <item.icon className="text-primary-foreground" size={20} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground/70 uppercase tracking-wider font-medium">{item.title}</p>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-foreground text-sm hover:text-primary transition-colors font-medium">
                    {item.value}
                  </a>
                </div>
              </div>
            ))}

            <DownloadPortfolioButton label="Download" className="mt-2 px-6 py-3 text-sm" />

          </motion.div>

          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="md:col-span-3 bg-card border border-border rounded-xl p-8 space-y-5">
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{t("contact.send_title")}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <input name="name" type="text" placeholder={t("contact.ph_name")} required className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition text-sm" />
              <input name="email" type="email" placeholder={t("contact.ph_email")} required className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition text-sm" />
            </div>
            <input name="subject" type="text" placeholder={t("contact.ph_subject")} className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition text-sm" />
            <textarea name="message" placeholder={t("contact.ph_message")} rows={5} required className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition resize-none text-sm" />
            <button type="submit" disabled={sending} className="inline-flex items-center gap-2 bg-gradient-theme hover:opacity-90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-opacity text-sm disabled:opacity-50">
              {sending ? t("contact.btn_sending") : submitted ? t("contact.btn_sent") : t("contact.btn_send")}
              <Send size={16} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
