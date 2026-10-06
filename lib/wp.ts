import { parse } from 'node-html-parser';
import { newsStories, previousEvents } from '@/data/news';

const WP_BASE = 'https://msf-lebanon.org/wp-json/wp/v2';
const USER_AGENT = 'Mozilla/5.0 (compatible; MSFLebanonDemo/1.0)';

export interface ArticleImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ArticleQuote {
  text: string;
  author?: string;
}

export interface ArticleBlock {
  type: 'prose' | 'image' | 'quote' | 'gallery' | 'divider' | 'html';
  html?: string;
  image?: ArticleImage;
  quote?: ArticleQuote;
  gallery?: ArticleImage[];
}

export interface Article {
  id: number;
  slug: string;
  title: string;
  date: string;
  dateFormatted: string;
  featuredImage: string;
  featuredImageCaption: string;
  category: string;
  country: string;
  lead: string;
  blocks: ArticleBlock[];
  isArabic: boolean;
  link: string;
}

export interface LatestNewsItem {
  id: number;
  slug: string;
  title: string;
  dateFormatted: string;
  image: string;
  tag: string;
  url: string;
}

/**
 * Strips prepended Elementor <style> tags before parsing JSON.
 */
function cleanWpJson<T>(rawText: string): T {
  const clean = rawText.replace(/^\s*(<style[\s\S]*?<\/style>\s*)+/, '');
  return JSON.parse(clean);
}

/**
 * Decodes HTML entities using node-html-parser.
 */
export function decodeHtml(str: string): string {
  if (!str) return '';
  return parse(str).text;
}

/**
 * Formats a WP ISO date to "D MMMM YYYY" (e.g. "1 October 2026").
 */
export function formatDate(isoDate: string): string {
  try {
    const d = new Date(isoDate);
    if (isNaN(d.getTime())) return isoDate;
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return isoDate;
  }
}

/**
 * Extracts a normalized filename slug to compare images.
 */
function getImageKey(url: string): string {
  try {
    const filename = url.split('/').pop()?.split('?')[0] || '';
    return filename.replace(/(-\d+x\d+|-scaled|\.[a-z0-9]+$)/gi, '').toLowerCase();
  } catch {
    return '';
  }
}

/**
 * Rewrites live msf-lebanon.org URLs in content to internal demo routes.
 */
export function rewriteContentLinks(html: string): string {
  return html
    .replace(/href="https?:\/\/msf-lebanon\.org\/news\/([^"/#]+)\/?([#"][^"]*)?"/gi, (match, slug, hash) => {
      return `href="/news/${slug}${hash || ''}"`;
    })
    .replace(/href="https?:\/\/msf-lebanon\.org\/contact-us\/?"/gi, 'href="/contact-us"')
    .replace(/href="https?:\/\/msf-lebanon\.org\/about-us\/?"/gi, 'href="/about-us"')
    .replace(/href="https?:\/\/msf-lebanon\.org\/work-with-us\/?"/gi, 'href="/work-with-us"')
    .replace(/href="https?:\/\/msf-lebanon\.org\/news-events\/?"/gi, 'href="/news-events"')
    .replace(/href="https?:\/\/msf-lebanon\.org\/medical-topics\/msf-lebanon-insulin-access-resource\/?"/gi, 'href="/medical-topics/msf-lebanon-insulin-access-resource"')
    .replace(/href="https?:\/\/msf-lebanon\.org\/medical-topics\/world-patient-safety-day\/?"/gi, 'href="/medical-topics/world-patient-safety-day"')
    .replace(/href="https?:\/\/msf-lebanon\.org\/medical-topics\/antimicrobial-resistance-amr\/?"/gi, 'href="/medical-topics/antimicrobial-resistance-amr"');
}

/**
 * Sanitizes rich text HTML for prose blocks.
 */
function cleanProseHtml(rawHtml: string): string {
  let cleaned = rawHtml
    // Demote any h1 to h2 to preserve document hierarchy
    .replace(/<h1(\s|>)/gi, '<h2$1')
    .replace(/<\/h1>/gi, '</h2>')
    // Remove empty paragraphs
    .replace(/<p>\s*(?:&nbsp;|\s)*<\/p>/gi, '')
    .trim();

  return rewriteContentLinks(cleaned);
}

/**
 * Fetches an article by its slug from the WP REST API.
 */
export async function getArticle(slug: string): Promise<Article | null> {
  const cleanSlug = decodeURIComponent(slug).trim().replace(/^\/|\/$/g, '');
  if (!cleanSlug) return null;

  try {
    const url = `${WP_BASE}/news?slug=${encodeURIComponent(cleanSlug)}&_embed=wp:featuredmedia,wp:term`;
    const res = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.warn(`[getArticle] HTTP ${res.status} for slug "${cleanSlug}"`);
      return null;
    }

    const raw = await res.text();
    const posts = cleanWpJson<any[]>(raw);
    if (!posts || posts.length === 0) return null;

    const post = posts[0];
    const title = decodeHtml(post.title?.rendered || '');
    const isArabic = /[\u0600-\u06FF]/.test(title) || /%d[89]/i.test(post.slug);
    const dateFormatted = formatDate(post.date);

    // Featured media
    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
    const featuredImage = featuredMedia?.source_url || '/assets/news/hero.png';
    const featuredImageCaption = decodeHtml(featuredMedia?.caption?.rendered || '');
    const featuredImageKey = getImageKey(featuredImage);

    // Taxonomies
    let category = '';
    let country = '';
    const terms = post._embedded?.['wp:term'] || [];
    for (const group of terms) {
      for (const term of group) {
        if (term.taxonomy === 'news_cat' && !category) {
          category = decodeHtml(term.name);
        } else if (term.taxonomy === 'story_country' && !country) {
          country = decodeHtml(term.name);
        }
      }
    }

    // Parse Elementor content into clean blocks
    const root = parse(post.content?.rendered || '', {
      comment: false,
      blockTextElements: { script: true, style: true, noscript: true, pre: true },
    });

    const widgets = root.querySelectorAll('[data-widget_type]');
    const blocks: ArticleBlock[] = [];
    let lead = '';

    if (widgets.length === 0) {
      // Standard WP post without Elementor widgets
      const cleanContent = cleanProseHtml(post.content?.rendered || '');
      if (cleanContent) {
        blocks.push({ type: 'prose', html: cleanContent });
      }
    } else {
      let isFirstImage = true;

      for (const widget of widgets) {
        const type = widget.getAttribute('data-widget_type') || '';

        // Skip utility widgets already represented in page layout
        if (
          type.startsWith('news_breadcrumb') ||
          type.startsWith('theme-post-title') ||
          type.startsWith('share-buttons') ||
          type.startsWith('spacer')
        ) {
          continue;
        }

        // Full standalone HTML widget (interactive timeline, story map, bespoke infographic)
        if (type.startsWith('html')) {
          const container = widget.querySelector('.elementor-widget-container') || widget;
          const htmlContent = container.innerHTML.trim();
          if (htmlContent) {
            blocks.push({ type: 'html', html: htmlContent });
          }
          continue;
        }

        // Quote block
        if (type.startsWith('quote')) {
          const contentEl = widget.querySelector('.quote-content');
          const authorEl = widget.querySelector('.author');
          if (contentEl) {
            contentEl.querySelectorAll('.left-quote, .right-quote').forEach(q => q.remove());
            const text = decodeHtml(contentEl.text.trim());
            const author = authorEl ? decodeHtml(authorEl.text.trim()) : undefined;
            if (text) {
              blocks.push({ type: 'quote', quote: { text, author } });
            }
          }
          continue;
        }

        // Image widget
        if (type.startsWith('image.')) {
          const imgEl = widget.querySelector('img');
          if (imgEl) {
            const src = imgEl.getAttribute('src') || '';
            const alt = decodeHtml(imgEl.getAttribute('alt') || '');
            const captionEl = widget.querySelector('figcaption, .widget-image-caption');
            const caption = captionEl ? decodeHtml(captionEl.text.trim()) : undefined;

            // Avoid repeating the featured image at the top
            if (isFirstImage && featuredImageKey && getImageKey(src) === featuredImageKey) {
              isFirstImage = false;
              continue;
            }
            isFirstImage = false;

            if (src) {
              blocks.push({
                type: 'image',
                image: { src, alt, caption },
              });
            }
          }
          continue;
        }

        // Gallery widgets
        if (type.startsWith('gallery') || type.startsWith('image-gallery') || type.startsWith('repeater_poster')) {
          const galleryItems: ArticleImage[] = [];
          const items = widget.querySelectorAll('.e-gallery-item, .gallery-item, .item');

          for (const item of items) {
            const href = item.getAttribute('href');
            const imgEl = item.querySelector('img');
            const src = href || imgEl?.getAttribute('src');
            if (src) {
              const alt = decodeHtml(
                imgEl?.getAttribute('alt') ||
                item.getAttribute('data-elementor-lightbox-title') ||
                ''
              );
              galleryItems.push({ src, alt });
            }
          }

          if (galleryItems.length > 0) {
            blocks.push({ type: 'gallery', gallery: galleryItems });
          }
          continue;
        }

        // Divider
        if (type.startsWith('divider')) {
          if (blocks.length > 0 && blocks[blocks.length - 1].type !== 'divider') {
            blocks.push({ type: 'divider' });
          }
          continue;
        }

        // Text editor (rich text prose)
        if (type.startsWith('text-editor')) {
          const container = widget.querySelector('.elementor-widget-container') || widget;
          container.querySelectorAll('style').forEach(s => s.remove());

          // Extract first paragraph as lead summary if available
          if (!lead) {
            const pEls = container.querySelectorAll('p');
            for (const p of pEls) {
              const text = decodeHtml(p.text.trim());
              if (text.length >= 40 && text.length <= 360) {
                lead = text;
                p.remove();
                break;
              }
            }
          }

          const rawHtml = container.innerHTML.trim();
          const cleanHtml = cleanProseHtml(rawHtml);
          if (cleanHtml && cleanHtml !== '<p></p>') {
            blocks.push({ type: 'prose', html: cleanHtml });
          }
          continue;
        }

        // Fallback for any other widget: extract container inner HTML as prose
        const container = widget.querySelector('.elementor-widget-container') || widget;
        container.querySelectorAll('style').forEach(s => s.remove());
        const fallbackHtml = cleanProseHtml(container.innerHTML.trim());
        if (fallbackHtml) {
          blocks.push({ type: 'prose', html: fallbackHtml });
        }
      }
    }

    // Clean up trailing dividers
    while (blocks.length > 0 && blocks[blocks.length - 1].type === 'divider') {
      blocks.pop();
    }

    return {
      id: post.id,
      slug: post.slug,
      title,
      date: post.date,
      dateFormatted,
      featuredImage,
      featuredImageCaption,
      category: category || (isArabic ? 'أخبار وقصص' : 'News & Stories'),
      country,
      lead,
      blocks,
      isArabic,
      link: post.link || `https://msf-lebanon.org/news/${post.slug}/`,
    };
  } catch (err) {
    console.error(`[getArticle] Failed to fetch article "${cleanSlug}":`, err);
    return null;
  }
}

/**
 * Fetches recent news stories for the "More stories" section.
 */
export async function getLatestNews(count = 3, excludeSlug?: string, wantArabic = false): Promise<LatestNewsItem[]> {
  try {
    const url = `${WP_BASE}/news?per_page=12&_embed=wp:featuredmedia,wp:term&_fields=id,slug,title,date,_links,_embedded`;
    const res = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return getFallbackLatestNews(count, excludeSlug);
    }

    const raw = await res.text();
    const posts = cleanWpJson<any[]>(raw);
    const results: LatestNewsItem[] = [];

    for (const post of posts) {
      if (excludeSlug && post.slug === excludeSlug) continue;

      const title = decodeHtml(post.title?.rendered || '');
      const isArabic = /[\u0600-\u06FF]/.test(title);
      if (isArabic !== wantArabic) continue;

      let tag = '';
      const terms = post._embedded?.['wp:term'] || [];
      for (const group of terms) {
        for (const term of group) {
          if (term.taxonomy === 'story_country' && !tag) {
            tag = decodeHtml(term.name);
          }
        }
      }

      const media = post._embedded?.['wp:featuredmedia']?.[0];
      const image = media?.source_url || '/assets/news/hero.png';

      results.push({
        id: post.id,
        slug: post.slug,
        title,
        dateFormatted: formatDate(post.date),
        image,
        tag: tag || (isArabic ? 'قصص من الميدان' : 'Field Story'),
        url: `/news/${post.slug}`,
      });

      if (results.length >= count) break;
    }

    if (results.length > 0) return results;
    return getFallbackLatestNews(count, excludeSlug);
  } catch (err) {
    console.warn('[getLatestNews] Error, using static fallback:', err);
    return getFallbackLatestNews(count, excludeSlug);
  }
}

function getFallbackLatestNews(count: number, excludeSlug?: string): LatestNewsItem[] {
  return newsStories.posts
    .filter(p => !excludeSlug || !p.url.includes(excludeSlug))
    .slice(0, count)
    .map((p, i) => {
      const slug = p.url.replace(/^\/news\/|\/$/g, '');
      return {
        id: i + 1,
        slug,
        title: p.title,
        dateFormatted: p.date,
        image: p.image,
        tag: p.tag || 'Field Story',
        url: `/news/${slug}`,
      };
    });
}

/**
 * Returns static slugs from local data arrays to prebuild at build time.
 */
export function getStaticArticleSlugs(): string[] {
  const slugs = new Set<string>();

  for (const post of newsStories.posts) {
    const slug = post.url.replace(/^\/news\/|\/$/g, '');
    if (slug) slugs.add(slug);
  }

  for (const event of previousEvents.posts) {
    const slug = event.url.replace(/^\/news\/|\/$/g, '');
    if (slug) slugs.add(slug);
  }

  // Common homepage story slugs
  slugs.add('bekaa-where-lives-have-been-upheaved-in-the-shadow-of-war');
  slugs.add('people-of-southern-lebanon-must-not-be-punished');
  slugs.add('escalating-violence-and-movement-restrictions-continue-to-drive-medical-needs-in-hebron');
  slugs.add('malnourished-children-in-yemen');
  slugs.add('behind-the-call-living-with-the-psychological-toll-of-war-in-lebanon');
  slugs.add('ebola-in-eastern-drc-an-outbreak-unfolding-amid-conflict-displacement-and-multiple-health-emergencies');
  slugs.add('international-activity-report-2025');

  return Array.from(slugs);
}
