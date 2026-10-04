'use client';

import { useEffect, useState, useRef } from 'react';
import WorldMap from '@/components/world-map';
import ActivityReport from '@/components/activity-report';
import MedicalTopics from '@/components/medical-topics';
import CareersIntro from '@/components/careers-intro';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import CountUpNumber from '@/components/count-up';
import { base } from '@/lib/nav';
import { ArrowRight, ArrowDown, ChevronLeft, ChevronRight, MapPin, Plane } from 'lucide-react';
const heroSlides = [
 {place:'Lebanon · Bekaa',type:'Voices from the field',date:'20 August 2026',title:<>Lives upheaved<br/>in the shadow<br/>of war</>,summary:'In the Bekaa, people forced from their homes face the lasting impact of conflict.',url:'/news/bekaa-where-lives-have-been-upheaved-in-the-shadow-of-war/',image:'/assets/hero.jpg',alt:'An MSF worker at a hospital in Lebanon',position:'center top'},
 {place:'Lebanon · South',type:'Statement',date:'7 September 2026',title:<>Water is life.<br/>Southern Lebanon<br/>must not be punished</>,summary:'Damage to water infrastructure is putting communities at greater risk and limiting access to essential services.',url:'/news/people-of-southern-lebanon-must-not-be-punished/',image:'/assets/news-1.jpg',alt:'Damaged water infrastructure in southern Lebanon',position:'center'},
 {place:'Palestine · Hebron',type:'Press release',date:'21 August 2026',title:<>Restrictions drive<br/>medical needs<br/>in Hebron</>,summary:'Violence and movement restrictions continue to prevent people from reaching essential medical care.',url:'/news/escalating-violence-and-movement-restrictions-continue-to-drive-medical-needs-in-hebron/',image:'/assets/news-3.jpg',alt:'A roadblock in Hebron',position:'center'}
];
const stories = [
 {tag:'Lebanon',title:'Water is life: People of Southern Lebanon must not be punished',date:'7 September 2026',url:'/news/people-of-southern-lebanon-must-not-be-punished/',image:'/assets/news-1.jpg'},
 {tag:'Yemen',title:'Malnourished children are reaching hospitals in critical condition in Yemen',date:'8 September 2026',url:'/news/malnourished-children-in-yemen/',image:'/assets/news-2.jpg'},
 {tag:'Palestine',title:'Escalating violence and movement restrictions continue to drive medical needs in Hebron',date:'21 August 2026',url:'/news/escalating-violence-and-movement-restrictions-continue-to-drive-medical-needs-in-hebron/',image:'/assets/news-3.jpg'},
 {tag:'Lebanon',title:'Bekaa: Emergency mobile clinics deployed to support displaced families',date:'18 August 2026',url:'/news/bekaa-where-lives-have-been-upheaved-in-the-shadow-of-war/',image:'/assets/hero.jpg'},
 {tag:'Sudan',title:'Darfur crisis: Health facilities pushed to the brink amid acute medical shortages',date:'2 August 2026',url:'/news/sudan-darfur-medical-emergency/',image:'/assets/figure-emergency.jpg'},
 {tag:'Syria',title:'Cross-border medical teams deliver vital healthcare across northwest Syria',date:'19 July 2026',url:'/news/syria-cross-border-medical-response/',image:'/assets/figure-consultations.jpg'},
 {tag:'Afghanistan',title:'Ensuring safe maternal and neonatal care in remote provinces',date:'30 June 2026',url:'/news/afghanistan-maternal-healthcare-khost/',image:'/assets/figure-births.jpg'}
];
const figuresData = [
  {
    image: '/assets/figure-consultations.jpg',
    alt: 'An MSF team examines patients at a transit centre in Ukraine',
    numericValue: 17071300,
    label: 'outpatient consultations'
  },
  {
    image: '/assets/figure-births.jpg',
    alt: 'A neonatal nurse checks a newborn at the MSF maternity hospital in Khost, Afghanistan',
    numericValue: 405000,
    label: 'births assisted, including caesarean sections'
  },
  {
    image: '/assets/figure-emergency.jpg',
    alt: 'MSF doctors review a patient report in Mazar-i-Sharif, Afghanistan',
    numericValue: 2941600,
    label: 'emergency room admissions'
  }
];

export default function Home(){
const [slide,setSlide]=useState(0);
const sliderTimerRef=useRef<number|null>(null);

const storiesContainerRef=useRef<HTMLDivElement>(null);
const [canScrollLeft,setCanScrollLeft]=useState(false);
const [canScrollRight,setCanScrollRight]=useState(true);

const checkScrollButtons=()=>{
  const el=storiesContainerRef.current;
  if(!el)return;
  setCanScrollLeft(el.scrollLeft>15);
  setCanScrollRight(el.scrollLeft<el.scrollWidth-el.clientWidth-15);
};

useEffect(()=>{
  checkScrollButtons();
  window.addEventListener('resize',checkScrollButtons);
  return()=>window.removeEventListener('resize',checkScrollButtons);
},[]);

const scrollStories=(direction:'left'|'right')=>{
  const el=storiesContainerRef.current;
  if(!el)return;
  const card=el.querySelector('.story') as HTMLElement;
  const cardWidth=card?card.offsetWidth:320;
  const gap=30;
  const scrollAmount=(cardWidth+gap)*(window.innerWidth<800?1:2);
  el.scrollBy({
    left:direction==='right'?scrollAmount:-scrollAmount,
    behavior:'smooth'
  });
  setTimeout(checkScrollButtons,350);
};

const resetSliderTimer=()=>{
  if(sliderTimerRef.current){
    window.clearInterval(sliderTimerRef.current);
  }
  sliderTimerRef.current=window.setInterval(()=>{
    setSlide(current=>(current+1)%heroSlides.length);
  },5000);
};

useEffect(()=>{
  sliderTimerRef.current=window.setInterval(()=>{
    setSlide(current=>(current+1)%heroSlides.length);
  },5000);
  return()=>{
    if(sliderTimerRef.current){
      window.clearInterval(sliderTimerRef.current);
    }
  };
},[]);


const activeSlide=heroSlides[slide];
const moveSlide=(direction:number)=>{
  setSlide(current=>(current+direction+heroSlides.length)%heroSlides.length);
  resetSliderTimer();
};
const goToSlide=(index:number)=>{
  setSlide(index);
  resetSliderTimer();
};
return <>
<a href="#main" className="skip">Skip to content</a>
<section className="hero" aria-roledescription="carousel" aria-label="Featured stories">
<div className="hero-images" aria-live="off">{heroSlides.map((item,index)=><img key={item.image} className={`hero-photo ${index===slide?'is-active':''}`} src={item.image} alt={index===slide?item.alt:''} style={{objectPosition:item.position}} fetchPriority={index===0?'high':'auto'} aria-hidden={index!==slide}/>)}</div>
<SiteHeader/>
<main id="main" className="hero-story" key={slide}><div><p className="eyebrow light"><span/>{activeSlide.place}</p><h1>{activeSlide.title}</h1></div><div className="hero-summary"><p className="story-meta">{activeSlide.type} <span/>{activeSlide.date}</p><p>{activeSlide.summary}</p><a className="pill" href={base+activeSlide.url}>Read the story <ArrowRight size={19}/></a></div></main>
<div className="hero-slider-controls"><button type="button" onClick={()=>moveSlide(-1)} aria-label="Previous featured story"><ChevronLeft/></button><div className="hero-dots" role="group" aria-label="Choose featured story">{heroSlides.map((item,index)=><button type="button" key={item.image} className={index===slide?'is-active':''} onClick={()=>goToSlide(index)} aria-label={`Show slide ${index+1}: ${item.place}`} aria-current={index===slide?'true':undefined}/>)}</div><span aria-live="polite">0{slide+1} / 0{heroSlides.length}</span><button type="button" onClick={()=>moveSlide(1)} aria-label="Next featured story"><ChevronRight/></button></div>
<div className="hero-bottom"><span>Independent. Impartial. Neutral.</span><a href="#latest">Explore our stories <ArrowDown size={17}/></a></div>
</section>
<section className="commemorative-feature wrap" id="50-years-lebanon" aria-labelledby="commemorative-heading">
  <div className="commemorative-grid">
    <div className="commemorative-image-wrapper">
      <img
        src="/assets/healing-hands-banner.png"
        alt="Healing hands... Right where it hurts - 50 Years in Lebanon - Médecins Sans Frontières"
        className="commemorative-banner-img"
        loading="lazy"
        width="1367"
        height="428"
      />
    </div>
    <div className="commemorative-card">
      <p className="commemorative-description" id="commemorative-heading">
        From the civil war to today&apos;s emergencies, MSF has stood alongside people in Lebanon with independent medical care — wherever the need is greatest.
      </p>
      <a
        className="commemorative-readmore-btn"
        href="https://msf-lebanon.org/about-us/50-years-of-msf-in-lebanon-2/"
      >
        <span className="plus-icon" aria-hidden="true">+</span>
        <span>Read More</span>
      </a>
      <div className="commemorative-card-line" aria-hidden="true" />
    </div>
  </div>
</section>
<section className="about-feature wrap" id="about-msf" aria-labelledby="about-heading">
  <div className="about-field">
    <img src="/assets/figure-consultations.jpg" alt="An MSF staff member wearing blue gloves takes notes while sitting beside a woman in a room with beds and personal belongings." loading="lazy" width="2000" height="1333"/>
    <p className="about-field-label">Medical care, without borders</p>
    <div className="about-field-caption">
      <span className="about-field-rule" aria-hidden="true"/>
      <h2 id="about-heading">Alongside<br/>people.</h2>
      <p>Wherever the need is greatest.</p>
    </div>
  </div>
  <div className="about-feature-content">
    <article aria-labelledby="who-heading">
      <p className="about-kicker">Our organisation</p>
      <h3 id="who-heading">Who We Are</h3>
      <p>We are Médecins Sans Frontières — Doctors Without Borders. An independent, international medical humanitarian organisation bringing together medical professionals, logisticians and many others to assist people in crisis.</p>
      <p>Medical ethics, impartiality, independence and neutrality guide everything we do.</p>
      <a className="about-feature-link" href="/about-us">Discover MSF <span><ArrowRight size={20} aria-hidden="true"/></span></a>
    </article>
    <article aria-labelledby="what-heading">
      <p className="about-kicker">Our medical action</p>
      <h3 id="what-heading">What We Do</h3>
      <p>We provide medical care to people affected by conflict, epidemics, disasters and exclusion from healthcare. Our teams respond to emergencies and support communities facing barriers to care.</p>
      <p>In Lebanon and around the world, our patients come first.</p>
      <a className="about-feature-link" href={base+'/what-we-do/'}>Explore our medical work <span><ArrowRight size={20} aria-hidden="true"/></span></a>
    </article>
  </div>
</section>
<section className="latest wrap" id="latest">
  <div className="section-heading">
    <div>
      <p className="eyebrow">From our teams</p>
      <h2>Latest news & stories</h2>
    </div>
    <div className="section-heading-actions">
      <div className="stories-header-arrows" role="group" aria-label="Stories navigation">
        <button
          type="button"
          className="stories-arrow-btn"
          onClick={()=>scrollStories('left')}
          disabled={!canScrollLeft}
          aria-label="Scroll to newer stories"
        >
          <ChevronLeft size={22}/>
        </button>
        <button
          type="button"
          className="stories-arrow-btn"
          onClick={()=>scrollStories('right')}
          disabled={!canScrollRight}
          aria-label="Scroll to older stories"
        >
          <ChevronRight size={22}/>
        </button>
      </div>
      <a className="text-link" href={base+'/news-events/news-stories/'}>View all stories <ArrowRight size={20}/></a>
    </div>
  </div>
  <div className="stories-slider-container">
    <button
      type="button"
      className="stories-side-arrow stories-side-prev"
      onClick={()=>scrollStories('left')}
      disabled={!canScrollLeft}
      aria-label="Scroll to newer stories"
    >
      <ChevronLeft size={24}/>
    </button>
    <div
      className="stories"
      ref={storiesContainerRef}
      onScroll={checkScrollButtons}
      tabIndex={0}
      role="region"
      aria-label="Latest news stories carousel"
    >
      {stories.map(s=><article className="story" key={s.title}><a href={base+s.url}><div className="story-image"><img src={s.image} alt="" loading="lazy"/><span>{s.tag}</span></div><div className="story-copy"><p className="date">{s.date}</p><h3>{s.title}</h3><span className="read">Read story <ArrowRight size={20}/></span></div></a></article>)}
    </div>
    <button
      type="button"
      className="stories-side-arrow stories-side-next"
      onClick={()=>scrollStories('right')}
      disabled={!canScrollRight}
      aria-label="Scroll to older stories"
    >
      <ChevronRight size={24}/>
    </button>
  </div>
</section>
<ActivityReport/>
<section className="numbers-section" id="msf-in-numbers" aria-labelledby="numbers-heading"><div className="wrap">
<div className="section-heading"><div><p className="eyebrow">Our global activities · 2025</p><h2 id="numbers-heading">MSF in Numbers</h2></div><a className="text-link" href="https://www.msf.org/international-activity-report-2025/2025-figures">Our activities in figures <ArrowRight size={20}/></a></div>
<div className="figures-grid">{figuresData.map(f=><article className="figure-card" key={f.numericValue}><img src={f.image} alt={f.alt} loading="lazy"/><div><CountUpNumber targetValue={f.numericValue} duration={2200}/><p className="figure-label">{f.label}</p></div></article>)}</div>
<p className="figure-source">Worldwide figures from the <a href="https://www.msf.org/international-activity-report-2025">MSF International Activity Report 2025</a>.</p>
</div></section>
<WorldMap/>
<MedicalTopics/>
<section className="careers-section" id="work-with-msf" aria-labelledby="careers-heading">
  <div className="wrap">
    <CareersIntro/>

    <div className="careers-paths">
      <a className="career-path" href={base + '/work-with-us/local-vacancies/'}>
        <img src="/assets/work-lebanon.jpg" alt="An MSF staff member in Beirut, Lebanon" loading="lazy" width="2560" height="1561" style={{objectPosition:'50% 35%'}}/>
        <span className="career-path-label"><span>01</span><MapPin size={15} aria-hidden="true"/>In Lebanon</span>
        <div className="career-path-body">
          <h3>Work in Lebanon</h3>
          <p>Join our teams providing emergency aid, mental health support and chronic disease care to vulnerable communities across Lebanon.</p>
          <span className="career-path-cta">Explore local vacancies <span className="career-path-arrow"><ArrowRight size={20} aria-hidden="true"/></span></span>
        </div>
      </a>

      <a className="career-path" href={base + '/work-with-us/overseas-vacancies/'}>
        <img src="/assets/work-overseas.jpg" alt="MSF hygienists in protective equipment at the Ebola isolation centre in Butembo, DR Congo" loading="lazy" width="2560" height="1707" style={{objectPosition:'38% 30%'}}/>
        <span className="career-path-label"><span>02</span><Plane size={15} aria-hidden="true"/>Worldwide</span>
        <div className="career-path-body">
          <h3>Work overseas</h3>
          <p>Deploy with MSF to conflict zones, natural disasters and remote communities, and bring your expertise to frontline humanitarian action.</p>
          <span className="career-path-cta">See international roles <span className="career-path-arrow"><ArrowRight size={20} aria-hidden="true"/></span></span>
        </div>
      </a>
    </div>
  </div>
</section>
<SiteFooter/>
</>}
