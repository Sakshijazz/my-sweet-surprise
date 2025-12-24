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
    <div className={`min-h-screen bg-gradient-romantic flex flex-col items-center justify-center p-6 relative overflow-hidden transition-all duration-600 ${isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      <Sparkles count={25} />
      
      {/* Cute Bear Character */}
      <div className="relative z-10 mb-8">
        <img 
          src={cuteBear} 
          alt="Cute waving bear" 
          className="w-48 h-48 md:w-56 md:h-56 animate-wave drop-shadow-lg"
        />
      </div>

      {/* Main Text */}
      <div className="text-center z-10 space-y-4">
        <h1 className="text-3xl md:text-4xl font-handwritten text-foreground animate-fade-slide-up">
          <TypewriterText 
            text="Happiest Birthday, My Love 💖" 
            speed={80}
          />
        </h1>
        
        {showSecondLine && (
          <p className="text-xl md:text-2xl font-cute text-muted-foreground animate-fade-slide-up">
            <TypewriterText 
              text="Do you even know how cute you are?"
              speed={50}
              delay={0}
            />
          </p>
        )}
      </div>

      {/* Button */}
      {showButton && (
        <div className="mt-12 z-10 animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
          <CuteButton 
            onClick={handleContinue}
            variant="pulse"
          >
            Open My Heart 💌
          </CuteButton>
        </div>
      )}

      {/* Decorative hearts */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-4xl animate-gentle-bounce z-10">
        💕
      </div>
    </div>
  );
};

export default WelcomePage;
