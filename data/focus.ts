/* In Focus: thematic pages on the crises we respond to and the creative projects that carry people's stories.
   Crisis entries point at local article routes (/news/<slug>); the Brush with Memory page is a live WordPress page, so it links out. */
export type FocusItem = {
  group: 'crises' | 'creative';
  label: string;
  title: string;
  text: string;
  cta: string;
  url: string;
  image: string;
  alt: string;
  position: string;
};

export const focusItems: FocusItem[] = [
  {
    group: 'crises',
    label: 'Crisis response',
    title: "MSF's response to the Lebanon war",
    text: 'How our teams scaled up care as bombardment and displacement spread across Lebanon.',
    cta: 'Read the response',
    url: '/news/lebanon-msf-scales-up-response-as-displacement-rises-across-the-country/',
    image: '/assets/focus-lebanon.png',
    alt: 'An MSF tent and waiting area at a clinic in Lebanon, with people sitting outside.',
    position: '50% 50%',
  },
  {
    group: 'crises',
    label: 'Crisis response',
    title: 'Gaza war',
    text: 'Restrictions on food and aid have driven malnutrition, with newborns and pregnant women hit hardest.',
    cta: 'Read the story',
    url: '/news/gazas-man-made-malnutrition-crisis/',
    image: '/assets/focus-gaza.png',
    alt: 'A newborn with low birth weight in an incubator at Al-Helou Hospital in Gaza City.',
    position: '50% 50%',
  },
  {
    group: 'crises',
    label: 'Outbreak response',
    title: 'Ebola',
    text: 'Scaling up the response in Ituri province, DR Congo, with the safety of staff and patients at the centre.',
    cta: 'Read the story',
    url: '/news/ebola-and-drc-msf-responds-to-ituri-outbreak/',
    image: '/assets/focus-ebola.png',
    alt: 'A health worker in protective equipment walks between isolation tents at an Ebola treatment area.',
    position: '50% 50%',
  },
  {
    group: 'creative',
    label: 'Creative project',
    title: 'A Brush with Memory',
    text: 'Three women displaced by war in Lebanon share memories of home, loss, resilience and hope.',
    cta: 'Discover the stories',
    url: '/news-events/news-stories/a-brush-with-memory-between-home-and-displacement/', // a WordPress page, so it stays on the live site
    image: '/assets/focus-brush.png',
    alt: 'Illustration of a woman in a headscarf sitting beside a wood stove in a living room.',
    position: '50% 40%',
  },
];
