import { useState } from 'react';
import coupleBlob from '@/assets/couple-blob.png';
import Sparkles from '@/components/Sparkles';
import FloatingElements from '@/components/FloatingElements';
import CuteButton from '@/components/CuteButton';

const FinalPage = () => {
  const [showElements, setShowElements] = useState(false);

  const handleClick = () => {
    setShowElements(true);
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-sunset flex flex-col items-center justify-center px-4 py-8 sm:p-6 relative overflow-hidden">
      <Sparkles count={30} />
      {showElements && <FloatingElements count={60} />}
      
      {/* Decorative stickers */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 text-xl sm:text-2xl animate-float opacity-70">🎂</div>
      <div className="absolute top-8 sm:top-10 right-4 sm:right-8 text-2xl sm:text-3xl animate-float opacity-60" style={{ animationDelay: '0.5s' }}>✨</div>
      
      {/* Rotating Sticker */}
      <div className="z-10 mb-6 sm:mb-8">
        <img 
          src={coupleBlob} 
          alt="Cute couple" 
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 animate-slow-rotate drop-shadow-lg"
        />
      </div>

      {/* Final Message */}
      <div className="z-10 text-center max-w-xs sm:max-w-sm px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-handwritten text-foreground mb-3 sm:mb-4 animate-fade-slide-up glow-text">
          You will always be special to me 🌟
        </h1>
        
        <p className="font-cute text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
          Thank you for being you. Thank you for existing. Thank you for being in my life.
        </p>
      </div>

      {/* Button */}
      <div className="z-10 animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
        <CuteButton onClick={handleClick} variant="pulse">
          Forever Yours 🌟
        </CuteButton>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-16 sm:top-20 left-6 sm:left-10 text-3xl sm:text-4xl animate-float opacity-60">🌻</div>
      <div className="absolute top-24 sm:top-32 right-4 sm:right-8 text-2xl sm:text-3xl animate-float opacity-50" style={{ animationDelay: '0.5s' }}>✨</div>
      <div className="absolute bottom-24 sm:bottom-32 left-4 sm:left-8 text-2xl sm:text-3xl animate-float opacity-50" style={{ animationDelay: '1s' }}>🦋</div>
      <div className="absolute bottom-16 sm:bottom-20 right-6 sm:right-10 text-3xl sm:text-4xl animate-float opacity-60" style={{ animationDelay: '1.5s' }}>🌸</div>
    </div>
  );
};

export default FinalPage;
