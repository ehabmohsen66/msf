export const base = 'https://msf-lebanon.org';

/* `local: true` items live in this app; everything else still links to the live site.
   `indent: true` marks a sub-item that belongs under the item above it (shown indented). */
export type NavLink = { label: string; url: string; local?: boolean; indent?: boolean };
export type NavItem = NavLink & { subItems: NavLink[] };

/* Resolves a menu link to either this app or the live site. */
export const navHref = (l: NavLink) => (l.local ? l.url : base + l.url);

/* Resolves a news post link to the local demo route (/news/<slug>). */
export const postHref = (url: string): string => {
  if (!url) return '#';
  if (url.startsWith('/news/')) {
    return url.replace(/\/$/, '');
  }
  return base + url;
};

/* Main tabs, in the client's order: About us · Work with us · News & reports · In Focus · Medical topics.
   In Focus uses the white-ribbon space freed by moving Contact us to the black ribbon. */
export const navMenu: NavItem[] = [
  {
    label: 'About us',
    url: '/about-us',
    local: true,
    subItems: [
      { label: 'Our history & principles', url: '/about-us#msf-history', local: true },
      { label: 'MSF in Lebanon', url: '/about-us#msf-in-lebanon', local: true },
      { label: 'Humanitarian & medical activities', url: '/what-we-do/msf-in-the-field/mena/lebanon/', indent: true },
      { label: 'MSF Lebanon Branch Office', url: '/about-us/msf-office-in-lebanon/', indent: true },
      { label: 'Where we work', url: '/#where-we-work', local: true },
    ],
  },
  {
    label: 'Work with us',
    url: '/#work-with-us',
    local: true,
    subItems: [
      { label: 'Local Vacancies', url: '/work-with-us#vacancies', local: true },
      { label: 'Overseas Vacancies', url: '/work-with-us#vacancies', local: true },
      { label: 'Life in the field', url: '/work-with-us#life-in-the-field', local: true },
    ],
  },
  {
    label: 'News & reports',
    url: '/news-events',
    local: true,
    subItems: [
      { label: 'Latest news', url: '/news-events#news-stories', local: true },
      { label: 'Events', url: '/news-events#events', local: true },
      { label: 'Reports & resources', url: '/news-events#reports', local: true },
    ],
  },
  {
    label: 'In Focus',
    url: '/in-focus',
    local: true,
    subItems: [
      { label: 'Crises & emergencies', url: '/in-focus#crises', local: true },
      { label: 'Creative projects', url: '/in-focus#creative', local: true },
    ],
  },
  {
    label: 'Medical topics',
    url: '/medical-topics',
    local: true,
    subItems: [
      { label: 'Antimicrobial Resistance (AMR)', url: '/medical-topics/antimicrobial-resistance-amr', local: true },
      { label: 'Insulin Access Resource', url: '/medical-topics/msf-lebanon-insulin-access-resource', local: true },
      { label: 'World Patient Safety Day', url: '/medical-topics/world-patient-safety-day', local: true },
    ],
  },
];

