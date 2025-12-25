import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import giftBox from '@/assets/gift-box.png';
import Sparkles from '@/components/Sparkles';
import FloatingElements from '@/components/FloatingElements';
import CuteButton from '@/components/CuteButton';

const SurprisePage = () => {
  const navigate = useNavigate();
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleOpenBox = () => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpened(true);
      setTimeout(() => setShowMessage(true), 500);
    }, 1500);
  };

  const handleContinue = () => {
    setIsExiting(true);
    setTimeout(() => navigate('/gallery'), 600);
  };

  return (
    <div className={`min-h-screen min-h-[100dvh] bg-gradient-sunset flex flex-col items-center justify-center px-4 py-8 sm:p-6 relative overflow-hidden transition-all duration-600 ${isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      <Sparkles count={25} />
      {isOpened && <FloatingElements count={30} />}
      
      {/* Decorative stickers */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 text-xl sm:text-2xl animate-float opacity-70">🎉</div>
      <div className="absolute top-8 sm:top-10 right-4 sm:right-8 text-xl sm:text-2xl animate-float opacity-60" style={{ animationDelay: '0.5s' }}>✨</div>
      
      {!isOpened ? (
        <>
          {/* Gift Box */}
          <div 
            className={`z-10 mb-6 sm:mb-8 cursor-pointer transition-all duration-700 ${
              isOpening ? 'animate-shake scale-125' : 'animate-gentle-bounce hover:scale-105'
            }`}
            onClick={handleOpenBox}
          >
            <img 
              src={giftBox} 
              alt="Gift box" 
              className={`w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 drop-shadow-lg transition-all duration-700 ${
                isOpening ? 'opacity-0 scale-150' : ''
              }`}
            />
          </div>

          {!isOpening && (
            <p className="text-lg sm:text-xl font-cute text-muted-foreground z-10 animate-pulse">
              Tap the gift to open! 🎁
            </p>
          )}
        </>
      ) : (
        <div className="z-10 text-center animate-fade-slide-up px-4">
          {/* Revealed Message */}
          <div className="text-5xl sm:text-6xl mb-6 sm:mb-8 animate-gentle-bounce">🎉</div>
          
          {showMessage && (
            <>
              <div className="bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-glow max-w-xs sm:max-w-sm mb-6 sm:mb-8 animate-fade-slide-up">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-handwritten text-primary mb-3 sm:mb-4 glow-text">
                  Ask Anshika 🌟
                </h2>
                <p className="font-cute text-muted-foreground text-sm sm:text-base">
                  Your special surprise is waiting...
                </p>
              </div>

              <CuteButton onClick={handleContinue} variant="pulse">
                Continue 🌟
              </CuteButton>
            </>
          )}
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute top-16 sm:top-20 left-6 sm:left-10 text-2xl sm:text-3xl animate-float opacity-60">🎀</div>
      <div className="absolute top-24 sm:top-32 right-4 sm:right-8 text-xl sm:text-2xl animate-float opacity-50" style={{ animationDelay: '0.5s' }}>✨</div>
      <div className="absolute bottom-24 sm:bottom-32 left-4 sm:left-8 text-xl sm:text-2xl animate-float opacity-50" style={{ animationDelay: '1s' }}>🌸</div>
    </div>
  );
};

export default SurprisePage;
