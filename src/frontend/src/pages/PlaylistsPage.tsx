import { useState } from 'react';
import { Plus, ListMusic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreatePlaylistDialog from '../components/CreatePlaylistDialog';

export default function PlaylistsPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Playlists</h1>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Playlist
        </Button>
      </div>

      <div className="text-center py-12">
        <ListMusic className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">No playlists yet</h3>
        <p className="text-muted-foreground mb-4">Create your first playlist to organize your music</p>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Playlist
        </Button>
      </div>

      <CreatePlaylistDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </div>
  );
}
