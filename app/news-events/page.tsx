import type { Metadata } from 'next';
import { ArrowRight, ArrowDown, CalendarDays } from 'lucide-react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { base } from '@/lib/nav';
import { hero, newsStories, previousEvents, newsletter } from '@/data/news';

export const metadata: Metadata = {
  title: 'News & events | MSF Lebanon',
  description: 'The latest news, stories and events from Médecins Sans Frontières (MSF) in Lebanon and around the world.',
};

/* Page structure mirrors the live "News & Events" page: News & Stories, Previous Events
   and the "Would you like to hear from us" newsletter block.
   Every section is a plain, self-contained block so it can be rebuilt 1:1 as an Elementor container;
   the two post lists map to Elementor Loop Grid / Posts widgets (News category, Events category). */
const sections = [
  ['news-stories', 'News & Stories'],
  ['events', 'Previous Events'],
  ['newsletter', 'Newsletter'],
] as const;

const [featured, ...latest] = newsStories.posts;

export default function NewsEvents() {
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>

      <section className="hero about-hero work-hero news-hero" aria-labelledby="news-title">
        <div className="hero-images about-slides" aria-hidden="true">
          <img className="about-slide" src={hero.image} alt="" fetchPriority="high" />
        </div>
        <SiteHeader />
        <div className="hero-story">
          <div>
            <p className="eyebrow light"><span />Médecins Sans Frontières</p>
            <h1 id="news-title">News &amp;<br />events</h1>
          </div>
          <div className="hero-summary">
            <p className="story-meta">Latest <span />{featured.date}</p>
            <p>{featured.title}</p>
            <a className="pill" href={base + featured.url}>Read the story <ArrowRight size={19} /></a>
          </div>
        </div>
        <div className="hero-bottom"><span>News · Stories · Events</span><a href="#news-stories">Latest news <ArrowDown size={17} /></a></div>
      </section>

      <nav className="about-anchors" aria-label="On this page">
        <div className="wrap">
          {sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </div>
      </nav>

      <main id="main">
        {/* 01 News & Stories: one featured post + a 3-column grid (Elementor: Loop Grid, 1 + 9 posts) */}
        <section className="news-section" id="news-stories" aria-labelledby="news-heading">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">01 · Latest from the field</p>
                <h2 id="news-heading">News &amp; Stories</h2>
              </div>
              <a className="text-link" href={base + newsStories.viewAll}>View All News <ArrowRight size={20} /></a>
            </div>

            <article className="news-featured">
              <a href={base + featured.url}>
                <div className="news-featured-image">
                  <img src={featured.image} alt="" width={526} height={398} />
                  <span className="news-tag">{featured.tag}</span>
                </div>
                <div className="news-featured-copy">
                  <span className="news-featured-label">Latest story</span>
                  <p className="date">{featured.date}</p>
                  <h3>{featured.title}</h3>
                  <span className="pill">Read More <ArrowRight size={19} /></span>
                </div>
              </a>
            </article>

            <div className="news-grid">
              {latest.map(p => (
                <article className="story" key={p.url}>
                  <a href={base + p.url}>
                    <div className="story-image"><img src={p.image} alt="" loading="lazy" width={526} height={398} /><span>{p.tag}</span></div>
                    <div className="story-copy">
                      <p className="date">{p.date}</p>
                      <h3>{p.title}</h3>
                      <span className="read">Read More <ArrowRight size={20} /></span>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 02 Previous Events: 4-column grid on a grey band (Elementor: Loop Grid, Events category) */}
        <section className="events-section" id="events" aria-labelledby="events-heading">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">02 · In Lebanon</p>
                <h2 id="events-heading">Previous Events</h2>
              </div>
              <a className="text-link" href={base + previousEvents.viewAll}>View All Events <ArrowRight size={20} /></a>
            </div>
            <div className="events-grid">
              {previousEvents.posts.map(e => (
                <article className="event-card" key={e.url}>
                  <a href={base + e.url}>
                    <span className="event-card-image"><img src={e.image} alt="" loading="lazy" width={526} height={398} /></span>
                    <div className="event-card-body">
                      <span className="event-date"><CalendarDays size={15} aria-hidden="true" />{e.date}</span>
                      <h3>{e.title}</h3>
                      <span className="read">Read More <ArrowRight size={18} /></span>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 03 Newsletter (Elementor: full-width red container, Heading + Button) */}
        <section className="newsletter-band" id="newsletter" aria-labelledby="newsletter-heading">
          <div className="wrap">
            <div>
              <p className="eyebrow">03 · Stay connected</p>
              <h2 id="newsletter-heading">{newsletter.title}?</h2>
            </div>
            <a className="pill" href={base + newsletter.url}>{newsletter.cta} <ArrowRight size={19} /></a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
