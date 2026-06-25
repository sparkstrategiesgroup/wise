import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Wise from "@/components/Wise";

interface HeroSectionProps {
  onOpenReflection: () => void;
}

export default function HeroSection({ onOpenReflection }: HeroSectionProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-lavender/70" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lilac font-sans text-sm font-medium tracking-[0.2em] uppercase mb-6"
        >
          A Community of Intentional Women
        </motion.p>
        <h1 className="text-6xl md:text-8xl font-serif font-semibold text-white mb-6 leading-tight">
          Wise
        </h1>
        <p className="text-lg md:text-xl text-white/90 font-serif italic max-w-xl mx-auto mb-3">
          living with intention
        </p>
        <p className="text-white/80 font-sans max-w-lg mx-auto mb-3">
          A private collective for women who lead with purpose, grow with
          intention, and rise together.
        </p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-taupe font-sans text-sm tracking-wide mb-10"
        >
          Join 40+ women leading with purpose
        </motion.p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/assessment">
            <Button variant="gold" size="lg">
              Take the Assessment
            </Button>
          </Link>
          <Link to="/framework">
            <Button
              variant="elegant"
              size="lg"
              className="border-white/40 text-white hover:bg-white/10 hover:border-white/60"
            >
              Explore the Framework
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
