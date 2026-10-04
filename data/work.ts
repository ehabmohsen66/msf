/* Work with us content, taken word for word from the live https://msf-lebanon.org/work-with-us/ page.
   Images are the same files used on the live site (copied into /public/assets/work/).
   Each block maps to one Elementor section (see the build guide). */

const img = (f: string) => `/assets/work/${f}`;

export const hero = {
  image: img('hero-yemen.png'),
  alt: 'MSF medical staff treat a young patient in a hospital in Yemen.',
  /* First sentence of the live "Local Vacancies" text */
  summary: 'Embark on a journey of incredible personal and professional growth.',
};

/* Vacancies: the two big cards. Link targets are the live sub-pages. */
export const vacancies = [
  {
    title: 'Local Vacancies',
    text: 'Embark on a journey of incredible personal and professional growth. Join those working with Médecins Sans Frontières (MSF) in Lebanon and Egypt, to help with the general running of our offices around the world.',
    image: img('local-vacancies.jpg'),
    alt: 'An MSF staff member in a vest and face mask holds a folder.',
    url: '/work-with-us/local-vacancies/',
    label: 'In Lebanon and Egypt',
  },
  {
    title: 'Overseas Vacancies',
    lead: 'Want to work Abroad with us?',
    text: 'You can apply to work with MSF abroad all around the globe. We run projects in more than 70 countries.',
    image: img('overseas-vacancies.jpg'),
    alt: 'An MSF staff member walks towards a UN helicopter.',
    url: '/work-with-us/overseas-vacancies/',
    label: 'Worldwide',
  },
];

export const commitments = {
  title: 'Behavioural Commitments',
  text: 'Within MSF, all staff members (including those on international assignments, volunteers, and daily workers) and operational partners (including consultants and guests) understand and adhere to the commitments and incorporate them into their professional and personal conduct.',
  image: img('behavioural-commitments.png'),
  alt: 'The MSF flag flying against a grey sky.',
  url: '/work-with-us/behavioural-commitments/',
};

/* More Than a Job: the two videos (YouTube ids from the live page) */
export const videos = [
  { title: '24 Hours in the Life of an MSF Team in the Field', youtubeId: '2zEBnCAUtEU', poster: img('video-24-hours.png') },
  { title: 'Working in MSF is not only an experience', youtubeId: 'ZdOaAPw0_VE', poster: img('video-working-in-msf.png') },
];

/* Life in the Field */
export const lifeInTheField = {
  viewMore: '/work-with-us/life-in-the-field/',
  cards: [
    { title: 'Meet MSF International Staff', image: img('life-meet-staff.jpg'), alt: 'MSF staff next to a helicopter on an airstrip.', url: '/work-with-us/life-in-the-field/meet-msf-international-staff/' },
    { title: '3 Questions', image: img('life-3-questions.jpeg'), alt: '“3 Questions from the field” title card over an MSF vehicle.', url: '/work-with-us/life-in-the-field/3-questions/' },
    { title: 'Dardasha', image: img('life-dardasha.jpg'), alt: 'Dardasha title card with a red speech bubble.', url: '/work-with-us/life-in-the-field/dardasha/' },
  ],
};
