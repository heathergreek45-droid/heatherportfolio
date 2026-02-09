import { motion } from "framer-motion";
import { Globe } from "lucide-react";

const languages = [
  { name: "Afrikaans", level: "Native or bilingual proficiency", percent: 100 },
  { name: "English", level: "Full professional proficiency", percent: 90 },
];

const LanguagesSection = () => {
  return (
    <section id="languages" className="py-24 px-6 bg-muted/50">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
            <span className="text-gradient">Languages</span>
          </h2>
          <p className="text-muted-foreground text-lg">I communicate fluently in multiple languages.</p>
        </motion.div>

        <div className="space-y-8">
          {languages.map((lang, i) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Globe className="text-primary" size={20} />
                <span className="font-heading font-semibold text-foreground">{lang.name}</span>
                <span className="text-muted-foreground text-sm ml-auto">{lang.level}</span>
              </div>
              <div className="h-3 bg-border rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-theme"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LanguagesSection;
