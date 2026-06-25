import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AboutSection from "@/components/AboutSection";
import VisionMissionSection from "@/components/VisionMissionSection";
import PillarsSection from "@/components/PillarsSection";
import HeroSection from "@/components/HeroSection";
import MemberCarousel from "@/components/MemberCarousel";
import EventSpotlight from "@/components/EventSpotlight";
import QuotesSection from "@/components/QuotesSection";
import Wise from "@/components/Wise";
import WISEReflectionModal from "@/components/WISEReflectionModal";

const Index = () => {
  const { user, profile } = useAuth();
  const [showReflection, setShowReflection] = useState(false);

  useEffect(() => {
    if (user && profile && !profile.reflections_completed) {
      setShowReflection(true);
    }
  }, [user, profile]);

  return (
    <div className="min-h-screen bg-background">
      {showReflection && (
        <WISEReflectionModal onComplete={() => setShowReflection(false)} />
      )}

      <HeroSection onOpenReflection={() => setShowReflection(true)} />

      <MemberCarousel />

      <EventSpotlight />

      <QuotesSection />

      <PillarsSection />

      <AboutSection />

      <VisionMissionSection />

      {/* Community Highlights */}
      <section className="py-16 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-serif font-semibold text-foreground mb-4 text-center lowercase leading-tight">
            Community Highlights
          </h2>
          <p className="text-muted-foreground font-sans mb-8 max-w-lg mx-auto">
            Explore the <Wise /> framework, connect with fellow members, and
            begin your journey of intentional living.
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
