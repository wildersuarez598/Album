import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

export function HomePage() {
  const { stickers, activeFilter, search, user, isGuest } = useAppStore();
  const total = stickers.length;
  const owned = stickers.filter((sticker) => sticker.status === 'owned').length;
  const duplicate = stickers.filter((sticker) => sticker.status === 'duplicate').length;
  const missing = stickers.filter((sticker) => sticker.status === 'missing').length;
  const completion = total ? Math.round((owned / total) * 100) : 0;

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5 shadow-soft">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Progreso</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-100">¿Cómo va tu álbum?</h2>
            <p className="mt-2 text-sm text-slate-400">
              {isGuest ? 'Modo invitado activo. Guarda tu progreso localmente y regístrate cuando quieras.' : `Hola, ${user?.full_name ?? 'Coleccionista'}`}
            </p>
          </div>
          <Sparkles className="h-10 w-10 text-panini-400" />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-sm text-slate-400">Completadas</p>
            <p className="mt-2 text-3xl font-semibold text-slate-100">{owned}</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-sm text-slate-400">Faltantes</p>
            <p className="mt-2 text-3xl font-semibold text-slate-100">{missing}</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-sm text-slate-400">Repetidas</p>
            <p className="mt-2 text-3xl font-semibold text-slate-100">{duplicate}</p>
          </div>
        </div>

        <div className="mt-6 rounded-3xl bg-gradient-to-r from-panini-800 via-slate-800 to-slate-900 p-4 text-slate-100">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm uppercase tracking-[0.25em] text-slate-300">Progreso del álbum</span>
            <span className="text-sm font-semibold">{completion}%</span>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-900">
            <div className="h-full rounded-full bg-panini-400" style={{ width: `${completion}%` }} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950/90 p-5 shadow-soft">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-100">Buscar láminas</h3>
              <p className="text-sm text-slate-500">Encuentra láminas por número, selección o categoría.</p>
            </div>
            <Search className="h-6 w-6 text-slate-400" />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Filtro</p>
              <p className="mt-2 text-sm text-slate-100">{activeFilter}</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Total</p>
              <p className="mt-2 text-sm text-slate-100">{total}</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Búsqueda</p>
              <p className="mt-2 text-sm text-slate-100">{search || 'Sin búsqueda'}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5 shadow-soft">
          <h3 className="text-lg font-semibold text-slate-100">Acciones rápidas</h3>
          <div className="mt-5 space-y-3">
            <Link
              to="/album"
              className="flex items-center justify-between rounded-3xl bg-panini-700 px-4 py-4 text-sm font-semibold text-white transition hover:bg-panini-500"
            >
              <span>Ir al álbum</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-300">
              Configura filtros por equipo y estado para priorizar intercambios.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
