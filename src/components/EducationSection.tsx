import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";

const EducationSection = () => {
  const { t } = useTranslation();

  const entries = [
    {
      school: "CAPACITI",
      degree: "Web Developer",
      dates: "October 2025 – April 2026",
    },
    {
      school: "Florida High School",
      degree: "",
      dates: "January 2017 – December 2021",
    },
  ];

  return (
    <section id="education" className="py-24 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl font-bold mb-4">
            <span className="text-gradient">{t("education.title")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t("education.subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.school}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-theme flex items-center justify-center shrink-0">
                  <GraduationCap className="text-primary-foreground" size={20} />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {entry.school}
                </h3>
              </div>
              {entry.degree && (
                <p className="text-foreground font-medium mb-2">{entry.degree}</p>
              )}
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Calendar size={14} className="shrink-0" />
                <span>{entry.dates}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
