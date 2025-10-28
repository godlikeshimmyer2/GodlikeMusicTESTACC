import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Library, PlusSquare, Heart, Music } from 'lucide-react';
import Player from './player/Player';
import { storage } from '../utils/helpers';

export default function Layout({ children }) {
  const location = useLocation();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const savedPlaylists = storage.get('playlists') || [];
    setPlaylists(savedPlaylists);
  }, [location]); // Reload on route change

  const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Library, label: 'Your Library', path: '/library' },
  ];

  return (
    <div className="h-screen flex flex-col bg-black text-white overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-black p-6 space-y-6 border-r border-gray-800">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-godlike-green to-godlike-cyan flex items-center justify-center">
              <Music className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-bold gradient-text">
              GodlikeMusic
            </span>
          </Link>

          {/* Main Navigation */}
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Library Actions */}
          <div className="space-y-2 pt-4 border-t border-gray-800">
            <Link
              to="/create-playlist"
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <PlusSquare className="w-5 h-5" />
              <span className="font-medium">Create Playlist</span>
            </Link>
            <Link
              to="/liked-songs"
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span className="font-medium">Liked Songs</span>
            </Link>
          </div>

          {/* User Playlists */}
          <div className="flex-1 overflow-y-auto space-y-1">
            {playlists.map((playlist) => (
              <Link
                key={playlist.id}
                to={`/playlist/${playlist.id}`}
                className="block px-4 py-2 text-sm text-gray-400 hover:text-white truncate"
              >
                {playlist.name}
              </Link>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 to-black pb-24">
          {children}
        </main>
      </div>

      {/* Global Player */}
      <Player />
    </div>
  );
}
