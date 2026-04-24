import { NavLink } from 'react-router-dom';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition duration-200',
    isActive
      ? 'border-zinc-900 bg-zinc-900 text-white shadow-sm'
      : 'border-transparent text-zinc-500 hover:border-zinc-900 hover:bg-white hover:text-zinc-900',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        
        {/* LOGO */}
        <NavLink to="/" className="flex items-center gap-3 group">
          
          {/* ICON */}
          <div className="w-10 h-10 transition-transform duration-200 group-hover:scale-105">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect x="5" y="5" width="90" height="90" rx="20" fill="#18181b" />
              <rect x="20" y="20" width="25" height="25" fill="white" />
              <rect x="55" y="20" width="25" height="25" fill="white" />
              <rect x="20" y="55" width="60" height="25" fill="white" />
            </svg>
          </div>

          {/* TEXT */}
          <div className="leading-tight">
            <p className="text-sm font-bold text-zinc-900">Frameflow</p>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500">
              UI Workflow
            </p>
          </div>
        </NavLink>

        {/* NAV LINKS */}
        <nav className="hidden items-center gap-2 md:flex">
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
          <NavLink
  to="/auth/signin"
  className="rounded-full bg-zinc-900 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white transition duration-200 hover:bg-zinc-700"
>
  Login
</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;