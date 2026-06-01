import { motion } from "framer-motion";
import Wise from "@/components/Wise";

export default function BrandNarrativeSection() {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-serif font-semibold text-foreground mb-8 lowercase leading-tight"
        >
          our story
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-muted-foreground font-sans leading-relaxed"
        >
          <Wise /> was born from a simple truth: when women come together with
          intention, extraordinary things happen. What began as a small circle
          of women seeking deeper purpose has grown into a movement — a
          collective committed to living wisely, leading authentically, and
          rising together.
        </motion.p>
      </div>
    </section>
  );
}
