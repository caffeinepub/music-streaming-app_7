import type { Song } from '../backend';

export function getAlbumArtwork(album: string): string {
  const albumMap: Record<string, string> = {
    'Electronic Dreams': '/assets/generated/album-electronic.dim_400x400.png',
    'Folk Tales': '/assets/generated/album-folk.dim_400x400.png',
    'Hip Hop Beats': '/assets/generated/album-hiphop.dim_400x400.png',
    'Classical Symphony': '/assets/generated/album-classical.dim_400x400.png',
    'Rock Anthems': '/assets/generated/album-rock.dim_400x400.png',
  };

  return albumMap[album] || '/assets/generated/album-electronic.dim_400x400.png';
}

export function getArtistImage(artist: string): string {
  const artistMap: Record<string, string> = {
    'John Smith': '/assets/generated/artist-male-1.dim_300x300.png',
    'Sarah Johnson': '/assets/generated/artist-female-1.dim_300x300.png',
    'The Rockers': '/assets/generated/artist-band-1.dim_300x300.png',
  };

  // Default based on artist name pattern
  if (artist.includes('The ') || artist.includes('Band')) {
    return artistMap[artist] || '/assets/generated/artist-band-1.dim_300x300.png';
  }
  
  return artistMap[artist] || '/assets/generated/artist-male-1.dim_300x300.png';
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
