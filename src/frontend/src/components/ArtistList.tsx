import type { Song } from '../backend';
import { getArtistImage } from '../utils/imageMapper';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

interface ArtistListProps {
  songs: Song[];
}

interface Artist {
  name: string;
  songs: Song[];
  image: string;
}

export default function ArtistList({ songs }: ArtistListProps) {
  const { playSong, setQueue } = useAudioPlayer();

  const artists = songs.reduce((acc, song) => {
    const existing = acc.find((a) => a.name === song.artist);
    if (existing) {
      existing.songs.push(song);
    } else {
      acc.push({
        name: song.artist,
        songs: [song],
        image: getArtistImage(song.artist),
      });
    }
    return acc;
  }, [] as Artist[]);

  const handleArtistClick = (artist: Artist) => {
    setQueue(artist.songs);
    playSong(artist.songs[0]);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {artists.map((artist) => (
        <div
          key={artist.name}
          className="group cursor-pointer text-center"
          onClick={() => handleArtistClick(artist)}
        >
          <div className="relative aspect-square mb-3 rounded-full overflow-hidden shadow-md mx-auto">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <h3 className="font-semibold truncate">{artist.name}</h3>
          <p className="text-sm text-muted-foreground">{artist.songs.length} songs</p>
        </div>
      ))}
    </div>
  );
}
