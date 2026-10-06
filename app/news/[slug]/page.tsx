import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowDown, ArrowRight, Share2, Mail } from 'lucide-react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import HtmlEmbed from '@/components/html-embed';
import { getArticle, getLatestNews, getStaticArticleSlugs } from '@/lib/wp';

export const dynamic = 'force-static';
export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getStaticArticleSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) {
    return {
      title: 'Story not found | MSF Lebanon',
    };
  }

  return {
    title: `${article.title} | MSF Lebanon`,
    description: article.lead || 'Medical humanitarian action in Lebanon and around the world.',
    openGraph: {
      title: article.title,
      description: article.lead,
      images: article.featuredImage ? [article.featuredImage] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const moreStories = await getLatestNews(3, article.slug, article.isArabic);
  const shareUrl = article.link;

  return (
    <>
      <a href="#article" className="skip">Skip to story</a>

      {/* Hero with featured image and site header */}
      <section className="hero about-hero work-hero article-hero" aria-labelledby="article-title">
        <div className="hero-images about-slides" aria-hidden="true">
          <img
            className="about-slide"
            src={article.featuredImage}
            alt=""
            fetchPriority="high"
          />
        </div>
        <SiteHeader />
        <div className="hero-story">
          <div>
            <nav className="amr-breadcrumb" aria-label="Breadcrumb">
              <Link href="/news-events">News &amp; Events</Link>
              {article.country && (
                <>
                  <span aria-hidden="true">/</span>
                  <span>{article.country}</span>
                </>
              )}
            </nav>
            <h1 id="article-title" className={article.isArabic ? 'is-arabic' : ''}>
              {article.title}
            </h1>
          </div>
          <div className="hero-summary">
            <p className="story-meta">
              {article.dateFormatted}
              {article.category && (
                <>
                  <span aria-hidden="true" />
                  {article.category}
                </>
              )}
            </p>
            {article.lead && <p className="article-hero-lead">{article.lead}</p>}
            <a className="pill" href="#article">
              Read the story <ArrowDown size={19} />
            </a>
          </div>
        </div>
        <div className="hero-bottom">
          <span className="hero-caption-text">
            {article.featuredImageCaption || 'Médecins Sans Frontières · Field Story'}
          </span>
          <a href="#article">
            Story details <ArrowDown size={17} />
          </a>
        </div>
      </section>

      {/* Main article body */}
      <main id="article" className="article-main">
        {/* Toolbar: back link + social share bar */}
        <div className="article-toolbar-wrap wrap">
          <Link href="/news-events" className="article-back-link">
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Back to News &amp; Events</span>
          </Link>

          <div className="article-share-group">
            <span className="article-share-label">
              <Share2 size={15} aria-hidden="true" /> Share
            </span>
            <div className="article-share-buttons" role="group" aria-label="Share this article">
              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="article-share-btn"
                aria-label="Share on Facebook"
                title="Share on Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="article-share-btn"
                aria-label="Share on X"
                title="Share on X"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="article-share-btn"
                aria-label="Share on LinkedIn"
                title="Share on LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.89 0-1.61.72-1.61 1.61s.72 1.61 1.61 1.61 1.61-.72 1.61-1.61-.72-1.61-1.61-1.61z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' - ' + shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="article-share-btn"
                aria-label="Share on WhatsApp"
                title="Share on WhatsApp"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>

              {/* Email */}
              <a
                href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(shareUrl)}`}
                className="article-share-btn"
                aria-label="Share via Email"
                title="Share via Email"
              >
                <Mail size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Content stream */}
        <article
          className={`article-content-container wrap ${article.isArabic ? 'is-arabic' : ''}`}
          dir={article.isArabic ? 'rtl' : 'ltr'}
        >
          {article.blocks.map((block, index) => {
            if (block.type === 'html') {
              return (
                <div key={index} className="article-block-html">
                  <HtmlEmbed html={block.html || ''} />
                </div>
              );
            }

            if (block.type === 'prose') {
              return (
                <div
                  key={index}
                  className="article-prose"
                  dangerouslySetInnerHTML={{ __html: block.html || '' }}
                />
              );
            }

            if (block.type === 'image' && block.image) {
              return (
                <figure key={index} className="article-figure">
                  <img
                    src={block.image.src}
                    alt={block.image.alt}
                    loading="lazy"
                  />
                  {block.image.caption && (
                    <figcaption>{block.image.caption}</figcaption>
                  )}
                </figure>
              );
            }

            if (block.type === 'quote' && block.quote) {
              return (
                <blockquote key={index} className="article-quote">
                  <div className="article-quote-mark" aria-hidden="true">“</div>
                  <p className="article-quote-text">{block.quote.text}</p>
                  {block.quote.author && (
                    <cite className="article-quote-author">— {block.quote.author}</cite>
                  )}
                </blockquote>
              );
            }

            if (block.type === 'gallery' && block.gallery) {
              return (
                <div key={index} className="article-gallery-grid">
                  {block.gallery.map((img, gIdx) => (
                    <figure key={gIdx} className="article-gallery-item">
                      <img src={img.src} alt={img.alt} loading="lazy" />
                      {img.alt && <figcaption>{img.alt}</figcaption>}
                    </figure>
                  ))}
                </div>
              );
            }

            if (block.type === 'divider') {
              return <hr key={index} className="article-divider" />;
            }

            return null;
          })}
        </article>

        {/* More Stories */}
        {moreStories.length > 0 && (
          <section className="article-more-stories" aria-labelledby="more-stories-title">
            <div className="wrap">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">
                    {article.isArabic ? 'تابع القراءة' : 'Continue reading'}
                  </p>
                  <h2 id="more-stories-title">
                    {article.isArabic ? 'المزيد من الأخبار والقصص' : 'More News & Stories'}
                  </h2>
                </div>
                <Link href="/news-events" className="text-link">
                  {article.isArabic ? 'كل الأخبار' : 'View all news'}
                  <ArrowRight size={20} />
                </Link>
              </div>

              <div className="article-more-grid">
                {moreStories.map(story => (
                  <article className="story" key={story.slug}>
                    <Link href={story.url}>
                      <div className="story-image">
                        <img
                          src={story.image}
                          alt=""
                          loading="lazy"
                          width={526}
                          height={398}
                        />
                        <span>{story.tag}</span>
                      </div>
                      <div className="story-copy">
                        <p className="date">{story.dateFormatted}</p>
                        <h3>{story.title}</h3>
                        <span className="read">
                          {article.isArabic ? 'اقرأ المزيد' : 'Read More'}
                          <ArrowRight size={20} />
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
