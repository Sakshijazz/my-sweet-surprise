import { useState, useRef, useEffect } from 'react';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Happy birthday piano music - using a royalty-free piano melody URL
  const musicUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  useEffect(() => {
    // Try to auto-play when user first interacts with the page
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
      }
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [hasInteracted]);

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
