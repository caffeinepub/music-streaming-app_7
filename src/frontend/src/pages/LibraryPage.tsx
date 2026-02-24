import { useGetAllSongs } from '../hooks/useQueries';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SongList from '../components/SongList';
import AlbumGrid from '../components/AlbumGrid';
import ArtistList from '../components/ArtistList';

export default function LibraryPage() {
  const { data: songs, isLoading } = useGetAllSongs();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Library</h1>

      <Tabs defaultValue="songs" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="songs">Songs</TabsTrigger>
          <TabsTrigger value="albums">Albums</TabsTrigger>
          <TabsTrigger value="artists">Artists</TabsTrigger>
        </TabsList>

        <TabsContent value="songs">
          {songs && songs.length > 0 ? (
            <SongList songs={songs} />
          ) : (
            <p className="text-center text-muted-foreground py-12">No songs in your library</p>
          )}
        </TabsContent>

        <TabsContent value="albums">
          {songs && songs.length > 0 ? (
            <AlbumGrid songs={songs} />
          ) : (
            <p className="text-center text-muted-foreground py-12">No albums in your library</p>
          )}
        </TabsContent>

        <TabsContent value="artists">
          {songs && songs.length > 0 ? (
            <ArtistList songs={songs} />
          ) : (
            <p className="text-center text-muted-foreground py-12">No artists in your library</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
