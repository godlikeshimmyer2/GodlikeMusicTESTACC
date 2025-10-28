import React from 'react';
import { Heart, Play } from 'lucide-react';
import { Card } from '../components/ui/Card';
import PlayerStore from '../store/PlayerStore';
import { storage } from '../utils/helpers';

export default function LikedSongs() {
  const likedTracks = storage.get('liked_songs') || [];

  const handlePlay = (track) => {
    PlayerStore.playTrack(track);
  };

  return (
    <div className="max-w-7xl mx-auto p-8 pb-32">
      <h1 className="text-5xl font-bold mb-8">Liked Songs</h1>
      {likedTracks.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {likedTracks.map((track, idx) => (
            <Card
              key={idx}
              onClick={() => handlePlay(track)}
              className="bg-white/5 border-none hover:bg-white/10 p-4 group cursor-pointer"
            >
              <div className="relative mb-4">
                <img
                  src={track.thumbnail || '/default_album.png'}
                  alt={track.title}
                  className="rounded-xl w-full h-40 object-cover"
                />
                <button className="absolute bottom-2 right-2 bg-godlike-green text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition">
                  <Play size={20} />
                </button>
              </div>
              <h3 className="font-semibold truncate">{track.title}</h3>
              <p className="text-sm text-gray-400 truncate">{track.artist || 'Unknown Artist'}</p>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No liked songs yet.</p>
      )}
    </div>
  );
}
