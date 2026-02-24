import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Song, Playlist } from '../backend';

export function useGetAllSongs() {
  const { actor, isFetching } = useActor();

  return useQuery<Song[]>({
    queryKey: ['songs'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSongs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSearchSongs(searchTerm: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Song[]>({
    queryKey: ['songs', 'search', searchTerm],
    queryFn: async () => {
      if (!actor || !searchTerm) return [];
      return actor.searchSongs(searchTerm);
    },
    enabled: !!actor && !isFetching && searchTerm.length > 0,
  });
}

export function useCreatePlaylist() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.createPlaylist(name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists'] });
    },
  });
}

export function useAddSongToPlaylist() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ playlistName, songId }: { playlistName: string; songId: bigint }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addSongToPlaylist(playlistName, songId);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['playlist', variables.playlistName] });
    },
  });
}

export function useGetPlaylist(playlistName: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Playlist | null>({
    queryKey: ['playlist', playlistName],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPlaylist(playlistName);
    },
    enabled: !!actor && !isFetching && !!playlistName,
  });
}

export function useAddSong() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (song: { title: string; artist: string; album: string; duration: bigint; audioFile: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addSong(song.title, song.artist, song.album, song.duration, song.audioFile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] });
    },
  });
}
