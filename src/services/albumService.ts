import { Sticker, StickerStatus } from '../types';
import { supabase } from './supabase';

export const fetchStickers = async (albumId: string): Promise<Sticker[]> => {
  const { data, error } = await supabase.from('user_stickers').select(`*, stickers(*)`).eq('album_id', albumId);
  if (error) {
    throw error;
  }

  return (
    data?.map((record: any) => ({
      id: record.sticker_id,
      number: record.stickers.number,
      team: record.stickers.team,
      category: record.stickers.category,
      imageUrl: record.stickers.image_url,
      status: record.status as StickerStatus,
      quantity: record.quantity
    })) ?? []
  );
};

export const updateStickerQuantity = async (userStickerId: string, quantity: number) => {
  const { error } = await supabase.from('user_stickers').update({ quantity }).eq('id', userStickerId);
  if (error) {
    throw error;
  }
};
