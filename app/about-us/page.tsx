import type { Metadata } from 'next';
import { ArrowRight, ArrowDown, MapPin, Globe } from 'lucide-react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import CountUpNumber from '@/components/count-up';
import AboutTimeline from '@/components/about-timeline';
import AboutLebanon from '@/components/about-lebanon';
import { base } from '@/lib/nav';
import { principles, stats, charter, officeActivities } from '@/data/about';

export const metadata: Metadata = {
  title: 'About us | MSF Lebanon',
  description:
    'Médecins Sans Frontières is an independent, international medical humanitarian organisation. Our history, our principles and 50 years of work in Lebanon.',
};

const sections = [
  ['who', 'Who we are'],
  ['principles', 'Principles'],
  ['charter', 'Charter'],
  ['history', 'History'],
  ['lebanon', 'In Lebanon'],
  ['office', 'Lebanon office'],
] as const;

export default function AboutUs() {
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>

      <section className="hero about-hero" aria-labelledby="about-title">
        <div className="hero-images">
          <img className="hero-photo is-active" src="/assets/hero.jpg" alt="An MSF worker walks along a hospital corridor in Lebanon." style={{ objectPosition: 'center 30%' }} fetchPriority="high" />
        </div>
        <SiteHeader />
        <div className="hero-story">
          <div>
            <p className="eyebrow light"><span />Who we are</p>
            <h1 id="about-title">About<br />MSF</h1>
          </div>
          <div className="hero-summary">
            <p className="story-meta">Médecins Sans Frontières <span />Doctors Without Borders</p>
            <p>An independent, international medical humanitarian organisation, assisting people in crisis in Lebanon and around the world.</p>
            <a className="pill" href="#history">Our history <ArrowDown size={19} /></a>
          </div>
        </div>
        <div className="hero-bottom"><span>Independent. Impartial. Neutral.</span><a href="#who">Discover MSF <ArrowDown size={17} /></a></div>
      </section>

      <nav className="about-anchors" aria-label="On this page">
        <div className="wrap">
          {sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </div>
      </nav>

      <main id="main">
        {/* 01 Who we are */}
        <section className="about-feature wrap" id="who" aria-labelledby="who-heading">
          <div className="about-field">
            <img src="/assets/figure-emergency.jpg" alt="MSF doctors review a patient’s X-ray at a hospital bedside." loading="lazy" width="2000" height="1333" />
            <p className="about-field-label">Founded in Paris, 1971</p>
            <div className="about-field-caption">
              <span className="about-field-rule" aria-hidden="true" />
              <h2 id="who-heading">Doctors<br />without borders.</h2>
              <p>Care guided by need alone.</p>
            </div>
          </div>
          <div className="about-feature-content">
            <article aria-labelledby="who-we-are">
              <p className="about-kicker">01 · Our organisation</p>
              <h3 id="who-we-are">Who We Are</h3>
              <p>MSF was founded in 1971 in France by a group of doctors and journalists, in the wake of war and famine in Biafra, Nigeria. They wanted an independent organisation that delivers emergency medical aid quickly, effectively and impartially.</p>
              <p>Today we are a worldwide movement of nearly 65,000 people.</p>
              <a className="about-feature-link" href={base + '/about-us/msf-history/'}>Read our full history <span><ArrowRight size={20} aria-hidden="true" /></span></a>
            </article>
            <article aria-labelledby="our-model">
              <p className="about-kicker">Our model</p>
              <h3 id="our-model">Member-based, self-governed</h3>
              <p>We are a non-profit, self-governed, member-based organisation. Our teams are tens of thousands of health professionals, logistic and administrative staff, bound together by our charter.</p>
              <a className="about-feature-link" href="#charter">Read the charter <span><ArrowDown size={20} aria-hidden="true" /></span></a>
            </article>
          </div>
        </section>

        {/* 02 Principles */}
        <section className="principles wrap" id="principles" aria-labelledby="principles-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 · What guides us</p>
              <h2 id="principles-heading">Our principles</h2>
            </div>
          </div>
          <p className="principles-intro">Medical ethics and five commitments shape every decision our teams make, in every country where we work.</p>
          <ol className="principles-grid">
            {principles.map((p, i) => (
              <li key={p.title}>
                <span className="section-number">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Stats band */}
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

        {/* 03 Charter */}
        <section className="charter wrap" id="charter" aria-labelledby="charter-heading">
          <div className="charter-intro">
            <p className="eyebrow">03 · Our promise</p>
            <h2 id="charter-heading">The MSF charter</h2>
            <p>All of our members agree to honour the following principles.</p>
          </div>
          <ol className="charter-list">
            {charter.map((c, i) => (
              <li key={i}>
                <span className="charter-num">{String(i + 1).padStart(2, '0')}</span>
                <p>{c}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 04 History */}
        <section className="history-section" id="history" aria-labelledby="history-heading">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">04 · Since 1971</p>
                <h2 id="history-heading">Our history</h2>
              </div>
              <a className="text-link" href={base + '/about-us/msf-history/'}>Full history <ArrowRight size={20} /></a>
            </div>
            <p className="principles-intro">From the first mission in Managua to the Nobel Peace Prize. Milestones that touched Lebanon are marked in red.</p>
            <AboutTimeline />
          </div>
        </section>

        {/* 05 MSF in Lebanon */}
        <section className="topics-section wrap lebanon-section" id="lebanon" aria-labelledby="lebanon-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">05 · 50 years in Lebanon</p>
              <h2 id="lebanon-heading">MSF in Lebanon</h2>
            </div>
            <a className="text-link" href={base + '/about-us/50-years-of-msf-in-lebanon-2/'}>Read the full story <ArrowRight size={20} /></a>
          </div>
          <p className="topics-intro">For fifty years MSF has provided independent medical care in Lebanon, guided only by medical need. Today more than 300 national staff are the backbone of everything we do.</p>
          <AboutLebanon />
          <p className="lebanon-note">Palestinian refugees, Syrian families, migrant workers and Lebanese communities: care has reached people living through conflict and economic collapse.</p>
        </section>

        {/* 06 Lebanon office */}
        <section className="office-section wrap" id="office" aria-labelledby="office-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">06 · The Lebanon office</p>
              <h2 id="office-heading">What we do here</h2>
            </div>
            <a className="text-link" href={base + '/what-we-do/lebanon-office-activities/'}>All activities <ArrowRight size={20} /></a>
          </div>
          <p className="principles-intro">Created in 2019 to expand MSF’s presence in the MENA region, the Lebanon office runs awareness campaigns, partnerships and outreach.</p>
          <ul className="office-grid">
            {officeActivities.map((a, i) => (
              <li key={a}>
                <a href={base + '/what-we-do/lebanon-office-activities/'}>
                  <span className="office-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="office-title">{a}</span>
                  <span className="office-arrow"><ArrowRight size={18} aria-hidden="true" /></span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Cross-links */}
        <section className="careers-section" aria-labelledby="go-further">
          <div className="wrap">
            <div className="careers-intro about-go-further">
              <div>
                <p className="eyebrow careers-eyebrow"><span aria-hidden="true" />Go further</p>
                <h2 id="go-further" className="careers-title">See where we work.<br />Join us.</h2>
              </div>
              <div className="careers-intro-copy">
                <p>Explore our activities in 72 countries, or find out how you can become part of our teams in Lebanon and overseas.</p>
              </div>
            </div>
            <div className="careers-paths">
              <a className="career-path" href={base + '/what-we-do/msf-in-the-field/'}>
                <img src="/assets/figure-consultations.jpg" alt="An MSF staff member takes notes beside a patient." loading="lazy" width="2000" height="1333" style={{ objectPosition: '50% 40%' }} />
                <span className="career-path-label"><span>01</span><Globe size={15} aria-hidden="true" />Worldwide</span>
                <div className="career-path-body">
                  <h3>MSF in the field</h3>
                  <p>Discover our medical humanitarian work across the Middle East, North Africa and the world.</p>
                  <span className="career-path-cta">Explore our work <span className="career-path-arrow"><ArrowRight size={20} aria-hidden="true" /></span></span>
                </div>
              </a>
              <a className="career-path" href={base + '/work-with-us/'}>
                <img src="/assets/work-lebanon.jpg" alt="An MSF staff member in Beirut, Lebanon." loading="lazy" width="2560" height="1561" style={{ objectPosition: '50% 35%' }} />
                <span className="career-path-label"><span>02</span><MapPin size={15} aria-hidden="true" />Join us</span>
                <div className="career-path-body">
                  <h3>Work with MSF</h3>
                  <p>Local and overseas vacancies, and what life in the field is really like.</p>
                  <span className="career-path-cta">See vacancies <span className="career-path-arrow"><ArrowRight size={20} aria-hidden="true" /></span></span>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
