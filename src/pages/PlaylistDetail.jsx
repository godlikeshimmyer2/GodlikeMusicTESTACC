import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Play, MoreVertical, Clock, Plus, Heart, Trash2,
  Music, Star, Disc, Radio, Headphones, Mic2, Guitar, 
  Piano, Drum, PartyPopper, Zap, Flame, Sparkles, 
  Moon, Sun, Coffee, Dumbbell, Plane, Car
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/Dialog';
import { Input } from '../components/ui/Input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/DropdownMenu';
import { storage } from '../utils/helpers';
import { searchMusic } from '../api/youtube';

const iconMap = {
  Music, Heart, Star, Disc, Radio, Headphones, Mic2, Guitar, 
  Piano, Drum, PartyPopper, Zap, Flame, Sparkles, Moon, 
  Sun, Coffee, Dumbbell, Plane, Car
};

export default function PlaylistDetail() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [likedTracks, setLikedTracks] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadPlaylist();
    const liked = storage.get('liked_songs') || [];
    setLikedTracks(liked.map(t => t.video_id));
  }, [id]);

  const loadPlaylist = () => {
    const playlists = storage.get('playlists') || [];
    const found = playlists.find(p => p.id === id);
    setPlaylist(found);
  };

  const handlePlayAll = () => {
    if (playlist?.tracks?.length > 0) {
      console.log('Playing all tracks');
      // Implement play functionality
    }
  };

  const handlePlayTrack = (track) => {
    console.log('Playing track:', track);
    // Implement play functionality
  };

  const handleLikeTrack = (track) => {
    const liked = storage.get('liked_songs') || [];
    const isLiked = liked.some(t => t.video_id === track.video_id);
    
    if (isLiked) {
      const filtered = liked.filter(t => t.video_id !== track.video_id);
      storage.set('liked_songs', filtered);
      setLikedTracks(filtered.map(t => t.video_id));
    } else {
      const updated = [...liked, { ...track, added_at: new Date().toISOString() }];
      storage.set('liked_songs', updated);
      setLikedTracks(updated.map(t => t.video_id));
    }
  };

  const handleRemoveTrack = (index) => {
    if (!playlist) return;
    const updatedTracks = playlist.tracks.filter((_, i) => i !== index);
    
    const playlists = storage.get('playlists') || [];
    const updatedPlaylists = playlists.map(p => 
      p.id === playlist.id ? { ...p, tracks: updatedTracks } : p
    );
    storage.set('playlists', updatedPlaylists);
    setPlaylist({ ...playlist, tracks: updatedTracks });
  };

  const handleSearchTracks = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    const results = await searchMusic(searchQuery, 10);
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleAddTrack = (track) => {
    if (!playlist) return;
    const updatedTracks = [...(playlist.tracks || []), track];
    
    const playlists = storage.get('playlists') || [];
    const updatedPlaylists = playlists.map(p => 
      p.id === playlist.id ? { ...p, tracks: updatedTracks } : p
    );
    storage.set('playlists', updatedPlaylists);
    setPlaylist({ ...playlist, tracks: updatedTracks });
    setShowAddDialog(false);
    setSearchResults([]);
    setSearchQuery('');
  };

  const handleDeletePlaylist = () => {
    if (confirm('Are you sure you want to delete this playlist?')) {
      const playlists = storage.get('playlists') || [];
      const updated = playlists.filter(p => p.id !== playlist.id);
      storage.set('playlists', updated);
      window.location.href = '/library';
    }
  };

  if (!playlist) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <p className="text-gray-400">Playlist not found</p>
      </div>
    );
  }

  const tracks = playlist.tracks || [];
  const Icon = iconMap[playlist.icon] || Music;

  return (
    <div className="min-h-screen">
      {/* Playlist Header */}
      <div className="relative bg-gradient-to-b from-purple-900/40 to-transparent p-8 pb-24">
        <div className="max-w-7xl mx-auto flex items-end gap-6">
          <div className="w-60 h-60 rounded-lg shadow-2xl overflow-hidden bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center">
            {playlist.cover_url ? (
              <img src={playlist.cover_url} alt={playlist.name} className="w-full h-full object-cover" />
            ) : (
              <Icon className="w-24 h-24 text-white/80" />
            )}
          </div>
          <div className="flex-1 pb-4">
            <p className="text-sm font-semibold uppercase mb-2">Playlist</p>
            <h1 className="text-6xl font-bold mb-6">{playlist.name}</h1>
            <p className="text-gray-300 mb-4">{playlist.description}</p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{tracks.length} songs</span>
              {playlist.folder && (
                <>
                  <span>•</span>
                  <span>{playlist.folder}</span>
                </>
              )}
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
            disabled={tracks.length === 0}
            className="w-14 h-14 rounded-full bg-godlike-green hover:scale-105 transition-all"
          >
            <Play className="w-6 h-6 text-black fill-black ml-1" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setShowAddDialog(true)}
          >
            <Plus className="w-6 h-6" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreVertical className="w-6 h-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleDeletePlaylist} className="text-red-500">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Playlist
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Track List */}
      <div className="px-8 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-white/10 text-sm text-gray-400 mb-2">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Title</div>
            <div className="col-span-3">Artist</div>
            <div className="col-span-2">Duration</div>
            <div className="col-span-1 text-right">
              <Clock className="w-4 h-4 ml-auto" />
            </div>
          </div>

          {tracks.map((track, index) => (
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
              <div className="col-span-2 text-gray-400 text-sm">{track.duration || '3:45'}</div>
              <div className="col-span-1 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleLikeTrack(track)}
                  className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                    likedTracks.includes(track.video_id) ? 'text-godlike-green' : 'text-gray-400'
                  }`}
                >
                  <Heart className="w-4 h-4" fill={likedTracks.includes(track.video_id) ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={() => handleRemoveTrack(index)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}

          {tracks.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">This playlist is empty</p>
              <Button onClick={() => setShowAddDialog(true)} className="mt-4 bg-godlike-green text-black">
                <Plus className="w-4 h-4 mr-2" />
                Add Songs
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Add Tracks Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="bg-gray-900 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Songs to Playlist</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search for songs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchTracks()}
              />
              <Button onClick={handleSearchTracks} disabled={isSearching} className="bg-godlike-green text-black">
                {isSearching ? 'Searching...' : 'Search'}
              </Button>
            </div>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {searchResults.map((track, idx) => (
                <Card key={idx} className="bg-white/5 hover:bg-white/10 p-3 flex items-center gap-3">
                  <img src={track.thumbnail} alt={track.title} className="w-12 h-12 rounded" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate text-sm">{track.title}</h4>
                    <p className="text-xs text-gray-400 truncate">{track.artist}</p>
                  </div>
                  <Button size="sm" onClick={() => handleAddTrack(track)} className="bg-godlike-green text-black">
                    <Plus className="w-4 h-4" />
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
