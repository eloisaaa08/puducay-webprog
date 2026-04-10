import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t-2 border-zinc-900 bg-zinc-50 px-6 py-10">
      
      <div className="mx-auto max-w-6xl">
        
        {/* 🔹 TOP SECTION */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Brand */}
          <div>
            <h2 className="text-lg font-bold text-zinc-900">
              Frameflow
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Clean and scalable UI design system.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Navigation
            </p>
            <div className="mt-3 flex flex-col gap-2">
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/about" className="hover:underline">About</Link>
              <Link to="/articles" className="hover:underline">Articles</Link>
            </div>
          </div>

          {/* Extra Info */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Info
            </p>
            <p className="mt-3 text-sm text-zinc-600">
              Built with React + Tailwind CSS.
            </p>
          </div>

        </div>

        {/* 🔹 DIVIDER */}
        <div className="my-8 border-t-2 border-zinc-900"></div>

        {/* 🔹 BOTTOM SECTION */}
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} Frameflow</p>
          <p>All rights reserved</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;