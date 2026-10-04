'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { timeline } from '@/data/about';

/* 1971 to today. Shows the key milestones first, with a toggle for the full list.
   Lebanon milestones are marked in red. */
export default function AboutTimeline() {
  const [showAll, setShowAll] = useState(false);
  const items = showAll ? timeline : timeline.filter(m => m.featured);

  return (
    <div className="timeline-wrap">
      <ol className="timeline" aria-label="MSF timeline">
        {items.map(m => (
          <li key={m.year + m.text.slice(0, 12)} className={`timeline-item ${m.lebanon ? 'is-lebanon' : ''}`}>
            <span className="timeline-year">{m.year}</span>
            <div className="timeline-body">
              {m.lebanon && <span className="timeline-tag">Lebanon</span>}
              <p>{m.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <button
        type="button"
        className="timeline-toggle"
        onClick={() => setShowAll(v => !v)}
        aria-expanded={showAll}
      >
        {showAll ? 'Show key milestones' : 'Show the full timeline'}
        <ChevronDown size={18} aria-hidden="true" className={showAll ? 'is-flipped' : ''} />
      </button>
    </div>
  );
}
