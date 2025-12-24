import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingElements from '@/components/FloatingElements';

const CutenessPage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 120) {
          clearInterval(interval);
          return 120;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100 && !showWarning) {
      setIsShaking(true);
      setTimeout(() => {
        setShowWarning(true);
        setIsShaking(false);
      }, 500);
    }
    
    if (progress >= 120) {
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => navigate('/just-for-you'), 600);
      }, 2000);
    }
  }, [progress, showWarning, navigate]);

  return (
    <div className={`min-h-screen bg-gradient-sunset flex flex-col items-center justify-center p-6 relative overflow-hidden transition-all duration-600 ${isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
      <FloatingElements count={20} />
      
      {/* Decorative stickers */}
      <div className="absolute top-8 left-6 text-2xl animate-float opacity-70">🎂</div>
      <div className="absolute top-12 right-8 text-3xl animate-float opacity-60" style={{ animationDelay: '0.5s' }}>✨</div>
      
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-handwritten text-foreground mb-12 text-center z-10 animate-fade-slide-up">
        Measuring Your Cuteness 🌟
      </h1>

      {/* Progress Section */}
      <div className="w-full max-w-sm z-10">
        {/* Progress Number */}
        <div className="text-center mb-4">
          <span className={`text-6xl md:text-7xl font-cute font-bold text-warm-gold transition-all duration-300 ${isShaking ? 'animate-shake' : ''}`}>
            {progress}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className={`relative h-6 bg-pastel-cream rounded-full overflow-hidden shadow-soft ${isShaking ? 'animate-shake' : ''}`}>
          <div 
            className="h-full bg-gradient-to-r from-pastel-yellow via-warm-gold to-pastel-orange rounded-full transition-all duration-300 ease-out"
            style={{ 
              width: `${Math.min(progress, 100)}%`,
              transform: progress > 100 ? `scaleX(${1 + (progress - 100) * 0.005})` : 'scaleX(1)',
              transformOrigin: 'left'
            }}
          />
          {/* Overflow indicator */}
          {progress > 100 && (
            <div 
              className="absolute top-0 right-0 h-full bg-primary rounded-r-full animate-pulse"
              style={{ width: `${(progress - 100) * 2}%`, maxWidth: '40%' }}
            />
          )}
        </div>

        {/* Status Text */}
        <p className="text-center mt-4 text-muted-foreground font-cute text-lg">
          {progress < 100 ? 'Calculating your cuteness…' : 'Overflow detected!'}
        </p>
      </div>

      {/* Warning Message */}
      {showWarning && (
        <div className="mt-8 z-10 animate-fade-slide-up">
          <div className={`bg-card rounded-3xl p-6 shadow-glow text-center ${isShaking ? 'animate-shake' : 'animate-gentle-bounce'}`}>
            <p className="text-xl md:text-2xl font-cute font-bold text-primary">
              ⚠️ WARNING: TOO CUTE TO HANDLE 😭🌟
            </p>
          </div>
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 text-3xl animate-float opacity-60">🎀</div>
      <div className="absolute bottom-20 left-10 text-3xl animate-float opacity-60" style={{ animationDelay: '1s' }}>🌻</div>
    </div>
  );
};

export default CutenessPage;
