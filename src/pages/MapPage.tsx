import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sparkles from '@/components/Sparkles';
import CuteButton from '@/components/CuteButton';

import teddyImg from '@/assets/teddy.jpg';
import ghostImg from '@/assets/cute-ghost.jpg';
import bunnyImg from '@/assets/cute-bunny.jpg';
import puppyImg from '@/assets/cute-puppy.jpg';
import octopusImg from '@/assets/cute-octopus.jpg';
import rabbitImg from '@/assets/cute-rabbit.jpg';

interface ComplimentCard {
  id: number;
  image: string;
  compliment: string;
  revealed: boolean;
  position: { top: string; left: string };
  delay: number;
}

const MapPage = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<ComplimentCard[]>([
    { id: 1, image: teddyImg, compliment: "You're the cutest person ever! 🧸", revealed: false, position: { top: '8%', left: '15%' }, delay: 0 },
    { id: 2, image: ghostImg, compliment: "You make my heart so happy! 👻💕", revealed: false, position: { top: '25%', left: '60%' }, delay: 0.2 },
    { id: 3, image: bunnyImg, compliment: "Your smile lights up my world! 🐰", revealed: false, position: { top: '42%', left: '20%' }, delay: 0.4 },
    { id: 4, image: puppyImg, compliment: "You're pawsitively amazing! 🐕", revealed: false, position: { top: '55%', left: '55%' }, delay: 0.6 },
    { id: 5, image: octopusImg, compliment: "I'm so lucky to know you! 🐙", revealed: false, position: { top: '72%', left: '25%' }, delay: 0.8 },
    { id: 6, image: rabbitImg, compliment: "You're absolutely wonderful! 🐇", revealed: false, position: { top: '75%', left: '65%' }, delay: 1 },
  ]);
  const [isExiting, setIsExiting] = useState(false);

  const allRevealed = cards.every(c => c.revealed);

  const handleCardClick = (cardId: number) => {
    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, revealed: true } : c
    ));
  };

  const handleContinue = () => {
    setIsExiting(true);
    setTimeout(() => navigate('/surprise'), 600);
  };

  return (
    <div className={`min-h-screen min-h-[100dvh] bg-gradient-sunset flex flex-col items-center px-4 py-6 sm:p-6 relative overflow-hidden transition-all duration-600 ${isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      <Sparkles count={15} />
      
      {/* Decorative stickers */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 text-xl sm:text-2xl animate-float opacity-70">💖</div>
      <div className="absolute top-6 sm:top-8 right-4 sm:right-6 text-xl sm:text-2xl animate-float opacity-60" style={{ animationDelay: '0.5s' }}>🌟</div>
      
      {/* Header */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-handwritten text-foreground mt-4 sm:mt-6 mb-2 sm:mb-3 text-center z-10 animate-fade-slide-up px-2">
        Tap the Cuties for Compliments! 💝
      </h1>
      <p className="text-muted-foreground font-cute text-center mb-4 sm:mb-6 z-10 text-sm sm:text-base px-4">
        Each little friend has a special message for you ✨
      </p>

      {/* Floating Cards Area */}
      <div className="relative w-full max-w-sm sm:max-w-md flex-1 min-h-[400px] sm:min-h-[450px] z-10">
        {cards.map((card) => (
          <div 
            key={card.id}
            className="absolute animate-float cursor-pointer transition-all duration-500 hover:scale-110"
            style={{ 
              top: card.position.top, 
              left: card.position.left,
              animationDelay: `${card.delay}s`,
            }}
            onClick={() => handleCardClick(card.id)}
          >
            {/* Card Container */}
            <div className={`relative transition-all duration-500 ${card.revealed ? 'scale-105' : ''}`}>
              {/* Cute Character Image */}
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 shadow-glow transition-all duration-300 ${
                card.revealed ? 'border-primary ring-4 ring-primary/30' : 'border-card hover:border-accent'
              }`}>
                <img 
                  src={card.image} 
                  alt="Cute character"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Sparkle indicator when not revealed */}
              {!card.revealed && (
                <div className="absolute -top-1 -right-1 text-lg animate-pulse">
                  ✨
                </div>
              )}
              
              {/* Check mark when revealed */}
              {card.revealed && (
                <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center text-xs shadow-soft">
                  💖
                </div>
              )}
              
              {/* Compliment bubble */}
              {card.revealed && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-32 sm:w-40 bg-card rounded-xl p-2 shadow-glow animate-scale-in z-20">
                  <p className="font-cute text-xs text-center text-foreground">
                    {card.compliment}
                  </p>
                  {/* Speech bubble triangle */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-card"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <div className="mt-auto mb-6 sm:mb-8 z-10">
        <CuteButton 
          onClick={handleContinue}
          variant={allRevealed ? 'pulse' : 'primary'}
          disabled={!allRevealed}
        >
          {allRevealed ? 'Continue to Surprise 🎀' : `Tap ${6 - cards.filter(c => c.revealed).length} more cuties`}
        </CuteButton>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 flex justify-center gap-1.5 sm:gap-2 z-10">
        {cards.map(card => (
          <div 
            key={card.id}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
              card.revealed ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
      
      {/* Bottom stickers */}
      <div className="absolute bottom-16 sm:bottom-20 left-4 sm:left-6 text-xl sm:text-2xl animate-float opacity-60" style={{ animationDelay: '1s' }}>🎀</div>
      <div className="absolute bottom-20 sm:bottom-24 right-4 sm:right-8 text-lg sm:text-xl animate-float opacity-70" style={{ animationDelay: '1.2s' }}>✨</div>
    </div>
  );
};

export default MapPage;
