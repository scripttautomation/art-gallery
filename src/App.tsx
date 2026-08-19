import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import Logo from "./components/Logo";
import Hero from "./components/Hero";
import Works from "./components/Works";
import About from "./components/About";
import Contact from "./components/Contact";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[85] h-[2px] origin-left bg-gradient-to-r from-golddeep via-gold to-goldbright"
      style={{ scaleX }}
      aria-hidden
    />
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-ink font-sans text-bone antialiased">
        <ScrollProgress />

        {/* fixed brand mark */}
        <a
          href="#top"
          aria-label="Artist — back to top"
          className="fixed left-5 top-5 z-[70] transition-transform duration-500 hover:scale-110 md:left-8 md:top-7"
        >
          <Logo size={46} />
        </a>

        <main>
          <Hero />
          <Works />
          <About />
          <Contact />
        </main>
        <div className="noise-overlay" aria-hidden />
      </div>
    </MotionConfig>
  );
}
