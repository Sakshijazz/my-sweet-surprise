import { useState } from 'react';
import coupleBlob from '@/assets/couple-blob.png';
import Sparkles from '@/components/Sparkles';
import FloatingElements from '@/components/FloatingElements';
import CuteButton from '@/components/CuteButton';

import teddyImg from '@/assets/teddy.jpg';
import ghostImg from '@/assets/cute-ghost.jpg';
import bunnyImg from '@/assets/cute-bunny.jpg';
import aditya1Img from '@/assets/aditya-1.jpg';
import aditya2Img from '@/assets/aditya-2.jpg';
import aditya3Img from '@/assets/aditya-3.jpg';

// Varying sizes for collage photos
const photoStyles = [
  { rotate: 'rotate-3' },
  { rotate: '-rotate-2' },
  { rotate: 'rotate-6' },
  { rotate: '-rotate-4' },
  { rotate: 'rotate-2' },
  { rotate: '-rotate-3' },
];

// Static photos for gallery
const staticPhotos = [
  { src: teddyImg, caption: "So adorable! 🧸" },
  { src: ghostImg, caption: "Cutie! 👻" },
  { src: bunnyImg, caption: "Precious! 🐰" },
  { src: aditya1Img, caption: "Looking cool! 😎" },
  { src: aditya2Img, caption: "So handsome! ✨" },
  { src: aditya3Img, caption: "Dapper! 🌟" },
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

const GalleryPage = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  const handleForeverClick = () => {
    setShowConfetti(true);
    setTimeout(() => setShowFinal(true), 1000);
  };

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
        Your Cute Gallery 📸
      </h1>
      <p className="text-muted-foreground font-cute text-xs sm:text-sm text-center mb-3 sm:mb-4 z-10 animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
        A collection of adorable cuties 🌟
      </p>

      {/* Photo Collage */}
      <div className="w-full max-w-sm sm:max-w-lg z-10 mb-4 sm:mb-6 relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 p-2 sm:p-4">
          {staticPhotos.map((photo, index) => {
            const style = photoStyles[index % photoStyles.length];
            
            return (
              <div 
                key={index}
                className={`${style.rotate} animate-fade-slide-up relative group`}
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                }}
              >
                {/* Polaroid frame */}
                <div className="bg-card rounded-lg p-1.5 pb-6 sm:p-2 sm:pb-8 shadow-glow h-full w-full relative transition-all duration-500 hover:scale-110 hover:z-30 hover:shadow-xl">
                  <div className="aspect-square overflow-hidden rounded-md">
                    <img 
                      src={photo.src}
                      alt={`Cute ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Mini caption */}
                  <p className="absolute bottom-1 sm:bottom-2 left-0 right-0 text-center font-handwritten text-xs sm:text-sm text-primary truncate px-1">
                    {photo.caption}
                  </p>
                </div>
                
                {/* Random sticker on some photos */}
                {index % 2 === 0 && (
                  <div className="absolute -top-2 -right-2 text-lg sm:text-xl animate-bounce-gentle z-10">
                    {['⭐', '💖', '🌟', '✨', '🎀'][index % 5]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
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
          <p className="text-center font-handwritten text-lg sm:text-xl text-foreground mb-3">Are you impressed? 🥺</p>
          <CuteButton onClick={handleForeverClick} variant="pulse">
            Yes! 💕
          </CuteButton>
        </div>
      )}

      {/* Final Message */}
      {showFinal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-slide-up">
          <div className="bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-glow max-w-xs sm:max-w-sm text-center">
            <div className="text-4xl sm:text-5xl mb-4">🎂</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-handwritten text-primary mb-3 sm:mb-4 glow-text animate-shimmer bg-clip-text">
              Happy Birthday, Aditya!
            </h2>
            <p className="font-cute text-sm sm:text-base text-muted-foreground mb-2">
              May all your dreams come true! ✨
            </p>
            <p className="font-handwritten text-primary text-lg">
              With love, Sakshi 💕
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
