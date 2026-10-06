'use client';

import { useEffect, useRef } from 'react';
import { ArrowDown, ChevronRight } from 'lucide-react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';

export default function WorldPatientSafetyDayPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clean up lightbox and lock class on unmount
    return () => {
      document.documentElement.classList.remove('wpsd-lock');
      document.body.classList.remove('wpsd-lock');
      const lb = document.getElementById('wpsd-lightbox');
      if (lb && lb.parentNode === document.body) {
        lb.remove();
      }
    };
  }, []);

  useEffect(() => {
    const root = document.getElementById('wpsd-top');
    if (!root) return;
    const current: string = 'en';

    // Missing media placeholders
    root.querySelectorAll<HTMLImageElement>('img[data-wpsd-file]').forEach(function (img) {
      function fail() {
        const p = img.parentElement;
        if (p) {
          p.classList.add('wpsd-missing');
          p.setAttribute('data-wpsd-file', 'Upload ' + (img.getAttribute('data-wpsd-file') || ''));
        }
      }
      if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) fail();
      img.addEventListener('error', fail);
    });

    // Reveal
    let io: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      root.classList.add('wpsd-enhanced');
      io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              e.target.classList.add('is-visible');
              io?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
      );
      root.querySelectorAll('.wpsd-reveal').forEach(function (el) {
        io?.observe(el);
      });
    } else {
      root.querySelectorAll('.wpsd-reveal').forEach(function (el) {
        el.classList.add('is-visible');
      });
    }

    // Count-up
    function countUp(el: Element) {
      const target = parseFloat(el.getAttribute('data-wpsd-count') || '0');
      const suffix = el.getAttribute('data-wpsd-suffix') || '';
      let start: number | null = null;
      function step(ts: number) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 1600, 1);
        const v = Math.round(target * (1 - Math.pow(1 - p, 3)));
        el.textContent = v.toLocaleString('en-US') + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    let co: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      co = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              countUp(e.target);
              co?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      root.querySelectorAll('[data-wpsd-count]').forEach(function (el) {
        co?.observe(el);
      });
    }

    // Videos: pause others
    const videos = root.querySelectorAll<HTMLVideoElement>('video');
    videos.forEach(function (v) {
      const card = v.closest('.wpsd-video-card');
      v.addEventListener('play', function () {
        if (card) card.classList.add('is-playing');
        videos.forEach(function (o) {
          if (o !== v) o.pause();
        });
      });
      v.addEventListener('pause', function () {
        if (card) card.classList.remove('is-playing');
      });
      v.addEventListener('ended', function () {
        if (card) card.classList.remove('is-playing');
      });
    });

    // Lightbox
    const lb = document.getElementById('wpsd-lightbox');
    const lbImg = lb ? (lb.querySelector('img') as HTMLImageElement) : null;
    let lbSlides: HTMLElement[] = [];
    let lbIdx = 0;
    let lastFocus: HTMLElement | null = null;

    if (lb && lb.parentNode !== document.body) {
      document.body.appendChild(lb);
    }

    function showLb(i: number) {
      if (!lbSlides.length) return;
      lbIdx = (i + lbSlides.length) % lbSlides.length;
      const img = lbSlides[lbIdx].querySelector('img') as HTMLImageElement | null;
      if (img && lbImg) {
        lbImg.src = img.currentSrc || img.src;
        lbImg.alt = img.alt;
      }
    }

    function openLightbox(slides: HTMLElement[], i: number) {
      if (!lb) return;
      lbSlides = slides;
      lastFocus = document.activeElement as HTMLElement | null;
      showLb(i);
      lb.setAttribute('dir', current === 'ar' ? 'rtl' : 'ltr');
      lb.classList.add('is-open');
      lb.setAttribute('aria-hidden', 'false');
      document.documentElement.classList.add('wpsd-lock');
      document.body.classList.add('wpsd-lock');
      setTimeout(function () {
        const closeBtn = lb.querySelector<HTMLButtonElement>('.wpsd-lb-close');
        if (closeBtn) closeBtn.focus();
      }, 30);
    }

    function closeLb() {
      if (!lb) return;
      lb.classList.remove('is-open');
      lb.setAttribute('aria-hidden', 'true');
      document.documentElement.classList.remove('wpsd-lock');
      document.body.classList.remove('wpsd-lock');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    function handleLbClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const a = target.getAttribute && target.getAttribute('data-wpsd-lb');
      if (target === lb || a === 'close') closeLb();
      if (a === 'prev') showLb(lbIdx - 1);
      if (a === 'next') showLb(lbIdx + 1);
    }

    function handleLbKeyDown(e: KeyboardEvent) {
      if (!lb || !lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowRight') showLb(lbIdx + 1);
      if (e.key === 'ArrowLeft') showLb(lbIdx - 1);
    }

    if (lb) {
      lb.addEventListener('click', handleLbClick);
      document.addEventListener('keydown', handleLbKeyDown);
    }

    // Carousels
    root.querySelectorAll('.wpsd-lang:not([hidden]) .wpsd-carousel').forEach(function (car) {
      if (car.getAttribute('data-ready')) return;
      car.setAttribute('data-ready', '1');
      const section = car.closest('section');
      const track = car.querySelector<HTMLElement>('.wpsd-car-track');
      if (!track || !section) return;

      const slides = Array.from(track.querySelectorAll<HTMLElement>('.wpsd-slide'));
      const dotsBox = car.querySelector<HTMLElement>('.wpsd-dots');
      const count = section.querySelector<HTMLElement>('.wpsd-car-count');
      let idx = 0;

      slides.forEach(function (s, i) {
        if (dotsBox) {
          const d = document.createElement('button');
          d.type = 'button';
          d.setAttribute('aria-label', i + 1 + ' / ' + slides.length);
          d.addEventListener('click', function () {
            go(i);
          });
          dotsBox.appendChild(d);
        }
        s.addEventListener('click', function () {
          openLightbox(slides, i);
        });
      });

      const dots = dotsBox ? dotsBox.querySelectorAll('button') : [];

      function mark(i: number) {
        idx = i;
        slides.forEach(function (s, k) {
          s.classList.toggle('is-current', k === i);
        });
        dots.forEach(function (d, k) {
          d.classList.toggle('is-active', k === i);
        });
        if (count) count.textContent = i + 1 + ' / ' + slides.length;
      }

      function go(i: number) {
        if (!track) return;
        i = (i + slides.length) % slides.length;
        const s = slides[i];
        let left = s.offsetLeft - (track.clientWidth - s.clientWidth) / 2;
        const rtl = getComputedStyle(track).direction === 'rtl';
        if (rtl) {
          left = -(
            track.scrollWidth -
            s.offsetLeft -
            s.clientWidth -
            (track.clientWidth - s.clientWidth) / 2
          );
        }
        track.scrollTo({ left: left, behavior: 'smooth' });
        mark(i);
      }

      section.querySelectorAll<HTMLElement>('[data-wpsd-car]').forEach(function (b) {
        b.addEventListener('click', function () {
          go(idx + (b.getAttribute('data-wpsd-car') === 'next' ? 1 : -1));
        });
      });

      track.addEventListener('keydown', function (e) {
        const rtl = getComputedStyle(track).direction === 'rtl';
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          go(idx + (rtl ? -1 : 1));
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          go(idx + (rtl ? 1 : -1));
        }
      });

      let t: NodeJS.Timeout | null = null;
      track.addEventListener(
        'scroll',
        function () {
          if (t) clearTimeout(t);
          t = setTimeout(function () {
            const center = track.getBoundingClientRect().left + track.clientWidth / 2;
            let best = 0;
            let bestD = Infinity;
            slides.forEach(function (s, k) {
              const r = s.getBoundingClientRect();
              const d = Math.abs(r.left + r.width / 2 - center);
              if (d < bestD) {
                bestD = d;
                best = k;
              }
            });
            mark(best);
          }, 90);
        },
        { passive: true }
      );
      mark(0);
    });

    return () => {
      if (io) io.disconnect();
      if (co) co.disconnect();
      if (lb) {
        lb.removeEventListener('click', handleLbClick);
        document.removeEventListener('keydown', handleLbKeyDown);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="wpsd-root-wrapper">
      <section className="hero about-hero work-hero amr-hero" aria-labelledby="wpsd-title">
        <div className="hero-images about-slides" aria-hidden="true">
          <img className="about-slide" src="https://msf-lebanon.org/wp-content/uploads/2026/09/MSB246809High-scaled.jpg" alt="" fetchPriority="high" />
        </div>
        <SiteHeader />
        <div className="hero-story">
          <div>
            <nav className="eyebrow light amr-breadcrumb" aria-label="Breadcrumb">
              <span /><a href="/medical-topics">Medical Topics</a><ChevronRight size={14} aria-hidden="true" />Patient Safety
            </nav>
            <h1 id="wpsd-title">World Patient<br />Safety Day</h1>
          </div>
          <div className="hero-summary">
            <p className="story-meta">17 September</p>
            <p>Safe care for people living with chronic diseases.</p>
            <a className="pill" href="#wpsd-ch01">Read the story <ArrowDown size={19} /></a>
          </div>
        </div>
        <div className="hero-bottom"><span>World Patient Safety Day 2026</span><a href="#wpsd-carousel-en">See the posts <ArrowDown size={17} /></a></div>
      </section>
      <style
        dangerouslySetInnerHTML={{
          __html: `
  @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Noto+Kufi+Arabic:wght@500;600;700;800;900&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Noto+Naskh+Arabic:wght@500;600;700&display=swap');

  #wpsd-top{
    --w-red:#e30613;
    --w-red-dark:#b8040f;
    --w-black:#101010;
    --w-ink:#565656;
    --w-paper:#f6f3ee;
    --w-paper-deep:#efe9e1;
    --w-border:#e4dcd2;
    --w-clay:#c47a4f;
    --w-clay-light:#e8a57c;
    --w-shadow:0 30px 90px rgba(0,0,0,.14);
    --w-shadow-soft:0 18px 55px rgba(0,0,0,.08);
    --w-display:Impact,"Arial Black","Arial Narrow",sans-serif;
    --w-sans:Inter,Helvetica,Arial,sans-serif;
    --w-serif:"Cormorant Garamond",Georgia,serif;
  }
  #wpsd-top .wpsd-lang[data-wpsd-lang="ar"]{
    --w-display:"Noto Kufi Arabic","IBM Plex Sans Arabic",Tahoma,sans-serif;
    --w-sans:"IBM Plex Sans Arabic","Noto Kufi Arabic",Tahoma,sans-serif;
    --w-serif:"Noto Naskh Arabic","IBM Plex Sans Arabic",serif;
  }

  html{scroll-behavior:smooth;}
  .wpsd-page,.wpsd-page *{box-sizing:border-box;}
  .wpsd-page{position:relative;width:100%;overflow:hidden;background:#fff;color:var(--w-black);font-family:Inter,Helvetica,Arial,sans-serif;isolation:isolate;}
  .wpsd-lang{font-family:var(--w-sans);}
  .wpsd-lang[hidden]{display:none!important;}
  .wpsd-container{width:min(1280px,calc(100% - 112px));margin:0 auto;}
  .wpsd-section{position:relative;padding:104px 0;}
  .wpsd-paper{background:var(--w-paper);}
  .wpsd-dark{background:var(--w-black);color:#fff;}

  /* ───────── Type ───────── */
  .wpsd-display{margin:0;font-family:var(--w-display);font-weight:900;text-transform:uppercase;letter-spacing:-.024em;color:var(--w-black);}
  .wpsd-t-hero{font-size:clamp(40px,4.9vw,78px);line-height:.92;}
  .wpsd-t-xl{font-size:clamp(40px,5vw,80px);line-height:.92;}
  .wpsd-t-md{font-size:clamp(30px,3.4vw,52px);line-height:.96;}
  .wpsd-t-sm{font-size:clamp(22px,2vw,30px);line-height:1;}
  [data-wpsd-lang="ar"] .wpsd-display{text-transform:none;letter-spacing:0;font-weight:800;line-height:1.3;}
  [data-wpsd-lang="ar"] .wpsd-t-hero{font-size:clamp(34px,4vw,62px);line-height:1.28;}
  [data-wpsd-lang="ar"] .wpsd-t-xl{font-size:clamp(32px,3.8vw,58px);line-height:1.3;}
  [data-wpsd-lang="ar"] .wpsd-t-md{font-size:clamp(26px,2.8vw,42px);line-height:1.35;}
  [data-wpsd-lang="ar"] .wpsd-t-sm{font-size:clamp(19px,1.7vw,24px);line-height:1.4;}

  .wpsd-body{margin:0;color:var(--w-ink);font-size:clamp(18px,1.7vw,21px);line-height:1.75;}
  .wpsd-body + .wpsd-body{margin-top:24px;}
  .wpsd-body strong{color:var(--w-black);}
  .wpsd-dark .wpsd-body{color:rgba(255,255,255,.8);}
  .wpsd-dark .wpsd-body strong{color:#fff;}
  [data-wpsd-lang="ar"] .wpsd-body{line-height:1.95;}
  .wpsd-num{direction:ltr;unicode-bidi:isolate;font-variant-numeric:tabular-nums;}

  .wpsd-kicker{display:inline-flex;align-items:center;gap:11px;margin:0 0 20px;font-family:var(--w-display);font-size:15px;line-height:1.2;text-transform:uppercase;letter-spacing:.09em;color:var(--w-red);}
  .wpsd-kicker img{width:22px;height:22px;flex:0 0 22px;object-fit:contain;display:block;}
  .wpsd-kicker-line:before{content:"";width:26px;height:5px;flex:0 0 26px;border-radius:999px;background:var(--w-red);transform:rotate(-16deg);}
  .wpsd-kicker-w{color:#fff;}
  [data-wpsd-lang="ar"] .wpsd-kicker{letter-spacing:0;font-weight:700;font-size:16px;}

  .wpsd-page a:focus-visible,.wpsd-page button:focus-visible{outline:3px solid rgba(227,6,19,.6);outline-offset:3px;}

  /* ───────── Hero ───────── */
  .wpsd-hero{
    position:relative;display:flex;align-items:center;min-height:92vh;padding:92px 0;overflow:hidden;
    background:radial-gradient(circle at 86% 12%,rgba(227,6,19,.18),transparent 360px),linear-gradient(135deg,#141414 0%,#101010 58%,#1b1512 100%);
    color:#fff;
  }
  .wpsd-hero:before{
    content:"";position:absolute;inset:0;pointer-events:none;
    background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);
    background-size:58px 58px;mask-image:radial-gradient(circle at 74% 42%,#000 0%,transparent 64%);-webkit-mask-image:radial-gradient(circle at 74% 42%,#000 0%,transparent 64%);
  }
  .wpsd-hero-grid{position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.9fr);gap:clamp(40px,5vw,80px);align-items:center;}
  .wpsd-hero .wpsd-display{color:#fff;}
  .wpsd-hero-sub{max-width:580px;margin:28px 0 0;font-family:var(--w-serif);font-style:italic;font-weight:500;font-size:clamp(23px,2.4vw,32px);line-height:1.3;color:rgba(255,255,255,.9);}
  [data-wpsd-lang="ar"] .wpsd-hero-sub{font-style:normal;font-weight:600;font-size:clamp(21px,2vw,27px);line-height:1.75;}
  .wpsd-hero-logo{margin:0 0 28px;}
  .wpsd-hero-logo img{display:block;width:clamp(56px,5.5vw,84px);height:auto;object-fit:contain;}
  .wpsd-hero-rule{width:88px;height:6px;margin:32px 0 0;border-radius:999px;background:var(--w-red);}
  .wpsd-hero-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:34px;}
  .wpsd-btn{
    display:inline-flex;align-items:center;gap:10px;min-height:52px;padding:13px 24px;border-radius:999px;border:2px solid transparent;
    font-family:var(--w-sans);font-size:15px;font-weight:700;line-height:1.2;text-decoration:none!important;cursor:pointer;
    transition:background .2s ease,color .2s ease,border-color .2s ease;
  }
  .wpsd-btn svg{width:16px;height:16px;flex:0 0 16px;fill:currentColor;}
  .wpsd-btn-red{background:var(--w-red);color:#fff!important;}
  .wpsd-btn-red:hover{background:var(--w-red-dark);}
  .wpsd-btn-line{border-color:rgba(255,255,255,.38);color:#fff!important;background:transparent;}
  .wpsd-btn-line:hover{border-color:#fff;background:rgba(255,255,255,.08);}

  .wpsd-hero-meta{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px;}
  .wpsd-chip{display:inline-flex;align-items:center;min-height:34px;padding:7px 14px;border-radius:999px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);color:rgba(255,255,255,.86);font-size:13px;font-weight:600;line-height:1.3;}

  /* hero: fanned carousel posts */
  .wpsd-fan{position:relative;height:clamp(420px,46vw,600px);}
  .wpsd-fan a{
    position:absolute;top:50%;left:50%;display:block;width:clamp(190px,17vw,280px);aspect-ratio:4/5;overflow:hidden;border-radius:22px;
    background:#1b1b1b;box-shadow:0 26px 70px rgba(0,0,0,.5);text-decoration:none!important;
    transition:transform .6s cubic-bezier(.2,.7,.2,1);
  }
  .wpsd-fan a img{width:100%;height:100%;display:block;object-fit:cover;}
  .wpsd-fan a:nth-child(1){transform:translate(-128%,-44%) rotate(-15deg);z-index:1;}
  .wpsd-fan a:nth-child(2){transform:translate(28%,-44%) rotate(15deg);z-index:2;}
  .wpsd-fan a:nth-child(3){transform:translate(-96%,-49%) rotate(-8deg);z-index:3;}
  .wpsd-fan a:nth-child(4){transform:translate(-4%,-49%) rotate(8deg);z-index:4;}
  .wpsd-fan a:nth-child(5){transform:translate(-50%,-53%) rotate(0);z-index:5;}
  .wpsd-fan:hover a:nth-child(1){transform:translate(-142%,-42%) rotate(-18deg);}
  .wpsd-fan:hover a:nth-child(2){transform:translate(42%,-42%) rotate(18deg);}
  .wpsd-fan:hover a:nth-child(3){transform:translate(-106%,-49%) rotate(-10deg);}
  .wpsd-fan:hover a:nth-child(4){transform:translate(6%,-49%) rotate(10deg);}
  .wpsd-fan:hover a:nth-child(5){transform:translate(-50%,-57%) scale(1.03);}

  /* ───────── Intro + stats ───────── */
  .wpsd-intro{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr);gap:clamp(40px,6vw,90px);align-items:start;}
  .wpsd-stats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;}
  .wpsd-stat{position:relative;overflow:hidden;padding:30px 28px;border-radius:6px 30px 6px 30px;background:#fff;border:1px solid var(--w-border);box-shadow:var(--w-shadow-soft);}
  .wpsd-stat:first-child{background:var(--w-black);border-color:var(--w-black);}
  .wpsd-stat:first-child .wpsd-stat-label{color:rgba(255,255,255,.78);}
  .wpsd-stat-num{margin:0;font-family:Impact,"Arial Black","Arial Narrow",sans-serif;font-size:clamp(40px,4vw,62px);line-height:.95;color:var(--w-red);letter-spacing:-.01em;}
  .wpsd-stat-label{margin:12px 0 0;color:var(--w-ink);font-size:15.5px;line-height:1.55;}
  [data-wpsd-lang="ar"] .wpsd-stat-label{font-size:16px;line-height:1.8;}
  .wpsd-footnote{margin:14px 0 0;color:rgba(86,86,86,.8);font-size:13px;line-height:1.55;font-style:italic;}
  [data-wpsd-lang="ar"] .wpsd-footnote{font-style:normal;}

  /* ───────── Chapter heads ───────── */
  .wpsd-ch-head{display:grid;grid-template-columns:auto minmax(0,1fr);gap:clamp(22px,3.4vw,46px);align-items:baseline;margin-bottom:14px;}
  .wpsd-ch-index{font-family:Impact,"Arial Black","Arial Narrow",sans-serif;font-size:clamp(60px,7vw,110px);line-height:.85;color:transparent;-webkit-text-stroke:2px var(--w-red);}
  .wpsd-dark .wpsd-ch-head .wpsd-display{color:#fff;}
  .wpsd-ch-sub{margin:16px 0 0;font-family:var(--w-display);font-size:clamp(16px,1.6vw,21px);letter-spacing:.08em;text-transform:uppercase;color:var(--w-red);}
  [data-wpsd-lang="ar"] .wpsd-ch-sub{letter-spacing:0;font-weight:700;}

  .wpsd-prose{max-width:880px;margin:52px auto 0;}

  /* ───────── Quote plates ───────── */
  .wpsd-quote{
    position:relative;width:min(100%,920px);margin:56px auto 0!important;padding:clamp(34px,4.4vw,56px) clamp(30px,4.4vw,60px);
    border-radius:6px 40px 6px 40px;background:var(--w-red);color:#fff;box-shadow:0 16px 46px rgba(227,6,19,.22);
  }
  .wpsd-quote:before{content:"“";position:absolute;top:4px;inset-inline-start:clamp(22px,3.6vw,44px);font-family:"Cormorant Garamond",Georgia,serif;font-size:clamp(90px,9vw,150px);line-height:1;color:#fff;opacity:.9;pointer-events:none;}
  [data-wpsd-lang="ar"] .wpsd-quote:before{content:"”";}
  .wpsd-quote p{margin:0;padding-top:clamp(34px,4vw,52px);font-family:var(--w-serif);font-weight:600;font-style:italic;font-size:clamp(24px,2.7vw,38px);line-height:1.25;color:#fff;}
  [data-wpsd-lang="ar"] .wpsd-quote p{font-style:normal;font-size:clamp(21px,2.2vw,31px);line-height:1.8;}
  .wpsd-quote cite{display:block;margin-top:22px;font-family:var(--w-sans);font-size:13px;font-style:normal;font-weight:700;letter-spacing:.09em;line-height:1.5;text-transform:uppercase;color:rgba(255,255,255,.85);}
  [data-wpsd-lang="ar"] .wpsd-quote cite{letter-spacing:0;font-size:15px;}
  .wpsd-quote-light{background:#fff;color:var(--w-black);border:1px solid var(--w-border);box-shadow:var(--w-shadow-soft);}
  .wpsd-quote-light:before{color:var(--w-red);opacity:.85;}
  .wpsd-quote-light p{color:var(--w-black);}
  .wpsd-quote-light cite{color:rgba(16,16,16,.62);}

  /* ───────── Barriers ───────── */
  .wpsd-barriers{width:min(100%,880px);margin:40px auto 0;padding:30px 32px;border-radius:28px;background:var(--w-paper);border:1px solid var(--w-border);}
  .wpsd-barriers-title{margin:0 0 16px;font-family:var(--w-display);font-size:15px;letter-spacing:.08em;text-transform:uppercase;color:var(--w-black);}
  [data-wpsd-lang="ar"] .wpsd-barriers-title{letter-spacing:0;font-size:17px;font-weight:700;}
  .wpsd-barriers ul{display:flex;flex-wrap:wrap;gap:10px;margin:0;padding:0;list-style:none;}
  .wpsd-barriers li{display:inline-flex;align-items:center;gap:9px;margin:0;padding:9px 16px;border-radius:999px;background:#fff;border:1px solid var(--w-border);color:var(--w-black);font-size:15px;font-weight:600;line-height:1.3;}
  .wpsd-barriers li:before{content:"";width:8px;height:8px;border-radius:50%;background:var(--w-red);flex:0 0 8px;}

  /* ───────── Pillars ───────── */
  .wpsd-pillars-wrap{width:min(100%,1040px);margin:70px auto 0;}
  .wpsd-pillars-title{margin:0 0 30px;text-align:center;}
  .wpsd-pillars{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px;}
  .wpsd-pillar{
    position:relative;padding:28px 22px 26px;background:#fff;border:1.5px solid var(--w-red);border-radius:2px;
    box-shadow:6px 6px 0 var(--w-red);transition:transform .25s ease,box-shadow .25s ease;
  }
  .wpsd-pillar:nth-child(odd){transform:rotate(-1.2deg);}
  .wpsd-pillar:nth-child(even){transform:rotate(1.2deg);}
  .wpsd-pillar:hover{transform:rotate(0) translateY(-4px);box-shadow:10px 10px 0 var(--w-red);}
  [data-wpsd-lang="ar"] .wpsd-pillar{box-shadow:-6px 6px 0 var(--w-red);}
  [data-wpsd-lang="ar"] .wpsd-pillar:hover{box-shadow:-10px 10px 0 var(--w-red);}
  .wpsd-pillar svg{width:52px;height:52px;display:block;fill:none;stroke:var(--w-black);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;}
  .wpsd-pillar svg .wpsd-accent{stroke:var(--w-red);}
  .wpsd-pillar h4{margin:18px 0 0;font-family:var(--w-display);font-size:clamp(19px,1.6vw,23px);line-height:1.05;text-transform:uppercase;color:var(--w-red);}
  [data-wpsd-lang="ar"] .wpsd-pillar h4{text-transform:none;line-height:1.5;font-weight:800;}

  /* ───────── Video ───────── */
  .wpsd-video-grid{display:grid;grid-template-columns:minmax(0,440px) minmax(0,1fr);gap:clamp(40px,6vw,96px);align-items:center;}
  .wpsd-video-card{position:relative;width:100%;overflow:hidden;border-radius:30px;background:#000;border:1px solid rgba(255,255,255,.12);box-shadow:0 30px 90px rgba(0,0,0,.45);}
  .wpsd-video-card video{display:block;width:100%;height:auto;max-height:78vh;background:#000;}
  .wpsd-video-card:after{
    content:attr(data-wpsd-play);position:absolute;z-index:3;left:50%;top:50%;transform:translate(-50%,-50%);
    padding:10px 18px;border-radius:999px;background:rgba(0,0,0,.7);color:#fff;font-family:var(--w-sans);font-size:13px;font-weight:700;
    pointer-events:none;transition:opacity .2s ease;
  }
  .wpsd-video-card.is-playing:after{opacity:0;}
  .wpsd-imperatives{margin:34px 0 0;padding:0;list-style:none;}
  .wpsd-imperatives li{margin:0;padding:16px 0;border-top:1px solid rgba(255,255,255,.14);font-family:var(--w-display);font-size:clamp(24px,2.6vw,38px);line-height:1;text-transform:uppercase;color:#fff;}
  .wpsd-imperatives li:last-child{border-bottom:1px solid rgba(255,255,255,.14);}
  .wpsd-imperatives li span{color:var(--w-red);}
  [data-wpsd-lang="ar"] .wpsd-imperatives li{text-transform:none;line-height:1.45;font-weight:800;font-size:clamp(22px,2.2vw,32px);}

  /* ───────── Egypt ───────── */
  .wpsd-eg-grid{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:clamp(40px,6vw,90px);align-items:start;margin-top:52px;}
  .wpsd-areas{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;}
  .wpsd-area{position:relative;padding:26px 24px;border-radius:26px;background:#fff;border:1px solid var(--w-border);}
  .wpsd-area svg{width:38px;height:38px;display:block;fill:none;stroke:var(--w-red);stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round;}
  .wpsd-area h4{margin:16px 0 0;font-family:var(--w-display);font-size:19px;line-height:1.05;text-transform:uppercase;color:var(--w-black);}
  [data-wpsd-lang="ar"] .wpsd-area h4{text-transform:none;line-height:1.5;font-weight:800;}
  .wpsd-area p{margin:8px 0 0;color:var(--w-ink);font-size:14.5px;line-height:1.6;}
  [data-wpsd-lang="ar"] .wpsd-area p{font-size:15px;line-height:1.8;}
  .wpsd-eg-card{margin-top:14px;padding:30px;border-radius:6px 30px 6px 30px;background:var(--w-red);color:#fff;display:flex;align-items:center;gap:22px;}
  .wpsd-eg-card .wpsd-stat-num{color:#fff;font-size:clamp(52px,5vw,78px);}
  .wpsd-eg-card p{margin:0;font-size:16px;line-height:1.55;color:rgba(255,255,255,.92);font-weight:600;}
  [data-wpsd-lang="ar"] .wpsd-eg-card p{line-height:1.8;}

  /* ───────── Lebanon timeline ───────── */
  .wpsd-timeline{position:relative;width:min(100%,1040px);margin:64px auto 0;display:flex;flex-direction:column;gap:clamp(58px,7vw,88px);}
  .wpsd-timeline:before{
    content:"";position:absolute;z-index:0;top:22px;bottom:22px;left:50%;width:2px;transform:translateX(-50%);
    background:linear-gradient(180deg,transparent 0,var(--w-red) 8%,rgba(227,6,19,.28) 92%,transparent 100%);
  }
  .wpsd-step{position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1fr) clamp(84px,8vw,112px) minmax(0,1fr);align-items:center;}
  .wpsd-step:nth-child(odd) .wpsd-step-copy{grid-column:1;grid-row:1;justify-self:end;}
  .wpsd-step:nth-child(odd) .wpsd-step-media{grid-column:3;grid-row:1;}
  .wpsd-step:nth-child(even) .wpsd-step-media{grid-column:1;grid-row:1;justify-self:end;}
  .wpsd-step:nth-child(even) .wpsd-step-copy{grid-column:3;grid-row:1;}
  .wpsd-marker{
    position:absolute;z-index:4;left:50%;top:50%;width:50px;height:50px;transform:translate(-50%,-50%);
    border:1px solid rgba(227,6,19,.18);border-radius:50%;background:#fff url("https://msf-lebanon.org/wp-content/uploads/2022/03/favicon.png") center/30px 30px no-repeat;
    box-shadow:0 9px 24px rgba(0,0,0,.12),0 0 0 7px rgba(255,255,255,.72);
  }
  .wpsd-step-copy{width:100%;max-width:520px;}
  .wpsd-step-copy .wpsd-body{font-size:clamp(18px,1.55vw,21px);}
  .wpsd-step-media{
    position:relative;width:100%;max-width:400px;aspect-ratio:4/5;margin:0!important;overflow:hidden;border-radius:30px;
    border:1px solid var(--w-border);background:var(--w-paper);box-shadow:var(--w-shadow-soft);
    display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:34px;text-align:center;
  }
  .wpsd-step-media svg{width:78%;height:auto;display:block;overflow:visible;}
  .wpsd-step-media figcaption{margin:0;font-family:var(--w-display);font-size:18px;line-height:1.15;text-transform:uppercase;color:var(--w-black);}
  [data-wpsd-lang="ar"] .wpsd-step-media figcaption{text-transform:none;line-height:1.6;font-weight:800;}
  .wpsd-step-media small{display:block;margin-top:6px;font-family:var(--w-sans);font-size:13px;font-weight:500;text-transform:none;color:var(--w-ink);line-height:1.5;}

  /* glucose ring */
  .wpsd-ring-bg{fill:none;stroke:var(--w-border);stroke-width:18;}
  .wpsd-ring-fg{fill:none;stroke:var(--w-red);stroke-width:18;stroke-linecap:round;stroke-dasharray:502.65;stroke-dashoffset:502.65;transform:rotate(-90deg);transform-origin:100px 100px;transition:stroke-dashoffset 1.6s cubic-bezier(.2,.7,.2,1);}
  .is-visible .wpsd-ring-fg{stroke-dashoffset:150.8;}
  .wpsd-ring-text{font-family:Impact,"Arial Black",sans-serif;font-size:44px;fill:var(--w-black);}
  .wpsd-ring-sub{font-family:Inter,Arial,sans-serif;font-size:12px;font-weight:700;fill:var(--w-ink);letter-spacing:.06em;}

  /* thermometer */
  .wpsd-therm-tube{fill:#fff;stroke:var(--w-black);stroke-width:3;}
  .wpsd-therm-merc{fill:var(--w-red);transform-box:fill-box;transform-origin:50% 100%;transform:scaleY(.15);transition:transform 1.8s cubic-bezier(.2,.7,.2,1) .2s;}
  .is-visible .wpsd-therm-merc{transform:scaleY(1);}
  .wpsd-therm-bulb{fill:var(--w-red);}
  .wpsd-therm-tick{stroke:var(--w-black);stroke-width:2;}
  .wpsd-therm-label{font-family:Impact,"Arial Black",sans-serif;font-size:34px;fill:var(--w-red);}
  .wpsd-sun{fill:none;stroke:var(--w-red);stroke-width:3;stroke-linecap:round;}
  .wpsd-sun-core{fill:var(--w-red);opacity:.9;}
  .wpsd-sun-rays{transform-box:fill-box;transform-origin:center;animation:wpsdSpin 18s linear infinite;}
  @keyframes wpsdSpin{to{transform:rotate(360deg);}}

  /* no-fridge */
  .wpsd-line{fill:none;stroke:var(--w-black);stroke-width:3;stroke-linecap:round;stroke-linejoin:round;}
  .wpsd-slash{fill:none;stroke:var(--w-red);stroke-width:6;stroke-linecap:round;}

  .wpsd-highlight{
    width:min(100%,920px);margin:clamp(56px,6vw,80px) auto 0;padding:clamp(32px,4.2vw,50px) clamp(28px,5vw,58px);
    border-radius:28px;background:#fff;border:1px solid var(--w-border);box-shadow:var(--w-shadow-soft);
    border-inline-start:8px solid var(--w-red);
  }
  .wpsd-highlight .wpsd-body:first-child{color:var(--w-black);font-weight:600;}

  /* ───────── Clay pot feature ───────── */
  .wpsd-clay{margin-top:clamp(70px,8vw,110px);display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr);gap:clamp(40px,5vw,80px);align-items:center;}
  .wpsd-clay-art{position:relative;padding:30px;border-radius:34px;background:var(--w-paper-deep);border:1px solid var(--w-border);box-shadow:var(--w-shadow);}
  .wpsd-clay-art svg{display:block;width:100%;height:auto;overflow:visible;}
  .wpsd-pot-outer{fill:var(--w-clay);}
  .wpsd-pot-rim{fill:#d98a5f;}
  .wpsd-pot-sand{fill:#9d978a;}
  .wpsd-pot-inner{fill:var(--w-clay-light);}
  .wpsd-pot-inner-lid{fill:#f0b891;}
  .wpsd-pen-body{fill:#6b7fb8;}
  .wpsd-pen-cap{fill:#d7dbe6;}
  .wpsd-heat{fill:none;stroke:var(--w-red);stroke-width:3;stroke-linecap:round;stroke-dasharray:6 8;animation:wpsdHeat 1.4s linear infinite;}
  @keyframes wpsdHeat{to{stroke-dashoffset:-28;}}
  .wpsd-vapor{fill:none;stroke:#7aa6c9;stroke-width:3;stroke-linecap:round;opacity:0;animation:wpsdVapor 3.6s ease-in-out infinite;}
  @keyframes wpsdVapor{0%{opacity:0;transform:translateY(10px);}30%{opacity:.9;}100%{opacity:0;transform:translateY(-34px);}}
  .wpsd-cool{fill:none;stroke:#7aa6c9;stroke-width:2.5;stroke-linecap:round;opacity:.7;animation:wpsdPulse 3s ease-in-out infinite;}
  @keyframes wpsdPulse{0%,100%{opacity:.25;}50%{opacity:.85;}}
  .wpsd-dot circle{fill:var(--w-black);}
  .wpsd-dot text{fill:#fff;font-family:Inter,Arial,sans-serif;font-size:14px;font-weight:800;text-anchor:middle;dominant-baseline:central;}
  .wpsd-legend{margin:24px 0 0;padding:0;list-style:none;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 18px;}
  .wpsd-legend li{display:flex;align-items:center;gap:10px;margin:0;color:var(--w-black);font-size:14.5px;font-weight:600;line-height:1.35;}
  .wpsd-legend b{width:26px;height:26px;flex:0 0 26px;display:grid;place-items:center;border-radius:50%;background:var(--w-black);color:#fff;font:800 12px/1 Inter,Arial,sans-serif;}
  .wpsd-clay-copy .wpsd-display{margin-bottom:24px;}

  /* ───────── Storage guide + response ───────── */
  .wpsd-guide{margin-top:clamp(64px,7vw,96px);display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;}
  .wpsd-guide-col{padding:clamp(28px,3.4vw,40px);border-radius:30px;}
  .wpsd-guide-do{background:#fff;border:1px solid var(--w-border);box-shadow:var(--w-shadow-soft);}
  .wpsd-guide-dont{background:var(--w-black);color:#fff;}
  .wpsd-guide-col h4{display:flex;align-items:center;gap:12px;margin:0 0 20px;font-family:var(--w-display);font-size:clamp(22px,2vw,28px);line-height:1;text-transform:uppercase;}
  [data-wpsd-lang="ar"] .wpsd-guide-col h4{text-transform:none;line-height:1.4;font-weight:800;}
  .wpsd-guide-col h4 i{width:36px;height:36px;flex:0 0 36px;display:grid;place-items:center;border-radius:50%;background:var(--w-red);color:#fff;font-style:normal;}
  .wpsd-guide-col h4 i svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;}
  .wpsd-guide-col ul{margin:0;padding:0;list-style:none;}
  .wpsd-guide-col li{margin:0;padding:14px 0;border-top:1px solid var(--w-border);font-size:17px;line-height:1.55;color:var(--w-black);}
  .wpsd-guide-dont li{border-top-color:rgba(255,255,255,.14);color:rgba(255,255,255,.9);}
  [data-wpsd-lang="ar"] .wpsd-guide-col li{line-height:1.85;}
  .wpsd-guide-source{grid-column:1/-1;margin:4px 0 0;color:var(--w-ink);font-size:13.5px;font-style:italic;}
  [data-wpsd-lang="ar"] .wpsd-guide-source{font-style:normal;}

  .wpsd-response{margin-top:clamp(56px,6vw,84px);}
  .wpsd-response-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:30px;}
  .wpsd-resp{padding:28px 26px;border-radius:6px 28px 6px 28px;background:var(--w-paper);border:1px solid var(--w-border);}
  .wpsd-resp-n{display:block;font-family:Impact,"Arial Black",sans-serif;font-size:44px;line-height:.9;color:transparent;-webkit-text-stroke:1.5px var(--w-red);}
  .wpsd-resp h4{margin:16px 0 0;font-family:var(--w-display);font-size:20px;line-height:1.05;text-transform:uppercase;color:var(--w-black);}
  [data-wpsd-lang="ar"] .wpsd-resp h4{text-transform:none;line-height:1.5;font-weight:800;}
  .wpsd-resp p{margin:10px 0 0;color:var(--w-ink);font-size:15.5px;line-height:1.6;}
  [data-wpsd-lang="ar"] .wpsd-resp p{line-height:1.85;}

  /* ───────── Carousel ───────── */
  .wpsd-car-head{display:flex;flex-wrap:wrap;gap:24px;align-items:flex-end;justify-content:space-between;margin-bottom:40px;}
  .wpsd-car-head .wpsd-body{max-width:560px;margin-top:18px;}
  .wpsd-car-nav{display:flex;align-items:center;gap:12px;}
  .wpsd-car-btn{width:54px;height:54px;display:grid;place-items:center;padding:0;border:2px solid var(--w-black);border-radius:50%;background:#fff;color:var(--w-black);cursor:pointer;transition:background .2s ease,color .2s ease;}
  .wpsd-car-btn:hover{background:var(--w-black);color:#fff;}
  .wpsd-car-btn svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round;}
  [data-wpsd-lang="ar"] .wpsd-car-btn svg{transform:scaleX(-1);}
  .wpsd-car-count{min-width:62px;text-align:center;font-family:Impact,"Arial Black",sans-serif;font-size:20px;color:var(--w-black);}

  .wpsd-car-track{
    position:relative;display:flex;gap:22px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;
    padding:10px max(56px,calc((100vw - 1280px) / 2)) 34px;scrollbar-width:none;-webkit-overflow-scrolling:touch;
  }
  .wpsd-car-track::-webkit-scrollbar{display:none;}
  .wpsd-slide{
    position:relative;flex:0 0 clamp(270px,30vw,420px);aspect-ratio:4/5;margin:0;padding:0;border:0;overflow:hidden;
    border-radius:24px;background:#efeee7;box-shadow:var(--w-shadow-soft);scroll-snap-align:center;cursor:zoom-in;
    transition:transform .45s cubic-bezier(.2,.7,.2,1),box-shadow .45s ease,opacity .45s ease;opacity:.72;
  }
  .wpsd-slide.is-current{opacity:1;box-shadow:var(--w-shadow);transform:translateY(-6px);}
  .wpsd-slide img{width:100%;height:100%;display:block;object-fit:cover;}
  .wpsd-dots{display:flex;justify-content:center;gap:8px;margin-top:6px;}
  .wpsd-dots button{width:34px;height:5px;padding:0;border:0;border-radius:999px;background:var(--w-border);cursor:pointer;transition:background .2s ease,width .2s ease;}
  .wpsd-dots button.is-active{width:54px;background:var(--w-red);}

  /* missing media placeholder */
  .wpsd-missing{position:relative;}
  .wpsd-missing img{opacity:0;}
  .wpsd-missing:after{
    content:attr(data-wpsd-file);position:absolute;inset:0;display:grid;place-items:center;padding:20px;text-align:center;
    background:repeating-linear-gradient(135deg,#efe9e1 0 14px,#f6f3ee 14px 28px);color:#8a7f73;font:700 13px/1.4 Inter,Arial,sans-serif;
  }

  /* lightbox */
  .wpsd-lightbox{position:fixed!important;inset:0!important;z-index:2147483000!important;display:grid;place-items:center;padding:24px;background:rgba(0,0,0,.88);opacity:0;visibility:hidden;transition:opacity .25s ease,visibility .25s ease;}
  .wpsd-lightbox.is-open{opacity:1;visibility:visible;}
  .wpsd-lightbox img{max-width:min(92vw,760px);max-height:88vh;width:auto;height:auto;border-radius:16px;box-shadow:0 34px 100px rgba(0,0,0,.5);}
  .wpsd-lb-btn{position:absolute;width:48px;height:48px;display:grid;place-items:center;padding:0;border:0;border-radius:50%;background:#fff;color:#101010;cursor:pointer;font:700 24px/1 Arial,sans-serif;}
  .wpsd-lb-btn:hover{background:#e30613;color:#fff;}
  .wpsd-lb-close{top:18px;right:18px;}
  .wpsd-lb-prev{left:18px;top:50%;transform:translateY(-50%);}
  .wpsd-lb-next{right:18px;top:50%;transform:translateY(-50%);}
  html.wpsd-lock,body.wpsd-lock{overflow:hidden!important;}

  /* ───────── Closing ───────── */
  .wpsd-closing{position:relative;text-align:center;overflow:hidden;}
  .wpsd-closing:before{content:"";position:absolute;left:50%;top:50%;width:640px;height:640px;transform:translate(-50%,-50%);border-radius:50%;border:1px solid rgba(227,6,19,.22);pointer-events:none;}
  .wpsd-closing:after{content:"";position:absolute;left:50%;top:50%;width:920px;height:920px;transform:translate(-50%,-50%);border-radius:50%;border:1px solid rgba(255,255,255,.06);pointer-events:none;}
  .wpsd-closing .wpsd-container{position:relative;z-index:2;}
  .wpsd-closing .wpsd-body{max-width:780px;margin:0 auto;}
  .wpsd-closing-quote{max-width:1060px;margin:56px auto 0;font-family:var(--w-serif);font-style:italic;font-weight:600;font-size:clamp(32px,4.6vw,62px);line-height:1.18;color:#fff;}
  .wpsd-closing-quote em{color:var(--w-red);font-style:inherit;}
  [data-wpsd-lang="ar"] .wpsd-closing-quote{font-style:normal;font-size:clamp(28px,3.6vw,50px);line-height:1.65;}
  .wpsd-closing-cite{margin:20px 0 0;font-size:14px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.78);}
  [data-wpsd-lang="ar"] .wpsd-closing-cite{letter-spacing:0;font-size:15px;}
  .wpsd-closing-rule{width:88px;height:6px;margin:40px auto 0;border-radius:999px;background:var(--w-red);}
  .wpsd-believe{margin:40px 0 0;font-family:var(--w-display);font-size:clamp(22px,2.4vw,34px);line-height:1.05;text-transform:uppercase;color:#fff;}
  [data-wpsd-lang="ar"] .wpsd-believe{text-transform:none;line-height:1.6;font-weight:800;}

  .wpsd-notes{padding:44px 0;background:var(--w-paper);}
  .wpsd-notes-inner{max-width:880px;margin:0 auto;}
  .wpsd-notes h5{margin:0 0 8px;font-family:var(--w-display);font-size:14px;letter-spacing:.09em;text-transform:uppercase;color:var(--w-red);}
  [data-wpsd-lang="ar"] .wpsd-notes h5{letter-spacing:0;font-size:16px;font-weight:700;}
  .wpsd-notes p{margin:0;color:var(--w-ink);font-size:14.5px;line-height:1.7;}
  [data-wpsd-lang="ar"] .wpsd-notes p{font-size:15.5px;line-height:1.9;}

  .wpsd-divider{position:relative;height:110px;overflow:hidden;}
  .wpsd-divider svg{position:absolute;inset:0;width:100%;height:100%;}

  .wpsd-ch01-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,clamp(280px,30%,360px));gap:clamp(36px,5vw,72px);align-items:start;margin-top:44px;}
  .wpsd-ch01-copy{min-width:0;}
  .wpsd-ch01-copy > *:first-child{margin-top:0;}
  .wpsd-ch01-copy .wpsd-prose{max-width:none;margin:0;}
  .wpsd-ch01-copy .wpsd-prose + .wpsd-quote,.wpsd-ch01-copy .wpsd-quote + .wpsd-prose,.wpsd-ch01-copy .wpsd-prose + .wpsd-prose{margin-top:34px!important;}
  .wpsd-ch01-copy .wpsd-quote{margin:34px 0 0!important;width:auto;max-width:none;}
  .wpsd-ch01-media{position:sticky;top:110px;align-self:start;}
  .wpsd-ch01-media .wpsd-video-card{border-radius:22px;box-shadow:var(--w-shadow);border:1px solid var(--w-border);background:#000;}
  .wpsd-ch01-media .wpsd-video-card video{display:block;width:100%;height:auto;max-height:calc(100vh - 140px);object-fit:contain;background:#000;}
  @media (max-width:900px){
    .wpsd-ch01-grid{grid-template-columns:minmax(0,1fr);gap:32px;}
    .wpsd-ch01-media{position:static;order:-1;width:min(100%,340px);}
    .wpsd-page.is-ar .wpsd-ch01-media{margin-inline-start:0;}
  }

  .wpsd-reveal{opacity:1;transform:none;transition:opacity .8s ease,transform .8s ease;}
  .wpsd-enhanced .wpsd-reveal:not(.is-visible){opacity:0;transform:translateY(26px);}
  .wpsd-reveal.is-visible{opacity:1;transform:none;}

  @media (max-width:1100px){
    .wpsd-hero-grid,.wpsd-intro,.wpsd-eg-grid,.wpsd-clay{grid-template-columns:minmax(0,1fr);}
    .wpsd-fan{height:440px;max-width:620px;margin:0 auto;width:100%;}
    .wpsd-pillars{grid-template-columns:repeat(2,minmax(0,1fr));gap:26px;}
    .wpsd-video-grid{grid-template-columns:minmax(0,1fr);}
    .wpsd-video-card{max-width:440px;margin:0 auto;}
  }
  @media (max-width:860px){
    .wpsd-timeline:before{left:17px;transform:none;}
    .wpsd-page.is-ar .wpsd-timeline:before{left:auto;right:17px;}
    .wpsd-step{grid-template-columns:minmax(0,1fr)!important;gap:26px;padding-inline-start:58px;}
    .wpsd-step .wpsd-step-copy,.wpsd-step .wpsd-step-media{grid-column:1!important;grid-row:auto!important;justify-self:stretch!important;max-width:none;}
    .wpsd-step .wpsd-step-media{width:min(100%,380px);justify-self:center!important;}
    .wpsd-marker{left:17px;top:24px;width:44px;height:44px;transform:translate(-50%,0);background-size:26px 26px;}
    .wpsd-page.is-ar .wpsd-marker{left:auto;right:17px;transform:translate(50%,0);}
    .wpsd-guide,.wpsd-response-grid{grid-template-columns:minmax(0,1fr);}
  }
  @media (max-width:767px){
    .wpsd-container{width:min(calc(100% - 40px),640px);}
    .wpsd-section{padding:70px 0;}
    .wpsd-hero{min-height:auto;padding:96px 0 60px;}
    .wpsd-fan{height:360px;}
    .wpsd-fan a{width:128px;border-radius:12px;}
    .wpsd-stats,.wpsd-areas{grid-template-columns:minmax(0,1fr);}
    .wpsd-pillars{grid-template-columns:minmax(0,1fr);}
    .wpsd-ch-head{grid-template-columns:1fr;gap:6px;}
    .wpsd-ch-index{font-size:56px;}
    .wpsd-quote{border-radius:4px 26px 4px 26px;}
    .wpsd-legend{grid-template-columns:minmax(0,1fr);}
    .wpsd-car-track{padding:10px 20px 30px;gap:14px;}
    .wpsd-slide{flex-basis:78vw;}
    .wpsd-eg-card{flex-direction:column;align-items:flex-start;}
    .wpsd-divider{height:70px;}
    .wpsd-lb-prev,.wpsd-lb-next{top:auto;bottom:18px;transform:none;}
  }
  @media (prefers-reduced-motion:reduce){
    #wpsd-top *,#wpsd-top *:before,#wpsd-top *:after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important;}
    .wpsd-reveal{opacity:1!important;transform:none!important;}
    .wpsd-car-track{scroll-behavior:auto;}
  }

  .wpsd-hero-solo{max-width:920px;}
  .wpsd-lead{margin:0;color:var(--w-black);font-size:clamp(20px,1.9vw,25px);line-height:1.65;}
  [data-wpsd-lang="ar"] .wpsd-lead{line-height:1.95;}
  .wpsd-stats-2{display:grid;grid-template-columns:minmax(0,1fr);gap:16px;}
  .wpsd-says{display:block;margin:14px 0;font-family:var(--w-sans);font-style:normal;font-size:14px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;line-height:1.5;opacity:.85;}
  [data-wpsd-lang="ar"] .wpsd-says{letter-spacing:0;text-transform:none;font-size:16px;}
  .wpsd-quote p .wpsd-says:first-child{margin-top:0;}
  .wpsd-video-solo{max-width:440px;margin:0 auto;}
  .wpsd-eg-card p{font-size:clamp(20px,1.8vw,24px);}
  .wpsd-areas-plain .wpsd-area{display:flex;align-items:center;gap:16px;}
  .wpsd-areas-plain .wpsd-area h4{margin:0;}
  .wpsd-car-head-nav{justify-content:flex-end;margin-bottom:24px;}
  .wpsd-closing-lead{max-width:780px;margin:56px auto 0;color:rgba(255,255,255,.8);font-size:clamp(17px,1.5vw,19px);line-height:1.7;}
  .wpsd-closing-lead + .wpsd-closing-quote{margin-top:18px;}
  .wpsd-closing h2{color:#fff;margin-bottom:34px;}

  #wpsd-top .wpsd-photo{position:relative;min-width:0;margin:0;isolation:isolate;}
  #wpsd-top .wpsd-photo-frame{position:relative;z-index:1;overflow:hidden;background:var(--w-paper-deep);border-radius:3px;box-shadow:0 20px 48px rgba(0,0,0,.12);}
  #wpsd-top .wpsd-photo img{display:block;width:100%;max-width:100%;height:auto;margin:0;border:0;border-radius:0;}
  #wpsd-top .wpsd-photo:before{content:"";position:absolute;pointer-events:none;z-index:0;}

  #wpsd-top .wpsd-intro-aside{min-width:0;}
  #wpsd-top .wpsd-photo-intro{width:100%;margin:0 0 34px;}
  #wpsd-top .wpsd-photo-intro:before{inset:18px -12px -12px 24px;border:1px solid var(--w-red);border-radius:3px 48px 3px 3px;}
  #wpsd-top .wpsd-photo-intro .wpsd-photo-frame{border-radius:3px 44px 3px 3px;}
  #wpsd-top .wpsd-intro-aside .wpsd-stats-2{grid-template-columns:repeat(2,minmax(0,1fr));}
  #wpsd-top .wpsd-intro-aside .wpsd-stat{padding:26px 20px;}
  #wpsd-top .wpsd-intro-aside .wpsd-stat-num{font-size:clamp(36px,3.6vw,52px);}

  #wpsd-top .wpsd-photo-quote{position:relative;margin:46px 0 38px;}
  #wpsd-top .wpsd-photo-quote .wpsd-photo{width:calc(100% - 42px);margin-inline-start:auto;}
  #wpsd-top .wpsd-photo-quote .wpsd-photo-frame{border-radius:3px 38px 3px 3px;}
  #wpsd-top .wpsd-photo-quote .wpsd-quote{position:relative;z-index:2;width:calc(100% - 48px);margin:-36px 48px 0 0!important;border-radius:3px 3px 3px 30px;}

  #wpsd-top .wpsd-eg-aside .wpsd-photo{margin:0 0 28px;}
  #wpsd-top .wpsd-photo-egypt .wpsd-photo-frame{border-radius:40px 3px 3px 3px;}
  #wpsd-top .wpsd-photo-egypt:before{inset:18px -12px -12px 26px;border:1px solid var(--w-red);}

  #wpsd-top .wpsd-photo-story{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);align-items:center;gap:clamp(28px,4vw,54px);margin:clamp(64px,7vw,96px) auto 0;}
  #wpsd-top .wpsd-photo-lebanon .wpsd-photo-frame{border-radius:3px 3px 44px 3px;}
  #wpsd-top .wpsd-photo-lebanon:before{width:74px;height:5px;inset-inline-start:0;bottom:-18px;background:var(--w-red);}
  #wpsd-top .wpsd-photo-story .wpsd-highlight{width:100%;margin:0;padding:8px 0 8px 28px;border:0;border-inline-start:3px solid var(--w-red);border-radius:0;box-shadow:none;background:transparent;}
  #wpsd-top .wpsd-photo-story .wpsd-body{font-size:clamp(17px,1.45vw,20px);}

  #wpsd-top .wpsd-closing-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(40px,6vw,80px);align-items:center;margin-top:64px;text-align:start;}
  #wpsd-top .wpsd-photo-closing:before{inset:24px 24px -16px -16px;border:1px solid rgba(227,6,19,.75);border-radius:3px 3px 3px 46px;}
  #wpsd-top .wpsd-photo-closing .wpsd-photo-frame{border-radius:3px 3px 3px 40px;box-shadow:0 24px 60px rgba(0,0,0,.3);}
  #wpsd-top .wpsd-closing-copy .wpsd-closing-lead{margin:0;font-size:17px;}
  #wpsd-top .wpsd-closing-copy .wpsd-closing-quote{margin:22px 0 0;font-size:clamp(30px,3.3vw,46px);line-height:1.22;}
  #wpsd-top .wpsd-closing-copy .wpsd-closing-rule{margin:32px 0 0;}
  #wpsd-top .wpsd-closing-copy .wpsd-believe{margin-top:28px;font-size:clamp(22px,2vw,29px);}

  @media (max-width:1100px){
    #wpsd-top .wpsd-photo-intro{width:92%;margin-inline-start:auto;}
    #wpsd-top .wpsd-eg-aside .wpsd-photo{width:88%;margin:0 0 38px auto;}
  }
  @media (max-width:900px){
    #wpsd-top .wpsd-photo-story{grid-template-columns:minmax(0,1fr);gap:44px;max-width:760px;}
    #wpsd-top .wpsd-photo-story .wpsd-photo{width:92%;}
    #wpsd-top .wpsd-photo-story .wpsd-highlight{width:90%;margin-inline-start:auto;}
    #wpsd-top .wpsd-closing-grid{grid-template-columns:minmax(0,1fr);gap:48px;max-width:680px;margin-inline:auto;}
    #wpsd-top .wpsd-photo-closing{width:92%;margin-inline-start:auto;}
  }
  @media (max-width:767px){
    #wpsd-top .wpsd-fan a{width:min(128px,28vw);}
    #wpsd-top .wpsd-photo-intro{width:calc(100% - 8px);margin-inline-start:0;}
    #wpsd-top .wpsd-photo-intro:before{inset:16px -8px -10px 20px;}
    #wpsd-top .wpsd-intro-aside .wpsd-stats-2{grid-template-columns:minmax(0,1fr);}
    #wpsd-top .wpsd-photo-quote{margin-top:34px;}
    #wpsd-top .wpsd-photo-quote .wpsd-photo{width:calc(100% - 14px);}
    #wpsd-top .wpsd-photo-quote .wpsd-quote{width:calc(100% - 12px);margin:-18px 12px 0 0!important;padding:28px 24px;}
    #wpsd-top .wpsd-eg-aside{display:block;}
    #wpsd-top .wpsd-eg-aside .wpsd-photo{width:calc(100% - 8px);margin:0 0 38px;}
    #wpsd-top .wpsd-photo-egypt:before{inset:16px -8px -10px 20px;}
    #wpsd-top .wpsd-photo-story{gap:42px;}
    #wpsd-top .wpsd-photo-story .wpsd-photo{width:100%;}
    #wpsd-top .wpsd-photo-story .wpsd-highlight{width:100%;padding-inline-start:22px;}
    #wpsd-top .wpsd-photo-story .wpsd-body{font-size:18px;}
    #wpsd-top .wpsd-closing-grid{margin-top:42px;}
    #wpsd-top .wpsd-closing-copy .wpsd-closing-quote{font-size:34px;}
  }
`,
        }}
      />

      <div className="wpsd-page" id="wpsd-top" dir="ltr" lang="en">
        <div className="wpsd-lang" data-wpsd-lang="en" lang="en" dir="ltr">
          

          <section className="wpsd-section wpsd-paper">
            <div className="wpsd-container wpsd-intro">
              <div className="wpsd-reveal">
                <p className="wpsd-lead">
                  People living with non-communicable diseases (NCDs) often require continuous,
                  long-term care. However, in humanitarian contexts, conflict, displacement, and
                  other obstacles can disrupt access to healthcare. This complicates chronic disease
                  management and compromises patient safety. In 2025, Doctors Without
                  Borders/Médecins Sans Frontières (MSF) conducted 264,711 medical consultations for
                  patients with hypertension and 219,982 consultations for patients with diabetes
                  worldwide.
                </p>
              </div>
              <div className="wpsd-intro-aside">
                <div className="wpsd-photo wpsd-photo-intro">
                  <div className="wpsd-photo-frame">
                    <img
                      src="https://msf-lebanon.org/wp-content/uploads/2026/09/MSB246809High-scaled.jpg"
                      alt=""
                      width="2560"
                      height="1707"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
                <div className="wpsd-reveal wpsd-stats-2">
                  <div className="wpsd-stat">
                    <p className="wpsd-stat-num wpsd-num" data-wpsd-count="264711">
                      264,711
                    </p>
                    <p className="wpsd-stat-label">
                      medical consultations for patients with hypertension
                    </p>
                  </div>
                  <div className="wpsd-stat">
                    <p className="wpsd-stat-num wpsd-num" data-wpsd-count="219982">
                      219,982
                    </p>
                    <p className="wpsd-stat-label">consultations for patients with diabetes</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="wpsd-section">
            <div className="wpsd-container" id="wpsd-ch01">
              <div className="wpsd-ch-head wpsd-reveal">
                <span className="wpsd-ch-index" aria-hidden="true">
                  01
                </span>
                <div>
                  <h2 className="wpsd-display wpsd-t-xl">
                    What is patient safety and why is it important?
                  </h2>
                </div>
              </div>

              <div className="wpsd-ch01-grid">
                <div className="wpsd-ch01-copy">
                  <div className="wpsd-prose wpsd-reveal">
                    <p className="wpsd-body">
                      Patient safety centres on delivering care in a way that minimises medical
                      errors and reduces avoidable harm. For people living with non-communicable
                      diseases, patient safety also means ensuring care is continuous, regular, and
                      precise, while reducing disruptions to treatment or medication that could lead
                      to severe complications.
                    </p>
                    <p className="wpsd-body">
                      In countries where populations face acute humanitarian crises such as war,
                      displacement, and epidemics, patients often encounter financial hardship
                      alongside transport and security challenges. Weak infrastructure, including
                      frequent power cuts, limited health literacy, and poor access to care, can
                      further impair their ability to stay on treatment.
                    </p>
                  </div>
                  <blockquote className="wpsd-quote wpsd-reveal">
                    <p>
                      &quot;Patient safety is especially important for people with non-communicable
                      diseases because these conditions require long-term, regular and accurate care.
                      Even minor disruptions in treatment can lead to severe complications.&quot;
                    </p>
                    <cite>Belal Hussein Mohamed, MSF nursing team supervisor in Sudan.</cite>
                  </blockquote>
                  <div className="wpsd-prose wpsd-reveal">
                    <p className="wpsd-body">
                      For MSF teams working in difficult, low-resource settings, this means adapting
                      care to local circumstances while keeping patient safety at the heart of care
                      delivery.
                    </p>
                  </div>
                  <div className="wpsd-photo-quote">
                    <div className="wpsd-photo wpsd-photo-care">
                      <div className="wpsd-photo-frame">
                        <img
                          src="https://msf-lebanon.org/wp-content/uploads/2026/09/MSB243713High-scaled.jpg"
                          alt=""
                          width="2560"
                          height="1440"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                    <blockquote className="wpsd-quote wpsd-quote-light wpsd-reveal">
                      <p>
                        &quot;We may not always have the resources we would like, but we can always
                        strive to make the care we provide safer.&quot;
                      </p>
                      <cite>Sarah Cross, MSF quality of care implementer.</cite>
                    </blockquote>
                  </div>
                  <div className="wpsd-prose wpsd-reveal">
                    <p className="wpsd-body">
                      Patient safety challenges are not confined to a single setting. Across diverse
                      humanitarian crisis zones where MSF operates, including those affected by
                      conflict, disease outbreaks, disasters, and limited access to healthcare,
                      teams work to adapt NCD care to the realities patients face. Experiences in
                      Egypt and Lebanon demonstrate how this commitment translates into practical
                      actions and solutions tailored to patients&apos; needs and environment.
                    </p>
                  </div>
                </div>
                <div className="wpsd-ch01-media wpsd-reveal">
                  <div className="wpsd-video-card" data-wpsd-play="Click to watch">
                    <video
                      controls
                      preload="metadata"
                      playsInline
                      aria-label="World Patient Safety Day video"
                      src="https://msf-lebanon.org/wp-content/uploads/2026/09/WPSD-En.mp4"
                    ></video>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="wpsd-section wpsd-paper">
            <div className="wpsd-container">
              <div className="wpsd-ch-head wpsd-reveal">
                <span className="wpsd-ch-index" aria-hidden="true">
                  02
                </span>
                <div>
                  <h2 className="wpsd-display wpsd-t-xl">Patient Safety in Practice: Egypt</h2>
                </div>
              </div>
              <div className="wpsd-eg-grid">
                <div className="wpsd-reveal">
                  <p className="wpsd-body">
                    At a specialised clinic for children living with Type 1 diabetes in Cairo, MSF
                    works in collaboration with the Ibrahim A. Badran Charitable Foundation to
                    integrate patient safety across all stages of care.
                  </p>
                  <p className="wpsd-body">
                    The programme adopts an integrated approach centred on four areas: cold chain
                    and transport, empowerment and education, comprehensive care, and operational
                    safety. This includes measures to safely transport and store insulin, alongside
                    educating patients and their families on managing Type 1 diabetes.
                  </p>
                  <p className="wpsd-body">
                    Medical follow-up is complemented by psychosocial support, while operational
                    safety measures include reviewing medical records and prescriptions, conducting
                    regular audits, and establishing referral pathways.
                  </p>
                  <p className="wpsd-body">
                    Together, these measures embed patient safety across every phase of care, from
                    health education and medical assessment to insulin supply and follow-up.
                  </p>
                </div>
                <div className="wpsd-reveal wpsd-eg-aside">
                  <div className="wpsd-photo wpsd-photo-egypt">
                    <div className="wpsd-photo-frame">
                      <img
                        src="https://msf-lebanon.org/wp-content/uploads/2026/09/DSCF1695-scaled.jpg"
                        alt=""
                        width="2560"
                        height="1707"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                  <div className="wpsd-areas wpsd-areas-plain">
                    <div className="wpsd-area">
                      <svg viewBox="0 0 40 40" aria-hidden="true">
                        <path d="M20 4v32M6 12l28 16M6 28l28-16" />
                        <path d="M16 6l4 3 4-3M16 34l4-3 4 3" />
                      </svg>
                      <h4>cold chain and transport</h4>
                    </div>
                    <div className="wpsd-area">
                      <svg viewBox="0 0 40 40" aria-hidden="true">
                        <path d="M20 10c-4-3-10-4-15-3v24c5-1 11 0 15 3 4-3 10-4 15-3V7c-5-1-11 0-15 3z" />
                        <path d="M20 10v24" />
                      </svg>
                      <h4>empowerment and education</h4>
                    </div>
                    <div className="wpsd-area">
                      <svg viewBox="0 0 40 40" aria-hidden="true">
                        <path d="M20 34S5 25 5 14a8 8 0 0 1 15-4 8 8 0 0 1 15 4c0 11-15 20-15 20z" />
                        <path d="M11 19h6l2-4 3 8 2-4h5" />
                      </svg>
                      <h4>comprehensive care</h4>
                    </div>
                    <div className="wpsd-area">
                      <svg viewBox="0 0 40 40" aria-hidden="true">
                        <path d="M20 4l13 5v10c0 9-6 14-13 17C13 33 7 28 7 19V9z" />
                        <path d="M14 20l4 4 8-8" />
                      </svg>
                      <h4>operational safety</h4>
                    </div>
                  </div>
                  <div className="wpsd-eg-card">
                    <p>More than 200 children benefit from this programme.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="wpsd-section">
            <div className="wpsd-container">
              <div className="wpsd-ch-head wpsd-reveal">
                <span className="wpsd-ch-index" aria-hidden="true">
                  03
                </span>
                <div>
                  <h2 className="wpsd-display wpsd-t-xl">Patient Safety in Practice: Lebanon</h2>
                </div>
              </div>

              <div className="wpsd-timeline">
                <section className="wpsd-step wpsd-reveal">
                  <span className="wpsd-marker" aria-hidden="true"></span>
                  <div className="wpsd-step-copy">
                    <p className="wpsd-body">
                      In Lebanon, MSF has for years provided chronic disease care services in
                      Baalbek-Hermel to the entire population, including both Lebanese residents and
                      Syrian refugees. Among the patients visiting our clinics is a seven-year-old
                      child living with Type 1 diabetes, whose case showed us how home conditions can
                      directly impact treatment.
                    </p>
                    <p className="wpsd-body">
                      During follow-up, the MSF team found that 70 per cent of the child&apos;s
                      glucose readings over a two-week period were above the target level.
                    </p>
                  </div>
                  <figure className="wpsd-step-media" aria-hidden="true">
                    <svg viewBox="0 0 200 200">
                      <circle className="wpsd-ring-bg" cx="100" cy="100" r="80" />
                      <circle className="wpsd-ring-fg" cx="100" cy="100" r="80" />
                      <text
                        className="wpsd-ring-text"
                        x="100"
                        y="104"
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        70%
                      </text>
                    </svg>
                  </figure>
                </section>
                <section className="wpsd-step wpsd-reveal">
                  <span className="wpsd-marker" aria-hidden="true"></span>
                  <div className="wpsd-step-copy">
                    <p className="wpsd-body">
                      The child lived in the Baalbek-Hermel region of eastern Lebanon, where summer
                      temperatures can exceed 40°C, and where power outages and limited resources
                      make it difficult to keep medication at a stable temperature.
                    </p>
                  </div>
                  <figure className="wpsd-step-media" aria-hidden="true">
                    <svg viewBox="0 0 220 240">
                      <g className="wpsd-sun-rays">
                        <path d="M52 8v12M52 84v12M8 52h12M84 52h12M21 21l8 8M75 75l8 8M83 21l-8 8M29 75l-8 8" />
                      </g>
                      <circle className="wpsd-sun-core" cx="52" cy="52" r="20" />
                      <rect className="wpsd-therm-tube" x="126" y="24" width="30" height="170" rx="15" />
                      <rect className="wpsd-therm-merc" x="133" y="44" width="16" height="160" rx="8" />
                      <circle className="wpsd-therm-bulb" cx="141" cy="206" r="26" />
                      <path d="M160 60h12M160 90h8M160 120h12M160 150h8" />
                      <text className="wpsd-therm-label" x="50" y="170" textAnchor="middle">
                        40°C
                      </text>
                    </svg>
                  </figure>
                </section>
                <section className="wpsd-step wpsd-reveal">
                  <span className="wpsd-marker" aria-hidden="true"></span>
                  <div className="wpsd-step-copy">
                    <p className="wpsd-body">
                      Upon further investigation, it became clear that the family did not have a
                      fridge to store insulin, leaving it exposed to high temperatures. The
                      appearance of the insulin had also changed, raising concerns about its
                      effectiveness.
                    </p>
                  </div>
                  <figure className="wpsd-step-media" aria-hidden="true">
                    <svg viewBox="0 0 200 220">
                      <rect className="wpsd-line" x="50" y="20" width="100" height="180" rx="8" />
                      <path d="M50 80h100M66 44v18M66 100v30" />
                      <path className="wpsd-slash" d="M22 206L178 14" />
                    </svg>
                  </figure>
                </section>
              </div>

              <div className="wpsd-photo-story">
                <div className="wpsd-photo wpsd-photo-lebanon">
                  <div className="wpsd-photo-frame">
                    <img
                      src="https://msf-lebanon.org/wp-content/uploads/2026/09/MSF361506High-scaled.jpg"
                      alt=""
                      width="2560"
                      height="1920"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
                <div className="wpsd-highlight wpsd-reveal">
                  <p className="wpsd-body">
                    This case highlights a fundamental aspect of patient safety: safe care for people
                    living with chronic diseases is not limited to what they receive in a healthcare
                    facility; it extends to how safely they can manage their treatment at home.
                  </p>
                  <p className="wpsd-body">
                    Access to medication is only one part of safe treatment; patients also need
                    information and practical solutions that enable them to manage their care safely
                    at home.
                  </p>
                </div>
              </div>

              <div className="wpsd-clay">
                <div className="wpsd-clay-art wpsd-reveal">
                  <svg viewBox="0 0 400 400" role="img" aria-hidden="true">
                    <g className="wpsd-sun-rays">
                      <path d="M44 6v10M44 72v10M6 44h10M72 44h10M17 17l7 7M64 64l7 7M71 17l-7 7M24 64l-7 7" />
                    </g>
                    <circle className="wpsd-sun-core" cx="44" cy="44" r="16" />
                    <path className="wpsd-heat" d="M78 70 Q110 90 118 120" />
                    <path className="wpsd-heat" d="M60 96 Q80 150 84 196" />
                    <path className="wpsd-vapor" d="M300 150 q8 -10 0 -20 q-8 -10 0 -20" />
                    <path
                      className="wpsd-vapor"
                      style={{ animationDelay: '1.2s' }}
                      d="M322 200 q8 -10 0 -20 q-8 -10 0 -20"
                    />
                    <path
                      className="wpsd-vapor"
                      style={{ animationDelay: '2.4s' }}
                      d="M312 250 q8 -10 0 -20 q-8 -10 0 -20"
                    />
                    <path
                      className="wpsd-vapor"
                      style={{ animationDelay: '.6s' }}
                      d="M96 250 q-8 -10 0 -20 q8 -10 0 -20"
                    />
                    <path
                      className="wpsd-vapor"
                      style={{ animationDelay: '1.8s' }}
                      d="M88 300 q-8 -10 0 -20 q8 -10 0 -20"
                    />
                    <ellipse cx="200" cy="360" rx="120" ry="14" fill="rgba(0,0,0,.12)" />
                    <path
                      className="wpsd-pot-outer"
                      d="M118 124 Q86 174 94 262 Q104 346 200 354 Q296 346 306 262 Q314 174 282 124 Z"
                    />
                    <path
                      className="wpsd-pot-sand"
                      d="M130 142 Q106 184 114 260 Q124 330 200 336 Q276 330 286 260 Q294 184 270 142 Z"
                    />
                    <path
                      className="wpsd-pot-inner"
                      d="M156 156 Q140 196 146 254 Q154 308 200 312 Q246 308 254 254 Q260 196 244 156 Z"
                    />
                    <ellipse className="wpsd-pot-inner-lid" cx="200" cy="154" rx="52" ry="10" />
                    <path className="wpsd-cool" d="M170 290 q30 12 60 0" />
                    <path
                      className="wpsd-cool"
                      style={{ animationDelay: '1s' }}
                      d="M164 200 q36 -10 72 0"
                    />
                    <g transform="rotate(-18 196 240)">
                      <rect className="wpsd-pen-body" x="188" y="196" width="16" height="84" rx="5" />
                      <rect className="wpsd-pen-cap" x="188" y="180" width="16" height="22" rx="4" />
                    </g>
                    <ellipse className="wpsd-pot-rim" cx="200" cy="120" rx="112" ry="20" />
                    <rect className="wpsd-pot-rim" x="186" y="90" width="28" height="22" rx="5" />
                  </svg>
                </div>
                <div className="wpsd-clay-copy wpsd-reveal">
                  <p className="wpsd-body">
                    In response, MSF introduced clay jugs as an alternative storage solution for
                    patients without access to refrigerators. These jugs rely on the principle of
                    evaporative cooling: water slowly evaporates through the porous clay, helping
                    lower the internal temperature without requiring electricity or specialized
                    equipment. This method builds on a familiar, long-standing household practice in
                    the region, making it a solution that patients and carers understand and trust,
                    thereby encouraging regular and correct use at home.
                  </p>
                </div>
              </div>

              <div className="wpsd-prose wpsd-reveal" style={{ marginTop: '64px' }}>
                <p className="wpsd-body">
                  MSF guidelines on emergency insulin storage also advise keeping it in a cool place
                  away from direct sunlight. When a clay jug is available, insulin can be placed
                  inside to help keep it cool. It can also be wrapped in cloth to insulate it from
                  extreme temperatures. Insulin should never be placed directly in water or allowed
                  to freeze.
                </p>
                <p className="wpsd-body">
                  The response also included staff briefings and patient education. Patients were
                  advised to contact the clinic if their insulin was exposed to excessive heat or
                  showed abnormal changes, while follow-up involved monitoring blood glucose levels
                  and ensuring storage conditions had improved.
                </p>
              </div>
            </div>
          </section>

          <section className="wpsd-section wpsd-paper" id="wpsd-carousel-en">
            <div className="wpsd-container wpsd-car-head wpsd-car-head-nav">
              <div className="wpsd-car-nav">
                <button
                  className="wpsd-car-btn"
                  type="button"
                  data-wpsd-car="prev"
                  aria-label="Previous post"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M15 5l-7 7 7 7" />
                  </svg>
                </button>
                <span className="wpsd-car-count wpsd-num" aria-live="polite">
                  1 / 5
                </span>
                <button
                  className="wpsd-car-btn"
                  type="button"
                  data-wpsd-car="next"
                  aria-label="Next post"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="wpsd-carousel wpsd-reveal">
              <div
                className="wpsd-car-track"
                tabIndex={0}
                aria-label="World Patient Safety Day posts"
              >
                <button className="wpsd-slide" type="button">
                  <img
                    data-wpsd-file="1.png"
                    src="https://msf-lebanon.org/wp-content/uploads/2026/09/1.png"
                    alt="What is safe care for non-communicable diseases (NCDs)?"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
                <button className="wpsd-slide" type="button">
                  <img
                    data-wpsd-file="2.png"
                    src="https://msf-lebanon.org/wp-content/uploads/2026/09/2.png"
                    alt="People with NCDs such as diabetic patients need continuous treatment and follow-up."
                    loading="lazy"
                    decoding="async"
                  />
                </button>
                <button className="wpsd-slide" type="button">
                  <img
                    data-wpsd-file="3.png"
                    src="https://msf-lebanon.org/wp-content/uploads/2026/09/3.png"
                    alt="Patient safety means ensuring that treatment is available when needed, prescribed and used correctly, stored safely, supported by proper follow-up."
                    loading="lazy"
                    decoding="async"
                  />
                </button>
                <button className="wpsd-slide" type="button">
                  <img
                    data-wpsd-file="4.png"
                    src="https://msf-lebanon.org/wp-content/uploads/2026/09/4-1.png"
                    alt="A clay pot cooling system helps protect insulin from excessive heat."
                    loading="lazy"
                    decoding="async"
                  />
                </button>
                <button className="wpsd-slide" type="button">
                  <img
                    data-wpsd-file="5.png"
                    src="https://msf-lebanon.org/wp-content/uploads/2026/09/5.png"
                    alt="Patient safety cannot wait for a crisis to end."
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              </div>
              <div className="wpsd-dots" role="group" aria-label="World Patient Safety Day posts"></div>
            </div>
          </section>

          <section className="wpsd-section wpsd-dark wpsd-closing">
            <div className="wpsd-container">
              <h2 className="wpsd-display wpsd-t-md wpsd-reveal">Safe Care in All Circumstances</h2>
              <p className="wpsd-body wpsd-reveal">
                The experiences in Egypt and Lebanon illustrate how patient safety measures can be
                adapted to varying conditions: from embedding safety across all stages of diabetes
                care in Egypt to finding a practical insulin storage solution in Lebanon.
              </p>
              <div className="wpsd-closing-grid">
                <div className="wpsd-photo wpsd-photo-closing">
                  <div className="wpsd-photo-frame">
                    <img
                      src="https://msf-lebanon.org/wp-content/uploads/2026/09/DSCF1639-scaled.jpg"
                      alt=""
                      width="2560"
                      height="1707"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
                <div className="wpsd-closing-copy">
                  <p className="wpsd-closing-lead wpsd-reveal">
                    As Haruna Yohanna, MSF nursing team supervisor for noma disease, puts it:
                  </p>
                  <p className="wpsd-closing-quote wpsd-reveal">
                    &quot;Patient safety is not an extra responsibility. It is{' '}
                    <em>the foundation of quality care.</em>&quot;
                  </p>
                  <div className="wpsd-closing-rule wpsd-reveal" aria-hidden="true"></div>
                  <p className="wpsd-believe wpsd-reveal">
                    At MSF, we believe in safe care in all circumstances.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div
          className="wpsd-lightbox"
          id="wpsd-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Post viewer"
          aria-hidden="true"
        >
          <button
            className="wpsd-lb-btn wpsd-lb-close"
            type="button"
            data-wpsd-lb="close"
            aria-label="Close"
          >
            &times;
          </button>
          <button
            className="wpsd-lb-btn wpsd-lb-prev"
            type="button"
            data-wpsd-lb="prev"
            aria-label="Previous"
          >
            &#8249;
          </button>
          <img alt="" />
          <button
            className="wpsd-lb-btn wpsd-lb-next"
            type="button"
            data-wpsd-lb="next"
            aria-label="Next"
          >
            &#8250;
          </button>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
