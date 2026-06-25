import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";

const PILLARS = [
  {
    name: "Wisdom",
    label: "One",
    desc: "Understanding the lessons of our journeys. Learning from lived experience and shared knowledge to navigate life with clarity.",
    note: "Wisdom grows each time you pause to extract the lesson. Keep reflecting — your journey is your greatest teacher.",
    questions: [
      "I regularly take time to reflect on my experiences and extract meaningful lessons from them.",
      "When I face challenges, I draw on what I've learned in the past rather than starting from scratch.",
      "I actively seek out knowledge — through conversations, reading, or learning from others in my field.",
      "I feel clear and grounded when making important decisions in my life.",
      "I am intentional about the stories I tell myself about my journey.",
    ],
  },
  {
    name: "Integrity",
    label: "Two",
    desc: "Living aligned with our values. Making deliberate choices rooted in honesty, authenticity, and purpose.",
    note: "Alignment is a practice, not a destination. Every honest course-correction is integrity in action.",
    questions: [
      "I am living in alignment with my core values, even when it's difficult or inconvenient.",
      "I make choices rooted in authenticity rather than what others expect of me.",
      "I speak my truth — in relationships, in business, and in how I show up publicly.",
      "When I find myself out of alignment, I recognize it quickly and course-correct.",
      "I feel proud of the choices I am making and the way I am conducting my life.",
    ],
  },
  {
    name: "Strength",
    label: "Three",
    desc: "Growing through courage and leadership. Finding resilience in vulnerability and power in authenticity.",
    note: "Real strength holds vulnerability and power in the same hand. Courage compounds every time you use it.",
    questions: [
      "I am able to be vulnerable and open without losing my sense of groundedness or power.",
      "I am actively building my leadership capacity — in business, community, or family.",
      "When things get hard, I lean into resilience rather than avoidance.",
      "I have a sense of courage around the goals and dreams I am pursuing.",
      "I am willing to step into uncomfortable situations in service of my growth.",
    ],
  },
  {
    name: "Elevation",
    label: "Four",
    desc: "Lifting and supporting others. Rising together through mentorship, accountability, and genuine connection.",
    note: "Your growth and others' growth are connected. The community rises when you pour in — and when you let yourself be poured into.",
    questions: [
      "I have people in my life who genuinely lift me up and challenge me to grow.",
      "I actively pour into others — through mentorship, encouragement, or shared experience.",
      "Accountability feels supportive rather than heavy in my current relationships.",
      "I am connected to a community where I can be honest about where I am in my journey.",
      "I believe in the power of collective rising — that my growth and others' growth are connected.",
    ],
  },
];

const TOTAL = PILLARS.reduce((n, p) => n + p.questions.length, 0);

function ScaleButton({
  value,
  selected,
  onClick,
}: {
  value: number;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 h-12 rounded-lg font-sans text-base font-medium transition-all duration-150 cursor-pointer ${
        selected
          ? "bg-lavender border-lavender text-white"
          : "bg-background border border-lilac text-muted-foreground hover:border-gold hover:text-foreground"
      }`}
    >
      {value}
    </button>
  );
}

export default function Assessment() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [reflections, setReflections] = useState({ r1: "", r2: "", r3: "" });
  const [showResults, setShowResults] = useState(false);

  const answered = Object.keys(answers).length;
  const allDone = answered === TOTAL;

  const handleAnswer = useCallback((id: string, val: number) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  }, []);

  const scores = useMemo(() => {
    if (!allDone) return [];
    return PILLARS.map((pillar, pi) => {
      const vals = pillar.questions.map((_, qi) => answers[`${pi}-${qi}`] || 0);
      const total = vals.reduce((a, b) => a + b, 0);
      return { name: pillar.name, note: pillar.note, total, avg: total / vals.length };
    });
  }, [answers, allDone]);

  const handleSubmit = () => {
    if (!allDone) return;
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetake = () => {
    setAnswers({});
    setReflections({ r1: "", r2: "", r3: "" });
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (showResults && scores.length > 0) {
    const sorted = [...scores].sort((a, b) => b.avg - a.avg);
    const highest = sorted[0];
    const lowest = sorted[sorted.length - 1];
    const overall = (scores.reduce((a, s) => a + s.avg, 0) / scores.length).toFixed(1);

    return (
      <div className="min-h-screen bg-background">
        <section className="bg-lavender text-white text-center py-18 px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif font-medium text-4xl md:text-5xl mb-3"
          >
            Your WISE Snapshot
          </motion.h2>
          <p className="text-white/85 max-w-xl mx-auto font-sans">
            Thank you for showing up honestly. This is exactly what WISE is built for. Here's where you are today — your baseline for the journey ahead.
          </p>
        </section>

        <div className="max-w-3xl mx-auto px-6 py-14">
          {scores.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-lilac rounded-xl p-7 mb-4"
            >
              <div className="flex justify-between items-baseline mb-3">
                <h3 className="font-serif font-medium text-xl text-lavender">{s.name}</h3>
                <span className="text-sm text-muted-foreground">
                  <strong className="text-lg text-foreground">{s.avg.toFixed(1)}</strong> / 5 &middot; {s.total} / 25
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(s.avg / 5) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                  className="h-full bg-gold rounded-full"
                />
              </div>
              <p className="text-sm text-muted-foreground">{s.note}</p>
            </motion.div>
          ))}

          <div className="bg-secondary rounded-xl p-7 mt-7 text-base font-sans">
            Your strongest pillar right now is <strong className="text-foreground">{highest.name}</strong> ({highest.avg.toFixed(1)}/5), and the pillar calling for the most attention is <strong className="text-foreground">{lowest.name}</strong> ({lowest.avg.toFixed(1)}/5). Your overall average is <strong className="text-foreground">{overall}/5</strong>. Remember — this is a snapshot, not a score. A year from now, you'll look back and see exactly how far you've come.
          </div>

          <div className="text-center mt-10 flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => window.print()}
              className="font-sans text-sm font-semibold text-gold border border-gold rounded-full px-9 py-3 cursor-pointer hover:bg-gold hover:text-white transition-all duration-200"
            >
              Save / print my results
            </button>
            <button
              onClick={handleRetake}
              className="font-sans text-sm font-semibold text-gold border border-gold rounded-full px-9 py-3 cursor-pointer hover:bg-gold hover:text-white transition-all duration-200"
            >
              Retake assessment
            </button>
          </div>
        </div>

        <footer className="bg-lavender text-lilac text-center py-9 px-6 text-sm">
          <div className="font-serif tracking-[0.4em] text-white text-sm mb-2">WISE</div>
          Own your wisdom. Elevate each other.
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="bg-lavender text-white text-center py-22 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-serif text-lg tracking-[0.42em] text-lilac mb-7">WISE</div>
          <h1 className="font-serif font-medium text-4xl md:text-5xl leading-tight mb-4">
            Member Assessment
          </h1>
          <p className="font-serif italic text-lg text-taupe mb-7">
            Own your wisdom. Elevate each other.
          </p>
          <p className="max-w-xl mx-auto text-base text-white/85 font-sans">
            This assessment is your starting point — an honest snapshot of where you are across WISE's four core pillars. There are no right or wrong answers. The goal is clarity, not perfection.
          </p>
          <div className="w-14 h-px bg-gold mx-auto mt-8" />
        </motion.div>
      </header>

      {/* Scale legend */}
      <div className="bg-secondary border-b border-lilac py-7 px-6 text-center">
        <div className="inline-flex gap-9 flex-wrap justify-center text-sm text-muted-foreground">
          <span><strong className="text-foreground font-semibold mr-1.5">1</strong>Not yet / just beginning</span>
          <span><strong className="text-foreground font-semibold mr-1.5">3</strong>Actively working on this</span>
          <span><strong className="text-foreground font-semibold mr-1.5">5</strong>Fully embodied</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="sticky top-0 z-50 bg-background border-b border-lilac">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-4">
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {answered} of {TOTAL} answered
          </span>
          <div className="flex-1 h-1 bg-lilac rounded-full overflow-hidden">
            <div
              className="h-full bg-gold rounded-full transition-all duration-300"
              style={{ width: `${(answered / TOTAL) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Questions */}
      <main className="max-w-3xl mx-auto px-6">
        {PILLARS.map((pillar, pi) => (
          <section key={pillar.name} className="pt-16 pb-6">
            <div className="mb-9">
              <span className="font-serif italic text-sm tracking-[0.3em] text-gold uppercase block mb-2">
                Pillar {pillar.label}
              </span>
              <h2 className="font-serif font-medium text-4xl text-foreground mb-2.5">
                {pillar.name}
              </h2>
              <p className="text-muted-foreground text-base max-w-xl">{pillar.desc}</p>
            </div>

            {pillar.questions.map((q, qi) => {
              const id = `${pi}-${qi}`;
              const selected = answers[id];
              return (
                <div
                  key={id}
                  className={`bg-white border rounded-xl p-6 mb-4 transition-all duration-200 ${
                    selected !== undefined
                      ? "border-gold"
                      : "border-lilac"
                  }`}
                >
                  <p className="text-base font-medium mb-4 font-sans">{q}</p>
                  <div className="flex gap-2.5">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <ScaleButton
                        key={v}
                        value={v}
                        selected={selected === v}
                        onClick={() => handleAnswer(id, v)}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Not yet</span>
                    <span>Fully embodied</span>
                  </div>
                </div>
              );
            })}
          </section>
        ))}
      </main>

      {/* Reflection */}
      <section className="bg-secondary py-16 mt-12">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif font-medium text-4xl text-foreground mb-2.5">Reflection</h2>
          <p className="text-muted-foreground mb-8">
            Take a moment to look at your ratings across all four pillars:
          </p>

          {[
            { key: "r1" as const, label: "Which pillar feels most alive and embodied for you right now?" },
            { key: "r2" as const, label: "Which pillar is calling for the most attention or growth?" },
            { key: "r3" as const, label: "What is one thing you hope WISE helps you with in the next 6 months?" },
          ].map((item) => (
            <div key={item.key} className="mb-7">
              <label className="block font-medium text-base mb-2.5 font-sans">{item.label}</label>
              <textarea
                value={reflections[item.key]}
                onChange={(e) => setReflections((prev) => ({ ...prev, [item.key]: e.target.value }))}
                placeholder="Write freely..."
                className="w-full min-h-24 p-3.5 border border-lilac rounded-xl font-sans text-sm text-foreground bg-white resize-y focus:outline-none focus:border-gold"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Submit */}
      <div className="text-center py-14 px-6">
        <button
          onClick={handleSubmit}
          disabled={!allDone}
          className={`font-sans text-base font-semibold text-white rounded-full px-12 py-4 transition-all duration-200 cursor-pointer ${
            allDone
              ? "bg-lavender hover:bg-foreground"
              : "bg-lilac cursor-not-allowed"
          }`}
        >
          See my results
        </button>
        <p className="text-sm text-muted-foreground mt-3.5">
          {allDone
            ? "All set — see where you are."
            : `Answer all ${TOTAL} questions to see your results. ${TOTAL - answered} remaining.`}
        </p>
      </div>

      <footer className="bg-lavender text-lilac text-center py-9 px-6 text-sm">
        <div className="font-serif tracking-[0.4em] text-white text-sm mb-2">WISE</div>
        Own your wisdom. Elevate each other.
      </footer>
    </div>
  );
}
