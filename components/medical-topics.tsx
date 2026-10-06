'use client';

import { useState } from 'react';
import { ArrowRight, Pill, ShieldCheck, Syringe } from 'lucide-react';

import { base } from '@/lib/nav';

/* All three medical topics are now implemented locally in this demo app. */
const href = (url: string, local?: boolean) => (local ? url : base + url);

const topics = [
  {
    label: 'Awareness hub',
    Icon: Pill,
    title: 'Antimicrobial resistance',
    text: 'How misusing antibiotics fuels infections that no longer respond to treatment, and the part each of us can play to stop it.',
    cta: 'Explore the AMR hub',
    url: '/medical-topics/antimicrobial-resistance-amr',
    local: true,
    image: '/assets/topic-amr.jpg',
    alt: 'An MSF staff member helps a patient on crutches walk down a hospital corridor.',
    position: '38% 50%',
  },
  {
    label: 'Practical guide',
    Icon: Syringe,
    title: 'Insulin access resource',
    text: 'Where to find insulin in Lebanon, emergency hotlines, patient communities and a free app for people living with diabetes.',
    cta: 'Find your insulin',
    url: '/medical-topics/msf-lebanon-insulin-access-resource',
    local: true,
    image: '/assets/topic-insulin.jpg',
    alt: 'Siwar, who lives with type 1 diabetes, holds up her insulin pen among her toys in Arsal, Lebanon.',
    position: '20% 45%',
  },
  {
    label: '17 September',
    Icon: ShieldCheck,
    title: 'World Patient Safety Day',
    text: 'Safe care for people living with chronic diseases, and how our teams adapt it to the realities of Egypt and Lebanon.',
    cta: 'Read the story',
    url: '/medical-topics/world-patient-safety-day',
    local: true,
    image: '/assets/topic-patient-safety.jpg',
    alt: 'An MSF team member talks with a patient outside a clinic.',
    position: '46% 40%',
  },
];

type Props = {
  /* Homepage defaults; the Medical topics page passes its own heading and hides the "All" link. */
  eyebrow?: string;
  title?: string;
  intro?: string;
  showAllLink?: boolean;
  className?: string;
};

export default function MedicalTopics({
  eyebrow = 'Health in focus',
  title = 'Medical topics',
  intro = 'Practical resources on the health issues facing the communities we serve, from antibiotic resistance to living with diabetes in a crisis.',
  showAllLink = true,
  className = '',
}: Props) {
  const [active, setActive] = useState(0);

  return (
    <section className={`topics-section wrap ${className}`} id="medical-topics" aria-labelledby="topics-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="topics-heading">{title}</h2>
        </div>
        {showAllLink && <a className="text-link" href="/medical-topics">All medical topics <ArrowRight size={20} /></a>}
      </div>
      <p className="topics-intro">{intro}</p>

      <div className="topics-panels">
        {topics.map((t, i) => {
          const isActive = i === active;
          return (
            <a
              key={t.title}
              href={href(t.url, 'local' in t && t.local)}
              className={`topic-panel ${isActive ? 'is-active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <img src={t.image} alt={t.alt} loading="lazy" style={{ objectPosition: t.position }} />
              <span className="topic-panel-label">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <t.Icon size={15} aria-hidden="true" />
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
