import { useMemo } from 'react';
import { Search, Layers } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { StickerCard } from '../components/album/StickerCard';

const filters = [
  { label: 'Todas', value: 'all' as const },
  { label: 'Faltantes', value: 'missing' as const },
  { label: 'Tengo', value: 'owned' as const },
  { label: 'Repetidas', value: 'duplicate' as const }
];

export function AlbumPage() {
  const { stickers, activeFilter, search, setFilter, setSearch } = useAppStore();

  const filteredStickers = useMemo(
    () =>
      stickers.filter((sticker) => {
        const query = search.trim().toLowerCase();
        const matchesSearch =
          !query ||
          sticker.team.toLowerCase().includes(query) ||
          sticker.category.toLowerCase().includes(query) ||
          sticker.number.toString().includes(query);

        const matchesFilter =
          activeFilter === 'all' || sticker.status === activeFilter;

        return matchesSearch && matchesFilter;
      }),
    [stickers, activeFilter, search]
  );

  const stats = {
    total: stickers.length,
    owned: stickers.filter((s) => s.status === 'owned').length,
    missing: stickers.filter((s) => s.status === 'missing').length,
    duplicates: stickers.filter((s) => s.status === 'duplicate').reduce((acc, s) => acc + s.quantity, 0)
  };

  const completion = stats.total > 0 ? Math.round((stats.owned / stats.total) * 100) : 0;

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Álbum</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-100">Administra tus láminas</h2>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500">Progreso</p>
            <p className="mt-1 text-2xl font-semibold text-slate-100">{completion}%</p>
          </div>
        </div>

        <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-900">
          <div
            className="h-full rounded-full bg-gradient-to-r from-panini-500 to-panini-400 transition-all"
            style={{ width: `${completion}%` }}
          />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-4">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Total</p>
            <p className="mt-2 text-2xl font-semibold text-slate-100">{stats.total}</p>
          </div>
          <div className="rounded-3xl border border-green-800 bg-green-950/30 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-green-400">Tengo</p>
            <p className="mt-2 text-2xl font-semibold text-green-200">{stats.owned}</p>
          </div>
          <div className="rounded-3xl border border-red-800 bg-red-950/30 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-red-400">Faltantes</p>
            <p className="mt-2 text-2xl font-semibold text-red-200">{stats.missing}</p>
          </div>
          <div className="rounded-3xl border border-yellow-800 bg-yellow-950/30 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-yellow-400">Repetidas</p>
            <p className="mt-2 text-2xl font-semibold text-yellow-200">{stats.duplicates}</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5 shadow-soft">
        <div className="grid gap-4 sm:grid-cols-[1.5fr_1fr]">
          <label className="relative block rounded-3xl border border-slate-800 bg-slate-900 p-3">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar número, selección o categoría"
              className="w-full bg-transparent pl-10 text-sm text-slate-100 outline-none placeholder:text-slate-500"
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setFilter(filter.value)}
                className={`rounded-3xl border px-4 py-3 text-sm font-semibold transition ${
                  activeFilter === filter.value
                    ? 'border-panini-400 bg-panini-800 text-white'
                    : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-600'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-950/90 p-5 shadow-soft">
          <Layers className="h-5 w-5 text-panini-400" />
          <h3 className="text-lg font-semibold text-slate-100">Láminas {filteredStickers.length}</h3>
          <p className="ml-auto text-sm text-slate-400">Click en el estado para cambiar</p>
        </div>

        {filteredStickers.length === 0 ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-center text-slate-400">
            No hay coincidencias. Intenta otro número o selección.
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {filteredStickers.map((sticker) => (
              <StickerCard key={sticker.id} sticker={sticker} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
