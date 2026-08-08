import type { ReactNode } from "react";

type Feature = {
  title: string;
  description: string;
  icon: ReactNode;
};

const iconClassName = "size-6";

const features: Feature[] = [
  {
    title: "AI-Powered Replies",
    description: "Generate accurate, helpful responses instantly.",
    icon: (
      <svg className={iconClassName} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 18.5 3.5 21l1.1-4.2A8.5 8.5 0 1 1 20.5 12c0 1.8-.6 3.5-1.7 4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m12 7 .7 2.3L15 10l-2.3.7L12 13l-.7-2.3L9 10l2.3-.7L12 7Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "24/7 Customer Support",
    description: "Keep customers supported around the clock.",
    icon: (
      <svg className={iconClassName} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 13a8 8 0 0 1 16 0v3a2 2 0 0 1-2 2h-1v-5h3M4 13v3a2 2 0 0 0 2 2h1v-5H4m13 5a5 5 0 0 1-5 3h-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Knowledge Base",
    description: "Give AI access to your company's trusted information.",
    icon: (
      <svg className={iconClassName} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H19v17.5H7.5A2.5 2.5 0 0 0 5 22V4.5Zm0 0V22m4-15h6m-6 4h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Smart Analytics",
    description: "Understand support performance and customer trends.",
    icon: (
      <svg className={iconClassName} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 19V5m0 14h16M8 16v-4m4 4V8m4 8v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m7 10 4-3 3 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Team Collaboration",
    description: "Help agents work together and resolve issues faster.",
    icon: (
      <svg className={iconClassName} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20m6-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7 1a2.5 2.5 0 1 0-1.1-4.7M20 20v-1.5a3.5 3.5 0 0 0-2.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Easy Integrations",
    description: "Connect SupportAI with the tools your business already uses.",
    icon: (
      <svg className={iconClassName} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M10 13.5 8.5 15a3.2 3.2 0 0 1-4.5-4.5L7.5 7a3.2 3.2 0 0 1 4.5 0M14 10.5l1.5-1.5a3.2 3.2 0 0 1 4.5 4.5L16.5 17a3.2 3.2 0 0 1-4.5 0M8.5 15l7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="bg-slate-900 px-4 py-20 sm:px-6 sm:py-24 lg:px-8" aria-labelledby="features-heading">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-cyan-300">Built for better support</p>
          <h2 id="features-heading" className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Everything your support team needs
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Powerful AI tools designed to help your team respond faster, work smarter, and deliver better customer experiences.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-xl border border-white/10 bg-slate-950/50 p-6 transition-all hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-slate-950 hover:shadow-lg hover:shadow-cyan-950/20"
            >
              <div className="flex size-11 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300 transition-colors group-hover:bg-cyan-400 group-hover:text-slate-950">
                {feature.icon}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
