import { useState } from 'react';
import { useCreatePlaylist } from '../hooks/useQueries';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface CreatePlaylistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreatePlaylistDialog({ open, onOpenChange }: CreatePlaylistDialogProps) {
  const [name, setName] = useState('');
  const createPlaylist = useCreatePlaylist();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await createPlaylist.mutateAsync(name);
      toast.success('Playlist created successfully!');
      setName('');
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to create playlist');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Playlist</DialogTitle>
          <DialogDescription>Give your playlist a name to get started.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Playlist Name</Label>
              <Input
                id="name"
                placeholder="My Awesome Playlist"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim() || createPlaylist.isPending}>
              {createPlaylist.isPending ? 'Creating...' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
