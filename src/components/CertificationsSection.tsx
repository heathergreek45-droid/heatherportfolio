import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

const certifications = [
  {
    category: "Web Development",
    courses: [
      { name: "Introduction to Front-End Development", issuer: "Meta", credentialId: "7BF0ABEL1OWL" },
      { name: "Introduction to HTML5", issuer: "University of Michigan", credentialId: "UWHE6VNDIQLZ" },
      { name: "Introduction to CSS3", issuer: "University of Michigan", credentialId: "2S8S9ECNAXQ0" },
      { name: "Advanced Styling with Responsive Design", issuer: "University of Michigan", credentialId: "XLGYBITSY3T5" },
      { name: "Interactivity with JavaScript", issuer: "University of Michigan", credentialId: "39NJLPQJRMDK" },
    ],
  },
  {
    category: "AI & Machine Learning",
    courses: [
      { name: "Introduction to Artificial Intelligence (AI)", issuer: "IBM", credentialId: "B8LAIFSVRBNB" },
      { name: "AI For Everyone", issuer: "DeepLearning.AI", credentialId: "04YSH1U38AJC" },
      { name: "Introduction to Generative AI", issuer: "Coursera", credentialId: "" },
      { name: "Supervised Machine Learning: Regression and Classification", issuer: "DeepLearning.AI", credentialId: "MTRAH45Z3NWN" },
      { name: "Advanced Learning Algorithms", issuer: "DeepLearning.AI", credentialId: "TOHC7NF0KVEP" },
      { name: "Trustworthy AI: Managing Bias, Ethics, and Accountability", issuer: "Johns Hopkins University", credentialId: "3E1YG01C0H4D" },
    ],
  },
  {
    category: "Professional Skills",
    courses: [
      { name: "Verbal Communications and Presentation Skills", issuer: "Starweaver", credentialId: "ZN25HRMQIQ0I" },
      { name: "Negotiation Skills: Negotiate and Resolve Conflict", issuer: "Macquarie University", credentialId: "SFDZF8N32ZUR" },
      { name: "Solving Problems with Creative and Critical Thinking", issuer: "IBM", credentialId: "82IS65K4D760" },
      { name: "Developing Interpersonal Skills", issuer: "IBM", credentialId: "GJ9HK7L1LJAR" },
      { name: "Preparation for Job Interviews", issuer: "Coursera", credentialId: "H1YHNINXB9NF" },
      { name: "Introduction to Personal Branding", issuer: "University of Virginia", credentialId: "XHHMY6E99HDR" },
      { name: "Finding Your Professional Voice: Confidence & Impact", issuer: "University of London", credentialId: "KVOB39IG4PMR" },
      { name: "Work Smarter, Not Harder: Time Management", issuer: "UC Irvine", credentialId: "PWWKDCM47EVC" },
    ],
  },
  {
    category: "Leadership & Psychology",
    courses: [
      { name: "Grit and Growth Mindset", issuer: "Arizona State University", credentialId: "SGZSPC92MMSG" },
      { name: "Emotional Intelligence", issuer: "Arizona State University", credentialId: "SEKB96KEQ5M1" },
      { name: "Positive Psychology: Resilience Skills", issuer: "University of Pennsylvania", credentialId: "39N2N218DGQZ" },
      { name: "Managing Conflicts with Cultural and Emotional Intelligence", issuer: "University of Maryland", credentialId: "A4LBSC92C239" },
      { name: "Leading with Impact: Team Dynamics, Strategy and Ethics", issuer: "Coursera", credentialId: "WQ6XD3IH6YIN" },
      { name: "Psychology of the Self", issuer: "American Psychological Association", credentialId: "VLSXP53OGJIJ" },
    ],
  },
  {
    category: "Finance",
    courses: [
      { name: "Financial Planning for Young Adults", issuer: "University of Illinois Urbana-Champaign", credentialId: "0B1OCCJTEJNL" },
    ],
  },
];

const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-24 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl font-bold mb-4">
            <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {certifications.reduce((sum, cat) => sum + cat.courses.length, 0)} courses completed on Coursera
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {certifications.map((category, ci) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: ci * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-gradient-theme flex items-center justify-center shrink-0">
                  <Award className="text-primary-foreground" size={20} />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {category.category}
                </h3>
              </div>
              <ul className="space-y-3">
                {category.courses.map((course) => (
                  <li key={course.name} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{course.name}</p>
                      <p className="text-xs text-muted-foreground">{course.issuer}</p>
                      {course.credentialId && (
                        <a
                          href={`https://www.coursera.org/account/accomplishments/verify/${course.credentialId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(
                              `https://www.coursera.org/account/accomplishments/verify/${course.credentialId}`,
                              '_blank',
                              'noopener,noreferrer'
                            );
                          }}
                          className="inline-flex items-center gap-1 text-xs text-primary hover:text-accent transition-colors font-medium mt-1"
                        >
                          <ExternalLink size={12} />
                          View Credential
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
