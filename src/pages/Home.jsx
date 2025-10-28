import React, { useState } from 'react';
import { Search as SearchIcon, Play, Heart, Plus } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { searchMusic } from '../api/youtube';
import PlayerStore from '../store/PlayerStore';
import { storage } from '../utils/helpers';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    const tracks = await searchMusic(query);
    setResults(tracks);
    setIsSearching(false);
  };

  const handlePlay = (track) => {
    PlayerStore.playTrack(track);
    
    // Save to history
    const history = storage.get('playback_history') || [];
    const newHistory = [track, ...history.filter(t => t.video_id !== track.video_id)].slice(0, 50);
    storage.set('playback_history', newHistory);
  };

  const handleLike = (track) => {
    const liked = storage.get('liked_songs') || [];
    const isLiked = liked.some(t => t.video_id === track.video_id);
    
    if (isLiked) {
      storage.set('liked_songs', liked.filter(t => t.video_id !== track.video_id));
    } else {
      storage.set('liked_songs', [...liked, { ...track, added_at: new Date().toISOString() }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Search Header */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="What do you want to listen to?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-12 pr-4 py-6 text-lg bg-white/10 text-white placeholder:text-gray-400 rounded-full"
            />
          </div>
        </div>

        {/* Search Results */}
        {isSearching ? (
          <div className="text-center py-20">
            <div className="animate-spin w-12 h-12 border-4 border-godlike-green border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400">Searching...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Search Results</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.map((track, idx) => (
                <Card
                  key={idx}
                  className="bg-white/5 hover:bg-white/10 p-4 group"
                >
                  <div className="relative mb-4">
                    <img
                      src={track.thumbnail}
                      alt={track.title}
                      className="w-full aspect-square object-cover rounded-md"
                    />
                    <button
                      onClick={() => handlePlay(track)}
                      className="absolute bottom-2 right-2 w-12 h-12 bg-godlike-green rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-xl"
                    >
                      <Play className="w-5 h-5 text-black fill-black ml-1" />
                    </button>
                  </div>
                  <h3 className="font-semibold truncate">{track.title}</h3>
                  <p className="text-sm text-gray-400 truncate">{track.artist}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleLike(track)}
                      className="text-gray-400 hover:text-white p-1"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-400 hover:text-white p-1"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : query ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No results found. Try a different search.</p>
          </div>
        ) : (
          <div className="text-center py-20">
            <SearchIcon className="w-20 h-20 text-gray-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Search for music</h2>
            <p className="text-gray-400 text-lg">Find your favorite songs, artists, and albums</p>
          </div>
        )}
      </div>
    </div>
  );
}
