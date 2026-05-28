import { create } from 'zustand';
import { AlbumFilter, Sticker, StickerStatus, User } from '../types';

interface AppState {
  user: User | null;
  isGuest: boolean;
  theme: 'light' | 'dark';
  search: string;
  activeFilter: AlbumFilter;
  stickers: Sticker[];
  setUser: (user: User | null) => void;
  setIsGuest: (value: boolean) => void;
  toggleTheme: () => void;
  setSearch: (query: string) => void;
  setFilter: (filter: AlbumFilter) => void;
  setStickers: (stickers: Sticker[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isGuest: true,
  theme: 'dark',
  search: '',
  activeFilter: 'all',
  stickers: [],
  setUser: (user) => set({ user }),
  setIsGuest: (value) => set({ isGuest: value }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  setSearch: (query) => set({ search: query }),
  setFilter: (filter) => set({ activeFilter: filter }),
  setStickers: (stickers) => set({ stickers })
}));

export const defaultStickerStatuses: Record<StickerStatus, string> = {
  missing: 'Faltante',
  owned: 'Tengo',
  duplicate: 'Repetida'
};
