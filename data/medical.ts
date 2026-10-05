/* Medical topics + Antimicrobial Resistance (AMR) content, taken word for word from the live pages:
   https://msf-lebanon.org/medical-topics/ and https://msf-lebanon.org/medical-topics/antimicrobial-resistance-amr/
   Images are the original uploads used on the live site (copied into /public/assets/medical/).
   Each block maps to one Elementor section. Where the live page hides text behind a "Read More" toggle,
   `more` holds that hidden text (Elementor: Toggle widget). */

const img = (f: string) => `/assets/medical/${f}`;

/* ───────── Medical topics landing page ───────── */
export const topicsHero = {
  /* Crossfading slideshow of the three topic photos */
  slides: ['/assets/topic-amr.jpg', '/assets/topic-insulin.jpg', '/assets/topic-patient-safety.jpg'],
};

/* ───────── AMR page ───────── */
export const amrHero = {
  image: img('amr-hero.jpg'),
  /* The live hero slide: MSF Political Action on AMR */
  kicker: 'MSF Political Action on AMR',
  text: 'MSF’s report “The Broken Lens: Antimicrobial Resistance in Humanitarian Settings”, follows on from the second UN High-Level Meeting on Antimicrobial Resistance, held on 26 September 2024.',
  fullText: 'MSF’s report “The Broken Lens: Antimicrobial Resistance in Humanitarian Settings”, follows on from the second UN High-Level Meeting on Antimicrobial Resistance, held on 26 September 2024, which aimed to “review progress on global, regional, and national efforts to tackle antimicrobial resistance, identify gaps, and invest in sustainable solutions to strengthen and accelerate multisector progress, building a healthier world based on equity and leaving no one behind.”',
  url: '/medical-topics/antimicrobial-resistance-amr/msf-political-action-on-amr/',
};

export const whatIsAmr = {
  title: 'What is Antimicrobial Resistance (AMR)',
  video: { youtubeId: '4Y6AFlOVncM', poster: img('video-4Y6AFlOVncM.jpg') },
  lead: 'It is a phenomenon that occurs when some bacteria, viruses, parasites and other microbes adapt to medical treatments so effectively that commonly used drugs to prevent or eliminate them are no longer effective, leading to drug-resistant infections.',
  /* Rendered with the "Murray study" link in the page */
  more: {
    before: 'According to a 2019 ',
    linkText: 'Murray study',
    linkUrl: 'https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(21)02724-0/fulltext',
    after: ', AMR was responsible for 1.27 million deaths worldwide, making it a leading global cause of mortality, with low-resource settings bearing the highest burdens.  AMR is an urgent global public health threat. It can affect individuals at any stage of life, as well as the healthcare, veterinary and agriculture industries. The direct consequences of infections caused by resistant microbes can be severe, resulting in increased morbidity, prolonged illnesses, extended hospital stays, higher costs and increased mortality.',
  },
  stat: { value: '1.27 million', label: 'deaths worldwide caused by AMR in 2019 (Murray study)' },
};

export const facts = {
  title: 'Facts About AMR',
  items: [
    { q: 'What Cause AMR Infections?', a: 'AMR infections are frequent in places where antibiotics are overused and misused. Without proper diagnostics, healthcare providers may not know if a patient’s symptoms are those of a bacterial infection, and if they are, which bacteria is involved. In contexts with limited access to healthcare, over-the-counter sale of antibiotics without a prescription is common. This can result in unnecessary antibiotic consumption. In hospitals with poor hygiene, resistant bacteria can spread, affecting vulnerable patients who are already sick or have unhealed wounds.' },
    { q: 'What are the symptoms of AMR?', a: 'AMR infections often go unrecognized in their early stages, since they usually cause the same clinical symptoms as antibiotic-sensitive infections. Typically, they are identified only after the patient’s symptoms persist despite treatment with appropriate first-line antibiotics.' },
    { q: 'How do you prevent AMR?', a: 'Infection prevention involves many different approaches, such as ensuring widescale population coverage with vaccines against infectious diseases, providing safe water and sanitation in communities and establishing effective infection control measures in hospitals and health clinics. When patients seek treatment for illnesses, doctors and health workers must avoid overusing antibiotics. Antibiotics should be prescribed by a clinician and provided by a pharmacy. Patients must also be aware that taking the prescribed dosage for the entire prescription period is of the utmost importance. Governments need to improve access to healthcare and healthcare infrastructure, such as microbiology laboratories that can accurately diagnose infections and point doctors to the correct prescription. Governments also need to better regulate over-the-counter sale of antibiotics.' },
    { q: 'How is AMR treated?', a: 'Patients with an AMR infection have fewer antibiotic treatment options. These options are generally more expensive, more complicated to administer (intravenously rather than orally) and often more toxic with numerous side effects. For many types of highly resistant infections, where no current antibiotics are effective, patients may be treated either with some antibiotics that are abandoned due to their potentially dangerous side effects, or with a combination of antibiotics that together to overcome the resistance. When no antibiotics work, and the infection is localized to a limb, amputation may be the only hope for saving the patient’s life.' },
  ],
};

/* The three video blocks */
export const forPatients = {
  title: 'What does it mean for patients',
  video: { youtubeId: 'Ll7lMgZOsb8', poster: img('video-Ll7lMgZOsb8.jpg') },
  lead: 'Patient’s life could take an unexpected turn when they contract an infection. With Riwa and Haydar, common antibiotics initially brought relief, but the infection returned relentlessly, and standard treatments proved futile due to antimicrobial resistance.',
  more: 'Resistant infections took a toll on both of their mental and physical health, causing constant pain and fatigue amidst uncertainty of effective treatment. Endless rounds of tests, consultations, and alternative medications heavily burdened them. The experience underscored the profound impact of AMR on an individual’s life. It was not a mere medical battle, but a personal journey marked by setbacks and resilience.',
};

export const humanitarian = {
  title: 'AMR in Humanitarian Context',
  video: { youtubeId: 'MQRkjkz-CP0', poster: img('video-MQRkjkz-CP0.jpg') },
  lead: 'In a humanitarian contexts, such as during emergencies, conflicts, or natural disasters, the challenges associated with AMR become even more pronounced. Here’s how AMR is relevant in a humanitarian context. AMR poses a heightened threat due to overcrowded conditions, limited healthcare access and disrupted supply chains. Challenges include increased disease spread, misuse of antibiotics, weakened health systems and population displacement.',
};

export const msfResponse = {
  title: 'How is MSF adressing AMR',
  video: { youtubeId: '5BoN3CgELbc', poster: img('video-5BoN3CgELbc.jpg') },
  lead: 'MSF has made an institutional commitment to comprehensively address AMR in the humanitarian contexts where we operate, through a range of actions centred on providing quality care to patients, adapting to health system and community realities and fostering countries’ engagement in policy change.',
  more: 'The strategy includes three pillars: infection prevention and control; antimicrobial stewardship; and expanded access to diagnostic and surveillance. In addition, MSF’s approach encompasses key transversal subjects: operational research, health promotion, learning and development, initiatives and innovations, analysis and advocacy, and prevention and vaccination.',
  /* The three pillars named in the text above, pulled out as cards */
  pillars: ['Infection prevention and control', 'Antimicrobial stewardship', 'Expanded access to diagnostic and surveillance'],
  report: { before: 'Learn more in MSF’s ', linkText: 'report of 2023 activities on AMR', url: 'https://www.doctorswithoutborders.org/latest/doctors-without-borders-releases-2023-activity-report-antimicrobial-resistance' },
};

export const politicalActions = {
  title: 'What political actions are needed on AMR',
  image: img('amr-actions.jpg'),
  alt: 'What political actions are needed on AMR',
  lead: 'AMR is a global issue that requires cooperation from all countries to prevent and slow its spread wherever it may emerge. It is crucial to expand the implementation of prevention strategies and antimicrobial stewardship, supported by microbiology. Equitable political and resourceful commitments are essential to ensure no one is left behind.',
  callsIntro: 'To achieve an equitable, global, and timely action on AMR, MSF calls for:',
  calls: [
    'Recognizing the impact and drivers of AMR in conflict-affected contexts and humanitarian crises.',
    'Provision of technical and financial support beyond what is currently available.',
    'Improving access to antimicrobials and diagnostics by tieing access conditions to the development of new antimicrobials and diagnostics, adopting pooled procurment, developing public research & development initiatives, and improving forcasting strategies.',
    'Shoring up foundations – such as implementation of infection, prevention and control, antimicrobial stewerdship, water, sanitation and hygene, vaccination and universal health coverage.',
  ],
  /* Last call ends with the Antibiogo link */
  lastCall: { text: 'Expanding access to microbiology and fostering innovation like mini-labs and ', linkText: 'Antibiogo', url: 'https://www.msf.org/antibiogo-revolutionary-application-tackle-antibiotic-resistance' },
};

export const roles = {
  title: 'Who has a role to play',
  lead: 'Addressing AMR requires active involvement from healthcare professionals, individuals, policymakers, and the broader community to preserve antibiotic effectiveness. Healthcare providers ensure responsible use, individuals follow prescribed regimens, and policymakers implement regulations, support research, and promote public health campaigns.',
  slides: [
    { image: img('role-opening.png'), alt: 'Reduce antimicrobial misuse: everyone has a role to play.' },
    { image: img('role-nurses-role.png'), alt: 'The nurse: makes sure to give patients the right dosage of antibiotics and promotes proper hygiene and infection prevention and control.' },
    { image: img('role-hps-role.png'), alt: 'The health promoter’s role in reducing antimicrobial misuse.' },
    { image: img('role-pharmacists-role.png'), alt: 'The pharmacist’s role in reducing antimicrobial misuse.' },
    { image: img('role-doctors-role.png'), alt: 'The doctor’s role in reducing antimicrobial misuse.' },
    { image: img('role-citizens-role.png'), alt: 'The citizen’s role in reducing antimicrobial misuse.' },
    { image: img('role-ending-english.png'), alt: 'Together we can reduce antimicrobial misuse.' },
  ],
};

export const publications = {
  title: 'Latest Publication',
  items: [
    { title: 'Overuse of antibiotics for urinary tract infections in pregnant refugees, Lebanon', text: 'A high proportion of pregnant women with suspected urinary tract infections from refugee camps unnecessarily received antibiotics. Including urine culture in diagnosis, which is affordable in Lebanon, would greatly reduce antibiotic overprescription.', url: 'https://pubmed.ncbi.nlm.nih.gov/38812803/', source: 'PubMed' },
    { title: 'Antimicrobial resistance in the ongoing Gaza: A Silent Threat', text: 'Conflicts and wars, such as those in Iraq and Syria, contribute substantially to the development and spread of antimicrobial resistance.1 In the Gaza Strip (or Gaza), such resistance is rising, with a 300% increase in resistance to specific antibiotics.', url: 'https://scienceportal.msf.org/assets/8581', source: 'MSF Science Portal' },
    { title: 'Antibiotic resistance in conflict settings: lessons learned in the Middle East', text: 'In the Middle East, some health systems have been severely damaged by conflict resulting in delayed access to care, crowded facilities and supply shortages. Microbiological surveillance data are rarely available, but when MSF laboratories are installed we often find MDR bacteria at alarming levels.', url: 'https://scienceportal.msf.org/assets/3980', source: 'MSF Science Portal' },
    { title: 'Post-traumatic osteomyelitis in Middle East war-wounded civilians: resistance to first-line antibiotics in selected bacteria over the decade 2006-2016', text: 'War-wounded civilians in Middle East countries are at risk of post-traumatic osteomyelitis (PTO). We aimed to describe and compare the bacterial etiology and proportion of first-line antibiotics resistant bacteria (FLAR) among PTO cases in civilians from Syria, Iraq and Yemen admitted to the reconstructive surgical program of Médecins Sans Frontières (MSF) in Amman, Jordan, and to identify risk factors for developing PTO with FLAR bacteria.', url: 'https://scienceportal.msf.org/assets/4777', source: 'MSF Science Portal' },
    { title: 'AI-based mobile application to fight antibiotic resistance', text: 'MSF presents an artificial intelligence (AI)-based, offline smartphone application for antibiogram analysis. The application captures images with the phone’s camera, and the user is guided throughout the analysis on the same device by a user-friendly graphical interface.', url: 'https://scienceportal.msf.org/assets/5182', source: 'MSF Science Portal' },
    { title: 'The Mini-Lab: accessible clinical bacteriology for low-resource settings', text: 'In 2019, MSF launched a first field trial of its Mini-Lab; a transportable, self-contained, quality assured, stand-alone clinical bacteriology laboratory that can be operated by inexperienced technicians and used in lower resource settings.', url: 'https://scienceportal.msf.org/assets/4055', source: 'MSF Science Portal' },
  ],
  more: { before: 'For more AMR related publications please check our ', linkText: 'Science portal', url: 'https://scienceportal.msf.org/assets/8581' },
};

/* Communication Resources + Media Coverage (two image cards) */
export const resources = [
  {
    tag: 'Communication Resources',
    title: 'AMR Sharing Hub',
    text: 'Explore our comprehensive AMR Awareness hub, a curated collection of compelling still images and impactful videos designed to enlighten and engage the general public. Delve into the world of antimicrobial resistance (AMR), gaining insights into its global impact, and the importance of responsible antibiotic use.',
    image: img('amr-sharing-hub.jpg'),
    alt: 'AMR Sharing Hub',
    url: '/antimicrobial-resistance-amr/amr-sharing-hub/',
    cta: 'Go to Sharing Hub Page',
  },
  {
    tag: 'Media Coverage',
    title: 'Media Coverage',
    text: 'This section features a collection of insightful interviews and discussions on antimicrobial resistance (AMR), featuring MSF experts in various local, regional, and global media. These engagements highlight the growing threat of AMR and showcase expert perspectives, field experiences, and key efforts in addressing this pressing public health issue.',
    image: img('amr-media-coverage.jpg'),
    alt: 'AMR media coverage with MSF experts',
    url: '/medical-topics/antimicrobial-resistance-amr/media-coverage/',
    cta: 'Go to Media Coverage Page',
  },
];

export const getInvolved = {
  title: 'Get Involved & Write Us',
  text: 'We’d love to hear from you! Share your thoughts, ideas, or even request a meeting to discuss initiatives or research on antimicrobial resistance (AMR). Together, let’s combat AMR and pave the way for a healthier future.',
  email: 'MSF-Lebanon-AMR-info@msf.org',
};
