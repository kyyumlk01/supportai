const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Documentation", href: "#documentation", id: "documentation" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Careers", href: "#" },
  ],
  resources: [
    { label: "Help Center", href: "#" },
    { label: "Documentation", href: "#documentation" },
    { label: "FAQ", href: "#faq" },
  ],
};

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-300" aria-label="Site footer">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.7fr)_repeat(3,minmax(0,1fr))] lg:gap-8">
          <div className="max-w-sm">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-xl font-semibold tracking-tight text-white transition-colors hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
              aria-label="SupportAI home"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-cyan-400 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20">
                S
              </span>
              SupportAI
            </a>
            <p className="mt-5 text-sm leading-6 text-slate-400">
              AI-powered customer support that helps teams respond faster and deliver better customer experiences.
            </p>
          </div>

          <FooterLinkGroup heading="Product" links={footerLinks.product} />
          <FooterLinkGroup heading="Company" links={footerLinks.company} />
          <FooterLinkGroup heading="Resources" links={footerLinks.resources} />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-slate-400">© 2026 SupportAI. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-slate-400 transition-colors hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-400 transition-colors hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterLinkGroupProps = {
  heading: string;
  links: FooterLink[];
};

type FooterLink = {
  label: string;
  href: string;
  id?: string;
};

function FooterLinkGroup({ heading, links }: FooterLinkGroupProps) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-white">{heading}</h2>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              id={link.id}
              href={link.href}
              className="text-sm text-slate-400 transition-colors hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Footer;
