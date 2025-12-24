import { useState } from 'react';
import coupleBlob from '@/assets/couple-blob.png';
import Sparkles from '@/components/Sparkles';
import FloatingHearts from '@/components/FloatingHearts';
import CuteButton from '@/components/CuteButton';

const FinalPage = () => {
  const [showHearts, setShowHearts] = useState(false);

  const handleClick = () => {
    setShowHearts(true);
  };

  return (
    <div className="min-h-screen bg-gradient-romantic flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <Sparkles count={30} />
      {showHearts && <FloatingHearts count={60} />}
      
      {/* Rotating Sticker */}
      <div className="z-10 mb-8">
        <img 
          src={coupleBlob} 
          alt="Cute couple" 
          className="w-40 h-40 md:w-48 md:h-48 animate-slow-rotate drop-shadow-lg"
        />
      </div>

      {/* Final Message */}
      <div className="z-10 text-center max-w-sm">
        <h1 className="text-3xl md:text-4xl font-handwritten text-foreground mb-4 animate-fade-slide-up glow-text">
          You will always be special to me 💖
        </h1>
        
        <p className="font-cute text-lg text-muted-foreground mb-8 animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
          Thank you for being you. Thank you for existing. Thank you for being mine.
        </p>
      </div>

      {/* Button */}
      <div className="z-10 animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
        <CuteButton onClick={handleClick} variant="pulse">
          Forever Yours 💞
        </CuteButton>
      </div>

      {/* Decorative hearts */}
      <div className="absolute top-20 left-10 text-4xl animate-float opacity-60">💕</div>
      <div className="absolute top-32 right-8 text-3xl animate-float opacity-50" style={{ animationDelay: '0.5s' }}>✨</div>
      <div className="absolute bottom-32 left-8 text-3xl animate-float opacity-50" style={{ animationDelay: '1s' }}>💗</div>
      <div className="absolute bottom-20 right-10 text-4xl animate-float opacity-60" style={{ animationDelay: '1.5s' }}>🌸</div>
    </div>
  );
};

export default FinalPage;
