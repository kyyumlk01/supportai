import type { ReactNode } from "react";

type Step = {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
};

const iconClassName = "size-6";

const steps: Step[] = [
  {
    number: "01",
    title: "Connect your knowledge",
    description: "Bring your FAQs, product information, policies, and support documentation into SupportAI.",
    icon: (
      <svg className={iconClassName} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H19v17.5H7.5A2.5 2.5 0 0 0 5 22V4.5Zm0 0V22m4-15h6m-6 4h6m-6 4h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Let AI assist your team",
    description: "SupportAI understands each conversation and suggests accurate, context-aware responses.",
    icon: (
      <svg className={iconClassName} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 18.5 3.5 21l1.1-4.2A8.5 8.5 0 1 1 20.5 12c0 1.8-.6 3.5-1.7 4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m12 7 .7 2.3L15 10l-2.3.7L12 13l-.7-2.3L9 10l2.3-.7L12 7Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Resolve customers faster",
    description: "Review, send, and resolve requests faster while keeping every customer interaction consistent.",
    icon: (
      <svg className={iconClassName} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12.5 9.5 17 19 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12a9 9 0 1 1-4-7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative isolate overflow-hidden bg-slate-950 px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="how-it-works-heading"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.1),_transparent_62%)]" />

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-cyan-300">Simple by design</p>
          <h2 id="how-it-works-heading" className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            How SupportAI works
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            From customer question to helpful resolution in three simple steps.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-14">
          <div className="absolute left-[16.667%] right-[16.667%] top-9 hidden h-px bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent lg:block" aria-hidden="true" />
          <div className="grid gap-5 lg:grid-cols-3 lg:gap-8">
            {steps.map((step) => (
              <article
                key={step.number}
                className="group relative rounded-2xl border border-white/10 bg-slate-900/75 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-slate-900 hover:shadow-xl hover:shadow-cyan-950/30 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300 transition-colors group-hover:bg-cyan-400 group-hover:text-slate-950">
                    {step.icon}
                  </div>
                  <span className="flex size-10 items-center justify-center rounded-full border border-cyan-300/25 bg-slate-950 text-xs font-bold tracking-wider text-cyan-200 transition-colors group-hover:border-cyan-300/60 group-hover:bg-cyan-400/10">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-7 text-xl font-semibold tracking-tight text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
