import { motion } from "framer-motion";

const skills = [
  "Teamwork", "Communication", "Programming",
  "Time Management", "Problem Solving", "Networking",
  "HTML", "CSS", "JavaScript",
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 px-6 bg-muted/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-muted-foreground text-lg">What I bring to every project.</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="px-6 py-3 rounded-full bg-gradient-theme text-primary-foreground font-medium text-sm shadow-md"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
