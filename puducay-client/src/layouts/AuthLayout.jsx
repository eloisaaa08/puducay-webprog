import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <section className="h-screen bg-gradient-to-br from-zinc-100 via-white to-zinc-200 text-zinc-900">

      <div className="grid h-screen w-full lg:grid-cols-2">

        {/* LEFT SIDE (IMPROVED DESIGN ONLY) */}
        <div className="hidden lg:flex items-center justify-center relative px-10 bg-zinc-900 text-white overflow-hidden">

          {/* Glow effects */}
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

          <div className="max-w-md space-y-4">

            <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-400">
              Secure Authentication
            </p>

            <h1 className="text-4xl font-bold leading-tight">
              Access your account<br />anytime, anywhere.
            </h1>

            <p className="text-sm text-zinc-300 leading-6">
              A modern authentication system built for speed, security, and seamless user experience across all devices.
            </p>

            {/* Feature cards */}
            <div className="space-y-3 mt-6">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                <p className="text-sm font-semibold">Secure Login</p>
                <p className="text-xs text-zinc-300 mt-1">
                  Protected authentication with modern security standards.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                <p className="text-sm font-semibold">Fast Access</p>
                <p className="text-xs text-zinc-300 mt-1">
                  Optimized flow for quick and seamless login experience.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                <p className="text-sm font-semibold">Scalable System</p>
                <p className="text-xs text-zinc-300 mt-1">
                  Built to support growth and future expansion.
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* RIGHT SIDE (NOW SCROLLABLE) */}
        <main className="h-screen overflow-y-auto flex items-start justify-center px-6 py-10 sm:px-10 lg:px-16">

          <div className="w-full max-w-md">
            <Outlet />
          </div>

        </main>

      </div>

    </section>
  );
};

export default AuthLayout;