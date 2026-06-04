import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Profile = Tables<"profiles">;

export default function QuotesSection() {
  const [members, setMembers] = useState<Profile[]>([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuotes() {
      const { data, error } = await supabase
        .from("profiles")
        .select("*");
      if (error) {
        console.error("Failed to fetch quotes:", error);
      }
      const withQuotes = (data || []).filter((p) => p.quote).slice(0, 6);
      setMembers(withQuotes);
      setLoading(false);
    }
    fetchQuotes();
  }, []);

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % members.length);
  }, [members.length]);

  useEffect(() => {
    if (members.length <= 1) return;
    const timer = setInterval(advance, 7000);
    return () => clearInterval(timer);
  }, [advance, members.length]);

  if (loading) {
    return (
      <section className="py-20 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <div className="h-8 w-48 bg-secondary rounded animate-pulse mx-auto mb-10" />
          <div className="h-24 w-full bg-secondary rounded animate-pulse mb-6" />
          <div className="h-4 w-32 bg-secondary rounded animate-pulse mx-auto" />
        </div>
      </section>
    );
  }

  if (members.length === 0) return null;

  const current = members[active];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-serif font-semibold text-foreground mb-12 lowercase leading-tight"
        >
          voices
        </motion.h2>

        <div className="relative min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {current && (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <p className="text-gold text-5xl font-serif leading-none mb-4">
                  &ldquo;
                </p>
                <p className="text-xl md:text-2xl font-serif italic text-foreground leading-relaxed max-w-2xl mb-8">
                  {current.quote}
                </p>
                <div className="flex items-center gap-3">
                  {current.avatar_url && (
                    <img
                      src={current.avatar_url}
                      alt={current.full_name || ""}
                      className="w-10 h-10 rounded-full border border-gold/30"
                    />
                  )}
                  <div className="text-left">
                    <p className="text-foreground font-sans text-sm font-medium">
                      {current.full_name}
                    </p>
                    {current.bio && (
                      <p className="text-muted-foreground font-sans text-xs">
                        {current.bio}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {members.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                i === active ? "bg-gold" : "bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
