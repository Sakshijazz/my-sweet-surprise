import { useState, useRef } from 'react';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Real happy birthday piano music - royalty-free
  const musicUrl = "https://cdn.pixabay.com/audio/2022/10/25/audio_344de570a8.mp3";

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Autoplay was prevented, user needs to interact first
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        preload="auto"
      />
      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-card shadow-soft flex items-center justify-center transition-all duration-500 hover:scale-110 hover:shadow-glow active:scale-95"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        <span className="text-xl">
          {isPlaying ? '🔊' : '🔇'}
        </span>
      </button>
    </>
  );
};

export default BackgroundMusic;
