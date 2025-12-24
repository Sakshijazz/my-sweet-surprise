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
    <div className={`min-h-screen bg-gradient-soft flex flex-col items-center p-6 relative overflow-hidden transition-all duration-600 ${isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      <Sparkles count={15} />
      
      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-handwritten text-foreground mt-6 mb-4 text-center z-10 animate-fade-slide-up">
        Your Cute Photo Journey 📸
      </h1>
      <p className="text-muted-foreground font-cute text-center mb-8 z-10">
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

      {/* Map with stages */}
      <div className="relative w-full max-w-sm z-10 py-4">
        {/* Path line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-pastel-lavender transform -translate-x-1/2 rounded-full" />
        
        {stages.map((stage, index) => (
          <div 
            key={stage.id}
            className={`relative flex items-center mb-8 last:mb-0 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Stage circle */}
            <div 
              className={`absolute left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 ${
                stage.completed 
                  ? 'bg-heart-pink shadow-glow scale-110' 
                  : stage.id === currentStage 
                    ? 'bg-primary animate-gentle-bounce shadow-soft' 
                    : 'bg-muted opacity-60'
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
                  <span className="text-2xl">✓</span>
                )
              ) : (
                <span className="text-xl font-cute font-bold text-primary-foreground">{stage.id}</span>
              )}
            </div>
            
            {/* Stage label */}
            <div 
              className={`w-32 p-3 rounded-2xl text-center transition-all duration-500 ${
                index % 2 === 0 ? 'mr-auto ml-4' : 'ml-auto mr-4'
              } ${stage.completed ? 'bg-pastel-cream shadow-soft' : 'bg-card'}`}
            >
              <p className="font-cute text-sm text-foreground">{stage.name}</p>
              {stage.id === currentStage && !stage.completed && (
                <p className="text-xs text-heart-pink mt-1 animate-pulse">Tap to upload!</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Unlock Button */}
      <div className="mt-auto mb-8 z-10">
        <CuteButton 
          onClick={handleOpenSurprise}
          variant={allCompleted ? 'pulse' : 'primary'}
          disabled={!allCompleted}
        >
          {allCompleted ? 'Open Your Surprise 🎀' : `Upload ${5 - stages.filter(s => s.completed).length} more photos`}
        </CuteButton>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {stages.map(stage => (
          <div 
            key={stage.id}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              stage.completed ? 'bg-heart-pink' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MapPage;
