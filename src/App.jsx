import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowUp } from 'react-icons/hi';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Terminal from './components/Terminal';
import Contact from './components/Contact';
import Footer from './components/Footer';

/* ─── Loading Screen ─── */
const LoadingScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <motion.div
        className="loading-screen__logo"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span style={{ color: 'var(--accent-cyan)' }}>&lt;</span>
        <span className="gradient-text">Ram</span>
        <span style={{ color: 'var(--accent-cyan)' }}>/&gt;</span>
      </motion.div>
      <div className="loading-screen__bar-wrapper">
        <div className="loading-screen__bar" />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-code)', fontSize: '0.8rem' }}
      >
        Loading awesomeness...
      </motion.p>
    </motion.div>
  );
};

/* ─── Section Divider ─── */
const SectionDivider = () => <div className="section-divider" />;

/* ─── Main App ─── */
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const cursorRef = useRef(null);

  // Scroll progress & back-to-top
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollProgress(progress);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cursor glow
  useEffect(() => {
    const handleMouse = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* Scroll progress bar */}
          <div
            className="scroll-progress"
            style={{ width: `${scrollProgress}%` }}
          />

          {/* Cursor glow */}
          <div ref={cursorRef} className="cursor-glow" />

          <Navbar />
          <main>
            <Hero />
            <SectionDivider />
            <About />
            <SectionDivider />
            <Skills />
            <SectionDivider />
            <Projects />
            <SectionDivider />
            <Terminal />
            <SectionDivider />
            <Contact />
          </main>
          <Footer />

          {/* Back to top */}
          <button
            className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <HiArrowUp />
          </button>
        </>
      )}
    </>
  );
}

export default App;
