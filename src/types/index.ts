export type StickerStatus = 'missing' | 'owned' | 'duplicate';

export type AlbumFilter = 'all' | 'missing' | 'duplicate' | 'owned';

export interface Sticker {
  id: string;
  number: number;
  team: string;
  category: string;
  imageUrl?: string;
  status: StickerStatus;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
}

export interface UserSticker {
  id: string;
  user_id: string;
  sticker_id: string;
  status: StickerStatus;
  quantity: number;
  created_at: string;
}

export interface Trade {
  id: string;
  owner_id: string;
  receiver_id: string;
  sticker_id: string;
  quantity: number;
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
}
