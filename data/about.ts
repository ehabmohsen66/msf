/* About us content, taken word for word from the live msf-lebanon.org pages:
   About Us (hub), About Us > MSF History, What we do > MSF in Lebanon, What we do > MSF in the Field.
   Images are the same files used on the live site (copied into /public/assets/about/).
   When moving to WordPress, each block below maps to one Elementor section (see the build guide). */

const img = (f: string) => `/assets/about/${f}`;

/* Hero slideshow: the five slides from the MSF History page */
export const heroSlides = ['msf1.jpg', 'msf2.jpg', 'msf4.jpg', 'msf5.jpg', 'msf6.jpg'].map(img);

/* About Us hub intro */
export const hubIntro =
  'Médecins Sans Frontières (MSF) translates to Doctors without Borders. We provide medical assistance to people affected by conflict, epidemics, disasters, or exclusion from healthcare.';

/* MSF History: who we are */
export const whoWeAre = {
  image: img('msfmovement1.jpg'),
  paragraphs: [
    'MSF was created in the belief that all people should have access to healthcare regardless of gender, race, religion, creed or political affiliation, and that people’s medical needs outweigh respect for national boundaries. MSF’s principles of action are described in our charter, which established a framework for our activities.',
    'MSF was founded in 1971 in Paris by a group of journalists and doctors. Today, we are a worldwide movement of nearly 65,000 people.',
  ],
};

/* Figures quoted on the live About pages */
export const stats = [
  { value: 1971, label: 'Founded in Paris by a group of journalists and doctors', plain: true },
  { value: 65000, label: 'People in our worldwide movement', prefix: '~' },
  { value: 70, label: 'Countries where MSF provides medical humanitarian assistance', suffix: '+' },
  { value: 95, label: 'Of our funding comes from individual private donors', prefix: '>', suffix: '%' },
];

/* MSF Charter */
export const charter = {
  intro: 'All of its members agree to honour the following principles',
  items: [
    'MSF provides assistance to populations in distress, to victims of natural or man-made disasters and to victims of armed conflict. They do so irrespective of race, religion, creed or political convictions.',
    'MSF observes neutrality and impartiality in the name of universal medical ethics and the right to humanitarian assistance and claims full and unhindered freedom in the exercise of its functions.',
    'Members undertake to respect their professional code of ethics and maintain complete independence from all political, economic or religious powers.',
    'As volunteers, members understand the risks and dangers of the missions they carry out and make no claim for themselves or their assigns for any form of compensation other than that which the association might be able to afford them.',
  ],
  complementary:
    'Complementary to the Charter, two core documents define our ways of working and guiding principles by exploring the concepts of proximity to patients, quality medical care, and témoignage - or bearing witness.',
  documents: [
    { label: 'Chantilly Principles', url: 'https://www.msf.org/sites/default/files/Principles%20Chantilly%20EN.pdf' },
    { label: 'La Mancha Agreement', url: 'https://www.msf.org/sites/default/files/La%20Mancha%20Agreement%20EN.pdf' },
  ],
};

/* Our History: intro + "MSF Timeline" video */
export const historyIntro = {
  image: img('Biafra-Nigeria.jpg'),
  video: { youtubeId: '0H5Wwb-wp0g', title: 'MSF Timeline', poster: img('timeline-video.jpg') },
  paragraphs: [
    'Médecins Sans Frontières (MSF) was founded in 1971 in France by a group of doctors and journalists in the wake of war and famine in Biafra, Nigeria. Their aim was to establish an independent organisation that focuses on delivering emergency medicine aid quickly, effectively and impartially.',
    'Three hundred volunteers made up the organisation when it was founded: doctors, nurses and other staff, including the 13 founding doctors and journalists.',
    'Our teams are made up of tens of thousands of health professionals, logistic and administrative staff - bound together by our charter. Our actions are guided by medical ethics and the principles of impartiality, independence and neutrality. We are a non-profit, self-governed, member-based organisation.',
  ],
};

/* Timeline: the same six groups and images as the live page */
export type Milestone = { year: string; text: string[]; lebanon?: boolean };
export type Era = { label: string; image: string; alt: string; items: Milestone[] };

export const eras: Era[] = [
  {
    label: '1971 – 1975',
    image: img('FoundingMSF.jpg'),
    alt: 'Black and white photo of an early MSF meeting around a table.',
    items: [
      { year: '1971', text: ['MSF is officially created on 22 December 1971. At the time, 300 volunteers make up the organisation: doctors, nurses and other staff, including the 13 founding doctors and journalists.'] },
      { year: '1972', text: ['MSF’s first mission in 1972, is in Managua, Nicaragua’s capital, and follows an earthquake which destroyed most of the city and killed between 10,000 and 30,000 people.'] },
      { year: '1974', text: ['In 1974, MSF sets up a relief mission to help the people of Honduras after Hurricane Fifi causes major flooding and kills thousands of people.'] },
      { year: '1975', text: ['In 1975, MSF establishes its first large-scale medical programme during a refugee crisis, providing medical care for the waves of Cambodians seeking sanctuary from Pol Pot’s oppressive rule. In these first missions, the weaknesses of MSF as a new humanitarian organisation become readily apparent: preparation is lacking, doctors are left unsupported and supply chains are tangled. It marks a turning point and the movement begins to fracture.'] },
    ],
  },
  {
    label: '1976 – 1979',
    image: img('msfinlebanon1975.jpg'),
    alt: 'Black and white photo of MSF medical staff in Lebanon.',
    items: [
      { year: '1976', lebanon: true, text: ['From 1976 and until 1984, MSF is present in Beirut and other cities in Lebanon to treat all war-wounded. Each day, the team treats patients injured by shrapnel or bullets. Broken limbs and burns are also looked after. Materials and tools are insufficient or inadequate for the medical teams; there are no X-rays, no electric instruments, no ventilator, and no possibility to conduct extensive medical exams. The capacity to do blood transfusions is also limited.'] },
      { year: '1979', text: ['Throughout the 1970s and led by Dr Claude Malhuret and Dr Francis Charhon, MSF begins to move beyond sending doctors to crisis zones in favour of creating a more structured organisation. Co-founder Dr Bernard Kouchner doesn’t agree with the evolution and leaves MSF to start another organisation called Médecins du Monde.'] },
    ],
  },
  {
    label: '1980 – 1991',
    image: img('realist-leadership-of-MSF.jpg'),
    alt: 'Black and white photo of MSF leaders in the 1980s.',
    items: [
      { year: '1980', text: ['From this point, the new “realist” leadership of MSF - spearheaded by Claude Malhuret and Rony Brauman - helps transform MSF into the professional organisation it is today.'] },
      { year: '1984', text: ['In August, 50 people die each day of hunger, while thousands wait for food distribution. It takes months for the government to call it a “famine”. When the government starts to forcibly displace populations and divert humanitarian aid, MSF teams know that there is no other possible choice but to speak out. In December 1985, one of the two MSF sections working in the country is expelled.'] },
      { year: '1991', text: ['More than 300,000 Somalis die in the conflict. On 9 December 1992, the US army lands on the beaches of Mogadishu to restore order and distribute food aid. Faced with the prospect of getting stuck in an endless conflict, the US hands over to the UN blue helmets. MSF condemns the inconsistency of this strategy, as well as the excesses committed by the military. In 1992, MSF alerts the international community to the widespread famine in the country.'] },
    ],
  },
  {
    label: '1999 – 2002',
    image: img('msfnobleprize.jpg'),
    alt: 'Dr James Orbinski speaks at the Nobel Peace Prize ceremony in 1999.',
    items: [
      { year: '1999', text: ['MSF is awarded the Nobel Peace Prize “in recognition of the organisation’s pioneering humanitarian work on several continents” and to honour our medical staff who have treated tens of millions of people. Using his acceptance speech, Dr James Orbinski, president of the then-MSF International Council, speaks directly to the then-Russian leader Boris Yeltsin and condemns Russian violence against civilians in Chechnya.'] },
      { year: '2002', text: [
        'In the spring of 2002, MSF conducts an exploratory mission in Bunjei; one in three children suffers from acute malnutrition and more than a thousand fresh graves are found.',
        'MSF calls for other humanitarian organisations, donors and the government to help. More than 9,000 severely malnourished children and 20,000 moderately malnourished children are treated. Some 200 international volunteers and more than 2,200 national staff take part in this intervention.',
      ] },
    ],
  },
  {
    label: '2003 – 2012',
    image: img('msfdndi.jpg'),
    alt: 'Speakers at the launch of the Drugs for Neglected Diseases initiative.',
    items: [
      { year: '2003', text: ['MSF is a founding partner in a new initiative to undertake drug development for neglected diseases, the Drugs for Neglected Diseases initiative (DNDi).'] },
      /* The live page repeats the 2003 sentence at the start of 2006 (copy-paste slip); it is removed here. */
      { year: '2006', text: ['In order to cope with the constant growth of its activities, budgets and sections, MSF devotes an entire year to a series of internal consultations and debates. The result is a series of plans to improve MSF’s decision-making processes and governance structures as a movement and as an association. La Mancha Agreement outlines aspects of our action on which we agree and feel are indispensable.'] },
      { year: '2012', text: ['The humanitarian situation is deteriorating across the region. Millions of Syrians seek refuge, but the aid and medical assistance they receive is not sufficient. In early 2014, five MSF employees are kidnapped in Syria. Later that year, MSF decides to withdraw from territories controlled by the Islamic State group. Since 2011, MSF supports a growing number of medical facilities in some of the areas worst affected by conflict.'] },
    ],
  },
  {
    label: '2016 – 2020',
    image: img('msfin2006-1.jpg'),
    alt: 'MSF representatives at a press conference.',
    items: [
      { year: '2016', text: ['In June MSF announces that it will no longer take funds from the European Union and Member States, in opposition to their damaging deterrence policies against refugees and migrants and intensifying attempts to push people and their suffering away from European shores. This decision takes immediate effect and is applied to our projects worldwide.'] },
      { year: '2019', lebanon: true, text: ['The Lebanon office was created in response to a growing need for expanding MSF\'s institutional presence in the MENA region.'] },
      { year: '2020', text: ['An outbreak of a new coronavirus turns into a worldwide pandemic, with COVID-19 infecting nearly 85 million people and claiming nearly 2 million lives in 2020 alone. Amid mounting challenges, MSF teams race to ensure access to healthcare is maintained for people, and respond to the pandemic – in both the countries we work in and countries we’ve never had to respond in before. We also urge pharmaceutical companies not to profit off the pandemic and ensure fair and equitable vaccine allocation.'] },
    ],
  },
];

/* Our Principles: same titles, order and icons as the live page.
   On the live page three descriptions sit under the wrong titles (Bearing witness / Impartiality / Independence);
   each text is placed here under the principle it actually describes. */
export const principles = [
  { title: 'Bearing witness', icon: img('Group-3596.svg'), text: 'Neutrality is not synonymous with silence. Our proximity to people in distress implies a duty to raise awareness on their plight to ultimately help improve their situation. We may seek to bring attention to extreme need and suffering, when access to lifesaving medical care is hindered, when our teams witness extreme acts of violence, when crises are neglected, or when the provision of aid is abused.' },
  { title: 'Impartiality', icon: img('noun_Scale_186290.svg'), text: 'We offer assistance to people based on need. It doesn’t matter which country they are from, which religion they belong to, or what their political affiliations are. We give priority to those in the most serious and immediate danger.' },
  { title: 'Neutrality', icon: img('Group-3594.svg'), text: 'We do not take sides in armed conflicts nor support the agendas of warring parties. Sometimes we are not present on all sides to the conflict; this may be because access is denied to us, or due to insecurity, or because the main needs of the population are already covered.' },
  { title: 'Transparency', icon: img('Group-3597.svg'), text: 'We take responsibility of accounting for our actions to our patients and donors, and being transparent on the choices we make. Evaluations, critical reviews and debate on our field practices, our public positioning and on wider humanitarian issues, are necessary to improve what we do.' },
  { title: 'Independence', icon: img('Group-3593.svg'), text: 'Our decision to offer assistance is based on our evaluation of medical needs, independent of political, economic or religious interests. Our independence is rooted in our funding; over 95 per cent comes from individual private donors giving small amounts. We strive to freely evaluate needs, access populations without restriction, and to directly deliver the aid we provide.' },
];

/* What we do > MSF in Lebanon */
export const lebanonCards = [
  {
    title: 'Medical & Humanitarian Activities in Lebanon',
    text: 'The country which hosts over 850,000 registered Syrian refugees – has continued to crumble in recent years due to social and political unrest, economic collapse, and the Beirut blast.',
    image: img('Copy-of-News-Featured-Image-1.png'),
    alt: 'MSF staff at an outreach tent on the Lebanese coast.',
    url: '/what-we-do/msf-in-the-field/mena/lebanon/',
    tag: 'Lebanon',
  },
  {
    title: 'MSF Office in Lebanon',
    text: 'The Lebanon office was created in 2019 in response to a growing need for expanding MSF\'s institutional presence in the MENA region.',
    image: img('cover.png'),
    alt: 'An MSF staff member speaks to an audience at a public session.',
    url: '/about-us/msf-office-in-lebanon/',
    tag: 'Beirut office',
  },
];

/* What we do > MSF in the Field */
export const fieldBanner = { image: img('Lebanon-2020-1-.png'), alt: 'MSF staff walk through a narrow alley in Lebanon.' };
export const fieldCards = [
  {
    title: 'Middle East and North Africa',
    text: 'MSF run operations in more than 10 countries in the MENA region',
    image: img('MENA.jpg'),
    alt: 'MSF teams distribute relief items at a camp.',
    url: '/what-we-do/msf-in-the-field/mena/',
    tag: 'MENA',
  },
  {
    title: 'Worldwide',
    text: 'MSF provides medical humanitarian assistance in more than 70 countries around the world',
    image: img('worldwide.jpg'),
    alt: 'An MSF worker attends to a young child.',
    url: '/what-we-do/msf-in-the-field/worldwide/',
    tag: 'Worldwide',
  },
];
