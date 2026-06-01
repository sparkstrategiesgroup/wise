import { motion } from "framer-motion";
import Wise from "@/components/Wise";

export default function AboutSection() {
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
          our purpose
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-muted-foreground font-sans leading-relaxed mb-6"
        >
          <Wise /> exists to create a sacred space where women come together to
          reflect, grow, and elevate — not just themselves, but their families,
          communities, and the world around them.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground font-sans leading-relaxed"
        >
          Through guided reflections, intimate gatherings, and a supportive
          community, we help women live with greater intention, clarity, and
          courage.
        </motion.p>
      </div>
    </section>
  );
}
