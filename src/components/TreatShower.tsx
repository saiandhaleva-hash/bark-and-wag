import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  emoji: string;
}

interface TreatShowerProps {
  triggerCount: number;
  origin?: { x: number; y: number };
}

const TREAT_EMOJIS = ['🦴', '🐾', '🥩', '🥓', '🎾', '💖', '⭐', '🐶'];

export const TreatShower: React.FC<TreatShowerProps> = ({ triggerCount, origin }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (triggerCount === 0) return;

    const startX = origin?.x ?? window.innerWidth / 2;
    const startY = origin?.y ?? window.innerHeight / 2;

    const newParticles: Particle[] = Array.from({ length: 18 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 18 + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 220 + 120;
      return {
        id: Date.now() + i,
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 60,
        rot: Math.random() * 360,
        emoji: TREAT_EMOJIS[Math.floor(Math.random() * TREAT_EMOJIS.length)],
      };
    });

    setParticles((prev) => [...prev, ...newParticles]);

    const timer = setTimeout(() => {
      setParticles([]);
    }, 1500);

    return () => clearTimeout(timer);
  }, [triggerCount, origin]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              x: p.x,
              y: p.y,
              scale: 0.4,
              opacity: 1,
              rotate: 0,
            }}
            animate={{
              x: p.x + p.vx,
              y: p.y + p.vy + 180, // gravity drop
              scale: [0.4, 1.4, 0.9],
              opacity: [1, 1, 0],
              rotate: p.rot,
            }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="absolute text-2xl select-none"
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
