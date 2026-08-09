import { useState } from "react";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "What is SupportAI?",
    answer: "SupportAI is an AI-powered workspace designed to help customer support teams create helpful, consistent responses more efficiently.",
  },
  {
    question: "How does SupportAI help customer support teams?",
    answer: "It gives agents context-aware reply suggestions based on your trusted information, helping them respond faster while staying on message.",
  },
  {
    question: "Can I connect my company's knowledge base?",
    answer: "Yes. You can bring FAQs, product details, policies, and support documentation into SupportAI to inform AI assistance.",
  },
  {
    question: "Does SupportAI work with existing support tools?",
    answer: "SupportAI is built to work alongside the tools your team already uses. Available integrations can depend on your plan and setup.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes. Starter and Growth plans include a free trial so your team can explore SupportAI before committing.",
  },
  {
    question: "Can I upgrade or change my plan later?",
    answer: "Yes. You can move to a plan that better fits your team's needs as your support operation grows.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="relative isolate overflow-hidden bg-slate-950 px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="faq-heading"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.1),_transparent_62%)]" />

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-cyan-300">Helpful answers</p>
          <h2 id="faq-heading" className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Find answers about SupportAI, getting set up, AI assistance, pricing, and integrations for your support team.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-question-${index}`;
            const panelId = `faq-answer-${index}`;

            return (
              <article
                key={faq.question}
                className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/75 transition-colors hover:border-cyan-300/30"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left text-base font-semibold text-white transition-colors hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-cyan-300 sm:px-6"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleFAQ(index)}
                  >
                    <span>{faq.question}</span>
                    <span
                      className="flex size-7 shrink-0 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-400/10 text-xl font-normal leading-none text-cyan-300"
                      aria-hidden="true"
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                {isOpen && (
                  <div id={panelId} role="region" aria-labelledby={buttonId} className="border-t border-white/10 px-5 py-5 sm:px-6">
                    <p className="text-sm leading-6 text-slate-400 sm:text-base">{faq.answer}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
