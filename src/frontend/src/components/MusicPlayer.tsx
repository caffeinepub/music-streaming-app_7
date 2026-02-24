import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { formatDuration, getAlbumArtwork } from '../utils/imageMapper';
import AlbumArtwork from './AlbumArtwork';

export default function MusicPlayer() {
  const { currentSong, isPlaying, currentTime, duration, togglePlayPause, skipForward, skipBackward, seekTo } =
    useAudioPlayer();

  if (!currentSong) {
    return null;
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-16 left-0 right-0 bg-card border-t border-border z-50 shadow-lg">
      <div className="px-4 py-3">
        <Slider
          value={[progress]}
          max={100}
          step={0.1}
          onValueChange={(value) => {
            const newTime = (value[0] / 100) * duration;
            seekTo(newTime);
          }}
          className="mb-3"
        />

        <div className="flex items-center gap-3">
          <AlbumArtwork song={currentSong} size="sm" />

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">{currentSong.title}</h3>
            <p className="text-xs text-muted-foreground truncate">{currentSong.artist}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={skipBackward}
              className="p-2 hover:bg-accent rounded-full transition-colors"
              aria-label="Previous song"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={togglePlayPause}
              className="p-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>

            <button
              onClick={skipForward}
              className="p-2 hover:bg-accent rounded-full transition-colors"
              aria-label="Next song"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          <div className="text-xs text-muted-foreground hidden sm:block">
            {formatDuration(currentTime)} / {formatDuration(duration)}
          </div>
        </div>
      </div>
    </div>
  );
}
