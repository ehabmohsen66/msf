'use client';

import { useState } from 'react';
import { ArrowRight, Biohazard, HeartPulse, Palette, Siren } from 'lucide-react';
import { focusItems } from '@/data/focus';
import { postHref } from '@/lib/nav';

const icons = { 'Crisis response': Siren, 'Outbreak response': Biohazard, 'Creative project': Palette } as const;

/* Same panel structure as Medical topics, so the two sections read as one system on the homepage. */
export default function InFocus() {
  const [active, setActive] = useState(0);

  return (
    <section className="topics-section focus-section wrap" id="in-focus" aria-labelledby="focus-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Crises &amp; creative projects</p>
          <h2 id="focus-heading">In Focus</h2>
        </div>
        <a className="text-link" href="/in-focus">All In Focus pages <ArrowRight size={20} /></a>
      </div>
      <p className="topics-intro">Our response to the emergencies we work in, and the creative projects that carry people&apos;s stories beyond the crisis.</p>

      <div className="topics-panels">
        {focusItems.map((t, i) => {
          const isActive = i === active;
          const Icon = icons[t.label as keyof typeof icons] ?? Siren;
          return (
            <a
              key={t.title}
              href={postHref(t.url)}
              className={`topic-panel ${isActive ? 'is-active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <img src={t.image} alt={t.alt} loading="lazy" style={{ objectPosition: t.position }} />
              <span className="topic-panel-label">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <Icon size={15} aria-hidden="true" />
                {t.label}
              </span>
              <span className="topic-panel-body">
                <span className="topic-panel-title">{t.title}</span>
                <span className="topic-panel-reveal">
                  <span className="topic-panel-reveal-inner">
                    <span className="topic-panel-text">{t.text}</span>
                    <span className="topic-panel-cta">
                      {t.cta}
                      <span className="topic-panel-arrow"><ArrowRight size={20} aria-hidden="true" /></span>
                    </span>
                  </span>
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
