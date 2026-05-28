import { useMemo } from 'react';
import { LogOut, Medal } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { signOut } from '../services/authService';

export function ProfilePage() {
  const user = useAppStore((state) => state.user);
  const isGuest = useAppStore((state) => state.isGuest);
  const setUser = useAppStore((state) => state.setUser);
  const stickers = useAppStore((state) => state.stickers);

  const stats = useMemo(
    () => ({
      owned: stickers.filter((sticker) => sticker.status === 'owned').length,
      duplicate: stickers.filter((sticker) => sticker.status === 'duplicate').length,
      missing: stickers.filter((sticker) => sticker.status === 'missing').length
    }),
    [stickers]
  );

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Perfil</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-100">{user?.full_name ?? 'Usuario invitado'}</h2>
            <p className="mt-1 text-sm text-slate-400">{isGuest ? 'Sesión local anónima' : user?.email ?? 'No definido'}</p>
          </div>
          <button
            type="button"
            onClick={async () => {
              if (!isGuest) {
                await signOut();
              }
              setUser({ id: 'guest', email: 'invitado@local', full_name: 'Usuario invitado' });
            }}
            className="inline-flex items-center gap-2 rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-600"
          >
            <LogOut className="h-4 w-4" />
            {isGuest ? 'Volver a invitado' : 'Cerrar sesión'}
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Completo</p>
          <p className="mt-3 text-3xl font-semibold text-slate-100">{stats.owned}</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Repetidas</p>
          <p className="mt-3 text-3xl font-semibold text-slate-100">{stats.duplicate}</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Faltantes</p>
          <p className="mt-3 text-3xl font-semibold text-slate-100">{stats.missing}</p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5 shadow-soft">
        <div className="flex items-center gap-3">
          <Medal className="h-5 w-5 text-panini-400" />
          <h3 className="text-lg font-semibold text-slate-100">Estadísticas rápidas</h3>
        </div>
        <p className="mt-3 text-sm text-slate-400">Las estadísticas se actualizarán automáticamente cuando agregues o marcas láminas.</p>
      </div>
    </section>
  );
}
