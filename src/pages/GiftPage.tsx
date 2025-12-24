import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import giftBox from '@/assets/gift-box.png';
import Sparkles from '@/components/Sparkles';
import CuteButton from '@/components/CuteButton';

const GiftPage = () => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  const handleContinue = () => {
    setIsExiting(true);
    setTimeout(() => navigate('/map'), 600);
  };

  return (
    <div className={`min-h-screen bg-gradient-sunset flex flex-col items-center justify-center p-6 relative overflow-hidden transition-all duration-600 ${isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
      <Sparkles count={20} />
      
      {/* Decorative stickers */}
      <div className="absolute top-6 left-6 text-2xl animate-float opacity-70">🎈</div>
      <div className="absolute top-10 right-8 text-3xl animate-float opacity-60" style={{ animationDelay: '0.5s' }}>✨</div>
      
      {/* Gift Box Image */}
      <div className="z-10 mb-8 animate-gentle-bounce">
        <img 
          src={giftBox} 
          alt="Gift box" 
          className="w-40 h-40 md:w-48 md:h-48 drop-shadow-lg"
        />
      </div>

      {/* Text */}
      <div className="text-center z-10 space-y-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-handwritten text-foreground animate-fade-slide-up">
          I have a gift for you 🎁
        </h1>
        <p className="text-xl md:text-2xl font-cute text-muted-foreground animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
          Do you want it? 👀🌟
        </p>
      </div>

      {/* Button */}
      <div className="z-10 animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
        <CuteButton onClick={handleContinue} variant="pulse">
          Yes, I want it 😭🌟
        </CuteButton>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 text-3xl animate-float opacity-60">🎀</div>
      <div className="absolute bottom-20 right-10 text-3xl animate-float opacity-60" style={{ animationDelay: '1s' }}>🌻</div>
      <div className="absolute top-1/3 right-8 text-2xl animate-float opacity-50" style={{ animationDelay: '0.5s' }}>🦋</div>
    </div>
  );
};

export default GiftPage;
