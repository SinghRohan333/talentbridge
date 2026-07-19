import {
  Sparkles,
  ShieldCheck,
  Gauge,
  MessageSquare,
  DollarSign,
  BellRing,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-powered matching",
    description:
      "Recommendations that improve as you save, view, and apply to jobs.",
  },
  {
    icon: MessageSquare,
    title: "Career chat assistant",
    description:
      "Ask questions and search jobs conversationally, right from the app.",
  },
  {
    icon: ShieldCheck,
    title: "Verified employers",
    description:
      "Every company on TalentBridge posts under a registered employer account.",
  },
  {
    icon: Gauge,
    title: "Fast applications",
    description:
      "Apply in seconds with a cover letter — no scattered email threads.",
  },
  {
    icon: DollarSign,
    title: "Transparent salaries",
    description: "Salary ranges are visible upfront on every listing.",
  },
  {
    icon: BellRing,
    title: "Real-time tracking",
    description: "Track every application's status from your seeker dashboard.",
  },
];

export function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Why TalentBridge
        </h2>
        <p className="mt-2 text-slate">
          Built to make job hunting and hiring both feel less like a chore.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-line bg-white/60 p-6"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-signal/10">
              <feature.icon className="h-5 w-5 text-signal" />
            </div>
            <h3 className="mb-1.5 font-medium text-ink">{feature.title}</h3>
            <p className="text-sm text-slate">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
