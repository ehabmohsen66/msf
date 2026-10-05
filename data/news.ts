/* News & events content, taken word for word from the live https://msf-lebanon.org/news-events/ page.
   Images are the original uploads used on the live site (copied into /public/assets/news/).
   Each block maps to one Elementor section; on WordPress the two lists become Loop Grid / Posts
   widgets that pull the latest posts automatically, so these arrays are only a static snapshot. */

const img = (f: string) => `/assets/news/${f}`;

export type Post = { title: string; date: string; url: string; image: string; tag?: string };

export const hero = {
  image: img('hero.png'),
};

/* News & Stories: the 10 latest posts shown on the live page (newest first).
   `tag` is the country named in each title, shown like the homepage story cards. */
export const newsStories = {
  viewAll: '/news-events/news-stories/',
  posts: [
    { tag: 'Lebanon', date: 'October 1, 2026', title: 'Behind the Call: Living with the psychological toll of war in Lebanon', url: '/news/behind-the-call-living-with-the-psychological-toll-of-war-in-lebanon/', image: img('n01-mental-health-lebanon.png') },
    { tag: 'DRC', date: 'September 30, 2026', title: 'Ebola in eastern DRC: An outbreak unfolding amid conflict, displacement and multiple health emergencies', url: '/news/ebola-in-eastern-drc-an-outbreak-unfolding-amid-conflict-displacement-and-multiple-health-emergencies/', image: img('n02-ebola-drc.jpg') },
    { tag: 'Yemen', date: 'September 18, 2026', title: 'A Lifeline for Women and Children in Mocha, Yemen', url: '/news/lifeline-for-women-and-children-in-mocha-yemen/', image: img('n03-mocha-lifeline.png') },
    { tag: 'Syria', date: 'September 16, 2026', title: 'Strengthening Healthcare Access in Daraa, Syria', url: '/news/strengthening-healthcare-access-in-daraa-syria/', image: img('n04-daraa-syria.png') },
    { tag: 'Yemen', date: 'September 12, 2026', title: 'As conflict engulfs Mocha, health workers keep hospital open', url: '/news/conflict-in-mocha-health-workers-keep-hospital-open/', image: img('n05-mocha-hospital.png') },
    { tag: 'Sudan', date: 'September 9, 2026', title: 'Sudan Aid Cuts Force Widespread Clinic Closures', url: '/news/sudan-aid-cuts-force-widespread-clinic-closures/', image: img('n06-sudan-clinics.png') },
    { tag: 'Yemen', date: 'September 8, 2026', title: 'Malnourished children are reaching hospitals in critical condition in Yemen', url: '/news/malnourished-children-in-yemen/', image: img('n07-yemen-malnutrition.png') },
    { tag: 'Worldwide', date: 'September 7, 2026', title: 'International Activity Report 2025', url: '/news/international-activity-report-2025/', image: img('n08-activity-report.jpg') },
    { tag: 'Lebanon', date: 'September 7, 2026', title: 'Water is life: People of Southern Lebanon must not be punished', url: '/news/people-of-southern-lebanon-must-not-be-punished/', image: img('n09-south-lebanon-water.png') },
    { tag: 'Nepal', date: 'August 28, 2026', title: 'MSF team arrives in Nepal to assess people’s needs following devastating flash floods', url: '/news/msf-team-arrives-in-nepal/', image: img('n10-nepal.png') },
  ] satisfies Post[],
};

/* Previous Events: the 12 events listed on the live page (newest first). */
export const previousEvents = {
  viewAll: '/news-events/events/',
  posts: [
    { date: 'November 10, 2025', title: 'MSF Play “Gaza – Aita ash Shab” Amplifies Women’s Voices', url: '/news/msf-play-gaza-aita-ash-shab-amplifies-womens-voices/', image: img('e01-gaza-aita-shaab.png') },
    { date: 'September 19, 2025', title: 'Beirut Demonstration in Solidarity with Gaza: Doctors Can’t Stop Genocide. World Leaders Can.', url: '/news/beirut-demonstration-in-solidarity-with-gaza-doctors-cant-stop-genocide-world-leaders-can/', image: img('e02-beirut-demonstration.png') },
    { date: 'May 8, 2025', title: 'International Day of the Midwife: Supporting and Empowering Midwives', url: '/news/international-day-of-the-midwife-supporting-and-empowering-midwives/', image: img('e03-midwife-day.png') },
    { date: 'April 30, 2025', title: 'MSF Participates in Career Fairs at Lebanese Universities', url: '/news/msf-participates-in-career-fairs-at-lebanese-universities/', image: img('e04-career-fairs.png') },
    { date: 'April 16, 2025', title: 'MSF’s “Witness” Featured at the Sudanese Film Night in Beirut', url: '/news/msfs-witness-featured-at-the-sudanese-film-night-in-beirut/', image: img('e05-witness.png') },
    { date: 'July 18, 2023', title: 'Out of Sight, Out of Mind Webinar: The Deteriorating Situation of Migrant Workers in Lebanon', url: '/news/out-of-sight-out-of-mind-webinar/', image: img('e06-out-of-sight.jpg') },
    { date: 'October 25, 2022', title: 'Ink with Hope Exhibition', url: '/news/ink-with-hope-exhibition/', image: img('e07-ink-with-hope.jpg') },
    { date: 'October 21, 2022', title: 'Seminar on Climate Change and Its Impact on Health', url: '/news/seminar-on-climate-change-and-its-impact-on-health/', image: img('e08-climate-seminar.jpg') },
    { date: 'September 19, 2022', title: 'Midwife Care Model Event', url: '/news/midwife-care-model-event/', image: img('e10-midwife-care.jpg') },
    { date: 'September 9, 2022', title: 'Movie Screening Event: Egoiste / Selfish', url: '/news/movie-screening-event-egoiste-selfish/', image: img('e09-egoiste.jpg') },
    { date: 'August 24, 2022', title: 'Webinar: “Our Health….Our Right”', url: '/news/webinar-our-health-our-right/', image: img('e11-our-health.jpg') },
    { date: 'May 5, 2022', title: 'MSF Spotlight Series: Climate Crisis:An Existential Emergency', url: '/news/climatecrisissession/', image: img('e12-climate-crisis.jpeg') },
  ] satisfies Post[],
};

/* Newsletter band, from the live site's "Would you Like to Hear from us" block */
export const newsletter = {
  title: 'Would you Like to Hear from us',
  cta: 'Subscribe',
  url: '/subscribe-to-our-newsletters-2/',
};
