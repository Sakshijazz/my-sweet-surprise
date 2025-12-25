import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingElements from '@/components/FloatingElements';
import CuteButton from '@/components/CuteButton';

const cuteNotes = [
  { id: 1, message: "Your smile lights up every room you walk into 🌟", emoji: "✨" },
  { id: 2, message: "Every moment with you is a beautiful adventure 🌸", emoji: "🦋" },
  { id: 3, message: "You make ordinary days feel magical ✨", emoji: "🌈" },
  { id: 4, message: "Your laughter is the sweetest melody 🎵", emoji: "🎶" },
  { id: 5, message: "You're one of a kind, never forget that 🌙", emoji: "⭐" },
  { id: 6, message: "Being with you is my happy place 🏠", emoji: "🌻" },
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
    <div className={`min-h-screen min-h-[100dvh] bg-gradient-sunset flex flex-col items-center px-4 py-6 sm:p-6 relative overflow-hidden transition-all duration-600 ${isExiting ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
      <FloatingElements count={12} />
      
      {/* Decorative stickers */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 text-xl sm:text-2xl animate-float opacity-70">🎀</div>
      <div className="absolute top-6 sm:top-8 right-4 sm:right-6 text-2xl sm:text-3xl animate-float opacity-60" style={{ animationDelay: '0.5s' }}>🌟</div>
      
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-handwritten text-foreground mt-4 sm:mt-8 mb-1 sm:mb-2 text-center z-10 animate-fade-slide-up">
        Just For You 🎁
      </h1>
      <p className="text-muted-foreground font-cute mb-4 sm:mb-6 z-10 text-sm sm:text-base text-center px-2">Tap the cards to reveal special messages!</p>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-sm sm:max-w-md z-10 mb-6 sm:mb-8 px-1">
        {cuteNotes.map((note, index) => (
          <div
            key={note.id}
            onClick={() => handleCardClick(note.id)}
            className="cursor-pointer perspective-1000"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div 
              className={`relative w-full h-32 sm:h-40 transition-all duration-700 ease-out transform-style-preserve-3d`}
              style={{
                transformStyle: 'preserve-3d',
                transform: revealedCards.includes(note.id) ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Front - Blurred/Locked */}
              <div 
                className="absolute inset-0 bg-card rounded-xl sm:rounded-2xl shadow-soft flex items-center justify-center backface-hidden border-2 border-primary/20"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="text-center">
                  <span className="text-3xl sm:text-4xl mb-2 block animate-gentle-bounce">{note.emoji}</span>
                  <span className="text-xs sm:text-sm text-muted-foreground font-cute">Tap to reveal</span>
                </div>
              </div>
              
              {/* Back - Revealed */}
              <div 
                className="absolute inset-0 bg-pastel-cream rounded-xl sm:rounded-2xl shadow-glow p-3 sm:p-4 flex items-center justify-center border-2 border-primary/30"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <p className="text-xs sm:text-sm md:text-base font-cute text-foreground text-center leading-relaxed">
                  {note.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* See More Button */}
      <div className="z-10 mt-auto mb-6 sm:mb-8">
        <CuteButton onClick={handleContinue} variant="pulse">
          Continue 🌟
        </CuteButton>
      </div>
      
      {/* Bottom stickers */}
      <div className="absolute bottom-16 sm:bottom-20 left-4 sm:left-6 text-xl sm:text-2xl animate-float opacity-60" style={{ animationDelay: '1s' }}>🧁</div>
      <div className="absolute bottom-12 sm:bottom-16 right-4 sm:right-8 text-xl sm:text-2xl animate-float opacity-70" style={{ animationDelay: '1.2s' }}>🎈</div>
    </div>
  );
};

export default JustForYouPage;
