import { motion } from "framer-motion";
import { Code, Layout, Smartphone } from "lucide-react";

const highlights = [
  { icon: Code, title: "Clean Code", desc: "Writing readable, maintainable, and efficient code." },
  { icon: Layout, title: "Responsive Design", desc: "Pixel-perfect interfaces across all devices." },
  { icon: Smartphone, title: "Modern Web Apps", desc: "Interactive, performant user experiences." },
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
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <p className="text-muted-foreground text-lg leading-relaxed">
              I am a dedicated web developer with a strong focus on building responsive, user-friendly websites
              and web applications. I am committed to delivering high-quality work that meets both functional
              requirements and modern design standards.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              I write clean, efficient code and approach every project with attention to detail and a
              problem-solving mindset. I thrive in collaborative environments and adapt quickly to new
              technologies and challenges.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              My goal is to continuously grow as a developer while creating impactful digital solutions
              that provide real value to users and businesses alike.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid gap-5"
          >
            {highlights.map((item, i) => (
              <div
                key={item.title}
                className="flex items-start gap-4 bg-card border border-border rounded-xl p-5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
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
