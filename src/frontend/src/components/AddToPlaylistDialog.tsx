import { useState } from 'react';
import { useAddSongToPlaylist } from '../hooks/useQueries';
import type { Song } from '../backend';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface AddToPlaylistDialogProps {
  song: Song;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddToPlaylistDialog({ song, open, onOpenChange }: AddToPlaylistDialogProps) {
  const [playlistName, setPlaylistName] = useState('');
  const addSongToPlaylist = useAddSongToPlaylist();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playlistName.trim()) return;

    try {
      await addSongToPlaylist.mutateAsync({
        playlistName: playlistName.trim(),
        songId: song.id,
      });
      toast.success(`Added "${song.title}" to playlist`);
      setPlaylistName('');
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to add song to playlist');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to Playlist</DialogTitle>
          <DialogDescription>
            Add "{song.title}" to a playlist. Enter the playlist name.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="playlist">Playlist Name</Label>
              <Input
                id="playlist"
                placeholder="Enter playlist name"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!playlistName.trim() || addSongToPlaylist.isPending}>
              {addSongToPlaylist.isPending ? 'Adding...' : 'Add'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
