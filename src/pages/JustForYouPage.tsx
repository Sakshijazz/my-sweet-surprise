import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingHearts from '@/components/FloatingHearts';
import CuteButton from '@/components/CuteButton';

const loveNotes = [
  { id: 1, message: "Your smile is my favorite sight in the whole world 🥰", emoji: "💕" },
  { id: 2, message: "Every moment with you feels like a beautiful dream 🌸", emoji: "🌷" },
  { id: 3, message: "You make ordinary days feel magical ✨", emoji: "💫" },
  { id: 4, message: "My heart beats just for you 💓", emoji: "💗" },
  { id: 5, message: "You're my forever and always 🌙", emoji: "🌟" },
  { id: 6, message: "Being with you is my happy place 🏠", emoji: "💖" },
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
    <div className={`min-h-screen bg-gradient-romantic flex flex-col items-center p-6 relative overflow-hidden transition-all duration-600 ${isExiting ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
      <FloatingHearts count={12} />
      
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-handwritten text-foreground mt-8 mb-8 text-center z-10 animate-fade-slide-up">
        Just For You 💌
      </h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md z-10 mb-8">
        {loveNotes.map((note, index) => (
          <div
            key={note.id}
            onClick={() => handleCardClick(note.id)}
            className="cursor-pointer perspective-1000"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div 
              className={`relative w-full h-40 transition-all duration-700 ease-out transform-style-preserve-3d ${
                revealedCards.includes(note.id) ? 'rotate-y-180' : ''
              }`}
              style={{
                transformStyle: 'preserve-3d',
                transform: revealedCards.includes(note.id) ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Front - Blurred/Locked */}
              <div 
                className="absolute inset-0 bg-card rounded-2xl shadow-soft flex items-center justify-center backface-hidden"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="text-center">
                  <span className="text-4xl mb-2 block">{note.emoji}</span>
                  <span className="text-sm text-muted-foreground font-cute">Tap to reveal</span>
                </div>
              </div>
              
              {/* Back - Revealed */}
              <div 
                className="absolute inset-0 bg-pastel-cream rounded-2xl shadow-glow p-4 flex items-center justify-center"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <p className="text-sm md:text-base font-cute text-foreground text-center leading-relaxed">
                  {note.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* See More Button */}
      <div className="z-10 mt-auto mb-8">
        <CuteButton onClick={handleContinue} variant="pulse">
          See More 💕
        </CuteButton>
      </div>
    </div>
  );
};

export default JustForYouPage;
