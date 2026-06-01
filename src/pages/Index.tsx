import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Sparkles, Heart, Target, Users } from "lucide-react";
import AboutSection from "@/components/AboutSection";
import VisionMissionSection from "@/components/VisionMissionSection";
import PillarsSection from "@/components/PillarsSection";
import BrandNarrativeSection from "@/components/BrandNarrativeSection";
import HeroSection from "@/components/HeroSection";
import Wise from "@/components/Wise";
import WISEReflectionModal from "@/components/WISEReflectionModal";

type Reflection = Tables<"reflections">;

const Index = () => {
  const { user, profile } = useAuth();
  const [showReflection, setShowReflection] = useState(false);
  const [recentReflections, setRecentReflections] = useState<(Reflection & { profile_name?: string })[]>([]);

  useEffect(() => {
    // Show reflection modal automatically if user is logged in and hasn't completed reflections
    if (user && profile && !profile.reflections_completed) {
      setShowReflection(true);
    }
  }, [user, profile]);

  useEffect(() => {
    const fetchReflections = async () => {
      const { data } = await supabase
        .from("reflections")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);
      setRecentReflections(data || []);
    };
    fetchReflections();
  }, []);

  const pillarIcon: Record<string, any> = {
    wisdom: Sparkles,
    integrity: Target,
    strength: Heart,
    elevation: Users,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* WISE Reflection Modal */}
      {showReflection && (
        <WISEReflectionModal onComplete={() => setShowReflection(false)} />
      )}
      {/* Hero */}
      <HeroSection onOpenReflection={() => setShowReflection(true)} />

      {/* WISE Framework / Pillars */}
      <PillarsSection />

      {/* Purpose */}
      <AboutSection />

      {/* Vision & Mission */}
      <VisionMissionSection />




      {/* Upcoming Events */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-serif font-semibold text-foreground mb-8 text-center lowercase leading-tight">
            Upcoming Events
          </h2>
          <div className="bg-secondary rounded-lg p-8 border border-border text-center">
            <div className="flex items-center justify-center gap-2 text-gold mb-3">
              <Calendar className="w-5 h-5" />
              <span className="font-sans text-sm font-medium tracking-wide">NEXT GATHERING</span>
            </div>
            <h3 className="text-2xl font-serif font-semibold text-foreground mb-2">
              International Women's Day Mastermind
            </h3>
            <p className="text-muted-foreground font-sans mb-4">
              March 8, 2026 · 6:00 PM – 9:00 PM
            </p>
            <p className="text-muted-foreground font-sans max-w-lg mx-auto mb-6">
              An intimate evening of connection, reflection, and intention-setting with the <Wise /> community.
            </p>
            <Button variant="gold">Reserve Your Spot</Button>
          </div>
        </div>
      </section>


      {/* Community Highlights */}
      <section className="py-16 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-serif font-semibold text-foreground mb-4 text-center lowercase leading-tight">
            Community Highlights
          </h2>
          <p className="text-muted-foreground font-sans mb-8 max-w-lg mx-auto">
            Explore the <Wise /> framework, connect with fellow members, and begin your journey of intentional living.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/framework">
              <Button variant="elegant">Explore the Framework</Button>
            </Link>
            <Link to="/members">
              <Button variant="gold">View Members</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
