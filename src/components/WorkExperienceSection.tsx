import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    title: "Web Developer Trainee",
    company: "CAPACITI",
    dates: "October 2025 – April 2026",
    description:
      "Completing an intensive web development program focused on modern front-end and back-end technologies. Building real-world projects using React, TypeScript, Tailwind CSS, and Supabase while collaborating with peers on team challenges.",
  },
  {
    title: "Freelance Web Developer",
    company: "Self-Employed",
    dates: "2025 – Present",
    description:
      "Designing and developing responsive websites and web applications for small clients and personal projects. Delivering clean, accessible UIs with a focus on performance, modern design standards, and reliable deployment workflows.",
  },
];

const WorkExperienceSection = () => {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl font-bold mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            My professional journey and the roles that shaped me.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={`${exp.company}-${exp.title}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-theme flex items-center justify-center shrink-0">
                    <Briefcase className="text-primary-foreground" size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {exp.title}
                    </h3>
                    <p className="text-primary text-sm font-medium">{exp.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Calendar size={14} className="shrink-0" />
                  <span>{exp.dates}</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperienceSection;
