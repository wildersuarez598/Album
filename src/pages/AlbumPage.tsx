import { useMemo } from 'react';
import { Search, Shuffle, Layers } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { StickerStatus } from '../types';

const filters: { label: string; value: StickerStatus | 'all' }[] = [
  { label: 'Todas', value: 'all' },
  { label: 'Faltantes', value: 'missing' },
  { label: 'Repetidas', value: 'duplicate' },
  { label: 'Completadas', value: 'owned' }
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
          activeFilter === 'all' || (activeFilter === 'completed' ? sticker.status === 'owned' : sticker.status === activeFilter);

        return matchesSearch && matchesFilter;
      }),
    [stickers, activeFilter, search]
  );

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Álbum</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-100">Administra tus láminas</h2>
          </div>
          <button className="inline-flex items-center gap-2 rounded-3xl bg-panini-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-panini-500">
            <Shuffle className="h-4 w-4" />
            Ordenar repetidas
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-[1.5fr_1fr]">
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
                onClick={() => setFilter(filter.value as any)}
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

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <Layers className="h-5 w-5 text-panini-400" />
              <h3 className="text-lg font-semibold text-slate-100">Láminas encontradas</h3>
            </div>
            <p className="mt-3 text-sm text-slate-400">{filteredStickers.length} resultados según tus filtros y búsqueda.</p>
          </div>

          <div className="grid gap-3">
            {filteredStickers.length === 0 ? (
              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-center text-slate-400">
                No hay coincidencias. Intenta otro número o selección.
              </div>
            ) : (
              filteredStickers.map((sticker) => (
                <article key={sticker.id} className="flex items-center justify-between gap-3 rounded-3xl border border-slate-800 bg-slate-900 p-4">
                  <div>
                    <p className="text-sm text-slate-500">#{sticker.number}</p>
                    <h4 className="mt-1 text-lg font-semibold text-slate-100">{sticker.team}</h4>
                    <p className="text-sm text-slate-400">{sticker.category}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 text-right">
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-300">
                      {sticker.status}
                    </span>
                    <span className="text-sm font-semibold text-slate-100">x{sticker.quantity}</span>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>

        <aside className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950/90 p-5 shadow-soft">
          <h3 className="text-lg font-semibold text-slate-100">Resumen rápido</h3>
          <div className="grid gap-3">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-sm text-slate-400">Repetidas</p>
              <p className="mt-2 text-2xl font-semibold text-slate-100">{stickers.filter((item) => item.status === 'duplicate').length}</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-sm text-slate-400">Faltantes</p>
              <p className="mt-2 text-2xl font-semibold text-slate-100">{stickers.filter((item) => item.status === 'missing').length}</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
