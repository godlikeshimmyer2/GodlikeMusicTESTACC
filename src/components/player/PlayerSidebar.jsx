import React, { useState, useEffect } from 'react';
import PlayerStore from '../../store/PlayerStore';
import { X, Music } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export default function PlayerSidebar({ isOpen, onClose }) {
  const [playerState, setPlayerState] = useState(PlayerStore.getState());

  useEffect(() => {
    const unsubscribe = PlayerStore.subscribe(setPlayerState);
    return unsubscribe;
  }, []);

  if (!isOpen || !playerState.currentTrack) return null;

  const { currentTrack, queue } = playerState;

  return (
    <div className="fixed right-0 top-0 bottom-24 w-96 bg-black border-l border-gray-800 z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <h2 className="font-semibold">Now Playing</h2>
        <Button size="sm" variant="ghost" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* YouTube Player */}
      <div className="aspect-video bg-gray-900">
        <iframe
          src={`https://www.youtube.com/embed/${currentTrack.video_id}?autoplay=1&controls=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      {/* Current Track Info */}
      <div className="p-6 border-b border-gray-800">
        <h3 className="text-2xl font-bold mb-2">{currentTrack.title}</h3>
        <p className="text-gray-400">{currentTrack.artist}</p>
      </div>

      {/* Queue */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="font-semibold mb-4">Up Next</h3>
        <div className="space-y-2">
          {queue.map((track, index) => (
            <Card
              key={index}
              onClick={() => PlayerStore.playTrack(track)}
              className={`bg-white/5 hover:bg-white/10 p-3 flex items-center gap-3 cursor-pointer ${
                track.video_id === currentTrack.video_id ? 'bg-white/10' : ''
              }`}
            >
              <img
                src={track.thumbnail}
                alt={track.title}
                className="w-12 h-12 rounded"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate text-sm">{track.title}</h4>
                <p className="text-xs text-gray-400 truncate">{track.artist}</p>
              </div>
            </Card>
          ))}
          {queue.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Music className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm">Queue is empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
