import { useParams } from '@tanstack/react-router';
import { useGetPlaylist, useGetAllSongs } from '../hooks/useQueries';
import { Loader2, ListMusic } from 'lucide-react';
import SongList from '../components/SongList';

export default function PlaylistDetailPage() {
  const { playlistName } = useParams({ strict: false }) as { playlistName: string };
  const { data: playlist, isLoading: playlistLoading } = useGetPlaylist(playlistName);
  const { data: allSongs, isLoading: songsLoading } = useGetAllSongs();

  if (playlistLoading || songsLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="p-4 max-w-6xl mx-auto">
        <div className="text-center py-12">
          <ListMusic className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Playlist not found</h3>
          <p className="text-muted-foreground">This playlist doesn't exist</p>
        </div>
      </div>
    );
  }

  const playlistSongs = allSongs?.filter((song) => playlist.songs.includes(song.id)) || [];

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{playlist.name}</h1>
        <p className="text-muted-foreground">
          {playlist.songs.length} {playlist.songs.length === 1 ? 'song' : 'songs'}
        </p>
      </div>

      {playlistSongs.length > 0 ? (
        <SongList songs={playlistSongs} />
      ) : (
        <div className="text-center py-12">
          <ListMusic className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No songs in this playlist</h3>
          <p className="text-muted-foreground">Add songs from your library</p>
        </div>
      )}
    </div>
  );
}
