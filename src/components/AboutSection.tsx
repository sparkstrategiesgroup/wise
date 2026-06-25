import { motion } from "framer-motion";
import Wise from "@/components/Wise";

export default function AboutSection() {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/images/about.jpg"
              alt="Women in conversation"
              className="rounded-xl w-full h-80 object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground mb-6 lowercase leading-tight">
              our purpose
            </h2>
            <p className="text-lg text-muted-foreground font-sans leading-relaxed mb-6">
              <Wise /> exists to create a sacred space where women come together to
              reflect, grow, and elevate — not just themselves, but their families,
              communities, and the world around them.
            </p>
            <p className="text-muted-foreground font-sans leading-relaxed">
              Through guided reflections, intimate gatherings, and a supportive
              community, we help women live with greater intention, clarity, and
              courage.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
