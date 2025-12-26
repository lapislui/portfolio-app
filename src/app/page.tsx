import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import EducationSection from '../components/EducationSection';
import ExperienceSection from '../components/ExperienceSection';
import SkillsSection from '../components/SkillsSection';
import GitHubActivitySection from '../components/GitHubActivitySection';
import CertificatesSection from '../components/CertificatesSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import ClientOnlyThreeDScene from '../components/ClientOnlyThreeDScene';
import FloatingResumeButton from '../components/FloatingResumeButton';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 z-0">
        <ClientOnlyThreeDScene />
      </div>
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <EducationSection />
          <ExperienceSection />
          <SkillsSection />
          <GitHubActivitySection />
          <CertificatesSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <FloatingResumeButton />
      </div>
    </div>
  );
}
