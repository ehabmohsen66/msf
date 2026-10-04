import { ArrowRight } from 'lucide-react';
import { base } from '@/lib/nav';

export type LinkCardData = { title: string; text?: string; image: string; alt: string; url: string; tag?: string; cta?: string };

/* Image card used on the About us and Work with us pages (Elementor: Image Box widget).
   `columns` switches the grid between 2 and 3 cards per row. */
export default function LinkCards({ cards, columns = 2 }: { cards: LinkCardData[]; columns?: 2 | 3 }) {
  return (
    <div className={`link-cards${columns === 3 ? ' link-cards-3' : ''}`}>
      {cards.map(c => (
        <a key={c.title} className="link-card" href={base + c.url}>
          <span className="link-card-image">
            <img src={c.image} alt={c.alt} loading="lazy" />
            {c.tag && <span className="link-card-tag">{c.tag}</span>}
          </span>
          <span className="link-card-body">
            <h3>{c.title}</h3>
            {c.text && <p>{c.text}</p>}
            <span className="link-card-cta">{c.cta ?? 'Read more'} <span className="link-card-arrow"><ArrowRight size={20} aria-hidden="true" /></span></span>
          </span>
        </a>
      ))}
    </div>
  );
}
