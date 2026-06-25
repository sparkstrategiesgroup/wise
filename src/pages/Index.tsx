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
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground mb-4 lowercase leading-tight">
                join our community
              </h2>
              <p className="text-muted-foreground font-sans mb-8 max-w-lg">
                Explore the <Wise /> framework, connect with fellow members, and
                begin your journey of intentional living.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/assessment">
                  <Button variant="gold">Take the Assessment</Button>
                </Link>
                <Link to="/members">
                  <Button variant="elegant">View Members</Button>
                </Link>
              </div>
            </div>
            <img
              src="/images/community.jpg"
              alt="WISE community members"
              className="rounded-xl w-full h-80 object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
