import { Check, Plus, Minus } from 'lucide-react';
import { Sticker, StickerStatus } from '../../types';
import { useAppStore } from '../../store/useAppStore';

interface StickerCardProps {
  sticker: Sticker;
}

const statusConfig: Record<StickerStatus, { label: string; color: string }> = {
  missing: { label: 'Faltante', color: 'bg-red-950 text-red-200' },
  owned: { label: 'Tengo', color: 'bg-green-950 text-green-200' },
  duplicate: { label: 'Repetida', color: 'bg-yellow-950 text-yellow-200' }
};

export function StickerCard({ sticker }: StickerCardProps) {
  const { stickers, setStickers } = useAppStore();

  const updateSticker = (updates: Partial<Sticker>) => {
    const updated = stickers.map((s) => (s.id === sticker.id ? { ...s, ...updates } : s));
    setStickers(updated);
  };

  const cycleStatus = () => {
    const statuses: StickerStatus[] = ['missing', 'owned', 'duplicate'];
    const currentIndex = statuses.indexOf(sticker.status);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    updateSticker({ status: nextStatus, quantity: nextStatus === 'duplicate' ? Math.max(1, sticker.quantity) : 0 });
  };

  const incrementQuantity = () => {
    if (sticker.status === 'duplicate') {
      updateSticker({ quantity: sticker.quantity + 1 });
    }
  };

  const decrementQuantity = () => {
    if (sticker.status === 'duplicate' && sticker.quantity > 1) {
      updateSticker({ quantity: sticker.quantity - 1 });
    }
  };

  const config = statusConfig[sticker.status];

  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-3xl border p-4 transition ${
        sticker.status === 'owned'
          ? 'border-green-800 bg-green-950/30'
          : sticker.status === 'duplicate'
            ? 'border-yellow-800 bg-yellow-950/30'
            : 'border-slate-800 bg-slate-900'
      }`}
    >
      <div className="flex-1">
        <p className="text-sm text-slate-500">#{sticker.number}</p>
        <h4 className="mt-1 text-lg font-semibold text-slate-100">{sticker.team}</h4>
        <p className="text-sm text-slate-400">{sticker.category}</p>
      </div>

      <div className="flex flex-col items-end gap-3">
        <button
          type="button"
          onClick={cycleStatus}
          className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.25em] transition ${config.color} hover:opacity-80`}
        >
          {sticker.status === 'owned' && <Check className="h-4 w-4" />}
          {config.label}
        </button>

        {sticker.status === 'duplicate' && (
          <div className="flex items-center gap-2 rounded-full border border-yellow-700 bg-yellow-950/50 px-2 py-1">
            <button
              type="button"
              onClick={decrementQuantity}
              disabled={sticker.quantity <= 1}
              className="inline-flex items-center justify-center rounded-full p-1 text-yellow-200 disabled:opacity-50"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-6 text-center text-sm font-semibold text-yellow-200">{sticker.quantity}</span>
            <button
              type="button"
              onClick={incrementQuantity}
              className="inline-flex items-center justify-center rounded-full p-1 text-yellow-200 hover:bg-yellow-800/50"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
