import type { Metadata } from 'next';
import { ArrowRight, ArrowDown, Download } from 'lucide-react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import CountUpNumber from '@/components/count-up';
import AboutTimeline from '@/components/about-timeline';
import VideoPoster from '@/components/video-poster';
import { base } from '@/lib/nav';
import {
  heroSlides, hubIntro, whoWeAre, stats, charter, historyIntro,
  principles, lebanonCards, fieldBanner, fieldCards,
} from '@/data/about';

export const metadata: Metadata = {
  title: 'About us | MSF Lebanon',
  description: hubIntro,
};

/* Page structure mirrors the live "About us" menu: MSF History (who we are, charter, history, principles),
   MSF in Lebanon and MSF in the Field. Every section is a plain, self-contained block so it can be rebuilt
   1:1 as an Elementor container. */
const sections = [
  ['msf-history', 'MSF History'],
  ['charter', 'MSF Charter'],
  ['history', 'Our History'],
  ['principles', 'Our Principles'],
  ['msf-in-lebanon', 'MSF in Lebanon'],
  ['msf-in-the-field', 'MSF in the Field'],
] as const;

type Card = { title: string; text: string; image: string; alt: string; url: string; tag: string };

function LinkCards({ cards }: { cards: Card[] }) {
  return (
    <div className="link-cards">
      {cards.map(c => (
        <a key={c.title} className="link-card" href={base + c.url}>
          <span className="link-card-image">
            <img src={c.image} alt={c.alt} loading="lazy" />
            <span className="link-card-tag">{c.tag}</span>
          </span>
          <span className="link-card-body">
            <h3>{c.title}</h3>
            <p>{c.text}</p>
            <span className="link-card-cta">Read more <span className="link-card-arrow"><ArrowRight size={20} aria-hidden="true" /></span></span>
          </span>
        </a>
      ))}
    </div>
  );
}

export default function AboutUs() {
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>

      <section className="hero about-hero" aria-labelledby="about-title">
        <div className="hero-images about-slides" aria-hidden="true">
          {heroSlides.map((src, i) => (
            <img key={src} className="about-slide" src={src} alt="" style={{ animationDelay: `${i * 6}s` }} fetchPriority={i === 0 ? 'high' : 'low'} />
          ))}
        </div>
        <SiteHeader />
        <div className="hero-story">
          <div>
            <p className="eyebrow light"><span />Médecins Sans Frontières</p>
            <h1 id="about-title">About<br />us</h1>
          </div>
          <div className="hero-summary">
            <p className="story-meta">Doctors without Borders <span />Since 1971</p>
            <p>{hubIntro}</p>
            <a className="pill" href="#history">Our history <ArrowDown size={19} /></a>
          </div>
        </div>
        <div className="hero-bottom"><span>Impartiality. Independence. Neutrality.</span><a href="#msf-history">Discover MSF <ArrowDown size={17} /></a></div>
      </section>

      <nav className="about-anchors" aria-label="On this page">
        <div className="wrap">
          {sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </div>
      </nav>

      <main id="main">
        {/* 01 MSF History */}
        <section className="about-intro wrap" id="msf-history" aria-labelledby="msf-history-heading">
          <figure className="about-intro-image">
            <img src={whoWeAre.image} alt="An MSF team raises the MSF flag in the field." width={1304} height={824} loading="lazy" />
          </figure>
          <div className="about-intro-copy">
            <p className="eyebrow">01 · About us</p>
            <h2 id="msf-history-heading">MSF History</h2>
            <p className="about-lead">{whoWeAre.paragraphs[0]}</p>
            <p>{whoWeAre.paragraphs[1]}</p>
            <a className="text-link" href="#charter">MSF Charter <ArrowDown size={20} /></a>
          </div>
        </section>

        {/* Figures */}
        <section className="about-stats" aria-label="MSF at a glance">
          <div className="wrap">
            <div className="about-stats-grid">
              {stats.map(s => (
                <div key={s.label} className="about-stat">
                  {s.plain
                    ? <p className="figure-value">{s.value}</p>
                    : <CountUpNumber targetValue={s.value} duration={2000} prefix={s.prefix} suffix={s.suffix} />}
                  <p className="figure-label">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 02 MSF Charter */}
        <section className="charter wrap" id="charter" aria-labelledby="charter-heading">
          <div className="charter-intro">
            <p className="eyebrow">02 · Our framework</p>
            <h2 id="charter-heading">MSF Charter</h2>
            <p>{charter.intro}</p>
          </div>
          <div>
            <ol className="charter-list">
              {charter.items.map((c, i) => (
                <li key={i}>
                  <span className="charter-num">{String(i + 1).padStart(2, '0')}</span>
                  <p>{c}</p>
                </li>
              ))}
            </ol>
            <p className="charter-note">{charter.complementary}</p>
            <div className="charter-docs">
              {charter.documents.map(d => (
                <a key={d.label} href={d.url} target="_blank" rel="noopener noreferrer">
                  <Download size={18} aria-hidden="true" />{d.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 03 Our History */}
        <section className="history-section" id="history" aria-labelledby="history-heading">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">03 · Since 1971</p>
                <h2 id="history-heading">Our History</h2>
              </div>
            </div>
            <div className="history-intro">
              <VideoPoster {...historyIntro.video} />
              <div className="history-intro-copy">
                {historyIntro.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
            <AboutTimeline />
          </div>
        </section>

        {/* 04 Our Principles */}
        <section className="principles wrap" id="principles" aria-labelledby="principles-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">04 · What guides us</p>
              <h2 id="principles-heading">Our Principles</h2>
            </div>
          </div>
          <ol className="principles-grid">
            {principles.map(p => (
              <li key={p.title}>
                <img className="principle-icon" src={p.icon} alt="" width={60} height={50} />
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 05 MSF in Lebanon */}
        <section className="about-cards-section about-cards-grey" id="msf-in-lebanon" aria-labelledby="lebanon-heading">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">05 · What we do</p>
                <h2 id="lebanon-heading">MSF in Lebanon</h2>
              </div>
              <a className="text-link" href={base + '/what-we-do/msf-in-leb/'}>MSF in Lebanon <ArrowRight size={20} /></a>
            </div>
            <LinkCards cards={lebanonCards} />
          </div>
        </section>

        {/* 06 MSF in the Field */}
        <section className="about-cards-section" id="msf-in-the-field" aria-labelledby="field-heading">
          <figure className="field-banner">
            <img src={fieldBanner.image} alt={fieldBanner.alt} width={2880} height={932} loading="lazy" />
          </figure>
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">06 · What we do</p>
                <h2 id="field-heading">MSF in the Field</h2>
              </div>
              <a className="text-link" href={base + '/what-we-do/msf-in-the-field/'}>MSF in the Field <ArrowRight size={20} /></a>
            </div>
            <LinkCards cards={fieldCards} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
