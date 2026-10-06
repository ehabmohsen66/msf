export const base = 'https://msf-lebanon.org';

/* `local: true` items live in this app; everything else still links to the live site. */
export type NavLink = { label: string; url: string; local?: boolean };
export type NavItem = NavLink & { subItems: NavLink[] };

/* Resolves a menu link to either this app or the live site. */
export const navHref = (l: NavLink) => (l.local ? l.url : base + l.url);

export const navMenu: NavItem[] = [
  {
    label: 'About us',
    url: '/about-us',
    local: true,
    subItems: [
      { label: 'MSF History', url: '/about-us#msf-history', local: true },
      { label: 'MSF in Lebanon', url: '/about-us#msf-in-lebanon', local: true },
      { label: 'MSF in the Field', url: '/about-us#msf-in-the-field', local: true },
    ],
  },
  {
    label: 'Work with us',
    url: '/work-with-us',
    local: true,
    subItems: [
      { label: 'Local Vacancies', url: '/work-with-us#vacancies', local: true },
      { label: 'Overseas Vacancies', url: '/work-with-us#vacancies', local: true },
      { label: 'Life in the field', url: '/work-with-us#life-in-the-field', local: true },
    ],
  },
  {
    label: 'News & events',
    url: '/news-events',
    local: true,
    subItems: [
      { label: 'News & Stories', url: '/news-events#news-stories', local: true },
      { label: 'Research & Publications', url: '/news-events/research-publications/' },
      { label: 'Events', url: '/news-events#events', local: true },
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
