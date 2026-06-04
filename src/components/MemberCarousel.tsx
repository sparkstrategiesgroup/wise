import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Profile = Tables<"profiles">;

export default function MemberCarousel() {
  const [members, setMembers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Profile | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchMembers() {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .not("avatar_url", "is", null)
        .not("quote", "is", null);
      setMembers(data || []);
      setLoading(false);
    }
    fetchMembers();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-6 bg-background overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-serif font-semibold text-foreground mb-10 text-center lowercase leading-tight">
            our community
          </h2>
          <div className="flex gap-4 justify-center">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-secondary animate-pulse shrink-0"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (members.length === 0) return null;

  const doubled = [...members, ...members];
  const avatarSize = 80;
  const gap = 16;
  const totalWidth = members.length * (avatarSize + gap);

  return (
    <section className="py-16 px-6 bg-background overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-serif font-semibold text-foreground mb-4 text-center lowercase leading-tight"
        >
          our community
        </motion.h2>
        <p className="text-muted-foreground font-sans text-center mb-10 max-w-md mx-auto">
          The women who make this collective extraordinary.
        </p>

        <div className="relative" ref={containerRef}>
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              style={{ gap: `${gap}px` }}
              animate={{ x: [0, -totalWidth] }}
              transition={{
                x: {
                  duration: 35,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {doubled.map((member, i) => (
                <button
                  key={`${member.id}-${i}`}
                  className="shrink-0 group relative cursor-pointer"
                  onClick={() =>
                    setSelected(selected?.id === member.id ? null : member)
                  }
                  onMouseEnter={() => setSelected(member)}
                  onMouseLeave={() => setSelected(null)}
                >
                  <img
                    src={member.avatar_url!}
                    alt={member.full_name || "Member"}
                    loading="lazy"
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-transparent group-hover:border-gold transition-colors duration-300"
                    style={{ willChange: "transform" }}
                  />
                </button>
              ))}
            </motion.div>
          </div>

          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 text-center"
            >
              <p className="text-foreground font-serif text-lg italic mb-1">
                &ldquo;{selected.quote}&rdquo;
              </p>
              <p className="text-gold font-sans text-sm font-medium">
                — {selected.full_name}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
