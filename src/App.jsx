import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import CreatePlaylist from './pages/CreatePlaylist';
import PlaylistDetail from './pages/PlaylistDetail';
import LikedSongs from './pages/LikedSongs';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/library" element={<Library />} />
          <Route path="/create-playlist" element={<CreatePlaylist />} />
          <Route path="/playlist/:id" element={<PlaylistDetail />} />
          <Route path="/liked-songs" element={<LikedSongs />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
