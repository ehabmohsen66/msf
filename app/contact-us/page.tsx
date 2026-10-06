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
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/MSF.Lebanon',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/msf.lebanon/',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    name: 'X (formerly Twitter)',
    url: 'https://twitter.com/MSF_Lebanon',
    icon: (
      <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/channel/UCSIU_1TtfwNZn-ozF_1AHXg',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/doctors-without-borders-m%C3%A9decins-sans-fronti%C3%A8res-msf-international-recruitment-lebanon',
    icon: (
      <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
  },
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
            <div className="contact-social-icons">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className="contact-social-btn"
                >
                  {s.icon}
                </a>
              ))}
            </div>
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
