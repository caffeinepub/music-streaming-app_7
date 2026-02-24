import type { Song } from '../backend';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { Play, Pause, MoreVertical } from 'lucide-react';
import { formatDuration } from '../utils/imageMapper';
import AlbumArtwork from './AlbumArtwork';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import AddToPlaylistDialog from './AddToPlaylistDialog';

interface SongListProps {
  songs: Song[];
}

export default function SongList({ songs }: SongListProps) {
  const { currentSong, isPlaying, playSong, togglePlayPause, setQueue } = useAudioPlayer();
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);

  const handleSongClick = (song: Song) => {
    if (currentSong?.id === song.id) {
      togglePlayPause();
    } else {
      setQueue(songs);
      playSong(song);
    }
  };

  const handleAddToPlaylist = (song: Song) => {
    setSelectedSong(song);
    setShowAddToPlaylist(true);
  };

  return (
    <>
      <div className="space-y-1">
        {songs.map((song) => {
          const isCurrentSong = currentSong?.id === song.id;
          const isCurrentlyPlaying = isCurrentSong && isPlaying;

          return (
            <div
              key={song.id.toString()}
              className={`flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer group ${
                isCurrentSong ? 'bg-accent' : ''
              }`}
              onClick={() => handleSongClick(song)}
            >
              <div className="relative">
                <AlbumArtwork song={song} size="md" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
                  {isCurrentlyPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-0.5" />
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className={`font-medium truncate ${isCurrentSong ? 'text-primary' : ''}`}>{song.title}</h3>
                <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
              </div>

              <div className="text-sm text-muted-foreground hidden sm:block">
                {formatDuration(Number(song.duration))}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    handleAddToPlaylist(song);
                  }}>
                    Add to Playlist
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        })}
      </div>

      {selectedSong && (
        <AddToPlaylistDialog
          song={selectedSong}
          open={showAddToPlaylist}
          onOpenChange={setShowAddToPlaylist}
        />
      )}
    </>
  );
}
