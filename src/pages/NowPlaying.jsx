import React from 'react';
import PlayerStore from '../store/PlayerStore';

export default function NowPlaying() {
  const { currentTrack } = PlayerStore;

  if (!currentTrack)
    return (
      <div className="p-8 text-gray-400">
        Nothing is playing right now.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-8 pb-32 text-center">
      <img
        src={currentTrack.thumbnail || '/default_album.png'}
        alt={currentTrack.title}
        className="w-72 h-72 mx-auto rounded-xl mb-6 object-cover"
      />
      <h1 className="text-4xl font-bold mb-2">{currentTrack.title}</h1>
      <p className="text-gray-400 mb-6">{currentTrack.artist}</p>
      <p className="text-sm text-gray-500">Now playing from YouTube</p>
    </div>
  );
}
