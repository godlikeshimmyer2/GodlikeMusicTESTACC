import React, { useState, useEffect } from 'react';
import { Heart, Play, Clock, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { storage } from '../utils/helpers';

export default function LikedSongs() {
  const [likedTracks, setLikedTracks] = useState([]);

  useEffect(() => {
    const liked = storage.get('liked_songs') || [];
    setLikedTracks(liked);
  }, []);

  const handlePlayAll = () => {
    if (likedTracks.length > 0) {
      console.log('Playing all liked songs');
      // Implement play functionality
    }
  };

  const handlePlayTrack = (track) => {
    console.log('Playing track:', track);
    // Implement play functionality
  };

  const handleRemoveTrack = (index) => {
    const updated = likedTracks.filter((_, i) => i !== index);
    storage.set('liked_songs', updated);
    setLikedTracks(updated);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative bg-gradient-to-b from-purple-900/60 to-transparent p-8 pb-24">
        <div className="max-w-7xl mx-auto flex items-end gap-6">
          <div className="w-60 h-60 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-2xl flex items-center justify-center">
            <Heart className="w-24 h-24 text-white fill-white" />
          </div>
          <div className="flex-1 pb-4">
            <p className="text-sm font-semibold uppercase mb-2">Playlist</p>
            <h1 className="text-6xl font-bold mb-6">Liked Songs</h1>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{likedTracks.length} songs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gradient-to-b from-black/40 to-black px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Button
            size="lg"
            onClick={handlePlayAll}
            disabled={likedTracks.length === 0}
            className="w-14 h-14 rounded-full bg-godlike-green hover:scale-105 transition-all"
          >
            <Play className="w-6 h-6 text-black fill-black ml-1" />
          </Button>
        </div>
      </div>

      {/* Track List */}
      <div className="px-8 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-white/10 text-sm text-gray-400 mb-2">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Title</div>
            <div className="col-span-3">Artist</div>
            <div className="col-span-2">Date Added</div>
            <div className="col-span-1 text-right">
              <Clock className="w-4 h-4 ml-auto" />
            </div>
          </div>

          {likedTracks.map((track, index) => (
            <Card
              key={index}
              className="grid grid-cols-12 gap-4 items-center px-4 py-3 bg-transparent hover:bg-white/5 transition-all group"
            >
              <div className="col-span-1 text-gray-400 group-hover:hidden">{index + 1}</div>
              <button onClick={() => handlePlayTrack(track)} className="col-span-1 hidden group-hover:block">
                <Play className="w-4 h-4 text-white fill-white" />
              </button>
              <div className="col-span-5 flex items-center gap-3">
                <img src={track.thumbnail} alt={track.title} className="w-10 h-10 rounded" />
                <span className="font-semibold truncate">{track.title}</span>
              </div>
              <div className="col-span-3 text-gray-400 truncate">{track.artist}</div>
              <div className="col-span-2 text-gray-400 text-sm">
                {track.added_at ? new Date(track.added_at).toLocaleDateString() : 'Recently'}
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <button
                  onClick={() => handleRemoveTrack(index)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}

          {likedTracks.length === 0 && (
            <div className="text-center py-20">
              <Heart className="w-20 h-20 text-gray-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Songs you like will appear here</h2>
              <p className="text-gray-400 text-lg">Save songs by tapping the heart icon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
