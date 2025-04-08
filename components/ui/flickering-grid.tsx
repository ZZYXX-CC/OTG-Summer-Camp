"use client";

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FlickeringGridProps {
  className?: string;
  squareSize?: number;
  gridGap?: number;
  color?: string;
  maxOpacity?: number;
  flickerChance?: number;
}

export function FlickeringGrid({
  className,
  squareSize = 4,
  gridGap = 4,
  color = '#228B22',
  maxOpacity = 0.15,
  flickerChance = 0.1,
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const squares: { x: number; y: number; opacity: number }[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      squares.length = 0;

      const cols = Math.floor(canvas.width / (squareSize + gridGap));
      const rows = Math.floor(canvas.height / (squareSize + gridGap));

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          squares.push({
            x: i * (squareSize + gridGap),
            y: j * (squareSize + gridGap),
            opacity: Math.random() * maxOpacity,
          });
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      squares.forEach((square) => {
        if (Math.random() < flickerChance) {
          square.opacity = Math.random() * maxOpacity;
        }

        ctx.fillStyle = color;
        ctx.globalAlpha = square.opacity;
        ctx.fillRect(square.x, square.y, squareSize, squareSize);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [squareSize, gridGap, color, maxOpacity, flickerChance]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 h-full w-full', className)}
    />
  );
} 