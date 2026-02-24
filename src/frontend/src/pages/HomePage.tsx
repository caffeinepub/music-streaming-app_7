import { useGetAllSongs, useAddSong } from '../hooks/useQueries';
import { Music2, Loader2 } from 'lucide-react';
import SongList from '../components/SongList';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function HomePage() {
  const { data: songs, isLoading } = useGetAllSongs();
  const addSong = useAddSong();

  // Add sample songs if none exist
  useEffect(() => {
    if (songs && songs.length === 0 && !addSong.isPending) {
      const sampleSongs = [
        { title: 'Neon Lights', artist: 'John Smith', album: 'Electronic Dreams', duration: BigInt(245), audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
        { title: 'Midnight Drive', artist: 'Sarah Johnson', album: 'Electronic Dreams', duration: BigInt(198), audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
        { title: 'Mountain Song', artist: 'John Smith', album: 'Folk Tales', duration: BigInt(223), audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
        { title: 'River Flow', artist: 'Sarah Johnson', album: 'Folk Tales', duration: BigInt(267), audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
        { title: 'Street Rhythm', artist: 'The Rockers', album: 'Hip Hop Beats', duration: BigInt(189), audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
        { title: 'Urban Dreams', artist: 'The Rockers', album: 'Hip Hop Beats', duration: BigInt(234), audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
        { title: 'Symphony No. 5', artist: 'John Smith', album: 'Classical Symphony', duration: BigInt(312), audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
        { title: 'Thunder Road', artist: 'The Rockers', album: 'Rock Anthems', duration: BigInt(276), audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
      ];

      sampleSongs.forEach(song => {
        addSong.mutate(song);
      });
    }
  }, [songs, addSong]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Music2 className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Music Stream</h1>
        </div>
        <p className="text-muted-foreground">Your personal music collection</p>
      </div>

      {songs && songs.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Recently Added</h2>
          <SongList songs={songs.slice(0, 10)} />
        </div>
      ) : (
        <div className="text-center py-12">
          <Music2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No songs yet</h3>
          <p className="text-muted-foreground">Start building your music library</p>
        </div>
      )}
    </div>
  );
}
