import type { Song } from '../backend';
import { getAlbumArtwork } from '../utils/imageMapper';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { Play } from 'lucide-react';

interface AlbumGridProps {
  songs: Song[];
}

interface Album {
  name: string;
  artist: string;
  songs: Song[];
  artwork: string;
}

export default function AlbumGrid({ songs }: AlbumGridProps) {
  const { playSong, setQueue } = useAudioPlayer();

  const albums = songs.reduce((acc, song) => {
    const existing = acc.find((a) => a.name === song.album);
    if (existing) {
      existing.songs.push(song);
    } else {
      acc.push({
        name: song.album,
        artist: song.artist,
        songs: [song],
        artwork: getAlbumArtwork(song.album),
      });
    }
    return acc;
  }, [] as Album[]);

  const handleAlbumClick = (album: Album) => {
    setQueue(album.songs);
    playSong(album.songs[0]);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {albums.map((album) => (
        <div
          key={album.name}
          className="group cursor-pointer"
          onClick={() => handleAlbumClick(album)}
        >
          <div className="relative aspect-square mb-3 rounded-lg overflow-hidden shadow-md">
            <img
              src={album.artwork}
              alt={album.name}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="bg-primary text-primary-foreground rounded-full p-3 shadow-lg">
                <Play className="w-6 h-6 ml-0.5" />
              </div>
            </div>
          </div>
          <h3 className="font-semibold truncate">{album.name}</h3>
          <p className="text-sm text-muted-foreground truncate">{album.artist}</p>
          <p className="text-xs text-muted-foreground">{album.songs.length} songs</p>
        </div>
      ))}
    </div>
  );
}
