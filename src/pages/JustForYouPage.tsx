import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingElements from '@/components/FloatingElements';
import CuteButton from '@/components/CuteButton';

const cuteNotes = [
  { id: 1, message: "Your smile lights up every room you walk into 🌟", emoji: "✨", color: "from-amber-100 to-orange-100" },
  { id: 2, message: "Every moment with you is a beautiful adventure 🌸", emoji: "🦋", color: "from-yellow-100 to-amber-100" },
  { id: 3, message: "You make ordinary days feel magical ✨", emoji: "🌈", color: "from-orange-100 to-rose-100" },
  { id: 4, message: "Your laughter is the sweetest melody 🎵", emoji: "🎶", color: "from-rose-100 to-amber-100" },
  { id: 5, message: "You're one of a kind, never forget that 🌙", emoji: "⭐", color: "from-amber-100 to-yellow-100" },
  { id: 6, message: "Being with you is my happy place 🏠", emoji: "🌻", color: "from-yellow-100 to-orange-100" },
];

const JustForYouPage = () => {
  const navigate = useNavigate();
  const [revealedCards, setRevealedCards] = useState<number[]>([]);
  const [isExiting, setIsExiting] = useState(false);

  const handleCardClick = (id: number) => {
    if (!revealedCards.includes(id)) {
      setRevealedCards([...revealedCards, id]);
    }
  };

  const handleContinue = () => {
    setIsExiting(true);
    setTimeout(() => navigate('/little-note'), 600);
  };

  return (
    <div className={`min-h-screen bg-gradient-sunset flex flex-col items-center p-6 relative overflow-hidden transition-all duration-600 ${isExiting ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
      <FloatingElements count={12} />
      
      {/* Decorative stickers */}
      <div className="absolute top-4 left-4 text-2xl animate-float opacity-70">🎀</div>
      <div className="absolute top-8 right-6 text-3xl animate-float opacity-60" style={{ animationDelay: '0.5s' }}>🌟</div>
      
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-handwritten text-foreground mt-8 mb-2 text-center z-10 animate-fade-slide-up">
        Just For You 🎁
      </h1>
      <p className="text-muted-foreground font-cute mb-6 z-10">Tap the cards to reveal special messages!</p>

      {/* Circular Cards Layout */}
      <div className="relative w-full max-w-sm h-[400px] z-10 mb-8">
        {cuteNotes.map((note, index) => {
          const angle = (index * 60) - 60; // 360/6 = 60 degrees apart
          const radius = 130;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          
          return (
            <div
              key={note.id}
              onClick={() => handleCardClick(note.id)}
              className="absolute cursor-pointer"
              style={{ 
                left: `calc(50% + ${x}px - 55px)`,
                top: `calc(50% + ${y}px - 55px)`,
                animationDelay: `${index * 0.1}s` 
              }}
            >
              <div 
                className={`relative w-28 h-28 transition-all duration-700 ease-out`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: revealedCards.includes(note.id) ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* Front - Cute circle */}
                <div 
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${note.color} shadow-soft flex items-center justify-center border-4 border-white/50`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="text-center">
                    <span className="text-3xl block animate-gentle-bounce">{note.emoji}</span>
                    <span className="text-xs text-muted-foreground font-cute mt-1">Tap me!</span>
                  </div>
                </div>
                
                {/* Back - Revealed message */}
                <div 
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${note.color} shadow-glow p-3 flex items-center justify-center border-4 border-primary/30`}
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <p className="text-xs font-cute text-foreground text-center leading-tight">
                    {note.message}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Center decoration */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl animate-slow-rotate">
          🎂
        </div>
      </div>

      {/* See More Button */}
      <div className="z-10 mt-auto mb-8">
        <CuteButton onClick={handleContinue} variant="pulse">
          Continue 🌟
        </CuteButton>
      </div>
      
      {/* Bottom stickers */}
      <div className="absolute bottom-20 left-6 text-2xl animate-float opacity-60" style={{ animationDelay: '1s' }}>🧁</div>
      <div className="absolute bottom-16 right-8 text-2xl animate-float opacity-70" style={{ animationDelay: '1.2s' }}>🎈</div>
    </div>
  );
};

export default JustForYouPage;
