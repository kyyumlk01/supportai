function HeroSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-slate-950 px-4 pb-20 pt-16 text-white sm:px-6 sm:pb-28 sm:pt-24 lg:px-8 lg:pb-32"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.15),_transparent_45%)]" />
      <div className="absolute left-1/2 top-20 -z-10 size-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1.5 text-sm font-medium text-cyan-200">
            <span className="size-2 rounded-full bg-cyan-300" aria-hidden="true" />
            AI support that never sleeps
          </p>
          <h1 id="hero-heading" className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Turn every customer question into a great experience.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            SupportAI gives your team an intelligent copilot to resolve requests faster, deliver helpful answers around
            the clock, and keep every customer conversation on track.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#get-started"
              className="inline-flex items-center justify-center rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-colors hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              Get Started
              <svg className="ml-2 size-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#watch-demo"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan-200/40 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              <span className="flex size-5 items-center justify-center rounded-full border border-cyan-200/60" aria-hidden="true">
                <svg className="ml-px size-3" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M3 2.2v7.6L9.2 6 3 2.2Z" />
                </svg>
              </span>
              Watch Demo
            </a>
          </div>
          <p className="mt-6 text-sm text-slate-400">No credit card required. Get up and running in minutes.</p>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none" aria-label="SupportAI dashboard preview">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-cyan-400/10 blur-2xl" />
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/35">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-rose-400" />
                <span className="size-2.5 rounded-full bg-amber-300" />
                <span className="size-2.5 rounded-full bg-emerald-400" />
              </div>
              <p className="text-xs font-medium text-slate-400">SupportAI workspace</p>
              <span className="size-10" aria-hidden="true" />
            </div>

            <div className="grid min-h-90 grid-cols-[3.5rem_1fr] sm:grid-cols-[10rem_1fr]">
              <aside className="border-r border-white/10 bg-slate-950/60 p-3 sm:p-4" aria-label="Dashboard sidebar">
                <div className="mb-7 hidden items-center gap-2 text-sm font-medium text-white sm:flex">
                  <span className="flex size-6 items-center justify-center rounded-md bg-cyan-400 text-xs font-bold text-slate-950">S</span>
                  Inbox
                </div>
                <div className="space-y-4 sm:space-y-2">
                  {["▣", "◌", "◫"].map((icon, index) => (
                    <div key={icon} className={`flex items-center gap-2 rounded-md p-2 text-sm ${index === 0 ? "bg-cyan-400/10 text-cyan-200" : "text-slate-500"}`}>
                      <span aria-hidden="true">{icon}</span>
                      <span className="hidden sm:inline">{["Inbox", "Analytics", "Knowledge"][index]}</span>
                    </div>
                  ))}
                </div>
              </aside>

              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-cyan-300">Live conversation</p>
                    <h2 className="mt-1 text-base font-semibold text-white">Order status request</h2>
                  </div>
                  <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-300">Resolved</span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="max-w-[85%] rounded-xl rounded-tl-sm bg-slate-800 px-3 py-2.5 text-sm leading-5 text-slate-200">
                    Hi, can you tell me when my order will arrive?
                  </div>
                  <div className="ml-auto max-w-[90%] rounded-xl rounded-tr-sm bg-cyan-400 px-3 py-2.5 text-sm leading-5 text-slate-950">
                    Your order is on its way and will arrive tomorrow by 6 PM.
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-cyan-300/15 bg-cyan-400/5 p-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-xs font-bold text-slate-950">AI</span>
                    <p className="text-xs leading-5 text-cyan-100">Suggested reply sent with order-tracking details.</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                  <div className="h-9 flex-1 rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-xs text-slate-500">Ask SupportAI anything...</div>
                  <span className="flex size-9 items-center justify-center rounded-lg bg-cyan-400 text-slate-950" aria-label="Send message">
                    <svg className="size-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="m3 9.5 13-6-4.5 13-2.1-5.2L3 9.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
