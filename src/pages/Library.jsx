import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Music, Heart, Clock, Play, Folder,
  Star, Disc, Radio, Headphones, Mic2, Guitar, 
  Piano, Drum, PartyPopper, Zap, Flame, Sparkles, 
  Moon, Sun, Coffee, Dumbbell, Plane, Car
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { storage } from '../utils/helpers';

const iconMap = {
  Music, Heart, Star, Disc, Radio, Headphones, Mic2, Guitar, 
  Piano, Drum, PartyPopper, Zap, Flame, Sparkles, Moon, 
  Sun, Coffee, Dumbbell, Plane, Car
};

export default function Library() {
  const [playlists, setPlaylists] = useState([]);
  const [likedTracks, setLikedTracks] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    const savedPlaylists = storage.get('playlists') || [];
    setPlaylists(savedPlaylists);
    
    const liked = storage.get('liked_songs') || [];
    setLikedTracks(liked);
    
    const history = storage.get('playback_history') || [];
    setRecentlyPlayed(history);
  }, []);

  const playlistsByFolder = React.useMemo(() => {
    const grouped = { "": [] };
    playlists.forEach(playlist => {
      const folder = playlist.folder || "";
      if (!grouped[folder]) grouped[folder] = [];
      grouped[folder].push(playlist);
    });
    return grouped;
  }, [playlists]);

  const folders = Object.keys(playlistsByFolder).filter(f => f !== "");

  const getPlaylistIcon = (iconName) => iconMap[iconName] || Music;

  const handlePlayTrack = (track) => {
    console.log('Playing track:', track);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">Your Library</h1>

        <Tabs defaultValue="playlists" className="space-y-8">
          <TabsList>
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
            <TabsTrigger value="liked">Liked Songs</TabsTrigger>
            <TabsTrigger value="recent">Recently Played</TabsTrigger>
          </TabsList>

          <TabsContent value="playlists">
            {folders.map(folder => (
              <div key={folder} className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Folder className="w-5 h-5 text-godlike-green" />
                  <h2 className="text-2xl font-bold">{folder}</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {playlistsByFolder[folder].map(playlist => {
                    const Icon = getPlaylistIcon(playlist.icon);
                    return (
                      <Link key={playlist.id} to={`/playlist/${playlist.id}`}>
                        <Card className="bg-white/5 hover:bg-white/10 p-4 group cursor-pointer">
                          <div className="relative mb-4">
                            {playlist.cover_url ? (
                              <img
                                src={playlist.cover_url}
                                alt={playlist.name}
                                className="w-full aspect-square object-cover rounded-md"
                              />
                            ) : (
                              <div className="w-full aspect-square bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-md flex items-center justify-center">
                                <Icon className="w-16 h-16 text-white/60" />
                              </div>
                            )}
                          </div>
                          <h3 className="font-semibold truncate">{playlist.name}</h3>
                          <p className="text-sm text-gray-400">{playlist.tracks?.length || 0} songs</p>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {playlistsByFolder[""].length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Playlists</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {playlistsByFolder[""].map(playlist => {
                    const Icon = getPlaylistIcon(playlist.icon);
                    return (
                      <Link key={playlist.id} to={`/playlist/${playlist.id}`}>
                        <Card className="bg-white/5 hover:bg-white/10 p-4 group cursor-pointer">
                          <div className="relative mb-4">
                            {playlist.cover_url ? (
                              <img
                                src={playlist.cover_url}
                                alt={playlist.name}
                                className="w-full aspect-square object-cover rounded-md"
                              />
                            ) : (
                              <div className="w-full aspect-square bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-md flex items-center justify-center">
                                <Icon className="w-16 h-16 text-white/60" />
                              </div>
                            )}
                          </div>
                          <h3 className="font-semibold truncate">{playlist.name}</h3>
                          <p className="text-sm text-gray-400">{playlist.tracks?.length || 0} songs</p>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {playlists.length === 0 && (
              <div className="text-center py-20">
                <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No playlists yet. Create your first one!</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="liked">
            <div className="space-y-2">
              {likedTracks.map((track, idx) => (
                <Card
                  key={idx}
                  onClick={() => handlePlayTrack(track)}
                  className="bg-white/5 hover:bg-white/10 p-4 flex items-center gap-4 cursor-pointer group"
                >
                  <Play className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img src={track.thumbnail} alt={track.title} className="w-16 h-16 rounded" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{track.title}</h3>
                    <p className="text-sm text-gray-400 truncate">{track.artist}</p>
                  </div>
                  <span className="text-sm text-gray-400">{track.duration}</span>
                </Card>
              ))}
              {likedTracks.length === 0 && (
                <div className="text-center py-20">
                  <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No liked songs yet. Start exploring!</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="recent">
            <div className="space-y-2">
              {recentlyPlayed.map((track, idx) => (
                <Card
                  key={idx}
                  onClick={() => handlePlayTrack(track)}
                  className="bg-white/5 hover:bg-white/10 p-4 flex items-center gap-4 cursor-pointer group"
                >
                  <Play className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img src={track.thumbnail} alt={track.title} className="w-16 h-16 rounded" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{track.title}</h3>
                    <p className="text-sm text-gray-400 truncate">{track.artist}</p>
                  </div>
                  <Clock className="w-4 h-4 text-gray-400" />
                </Card>
              ))}
              {recentlyPlayed.length === 0 && (
                <div className="text-center py-20">
                  <Clock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No playback history yet. Start listening!</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
