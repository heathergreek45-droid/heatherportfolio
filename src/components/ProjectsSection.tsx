import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useTranslation } from "react-i18next";

const ProjectsSection = () => {
  const { t } = useTranslation();
  const projects = [
    { title: "Nova Web Design", descKey: "d_nova", tags: ["HTML", "CSS", "JavaScript"], live: "https://novawebz.netlify.app/" },
    { title: "AI Learning Machine", descKey: "d_ai", tags: ["AI", "Zapier", "Automation"], live: "https://ai-concept-bot.zapier.app/Learning" },
    { title: "Community Crime Watch", descKey: "d_crime", tags: ["HTML", "CSS", "JavaScript"], live: "https://jay-28070.github.io/Community-Crime-Watch/" },
    { title: "AI Eye Health Analyzer", descKey: "d_eye", tags: ["Figma", "UI/UX", "AI"], live: "https://www.figma.com/proto/thTajjR3DACaJFciK3z9zz/AI4nEye?node-id=1-2&starting-point-node-id=1%3A2" },
    { title: "Submit Project Files", descKey: "d_submit", tags: ["HTML", "CSS", "JavaScript"], github: "https://github.com/heathergreek45-droid/Submitprojectfiles" },
    { title: "Heather's Calculator", descKey: "d_calc", tags: ["HTML", "CSS", "JavaScript"], github: "https://github.com/heathergreek45-droid/heatherscalculator" },
  ] as const;

  return (
    <section id="projects" className="py-24 px-6 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="font-heading text-4xl font-bold mb-4">
            {t("projects.my")} <span className="text-gradient">{t("projects.projects")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t("projects.subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div key={project.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="group bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/5">
              <div className="h-2 w-16 bg-gradient-theme rounded-full mb-5" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{t(`projects.${project.descKey}`)}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">{tag}</span>
                ))}
              </div>
              <div className="flex gap-4">
                {"live" in project && project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.preventDefault(); window.open(project.live, "_blank", "noopener,noreferrer"); }} className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-accent transition-colors font-medium">
                    <ExternalLink size={18} />
                    {t("projects.view_live")}
                  </a>
                )}
                {"github" in project && project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.preventDefault(); window.open(project.github as string, "_blank", "noopener,noreferrer"); }} className="text-muted-foreground hover:text-primary transition-colors">
                    <Github size={20} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
