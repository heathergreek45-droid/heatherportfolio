import { motion } from "framer-motion";
import { Code, Layout, Smartphone } from "lucide-react";

const highlights = [
  { icon: Code, title: "Clean Code", desc: "Writing readable, maintainable code." },
  { icon: Layout, title: "Responsive Design", desc: "Pixel-perfect on every screen size." },
  { icon: Smartphone, title: "Modern Web Apps", desc: "Interactive, fast user experiences." },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            I'm a passionate web developer who loves turning ideas into reality through code.
            I focus on building responsive websites and web applications that deliver great user experiences.
            I enjoy learning new technologies and I'm always open to expanding my skills. I'm a fast learner,
            highly motivated, and I adapt quickly to new challenges.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg mt-4">
            I take pride in writing clean, efficient code and solving problems creatively. I'm detail-oriented,
            reliable, and I work well both independently and as part of a team. My goal is to continue growing
            as a developer while creating modern, functional, and user-friendly digital solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-card border border-border rounded-xl p-8 text-center hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-14 h-14 mx-auto mb-5 rounded-lg bg-gradient-theme flex items-center justify-center">
                <item.icon className="text-primary-foreground" size={28} />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
