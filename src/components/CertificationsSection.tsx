import { motion } from "framer-motion";
import { Award } from "lucide-react";

const certifications = [
  {
    category: "Web Development",
    courses: [
      { name: "Introduction to Front-End Development", issuer: "Meta" },
      { name: "Introduction to HTML5", issuer: "University of Michigan" },
      { name: "Introduction to CSS3", issuer: "University of Michigan" },
      { name: "Advanced Styling with Responsive Design", issuer: "University of Michigan" },
      { name: "Interactivity with JavaScript", issuer: "University of Michigan" },
    ],
  },
  {
    category: "AI & Machine Learning",
    courses: [
      { name: "Introduction to Artificial Intelligence (AI)", issuer: "IBM" },
      { name: "AI For Everyone", issuer: "DeepLearning.AI" },
      { name: "Introduction to Generative AI", issuer: "Coursera" },
      { name: "Supervised Machine Learning: Regression and Classification", issuer: "DeepLearning.AI" },
      { name: "Advanced Learning Algorithms", issuer: "DeepLearning.AI" },
      { name: "Trustworthy AI: Managing Bias, Ethics, and Accountability", issuer: "Johns Hopkins University" },
    ],
  },
  {
    category: "Professional Skills",
    courses: [
      { name: "Verbal Communications and Presentation Skills", issuer: "Starweaver" },
      { name: "Negotiation Skills: Negotiate and Resolve Conflict", issuer: "Macquarie University" },
      { name: "Solving Problems with Creative and Critical Thinking", issuer: "IBM" },
      { name: "Developing Interpersonal Skills", issuer: "IBM" },
      { name: "Preparation for Job Interviews", issuer: "Coursera" },
      { name: "Introduction to Personal Branding", issuer: "University of Virginia" },
      { name: "Finding Your Professional Voice: Confidence & Impact", issuer: "University of London" },
      { name: "Work Smarter, Not Harder: Time Management", issuer: "UC Irvine" },
    ],
  },
  {
    category: "Leadership & Psychology",
    courses: [
      { name: "Grit and Growth Mindset", issuer: "Arizona State University" },
      { name: "Emotional Intelligence", issuer: "Arizona State University" },
      { name: "Positive Psychology: Resilience Skills", issuer: "University of Pennsylvania" },
      { name: "Managing Conflicts with Cultural and Emotional Intelligence", issuer: "University of Maryland" },
      { name: "Leading with Impact: Team Dynamics, Strategy and Ethics", issuer: "Coursera" },
      { name: "Psychology of the Self", issuer: "American Psychological Association" },
    ],
  },
  {
    category: "Finance",
    courses: [
      { name: "Financial Planning for Young Adults", issuer: "University of Illinois Urbana-Champaign" },
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
                    <div>
                      <p className="text-sm font-medium text-foreground">{course.name}</p>
                      <p className="text-xs text-muted-foreground">{course.issuer}</p>
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
