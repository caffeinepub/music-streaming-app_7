import type { Song } from '../backend';
import { getAlbumArtwork } from '../utils/imageMapper';

interface AlbumArtworkProps {
  song: Song;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function AlbumArtwork({ song, size = 'md', className = '' }: AlbumArtworkProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-full aspect-square',
  };

  return (
    <img
      src={getAlbumArtwork(song.album)}
      alt={`${song.album} cover`}
      className={`${sizeClasses[size]} object-cover rounded-md ${className}`}
      loading="lazy"
    />
  );
}
