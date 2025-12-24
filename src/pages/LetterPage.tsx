import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sparkles from '@/components/Sparkles';
import CuteButton from '@/components/CuteButton';

const letterContent = `My dearest Aditya,

On this beautiful day, I want to celebrate the most amazing person I know - YOU! 🎂

Every single day with you feels like a blessing. Your smile lights up my world, your laughter is my favorite melody, and your presence is the greatest gift I've ever received.

You have this incredible way of making everything better. Even on the hardest days, just being with you makes me feel like everything will be okay.

I love how you scrunch your nose when you laugh. I love how passionate you get about the things you care about. I love every little quirk that makes you uniquely YOU.

Thank you for being my best friend, my partner, my everything. Thank you for choosing to share your life with me every single day.

Happy Birthday! May this year bring you all the happiness, success, and dreams come true that you deserve.

Forever and always,
With all my heart 🌟`;

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
    <div className={`min-h-screen bg-gradient-sunset flex flex-col items-center p-6 relative overflow-x-hidden transition-all duration-600 ${isExiting ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
      <Sparkles count={10} />
      
      {/* Decorative stickers */}
      <div className="absolute top-6 left-4 text-2xl animate-float opacity-70">🌻</div>
      <div className="absolute top-10 right-6 text-2xl animate-float opacity-60" style={{ animationDelay: '0.5s' }}>✨</div>
      
      {/* Paper Background */}
      <div className="w-full max-w-lg bg-card rounded-3xl shadow-glow p-8 my-8 z-10 relative overflow-hidden">
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
        <div className="relative z-10 font-handwritten text-lg leading-relaxed whitespace-pre-wrap">
          <span className="text-foreground">{displayedText}</span>
          {/* Blinking cursor */}
          {!isComplete && (
            <span className="inline-block w-0.5 h-5 bg-primary animate-pulse ml-0.5 align-middle" />
          )}
        </div>
        
        {/* Corner decorations */}
        <div className="absolute top-3 right-3 text-xl opacity-50">🎀</div>
        <div className="absolute bottom-3 left-3 text-xl opacity-50">🌸</div>
      </div>

      {/* Continue Button */}
      {isComplete && (
        <div className="z-10 mb-8 animate-fade-slide-up">
          <CuteButton onClick={handleContinue} variant="pulse">
            Continue 🌟
          </CuteButton>
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute top-20 right-6 text-3xl animate-float opacity-60">📜</div>
      <div className="absolute bottom-20 left-6 text-3xl animate-float opacity-60" style={{ animationDelay: '1s' }}>✨</div>
    </div>
  );
};

export default LetterPage;
