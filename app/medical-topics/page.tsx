import type { Metadata } from 'next';
import { ArrowRight, ArrowDown } from 'lucide-react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import MedicalTopics from '@/components/medical-topics';
import { topicsHero, whatIsAmr, resources } from '@/data/medical';

export const metadata: Metadata = {
  title: 'Medical topics | MSF Lebanon',
  description: 'Practical resources from MSF Lebanon on antimicrobial resistance, insulin access and patient safety.',
};

/* The live Medical Topics page only lists its topics, so this page is: hero, the three topic panels
   (same block as the homepage) and an AMR spotlight. Every section is a self-contained Elementor container. */
export default function MedicalTopicsPage() {
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>

      <section className="hero about-hero topics-hero" aria-labelledby="topics-title">
        <div className="hero-images about-slides" aria-hidden="true">
          {topicsHero.slides.map((src, i) => (
            <img key={src} className="about-slide" src={src} alt="" style={{ animationDelay: `${i * 6}s` }} fetchPriority={i === 0 ? 'high' : 'low'} />
          ))}
        </div>
        <SiteHeader />
        <div className="hero-story">
          <div>
            <p className="eyebrow light"><span />Médecins Sans Frontières</p>
            <h1 id="topics-title">Medical<br />topics</h1>
          </div>
          <div className="hero-summary">
            <p className="story-meta">AMR <span />Insulin access <span />Patient safety</p>
            <p>Practical resources on the health issues facing the communities we serve.</p>
            <a className="pill" href="#main">Explore topics <ArrowDown size={19} /></a>
          </div>
        </div>
        <div className="hero-bottom"><span>Health in focus</span><a href="#main">See all topics <ArrowDown size={17} /></a></div>
      </section>

      <main id="main">
        {/* 01 Topics: expanding image panels (Elementor: 3-column container of Image Box / Call to Action widgets) */}
        <MedicalTopics
          className="topics-page-panels"
          eyebrow="01 · Health in focus"
          title="Our medical topics"
          intro="Practical resources on the health issues facing the communities we serve, from antibiotic resistance to living with diabetes in a crisis."
          showAllLink={false}
        />

        {/* 02 AMR spotlight (Elementor: 2-column container, Image + Heading + Text Editor + Button) */}
        <div className="work-commitments">
          <section className="about-intro wrap" aria-labelledby="amr-spotlight-heading">
            <figure className="about-intro-image">
              <img src={resources[0].image} alt="Illustration of a person swallowing antibiotic pills while bacteria survive inside them." width={1000} height={667} loading="lazy" />
            </figure>
            <div className="about-intro-copy">
              <p className="eyebrow">02 · Spotlight</p>
              <h2 id="amr-spotlight-heading">Antimicrobial Resistance (AMR)</h2>
              <p className="about-lead">{whatIsAmr.lead}</p>
              <a className="pill" href="/medical-topics/antimicrobial-resistance-amr">Explore AMR <ArrowRight size={19} /></a>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
