import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './shared/ProtectedRoute';

// Admin Views
import Login from './admin/Login';
import Dashboard from './admin/Dashboard';
import ProjectsAdmin from './admin/ProjectsAdmin';

import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import TechStack from './components/TechStack/TechStack';
import Projects from './components/Projects/Projects';
import Certifications from './components/Certifications/Certifications';
import Timeline from './components/Timeline/Timeline';
import Media from './components/Media/Media';
import Contact from './components/Contact/Contact';

import SkillsAdmin from './admin/SkillsAdmin';
import CertsAdmin from './admin/CertsAdmin';
import AboutAdmin from './admin/AboutAdmin';
import VisibilityAdmin from './admin/VisibilityAdmin';
import ResumeAdmin from './admin/ResumeAdmin';
import TimelineAdmin from './admin/TimelineAdmin';

// Public Views
import Scene from './components/Hero/Scene';

function PublicLayout() {
  return (
    <div className="bg-[#0a0f1e] min-h-screen font-sora text-[#f0f6ff]">
      <Scene />
      <Navbar />
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Certifications />
      <Timeline />
      <Media />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout />} />
          
          <Route path="/admin" element={<Login />} />
          
          <Route path="/admin/*" element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<ProjectsAdmin />} />
            <Route path="skills" element={<SkillsAdmin />} />
            <Route path="certs" element={<CertsAdmin />} />
            <Route path="about" element={<AboutAdmin />} />
            <Route path="visibility" element={<VisibilityAdmin />} />
            <Route path="resume" element={<ResumeAdmin />} />
            <Route path="timeline" element={<TimelineAdmin />} />
            <Route path="*" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
