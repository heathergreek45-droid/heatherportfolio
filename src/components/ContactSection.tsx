import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Linkedin, Github, Send } from "lucide-react";
import { useState } from "react";

const contactInfo = [
  { icon: Mail, title: "Email", value: "heathergreek45@gmail.com", href: "mailto:heathergreek45@gmail.com" },
  { icon: Phone, title: "Phone", value: "069 236 1759", href: "tel:0692361759" },
  { icon: MapPin, title: "Address", value: "39 Anemone Street, Ravensmead" },
  { icon: Linkedin, title: "LinkedIn", value: "linkedin.com/in/heather-greek", href: "https://linkedin.com/in/heather-greek-939b18228" },
  { icon: Github, title: "GitHub", value: "heathergreek45-droid", href: "https://github.com/heathergreek45-droid" },
];

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl font-bold mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg">Have a project in mind? Let's talk!</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {contactInfo.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-theme flex items-center justify-center shrink-0">
                  <item.icon className="text-primary-foreground" size={22} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground">{item.title}</h3>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-muted-foreground text-sm">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <input type="text" placeholder="Your Name" required className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition" />
            <input type="email" placeholder="Your Email" required className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition" />
            <textarea placeholder="Your Message" rows={4} required className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition resize-none" />
            <button type="submit" className="inline-flex items-center gap-2 bg-gradient-theme hover:opacity-90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-opacity w-full justify-center">
              {submitted ? "Sent!" : "Send Message"}
              <Send size={18} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
