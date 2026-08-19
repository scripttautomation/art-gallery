import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Works from "./components/Works";
import Exhibitions from "./components/Exhibitions";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

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
        <Cursor />
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <Works />
          <Exhibitions />
          <About />
          <Contact />
        </main>
        <Footer />
        <div className="noise-overlay" aria-hidden />
      </div>
    </MotionConfig>
  );
}
