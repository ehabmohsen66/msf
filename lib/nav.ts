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

export const navMenuAr: NavItem[] = [
  {
    label: 'من نحن',
    url: '/ar#about-msf',
    local: true,
    subItems: [
      { label: 'حركة أطباء بلا حدود', url: 'https://msf-lebanon.org/ar/%d9%85%d9%86-%d9%86%d8%ad%d9%86/%d8%ad%d8%b1%d9%83%d8%a9-%d8%a3%d8%b7%d8%a8%d8%a7%d8%a1-%d8%a8%d9%84%d8%a7-%d8%ad%d8%af%d9%88%d8%af/' },
      { label: 'أطباء بلا حدود في لبنان', url: 'https://msf-lebanon.org/ar/%d8%a7%d8%b7%d8%a8%d8%a7%d8%a1-%d8%a8%d9%84%d8%a7-%d8%ad%d8%af%d9%88%d8%af-%d9%81%d9%8a-%d9%84%d8%a8%d9%86%d8%a7%d9%86/' },
      { label: 'مكتب فرع لبنان', url: 'https://msf-lebanon.org/ar/%d9%85%d9%86-%d9%86%d8%ad%d9%86/%d9%85%d9%83%d8%aa%d8%a8-%d9%84%d8%a8%d9%86%d8%a7%d9%86/', indent: true },
      { label: 'قابل الفريق', url: 'https://msf-lebanon.org/ar/%d9%85%d9%86-%d9%86%d8%ad%d9%86/%d9%82%d8%a7%d8%a8%d9%84-%d8%a7%d9%84%d9%81%d8%b1%d9%8a%d9%82/', indent: true },
      { label: 'أين نعمل', url: '/ar#where-we-work', local: true },
    ],
  },
  {
    label: 'كيف نعمل',
    url: 'https://msf-lebanon.org/ar/%d9%83%d9%8a%d9%81-%d9%86%d8%b9%d9%85%d9%84/',
    subItems: [
      { label: 'أطباء بلا حدود في الميدان', url: 'https://msf-lebanon.org/ar/%d9%83%d9%8a%d9%81-%d9%86%d8%b9%d9%85%d9%84/%d9%81%d9%8a-%d8%a7%d9%84%d9%85%d9%8a%d8%af%d8%a7%d9%86/' },
      { label: 'أنشطة مكتب لبنان', url: 'https://msf-lebanon.org/ar/%d9%83%d9%8a%d9%81-%d9%86%d8%b9%d9%85%d9%84/%d8%a3%d9%86%d8%b4%d8%b7%d8%a9-%d9%85%d9%83%d8%aa%d8%a8-%d9%84%d8%a8%d9%86%d8%a7%d9%86/' },
      { label: 'الشرق الأوسط وشمال أفريقيا', url: 'https://msf-lebanon.org/ar/%d9%83%d9%8a%d9%81-%d9%86%d8%b9%d9%85%d9%84/%d9%81%d9%8a-%d8%a7%d9%84%d9%85%d9%8a%d8%af%d8%a7%d9%86/%d8%a7%d9%84%d8%b4%d8%b1%d9%82-%d8%a7%d9%84%d8%a7%d9%88%d8%b3%d8%b7-%d9%88%d8%b4%d9%85%d8%a7%d9%84-%d8%a7%d9%81%d8%b1%d9%8a%d9%82%d9%8a%d8%a7/' },
    ],
  },
  {
    label: 'اعمل معنا',
    url: '/ar#work-with-us',
    local: true,
    subItems: [
      { label: 'وظائف محلية', url: 'https://msf-lebanon.org/ar/%d8%a7%d8%b9%d9%85%d9%84-%d9%85%d8%b9%d9%86%d8%a7/%d9%88%d8%b8%d8%a7%d8%a6%d9%81-%d9%85%d8%ad%d9%84%d9%8a%d8%a9/' },
      { label: 'وظائف في الخارج', url: 'https://msf-lebanon.org/ar/%d8%a7%d8%b9%d9%85%d9%84-%d9%85%d8%b9%d9%86%d8%a7/%d9%88%d8%b8%d8%a7%d8%a6%d9%81-%d9%81%d9%8a-%d8%a7%d9%84%d8%ae%d8%a7%d8%b1%d8%ac/' },
      { label: 'الحياة في الميدان', url: 'https://msf-lebanon.org/ar/%d8%a7%d8%b9%d9%85%d9%84-%d9%85%d8%b9%d9%86%d8%a7/%d8%a7%d9%84%d8%ad%d9%8a%d8%a7%d8%a9-%d9%81%d9%8a-%d8%a7%d9%84%d9%85%d9%8a%d8%af%d8%a7%d9%86/' },
      { label: 'استمارة التقديم', url: 'https://msf-lebanon.org/ar/%d8%a7%d8%b3%d8%aa%d9%85%d8%a7%d8%b1%d8%a9-%d8%a7%d9%84%d8%aa%d9%82%d8%af%d9%8a%d9%85/', indent: true },
    ],
  },
  {
    label: 'الأخبار والأنشطة',
    url: 'https://msf-lebanon.org/ar/%d8%a7%d9%84%d8%a3%d8%ae%d8%a8%d8%a7%d8%b1-%d9%88%d8%a7%d9%84%d8%a3%d9%86%d8%b4%d8%b7%d8%a9/',
    subItems: [
      { label: 'آخر الأخبار والقصص', url: '/ar#latest', local: true },
      { label: 'الأنشطة والفعاليات', url: 'https://msf-lebanon.org/ar/%d8%a7%d9%84%d8%a3%d8%ae%d8%a8%d8%a7%d8%b1-%d9%88%d8%a7%d9%84%d8%a3%d9%86%d8%b4%d8%b7%d8%a9/%d8%a7%d9%84%d8%a3%d9%86%d8%b4%d8%b7%d8%a9/' },
      { label: 'نشرة لحظة', url: 'https://msf-lebanon.org/ar/%d8%a7%d9%84%d8%a3%d8%ae%d8%a8%d8%a7%d8%b1-%d9%88%d8%a7%d9%84%d8%a3%d9%86%d8%b4%d8%b7%d8%a9/%d9%86%d8%b4%d8%b1%d8%a9-%d9%84%d8%ad%d8%b8%d8%a9/' },
      { label: 'البحوث والمنشورات', url: 'https://msf-lebanon.org/ar/%d8%a7%d9%84%d8%a3%d8%ae%d8%a8%d8%a7%d8%b1-%d9%88%d8%a7%d9%84%d8%a3%d9%86%d8%b4%d8%b7%d8%a9/%d8%a7%d9%84%d8%a8%d8%ad%d9%88%d8%ab-%d9%88%d8%a7%d9%84%d9%85%d9%86%d8%b4%d9%88%d8%b1%d8%a7%d8%aa/' },
    ],
  },
  {
    label: 'في بؤرة الضوء',
    url: '/ar#in-focus',
    local: true,
    subItems: [
      { label: 'استجابة حرب لبنان', url: '/ar#in-focus', local: true },
      { label: 'حرب غزة', url: '/ar#in-focus', local: true },
      { label: 'استجابة إيبولا', url: '/ar#in-focus', local: true },
      { label: 'ضربة فرشاة مع الذاكرة', url: 'https://msf-lebanon.org/ar/news-events/news-stories/a-brush-with-memory-between-home-and-displacement/' },
    ],
  },
  {
    label: 'مواضيع طبية',
    url: '/ar#medical-topics',
    local: true,
    subItems: [
      { label: 'مقاومة مضادات الميكروبات', url: '/ar#medical-topics', local: true },
      { label: 'دليل الوصول إلى الأنسولين', url: '/ar#medical-topics', local: true },
      { label: 'اليوم العالمي لسلامة المرضى', url: '/ar#medical-topics', local: true },
    ],
  },
];

