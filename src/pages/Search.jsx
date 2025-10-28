import React, { useState } from 'react';
import { Search as SearchIcon, Play } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import PlayerStore from '../store/PlayerStore';
import { searchMusic } from '../api/youtube'; // <-- FIXED IMPORT

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const data = await searchMusic(query); // <-- USE searchMusic
    setResults(data || []);
  };

  const handlePlay = (track) => {
    PlayerStore.playTrack(track);
  };

  return (
    <div className="max-w-7xl mx-auto p-8 pb-32">
      <form onSubmit={handleSearch} className="flex items-center mb-8 gap-4">
        <Input
          type="text"
          placeholder="Search for songs, artists, or playlists"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <button
          type="submit"
          className="bg-godlike-green px-4 py-2 rounded-lg text-black font-bold"
        >
          <SearchIcon className="inline mr-2" size={18} /> Search
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {results.map((track, idx) => (
          <Card
            key={idx}
            className="bg-white/5 border-none hover:bg-white/10 transition-all p-4 group cursor-pointer"
            onClick={() => handlePlay(track)}
          >
            <div classNam
