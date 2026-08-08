import { useState } from "react";
import { Link } from "react-router-dom";

const navigationLinks = [
  { label: "Features", to: "/#features" },
  { label: "Pricing", to: "/#pricing" },
  { label: "How It Works", to: "/#how-it-works" },
  { label: "Documentation", to: "/#documentation" },
];

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
      <nav
        className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-semibold tracking-tight text-white transition-colors hover:text-cyan-300"
          onClick={closeMobileMenu}
          aria-label="SupportAI home"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-cyan-400 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20">
            S
          </span>
          SupportAI
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            to="/#login"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            Login
          </Link>
          <Link
            to="/#get-started"
            className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 lg:hidden"
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {isMobileMenuOpen ? (
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div id="mobile-navigation" className="border-t border-white/10 bg-slate-950 lg:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
            {navigationLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
              <Link
                to="/#login"
                className="rounded-lg border border-white/15 px-3 py-2.5 text-center text-sm font-medium text-slate-200 transition-colors hover:border-white/30 hover:bg-white/10"
                onClick={closeMobileMenu}
              >
                Login
              </Link>
              <Link
                to="/#get-started"
                className="rounded-lg bg-cyan-400 px-3 py-2.5 text-center text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300"
                onClick={closeMobileMenu}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
