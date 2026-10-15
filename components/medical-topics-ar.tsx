'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { medicalTopicsAr } from '@/data/ar/home';

export default function MedicalTopicsAr() {
  const [active, setActive] = useState(0);

  return (
    <section className="topics-section wrap rtl-topics" id="medical-topics" aria-labelledby="topics-heading-ar" dir="rtl">
      <div className="section-heading">
        <div>
          <p className="eyebrow">الصحة في بؤرة الضوء</p>
          <h2 id="topics-heading-ar">مواضيع طبية</h2>
        </div>
        <a className="text-link" href="/medical-topics">
          جميع المواضيع الطبية <ArrowLeft size={20} />
        </a>
      </div>
      <p className="topics-intro">
        أدلة وموارد عملية حول القضايا الصحية التي تواجه المجتمعات التي نخدمها، من مقاومة المضادات الحيوية إلى التعامل مع السكري في الأزمات.
      </p>

      <div className="topics-panels">
        {medicalTopicsAr.map((t, i) => {
          const isActive = i === active;
          return (
            <a
              key={t.title}
              href={t.url}
              className={`topic-panel ${isActive ? 'is-active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <img src={t.image} alt={t.alt} loading="lazy" style={{ objectPosition: t.position }} />
              <span className="topic-panel-label">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <t.Icon size={15} aria-hidden="true" />
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
