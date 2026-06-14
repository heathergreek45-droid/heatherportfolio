import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import WorkExperienceSection from "@/components/WorkExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificationsSection from "@/components/CertificationsSection";
import LanguagesSection from "@/components/LanguagesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LanguageSwitcher />
      <div id="portfolio-root">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <EducationSection />
        <WorkExperienceSection />
        <ProjectsSection />
        <CertificationsSection />
        <LanguagesSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
