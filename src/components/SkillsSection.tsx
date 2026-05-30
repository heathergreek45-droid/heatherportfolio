import { motion } from "framer-motion";
import { Monitor, Server, Database, Wrench } from "lucide-react";
import { useTranslation } from "react-i18next";

const SkillsSection = () => {
  const { t } = useTranslation();
  const categories = [
    { icon: Monitor, title: t("skills.frontend"), skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Tailwind CSS", "Responsive Design"] },
    { icon: Server, title: t("skills.backend"), skills: ["Node.js", "Python", "Go", "Rust", "C#", "C++", "REST APIs", "Zapier Automation"] },
    { icon: Database, title: t("skills.database"), skills: ["SQL", "NoSQL", "PostgreSQL", "Supabase"] },
    { icon: Wrench, title: t("skills.tools"), skills: ["Git", "GitHub", "VS Code", "Figma", "Netlify", "Vite", "AI Tools"] },
  ];

  return (
    <section id="skills" className="py-24 px-6 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
            {t("skills.my")} <span className="text-gradient">{t("skills.stack")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t("skills.subtitle")}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div key={cat.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-theme flex items-center justify-center mb-5">
                <cat.icon className="text-primary-foreground" size={24} />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span key={skill} className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
