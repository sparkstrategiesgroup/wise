import { motion } from "framer-motion";
import { Sparkles, Target, Heart, Users } from "lucide-react";

const pillars = [
  {
    key: "wisdom",
    icon: Sparkles,
    title: "Wisdom",
    description:
      "Cultivate discernment and insight through reflection, mentorship, and shared experience.",
  },
  {
    key: "integrity",
    icon: Target,
    title: "Integrity",
    description:
      "Align your actions with your values. Lead authentically in every area of life.",
  },
  {
    key: "strength",
    icon: Heart,
    title: "Strength",
    description:
      "Build resilience and courage. Embrace challenges as catalysts for growth.",
  },
  {
    key: "elevation",
    icon: Users,
    title: "Elevation",
    description:
      "Lift others as you rise. Create ripple effects of positive change in your community.",
  },
];

export default function PillarsSection() {
  return (
    <section className="py-20 px-6 bg-secondary">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-serif font-semibold text-foreground mb-4 text-center lowercase leading-tight"
        >
          the four pillars
        </motion.h2>
        <p className="text-muted-foreground font-sans text-center mb-12 max-w-lg mx-auto">
          The W.I.S.E. framework is built on four pillars that guide our
          journey of intentional growth.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-background rounded-lg p-8 border border-border hover:border-gold/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <pillar.icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground">
                  {pillar.title}
                </h3>
              </div>
              <p className="text-muted-foreground font-sans leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
