import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cuteBear from '@/assets/cute-bear.png';
import Sparkles from '@/components/Sparkles';
import TypewriterText from '@/components/TypewriterText';
import CuteButton from '@/components/CuteButton';

const WelcomePage = () => {
  const navigate = useNavigate();
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSecondLine(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showSecondLine) {
      const timer = setTimeout(() => setShowButton(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [showSecondLine]);

  const handleContinue = () => {
    setIsExiting(true);
    setTimeout(() => navigate('/cuteness'), 600);
  };

  return (
    <div className={`min-h-screen min-h-[100dvh] bg-gradient-sunset flex flex-col items-center justify-center px-4 py-8 sm:p-6 relative overflow-hidden transition-all duration-600 ${isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      <Sparkles count={25} />
      
      {/* Decorative stickers */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-6 text-2xl sm:text-3xl animate-float opacity-80">🌻</div>
      <div className="absolute top-8 sm:top-16 right-4 sm:right-8 text-xl sm:text-2xl animate-float opacity-70" style={{ animationDelay: '0.5s' }}>☀️</div>
      <div className="absolute bottom-24 sm:bottom-32 left-4 sm:left-8 text-xl sm:text-2xl animate-float opacity-60" style={{ animationDelay: '1s' }}>🦋</div>
      <div className="absolute bottom-32 sm:bottom-40 right-4 sm:right-10 text-2xl sm:text-3xl animate-float opacity-70" style={{ animationDelay: '1.5s' }}>🌸</div>
      
      {/* Cute Bear Character */}
      <div className="relative z-10 mb-6 sm:mb-8">
        <img 
          src={cuteBear} 
          alt="Cute waving bear" 
          className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 animate-wave drop-shadow-lg"
        />
      </div>

      {/* Main Text */}
      <div className="text-center z-10 space-y-3 sm:space-y-4 px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-handwritten text-foreground animate-fade-slide-up">
          <TypewriterText 
            text="Happiest Birthday, Aditya 🎂" 
            speed={80}
          />
        </h1>
        
        {showSecondLine && (
          <p className="text-lg sm:text-xl md:text-2xl font-cute text-muted-foreground animate-fade-slide-up">
            <TypewriterText 
              text="Do you even know how amazing you are?"
              speed={50}
              delay={0}
            />
          </p>
        )}
      </div>

      {/* Button */}
      {showButton && (
        <div className="mt-8 sm:mt-12 z-10 animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
          <CuteButton 
            onClick={handleContinue}
            variant="pulse"
          >
            Let's Go 🚀
          </CuteButton>
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 text-3xl sm:text-4xl animate-gentle-bounce z-10">
        🎈
      </div>
    </div>
  );
};

export default WelcomePage;
