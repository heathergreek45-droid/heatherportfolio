import { motion } from "framer-motion";
import { Code, Layout, Smartphone } from "lucide-react";
import { useTranslation } from "react-i18next";

const AboutSection = () => {
  const { t } = useTranslation();
  const highlights = [
    { icon: Code, title: t("about.h1"), desc: t("about.h1d") },
    { icon: Layout, title: t("about.h2"), desc: t("about.h2d") },
    { icon: Smartphone, title: t("about.h3"), desc: t("about.h3d") },
  ];

  return (
    <section id="about" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
            {t("about.title")} <span className="text-gradient">{t("about.me")}</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="space-y-5">
            <p className="text-muted-foreground text-lg leading-relaxed">{t("about.p1")}</p>
            <p className="text-muted-foreground text-lg leading-relaxed">{t("about.p2")}</p>
            <p className="text-muted-foreground text-lg leading-relaxed">{t("about.p3")}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="grid gap-5">
            {highlights.map((item) => (
              <div key={item.title} className="flex items-start gap-4 bg-card border border-border rounded-xl p-5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-gradient-theme flex items-center justify-center shrink-0">
                  <item.icon className="text-primary-foreground" size={24} />
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
