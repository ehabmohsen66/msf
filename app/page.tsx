'use client';

import WorldMap from '@/components/world-map';
import { ArrowRight, ArrowDown, Menu, Search, Globe } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
const base = 'https://msf-lebanon.org';
const nav = [['About us','/about-us/'],['Our work','/what-we-do/msf-in-leb/'],['Medical topics','/medical-topics/'],['News & stories','/news-events/news-stories/']];
const heroLink = '/news/bekaa-where-lives-have-been-upheaved-in-the-shadow-of-war/';
const stories = [
 {tag:'Lebanon',title:'Water is life: People of Southern Lebanon must not be punished',date:'7 September 2026',url:'/news/people-of-southern-lebanon-must-not-be-punished/',image:'/assets/news-1.jpg'},
 {tag:'Yemen',title:'Malnourished children are reaching hospitals in critical condition in Yemen',date:'8 September 2026',url:'/news/malnourished-children-in-yemen/',image:'/assets/news-2.jpg'},
 {tag:'Palestine',title:'Escalating violence and movement restrictions continue to drive medical needs in Hebron',date:'21 August 2026',url:'/news/escalating-violence-and-movement-restrictions-continue-to-drive-medical-needs-in-hebron/',image:'/assets/news-3.jpg'}
];
export default function Home(){return <>
<a href="#main" className="skip">Skip to content</a>
<section className="hero">
<img className="hero-photo" src="/assets/hero.jpg" alt="MSF's work with communities affected by displacement in the Bekaa, Lebanon" fetchPriority="high"/>
<header className="masthead">
<div className="utility"><span className="edition">MÉDECINS SANS FRONTIÈRES · LEBANON</span><div><a href={base+'/work-with-us/'}>Work with MSF</a><a href="https://www.msf.org">MSF worldwide <Globe size={14}/></a><a href={base+'/ar/home-ar/'} lang="ar" dir="rtl">العربية</a></div></div>
<div className="main-nav"><a href="#" className="brand" aria-label="MSF Lebanon home"><img src="/assets/logo.svg" alt="Médecins Sans Frontières — أطباء بلا حدود"/></a><nav aria-label="Main navigation">{nav.map(([label,url])=><a key={label} href={base+url}>{label}</a>)}</nav><a className="search" href={base+'/?s='} aria-label="Search MSF Lebanon"><Search size={23}/></a><a className="pill nav-contact" href={base+'/contact-us/'}>Contact us</a><div className="mobile-menu"><Sheet><SheetTrigger aria-label="Open navigation"><Menu size={26}/></SheetTrigger><SheetContent><SheetHeader><SheetTitle>MSF Lebanon</SheetTitle><SheetDescription>Explore our work and stories.</SheetDescription></SheetHeader><nav className="mobile-links" aria-label="Mobile navigation">{nav.map(([label,url])=><a key={label} href={base+url}>{label}<ArrowRight size={18}/></a>)}<a href={base+'/work-with-us/'}>Work with us</a><a href={base+'/contact-us/'}>Contact us</a><a href={base+'/ar/home-ar/'} lang="ar">العربية</a></nav></SheetContent></Sheet></div></div>
</header>
<main id="main" className="hero-story"><div><p className="eyebrow light"><span/>Lebanon · Bekaa</p><h1>Lives upheaved<br/>in the shadow<br/>of war</h1></div><div className="hero-summary"><p className="story-meta">Voices from the field <span/>20 August 2026</p><p>In the Bekaa, people forced from their homes face the lasting impact of conflict.</p><a className="pill" href={base+heroLink}>Read the story <ArrowRight size={19}/></a></div></main>
<div className="hero-bottom"><span>Independent. Impartial. Neutral.</span><a href="#latest">Explore our stories <ArrowDown size={17}/></a></div>
</section>
<section className="about-sections wrap" id="about-msf" aria-label="About MSF">
<div className="about-heading"><p className="eyebrow">Medical care, without borders</p><h2>Alongside people.<br/>Wherever the need is greatest.</h2></div>
<div className="about-grid"><article><span className="section-number">01 / OUR IDENTITY</span><h3>Who We Are</h3><p>We are Médecins Sans Frontières — Doctors Without Borders. An independent, international medical humanitarian organisation, we bring together medical professionals, logisticians and many others to assist people in crisis.</p><p>Our work is guided by medical ethics and the principles of impartiality, independence and neutrality.</p><a className="text-link" href={base+'/about-us/'}>Discover MSF <ArrowRight size={20}/></a></article><article><span className="section-number">02 / OUR ACTION</span><h3>What We Do</h3><p>We provide medical care to people affected by conflict, epidemics, disasters and exclusion from healthcare. Our teams respond to emergencies and support communities facing barriers to care.</p><p>In Lebanon and around the world, we put the needs of our patients first.</p><a className="text-link" href={base+'/what-we-do/'}>Explore our medical work <ArrowRight size={20}/></a></article></div>
</section>
<section className="numbers-section" id="msf-in-numbers" aria-labelledby="numbers-heading"><div className="wrap">
<div className="section-heading"><div><p className="eyebrow">Our global activities · 2025</p><h2 id="numbers-heading">MSF in Numbers</h2></div><a className="text-link" href="https://www.msf.org/international-activity-report-2025/2025-figures">Our activities in figures <ArrowRight size={20}/></a></div>
<div className="figures-grid">{[
{image:'/assets/figure-consultations.jpg',alt:'An MSF team examines patients at a transit centre in Ukraine',value:'17,071,300',label:'outpatient consultations'},
{image:'/assets/figure-births.jpg',alt:'A neonatal nurse checks a newborn at the MSF maternity hospital in Khost, Afghanistan',value:'405,000',label:'births assisted, including caesarean sections'},
{image:'/assets/figure-emergency.jpg',alt:'MSF doctors review a patient report in Mazar-i-Sharif, Afghanistan',value:'2,941,600',label:'emergency room admissions'}
].map(f=><article className="figure-card" key={f.value}><img src={f.image} alt={f.alt} loading="lazy"/><div><p className="figure-value">{f.value}</p><p className="figure-label">{f.label}</p></div></article>)}</div>
<p className="figure-source">Worldwide figures from the <a href="https://www.msf.org/international-activity-report-2025">MSF International Activity Report 2025</a>.</p>
</div></section>
<WorldMap/>
<section className="latest wrap" id="latest"><div className="section-heading"><div><p className="eyebrow">From our teams</p><h2>Latest news & stories</h2></div><a className="text-link" href={base+'/news-events/news-stories/'}>View all stories <ArrowRight size={20}/></a></div><div className="stories">{stories.map(s=><article className="story" key={s.url}><a href={base+s.url}><div className="story-image"><img src={s.image} alt="" loading="lazy"/><span>{s.tag}</span></div><div className="story-copy"><p className="date">{s.date}</p><h3>{s.title}</h3><span className="read">Read story <ArrowRight size={20}/></span></div></a></article>)}</div></section>
<section className="work-band"><div className="wrap work-inner"><div><p className="eyebrow light">Work with MSF</p><h2>Your skills can<br/>make a difference.</h2></div><div><p>Medical and non-medical professionals work together to deliver care where it is needed most. Find your place in our teams.</p><a href={base+'/work-with-us/local-vacancies/'}>Explore local vacancies <ArrowRight/></a><a href={base+'/work-with-us/overseas-vacancies/'}>Work with us overseas <ArrowRight/></a></div></div></section>
<footer><div className="wrap footer-top"><div><img className="footer-logo" src="/assets/logo.svg" alt="Médecins Sans Frontières"/><p>Medical humanitarian action.<br/>In Lebanon and around the world.</p></div><div><h3>Discover MSF</h3><a href={base+'/about-us/'}>Who we are</a><a href={base+'/what-we-do/msf-in-leb/'}>MSF in Lebanon</a><a href={base+'/medical-topics/'}>Medical topics</a></div><div><h3>Resources</h3><a href={base+'/news-events/research-publications/'}>Research & publications</a><a href={base+'/news-events/'}>News & events</a><a href="https://tembo.msf.org">Learning with Tembo</a></div><div><h3>Stay connected</h3><a href={base+'/contact-us/'}>Contact us</a><a href={base+'/subscribe-to-our-newsletters-2/'}>Subscribe to our newsletter <ArrowRight size={16}/></a><a href={base+'/ar/home-ar/'} lang="ar">العربية</a></div></div><div className="wrap footer-bottom"><span>© Médecins Sans Frontières</span><a href="https://www.msf.org">MSF worldwide <Globe size={16}/></a></div></footer>
</>}
