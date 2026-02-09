import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

const certifications = [
  { name: "Artificial Intelligence (AI) Bootcamp", issuer: "Coursera", id: "8mUsIhZYRCKlLCIWWLQi9g" },
  { name: "Version Control", issuer: "Meta", date: "Feb 2026", id: "TSLWDT4QTWPD" },
  { name: "Programming with JavaScript", issuer: "Meta", date: "Feb 2026", id: "G89M4WS62F32" },
  { name: "Introduction to Front-End Development", issuer: "Meta", date: "Jan 2026", id: "7BF0ABEL1OWL" },
  { name: "Advanced Styling with Responsive Design", issuer: "University of Michigan", date: "Jan 2026", id: "XLGYBITSY3T5" },
  { name: "Advanced Learning Algorithms", issuer: "DeepLearning.AI", date: "Jan 2026", id: "TOHC7NF0KVEP" },
  { name: "Introduction to CSS3", issuer: "University of Michigan", date: "Jan 2026", id: "2S8S9ECNAXQ0" },
  { name: "Interactivity with JavaScript", issuer: "University of Michigan", date: "Jan 2026", id: "39NJLPQJRMDK" },
  { name: "Grit and Growth Mindset", issuer: "Arizona State University", date: "Jan 2026", id: "SGZSPC92MMSG" },
  { name: "Negotiation Skills", issuer: "Macquarie University", date: "Jan 2026", id: "SFDZF8N32ZUR" },
  { name: "Creative and Critical Thinking", issuer: "IBM", date: "Jan 2026", id: "82IS65K4D760" },
  { name: "Positive Psychology: Resilience Skills", issuer: "University of Pennsylvania", date: "Jan 2026", id: "39N2N218DGQZ" },
  { name: "Managing Conflicts with Cultural & Emotional Intelligence", issuer: "University of Maryland", date: "Jan 2026", id: "A4LBSC92C239" },
  { name: "Psychology of the Self", issuer: "American Psychological Association", date: "Jan 2026", id: "VLSXP53OGJIJ" },
  { name: "Financial Planning for Young Adults", issuer: "University of Illinois", date: "Jan 2026", id: "0B1OCCJTEJNL" },
  { name: "Introduction to HTML5", issuer: "University of Michigan", date: "Jan 2026", id: "UWHE6VNDIQLZ" },
  { name: "Supervised Machine Learning", issuer: "DeepLearning.AI", date: "Dec 2025", id: "MTRAH45Z3NWN" },
  { name: "Preparation for Job Interviews", issuer: "Coursera", date: "Dec 2025", id: "H1YHNINXB9NF" },
  { name: "Trustworthy AI", issuer: "Johns Hopkins University", date: "Dec 2025", id: "3E1YG01C0H4D" },
  { name: "Verbal Communications & Presentation Skills", issuer: "Starweaver", date: "Dec 2025", id: "ZN25HRMQIQ0I" },
  { name: "Time Management for Productivity", issuer: "University of California, Irvine", date: "Nov 2025", id: "PWWKDCM47EVC" },
  { name: "Developing Interpersonal Skills", issuer: "IBM", date: "Nov 2025", id: "GJ9HK7L1LJAR" },
  { name: "Leading with Impact", issuer: "Coursera", date: "Nov 2025", id: "WQ6XD3IH6YIN" },
  { name: "Introduction to Personal Branding", issuer: "University of Virginia", date: "Nov 2025", id: "XHHMY6E99HDR" },
  { name: "Finding Your Professional Voice", issuer: "University of London", date: "Nov 2025", id: "KVOB39IG4PMR" },
  { name: "Emotional Intelligence", issuer: "Arizona State University", date: "Nov 2025", id: "SEKB96KEQ5M1" },
  { name: "Introduction to AI", issuer: "IBM", date: "Oct 2025", id: "B8LAIFSVRBNB" },
  { name: "AI For Everyone", issuer: "DeepLearning.AI", date: "Oct 2025", id: "04YSH1U38AJC" },
  { name: "Introduction to Generative AI", issuer: "Google Cloud", date: "Oct 2025", id: "KP1BAHKGL9V8" },
];

const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
            Licenses & <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-muted-foreground text-lg">{certifications.length}+ certifications from top institutions.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.5) }}
              className="group bg-card border border-border rounded-xl p-5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-theme flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="text-primary-foreground" size={18} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading text-sm font-semibold text-foreground leading-tight mb-1">{cert.name}</h3>
                  <p className="text-muted-foreground text-xs">{cert.issuer}</p>
                  {cert.date && <p className="text-muted-foreground/60 text-xs mt-1">{cert.date}</p>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
