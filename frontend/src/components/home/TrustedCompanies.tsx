const companies = ["Acme", "Nova", "Vertex", "Cloudly", "Orbit"];

function TrustedCompanies() {
  return (
    <section className="border-y border-white/10 bg-slate-950 px-4 py-12 sm:px-6 sm:py-16 lg:px-8" aria-labelledby="trusted-companies-heading">
      <div className="mx-auto max-w-7xl">
        <h2 id="trusted-companies-heading" className="text-center text-sm font-medium tracking-wide text-slate-400">
          Trusted by modern support teams
        </h2>
        <div className="mt-8 grid grid-cols-2 items-center gap-x-6 gap-y-7 sm:grid-cols-3 md:grid-cols-5 md:gap-8">
          {companies.map((company) => (
            <div
              key={company}
              className="flex min-h-12 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] px-4 text-lg font-semibold tracking-tight text-slate-500 transition-colors hover:border-cyan-200/15 hover:bg-white/[0.04] hover:text-slate-300"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustedCompanies;
