import React, { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AudioController = () => {
  const [isMuted, setIsMuted] = useState(true); // Start muted
  const audioRef = useRef(null);
  
  // TODO: Add your music file to /public/audio/ folder
  // Then update this path to match your file name
  // Example: const audioSrc = '/audio/your-music.mp3';
  const audioSrc = '/audio/cyberpunk.mp3'; // Set to null when no audio file is available

  const playAudio = () => {
    if (audioRef.current && audioSrc) {
      audioRef.current.play().catch(err => {
        console.log('Audio play failed:', err);
      });
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const toggleMute = () => {
    if (!audioSrc) {
      console.log('No audio file configured. Please add your music file.');
      return;
    }
    
    if (isMuted) {
      playAudio();
      setIsMuted(false);
    } else {
      pauseAudio();
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Hidden audio element */}
      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          loop
          volume={0.3}
        />
      )}
      
      <button
        onClick={toggleMute}
        className={`
          group relative p-4 rounded-full
          ${isMuted 
            ? 'bg-gray-800 border-2 border-gray-600' 
            : 'bg-gradient-to-br from-cyan-500 to-purple-600 border-2 border-cyan-400'}
          hover:scale-110 transition-all duration-300
          shadow-lg hover:shadow-cyan-400/50
        `}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-gray-400" />
        ) : (
          <Volume2 className="w-6 h-6 text-white" />
        )}
        
        {/* Pulse Effect when playing */}
        {!isMuted && (
          <div className="absolute inset-0 rounded-full bg-cyan-400/30 animate-ping" />
        )}
        
        {/* Tooltip */}
        <div className={`
          absolute bottom-full mb-2 right-0 whitespace-nowrap
          bg-black/90 backdrop-blur-sm px-3 py-1 rounded
          border border-cyan-400/50 font-mono text-xs text-cyan-400
          transition-all duration-300
          ${isMuted ? 'opacity-0 group-hover:opacity-100' : 'opacity-0 group-hover:opacity-100'}
        `}>
          {isMuted ? 'ENABLE_AUDIO' : 'DISABLE_AUDIO'}
        </div>
      </button>
    </div>
  );
};

export default AudioController;
