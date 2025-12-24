import { useState, useEffect } from 'react';
import coupleBlob from '@/assets/couple-blob.png';
import Sparkles from '@/components/Sparkles';
import FloatingElements from '@/components/FloatingElements';
import CuteButton from '@/components/CuteButton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const cuteMessages = [
  "Looking absolutely adorable! 🌟",
  "This smile melts my heart! 🥰",
  "Too cute for words! ✨",
  "My favorite person! 🌻",
  "Pure cuteness overload! 😍",
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
    <div className="min-h-screen bg-gradient-sunset flex flex-col items-center p-6 relative overflow-hidden">
      <Sparkles count={20} />
      {showConfetti && <FloatingElements count={50} />}
      
      {/* Decorative stickers */}
      <div className="absolute top-4 left-4 text-2xl animate-float opacity-70">📸</div>
      <div className="absolute top-8 right-6 text-2xl animate-float opacity-60" style={{ animationDelay: '0.5s' }}>✨</div>
      
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-handwritten text-foreground mt-6 mb-2 text-center z-10 animate-fade-slide-up">
        Your Beautiful Moments 📸
      </h1>
      <p className="text-muted-foreground font-cute text-center mb-8 z-10 animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
        A gallery of your cutest poses 🌟
      </p>

      {/* Photo Carousel */}
      <div className="w-full max-w-md z-10 mb-8 px-12">
        {validPhotos.length > 0 ? (
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {validPhotos.map((photo, index) => (
                <CarouselItem key={index}>
                  <div className="p-2">
                    {/* Polaroid Style Frame */}
                    <div 
                      className="bg-card rounded-lg p-3 pb-14 shadow-glow mx-auto max-w-xs relative transition-transform duration-500"
                      style={{ 
                        transform: `rotate(${(index % 2 === 0 ? 1 : -1) * 2}deg)`,
                      }}
                    >
                      <img 
                        src={photo!}
                        alt={`Memory ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-md"
                      />
                      {/* Caption */}
                      <p className="absolute bottom-4 left-0 right-0 text-center font-handwritten text-lg text-primary">
                        {cuteMessages[index % cuteMessages.length]}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 bg-card/80 border-primary/30 text-primary hover:bg-card hover:text-primary" />
            <CarouselNext className="right-0 bg-card/80 border-primary/30 text-primary hover:bg-card hover:text-primary" />
          </Carousel>
        ) : (
          <div className="text-center py-12">
            <p className="font-cute text-muted-foreground">
              No photos uploaded yet! 📷
            </p>
            <p className="font-cute text-sm text-muted-foreground mt-2">
              (Your beautiful memories will appear here)
            </p>
          </div>
        )}
      </div>

      {/* Photo count indicator */}
      {validPhotos.length > 0 && (
        <p className="font-cute text-sm text-muted-foreground z-10 mb-4 animate-fade-slide-up">
          Swipe to see all {validPhotos.length} memories ✨
        </p>
      )}

      {/* Rotating couple blob */}
      <div className="z-10 mb-6">
        <img 
          src={coupleBlob} 
          alt="Cute couple" 
          className="w-32 h-32 animate-slow-rotate drop-shadow-lg"
        />
      </div>

      {/* Final Button */}
      {!showFinal && (
        <div className="z-10 mb-8 animate-fade-slide-up" style={{ animationDelay: '0.8s' }}>
          <CuteButton onClick={handleForeverClick} variant="pulse">
            Forever Yours 🌟
          </CuteButton>
        </div>
      )}

      {/* Final Message */}
      {showFinal && (
        <div className="z-10 text-center animate-fade-slide-up mb-8">
          <div className="bg-card rounded-3xl p-8 shadow-glow max-w-sm">
            <h2 className="text-2xl md:text-3xl font-handwritten text-primary mb-4 glow-text animate-shimmer bg-clip-text">
              You will always be special to me 🌟
            </h2>
            <p className="font-cute text-muted-foreground">
              Happy Birthday, Aditya! May all your dreams come true. 🎂✨
            </p>
          </div>
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute top-20 left-6 text-2xl animate-float opacity-50">🌸</div>
      <div className="absolute top-40 right-6 text-2xl animate-float opacity-50" style={{ animationDelay: '0.5s' }}>🦋</div>
      <div className="absolute bottom-40 left-8 text-2xl animate-float opacity-50" style={{ animationDelay: '1s' }}>🌻</div>
    </div>
  );
};

export default GalleryPage;
