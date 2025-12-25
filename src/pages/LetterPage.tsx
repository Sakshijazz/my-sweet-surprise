import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sparkles from '@/components/Sparkles';
import CuteButton from '@/components/CuteButton';

const letterContent = `My dearest Aditya,

On this beautiful day, I want to celebrate the most amazing person I know - YOU! 🎂

Every single day with you felt like a blessing. Your smile lights up my world, your laughter is my favorite melody, and your presence is the greatest gift I've ever received.

You have this incredible way of making everything better. Even on the hardest days, just being with you makes me feel like everything will be okay.

I love care for others around you. I love how passionate you get about the things you care about. I love every little quirk that makes you uniquely YOU.

Thank you for being my everything. Thank you for choosing to share your life with me every single day.

Happy Birthday! May this year bring you all the happiness, success, and dreams come true that you deserve.

Yours truly,
Sakshi 💕`;

const LetterPage = () => {
  const navigate = useNavigate();
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < letterContent.length) {
      const timer = setTimeout(() => {
        setDisplayedText(letterContent.slice(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }, 35); // Smooth character-by-character typing
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setIsComplete(true), 500);
    }
  }, [charIndex]);

  const handleContinue = () => {
    setIsExiting(true);
    setTimeout(() => navigate('/gift'), 600);
  };

  return (
    <div className={`min-h-screen min-h-[100dvh] bg-gradient-sunset flex flex-col items-center px-4 py-6 sm:p-6 relative overflow-x-hidden transition-all duration-600 ${isExiting ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
      <Sparkles count={10} />
      
      {/* Decorative stickers */}
      <div className="absolute top-4 sm:top-6 left-3 sm:left-4 text-xl sm:text-2xl animate-float opacity-70">🌻</div>
      <div className="absolute top-8 sm:top-10 right-4 sm:right-6 text-xl sm:text-2xl animate-float opacity-60" style={{ animationDelay: '0.5s' }}>✨</div>
      
      {/* Paper Background */}
      <div className="w-full max-w-sm sm:max-w-lg bg-card rounded-2xl sm:rounded-3xl shadow-glow p-4 sm:p-6 md:p-8 my-4 sm:my-8 z-10 relative overflow-hidden">
        {/* Paper texture lines */}
        <div className="absolute inset-0 pointer-events-none opacity-15">
          {[...Array(25)].map((_, i) => (
            <div 
              key={i} 
              className="border-b border-muted"
              style={{ marginTop: `${(i + 1) * 28}px` }}
            />
          ))}
        </div>
        
        {/* Letter Content */}
        <div className="relative z-10 font-handwritten text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-wrap">
          <span className="text-foreground">{displayedText}</span>
          {/* Blinking cursor */}
          {!isComplete && (
            <span className="inline-block w-0.5 h-4 sm:h-5 bg-primary animate-pulse ml-0.5 align-middle" />
          )}
        </div>
        
        {/* Corner decorations */}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 text-lg sm:text-xl opacity-50">🎀</div>
        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 text-lg sm:text-xl opacity-50">🌸</div>
      </div>

      {/* Continue Button */}
      {isComplete && (
        <div className="z-10 mb-6 sm:mb-8 animate-fade-slide-up">
          <CuteButton onClick={handleContinue} variant="pulse">
            Continue 🌟
          </CuteButton>
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute top-16 sm:top-20 right-4 sm:right-6 text-2xl sm:text-3xl animate-float opacity-60">📜</div>
      <div className="absolute bottom-16 sm:bottom-20 left-4 sm:left-6 text-2xl sm:text-3xl animate-float opacity-60" style={{ animationDelay: '1s' }}>✨</div>
    </div>
  );
};

export default LetterPage;
