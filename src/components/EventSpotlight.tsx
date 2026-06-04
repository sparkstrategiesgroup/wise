import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";

type Event = Tables<"events">;

export default function EventSpotlight() {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      const { data } = await supabase
        .from("events")
        .select("*")
        .gte("date", new Date().toISOString())
        .order("date", { ascending: true })
        .limit(1)
        .single();
      setEvent(data);
      setLoading(false);
    }
    fetchEvent();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <div className="h-8 w-64 bg-border/30 rounded animate-pulse mx-auto mb-8" />
          <div className="bg-background rounded-xl p-10 border border-border">
            <div className="h-6 w-48 bg-border/30 rounded animate-pulse mx-auto mb-4" />
            <div className="h-10 w-80 bg-border/30 rounded animate-pulse mx-auto mb-4" />
            <div className="h-4 w-64 bg-border/30 rounded animate-pulse mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  if (!event) {
    return (
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-serif font-semibold text-foreground mb-8 lowercase leading-tight">
            next gathering
          </h2>
          <div className="bg-background rounded-xl p-10 border border-border">
            <Calendar className="w-8 h-8 text-gold mx-auto mb-4" />
            <p className="text-muted-foreground font-sans">
              Stay tuned for upcoming gatherings.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const eventDate = new Date(event.date);
  const now = new Date();
  const daysAway = Math.ceil(
    (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  const month = eventDate.toLocaleDateString("en-US", { month: "long" });
  const day = eventDate.getDate();
  const time = eventDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const endTime = event.end_date
    ? new Date(event.end_date).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : null;

  return (
    <section className="py-20 px-6 bg-secondary">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-serif font-semibold text-foreground mb-10 text-center lowercase leading-tight"
        >
          next gathering
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-background rounded-xl p-8 md:p-12 border border-border relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

          {daysAway > 0 && (
            <div className="flex justify-center mb-6">
              <span className="bg-gold/10 text-gold font-sans text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full">
                {daysAway} days away
              </span>
            </div>
          )}

          <div className="text-center">
            <div className="mb-6">
              <p className="text-gold font-serif text-6xl md:text-8xl font-semibold leading-none">
                {day}
              </p>
              <p className="text-muted-foreground font-sans text-lg uppercase tracking-wider mt-1">
                {month}
              </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-3">
              {event.title}
            </h3>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-muted-foreground font-sans text-sm mb-6">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gold" />
                <span>
                  {time}
                  {endTime ? ` – ${endTime}` : ""}
                </span>
              </div>
              {event.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>

            {event.description && (
              <p className="text-muted-foreground font-sans max-w-lg mx-auto mb-8 leading-relaxed">
                {event.description}
              </p>
            )}

            <Button variant="gold" size="lg">
              Reserve Your Spot
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
