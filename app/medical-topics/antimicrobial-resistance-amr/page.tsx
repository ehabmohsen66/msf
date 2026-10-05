import type { Metadata } from 'next';
import { ArrowRight, ArrowDown, ChevronRight, Mail, Plus, ShieldCheck, Pill, Microscope, FileText, ExternalLink } from 'lucide-react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import VideoPoster from '@/components/video-poster';
import LinkCards from '@/components/link-cards';
import { base } from '@/lib/nav';
import {
  amrHero, whatIsAmr, facts, forPatients, humanitarian, msfResponse,
  politicalActions, roles, publications, resources, getInvolved,
} from '@/data/medical';

export const metadata: Metadata = {
  title: 'Antimicrobial Resistance (AMR) | MSF Lebanon',
  description: whatIsAmr.lead,
};

/* Page structure mirrors the live AMR page section by section.
   Every section is a plain, self-contained block so it can be rebuilt 1:1 as an Elementor container.
   "Read more" toggles use native <details> (Elementor: Toggle widget); videos use the poster + YouTube embed. */
const sections = [
  ['what-is-amr', 'What is AMR'],
  ['facts', 'Facts'],
  ['patients', 'For patients'],
  ['humanitarian', 'Humanitarian context'],
  ['msf-response', 'MSF’s response'],
  ['political-action', 'Political action'],
  ['roles', 'Who has a role'],
  ['publications', 'Publications'],
  ['resources', 'Resources'],
  ['get-involved', 'Get involved'],
] as const;

const pillarIcons = [ShieldCheck, Pill, Microscope];

/* "Read More" toggle (Elementor: Toggle widget) */
function ReadMore({ children }: { children: React.ReactNode }) {
  return (
    <details className="amr-more">
      <summary><span className="amr-more-open">Read More</span><span className="amr-more-close">Read Less</span> <Plus size={16} aria-hidden="true" /></summary>
      <div className="amr-more-body">{children}</div>
    </details>
  );
}

export default function AmrPage() {
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>

      <section className="hero about-hero work-hero amr-hero" aria-labelledby="amr-title">
        <div className="hero-images about-slides" aria-hidden="true">
          <img className="about-slide" src={amrHero.image} alt="" fetchPriority="high" />
        </div>
        <SiteHeader />
        <div className="hero-story">
          <div>
            <nav className="eyebrow light amr-breadcrumb" aria-label="Breadcrumb">
              <span /><a href="/medical-topics">Medical Topics</a><ChevronRight size={14} aria-hidden="true" />AMR
            </nav>
            <h1 id="amr-title">Antimicrobial<br />Resistance</h1>
          </div>
          <div className="hero-summary">
            <p className="story-meta">{amrHero.kicker}</p>
            <p>{amrHero.text}</p>
            <a className="pill" href={base + amrHero.url}>Read More <ArrowRight size={19} /></a>
          </div>
        </div>
        <div className="hero-bottom"><span>Antimicrobial Resistance (AMR)</span><a href="#what-is-amr">What is AMR <ArrowDown size={17} /></a></div>
      </section>

      <nav className="about-anchors" aria-label="On this page">
        <div className="wrap">
          {sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </div>
      </nav>

      <main id="main">
        {/* 01 What is AMR: video + text + stat */}
        <section className="amr-split wrap" id="what-is-amr" aria-labelledby="what-heading">
          <div className="amr-split-media">
            <VideoPoster youtubeId={whatIsAmr.video.youtubeId} title={whatIsAmr.title} poster={whatIsAmr.video.poster} />
          </div>
          <div className="amr-split-copy">
            <p className="eyebrow">01 · The basics</p>
            <h2 id="what-heading">{whatIsAmr.title}</h2>
            <p className="about-lead">{whatIsAmr.lead}</p>
            <ReadMore>
              <p>{whatIsAmr.more.before}<a href={whatIsAmr.more.linkUrl} target="_blank" rel="noopener noreferrer">{whatIsAmr.more.linkText}</a>{whatIsAmr.more.after}</p>
            </ReadMore>
          </div>
        </section>
        <div className="amr-stat-band">
          <div className="wrap">
            <p className="amr-stat-value">{whatIsAmr.stat.value}</p>
            <p className="amr-stat-label">{whatIsAmr.stat.label}</p>
          </div>
        </div>

        {/* 02 Facts About AMR (Elementor: Accordion) */}
        <section className="amr-facts" id="facts" aria-labelledby="facts-heading">
          <div className="wrap amr-facts-inner">
            <div>
              <p className="eyebrow">02 · Know the facts</p>
              <h2 id="facts-heading">{facts.title}</h2>
            </div>
            <div className="amr-accordion">
              {facts.items.map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary>
                    <span className="amr-accordion-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="amr-accordion-q">{f.q}</span>
                    <Plus size={22} aria-hidden="true" />
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 03 + 04 Patients and humanitarian context: dark section, two video rows */}
        <section className="history-section amr-dark" aria-label="AMR in people's lives">
          <div className="wrap">
            <div className="amr-split amr-split-dark" id="patients">
              <div className="amr-split-media">
                <VideoPoster youtubeId={forPatients.video.youtubeId} title={forPatients.title} poster={forPatients.video.poster} />
              </div>
              <div className="amr-split-copy">
                <p className="eyebrow">03 · Riwa and Haydar</p>
                <h2>{forPatients.title}</h2>
                <p className="about-lead">{forPatients.lead}</p>
                <ReadMore><p>{forPatients.more}</p></ReadMore>
              </div>
            </div>
            <div className="amr-split amr-split-dark amr-split-reverse" id="humanitarian">
              <div className="amr-split-media">
                <VideoPoster youtubeId={humanitarian.video.youtubeId} title={humanitarian.title} poster={humanitarian.video.poster} />
              </div>
              <div className="amr-split-copy">
                <p className="eyebrow">04 · In crises</p>
                <h2>{humanitarian.title}</h2>
                <p className="about-lead">{humanitarian.lead}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 05 How is MSF addressing AMR: video + text + three pillars */}
        <section className="amr-response" id="msf-response" aria-labelledby="response-heading">
          <div className="amr-split wrap">
            <div className="amr-split-media">
              <VideoPoster youtubeId={msfResponse.video.youtubeId} title={msfResponse.title} poster={msfResponse.video.poster} />
            </div>
            <div className="amr-split-copy">
              <p className="eyebrow">05 · Our response</p>
              <h2 id="response-heading">{msfResponse.title}</h2>
              <p className="about-lead">{msfResponse.lead}</p>
              <ReadMore>
                <p>{msfResponse.more}</p>
                <p>{msfResponse.report.before}<a href={msfResponse.report.url} target="_blank" rel="noopener noreferrer">{msfResponse.report.linkText}</a>.</p>
              </ReadMore>
            </div>
          </div>
          <div className="wrap">
            <ul className="amr-pillars" aria-label="The three pillars of MSF's AMR strategy">
              {msfResponse.pillars.map((p, i) => {
                const Icon = pillarIcons[i];
                return (
                  <li key={p}>
                    <span className="amr-pillar-icon"><Icon size={24} aria-hidden="true" /></span>
                    <span className="amr-pillar-num">Pillar {String(i + 1).padStart(2, '0')}</span>
                    <h3>{p}</h3>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* 06 Political actions: image + text + numbered calls (grey band) */}
        <div className="work-commitments" id="political-action">
          <section className="about-intro wrap amr-politics" aria-labelledby="politics-heading">
            <figure className="about-intro-image">
              <img src={politicalActions.image} alt={politicalActions.alt} width={1000} height={667} loading="lazy" />
            </figure>
            <div className="about-intro-copy">
              <p className="eyebrow">06 · Political action</p>
              <h2 id="politics-heading">{politicalActions.title}</h2>
              <p className="about-lead">{politicalActions.lead}</p>
            </div>
          </section>
          <div className="wrap amr-calls">
            <p className="amr-calls-intro">{politicalActions.callsIntro}</p>
            <ol>
              {politicalActions.calls.map(c => <li key={c}>{c}</li>)}
              <li>{politicalActions.lastCall.text}<a href={politicalActions.lastCall.url} target="_blank" rel="noopener noreferrer">{politicalActions.lastCall.linkText}</a>.</li>
            </ol>
          </div>
        </div>

        {/* 07 Who has a role to play: swipeable strip of the campaign cards (Elementor: Image Carousel) */}
        <section className="amr-roles" id="roles" aria-labelledby="roles-heading">
          <div className="wrap">
            <div className="section-heading amr-roles-heading">
              <div>
                <p className="eyebrow">07 · Everyone counts</p>
                <h2 id="roles-heading">{roles.title}</h2>
              </div>
              <p className="amr-roles-lead">{roles.lead}</p>
            </div>
          </div>
          <div className="amr-roles-strip" tabIndex={0} aria-label="Reduce antimicrobial misuse campaign cards, scroll horizontally">
            {roles.slides.map(s => (
              <figure key={s.image}><img src={s.image} alt={s.alt} width={756} height={756} loading="lazy" /></figure>
            ))}
          </div>
        </section>

        {/* 08 Latest Publication: 2-column list of article cards */}
        <section className="amr-publications" id="publications" aria-labelledby="pubs-heading">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">08 · Research</p>
                <h2 id="pubs-heading">{publications.title}</h2>
              </div>
              <a className="text-link" href={publications.more.url} target="_blank" rel="noopener noreferrer">{publications.more.linkText} <ArrowRight size={20} /></a>
            </div>
            <ul className="amr-pubs">
              {publications.items.map(p => (
                <li key={p.title}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    <span className="amr-pub-source"><FileText size={15} aria-hidden="true" />{p.source}</span>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                    <span className="read">Read publication <ExternalLink size={17} aria-hidden="true" /></span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="amr-pubs-more">{publications.more.before}<a href={publications.more.url} target="_blank" rel="noopener noreferrer">{publications.more.linkText}</a></p>
          </div>
        </section>

        {/* 09 Communication Resources + Media Coverage */}
        <section className="about-cards-section about-cards-grey" id="resources" aria-labelledby="resources-heading">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">09 · Share and learn</p>
                <h2 id="resources-heading">Communication Resources</h2>
              </div>
            </div>
            <LinkCards cards={resources} />
          </div>
        </section>

        {/* 10 Get Involved & Write Us (Elementor: red container + Form widget on WordPress) */}
        <section className="newsletter-band amr-involved" id="get-involved" aria-labelledby="involved-heading">
          <div className="wrap">
            <div>
              <p className="eyebrow">10 · Get involved</p>
              <h2 id="involved-heading">{getInvolved.title}</h2>
              <p className="amr-involved-text">{getInvolved.text}</p>
            </div>
            <a className="pill" href={`mailto:${getInvolved.email}`}><Mail size={18} aria-hidden="true" /> {getInvolved.email}</a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
