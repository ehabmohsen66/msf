'use client';

import { useEffect, useRef, useState } from 'react';

/* Counts up to `targetValue` the first time it scrolls into view. */
export default function CountUpNumber({
  targetValue,
  duration = 2000,
  className = 'figure-value',
  prefix = '',
  suffix = '',
}: {
  targetValue: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo for dramatic decelerating count-up effect
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easeProgress * targetValue);
      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(targetValue);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasStarted, targetValue, duration]);

  return (
    <p className={className} ref={elementRef}>
      {prefix}{count.toLocaleString()}{suffix}
    </p>
  );
}
