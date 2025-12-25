import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sparkles from '@/components/Sparkles';
import CuteButton from '@/components/CuteButton';

interface Stage {
  id: number;
  name: string;
  completed: boolean;
  photo: string | null;
}

const MapPage = () => {
  const navigate = useNavigate();
  const [stages, setStages] = useState<Stage[]>([
    { id: 1, name: 'Your cutest smile 😊', completed: false, photo: null },
    { id: 2, name: 'A silly pose 🤪', completed: false, photo: null },
    { id: 3, name: 'Your happy face 🥰', completed: false, photo: null },
    { id: 4, name: 'A funny expression 😜', completed: false, photo: null },
    { id: 5, name: 'Your best pose 💖', completed: false, photo: null },
  ]);
  const [currentStage, setCurrentStage] = useState(1);
  const [isExiting, setIsExiting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allCompleted = stages.every(s => s.completed);

  const handleStageClick = (stageId: number) => {
    if (stageId <= currentStage) {
      setCurrentStage(stageId);
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStages(prev => prev.map(s => 
          s.id === currentStage 
            ? { ...s, completed: true, photo: reader.result as string }
            : s
        ));
        if (currentStage < 5) {
          setCurrentStage(currentStage + 1);
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const handleOpenSurprise = () => {
    // Store photos in sessionStorage for gallery
    sessionStorage.setItem('uploadedPhotos', JSON.stringify(stages.map(s => s.photo)));
    setIsExiting(true);
    setTimeout(() => navigate('/surprise'), 600);
  };

  return (
    <div className={`min-h-screen min-h-[100dvh] bg-gradient-sunset flex flex-col items-center px-4 py-6 sm:p-6 relative overflow-hidden transition-all duration-600 ${isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      <Sparkles count={15} />
      
      {/* Decorative stickers */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 text-xl sm:text-2xl animate-float opacity-70">📸</div>
      <div className="absolute top-6 sm:top-8 right-4 sm:right-6 text-xl sm:text-2xl animate-float opacity-60" style={{ animationDelay: '0.5s' }}>🌟</div>
      
      {/* Header */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-handwritten text-foreground mt-4 sm:mt-6 mb-3 sm:mb-4 text-center z-10 animate-fade-slide-up px-2">
        Your Cute Photo Journey 📸
      </h1>
      <p className="text-muted-foreground font-cute text-center mb-6 sm:mb-8 z-10 text-sm sm:text-base px-4">
        Upload your cutest poses to unlock the surprise!
      </p>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="user"
        className="hidden"
      />

      {/* Map with curved path */}
      <div className="relative w-full max-w-xs sm:max-w-sm z-10 py-2 sm:py-4">
        {/* Curved SVG path */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          viewBox="0 0 300 500"
          preserveAspectRatio="none"
        >
          <path
            d="M 150 30 
               Q 50 80, 150 130 
               Q 250 180, 150 230 
               Q 50 280, 150 330 
               Q 250 380, 150 430
               Q 50 480, 150 480"
            fill="none"
            stroke="hsl(45 80% 85%)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="12 8"
            className="opacity-60"
          />
        </svg>
        
        {stages.map((stage, index) => {
          // Position stages along the curve
          const yPos = 30 + index * 100;
          const xOffset = index % 2 === 0 ? -50 : 50;
          
          return (
            <div 
              key={stage.id}
              className="relative flex items-center mb-10 sm:mb-12 last:mb-0"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                marginLeft: `calc(50% + ${xOffset}px - 24px)`,
              }}
            >
              {/* Stage circle */}
              <div 
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 border-4 ${
                  stage.completed 
                    ? 'bg-primary shadow-glow scale-110 border-primary/30' 
                    : stage.id === currentStage 
                      ? 'bg-accent animate-gentle-bounce shadow-soft border-accent/30' 
                      : 'bg-muted opacity-60 border-muted/30'
                }`}
                onClick={() => handleStageClick(stage.id)}
              >
                {stage.completed ? (
                  stage.photo ? (
                    <img 
                      src={stage.photo} 
                      alt={`Stage ${stage.id}`}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-xl sm:text-2xl">✓</span>
                  )
                ) : (
                  <span className="text-lg sm:text-xl font-cute font-bold text-primary-foreground">{stage.id}</span>
                )}
              </div>
              
              {/* Stage label */}
              <div 
                className={`absolute w-24 sm:w-28 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl text-center transition-all duration-500 ${
                  index % 2 === 0 ? 'right-full mr-2 sm:mr-4' : 'left-full ml-2 sm:ml-4'
                } ${stage.completed ? 'bg-pastel-cream shadow-soft' : 'bg-card'}`}
              >
                <p className="font-cute text-xs text-foreground">{stage.name}</p>
                {stage.id === currentStage && !stage.completed && (
                  <p className="text-xs text-primary mt-1 animate-pulse">Tap to upload!</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Unlock Button */}
      <div className="mt-auto mb-6 sm:mb-8 z-10">
        <CuteButton 
          onClick={handleOpenSurprise}
          variant={allCompleted ? 'pulse' : 'primary'}
          disabled={!allCompleted}
        >
          {allCompleted ? 'Open Your Surprise 🎀' : `Upload ${5 - stages.filter(s => s.completed).length} more photos`}
        </CuteButton>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 flex justify-center gap-1.5 sm:gap-2 z-10">
        {stages.map(stage => (
          <div 
            key={stage.id}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
              stage.completed ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
      
      {/* Bottom stickers */}
      <div className="absolute bottom-16 sm:bottom-20 left-4 sm:left-6 text-xl sm:text-2xl animate-float opacity-60" style={{ animationDelay: '1s' }}>🎀</div>
      <div className="absolute bottom-20 sm:bottom-24 right-4 sm:right-8 text-lg sm:text-xl animate-float opacity-70" style={{ animationDelay: '1.2s' }}>✨</div>
    </div>
  );
};

export default MapPage;
