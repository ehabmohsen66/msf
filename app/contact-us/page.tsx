import type { Metadata } from 'next';
import { ArrowDown, MapPin, Phone, Mail, Globe } from 'lucide-react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import ContactForm from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'Contact us | MSF Lebanon',
  description: 'Get in touch with Médecins Sans Frontières (MSF) in Lebanon.',
};

const contact = {
  address: 'Lebanon, Beirut, Hamra, Beirut 1107 Domtex Building, 5th Floor',
  phone: '+961 1 737 090',
  email: 'info@msf-lebanon.org',
  map: 'https://www.google.com/maps?q=Domtex+Building+Hamra+Beirut&output=embed',
};

const socials = [
  ['Facebook', 'https://www.facebook.com/MSF.Lebanon'],
  ['Instagram', 'https://www.instagram.com/msf.lebanon/'],
  ['X (Twitter)', 'https://twitter.com/MSF_Lebanon'],
  ['YouTube', 'https://www.youtube.com/channel/UCSIU_1TtfwNZn-ozF_1AHXg'],
  ['LinkedIn', 'https://www.linkedin.com/company/doctors-without-borders-m%C3%A9decins-sans-fronti%C3%A8res-msf-international-recruitment-lebanon'],
];

/* Same structure as the live Contact Us page: details + social links, then the "Get in touch" form.
   Every section is a self-contained block so it can be rebuilt as an Elementor container. */
export default function ContactPage() {
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>

      <section className="hero about-hero work-hero contact-hero" aria-labelledby="contact-title">
        <div className="hero-images about-slides" aria-hidden="true">
          <img
            className="about-slide"
            src="/assets/contact-hero-hq.webp"
            alt="MSF staff member listening to a patient in an office consultation in Lebanon"
            fetchPriority="high"
          />
        </div>
        <SiteHeader />
        <div className="hero-story">
          <div>
            <p className="eyebrow light"><span />Médecins Sans Frontières</p>
            <h1 id="contact-title">Contact<br />us</h1>
          </div>
          <div className="hero-summary">
            <p className="story-meta">Beirut <span />Hamra <span />Lebanon</p>
            <p>Questions about our work, careers, media or volunteering? We’d like to hear from you.</p>
            <a className="pill" href="#get-in-touch">Get in touch <ArrowDown size={19} /></a>
          </div>
        </div>
        <div className="hero-bottom"><span>MSF Lebanon office</span><a href="#contact-details">Our details <ArrowDown size={17} /></a></div>
      </section>

      <main id="main">
        {/* 01 Contact details (Elementor: 3 Icon Box widgets) */}
        <section className="contact-details wrap" id="contact-details" aria-labelledby="details-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 · Find us</p>
              <h2 id="details-heading">Lebanon office</h2>
            </div>
          </div>
          <ul className="contact-cards">
            <li><MapPin size={28} aria-hidden="true" /><span className="contact-label">Address</span><p>{contact.address}</p></li>
            <li><Phone size={28} aria-hidden="true" /><span className="contact-label">Telephone</span><a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a></li>
            <li><Mail size={28} aria-hidden="true" /><span className="contact-label">Email</span><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
          </ul>
          <div className="contact-follow">
            <span className="contact-label">Follow us on</span>
            <div>{socials.map(([label, url]) => <a key={label} href={url} target="_blank" rel="noopener noreferrer">{label}</a>)}</div>
          </div>
        </section>

        {/* 02 Get in touch: form + map (Elementor: 2-column container, Form widget + Google Maps widget) */}
        <section className="contact-touch" id="get-in-touch" aria-labelledby="touch-heading">
          <div className="wrap contact-touch-grid">
            <div>
              <p className="eyebrow">02 · Write to us</p>
              <h2 id="touch-heading">Get in touch</h2>
              <ContactForm email={contact.email} />
            </div>
            <div className="contact-map">
              <iframe title="Map of the MSF Lebanon office in Hamra, Beirut" src={contact.map} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              <a className="text-link" href="https://www.msf.org/how-we-are-run#offices" target="_blank" rel="noopener noreferrer">See offices around the world <Globe size={18} /></a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
