import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, Target, Heart, Users, X } from "lucide-react";

const prompts = [
  {
    pillar: "wisdom",
    icon: Sparkles,
    label: "Wisdom",
    question: "What is one insight or lesson that has shaped who you are today?",
  },
  {
    pillar: "integrity",
    icon: Target,
    label: "Integrity",
    question:
      "How do you stay true to your values when faced with difficult choices?",
  },
  {
    pillar: "strength",
    icon: Heart,
    label: "Strength",
    question:
      "What challenge have you overcome that revealed your inner strength?",
  },
  {
    pillar: "elevation",
    icon: Users,
    label: "Elevation",
    question:
      "How do you lift others up in your daily life?",
  },
];

interface WISEReflectionModalProps {
  onComplete: () => void;
}

export default function WISEReflectionModal({
  onComplete,
}: WISEReflectionModalProps) {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const current = prompts[step];

  async function handleNext() {
    if (step < prompts.length - 1) {
      setStep(step + 1);
    } else {
      await handleSubmit();
    }
  }

  async function handleSubmit() {
    if (!user) {
      onComplete();
      return;
    }

    setSubmitting(true);
    const reflections = Object.entries(responses).map(([pillar, content]) => ({
      user_id: user.id,
      pillar,
      content,
    }));

    await supabase.from("reflections").insert(reflections);
    await supabase
      .from("profiles")
      .update({ reflections_completed: true })
      .eq("id", user.id);

    setSubmitting(false);
    onComplete();
  }

  return (
    <Dialog.Root open onOpenChange={() => onComplete()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg bg-secondary border border-border rounded-xl p-8 shadow-2xl">
          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </Dialog.Close>

          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-1 mb-2">
              {prompts.map((p, i) => (
                <div
                  key={p.pillar}
                  className={`h-1 w-8 rounded-full transition-colors ${
                    i <= step ? "bg-gold" : "bg-border"
                  }`}
                />
              ))}
            </div>
            <p className="text-gold font-sans text-xs font-medium tracking-[0.15em] uppercase">
              W.I.S.E. Reflection
            </p>
          </div>

          {current && (
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <current.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-foreground mb-2">
                {current.label}
              </h3>
              <p className="text-muted-foreground font-sans mb-6">
                {current.question}
              </p>
              <textarea
                value={responses[current.pillar] ?? ""}
                onChange={(e) =>
                  setResponses({ ...responses, [current.pillar]: e.target.value })
                }
                placeholder="Share your reflection..."
                rows={4}
                className="w-full bg-background border border-border rounded-lg p-4 text-foreground font-sans text-sm resize-none focus:outline-none focus:border-gold/50 placeholder:text-muted-foreground/50"
              />
              <div className="flex gap-3 mt-6 justify-center">
                {step > 0 && (
                  <Button variant="elegant" onClick={() => setStep(step - 1)}>
                    Back
                  </Button>
                )}
                <Button
                  variant="gold"
                  onClick={handleNext}
                  disabled={submitting}
                >
                  {step < prompts.length - 1
                    ? "Next"
                    : submitting
                      ? "Saving..."
                      : "Complete"}
                </Button>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
