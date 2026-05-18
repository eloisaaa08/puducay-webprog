import { NavLink } from 'react-router-dom';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] rounded-full transition-all duration-200',
    isActive
      ? 'bg-zinc-900 text-white shadow-sm'
      : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

        {/* LOGO */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 transition-transform duration-200 group-hover:scale-105">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect x="5" y="5" width="90" height="90" rx="20" fill="#18181b" />
              <rect x="20" y="20" width="25" height="25" fill="white" />
              <rect x="55" y="20" width="25" height="25" fill="white" />
              <rect x="20" y="55" width="60" height="25" fill="white" />
            </svg>
          </div>

          <div className="leading-tight">
            <p className="text-sm font-bold text-zinc-900">Frameflow</p>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500">
              UI Workflow
            </p>
          </div>
        </NavLink>

        {/* CENTER NAV */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-zinc-200 bg-white/70 backdrop-blur-md px-2 py-1 shadow-sm">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* LOGIN */}
        <NavLink
          to="/auth/signin"
          className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900"
        >
          Login
        </NavLink>

      </div>
    </header>
  );
};

export default NavBar;