import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sparkles from '@/components/Sparkles';
import CuteButton from '@/components/CuteButton';

const letterLines = [
  "My dearest love,",
  "",
  "On this beautiful day, I want to celebrate the most amazing person I know - YOU! 🎂",
  "",
  "Every single day with you feels like a blessing. Your smile lights up my world, your laughter is my favorite melody, and your love is the greatest gift I've ever received.",
  "",
  "You have this incredible way of making everything better. Even on the hardest days, just being with you makes me feel like everything will be okay.",
  "",
  "I love how you scrunch your nose when you laugh. I love how passionate you get about the things you care about. I love every little quirk that makes you uniquely YOU.",
  "",
  "Thank you for being my best friend, my partner, my everything. Thank you for choosing to love me every single day.",
  "",
  "Happy Birthday, my love. May this year bring you all the happiness, success, and dreams come true that you deserve.",
  "",
  "Forever and always yours,",
  "With all my heart 💖"
];

const LetterPage = () => {
  const navigate = useNavigate();
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (visibleLines < letterLines.length) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setIsComplete(true), 500);
    }
  }, [visibleLines]);

  const handleContinue = () => {
    setIsExiting(true);
    setTimeout(() => navigate('/gift'), 600);
  };

  return (
    <div className={`min-h-screen bg-pastel-cream flex flex-col items-center p-6 relative overflow-x-hidden transition-all duration-600 ${isExiting ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
      <Sparkles count={10} />
      
      {/* Paper Background */}
      <div className="w-full max-w-lg bg-card rounded-3xl shadow-glow p-8 my-8 z-10 relative">
        {/* Paper texture lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="border-b border-muted"
              style={{ marginTop: `${(i + 1) * 32}px` }}
            />
          ))}
        </div>
        
        {/* Letter Content */}
        <div className="relative z-10 font-handwritten text-xl leading-loose">
          {letterLines.slice(0, visibleLines).map((line, index) => (
            <p 
              key={index} 
              className={`mb-2 animate-fade-slide-up ${
                index === 0 || index >= letterLines.length - 2 
                  ? 'text-heart-pink font-semibold' 
                  : 'text-foreground'
              } ${line === '' ? 'h-4' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {line}
            </p>
          ))}
          
          {/* Cursor */}
          {visibleLines < letterLines.length && (
            <span className="inline-block w-0.5 h-6 bg-heart-pink animate-pulse ml-1" />
          )}
        </div>
      </div>

      {/* Continue Button */}
      {isComplete && (
        <div className="z-10 mb-8 animate-fade-slide-up">
          <CuteButton onClick={handleContinue} variant="pulse">
            Continue 💕
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
