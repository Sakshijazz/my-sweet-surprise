import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sparkles from '@/components/Sparkles';
import CuteButton from '@/components/CuteButton';

const LittleNotePage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [flapOpen, setFlapOpen] = useState(false);
  const [letterSliding, setLetterSliding] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleEnvelopeClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      // First open the flap
      setTimeout(() => setFlapOpen(true), 100);
      // Then slide out the letter
      setTimeout(() => setLetterSliding(true), 600);
      // Finally show the full letter preview
      setTimeout(() => setShowLetter(true), 1200);
    }
  };

  const handleReadMore = () => {
    setIsExiting(true);
    setTimeout(() => navigate('/letter'), 600);
  };

  return (
    <div className={`min-h-screen bg-gradient-sunset flex flex-col items-center justify-center p-6 relative overflow-hidden transition-all duration-600 ${isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      <Sparkles count={15} />
      
      {/* Decorative stickers */}
      <div className="absolute top-6 left-6 text-2xl animate-float opacity-70">🌸</div>
      <div className="absolute top-10 right-8 text-2xl animate-float opacity-60" style={{ animationDelay: '0.5s' }}>✨</div>
      
      {/* Header */}
      <h2 className="text-2xl md:text-3xl font-handwritten text-foreground mb-12 text-center z-10 animate-fade-slide-up">
        A little note for you…
      </h2>

      {/* Envelope with animation */}
      <div 
        className={`relative z-10 cursor-pointer transition-all duration-700 ease-out ${!isOpen ? 'animate-gentle-bounce hover:scale-105' : ''}`}
        onClick={handleEnvelopeClick}
        style={{ perspective: '1000px' }}
      >
        {/* Envelope Body */}
        <div className="relative w-64 h-44 md:w-80 md:h-56">
          {/* Back of envelope */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl shadow-soft border-2 border-amber-200" />
          
          {/* Inner paper (slides out) */}
          <div 
            className={`absolute left-4 right-4 bg-white rounded-lg shadow-md transition-all duration-700 ease-out ${
              letterSliding ? 'h-32 -top-24 md:h-40 md:-top-32' : 'h-20 top-4'
            }`}
            style={{ zIndex: letterSliding ? 5 : 1 }}
          >
            <div className="p-3 font-handwritten text-sm text-foreground">
              {letterSliding && (
                <>
                  <p className="text-primary font-semibold">My dearest Aditya,</p>
                  <p className="text-xs text-muted-foreground mt-1">On this special day...</p>
                </>
              )}
            </div>
          </div>
          
          {/* Front flap (triangular) */}
          <div 
            className={`absolute top-0 left-0 right-0 h-24 md:h-28 origin-top transition-all duration-500 ease-out`}
            style={{ 
              transform: flapOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
              transformStyle: 'preserve-3d',
              zIndex: flapOpen ? 0 : 10
            }}
          >
            {/* Flap front */}
            <div 
              className="absolute inset-0"
              style={{ 
                backfaceVisibility: 'hidden',
                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-amber-200 to-orange-200 rounded-t-xl border-2 border-amber-300" />
            </div>
            {/* Flap back */}
            <div 
              className="absolute inset-0"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateX(180deg)',
                clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100" />
            </div>
          </div>
          
          {/* Front of envelope (bottom part) */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-28 md:h-32 bg-gradient-to-br from-amber-200 to-orange-200 rounded-b-xl border-2 border-t-0 border-amber-300"
            style={{ zIndex: 2 }}
          >
            {/* Heart seal */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-3xl">
              {!flapOpen && '💌'}
            </div>
          </div>
        </div>
        
        {!isOpen && (
          <p className="text-center mt-4 font-cute text-muted-foreground animate-pulse">
            Tap to open 📜
          </p>
        )}
      </div>

      {/* Letter Preview */}
      {showLetter && (
        <div className="mt-8 z-10 animate-fade-slide-up max-w-sm">
          <div className="bg-pastel-cream rounded-3xl p-6 shadow-glow">
            <div className="font-handwritten text-lg text-foreground leading-relaxed">
              <p className="mb-4 text-primary font-semibold">My dearest Aditya,</p>
              <p className="text-muted-foreground">
                On this special day, I want you to know how much you mean to me...
              </p>
              <p className="mt-4 text-sm text-primary italic">
                (There's more to read... 🌟)
              </p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <CuteButton onClick={handleReadMore} variant="pulse">
              Read Full Letter 📝
            </CuteButton>
          </div>
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute top-16 left-8 text-2xl animate-float opacity-50">📜</div>
      <div className="absolute bottom-16 right-8 text-2xl animate-float opacity-50" style={{ animationDelay: '1.5s' }}>🎀</div>
    </div>
  );
};

export default LittleNotePage;
