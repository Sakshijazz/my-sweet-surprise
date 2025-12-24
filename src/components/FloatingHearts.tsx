import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  left: number;
  delay: number;
  size: number;
  duration: number;
}

const FloatingHearts = ({ count = 15 }: { count?: number }) => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 4 + 4,
    }));
    setHearts(newHearts);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-heart-pink opacity-60"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animation: `float-heart ${heart.duration}s ease-out infinite ${heart.delay}s`,
          }}
        >
          💕
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
