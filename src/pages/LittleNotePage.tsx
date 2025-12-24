import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import envelope from '@/assets/envelope.png';
import Sparkles from '@/components/Sparkles';
import CuteButton from '@/components/CuteButton';

const LittleNotePage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleEnvelopeClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => setShowLetter(true), 800);
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

      {/* Envelope */}
      <div 
        className={`relative z-10 cursor-pointer transition-all duration-700 ease-out ${isOpen ? 'scale-110' : 'animate-gentle-bounce hover:scale-105'}`}
        onClick={handleEnvelopeClick}
      >
        <img 
          src={envelope} 
          alt="Love envelope" 
          className={`w-48 h-48 md:w-64 md:h-64 drop-shadow-lg transition-all duration-700 ${isOpen ? 'opacity-80' : ''}`}
          style={{
            transform: isOpen ? 'rotateX(10deg)' : 'rotateX(0deg)',
          }}
        />
        
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
              <p className="mb-4">My dearest Aditya,</p>
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
