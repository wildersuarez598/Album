import { Outlet, NavLink } from 'react-router-dom';
import { Home, Layers, UserCircle, ShieldCheck } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { Sidebar } from './Sidebar';

const navItems = [
  { to: '/', label: 'Inicio', icon: Home },
  { to: '/album', label: 'Álbum', icon: Layers },
  { to: '/profile', label: 'Perfil', icon: UserCircle }
];

export function AppShell() {
  const { theme, toggleTheme } = useAppStore();

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-4 md:px-6">
      <header className="mb-4 flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-950/70 px-4 py-4 shadow-soft backdrop-blur-md">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Panini Mundial 2026</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-100">Tu álbum, tus láminas.</h1>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 transition hover:border-slate-600"
        >
          <ShieldCheck className="h-4 w-4" />
          {theme === 'dark' ? 'Dark' : 'Light'}
        </button>
      </header>

      <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
        <Sidebar />
        <main className="mb-24 flex-1 rounded-3xl border border-slate-800 bg-slate-950/80 p-4 shadow-soft backdrop-blur-md md:p-6">
          <Outlet />
        </main>
      </div>

      <nav className="fixed bottom-4 left-1/2 z-20 w-[min(520px,calc(100%-2rem))] -translate-x-1/2 rounded-3xl border border-slate-800 bg-slate-950/95 px-4 py-3 shadow-soft backdrop-blur-xl md:hidden">
        <ul className="flex items-center justify-between gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.to} className="flex-1">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex flex-col items-center justify-center rounded-2xl px-3 py-2 text-xs font-semibold transition ${
                      isActive ? 'bg-panini-800 text-white' : 'text-slate-400 hover:text-white'
                    }`
                  }
                >
                  <Icon className="mb-1 h-5 w-5" />
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
