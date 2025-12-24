import { useEffect, useState } from 'react';

interface FloatingElement {
  id: number;
  left: number;
  delay: number;
  size: number;
  duration: number;
  emoji: string;
}

const cuteEmojis = ['🌟', '✨', '🎈', '🎀', '🌸', '🦋', '🌻', '🎂', '🧁', '🍰', '⭐', '🎁', '🌈', '☀️'];

const FloatingElements = ({ count = 15 }: { count?: number }) => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const newElements = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 16 + 14,
      duration: Math.random() * 4 + 5,
      emoji: cuteEmojis[Math.floor(Math.random() * cuteEmojis.length)],
    }));
    setElements(newElements);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute opacity-70"
          style={{
            left: `${element.left}%`,
            fontSize: `${element.size}px`,
            animation: `float-heart ${element.duration}s ease-out infinite ${element.delay}s`,
          }}
        >
          {element.emoji}
        </div>
      ))}
    </div>
  );
};

export default FloatingElements;
