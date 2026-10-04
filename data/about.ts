/* Content for /about-us, condensed from the live msf-lebanon.org pages:
   - /about-us/msf-history/                   (charter, principles, timeline)
   - /about-us/50-years-of-msf-in-lebanon-2/  (Lebanon chapters)
   - /what-we-do/lebanon-office-activities/   (office activities) */

export const principles = [
  {
    title: 'Impartiality',
    text: 'We offer assistance based on need, whatever country people come from, which religion they belong to or what their political affiliations are. We give priority to those in the most serious and immediate danger.',
  },
  {
    title: 'Independence',
    text: 'Our decision to help rests on our own evaluation of medical needs, free of political, economic or religious interests. Over 95 per cent of our funding comes from individual private donors.',
  },
  {
    title: 'Neutrality',
    text: 'We do not take sides in armed conflicts, nor support the agendas of warring parties.',
  },
  {
    title: 'Accountability',
    text: 'We account for our actions to our patients and donors, and are transparent about the choices we make.',
  },
  {
    title: 'Bearing witness',
    text: 'Neutrality is not synonymous with silence. Our proximity to people in distress implies a duty to raise awareness of their plight, and so help improve their situation.',
  },
];

export const stats = [
  { value: 13, label: 'doctors and journalists founded MSF in Paris, in 1971', prefix: '', suffix: '' },
  { value: 65000, label: 'people in our worldwide movement today, nearly', prefix: '', suffix: '' },
  { value: 1999, label: 'year MSF was awarded the Nobel Peace Prize', prefix: '', suffix: '', plain: true },
  { value: 95, label: 'of our funding comes from individual private donors', prefix: '', suffix: '%+' },
];

export const charter = [
  'MSF provides assistance to populations in distress, to victims of natural or man-made disasters and to victims of armed conflict, irrespective of race, religion, creed or political convictions.',
  'MSF observes neutrality and impartiality in the name of universal medical ethics and the right to humanitarian assistance, and claims full and unhindered freedom in the exercise of its functions.',
  'Members undertake to respect their professional code of ethics and maintain complete independence from all political, economic or religious powers.',
  'As volunteers, members understand the risks and dangers of the missions they carry out and make no claim for themselves or their assigns for any form of compensation other than that which the association might be able to afford them.',
];

export type Milestone = { year: string; text: string; lebanon?: boolean; featured?: boolean };

export const timeline: Milestone[] = [
  { year: '1971', featured: true, text: 'MSF is officially created on 22 December. Three hundred volunteers make up the organisation, including the 13 founding doctors and journalists.' },
  { year: '1972', featured: true, text: 'First mission, in Managua, Nicaragua, after an earthquake destroys most of the city.' },
  { year: '1974', text: 'A relief mission to Honduras after Hurricane Fifi causes major flooding.' },
  { year: '1975', text: 'The first large-scale medical programme, caring for Cambodians seeking sanctuary during a refugee crisis. The weaknesses of a young organisation become clear, and mark a turning point.' },
  { year: '1976', featured: true, lebanon: true, text: 'From 1976 until 1984, MSF is present in Beirut and other cities in Lebanon, treating all the war-wounded.' },
  { year: '1980', text: 'New leadership helps transform MSF into the professional organisation it is today.' },
  { year: '1984', featured: true, text: 'Faced with famine and the forced displacement of people, MSF teams speak out. In December 1985, one of the two MSF sections working in the country is expelled.' },
  { year: '1991', text: 'More than 300,000 Somalis die in the conflict. MSF condemns the inconsistency of the international strategy, as well as excesses committed by the military.' },
  { year: '1999', featured: true, text: 'MSF is awarded the Nobel Peace Prize in recognition of its pioneering humanitarian work on several continents.' },
  { year: '2003', text: 'MSF is a founding partner of the Drugs for Neglected Diseases initiative (DNDi).' },
  { year: '2006', featured: true, lebanon: true, text: 'Roads are damaged and an air and sea blockade cuts off Lebanon. MSF secures safe passage by sea and, with Greenpeace, brings 75 tonnes of supplies from Cyprus to Beirut.' },
  { year: '2008', featured: true, lebanon: true, text: 'A mental health centre opens in Bourj El-Barajneh, near one of Beirut’s largest Palestinian refugee camps. It marks the start of MSF’s continuous presence in Lebanon.' },
  { year: '2012', text: 'Millions of Syrians seek refuge as the humanitarian situation deteriorates across the region. MSF supports a growing number of medical facilities.' },
  { year: '2016', featured: true, text: 'MSF announces it will no longer take funds from the European Union and its Member States, in opposition to their deterrence policies against refugees and migrants.' },
  { year: '2019', featured: true, lebanon: true, text: 'The Lebanon office is created to expand MSF’s institutional presence in the MENA region.' },
  { year: '2020', featured: true, lebanon: true, text: 'COVID-19 becomes a worldwide pandemic. In Lebanon, MSF turns its hospital in Bar Elias, in the Bekaa Valley, into a COVID-19 facility and supports an isolation centre in Siblin.' },
  { year: '2023', featured: true, lebanon: true, text: 'Repeated escalations of war drive displacement and rising medical needs. MSF deploys 22 mobile medical teams across Beirut, Mount Lebanon, Baalbek-Hermel and Akkar.' },
];

export const lebanonChapters = [
  {
    label: '1976 – 2006',
    icon: 'history',
    title: 'Born in war',
    text: 'From 1976 our teams treated the war-wounded in Beirut. Later they supported the Bir Hassan dispensary, worked in Akkar and Jezzine, and in 2006 brought supplies by sea.',
    image: '/assets/news-1.jpg',
    alt: 'Water tanks and filtration equipment damaged in southern Lebanon.',
    position: '50% 55%',
  },
  {
    label: '2008 onwards',
    icon: 'heart',
    title: 'After the fighting, care continued',
    text: 'A mental health centre in Bourj El-Barajneh began our continuous presence. As the war in Syria pushed families into Lebanon, we widened our response, whatever people’s status.',
    image: '/assets/topic-amr.jpg',
    alt: 'An MSF staff member helps a patient on crutches walk down a hospital corridor.',
    position: '38% 50%',
  },
  {
    label: 'Since 2019',
    icon: 'activity',
    title: 'When healthcare became harder to reach',
    text: 'COVID-19, the Beirut port explosion and cholera in 2022 each struck a health system already under strain. Our teams adapted every time.',
    image: '/assets/topic-insulin.jpg',
    alt: 'Siwar, who lives with type 1 diabetes, holds up her insulin pen among her toys in Arsal, Lebanon.',
    position: '20% 45%',
  },
  {
    label: 'Today',
    icon: 'pin',
    title: 'The current response',
    text: 'With the Ministry of Public Health we support hospitals and primary healthcare centres through donations, fuel, trauma care and emergency interventions, and run a mental health helpline.',
    image: '/assets/topic-patient-safety.jpg',
    alt: 'An MSF team member talks with a patient outside a clinic.',
    position: '46% 40%',
  },
] as const;

export const officeActivities = [
  'World Antimicrobial Awareness Week (WAAW)',
  'IPC Week',
  'Ask Lara',
  'MSF SpeakInk',
  'Collaboration with Espitalia',
  'MSF at Universities',
  'Mish Impossible',
];
