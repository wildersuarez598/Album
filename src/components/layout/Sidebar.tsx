import { NavLink } from 'react-router-dom';
import { BarChart3, Layers, UserCircle } from 'lucide-react';

const items = [
  { label: 'Inicio', to: '/', icon: BarChart3 },
  { label: 'Álbum', to: '/album', icon: Layers },
  { label: 'Perfil', to: '/profile', icon: UserCircle }
];

export function Sidebar() {
  return (
    <aside className="hidden h-full w-72 flex-col gap-3 rounded-3xl border border-slate-800 bg-slate-950/90 p-4 shadow-soft md:flex">
      <div className="mb-5 px-2 text-slate-400">Menú</div>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                isActive ? 'bg-panini-800 text-white' : 'text-slate-300 hover:bg-slate-900'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        );
      })}
    </aside>
  );
}
