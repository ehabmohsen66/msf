import type { ReactNode } from 'react';
import { Pill, ShieldCheck, Syringe } from 'lucide-react';

export interface HeroSlideAr {
  place: string;
  type: string;
  date: string;
  title: string;
  summary: string;
  url: string;
  image: string;
  alt: string;
  position: string;
}

export interface StoryAr {
  tag: string;
  title: string;
  date: string;
  url: string;
  image: string;
}

export interface FigureAr {
  image: string;
  alt: string;
  numericValue: number;
  label: string;
}

export interface FocusItemAr {
  group: 'crises' | 'creative';
  label: string;
  title: string;
  text: string;
  cta: string;
  url: string;
  image: string;
  alt: string;
  position: string;
}

export interface MedicalTopicAr {
  label: string;
  Icon: typeof Pill;
  title: string;
  text: string;
  cta: string;
  url: string;
  image: string;
  alt: string;
  position: string;
}

export interface ReportChapterAr {
  title: string;
  note: string;
  href: string;
  onPage?: boolean;
}

export const heroSlidesAr: HeroSlideAr[] = [
  {
    place: 'لبنان · البقاع',
    type: 'أصوات من الميدان',
    date: '20 آب/أغسطس 2026',
    title: 'حياة انقلبت في ظل الحرب',
    summary: 'في البقاع، يواجه الأشخاص الذين أُجبروا على ترك منازلهم العواقب المستمرة للنزاع، بينما تقدم فرقنا الرعاية الطبية والنفسية.',
    url: '/news/bekaa-where-lives-have-been-upheaved-in-the-shadow-of-war/',
    image: '/assets/hero.jpg',
    alt: 'أحد كوادر أطباء بلا حدود في مستشفى في لبنان',
    position: 'center top',
  },
  {
    place: 'لبنان · الجنوب',
    type: 'بيان صحفي',
    date: '7 أيلول/سبتمبر 2026',
    title: 'المياه شريان الحياة. يجب ألا يُعاقب سكان جنوب لبنان',
    summary: 'الأضرار التي لحقت بالبنية التحتية للمياه تعرّض المجتمعات المحلية لمخاطر بالغة وتحدّ من وصولهم إلى الخدمات الأساسية.',
    url: '/news/people-of-southern-lebanon-must-not-be-punished/',
    image: '/assets/news-1.jpg',
    alt: 'أضرار لحقت بشبكات المياه في جنوب لبنان',
    position: 'center',
  },
  {
    place: 'فلسطين · الخليل',
    type: 'بيان صحفي',
    date: '21 آب/أغسطس 2026',
    title: 'القيود تفاقم الاحتياجات الطبية في الخليل',
    summary: 'العنف المتصاعد وقيود التنقل المستمرة تمنع السكان من الوصول إلى الرعاية الصحية الأساسية في الضفة الغربية.',
    url: '/news/escalating-violence-and-movement-restrictions-continue-to-drive-medical-needs-in-hebron/',
    image: '/assets/news-3.jpg',
    alt: 'حاجز تفتيش في الخليل',
    position: 'center',
  },
];

export const storiesAr: StoryAr[] = [
  {
    tag: 'لبنان',
    title: 'المياه شريان الحياة: يجب ألا يُعاقب سكان جنوب لبنان',
    date: '7 أيلول/سبتمبر 2026',
    url: '/news/people-of-southern-lebanon-must-not-be-punished/',
    image: '/assets/news-1.jpg',
  },
  {
    tag: 'اليمن',
    title: 'أطفال يعانون من سوء التغذية يصلون إلى المستشفيات في حالة حرجة باليمن',
    date: '8 أيلول/سبتمبر 2026',
    url: '/news/malnourished-children-in-yemen/',
    image: '/assets/news-2.jpg',
  },
  {
    tag: 'فلسطين',
    title: 'تصاعد العنف وتقييد الحركة يستمران في تفاقم الاحتياجات الطبية بالخليل',
    date: '21 آب/أغسطس 2026',
    url: '/news/escalating-violence-and-movement-restrictions-continue-to-drive-medical-needs-in-hebron/',
    image: '/assets/news-3.jpg',
  },
  {
    tag: 'لبنان',
    title: 'البقاع: نشر عيادات متنقلة طارئة لدعم العائلات والنازحين',
    date: '18 آب/أغسطس 2026',
    url: '/news/bekaa-where-lives-have-been-upheaved-in-the-shadow-of-war/',
    image: '/assets/hero.jpg',
  },
  {
    tag: 'السودان',
    title: 'تقليص المساعدات يجبر العيادات على الإغلاق في أنحاء السودان',
    date: '9 أيلول/سبتمبر 2026',
    url: '/news/sudan-aid-cuts-force-widespread-clinic-closures/',
    image: '/assets/news/n06-sudan-clinics.png',
  },
  {
    tag: 'سوريا',
    title: 'تعزيز الوصول إلى الرعاية الصحية في درعا، سوريا',
    date: '16 أيلول/سبتمبر 2026',
    url: '/news/strengthening-healthcare-access-in-daraa-syria/',
    image: '/assets/news/n04-daraa-syria.png',
  },
  {
    tag: 'اليمن',
    title: 'شريان حياة للنساء والأطفال في مدينة المخا باليمن',
    date: '18 أيلول/سبتمبر 2026',
    url: '/news/lifeline-for-women-and-children-in-mocha-yemen/',
    image: '/assets/news/n03-mocha-lifeline.png',
  },
];

export const figuresDataAr: FigureAr[] = [
  {
    image: '/assets/figure-consultations.jpg',
    alt: 'فريق أطباء بلا حدود يفحص المرضى في مركز عبور',
    numericValue: 17071300,
    label: 'استشارة طبية خارجية',
  },
  {
    image: '/assets/figure-births.jpg',
    alt: 'ممرضة أطفال حديثي الولادة تفحص طفلاً في مستشفى الولادة',
    numericValue: 405000,
    label: 'ولادة تمت مساعدتها، بما فيها العمليات القيصرية',
  },
  {
    image: '/assets/figure-emergency.jpg',
    alt: 'أطباء منظمة أطباء بلا حدود يراجعون تقرير مريض',
    numericValue: 2941600,
    label: 'حالة دخول لأقسام الطوارئ',
  },
];

export const focusItemsAr: FocusItemAr[] = [
  {
    group: 'crises',
    label: 'استجابة للطوارئ',
    title: 'استجابة أطباء بلا حدود لحرب لبنان',
    text: 'كيف كثفت فرقنا الرعاية الطبية مع تصاعد القصف وحركات النزوح في مختلف مناطق لبنان.',
    cta: 'اقرأ تقرير الاستجابة',
    url: '/news/lebanon-msf-scales-up-response-as-displacement-rises-across-the-country/',
    image: '/assets/focus-lebanon.png',
    alt: 'أفراد من طواقم أطباء بلا حدود بسترات رسمية يتحدثون مع نازحين خارج مركز إيواء في لبنان.',
    position: '38% 30%',
  },
  {
    group: 'crises',
    label: 'استجابة للطوارئ',
    title: 'حرب غزة',
    text: 'القيود المفروضة على الغذاء والمساعدات تفاقم سوء التغذية، والمواليد الجدد والنساء الحوامل هم الأكثر تضرراً.',
    cta: 'اقرأ القصة الميدانية',
    url: '/news/gazas-man-made-malnutrition-crisis/',
    image: '/assets/focus-gaza.png',
    alt: 'ممرض أطباء بلا حدود محمد شحادة يتفقد مولوداً في حاضنة بمستشفى الحلو في غزة.',
    position: '50% 40%',
  },
  {
    group: 'crises',
    label: 'مكافحة الأوبئة',
    title: 'إيبولا',
    text: 'توسيع نطاق الاستجابة في مقاطعة إيتوري، جمهورية الكونغو الديمقراطية، مع جعل سلامة الكوادر والمرضى أولوية.',
    cta: 'اقرأ تفاصيل الاستجابة',
    url: '/news/ebola-and-drc-msf-responds-to-ituri-outbreak/',
    image: '/assets/focus-ebola.png',
    alt: 'عامل صحي يرتدي بدلة وقاية بيولوجية كاملة وشعار أطباء بلا حدود في مركز إيبولا في بونيا.',
    position: '50% 25%',
  },
  {
    group: 'creative',
    label: 'مشروع إبداعي',
    title: 'ضربة فرشاة مع الذاكرة',
    text: 'ثلاث نساء نزحن بسبب الحرب في لبنان يشاركن ذكريات الوطن والفقد والأمل والصمود.',
    cta: 'اكتشف القصص',
    url: 'https://msf-lebanon.org/ar/news-events/news-stories/a-brush-with-memory-between-home-and-displacement/',
    image: '/assets/focus-brush.png',
    alt: 'رسم توضيحي لامرأة ترتدي حجاباً وتجلس بجوار مدفأة حطب في غرفة المعيشة.',
    position: '50% 35%',
  },
];

export const medicalTopicsAr: MedicalTopicAr[] = [
  {
    label: 'مركز التوعية',
    Icon: Pill,
    title: 'مقاومة مضادات الميكروبات',
    text: 'كيف يؤدي سوء استخدام المضادات الحيوية إلى تفشي عدوى تعجز الأدوية عن علاجها، وما هو دور كل منا للحد من هذه الظاهرة.',
    cta: 'استكشف مركز التوعية',
    url: '/medical-topics/antimicrobial-resistance-amr',
    image: '/assets/topic-amr.jpg',
    alt: 'أحد كوادر أطباء بلا حدود يساعد مريضاً على المشي بعكازين في ممر المستشفى.',
    position: '38% 50%',
  },
  {
    label: 'دليل عملي',
    Icon: Syringe,
    title: 'دليل الوصول إلى الأنسولين',
    text: 'أماكن توفر الأنسولين في لبنان، خطوط الطوارئ الساخنة، مجتمعات دعم المرضى، وتطبيق مجاني للمتعايشين مع السكري.',
    cta: 'ابحث عن الأنسولين',
    url: '/medical-topics/msf-lebanon-insulin-access-resource',
    image: '/assets/topic-insulin.jpg',
    alt: 'طفلة مصابة بالسكري ترفع قلم الأنسولين بين ألعابها في عرسال، لبنان.',
    position: '20% 45%',
  },
  {
    label: '17 أيلول/سبتمبر',
    Icon: ShieldCheck,
    title: 'اليوم العالمي لسلامة المرضى',
    text: 'رعاية آمنة للأشخاص المتعايشين مع أمراض مزمنة، وكيف تكيّف فرقنا الطبية التدابير مع واقع مصر ولبنان.',
    cta: 'اقرأ القصة الميدانية',
    url: '/medical-topics/world-patient-safety-day',
    image: '/assets/topic-patient-safety.jpg',
    alt: 'فريق أطباء بلا حدود يتحدث مع مريض خارج عيادة صحية.',
    position: '46% 40%',
  },
];

export const reportChaptersAr: ReportChapterAr[] = [
  { title: 'الكلمة الافتتاحية', note: 'لماذا لم تكن سد الثغرات في 2025 مهمتنا وحدنا', href: '/news/international-activity-report-2025#iar-foreword' },
  { title: 'عام 2025 في ميزان المراجعة', note: 'أين كانت الاحتياجات أكبر، وكيف استجابت فرقنا الميدانية', href: '/news/international-activity-report-2025#iar-review' },
  { title: 'تقارير خاصة وميدانية', note: 'غزة، أوكرانيا والاستجابة لتفشي إيبولا في إيتوري', href: '/news/international-activity-report-2025#iar-features' },
  { title: 'حقائق وأرقام', note: 'الاستشارات الطبية والولادات ورعاية الطوارئ', href: '#msf-in-numbers', onPage: true },
  { title: 'أنشطتنا حول العالم', note: 'استكشف جميع الدول الـ 72 على الخريطة التفاعلية', href: '#where-we-work', onPage: true },
  { title: 'التقرير المالي الدولي', note: 'كيف يُستخدم كل تبرع نتلقاه بشفافية ومسؤولية', href: '/news/international-activity-report-2025#iar-financial-report' },
];

export const arabicCountriesMap: Record<number, string> = {
  24: 'أنغولا',
  854: 'بوركينا فاسو',
  108: 'بوروندي',
  120: 'الكاميرون',
  140: 'جمهورية أفريقيا الوسطى',
  148: 'تشاد',
  178: 'جمهورية الكونغو',
  384: 'ساحل العاج',
  180: 'جمهورية الكونغو الديمقراطية',
  232: 'إريتريا',
  231: 'إثيوبيا',
  324: 'غينيا',
  404: 'كينيا',
  434: 'ليبيا',
  450: 'مدغشقر',
  454: 'مالاوي',
  466: 'مالي',
  508: 'موزمبيق',
  562: 'النيجر',
  566: 'نيجيريا',
  694: 'سيراليون',
  706: 'الصومال',
  710: 'جنوب أفريقيا',
  728: 'جنوب السودان',
  729: 'السودان',
  834: 'تنزانيا',
  800: 'أوغندا',
  716: 'زيمبابوي',
  4: 'أفغانستان',
  50: 'بنغلاديش',
  116: 'كمبوديا',
  356: 'الهند',
  360: 'إندونيسيا',
  417: 'قرغيزستان',
  458: 'ماليزيا',
  104: 'ميانمار',
  586: 'باكستان',
  598: 'بابوا غينيا الجديدة',
  608: 'الفلبين',
  764: 'تايلاند',
  795: 'تركمانستان',
  860: 'أوزبكستان',
  818: 'مصر',
  368: 'العراق',
  400: 'الأردن',
  422: 'لبنان',
  275: 'فلسطين',
  760: 'سوريا',
  887: 'اليمن',
  51: 'أرمينيا',
  112: 'بيلاروس',
  300: 'اليونان',
  380: 'إيطاليا',
  642: 'رومانيا',
  643: 'روسيا',
  703: 'سلوفاكيا',
  792: 'تركيا',
  804: 'أوكرانيا',
  76: 'البرازيل',
  170: 'كولومبيا',
  320: 'غواتيمالا',
  332: 'هايتي',
  340: 'هندوراس',
  484: 'المكسيك',
  591: 'بنما',
  604: 'بيرو',
  862: 'فنزويلا',
};
