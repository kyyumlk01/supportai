import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.15),_transparent_50%)]" />
      <div className="absolute -right-32 top-1/3 -z-10 size-96 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mx-auto flex w-fit items-center gap-2 text-xl font-semibold tracking-tight text-white transition-colors hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
          aria-label="SupportAI home"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-cyan-400 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20">
            S
          </span>
          SupportAI
        </Link>

        <section className="mt-10 rounded-2xl border border-white/10 bg-slate-900/75 p-6 shadow-2xl shadow-black/25 backdrop-blur sm:p-8" aria-labelledby="login-heading">
          <div>
            <p className="text-sm font-semibold tracking-wide text-cyan-300">Welcome back</p>
            <h1 id="login-heading" className="mt-2 text-3xl font-semibold tracking-tight text-white">
              Log in to SupportAI
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-400">Continue delivering helpful support experiences with your team.</p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={(event) => event.preventDefault()}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-200">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@company.com"
                className="mt-2 block w-full rounded-lg border border-white/10 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-cyan-300 focus:outline-2 focus:outline-offset-2 focus:outline-cyan-300"
              />
              <p className="mt-2 text-xs text-slate-500">Enter the email associated with your account.</p>
            </div>

            <div>
              <div className="flex items-center justify-between gap-4">
                <label htmlFor="password" className="block text-sm font-medium text-slate-200">
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                className="mt-2 block w-full rounded-lg border border-white/10 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-cyan-300 focus:outline-2 focus:outline-offset-2 focus:outline-cyan-300"
              />
              <p className="mt-2 text-xs text-slate-500">Your password must be at least 8 characters.</p>
            </div>

            <label className="flex w-fit items-center gap-2.5 text-sm text-slate-300">
              <input
                name="remember-me"
                type="checkbox"
                className="size-4 rounded border-white/20 bg-slate-950 text-cyan-400 focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-900"
              />
              Remember me
            </label>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-colors hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              Log in
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-400">
            New to SupportAI?{" "}
            <Link to="/signup" className="font-medium text-cyan-300 transition-colors hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
              Create an account
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

export default LoginPage;
