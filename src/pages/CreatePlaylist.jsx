import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Upload, Music, Heart, Star, Disc, Radio, 
  Headphones, Mic2, Guitar, Piano, Drum, PartyPopper, Zap, 
  Flame, Sparkles, Moon, Sun, Coffee, Dumbbell, Plane, Car 
} from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Switch } from '../components/ui/Switch';
import { Label } from '../components/ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/Select';
import { storage, generateId } from '../utils/helpers';

const iconOptions = [
  { name: "Music", icon: Music },
  { name: "Heart", icon: Heart },
  { name: "Star", icon: Star },
  { name: "Disc", icon: Disc },
  { name: "Radio", icon: Radio },
  { name: "Headphones", icon: Headphones },
  { name: "Mic2", icon: Mic2 },
  { name: "Guitar", icon: Guitar },
  { name: "Piano", icon: Piano },
  { name: "Drum", icon: Drum },
  { name: "PartyPopper", icon: PartyPopper },
  { name: "Zap", icon: Zap },
  { name: "Flame", icon: Flame },
  { name: "Sparkles", icon: Sparkles },
  { name: "Moon", icon: Moon },
  { name: "Sun", icon: Sun },
  { name: "Coffee", icon: Coffee },
  { name: "Dumbbell", icon: Dumbbell },
  { name: "Plane", icon: Plane },
  { name: "Car", icon: Car },
];

export default function CreatePlaylist() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [coverUrl, setCoverUrl] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('Music');
  const [folder, setFolder] = useState('');
  const [newFolder, setNewFolder] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const playlists = storage.get('playlists') || [];
  const existingFolders = [...new Set(playlists.map(p => p.folder).filter(Boolean))];

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a local URL for the uploaded image
    const url = URL.createObjectURL(file);
    setCoverUrl(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);

    const finalFolder = newFolder.trim() || folder;
    const newPlaylist = {
      id: generateId(),
      name,
      description,
      is_public: isPublic,
      icon: selectedIcon,
      folder: finalFolder,
      cover_url: coverUrl || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500',
      tracks: [],
      created_at: new Date().toISOString(),
    };

    const updatedPlaylists = [...playlists, newPlaylist];
    storage.set('playlists', updatedPlaylists);

    setIsSaving(false);
    navigate(`/playlist/${newPlaylist.id}`);
  };

  const SelectedIconComponent = iconOptions.find(i => i.name === selectedIcon)?.icon || Music;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <h1 className="text-5xl font-bold mb-8">Create Playlist</h1>

        <Card className="bg-white/5 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Cover Image Preview & Upload */}
            <div className="flex items-start gap-6">
              <div className="relative w-48 h-48 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center overflow-hidden group">
                {coverUrl ? (
                  <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" />
                ) : (
                  <SelectedIconComponent className="w-20 h-20 text-white/60" />
                )}
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Choose Image</p>
                  </div>
                </label>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <Label htmlFor="name">Playlist Name *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="My Awesome Playlist"
                    required
                  />
                </div>

                <div>
                  <Label>Choose Icon</Label>
                  <div className="grid grid-cols-10 gap-2">
                    {iconOptions.map(({ name, icon: Icon }) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => setSelectedIcon(name)}
                        className={`p-2 rounded-lg transition-colors ${
                          selectedIcon === name
                            ? 'bg-godlike-green text-black'
                            : 'bg-white/5 text-white hover:bg-white/10'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your playlist..."
                rows={4}
              />
            </div>

            <div>
              <Label>Folder (Optional)</Label>
              <div className="space-y-2">
                <Select value={folder} onValueChange={setFolder}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select or create a folder" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No Folder</SelectItem>
                    {existingFolders.map(f => (
                      <SelectItem key={f} value={f}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Or create new folder..."
                  value={newFolder}
                  onChange={(e) => setNewFolder(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="cover">Cover Image URL (optional)</Label>
              <Input
                id="cover"
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="public"
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
              <Label htmlFor="public">Make playlist public</Label>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!name || isSaving}
                className="bg-godlike-green text-black"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Creating...' : 'Create Playlist'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
