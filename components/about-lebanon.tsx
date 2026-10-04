'use client';

import { useState } from 'react';
import { Activity, ArrowRight, Clock, HeartPulse, MapPin } from 'lucide-react';
import { lebanonChapters } from '@/data/about';

const icons = { history: Clock, heart: HeartPulse, activity: Activity, pin: MapPin };
const base = 'https://msf-lebanon.org';
const storyUrl = base + '/about-us/50-years-of-msf-in-lebanon-2/';

/* Four chapters of MSF in Lebanon. Reuses the expanding photo panels from Medical topics. */
export default function AboutLebanon() {
  const [active, setActive] = useState(0);

  return (
    <div className="topics-panels">
      {lebanonChapters.map((c, i) => {
        const Icon = icons[c.icon];
        const isActive = i === active;
        return (
          <a
            key={c.title}
            href={storyUrl}
            className={`topic-panel ${isActive ? 'is-active' : ''}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <img src={c.image} alt={c.alt} loading="lazy" style={{ objectPosition: c.position }} />
            <span className="topic-panel-label">
              <span>{String(i + 1).padStart(2, '0')}</span>
              <Icon size={15} aria-hidden="true" />
              {c.label}
            </span>
            <span className="topic-panel-body">
              <span className="topic-panel-title">{c.title}</span>
              <span className="topic-panel-reveal">
                <span className="topic-panel-reveal-inner">
                  <span className="topic-panel-text">{c.text}</span>
                  <span className="topic-panel-cta">
                    Read the 50 years story
                    <span className="topic-panel-arrow"><ArrowRight size={20} aria-hidden="true" /></span>
                  </span>
                </span>
              </span>
            </span>
          </a>
        );
      })}
    </div>
  );
}
