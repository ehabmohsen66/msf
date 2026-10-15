'use client';

import { useEffect, useState, useRef } from 'react';
import WorldMapAr from '@/components/world-map-ar';
import ActivityReportAr from '@/components/activity-report-ar';
import MedicalTopicsAr from '@/components/medical-topics-ar';
import CareersIntroAr from '@/components/careers-intro-ar';
import InFocusAr from '@/components/in-focus-ar';
import SiteHeaderAr from '@/components/site-header-ar';
import SiteFooterAr from '@/components/site-footer-ar';
import CountUpNumber from '@/components/count-up';
import { postHref } from '@/lib/nav';
import { heroSlidesAr, storiesAr, figuresDataAr } from '@/data/ar/home';
import { ArrowLeft, ArrowDown, ChevronLeft, ChevronRight, MapPin, Plane } from 'lucide-react';

export default function HomeAr() {
  const [slide, setSlide] = useState(0);
  const sliderTimerRef = useRef<number | null>(null);

  const storiesContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(true);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollButtons = () => {
    const el = storiesContainerRef.current;
    if (!el) return;
    // In RTL scrollLeft can be negative or 0 depending on browser implementation
    const scrollLeft = Math.abs(el.scrollLeft);
    const maxScroll = el.scrollWidth - el.clientWidth - 15;
    setCanScrollLeft(scrollLeft < maxScroll);
    setCanScrollRight(scrollLeft > 15);
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, []);

  const scrollStories = (direction: 'next' | 'prev') => {
    const el = storiesContainerRef.current;
    if (!el) return;
    const card = el.querySelector('.story') as HTMLElement;
    const cardWidth = card ? card.offsetWidth : 320;
    const gap = 30;
    const scrollAmount = (cardWidth + gap) * (window.innerWidth < 800 ? 1 : 2);
    // In RTL, "next" cards are to the left
    el.scrollBy({
      left: direction === 'next' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
    setTimeout(checkScrollButtons, 350);
  };

  const resetSliderTimer = () => {
    if (sliderTimerRef.current) {
      window.clearInterval(sliderTimerRef.current);
    }
    sliderTimerRef.current = window.setInterval(() => {
      setSlide((current) => (current + 1) % heroSlidesAr.length);
    }, 5000);
  };

  useEffect(() => {
    sliderTimerRef.current = window.setInterval(() => {
      setSlide((current) => (current + 1) % heroSlidesAr.length);
    }, 5000);
    return () => {
      if (sliderTimerRef.current) {
        window.clearInterval(sliderTimerRef.current);
      }
    };
  }, []);

  const activeSlide = heroSlidesAr[slide];
  const moveSlide = (direction: number) => {
    setSlide((current) => (current + direction + heroSlidesAr.length) % heroSlidesAr.length);
    resetSliderTimer();
  };
  const goToSlide = (index: number) => {
    setSlide(index);
    resetSliderTimer();
  };

  return (
    <div dir="rtl" className="rtl-layout">
      <a href="#main" className="skip">الانتقال إلى المحتوى الرئيسي</a>

      {/* Hero Carousel */}
      <section className="hero" aria-roledescription="carousel" aria-label="قصص مميزة">
        <div className="hero-images" aria-live="off">
          {heroSlidesAr.map((item, index) => (
            <img
              key={item.image}
              className={`hero-photo ${index === slide ? 'is-active' : ''}`}
              src={item.image}
              alt={index === slide ? item.alt : ''}
              style={{ objectPosition: item.position }}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              aria-hidden={index !== slide}
            />
          ))}
        </div>

        <SiteHeaderAr />

        <main id="main" className="hero-story" key={slide}>
          <div>
            <p className="eyebrow light">
              <span />
              {activeSlide.place}
            </p>
            <h1>{activeSlide.title}</h1>
          </div>
          <div className="hero-summary">
            <p className="story-meta">
              {activeSlide.type} <span />
              {activeSlide.date}
            </p>
            <p>{activeSlide.summary}</p>
            <a className="pill" href={postHref(activeSlide.url)}>
              اقرأ القصة <ArrowLeft size={19} />
            </a>
          </div>
        </main>

        <div className="hero-slider-controls">
          <button
            type="button"
            onClick={() => moveSlide(1)}
            aria-label="القصة التالية"
          >
            <ChevronRight />
          </button>
          <div className="hero-dots" role="group" aria-label="اختيار القصة المميزة">
            {heroSlidesAr.map((item, index) => (
              <button
                type="button"
                key={item.image}
                className={index === slide ? 'is-active' : ''}
                onClick={() => goToSlide(index)}
                aria-label={`عرض الشريحة ${index + 1}: ${item.place}`}
                aria-current={index === slide ? 'true' : undefined}
              />
            ))}
          </div>
          <span aria-live="polite">
            0{slide + 1} / 0{heroSlidesAr.length}
          </span>
          <button
            type="button"
            onClick={() => moveSlide(-1)}
            aria-label="القصة السابقة"
          >
            <ChevronLeft />
          </button>
        </div>

        <div className="hero-bottom">
          <span>مستقلة. حيادية. غير متحيزة.</span>
          <a href="#latest">
            استكشف قصصنا <ArrowDown size={17} />
          </a>
        </div>
      </section>

      {/* 50 Years Commemorative Section */}
      <section className="commemorative-feature wrap" id="50-years-lebanon" aria-labelledby="commemorative-heading">
        <div className="commemorative-grid">
          <div className="commemorative-image-wrapper">
            <img
              src="/assets/healing-hands-banner.png"
              alt="أيادٍ تداوي الجراح... حيث تشتد الحاجة - 50 عاماً في لبنان - أطباء بلا حدود"
              className="commemorative-banner-img"
              loading="lazy"
              width="1367"
              height="428"
            />
          </div>
          <div className="commemorative-card">
            <p className="commemorative-description" id="commemorative-heading">
              منذ الحرب الأهلية وحتى أزمات اليوم، وقفت أطباء بلا حدود إلى جانب الناس في لبنان مقدّمة الرعاية الطبية المستقلة — أينما كانت الحاجة أشدّ.
            </p>
            <a
              className="commemorative-readmore-btn"
              href="https://msf-lebanon.org/ar/about-us/50-years-of-msf-in-lebanon-2/"
            >
              <span className="plus-icon" aria-hidden="true">+</span>
              <span>اقرأ المزيد</span>
            </a>
            <div className="commemorative-card-line" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* In Focus */}
      <InFocusAr />

      {/* Careers Section */}
      <section className="careers-section" id="work-with-us" aria-labelledby="careers-heading">
        <div className="wrap">
          <CareersIntroAr />

          <div className="careers-paths">
            <a className="career-path" href="https://msf-lebanon.org/ar/work-with-us/local-vacancies/">
              <img
                src="/assets/work-lebanon.jpg"
                alt="أحد كوادر أطباء بلا حدود في بيروت، لبنان"
                loading="lazy"
                width="2560"
                height="1561"
                style={{ objectPosition: '50% 35%' }}
              />
              <span className="career-path-label">
                <span>01</span>
                <MapPin size={15} aria-hidden="true" />
                في لبنان
              </span>
              <div className="career-path-body">
                <h3>العمل في لبنان</h3>
                <p>انضم إلى فرقنا التي تقدم المساعدات الطارئة والدعم النفسي ورعاية الأمراض المزمنة للمجتمعات الهشة في مختلف أنحاء لبنان.</p>
                <span className="career-path-cta">
                  استكشف الوظائف المحلية <span className="career-path-arrow"><ArrowLeft size={20} aria-hidden="true" /></span>
                </span>
              </div>
            </a>

            <a className="career-path" href="https://msf-lebanon.org/ar/work-with-us/overseas-vacancies/">
              <img
                src="/assets/work-overseas.jpg"
                alt="كوادر أطباء بلا حدود في مركز عزل بجمهورية الكونغو الديمقراطية"
                loading="lazy"
                width="2560"
                height="1707"
                style={{ objectPosition: '38% 30%' }}
              />
              <span className="career-path-label">
                <span>02</span>
                <Plane size={15} aria-hidden="true" />
                حول العالم
              </span>
              <div className="career-path-body">
                <h3>العمل في الخارج</h3>
                <p>انطلق مع أطباء بلا حدود إلى مناطق النزاعات والكوارث الطبيعية والمجتمعات النائية، وسخّر خبرتك في العمل الإنساني الميداني.</p>
                <span className="career-path-cta">
                  استكشف الوظائف الدولية <span className="career-path-arrow"><ArrowLeft size={20} aria-hidden="true" /></span>
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Latest News & Stories Carousel */}
      <section className="latest wrap" id="latest">
        <div className="section-heading">
          <div>
            <p className="eyebrow">من فرقنا الميدانية</p>
            <h2>آخر الأخبار والقصص</h2>
          </div>
          <div className="section-heading-actions">
            <div className="stories-header-arrows" role="group" aria-label="التنقل بين الأخبار">
              <button
                type="button"
                className="stories-arrow-btn"
                onClick={() => scrollStories('prev')}
                disabled={!canScrollRight}
                aria-label="القصص السابقة"
              >
                <ChevronRight size={22} />
              </button>
              <button
                type="button"
                className="stories-arrow-btn"
                onClick={() => scrollStories('next')}
                disabled={!canScrollLeft}
                aria-label="القصص التالية"
              >
                <ChevronLeft size={22} />
              </button>
            </div>
            <a className="text-link" href="https://msf-lebanon.org/ar/news-events/news-stories/">
              جميع الأخبار والقصص <ArrowLeft size={20} />
            </a>
          </div>
        </div>

        <div className="stories-slider-container">
          <button
            type="button"
            className="stories-side-arrow stories-side-prev"
            onClick={() => scrollStories('prev')}
            disabled={!canScrollRight}
            aria-label="القصص السابقة"
          >
            <ChevronRight size={24} />
          </button>
          <div
            className="stories"
            ref={storiesContainerRef}
            onScroll={checkScrollButtons}
            tabIndex={0}
            role="region"
            aria-label="شريط آخر الأخبار والقصص"
          >
            {storiesAr.map((s) => (
              <article className="story" key={s.title}>
                <a href={postHref(s.url)}>
                  <div className="story-image">
                    <img src={s.image} alt="" loading="lazy" />
                    <span>{s.tag}</span>
                  </div>
                  <div className="story-copy">
                    <p className="date">{s.date}</p>
                    <h3>{s.title}</h3>
                    <span className="read">
                      اقرأ القصة <ArrowLeft size={20} />
                    </span>
                  </div>
                </a>
              </article>
            ))}
          </div>
          <button
            type="button"
            className="stories-side-arrow stories-side-next"
            onClick={() => scrollStories('next')}
            disabled={!canScrollLeft}
            aria-label="القصص التالية"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
      </section>

      {/* Activity Report */}
      <ActivityReportAr />

      {/* Numbers Section */}
      <section className="numbers-section" id="msf-in-numbers" aria-labelledby="numbers-heading">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">أنشطتنا العالمية · 2025</p>
              <h2 id="numbers-heading">أطباء بلا حدود بالأرقام</h2>
            </div>
            <a className="text-link" href="https://www.msf.org/ar/international-activity-report-2025/2025-figures">
              أنشطتنا بالأرقام <ArrowLeft size={20} />
            </a>
          </div>
          <div className="figures-grid">
            {figuresDataAr.map((f) => (
              <article className="figure-card" key={f.numericValue}>
                <img src={f.image} alt={f.alt} loading="lazy" />
                <div>
                  <CountUpNumber targetValue={f.numericValue} duration={2200} />
                  <p className="figure-label">{f.label}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="figure-source">
            أرقام عالمية مستخلصة من <a href="https://www.msf.org/ar/international-activity-report-2025">تقرير النشاط الدولي لمنظمة أطباء بلا حدود 2025</a>.
          </p>
        </div>
      </section>

      {/* World Map */}
      <WorldMapAr />

      {/* Medical Topics */}
      <MedicalTopicsAr />

      {/* About MSF Section */}
      <section className="about-feature wrap" id="about-msf" aria-labelledby="about-heading">
        <div className="about-field">
          <img
            src="/assets/figure-consultations.jpg"
            alt="أحد كوادر أطباء بلا حدود يدون ملاحظات بجوار مريضة في مركز إيواء."
            loading="lazy"
            width="2000"
            height="1333"
          />
          <p className="about-field-label">رعاية طبية بلا حدود</p>
          <div className="about-field-caption">
            <span className="about-field-rule" aria-hidden="true" />
            <h2 id="about-heading">
              إلى جانب<br />الناس.
            </h2>
            <p>أينما كانت الحاجة أشد.</p>
          </div>
        </div>
        <div className="about-feature-content">
          <article aria-labelledby="who-heading">
            <p className="about-kicker">منظمتنا</p>
            <h3 id="who-heading">من نحن</h3>
            <p>
              نحن منظمة أطباء بلا حدود — منظمة دولية إنسانية طبية مستقلة تجمع الأطباء والكوادر التمريضية واللوجستيين وغيرهم لتقديم المساعدة للأشخاص في أوقات الأزمات.
            </p>
            <p>
              توجه أخلاقيات مهنة الطب، والحيادية، والاستقلالية، وعدم التحيّز كل ما نقوم به من أعمال وإغاثة.
            </p>
            <a className="about-feature-link" href="https://msf-lebanon.org/ar/about-us/">
              اكتشف منظمة أطباء بلا حدود <span><ArrowLeft size={20} aria-hidden="true" /></span>
            </a>
          </article>
          <article aria-labelledby="what-heading">
            <p className="about-kicker">عملنا الطبي الإنساني</p>
            <h3 id="what-heading">ماذا نفعل</h3>
            <p>
              نقدّم الرعاية الطبية للمتضررين من النزاعات المسلحة والأوبئة والكوارث الطبيعية والإقصاء من الرعاية الصحية. تستجيب فرقنا للطوارئ وتدعم المجتمعات التي تواجه عوائق في الوصول إلى العلاج.
            </p>
            <p>
              في لبنان وحول العالم، مرضانا هم أولويتنا الأولى دائماً وأبداً.
            </p>
            <a className="about-feature-link" href="https://msf-lebanon.org/ar/what-we-do/">
              استكشف عملنا الطبي <span><ArrowLeft size={20} aria-hidden="true" /></span>
            </a>
          </article>
        </div>
      </section>

      {/* Footer */}
      <SiteFooterAr />
    </div>
  );
}
