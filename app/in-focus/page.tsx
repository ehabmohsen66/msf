import type { Metadata } from 'next';
import { ArrowRight, ArrowDown } from 'lucide-react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { postHref } from '@/lib/nav';
import { focusItems } from '@/data/focus';
import { hero } from '@/data/news';

export const metadata: Metadata = {
  title: 'In Focus | MSF Lebanon',
  description: 'MSF responses to the crises we work in, and creative projects that tell the stories of the people we serve.',
};

/* Thematic index: crises and emergencies, then creative projects. Same card markup as News & reports. */
const groups = [
  { id: 'crises', eyebrow: '01 · Crises & emergencies', title: 'Crises and emergencies', group: 'crises' as const },
  { id: 'creative', eyebrow: '02 · Creative projects', title: 'Creative projects', group: 'creative' as const },
];

export default function InFocusPage() {
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>

      <section className="hero about-hero work-hero news-hero" aria-labelledby="focus-title">
        <div className="hero-images about-slides" aria-hidden="true">
          <img className="about-slide" src={hero.image} alt="" fetchPriority="high" />
        </div>
        <SiteHeader />
        <div className="hero-story">
          <div>
            <p className="eyebrow light"><span />Médecins Sans Frontières</p>
            <h1 id="focus-title">In<br />focus</h1>
          </div>
          <div className="hero-summary">
            <p className="story-meta">Thematic pages</p>
            <p>Our response to the crises we work in, and the creative projects that carry people&apos;s stories.</p>
          </div>
        </div>
        <div className="hero-bottom"><span>Crises · Emergencies · Creative projects</span><a href="#crises">Explore <ArrowDown size={17} /></a></div>
      </section>

      <nav className="about-anchors" aria-label="On this page">
        <div className="wrap">
          {groups.map(g => <a key={g.id} href={`#${g.id}`}>{g.title}</a>)}
        </div>
      </nav>

      <main id="main">
        {groups.map(g => {
          const items = focusItems.filter(f => f.group === g.group);
          return (
            <section key={g.id} className="news-section" id={g.id} aria-labelledby={`${g.id}-heading`}>
              <div className="wrap">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">{g.eyebrow}</p>
                    <h2 id={`${g.id}-heading`}>{g.title}</h2>
                  </div>
                </div>
                <div className="news-grid">
                  {items.map(f => (
                    <article className="story" key={f.url}>
                      <a href={postHref(f.url)}>
                        <div className="story-image"><img src={f.image} alt={f.alt} loading="lazy" width={1200} height={800} /><span>{f.label}</span></div>
                        <div className="story-copy">
                          <h3>{f.title}</h3>
                          <p className="story-text">{f.text}</p>
                          <span className="read">{f.cta} <ArrowRight size={20} /></span>
                        </div>
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </main>

      <SiteFooter />
    </>
  );
}
