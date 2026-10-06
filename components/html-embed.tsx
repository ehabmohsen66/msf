'use client';

import { useEffect, useRef } from 'react';

interface HtmlEmbedProps {
  html: string;
  className?: string;
}

export default function HtmlEmbed({ html, className }: HtmlEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const executedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || executedRef.current) return;
    executedRef.current = true;

    // Re-create and execute scripts so any interactive widgets run
    const scripts = el.querySelectorAll('script');
    scripts.forEach(oldScript => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
  }, [html]);

  return (
    <div
      ref={containerRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
