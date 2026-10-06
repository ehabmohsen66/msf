'use client';

import { useEffect, useRef } from 'react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';

export default function InsulinAccessPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If the modal was left open or body classes were altered on unmount, clean up
    return () => {
      document.body.classList.remove('msf-modal-open');
      // Remove any teleported modals attached to body
      const teleported = document.querySelectorAll('body > .msf-modal');
      teleported.forEach((el) => el.remove());
    };
  }, []);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const openButtons = root.querySelectorAll<HTMLElement>('[data-msf-open]');
    const closeButtons = document.querySelectorAll<HTMLElement>('[data-msf-close]');
    const modals = document.querySelectorAll<HTMLElement>('.msf-modal');
    const revealItems = root.querySelectorAll<HTMLElement>('.msf-reveal');

    let lastTrigger: HTMLElement | null = null;

    // Move overlays out of container into document.body
    modals.forEach((modal) => {
      if (modal.parentNode !== document.body) {
        document.body.appendChild(modal);
      }
    });

    function getFocusable(modal: HTMLElement) {
      return Array.from(
        modal.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'
        )
      );
    }

    function openModal(id: string, trigger?: HTMLElement) {
      const modal = document.getElementById(id);
      if (!modal) return;
      lastTrigger = trigger || null;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('msf-modal-open');
      const focusable = getFocusable(modal);
      if (focusable.length) focusable[0].focus();
    }

    function closeModal(modal?: HTMLElement | null) {
      if (!modal) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('msf-modal-open');
      if (lastTrigger) lastTrigger.focus();
    }

    const openHandlers: Array<{ el: HTMLElement; fn: () => void }> = [];
    openButtons.forEach((button) => {
      const fn = () => {
        const targetId = button.getAttribute('data-msf-open');
        if (targetId) openModal(targetId, button);
      };
      button.addEventListener('click', fn);
      openHandlers.push({ el: button, fn });
    });

    const closeHandlers: Array<{ el: HTMLElement; fn: () => void }> = [];
    closeButtons.forEach((button) => {
      const fn = () => {
        closeModal(button.closest<HTMLElement>('.msf-modal'));
      };
      button.addEventListener('click', fn);
      closeHandlers.push({ el: button, fn });
    });

    const modalClickHandlers: Array<{ el: HTMLElement; fn: (e: MouseEvent) => void }> = [];
    const modalKeyHandlers: Array<{ el: HTMLElement; fn: (e: KeyboardEvent) => void }> = [];

    modals.forEach((modal) => {
      const clickFn = (event: MouseEvent) => {
        if (event.target === modal) closeModal(modal);
      };
      modal.addEventListener('mousedown', clickFn);
      modalClickHandlers.push({ el: modal, fn: clickFn });

      const keyFn = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          closeModal(modal);
          return;
        }
        if (event.key !== 'Tab') return;
        const focusable = getFocusable(modal);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      };
      modal.addEventListener('keydown', keyFn);
      modalKeyHandlers.push({ el: modal, fn: keyFn });
    });

    revealItems.forEach((item) => {
      item.classList.add('is-visible');
    });

    return () => {
      openHandlers.forEach(({ el, fn }) => el.removeEventListener('click', fn));
      closeHandlers.forEach(({ el, fn }) => el.removeEventListener('click', fn));
      modalClickHandlers.forEach(({ el, fn }) => el.removeEventListener('mousedown', fn));
      modalKeyHandlers.forEach(({ el, fn }) => el.removeEventListener('keydown', fn));
    };
  }, []);

  return (
    <div ref={containerRef} className="msf-insulin-page-wrapper">
      <SiteHeader />
      <style
        dangerouslySetInnerHTML={{
          __html: `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  :root {
    --msf-red:#e30613;
    --msf-red-dark:#b8040f;
    --msf-black:#111;
    --msf-text:#5f5f5f;
    --msf-soft:#f7f5f2;
    --msf-border:#e7dfd8;
    --msf-white:#fff;
    --msf-shadow:0 28px 90px rgba(0,0,0,.12);
    --msf-shadow-soft:0 18px 56px rgba(0,0,0,.075);
  }

  html{scroll-behavior:smooth;}
  body.msf-modal-open{overflow:hidden!important;}

  .msf-page,.msf-page *,.msf-modal,.msf-modal *{box-sizing:border-box;}
  .msf-page{width:100%;overflow:hidden;background:#fff;color:var(--msf-black);font-family:Inter,Helvetica,Arial,sans-serif;isolation:isolate;}
  .msf-page a,.msf-page button,.msf-modal a,.msf-modal button{cursor:pointer;}
  .msf-container{width:min(1320px,calc(100% - 72px));margin:0 auto;}
  .msf-section{position:relative;padding:108px 0;}
  .msf-soft{background:var(--msf-soft);}
  .msf-dark{background:var(--msf-black);color:#fff;}

  .msf-heading,.msf-title-xl,.msf-title-lg,.msf-title-md,.msf-card-title,.msf-modal-title{
    margin:0;
    font-family:Impact,"Arial Black","Arial Narrow",sans-serif;
    font-weight:900;
    text-transform:uppercase;
    letter-spacing:-.026em;
    color:var(--msf-black);
  }
  .msf-title-xl{font-size:clamp(64px,9vw,142px);line-height:.86;}
  .msf-title-lg{font-size:clamp(50px,6.5vw,104px);line-height:.91;}
  .msf-title-md{font-size:clamp(39px,4.8vw,78px);line-height:.94;}
  .msf-card-title{font-size:clamp(28px,2.8vw,42px);line-height:1;}

  .msf-kicker{display:inline-flex;align-items:center;gap:10px;margin:0 0 22px;font-family:Impact,"Arial Black","Arial Narrow",sans-serif;font-size:16px;line-height:1;text-transform:uppercase;letter-spacing:.04em;color:var(--msf-red);}
  .msf-kicker:before{content:"";width:22px;height:5px;flex:0 0 22px;border-radius:999px;background:var(--msf-red);transform:rotate(-18deg);}
  .msf-body,.msf-body-lg{margin:0;color:var(--msf-text);font-size:19px;line-height:1.72;}
  .msf-body-lg{font-size:clamp(21px,2vw,27px);line-height:1.58;}
  .msf-white-text,.msf-white-text *:not(a):not(button){color:#fff;}
  .msf-white-text .msf-body,.msf-white-text .msf-body-lg{color:rgba(255,255,255,.79);}

  .msf-btn-row{display:flex;flex-wrap:wrap;gap:14px;margin-top:34px;}
  .msf-btn{position:relative;overflow:hidden;display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:56px;max-width:100%;padding:15px 24px;border:1px solid transparent;border-radius:999px;background:transparent;font-family:Impact,"Arial Black","Arial Narrow",sans-serif;font-size:15px;line-height:1.25;letter-spacing:.025em;text-transform:uppercase;text-align:center;text-decoration:none!important;transition:transform .24s ease,background .24s ease,color .24s ease,border-color .24s ease,box-shadow .24s ease;}
  .msf-btn:hover{transform:translateY(-3px);}
  .msf-btn:focus-visible{outline:3px solid rgba(227,6,19,.28);outline-offset:4px;}
  .msf-btn-red{color:#fff!important;background:var(--msf-red);box-shadow:0 18px 50px rgba(227,6,19,.25);}
  .msf-btn-red:hover{background:var(--msf-red-dark);}
  .msf-btn-dark{color:#fff!important;background:var(--msf-black);box-shadow:0 14px 38px rgba(0,0,0,.17);}
  .msf-btn-outline{color:var(--msf-black)!important;background:#fff;border-color:#d8d2cd;}
  .msf-btn svg{width:18px;height:18px;flex:0 0 18px;fill:none;stroke:currentColor;stroke-width:2.35;stroke-linecap:round;stroke-linejoin:round;}

  .msf-reveal,.msf-reveal.is-visible{opacity:1!important;visibility:visible!important;transform:none!important;transition:none!important;}
  .msf-delay-1{transition-delay:.08s;}
  .msf-delay-2{transition-delay:.16s;}

  /* Hero */
  .msf-hero{position:relative;min-height:88vh;display:flex;align-items:center;padding:94px 0;background:radial-gradient(circle at 87% 14%,rgba(227,6,19,.15),transparent 310px),linear-gradient(135deg,#fff 0%,#fff 54%,#f7f3ef 100%);}
  .msf-hero:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(17,17,17,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,17,.045) 1px,transparent 1px);background-size:58px 58px;mask-image:radial-gradient(circle at 74% 40%,#000 0%,transparent 60%);pointer-events:none;}
  .msf-hero-grid{position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1fr) minmax(390px,.72fr);gap:clamp(44px,6vw,92px);align-items:center;}
  .msf-hero-copy{max-width:850px;}
  .msf-hero-copy .msf-body-lg{margin-top:30px;}
  .msf-photo-card{position:relative;overflow:hidden;min-height:610px;border-radius:36px;background:#1a1a1a;box-shadow:0 36px 112px rgba(0,0,0,.23);}
  .msf-photo-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:18% center!important;}
  .msf-photo-card:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.04) 32%,rgba(0,0,0,.82) 100%),linear-gradient(90deg,rgba(227,6,19,.15),transparent 45%);}
  .msf-photo-credit{position:absolute;z-index:2;left:28px;right:28px;bottom:26px;margin:0;color:rgba(255,255,255,.9);font-size:13px;line-height:1.5;}
  .msf-ticker{overflow:hidden;display:flex;align-items:center;justify-content:center;min-height:62px;background:var(--msf-red);color:#fff;white-space:nowrap;}
  .msf-ticker-track{display:flex;align-items:center;gap:28px;width:max-content;min-height:62px;animation:msfTicker 24s linear infinite;}
  .msf-ticker span{display:flex;align-items:center;min-height:62px;padding-top:5px;font-family:Impact,"Arial Black","Arial Narrow",sans-serif;text-transform:uppercase;letter-spacing:.04em;font-size:18px;line-height:1;}
  .msf-ticker i{width:8px;height:8px;border-radius:50%;background:#fff;}
  @keyframes msfTicker{from{transform:translateX(0);}to{transform:translateX(-50%);}}

  /* Cards and page sections */
  .msf-section-head{display:grid;grid-template-columns:minmax(0,.9fr) minmax(300px,.62fr);gap:50px;align-items:center;margin-bottom:46px;}

  .msf-actions-art{
    position:relative;
    width:min(430px,100%);
    justify-self:end;
    padding:12px;
    border-radius:38px;
    filter:drop-shadow(0 22px 38px rgba(17,17,17,.08));
  }
  .msf-actions-art svg{display:block;width:100%;height:auto;overflow:visible;}
  .msf-actions-art .msf-art-orbit{fill:none;stroke:#d9d2cc;stroke-width:2;stroke-dasharray:5 10;}
  .msf-actions-art .msf-art-route{fill:none;stroke:#111;stroke-width:7;stroke-linecap:round;stroke-linejoin:round;}
  .msf-actions-art .msf-art-route-red{fill:none;stroke:var(--msf-red);stroke-width:7;stroke-linecap:round;stroke-linejoin:round;}
  .msf-actions-art .msf-art-panel{fill:#fff;stroke:#e7dfd8;stroke-width:2;}
  .msf-actions-art .msf-art-panel-dark{fill:#111;}
  .msf-actions-art .msf-art-red{fill:var(--msf-red);}
  .msf-actions-art .msf-art-black{fill:#111;}
  .msf-actions-art .msf-art-white-stroke{fill:none;stroke:#fff;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;}
  .msf-actions-art .msf-art-black-stroke{fill:none;stroke:#111;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;}
  .msf-actions-art .msf-art-red-stroke{fill:none;stroke:var(--msf-red);stroke-width:6;stroke-linecap:round;stroke-linejoin:round;}
  .msf-actions-art .msf-art-soft{fill:#f0ece8;}
  .msf-actions-art .msf-art-float{animation:msfArtFloat 5.5s ease-in-out infinite;transform-origin:center;}
  .msf-actions-art .msf-art-float-2{animation-delay:-2.7s;}
  @keyframes msfArtFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
  .msf-card-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:20px;align-items:stretch;}
  .msf-card{position:relative;overflow:hidden;min-height:465px;display:flex;flex-direction:column;gap:20px;padding:31px;border:1px solid var(--msf-border);border-radius:31px;background:#fff;box-shadow:var(--msf-shadow-soft);transition:transform .28s ease,border-color .28s ease,box-shadow .28s ease;}
  .msf-card:before{content:"";position:absolute;inset:0 0 auto;height:5px;background:var(--msf-red);transform:scaleX(0);transform-origin:left;transition:transform .32s ease;}
  .msf-card:hover{transform:translateY(-7px);border-color:rgba(227,6,19,.3);box-shadow:0 34px 96px rgba(0,0,0,.12);}
  .msf-card:hover:before{transform:scaleX(1);}
  .msf-card-dark{color:#fff;background:var(--msf-black);border-color:var(--msf-black);}
  .msf-card-dark .msf-card-title,.msf-card-dark .msf-card-number{color:#fff;}
  .msf-card-dark .msf-body{color:rgba(255,255,255,.76);}
  .msf-card-number{color:var(--msf-red);font-family:Impact,"Arial Black","Arial Narrow",sans-serif;font-size:31px;line-height:1;}
  .msf-card-actions{margin-top:auto;padding-top:8px;}
  .msf-editor-label{margin:0 0 14px;color:inherit;font-size:18px;line-height:1.55;font-style:italic;opacity:.92;}
  .msf-note{display:inline-flex;align-items:flex-start;gap:8px;margin:13px 0 0;color:inherit;font-size:13px;line-height:1.45;font-weight:600;opacity:.82;}
  .msf-note:before{content:"🔒";flex:0 0 auto;font-size:13px;}

  .msf-photo-strip{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(320px,.65fr);gap:20px;align-items:stretch;}
  .msf-photo-strip-image{position:relative;overflow:hidden;min-height:460px;border-radius:34px;box-shadow:var(--msf-shadow);}
  .msf-photo-strip-image img{width:100%;height:100%;min-height:460px;display:block;object-fit:cover;object-position:90% center!important;}
  .msf-photo-strip-copy{display:flex;flex-direction:column;justify-content:center;padding:clamp(34px,5vw,58px);border-radius:34px;background:var(--msf-red);color:#fff;box-shadow:var(--msf-shadow-soft);}
  .msf-photo-strip-copy .msf-title-md{color:#fff;}
  .msf-photo-strip-copy .msf-body{margin-top:24px;color:rgba(255,255,255,.84);}

  .msf-access-grid{display:grid;grid-template-columns:minmax(0,.84fr) minmax(0,1.16fr);gap:clamp(44px,7vw,100px);align-items:start;}
  .msf-access-card{position:relative;overflow:hidden;padding:clamp(34px,5vw,58px);border-radius:34px;border:1px solid var(--msf-border);background:#fff;box-shadow:var(--msf-shadow-soft);}
  .msf-access-card:after{content:"";position:absolute;right:-90px;bottom:-90px;width:230px;height:230px;border-radius:50%;border:1px solid rgba(227,6,19,.15);pointer-events:none;}
  .msf-access-card-dark{color:#fff;background:var(--msf-black);border-color:var(--msf-black);box-shadow:var(--msf-shadow);}
  .msf-access-card-dark .msf-body,.msf-access-card-dark .msf-body-lg{color:rgba(255,255,255,.79);}
  .msf-access-card .msf-btn{margin-top:30px;}

  .msf-privacy-grid{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:clamp(44px,6vw,92px);align-items:start;}
  .msf-privacy-title{position:sticky;top:28px;overflow:hidden;padding:clamp(35px,4vw,48px);border-radius:34px;background:var(--msf-black);color:#fff;box-shadow:var(--msf-shadow);}
  .msf-privacy-title .msf-title-md{max-width:100%;color:#fff;font-size:clamp(40px,2.8vw,50px);line-height:.96;letter-spacing:-.035em;overflow-wrap:normal;word-break:normal;}
  .msf-privacy-stack{display:grid;gap:18px;}
  .msf-privacy-item{display:grid;grid-template-columns:50px 1fr;gap:18px;align-items:start;padding:29px;border:1px solid var(--msf-border);border-radius:28px;background:#fff;box-shadow:var(--msf-shadow-soft);}
  .msf-check{width:50px;height:50px;display:grid;place-items:center;border-radius:16px;background:var(--msf-red);color:#fff;}
  .msf-check svg{width:27px;height:27px;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;}
  .msf-contact{position:relative;overflow:hidden;padding:clamp(45px,7vw,78px);border:1px solid var(--msf-border);border-radius:38px;background:radial-gradient(circle at 86% 18%,rgba(227,6,19,.14),transparent 300px),var(--msf-soft);text-align:center;box-shadow:var(--msf-shadow-soft);}
  .msf-contact .msf-body-lg{margin-top:22px;}
  .msf-contact .msf-btn{margin-top:25px;}

  /* Premium editorial section artwork */
  .msf-editorial-art{
    position:relative;
    width:min(330px,100%);
    margin-top:34px;
    isolation:isolate;
  }
  .msf-editorial-art:before{
    content:"";
    position:absolute;
    z-index:-1;
    inset:20px -14px -14px 20px;
    border-radius:42px;
    background:rgba(227,6,19,.18);
    transform:rotate(4deg);
  }
  .msf-editorial-art svg{
    display:block;
    width:100%;
    height:auto;
    overflow:visible;
    filter:drop-shadow(0 24px 42px rgba(0,0,0,.16));
  }
  .msf-editorial-art--dark:before{background:rgba(255,255,255,.12);}

  .msf-contact-premium{
    display:grid;
    grid-template-columns:minmax(0,1fr) minmax(260px,.55fr);
    gap:clamp(34px,6vw,82px);
    align-items:center;
    text-align:left;
  }
  .msf-contact-copy{position:relative;z-index:2;}
  .msf-contact-question{
    position:relative;
    width:min(330px,100%);
    justify-self:end;
  }
  .msf-contact-question:before{
    content:"";
    position:absolute;
    inset:18% 8% 2% 15%;
    border-radius:50%;
    background:rgba(227,6,19,.1);
    filter:blur(1px);
    transform:rotate(-10deg);
  }
  .msf-contact-question svg{
    position:relative;
    display:block;
    width:100%;
    height:auto;
    filter:drop-shadow(0 25px 40px rgba(0,0,0,.12));
  }

  /* Modals */
  .msf-modal{position:fixed!important;z-index:2147483647!important;inset:0!important;display:none;align-items:center;justify-content:center;padding:22px;background:rgba(0,0,0,.82);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);font-family:Inter,Helvetica,Arial,sans-serif;isolation:isolate;transform:none!important;}
  .msf-modal.is-open{display:flex!important;visibility:visible!important;opacity:1!important;}
  .msf-modal-panel{position:relative!important;z-index:2!important;width:min(1180px,95%);max-height:calc(100dvh - 44px);overflow:auto;overscroll-behavior:contain;border-radius:30px;background:#fff;box-shadow:0 38px 140px rgba(0,0,0,.46);transform:none!important;}
  .msf-modal-header{position:sticky;z-index:5;top:0;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:20px;align-items:start;padding:28px 30px;border-bottom:1px solid var(--msf-border);background:rgba(255,255,255,.97);backdrop-filter:blur(12px);}
  .msf-modal-title{font-size:clamp(33px,4vw,58px);line-height:.98;color:var(--msf-black);}
  .msf-modal-subtitle{margin:10px 0 0;color:var(--msf-text);font-size:17px;line-height:1.5;}
  .msf-modal-close{position:relative;width:52px;height:52px;min-width:52px;min-height:52px;display:flex;align-items:center;justify-content:center;padding:0;border:0;border-radius:50%;background:#111;color:transparent;font-size:0;line-height:1;}
  .msf-modal-close:before,.msf-modal-close:after{content:"";position:absolute;width:20px;height:2px;border-radius:5px;background:#fff;}
  .msf-modal-close:before{transform:rotate(45deg);}
  .msf-modal-close:after{transform:rotate(-45deg);}
  .msf-modal-close:hover{background:var(--msf-red);}
  .msf-modal-body{padding:30px;background:var(--msf-soft);}

  .msf-directory-note{margin:0 0 24px;padding:22px 24px;border-left:5px solid var(--msf-red);border-radius:0 18px 18px 0;background:#fff;color:var(--msf-text);font-size:16px;line-height:1.65;font-style:italic;box-shadow:var(--msf-shadow-soft);}
  .msf-directory-grid,.msf-community-list{display:grid;gap:18px;}
  .msf-directory-grid{grid-template-columns:repeat(2,minmax(0,1fr));}
  .msf-modal-card{overflow:hidden;border:1px solid var(--msf-border);border-radius:24px;background:#fff;box-shadow:var(--msf-shadow-soft);}
  .msf-modal-card h3{margin:0;padding:22px 24px;background:var(--msf-black);color:#fff;font-family:Impact,"Arial Black","Arial Narrow",sans-serif;font-size:25px;line-height:1.08;text-transform:uppercase;letter-spacing:-.01em;}
  .msf-community-list .msf-modal-card h3{background:var(--msf-red);font-size:28px;line-height:1;}
  .msf-modal-card dl{margin:0;display:grid;grid-template-columns:minmax(145px,.4fr) minmax(0,1fr);}
  .msf-community-list .msf-modal-card dl{grid-template-columns:minmax(190px,.34fr) minmax(0,1fr);}
  .msf-modal-card dt,.msf-modal-card dd{margin:0;padding:16px 18px;border-bottom:1px solid var(--msf-border);font-size:15px;line-height:1.56;overflow-wrap:anywhere;}
  .msf-modal-card dt{background:#f0ece8;color:var(--msf-black);font-weight:800;}
  .msf-modal-card dd{background:#fff;color:var(--msf-text);}
  .msf-modal-card dl>:nth-last-child(-n+2){border-bottom:0;}
  .msf-modal-card a{color:#075fb8;text-decoration:underline;text-underline-offset:3px;}

  @media (max-width:980px){
    .msf-hero-grid,.msf-section-head,.msf-photo-strip,.msf-access-grid,.msf-privacy-grid{grid-template-columns:1fr;}
    .msf-actions-art{justify-self:start;width:min(390px,82vw);margin-top:-8px;}
    .msf-photo-card{min-height:570px;}
    .msf-privacy-title{position:relative;top:auto;}
    .msf-directory-grid{grid-template-columns:1fr;}
  }

  @media (max-width:767px){
    .msf-container{width:min(calc(100% - 34px),640px);}
    .msf-section{padding:74px 0;}
    .msf-hero{min-height:auto;padding:62px 0 72px;}
    .msf-title-xl{font-size:clamp(54px,17vw,84px);}
    .msf-title-lg{font-size:clamp(43px,13vw,66px);}
    .msf-title-md{font-size:clamp(36px,11vw,57px);}
    .msf-body{font-size:17px;}
    .msf-body-lg{font-size:19px;}
    .msf-actions-art{width:100%;max-width:340px;margin:0 auto;padding:0;justify-self:center;}
    .msf-photo-card{min-height:460px;border-radius:26px;}
    .msf-photo-credit{left:20px;right:20px;bottom:18px;}
    .msf-card-grid{grid-template-columns:minmax(0,1fr);gap:12px;}
    .msf-card{min-height:auto;padding:18px;border-radius:22px;}
    .msf-card .msf-btn{font-size:12px;padding:11px 12px;min-height:46px;}
    .msf-card-title{font-size:clamp(20px,5.4vw,26px);}
    .msf-card .msf-body{font-size:14px;line-height:1.6;}
    .msf-editor-label{font-size:14px;}
    .msf-btn{width:100%;}
    .msf-access-card,.msf-privacy-title,.msf-contact,.msf-photo-strip-image,.msf-photo-strip-copy{border-radius:26px;}
    .msf-editorial-art{width:min(280px,84vw);margin-top:28px;}
    .msf-contact-premium{grid-template-columns:1fr;text-align:center;}
    .msf-contact-question{width:min(260px,72vw);justify-self:center;order:-1;}
    .msf-photo-strip-image,.msf-photo-strip-image img{min-height:360px;}
    .msf-privacy-item{grid-template-columns:1fr;}
    .msf-modal{padding:0;align-items:stretch;}
    .msf-modal-panel{width:100%!important;max-height:100dvh!important;min-height:100dvh!important;border-radius:0!important;}
    .msf-modal-header{padding:21px 18px;}
    .msf-modal-body{padding:18px;}
    .msf-modal-card dl,.msf-community-list .msf-modal-card dl{grid-template-columns:1fr;}
    .msf-modal-card dt{padding-bottom:5px;border-bottom:0;}
    .msf-modal-card dd{padding-top:6px;}
  }

  @media (prefers-reduced-motion:reduce){
    *,*:before,*:after{animation-duration:.001ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition-duration:.001ms!important;}
    .msf-reveal{opacity:1!important;transform:none!important;}
  }

  .msf-access-grid > *{min-width:0;}
  #msf-insulin-community .msf-community-title{
    width:100%;
    max-width:100%;
    font-size:clamp(42px,4.7vw,76px);
    line-height:.96;
    letter-spacing:-.03em;
    overflow-wrap:normal;
    word-break:normal;
    text-wrap:balance;
  }

  @media (max-width:767px){
    #msf-insulin-community .msf-community-title{
      font-size:clamp(38px,11vw,48px);
      line-height:.98;
    }
  }

  #msf-insulin-app .msf-access-grid{align-items:center;}
  #msf-insulin-app .msf-title-lg{font-size:clamp(40px,4.2vw,64px);}
  @media (max-width:767px){#msf-insulin-app .msf-title-lg{font-size:clamp(34px,9.5vw,46px);}}
  .msf-app-name{margin:0 0 20px;}
  .msf-app-card .msf-body-lg{max-width:62ch;}

  .msf-app-download{margin-top:32px;}
  .msf-app-download .msf-app-cta{margin-top:0;}
  .msf-app-qr{display:none;align-items:center;gap:24px;padding:18px 26px 18px 18px;border-radius:26px;background:var(--msf-soft);border:1px solid var(--msf-border);}
  .msf-app-qr-code{position:relative;flex:0 0 150px;width:150px;height:150px;padding:10px;border-radius:18px;background:#fff;box-shadow:0 14px 34px rgba(0,0,0,.1);}
  .msf-app-qr-code:before{content:"";position:absolute;left:-6px;top:-6px;width:34px;height:34px;border-left:5px solid var(--msf-red);border-top:5px solid var(--msf-red);border-radius:14px 0 0 0;}
  .msf-app-qr-code svg{display:block;width:100%;height:100%;}
  .msf-app-qr-label{margin:0 0 8px;font-family:Impact,"Arial Black","Arial Narrow",sans-serif;font-size:22px;line-height:1;text-transform:uppercase;letter-spacing:-.01em;color:var(--msf-black);}
  .msf-app-qr-text{margin:0;color:var(--msf-text);font-size:17px;line-height:1.55;}

  .msf-app-download{display:flex;flex-direction:column;align-items:flex-start;gap:18px;}
  @media (min-width:768px){
    .msf-app-download .msf-app-qr{display:flex;order:-1;}
  }

  @media (max-width:767px){
    #msf-insulin-app .msf-editorial-art{margin-left:auto;margin-right:auto;}
    .msf-app-card .msf-body-lg{font-size:18px;}
  }
  #msf-insulin-actions .msf-section-head{display:block;}
  #msf-insulin-actions .msf-card-head{display:flex;align-items:baseline;gap:14px;}
  #msf-insulin-actions .msf-card-number{flex:0 0 auto;}
  @media(max-width:767px){#msf-insulin-actions .msf-card-head{gap:8px;}}

  #msf-insulin-top #msf-insulin-actions > .msf-container{display:block!important;direction:ltr;text-align:left;}
  #msf-insulin-top #msf-insulin-actions .msf-actions-heading-v2{display:block!important;width:100%!important;margin:0 0 46px!important;float:none!important;}
  #msf-insulin-top #msf-insulin-actions .msf-actions-heading-v2 h2{margin:0!important;max-width:100%!important;}
  #msf-insulin-top #msf-insulin-actions .msf-actions-grid-v2{display:block!important;width:100%!important;clear:both!important;}
  #msf-insulin-top #msf-insulin-actions .msf-actions-card-v2{display:flex!important;flex-direction:column!important;width:100%!important;max-width:none!important;min-width:0!important;float:none!important;}
  #msf-insulin-top #msf-insulin-actions .msf-card-head{display:flex!important;flex-direction:row!important;align-items:baseline!important;gap:14px;}
  #msf-insulin-top #msf-insulin-actions .msf-card-head h3{margin:0!important;}
  @media(max-width:767px){#msf-insulin-top #msf-insulin-actions .msf-card-head{gap:8px;}}
`,
        }}
      />

      <div
        className="msf-page"
        id="msf-insulin-top"
        style={{
          display: 'block',
          visibility: 'visible',
          opacity: 1,
          width: '100%',
          height: 'auto',
          minHeight: '1px',
          overflow: 'visible',
        }}
      >
        <section className="msf-hero">
          <div className="msf-container msf-hero-grid">
            <div className="msf-hero-copy msf-reveal">
              <p className="msf-kicker">Welcome to MSF Lebanon Insulin Access Resource</p>
              <h1 className="msf-title-xl">FINDING YOUR INSULIN</h1>
              <p className="msf-body-lg">
                If you live with type 1 diabetes, you need insulin to survive. We know that finding
                a reliable supply during crisis is difficult. This page brings together information
                on where you can access insulin in Lebanon, along with resources to help you manage
                during times of crisis.
              </p>
              <div className="msf-btn-row">
                <a className="msf-btn msf-btn-red" href="#msf-insulin-actions">
                  What you can do here{' '}
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14"></path>
                    <path d="M13 6l6 6-6 6"></path>
                  </svg>
                </a>
                <a className="msf-btn msf-btn-outline" href="#msf-insulin-emergency">
                  Emergency support{' '}
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14"></path>
                    <path d="M13 6l6 6-6 6"></path>
                  </svg>
                </a>
              </div>
            </div>

            <figure className="msf-photo-card msf-reveal msf-delay-1">
              <img
                src="https://msf-lebanon.org/wp-content/uploads/2026/07/MSB178279High-scaled.jpg"
                alt="Siwar holds up her insulin pen while lying among her toys in her family's makeshift home in Arsal, Lebanon."
                loading="eager"
                decoding="async"
              />
              <figcaption className="msf-photo-credit">
                Siwar holds up her insulin pen while lying down amongst her toys in her family’s
                makeshift home in Arsal. She was diagnosed with type 1 diabetes at a young age and
                frequents the MSF clinic in the town for treatment. Arsal, Lebanon, May 2023. Carmen
                Yahchouchi/MSF
              </figcaption>
            </figure>
          </div>
        </section>

        <div className="msf-ticker" aria-hidden="true">
          <div className="msf-ticker-track">
            <span>FINDING YOUR INSULIN</span>
            <i></i>
            <span>Welcome to MSF Lebanon Insulin Access Resource</span>
            <i></i>
            <span>FINDING YOUR INSULIN</span>
            <i></i>
            <span>Welcome to MSF Lebanon Insulin Access Resource</span>
            <i></i>
          </div>
        </div>

        <section className="msf-section msf-soft" id="msf-insulin-actions">
          <div className="msf-container">
            <div className="msf-actions-heading-v2">
              <h2 className="msf-title-lg">What you can do here</h2>
            </div>

            <div className="msf-actions-grid-v2">
              <article className="msf-card msf-actions-card-v2">
                <div className="msf-card-head">
                  <span className="msf-card-number">1.</span>
                  <h3 className="msf-card-title">Find a pharmacy near you</h3>
                </div>
                <p className="msf-body">
                  Use this map to find pharmacies in your area. The map shows location only; it does
                  not show whether insulin is currently in stock. You may need to call ahead to
                  confirm availability.
                </p>
                <p className="msf-body" style={{ marginTop: '14px' }}>
                  For access to insulin through the public sector, you can use the{' '}
                  <a
                    href="https://moph.gov.lb/userfiles/files/HealthCareSystem/PHC/phcc.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#075fb8',
                      textDecoration: 'underline',
                      textUnderlineOffset: '3px',
                    }}
                  >
                    Ministry of Public Health’s Primary Health Care Centers directory
                  </a>{' '}
                  to locate the nearest participating center and contact them directly to confirm
                  insulin availability before your visit.
                </p>
                <div className="msf-card-actions">
                  <a
                    className="msf-btn msf-btn-dark"
                    href="https://www.google.com/maps/search/Pharmacies/@33.8920109,35.5103556,12z"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Google Maps{' '}
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12h14"></path>
                      <path d="M13 6l6 6-6 6"></path>
                    </svg>
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="msf-section">
          <div className="msf-container msf-photo-strip">
            <figure className="msf-photo-strip-image msf-reveal">
              <img
                src="https://msf-lebanon.org/wp-content/uploads/2026/07/MSF292444.jpg"
                alt="A child living with type 1 diabetes plays football in Aarsal, north Bekaa, Lebanon."
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div className="msf-photo-strip-copy msf-reveal msf-delay-1">
              <h2 className="msf-title-md">FINDING YOUR INSULIN</h2>
              <p className="msf-body">
                Type 1 diabetes patient Houssam was advised to exercise whenever he has
                hyperglycaemia. Aarsal, north Bekaa, Lebanon. © Jinane Saad/MSF
              </p>
            </div>
          </div>
        </section>

        <section className="msf-section msf-dark" id="msf-insulin-emergency">
          <div className="msf-container msf-access-grid">
            <div className="msf-reveal msf-white-text">
              <p className="msf-kicker">Emergency support</p>
              <h2 className="msf-title-lg">Emergency support</h2>

              {/* Artwork: hotline handset + lifeline pulse */}
              <div className="msf-editorial-art msf-editorial-art--dark" aria-hidden="true">
                <svg viewBox="0 0 340 300" role="img" aria-hidden="true">
                  <defs>
                    <linearGradient
                      id="msfEmergencyRed"
                      x1="28"
                      y1="26"
                      x2="310"
                      y2="282"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#ff2633" />
                      <stop offset="1" stopColor="#c9000c" />
                    </linearGradient>
                  </defs>
                  <rect x="18" y="18" width="304" height="264" rx="48" fill="url(#msfEmergencyRed)" />

                  <g transform="translate(66,74) scale(5.6)">
                    <path
                      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.28-1.28a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92z"
                      fill="#fff"
                    />
                  </g>

                  <circle cx="252" cy="72" r="38" fill="#111" />
                  <circle cx="252" cy="72" r="25" fill="none" stroke="#fff" strokeOpacity=".2" strokeWidth="2" />
                  <path d="M241 72h22M252 61v22" stroke="#fff" strokeWidth="8" strokeLinecap="round" />

                  <path
                    d="M48 240h46l14-26 20 48 14-30 9 9h89"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="272" cy="168" r="7" fill="#fff" opacity=".45" />
                </svg>
              </div>
            </div>

            <div className="msf-access-card msf-access-card-dark msf-reveal msf-delay-1">
              <p className="msf-body-lg">
                <strong style={{ color: '#fff' }}>Need to reach someone immediately?</strong>
              </p>
              <p className="msf-body" style={{ marginTop: '20px' }}>
                These numbers connect you to mental health support, emergency services for people
                with diabetes, and chronic care centers:{' '}
              </p>
              <button
                className="msf-btn msf-btn-red"
                type="button"
                data-msf-open="msf-emergency-directory"
              >
                List of hotline numbers{' '}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14"></path>
                  <path d="M13 6l6 6-6 6"></path>
                </svg>
              </button>
            </div>
          </div>
        </section>

        <section className="msf-section msf-soft" id="msf-insulin-community">
          <div className="msf-container msf-access-grid">
            <div className="msf-reveal">
              <p className="msf-kicker">Connecting with others</p>
              <h2 className="msf-title-lg msf-community-title">Connecting with others</h2>

              {/* Artwork: three people, linked */}
              <div className="msf-editorial-art" aria-hidden="true">
                <svg viewBox="0 0 340 300" role="img" aria-hidden="true">
                  <defs>
                    <linearGradient
                      id="msfCommunityRed"
                      x1="30"
                      y1="20"
                      x2="312"
                      y2="286"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#ff2633" />
                      <stop offset="1" stopColor="#d1000d" />
                    </linearGradient>
                    <clipPath id="msfCommunityClip">
                      <rect x="18" y="18" width="304" height="264" rx="48" />
                    </clipPath>
                  </defs>

                  <g clipPath="url(#msfCommunityClip)">
                    <rect x="18" y="18" width="304" height="264" rx="48" fill="#fff" />
                    <path
                      d="M18 228c70-36 150-42 214-22 34 10 64 27 90 50v26H18z"
                      fill="url(#msfCommunityRed)"
                    />

                    <circle cx="92" cy="162" r="30" fill="#e30613" />
                    <path d="M38 282c0-36 24-58 54-58s54 22 54 58z" fill="#111" />
                    <circle cx="248" cy="162" r="30" fill="#e30613" />
                    <path d="M194 282c0-36 24-58 54-58s54 22 54 58z" fill="#111" />

                    <circle cx="170" cy="130" r="44" fill="#111" />
                    <path d="M104 282c0-46 29-74 66-74s66 28 66 74z" fill="#fff" />

                    <circle cx="156" cy="124" r="4.5" fill="#fff" />
                    <circle cx="184" cy="124" r="4.5" fill="#fff" />
                    <path
                      d="M152 141c8 9 28 9 36 0"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M81 168c5 6 17 6 22 0"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M237 168c5 6 17 6 22 0"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />

                    <path
                      d="M72 120C112 62 228 62 268 120"
                      fill="none"
                      stroke="#e30613"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray="1 15"
                    />
                  </g>
                </svg>
              </div>
            </div>

            <div className="msf-access-card msf-reveal msf-delay-1">
              <p className="msf-body-lg">
                You are not alone. These organizations connect people living with diabetes to share
                information and support:
              </p>
              <button
                className="msf-btn msf-btn-dark"
                type="button"
                data-msf-open="msf-community-directory"
              >
                List of PLD communities and associations{' '}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14"></path>
                  <path d="M13 6l6 6-6 6"></path>
                </svg>
              </button>
            </div>
          </div>
        </section>

        <section className="msf-section" id="msf-insulin-app">
          <div className="msf-container msf-access-grid">
            <div className="msf-reveal">
              <p className="msf-kicker">Learn about diabetes</p>
              <h2 className="msf-title-lg">Mobile application</h2>

              {/* Artwork: smartphone with blood drop + download badge */}
              <div className="msf-editorial-art" aria-hidden="true">
                <svg viewBox="0 0 340 300" role="img" aria-hidden="true">
                  <defs>
                    <linearGradient
                      id="msfAppRed"
                      x1="28"
                      y1="26"
                      x2="310"
                      y2="282"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#ff2633" />
                      <stop offset="1" stopColor="#c9000c" />
                    </linearGradient>
                  </defs>
                  <rect x="18" y="18" width="304" height="264" rx="48" fill="url(#msfAppRed)" />

                  <rect x="122" y="48" width="116" height="214" rx="28" fill="#000" opacity=".2" />
                  <rect x="112" y="38" width="116" height="214" rx="28" fill="#111" />
                  <rect x="123" y="60" width="94" height="170" rx="15" fill="#fff" />
                  <rect x="152" y="46" width="36" height="7" rx="3.5" fill="#fff" opacity=".35" />

                  <path
                    d="M170 84c-3 5-28 33-28 52a28 28 0 0 0 56 0c0-19-25-47-28-52z"
                    fill="#e30613"
                  />
                  <path
                    d="M158 138c0 8 5 13 12 14"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />

                  <path d="M140 190h60" stroke="#e7dfd8" strokeWidth="7" strokeLinecap="round" />
                  <path d="M140 190h36" stroke="#111" strokeWidth="7" strokeLinecap="round" />
                  <path d="M140 208h44" stroke="#e7dfd8" strokeWidth="7" strokeLinecap="round" />
                  <path d="M140 208h22" stroke="#e30613" strokeWidth="7" strokeLinecap="round" />

                  <circle cx="262" cy="214" r="38" fill="#111" />
                  <circle cx="262" cy="214" r="25" fill="none" stroke="#fff" strokeOpacity=".2" strokeWidth="2" />
                  <path
                    d="M262 198v24M251 212l11 11 11-11M249 231h26"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <circle cx="66" cy="72" r="8" fill="#fff" opacity=".45" />
                </svg>
              </div>
            </div>

            <div className="msf-access-card msf-app-card msf-reveal msf-delay-1">
              <h3 className="msf-card-title msf-app-name">Diabetes Without Borders</h3>
              <p className="msf-body-lg">
                A free-to-use mobile app created by MSF with and for people living with diabetes to
                support self-management. Learn about diabetes through videos, audio and images,
                keep track of your blood glucose, symptoms, set healthy habits, and keep information
                about your clinic appointments in one place. This app is available in Arabic and works
                offline.
              </p>

              <div className="msf-app-download">
                <a
                  className="msf-btn msf-btn-red msf-app-cta"
                  href="https://bit.ly/msf-lebanon-insulin-access-resource"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download the app{' '}
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 4v12"></path>
                    <path d="M6 10l6 6 6-6"></path>
                    <path d="M5 20h14"></path>
                  </svg>
                </a>

                <div className="msf-app-qr">
                  <div className="msf-app-qr-code">
                    <svg
                      role="img"
                      aria-label="QR code to download the Diabetes Without Borders app"
                      focusable="false"
                      shapeRendering="crispEdges"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 37 37"
                      className="segno"
                    >
                      <path
                        className="qrline"
                        stroke="#101010"
                        d="M0 0.5h7m1 0h1m3 0h3m4 0h1m8 0h1m1 0h7m-37 1h1m5 0h1m3 0h6m1 0h1m4 0h4m1 0h1m2 0h1m5 0h1m-37 1h1m1 0h3m1 0h1m4 0h3m1 0h2m4 0h1m1 0h1m2 0h1m3 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m2 0h1m7 0h1m2 0h1m1 0h6m2 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m1 0h2m2 0h5m1 0h1m2 0h3m4 0h1m1 0h3m1 0h1m-37 1h1m5 0h1m1 0h6m2 0h1m1 0h1m2 0h2m3 0h3m1 0h1m5 0h1m-37 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-26 1h3m1 0h2m2 0h1m1 0h4m1 0h1m1 0h1m-28 1h7m2 0h1m4 0h1m2 0h3m1 0h1m1 0h3m1 0h1m2 0h2m3 0h1m-36 1h1m2 0h1m2 0h2m1 0h9m4 0h4m4 0h1m2 0h2m-36 1h1m2 0h1m1 0h2m1 0h2m1 0h2m7 0h3m1 0h4m2 0h3m1 0h3m-36 1h1m2 0h2m1 0h2m2 0h6m3 0h4m2 0h1m3 0h1m4 0h1m-36 1h1m1 0h2m2 0h1m1 0h1m1 0h2m1 0h1m1 0h1m1 0h2m1 0h1m1 0h6m1 0h2m1 0h1m1 0h1m1 0h1m-36 1h1m5 0h1m1 0h1m2 0h2m1 0h2m2 0h6m3 0h2m1 0h1m1 0h2m-35 1h1m2 0h2m1 0h2m2 0h2m1 0h1m2 0h1m1 0h2m1 0h1m2 0h1m2 0h3m1 0h1m1 0h1m1 0h2m-36 1h1m1 0h1m5 0h2m1 0h3m3 0h1m2 0h2m3 0h2m1 0h2m1 0h1m2 0h1m-36 1h1m4 0h5m1 0h1m5 0h1m3 0h1m2 0h4m1 0h2m1 0h1m1 0h2m-36 1h2m1 0h1m4 0h1m1 0h4m1 0h5m2 0h1m1 0h1m3 0h1m5 0h1m-35 1h2m1 0h2m1 0h5m1 0h3m1 0h1m1 0h1m2 0h2m1 0h2m1 0h3m2 0h1m2 0h2m-37 1h1m1 0h2m3 0h1m5 0h2m6 0h1m2 0h1m1 0h3m2 0h1m3 0h1m-32 1h3m3 0h1m1 0h1m1 0h1m2 0h3m2 0h1m2 0h3m2 0h3m1 0h3m-37 1h1m4 0h1m1 0h3m1 0h5m6 0h2m7 0h1m-30 1h7m1 0h1m2 0h1m1 0h1m1 0h1m2 0h2m5 0h1m1 0h2m4 0h2m-37 1h1m6 0h3m1 0h1m2 0h1m1 0h1m4 0h4m1 0h1m2 0h3m3 0h1m-34 1h5m2 0h2m2 0h4m5 0h1m1 0h3m1 0h1m1 0h1m1 0h3m1 0h1m-37 1h3m1 0h2m1 0h2m1 0h1m1 0h1m4 0h1m2 0h2m1 0h1m2 0h1m1 0h2m1 0h1m3 0h1m-36 1h1m2 0h2m1 0h2m1 0h3m1 0h2m1 0h2m2 0h1m4 0h1m1 0h2m1 0h1m1 0h1m2 0h2m-37 1h1m1 0h2m1 0h1m2 0h1m2 0h1m1 0h1m1 0h1m1 0h5m1 0h1m4 0h2m-30 1h1m2 0h1m1 0h2m1 0h1m2 0h1m1 0h1m5 0h1m2 0h2m1 0h2m1 0h5m1 0h2m-28 1h1m4 0h1m1 0h1m1 0h4m2 0h1m1 0h1m1 0h2m3 0h1m-33 1h7m1 0h7m1 0h5m1 0h1m2 0h2m1 0h1m1 0h1m1 0h2m2 0h1m-37 1h1m5 0h1m1 0h1m1 0h1m2 0h2m3 0h1m5 0h1m3 0h1m3 0h1m2 0h2m-37 1h1m1 0h3m1 0h1m1 0h2m1 0h5m1 0h1m1 0h14m1 0h1m-35 1h1m1 0h3m1 0h1m1 0h1m2 0h2m1 0h3m4 0h1m2 0h1m5 0h1m1 0h2m1 0h1m-36 1h1m1 0h3m1 0h1m1 0h3m3 0h2m2 0h1m1 0h3m1 0h1m1 0h1m1 0h2m1 0h1m2 0h1m1 0h1m-37 1h1m5 0h1m1 0h1m3 0h1m1 0h5m2 0h4m1 0h4m6 0h1m-37 1h7m2 0h3m1 0h3m4 0h1m1 0h1m2 0h2m3 0h7"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="msf-app-qr-label">Download the app</p>
                    <p className="msf-app-qr-text">
                      Scan the QR code with your phone camera to download the app
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="msf-section" id="msf-insulin-questions">
          <div className="msf-container">
            <div className="msf-contact msf-contact-premium msf-reveal">
              <div className="msf-contact-copy">
                <h2 className="msf-title-md">Questions?</h2>
                <p className="msf-body-lg">Contact MSF Lebanon:</p>
                <a className="msf-btn msf-btn-red" href="tel:+96170481190">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.28-1.28a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  70481190
                </a>
              </div>

              {/* Artwork: speech bubble question */}
              <div className="msf-contact-question" aria-hidden="true">
                <svg viewBox="0 0 330 300" role="img" aria-hidden="true">
                  <defs>
                    <linearGradient
                      id="msfQuestionRed"
                      x1="45"
                      y1="20"
                      x2="288"
                      y2="282"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#ff2633" />
                      <stop offset="1" stopColor="#c9000c" />
                    </linearGradient>
                  </defs>

                  <rect x="18" y="22" width="294" height="240" rx="50" fill="url(#msfQuestionRed)" />
                  <path d="M84 252l-18 44 58-44z" fill="url(#msfQuestionRed)" />

                  <path
                    d="M122 112c0-30 21-50 48-50 27 0 47 18 47 44 0 21-12 34-31 45-15 9-21 17-21 32"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="19"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="165" cy="224" r="13" fill="#111" />

                  <circle cx="262" cy="64" r="8" fill="#fff" opacity=".55" />
                </svg>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* EMERGENCY HOTLINE MODAL */}
      <div
        className="msf-modal"
        id="msf-emergency-directory"
        role="dialog"
        aria-modal="true"
        aria-hidden="true"
        aria-labelledby="msf-emergency-directory-title"
      >
        <div className="msf-modal-panel" role="document">
          <header className="msf-modal-header">
            <div>
              <h2 className="msf-modal-title" id="msf-emergency-directory-title">
                Emergency Hotline Directory
              </h2>
              <p className="msf-modal-subtitle">
                Crisis support lines relevant to people living with diabetes in Lebanon
              </p>
            </div>
            <button className="msf-modal-close" type="button" data-msf-close aria-label="Close">
              ×
            </button>
          </header>

          <div className="msf-modal-body">
            <p className="msf-directory-note">
              The contact details below were verified against official or highly credible sources as
              of 8 July 2026. While every effort has been made to provide accurate information,
              service availability may change over time. If you are unable to reach a listed
              service, we encourage you to try an alternative contact option or visit the relevant
              organization's official website for the most up to date information.
            </p>

            <div className="msf-directory-grid">
              <article className="msf-modal-card">
                <h3>Ministry of Public Health (MoPH): Hotline 1214</h3>
                <dl>
                  <dt>Service provided</dt>
                  <dd>
                    National MoPH hotline for inquiries and reviews on chronic-disease and
                    cancer/incurable-disease medications; provided free of charge. Relevant to
                    diabetes patients needing chronic-medication support.
                  </dd>
                  <dt>Hotline / Phone</dt>
                  <dd>
                    <a href="tel:1214">1214 (toll-free within Lebanon)</a>
                  </dd>
                  <dt>WhatsApp</dt>
                  <dd>Information not publicly available</dd>
                  <dt>Operating hours</dt>
                  <dd>Information not publicly available</dd>
                  <dt>Eligibility restrictions</dt>
                  <dd>General public in Lebanon; toll-free</dd>
                  <dt>Official source</dt>
                  <dd>
                    <a href="https://www.moph.gov.lb" target="_blank" rel="noopener noreferrer">
                      moph.gov.lb
                    </a>
                  </dd>
                </dl>
              </article>

              <article className="msf-modal-card">
                <h3>Ministry of Public Health (MoPH): Hotline 1787</h3>
                <dl>
                  <dt>Service provided</dt>
                  <dd>
                    MoPH hotline dedicated to health services for displaced Lebanese; provided free of
                    charge.
                  </dd>
                  <dt>Hotline / Phone</dt>
                  <dd>
                    <a href="tel:1787">1787 (toll-free within Lebanon)</a>
                  </dd>
                  <dt>WhatsApp</dt>
                  <dd>Information not publicly available</dd>
                  <dt>Operating hours</dt>
                  <dd>Information not publicly available</dd>
                  <dt>Eligibility restrictions</dt>
                  <dd>Displaced Lebanese</dd>
                  <dt>Official source</dt>
                  <dd>
                    <a href="https://www.moph.gov.lb" target="_blank" rel="noopener noreferrer">
                      moph.gov.lb
                    </a>
                  </dd>
                </dl>
              </article>

              <article className="msf-modal-card">
                <h3>Embrace: National Lifeline</h3>
                <dl>
                  <dt>Service provided</dt>
                  <dd>
                    Emotional-support and suicide-prevention hotline; dispatches mobile crisis teams
                    (Beirut, Tripoli, Tyre). Operated by Embrace in partnership with the National
                    Mental Health Programme at the MoPH.
                  </dd>
                  <dt>Hotline / Phone</dt>
                  <dd>
                    <a href="tel:1564">1564</a>
                    <br />
                    Office: <a href="tel:+9611346226">+961 1 346226</a>
                  </dd>
                  <dt>WhatsApp</dt>
                  <dd>Information not publicly available</dd>
                  <dt>Operating hours</dt>
                  <dd>
                    24 hours / 7 days per the Embrace operator site. Note: the MoPH page states
                    daily 12:00–02:00
                  </dd>
                  <dt>Eligibility restrictions</dt>
                  <dd>Anyone in emotional distress; anonymous and free</dd>
                  <dt>Official source</dt>
                  <dd>
                    <a href="https://embracelebanon.org" target="_blank" rel="noopener noreferrer">
                      embracelebanon.org
                    </a>
                  </dd>
                </dl>
              </article>

              <article className="msf-modal-card">
                <h3>National Mental Health Programme (NMHP), MoPH</h3>
                <dl>
                  <dt>Service provided</dt>
                  <dd>
                    Government mental-health programme launched 2014 with WHO/UNICEF/IMC support.
                    Its public-facing emergency service is delivered through the Embrace National
                    Lifeline (1564); it does not operate a separate public emergency number.
                  </dd>
                  <dt>Hotline / Phone</dt>
                  <dd>
                    <a href="tel:1564">Call 1564 (National Lifeline)</a>
                  </dd>
                  <dt>WhatsApp</dt>
                  <dd>Information not publicly available</dd>
                  <dt>Operating hours</dt>
                  <dd>See Lifeline 1564</dd>
                  <dt>Eligibility restrictions</dt>
                  <dd>General public</dd>
                  <dt>Official source</dt>
                  <dd>
                    <a href="https://www.moph.gov.lb" target="_blank" rel="noopener noreferrer">
                      moph.gov.lb
                    </a>
                  </dd>
                </dl>
              </article>

              <article className="msf-modal-card">
                <h3>Chronic Care Center</h3>
                <dl>
                  <dt>Service provided</dt>
                  <dd>
                    Specialized care and follow-up for childhood Type 1 (insulin-dependent) diabetes
                    and thalassemia. Landlines with office hours: not a 24/7 crisis line.
                  </dd>
                  <dt>Hotline / Phone</dt>
                  <dd>
                    <a href="tel:+9615455101">+961 5 455 101</a>
                    <br />
                    <a href="tel:+9615455102">+961 5 455 102</a>
                  </dd>
                  <dt>WhatsApp</dt>
                  <dd>Information not publicly available</dd>
                  <dt>Operating hours</dt>
                  <dd>Mon–Fri 08:00–15:00</dd>
                  <dt>Eligibility restrictions</dt>
                  <dd>
                    For existing beneficiaries: children/young people with Type 1
                    (insulin-dependent) diabetes. The official site confirms childhood Type 1 scope
                    but does not publish a specific age cut-off or nationality restriction.
                  </dd>
                  <dt>Official source</dt>
                  <dd>
                    <a href="https://chroniccare.org.lb" target="_blank" rel="noopener noreferrer">
                      chroniccare.org.lb
                    </a>
                  </dd>
                </dl>
              </article>
            </div>
          </div>
        </div>
      </div>

      {/* COMMUNITIES MODAL */}
      <div
        className="msf-modal"
        id="msf-community-directory"
        role="dialog"
        aria-modal="true"
        aria-hidden="true"
        aria-labelledby="msf-community-directory-title"
      >
        <div className="msf-modal-panel" role="document">
          <header className="msf-modal-header">
            <div>
              <h2 className="msf-modal-title" id="msf-community-directory-title">
                Diabetes Communities &amp; Associations
              </h2>
              <p className="msf-modal-subtitle">
                Patient organizations and peer-support groups for people living with diabetes in
                Lebanon
              </p>
            </div>
            <button className="msf-modal-close" type="button" data-msf-close aria-label="Close">
              ×
            </button>
          </header>

          <div className="msf-modal-body">
            <p className="msf-directory-note">
              The contact details below were checked against official or highly credible sources and
              were current as of 8 July 2026. As contact information may change, please refer to the
              relevant organization’s official channels if you are unable to reach a listed
              service.
            </p>

            <div className="msf-community-list">
              <article className="msf-modal-card">
                <h3>Positive on Glucose (PoG)</h3>
                <dl>
                  <dt>Type of organization</dt>
                  <dd>Patient-led non-profit / diabetes community and advocacy initiative</dd>
                  <dt>Description</dt>
                  <dd>
                    Founded by Cyrine Farhat, a person living with Type 1 diabetes. Began as an
                    Instagram page and grew into an NGO providing diabetes education, peer and
                    psychosocial support groups (bi-monthly sessions), community events, and
                    advocacy (including the Insulin4All Lebanon campaign). Collaborates with MSF
                    Lebanon on patient-empowerment workshops.
                  </dd>
                  <dt>Geographic coverage</dt>
                  <dd>Lebanon (national)</dd>
                  <dt>Target population</dt>
                  <dd>People living with diabetes (Type 1 and Type 2) and their caregivers</dd>
                  <dt>Website</dt>
                  <dd>
                    <a
                      href="https://www.postiveonglucose.org"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      www.postiveonglucose.org
                    </a>
                  </dd>
                  <dt>Facebook</dt>
                  <dd>n/a</dd>
                  <dt>Instagram</dt>
                  <dd>
                    <a
                      href="https://www.instagram.com/positiveonglucose_diabetes"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @positiveonglucose_diabetes
                    </a>
                  </dd>
                  <dt>Other social media</dt>
                  <dd>Information not publicly available</dd>
                  <dt>Email</dt>
                  <dd>
                    <a href="mailto:positiveonglucose@gmail.com">positiveonglucose@gmail.com</a>
                  </dd>
                  <dt>Phone number</dt>
                  <dd>
                    <a href="tel:+96178834839">+96178834839</a>
                  </dd>
                </dl>
              </article>

              <article className="msf-modal-card">
                <h3>diaLeb: National Diabetes Organization</h3>
                <dl>
                  <dt>Type of organization</dt>
                  <dd>National non-profit diabetes organization (NGO)</dd>
                  <dt>Description</dt>
                  <dd>
                    Founded 2011 by Jackie Kassouf Maalouf. Promotes diabetes care and prevention
                    through awareness, education (an IDF-accredited centre of education), free HbA1c
                    and glucose testing, and patient support and relief. Member of the
                    International Diabetes Federation, NCD Alliance, and World Patients Alliance.
                  </dd>
                  <dt>Geographic coverage</dt>
                  <dd>Lebanon (national); sister organization DiaLeb USA</dd>
                  <dt>Target population</dt>
                  <dd>General public and people living with diabetes and their families</dd>
                  <dt>Website</dt>
                  <dd>
                    <a href="https://dialeb.org" target="_blank" rel="noopener noreferrer">
                      dialeb.org
                    </a>
                  </dd>
                  <dt>Facebook</dt>
                  <dd>
                    <a
                      href="https://facebook.com/DiaLebOrg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      facebook.com/DiaLebOrg
                    </a>
                  </dd>
                  <dt>Instagram</dt>
                  <dd>
                    <a
                      href="https://instagram.com/dialeb"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      instagram.com/dialeb
                    </a>
                  </dd>
                  <dt>Other social media</dt>
                  <dd>
                    <a
                      href="https://www.linkedin.com/company/dialeborg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                    &nbsp; · &nbsp;
                    <a
                      href="https://www.youtube.com/user/DiaLebChannel"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      YouTube
                    </a>
                    &nbsp; · &nbsp;
                    <a
                      href="https://twitter.com/DiaLebOrg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      X (Twitter)
                    </a>
                  </dd>
                  <dt>Email</dt>
                  <dd>
                    <a href="mailto:info@dialeb.org">info@dialeb.org</a>
                  </dd>
                  <dt>Phone number</dt>
                  <dd>
                    <a href="tel:+9611888874">+961 1 88 88 74</a>&nbsp; · &nbsp;Al Bareed Street,
                    Georges Maalouf Center, 4th Floor, Jdeideh, Lebanon
                  </dd>
                </dl>
              </article>

              <article className="msf-modal-card">
                <h3>Chronic Care Center (Type 1 patient community)</h3>
                <dl>
                  <dt>Type of organization</dt>
                  <dd>
                    Non-profit medico-social institution that runs a distinct Type 1 diabetes
                    patient community
                  </dd>
                  <dt>Description</dt>
                  <dd>
                    Established 1992 in Hazmieh. Specialized center for childhood Type 1 diabetes.
                    Beyond clinical care it runs a patient community: annual summer camps for teens,
                    youth outings, a national young-leaders group, and group sessions for parents and
                    patients. IDF Centre of Excellence in Diabetes.
                  </dd>
                  <dt>Geographic coverage</dt>
                  <dd>Lebanon (patients referred from all regions); center located in Hazmieh</dd>
                  <dt>Target population</dt>
                  <dd>Children and adolescents with Type 1 diabetes and their families</dd>
                  <dt>Website</dt>
                  <dd>
                    <a
                      href="https://chroniccare.org.lb"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      chroniccare.org.lb
                    </a>
                  </dd>
                  <dt>Facebook</dt>
                  <dd>
                    <a
                      href="https://facebook.com/ChronicCareCenter"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      facebook.com/ChronicCareCenter
                    </a>
                  </dd>
                  <dt>Instagram</dt>
                  <dd>
                    <a
                      href="https://www.instagram.com/chroniccarecenter"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @chroniccarecenter
                    </a>
                  </dd>
                  <dt>Other social media</dt>
                  <dd>Information not publicly available</dd>
                  <dt>Email</dt>
                  <dd>
                    <a href="mailto:ccc@dm.net.lb">ccc@dm.net.lb</a>
                  </dd>
                  <dt>Phone number</dt>
                  <dd>
                    <a href="tel:+9615455101">+961 5 455 101</a>&nbsp; · &nbsp;
                    <a href="tel:+9615455102">+961 5 455 102</a>
                  </dd>
                </dl>
              </article>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
