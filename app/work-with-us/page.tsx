import type { Metadata } from 'next';
import { ArrowRight, ArrowDown, MapPin, Plane } from 'lucide-react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import VideoPoster from '@/components/video-poster';
import LinkCards from '@/components/link-cards';
import { base } from '@/lib/nav';
import { hero, vacancies, commitments, videos, lifeInTheField } from '@/data/work';

export const metadata: Metadata = {
  title: 'Work with us | MSF Lebanon',
  description: `${hero.summary} ${vacancies[0].text}`,
};

/* Page structure mirrors the live "Work with us" page: Local Vacancies, Overseas Vacancies,
   Behavioural Commitments, More Than a Job (videos) and Life in the Field.
   Every section is a plain, self-contained block so it can be rebuilt 1:1 as an Elementor container. */
const sections = [
  ['vacancies', 'Vacancies'],
  ['commitments', 'Behavioural Commitments'],
  ['more-than-a-job', 'More Than a Job'],
  ['life-in-the-field', 'Life in the Field'],
] as const;

export default function WorkWithUs() {
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>

      <section className="hero about-hero work-hero" aria-labelledby="work-title">
        <div className="hero-images about-slides" aria-hidden="true">
          <img className="about-slide" src={hero.image} alt="" fetchPriority="high" />
        </div>
        <SiteHeader />
        <div className="hero-story">
          <div>
            <p className="eyebrow light"><span />Médecins Sans Frontières</p>
            <h1 id="work-title">Work<br />with us</h1>
          </div>
          <div className="hero-summary">
            <p className="story-meta">Lebanon <span />Egypt <span />Worldwide</p>
            <p>{hero.summary}</p>
            <a className="pill" href="#vacancies">Vacancies <ArrowDown size={19} /></a>
          </div>
        </div>
        <div className="hero-bottom"><span>Local · Overseas</span><a href="#vacancies">See openings <ArrowDown size={17} /></a></div>
      </section>

      <nav className="about-anchors" aria-label="On this page">
        <div className="wrap">
          {sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </div>
      </nav>

      <main id="main">
        {/* 01 Vacancies */}
        <section className="work-vacancies" id="vacancies" aria-labelledby="vacancies-heading">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">01 · Join our teams</p>
                <h2 id="vacancies-heading">Vacancies</h2>
              </div>
            </div>
            <div className="careers-paths">
              {vacancies.map((v, i) => (
                <a key={v.title} className="career-path" href={base + v.url}>
                  <img src={v.image} alt={v.alt} loading="lazy" width={2056} height={1544} style={{ objectPosition: '50% 30%' }} />
                  <span className="career-path-label">
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    {i === 0 ? <MapPin size={15} aria-hidden="true" /> : <Plane size={15} aria-hidden="true" />}
                    {v.label}
                  </span>
                  <div className="career-path-body">
                    <h3>{v.title}</h3>
                    {v.lead && <p className="career-path-lead">{v.lead}</p>}
                    <p>{v.text}</p>
                    <span className="career-path-cta">Read more <span className="career-path-arrow"><ArrowRight size={20} aria-hidden="true" /></span></span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 02 Behavioural Commitments */}
        <div className="work-commitments">
        <section className="about-intro wrap" id="commitments" aria-labelledby="commitments-heading">
          <figure className="about-intro-image">
            <img src={commitments.image} alt={commitments.alt} width={652} height={412} loading="lazy" />
          </figure>
          <div className="about-intro-copy">
            <p className="eyebrow">02 · How we work</p>
            <h2 id="commitments-heading">{commitments.title}</h2>
            <p className="about-lead">{commitments.text}</p>
            <a className="pill" href={base + commitments.url}>Read more <ArrowRight size={19} /></a>
          </div>
        </section>
        </div>

        {/* 03 More Than a Job */}
        <section className="history-section work-videos" id="more-than-a-job" aria-labelledby="videos-heading">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">03 · In their own words</p>
                <h2 id="videos-heading">More Than a Job</h2>
              </div>
            </div>
            <div className="work-videos-grid">
              {videos.map(v => (
                <figure key={v.youtubeId} className="work-video">
                  <VideoPoster youtubeId={v.youtubeId} title={v.title} poster={v.poster} />
                  <figcaption>{v.title}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* 04 Life in the Field */}
        <section className="about-cards-section" id="life-in-the-field" aria-labelledby="life-heading">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">04 · From the field</p>
                <h2 id="life-heading">Life in the Field</h2>
              </div>
              <a className="text-link" href={base + lifeInTheField.viewMore}>View More <ArrowRight size={20} /></a>
            </div>
            <LinkCards columns={3} cards={lifeInTheField.cards.map(c => ({ ...c, cta: 'All Videos' }))} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
