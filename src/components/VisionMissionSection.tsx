import { motion } from "framer-motion";

export default function VisionMissionSection() {
  return (
    <section className="py-20 px-6 bg-secondary">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold font-sans text-sm font-medium tracking-[0.15em] uppercase mb-4">
              Our Vision
            </p>
            <h3 className="text-3xl font-serif font-semibold text-foreground mb-4 lowercase">
              a world where women lead with wisdom
            </h3>
            <p className="text-muted-foreground font-sans leading-relaxed">
              We envision a world where every woman has the tools, community,
              and confidence to live intentionally — making decisions rooted in
              wisdom, acting with integrity, drawing on inner strength, and
              elevating those around her.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-gold font-sans text-sm font-medium tracking-[0.15em] uppercase mb-4">
              Our Mission
            </p>
            <h3 className="text-3xl font-serif font-semibold text-foreground mb-4 lowercase">
              cultivating intentional growth
            </h3>
            <p className="text-muted-foreground font-sans leading-relaxed">
              To provide a transformative framework and supportive community
              that empowers women to reflect deeply, grow purposefully, and
              create meaningful impact in their lives and the lives of others.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
