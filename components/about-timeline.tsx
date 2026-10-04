'use client';

import { useState } from 'react';
import { eras } from '@/data/about';

/* Our History timeline: the six groups from the live page as tabs (Elementor equivalent: Tabs widget).
   Each tab shows the group's archive photo next to its milestones. Lebanon milestones are marked in red. */
export default function AboutTimeline() {
  const [active, setActive] = useState(0);
  const era = eras[active];

  return (
    <div className="era-tabs">
      <div className="era-tablist" role="tablist" aria-label="MSF timeline periods">
        {eras.map((e, i) => (
          <button
            key={e.label}
            type="button"
            role="tab"
            id={`era-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`era-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            className={i === active ? 'is-active' : undefined}
            onClick={() => setActive(i)}
            onKeyDown={ev => {
              if (ev.key !== 'ArrowRight' && ev.key !== 'ArrowLeft') return;
              const next = (active + (ev.key === 'ArrowRight' ? 1 : eras.length - 1)) % eras.length;
              setActive(next);
              document.getElementById(`era-tab-${next}`)?.focus();
            }}
          >
            {e.label}
          </button>
        ))}
      </div>

      <div className="era-panel" role="tabpanel" id={`era-panel-${active}`} aria-labelledby={`era-tab-${active}`} key={era.label}>
        <figure className="era-image">
          <img src={era.image} alt={era.alt} width={1304} height={824} loading="lazy" />
          <figcaption>{era.label}</figcaption>
        </figure>
        <ol className="timeline">
          {era.items.map(m => (
            <li key={m.year} className={`timeline-item${m.lebanon ? ' is-lebanon' : ''}`}>
              <span className="timeline-year">{m.year}</span>
              <div className="timeline-body">
                {m.lebanon && <span className="timeline-tag">Lebanon</span>}
                {m.text.map((t, i) => <p key={i}>{t}</p>)}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
