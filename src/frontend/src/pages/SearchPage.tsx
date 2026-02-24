import { useState } from 'react';
import { useSearchSongs } from '../hooks/useQueries';
import { Search as SearchIcon } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import SongList from '../components/SongList';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: results, isLoading } = useSearchSongs(searchTerm);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Search</h1>
        <SearchBar onSearch={setSearchTerm} />
      </div>

      {searchTerm ? (
        <div>
          {isLoading ? (
            <p className="text-center text-muted-foreground py-12">Searching...</p>
          ) : results && results.length > 0 ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Found {results.length} {results.length === 1 ? 'result' : 'results'}
              </h2>
              <SongList songs={results} />
            </div>
          ) : (
            <div className="text-center py-12">
              <SearchIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground">Try searching for something else</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <SearchIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Search for music</h3>
          <p className="text-muted-foreground">Find your favorite songs and artists</p>
        </div>
      )}
    </div>
  );
}
