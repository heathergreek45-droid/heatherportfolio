import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send } from "lucide-react";
import { useState } from "react";

const contactInfo = [
  { icon: Mail, title: "Email", value: "heathergreek45@gmail.com", href: "mailto:heathergreek45@gmail.com" },
  { icon: Linkedin, title: "LinkedIn", value: "linkedin.com/in/heather-greek", href: "https://www.linkedin.com/in/heather-greek-939b18228/" },
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
      <div className="max-w-5xl mx-auto">
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
          <p className="text-muted-foreground text-lg">
            I'd love to hear from you. Whether you have a project in mind or just want to connect, feel free to reach out.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 space-y-6"
          >
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Contact Information</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Feel free to reach out through any of the channels below. I typically respond within 24 hours.
            </p>
            {contactInfo.map((item) => (
              <div key={item.title} className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-lg bg-gradient-theme flex items-center justify-center shrink-0">
                  <item.icon className="text-primary-foreground" size={20} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground/70 uppercase tracking-wider font-medium">{item.title}</p>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-foreground text-sm hover:text-primary transition-colors font-medium">
                    {item.value}
                  </a>
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
            className="md:col-span-3 bg-card border border-border rounded-xl p-8 space-y-5"
          >
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Send a Message</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" required className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition text-sm" />
              <input type="email" placeholder="Email Address" required className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition text-sm" />
            </div>
            <input type="text" placeholder="Subject" className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition text-sm" />
            <textarea placeholder="Your Message" rows={5} required className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition resize-none text-sm" />
            <button type="submit" className="inline-flex items-center gap-2 bg-gradient-theme hover:opacity-90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-opacity text-sm">
              {submitted ? "Message Sent!" : "Send Message"}
              <Send size={16} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
