import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import type { Song } from '../backend';

interface AudioPlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  queue: Song[];
  playSong: (song: Song) => void;
  togglePlayPause: () => void;
  skipForward: () => void;
  skipBackward: () => void;
  seekTo: (time: number) => void;
  setQueue: (songs: Song[]) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queue, setQueue] = useState<Song[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      });
      
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
      });
      
      audioRef.current.addEventListener('ended', () => {
        skipForward();
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const playSong = (song: Song) => {
    if (audioRef.current) {
      setCurrentSong(song);
      audioRef.current.src = song.audioFile;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipForward = () => {
    if (currentSong && queue.length > 0) {
      const currentIndex = queue.findIndex(s => s.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % queue.length;
      playSong(queue[nextIndex]);
    }
  };

  const skipBackward = () => {
    if (currentSong && queue.length > 0) {
      const currentIndex = queue.findIndex(s => s.id === currentSong.id);
      const prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
      playSong(queue[prevIndex]);
    }
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        currentTime,
        duration,
        queue,
        playSong,
        togglePlayPause,
        skipForward,
        skipBackward,
        seekTo,
        setQueue,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within AudioPlayerProvider');
  }
  return context;
}
