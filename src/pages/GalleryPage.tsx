import { useState, useEffect } from 'react';
import coupleBlob from '@/assets/couple-blob.png';
import Sparkles from '@/components/Sparkles';
import FloatingElements from '@/components/FloatingElements';
import CuteButton from '@/components/CuteButton';

// Varying sizes for collage photos
const photoStyles = [
  { width: 'w-32', height: 'h-32', rotate: 'rotate-3' },
  { width: 'w-40', height: 'h-48', rotate: '-rotate-2' },
  { width: 'w-36', height: 'h-36', rotate: 'rotate-6' },
  { width: 'w-28', height: 'h-36', rotate: '-rotate-4' },
  { width: 'w-44', height: 'h-40', rotate: 'rotate-2' },
];

// Scattered stickers with varying sizes
const collageStickers = [
  { emoji: '🌸', size: 'text-3xl', top: '15%', left: '5%', delay: 0 },
  { emoji: '✨', size: 'text-2xl', top: '25%', right: '8%', delay: 0.3 },
  { emoji: '🦋', size: 'text-4xl', top: '45%', left: '3%', delay: 0.6 },
  { emoji: '🌻', size: 'text-xl', top: '55%', right: '5%', delay: 0.9 },
  { emoji: '💫', size: 'text-3xl', top: '70%', left: '8%', delay: 1.2 },
  { emoji: '🎀', size: 'text-2xl', top: '35%', left: '85%', delay: 0.4 },
  { emoji: '🍰', size: 'text-4xl', top: '60%', right: '3%', delay: 0.7 },
  { emoji: '🎂', size: 'text-xl', top: '80%', left: '15%', delay: 1 },
  { emoji: '🌈', size: 'text-3xl', top: '10%', right: '15%', delay: 0.5 },
  { emoji: '⭐', size: 'text-2xl', top: '85%', right: '12%', delay: 0.8 },
  { emoji: '🎈', size: 'text-4xl', top: '20%', left: '80%', delay: 0.2 },
  { emoji: '🧁', size: 'text-xl', top: '75%', left: '88%', delay: 1.1 },
];

const cuteMessages = [
  "So adorable! 🌟",
  "Cutie! 🥰",
  "Precious! ✨",
  "My fave! 🌻",
  "Aww! 😍",
];

const GalleryPage = () => {
  const [photos, setPhotos] = useState<(string | null)[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    const storedPhotos = sessionStorage.getItem('uploadedPhotos');
    if (storedPhotos) {
      setPhotos(JSON.parse(storedPhotos));
    }
  }, []);

  const handleForeverClick = () => {
    setShowConfetti(true);
    setTimeout(() => setShowFinal(true), 1000);
  };

  const validPhotos = photos.filter(p => p !== null);

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-sunset flex flex-col items-center px-3 py-4 sm:p-4 relative overflow-hidden">
      <Sparkles count={25} />
      {showConfetti && <FloatingElements count={50} />}
      
      {/* Scattered stickers around the page */}
      {collageStickers.map((sticker, index) => (
        <div
          key={index}
          className={`absolute ${sticker.size} animate-float opacity-70 z-20 hidden sm:block`}
          style={{
            top: sticker.top,
            left: sticker.left,
            right: sticker.right,
            animationDelay: `${sticker.delay}s`,
          }}
        >
          {sticker.emoji}
        </div>
      ))}
      
      {/* Header */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-handwritten text-foreground mt-2 sm:mt-4 mb-1 text-center z-10 animate-fade-slide-up">
        Your Beautiful Moments 📸
      </h1>
      <p className="text-muted-foreground font-cute text-xs sm:text-sm text-center mb-3 sm:mb-4 z-10 animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
        A collage of your cutest poses 🌟
      </p>

      {/* Photo Collage */}
      <div className="w-full max-w-sm sm:max-w-lg z-10 mb-4 sm:mb-6 relative min-h-[300px] sm:min-h-[400px]">
        {validPhotos.length > 0 ? (
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 p-2 sm:p-4">
            {validPhotos.map((photo, index) => {
              const style = photoStyles[index % photoStyles.length];
              const offsetX = (index % 3 - 1) * 6;
              const offsetY = Math.sin(index) * 8;
              
              return (
                <div 
                  key={index}
                  className={`w-24 h-24 sm:${style.width} sm:${style.height} ${style.rotate} animate-fade-slide-up relative group`}
                  style={{ 
                    animationDelay: `${index * 0.15}s`,
                    transform: `translateX(${offsetX}px) translateY(${offsetY}px)`,
                  }}
                >
                  {/* Polaroid frame */}
                  <div className="bg-card rounded-lg p-1 pb-4 sm:p-1.5 sm:pb-6 shadow-glow h-full w-full relative transition-all duration-500 hover:scale-110 hover:z-30 hover:shadow-xl">
                    <img 
                      src={photo!}
                      alt={`Memory ${index + 1}`}
                      className="w-full h-[calc(100%-0.75rem)] sm:h-[calc(100%-1rem)] object-cover rounded-md"
                    />
                    {/* Mini caption */}
                    <p className="absolute bottom-0.5 sm:bottom-1 left-0 right-0 text-center font-handwritten text-[10px] sm:text-xs text-primary truncate px-1">
                      {cuteMessages[index % cuteMessages.length]}
                    </p>
                  </div>
                  
                  {/* Random sticker on some photos */}
                  {index % 2 === 0 && (
                    <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 text-sm sm:text-lg animate-bounce-gentle z-10">
                      {['⭐', '💖', '🌟', '✨', '🎀'][index % 5]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <div className="text-5xl sm:text-6xl mb-3 sm:mb-4 animate-bounce-gentle">📷</div>
            <p className="font-cute text-muted-foreground text-sm sm:text-base">
              No photos uploaded yet!
            </p>
            <p className="font-cute text-xs sm:text-sm text-muted-foreground mt-2">
              (Your beautiful collage will appear here)
            </p>
          </div>
        )}
      </div>

      {/* Rotating couple blob */}
      <div className="z-10 mb-3 sm:mb-4">
        <img 
          src={coupleBlob} 
          alt="Cute couple" 
          className="w-20 h-20 sm:w-24 sm:h-24 animate-slow-rotate drop-shadow-lg"
        />
      </div>

      {/* Final Button */}
      {!showFinal && (
        <div className="z-10 mb-4 sm:mb-6 animate-fade-slide-up" style={{ animationDelay: '0.8s' }}>
          <CuteButton onClick={handleForeverClick} variant="pulse">
            Forever Yours 🌟
          </CuteButton>
        </div>
      )}

      {/* Final Message */}
      {showFinal && (
        <div className="z-10 text-center animate-fade-slide-up mb-4 sm:mb-6 px-4">
          <div className="bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-glow max-w-xs sm:max-w-sm">
            <h2 className="text-lg sm:text-xl md:text-2xl font-handwritten text-primary mb-2 sm:mb-3 glow-text animate-shimmer bg-clip-text">
              You will always be special to me 🌟
            </h2>
            <p className="font-cute text-xs sm:text-sm text-muted-foreground">
              Happy Birthday, Aditya! May all your dreams come true. 🎂✨
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
