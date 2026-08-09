type Plan = {
  name: string;
  description: string;
  price: string;
  billingPeriod: string;
  features: string[];
  cta: string;
  recommended?: boolean;
};

const plans: Plan[] = [
  {
    name: "Starter",
    description: "For small teams getting started with smarter customer support.",
    price: "$29",
    billingPeriod: "per agent / month",
    features: ["AI reply suggestions", "Up to 3 knowledge sources", "Shared team inbox", "Basic analytics"],
    cta: "Start free trial",
  },
  {
    name: "Growth",
    description: "For growing support teams that need more automation and insight.",
    price: "$79",
    billingPeriod: "per agent / month",
    features: ["Everything in Starter", "Unlimited knowledge sources", "Advanced AI assistance", "Performance analytics", "Priority support"],
    cta: "Start free trial",
    recommended: true,
  },
  {
    name: "Enterprise",
    description: "For larger organizations that need tailored controls and support.",
    price: "Custom",
    billingPeriod: "tailored to your team",
    features: ["Everything in Growth", "Custom integrations", "Advanced security controls", "Dedicated success manager", "Custom onboarding"],
    cta: "Talk to sales",
  },
];

function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative isolate overflow-hidden bg-slate-900 px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="pricing-heading"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.12),_transparent_58%)]" />

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-cyan-300">Flexible plans</p>
          <h2 id="pricing-heading" className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Simple pricing that scales with you
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Choose the plan that fits your support needs today, with room to grow as your team and customer conversations expand.
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3 lg:gap-8">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 sm:p-8 ${
                plan.recommended
                  ? "border-cyan-300/50 bg-slate-950 shadow-xl shadow-cyan-950/35 hover:border-cyan-200 hover:shadow-cyan-900/40"
                  : "border-white/10 bg-slate-950/50 hover:border-cyan-300/30 hover:bg-slate-950 hover:shadow-xl hover:shadow-cyan-950/20"
              }`}
            >
              {plan.recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cyan-400 px-3 py-1 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/20">
                  Most popular
                </span>
              )}

              <div>
                <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                <p className="mt-3 min-h-12 text-sm leading-6 text-slate-400">{plan.description}</p>
              </div>

              <div className="mt-7 flex items-end gap-2">
                <span className="text-4xl font-semibold tracking-tight text-white">{plan.price}</span>
                <span className="mb-1 text-sm text-slate-400">{plan.billingPeriod}</span>
              </div>

              <ul className="mt-8 space-y-3 border-t border-white/10 pt-7 text-sm text-slate-300">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <svg className="mt-0.5 size-5 shrink-0 text-cyan-300" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="m4.5 10 3.2 3.2L15.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#get-started"
                className={`mt-8 inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${
                  plan.recommended
                    ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-300"
                    : "border border-white/15 bg-white/5 text-white hover:border-cyan-200/40 hover:bg-white/10"
                }`}
              >
                {plan.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
