import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Wise from "@/components/Wise";

interface HeroSectionProps {
  onOpenReflection: () => void;
}

export default function HeroSection({ onOpenReflection }: HeroSectionProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-6 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent" />
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
          className="text-gold font-sans text-sm font-medium tracking-[0.2em] uppercase mb-6"
        >
          A Community of Intentional Women
        </motion.p>
        <h1 className="text-6xl md:text-8xl font-serif font-semibold text-foreground mb-6 lowercase leading-tight">
          <Wise />
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-sans max-w-xl mx-auto mb-4 leading-relaxed">
          Wisdom. Integrity. Strength. Elevation.
        </p>
        <p className="text-muted-foreground font-sans max-w-lg mx-auto mb-10">
          A private collective for women who lead with purpose, grow with
          intention, and rise together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="gold" size="lg" onClick={onOpenReflection}>
            Begin Your Reflection
          </Button>
          <Link to="/framework">
            <Button variant="elegant" size="lg">
              Explore the Framework
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
