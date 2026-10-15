'use client';

import { useState } from 'react';
import { ArrowLeft, Biohazard, Palette, Siren } from 'lucide-react';
import { focusItemsAr } from '@/data/ar/home';
import { postHref } from '@/lib/nav';

const icons = {
  'استجابة للطوارئ': Siren,
  'مكافحة الأوبئة': Biohazard,
  'مشروع إبداعي': Palette,
} as const;

export default function InFocusAr() {
  const [active, setActive] = useState(0);

  return (
    <section className="topics-section focus-section wrap rtl-topics" id="in-focus" aria-labelledby="focus-heading-ar" dir="rtl">
      <div className="section-heading">
        <div>
          <p className="eyebrow">أزمات ومشاريع إبداعية</p>
          <h2 id="focus-heading-ar">في بؤرة الضوء</h2>
        </div>
        <a className="text-link" href="https://msf-lebanon.org/ar/الأخبار-والأنشطة/">
          جميع التقارير والقصص <ArrowLeft size={20} />
        </a>
      </div>
      <p className="topics-intro">
        استجابتنا لحالات الطوارئ والأزمات التي نعمل فيها، والمشاريع الإبداعية التي تنقل قصص الناس وتجاربهم إلى ما وراء الأزمة.
      </p>

      <div className="topics-panels">
        {focusItemsAr.map((t, i) => {
          const isActive = i === active;
          const Icon = icons[t.label as keyof typeof icons] ?? Siren;
          return (
            <a
              key={t.title}
              href={t.url.startsWith('http') ? t.url : postHref(t.url)}
              className={`topic-panel ${isActive ? 'is-active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <img src={t.image} alt={t.alt} loading="lazy" style={{ objectPosition: t.position }} />
              <span className="topic-panel-label">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <Icon size={15} aria-hidden="true" />
                {t.label}
              </span>
              <span className="topic-panel-body">
                <span className="topic-panel-title">{t.title}</span>
                <span className="topic-panel-reveal">
                  <span className="topic-panel-reveal-inner">
                    <span className="topic-panel-text">{t.text}</span>
                    <span className="topic-panel-cta">
                      {t.cta}
                      <span className="topic-panel-arrow">
                        <ArrowLeft size={20} aria-hidden="true" />
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
