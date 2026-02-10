import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Submit Project Files",
    description: "A project submission system for organizing and uploading project files efficiently.",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/heathergreek45-droid/Submitprojectfiles",
  },
  {
    title: "Heather's Calculator",
    description: "A clean, functional calculator application built from scratch with a modern interface.",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/heathergreek45-droid/heatherscalculator",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-6 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl font-bold mb-4">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg">A selection of things I've built</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="h-2 w-16 bg-gradient-theme rounded-full mb-5" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
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
