/**
 * Simple state management for music player
 * No external dependencies - pure JavaScript class
 */
class PlayerStore {
  constructor() {
    this.listeners = [];
    this.state = {
      currentTrack: null,
      isPlaying: false,
      queue: [],
      volume: 70,
      isShuffled: false,
      repeatMode: 'off', // 'off', 'all', 'one'
    };
  }

  /**
   * Subscribe to state changes
   * @param {Function} listener - Callback function
   * @returns {Function} Unsubscribe function
   */
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * Notify all listeners of state change
   */
  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  /**
   * Play a specific track
   * @param {Object} track - Track object with video_id, title, artist, etc.
   */
  playTrack(track) {
    this.state = {
      ...this.state,
      currentTrack: track,
      isPlaying: true,
    };
    this.notify();
  }

  /**
   * Toggle play/pause
   */
  togglePlay() {
    this.state = {
      ...this.state,
      isPlaying: !this.state.isPlaying,
    };
    this.notify();
  }

  /**
   * Set playing state
   * @param {Boolean} isPlaying
   */
  setPlaying(isPlaying) {
    this.state = {
      ...this.state,
      isPlaying,
    };
    this.notify();
  }

  /**
   * Set playback queue
   * @param {Array} tracks - Array of track objects
   */
  setQueue(tracks) {
    this.state = {
      ...this.state,
      queue: tracks,
    };
    this.notify();
  }

  /**
   * Skip to next track
   */
  next() {
    const currentIndex = this.state.queue.findIndex(
      t => t.video_id === this.state.currentTrack?.video_id
    );
    if (currentIndex < this.state.queue.length - 1) {
      this.playTrack(this.state.queue[currentIndex + 1]);
    } else if (this.state.repeatMode === 'all') {
      this.playTrack(this.state.queue[0]);
    }
  }

  /**
   * Skip to previous track
   */
  previous() {
    const currentIndex = this.state.queue.findIndex(
      t => t.video_id === this.state.currentTrack?.video_id
    );
    if (currentIndex > 0) {
      this.playTrack(this.state.queue[currentIndex - 1]);
    }
  }

  /**
   * Set volume
   * @param {Number} volume - Volume level (0-100)
   */
  setVolume(volume) {
    this.state = {
      ...this.state,
      volume,
    };
    this.notify();
  }

  /**
   * Toggle shuffle mode
   */
  toggleShuffle() {
    this.state = {
      ...this.state,
      isShuffled: !this.state.isShuffled,
    };
    this.notify();
  }

  /**
   * Cycle through repeat modes: off -> all -> one -> off
   */
  cycleRepeat() {
    const modes = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(this.state.repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    this.state = {
      ...this.state,
      repeatMode: modes[nextIndex],
    };
    this.notify();
  }

  /**
   * Get current state
   * @returns {Object} Current state
   */
  getState() {
    return this.state;
  }
}

// Export singleton instance
export default new PlayerStore();
