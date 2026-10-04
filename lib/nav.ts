export const base = 'https://msf-lebanon.org';

/* `local: true` items live in this app; everything else still links to the live site. */
export type NavItem = { label: string; url: string; local?: boolean; subItems: { label: string; url: string }[] };

export const navMenu: NavItem[] = [
  {
    label: 'About us',
    url: '/about-us',
    local: true,
    subItems: [
      { label: 'MSF History', url: '/about-us/msf-history/' },
      { label: 'MSF in Lebanon', url: '/what-we-do/msf-in-leb/' },
      { label: 'MSF in the Field', url: '/what-we-do/msf-in-the-field/' },
    ],
  },
  {
    label: 'Work with us',
    url: '/work-with-us/',
    subItems: [
      { label: 'Local Vacancies', url: '/work-with-us/local-vacancies/' },
      { label: 'Overseas Vacancies', url: '/work-with-us/overseas-vacancies/' },
      { label: 'Life in the field', url: '/work-with-us/life-in-the-field/' },
    ],
  },
  {
    label: 'News & events',
    url: '/news-events/',
    subItems: [
      { label: 'News & Stories', url: '/news-events/news-stories/' },
      { label: 'Research & Publications', url: '/news-events/research-publications/' },
      { label: 'Events', url: '/news-events/events/' },
    ],
  },
  {
    label: 'Medical topics',
    url: '/medical-topics/',
    subItems: [
      { label: 'Antimicrobial Resistance (AMR)', url: '/medical-topics/antimicrobial-resistance-amr/' },
      { label: 'Insulin Access Resource', url: '/medical-topics/msf-lebanon-insulin-access-resource/' },
      { label: 'World Patient Safety Day', url: '/medical-topics/world-patient-safety-day/' },
    ],
  },
];
