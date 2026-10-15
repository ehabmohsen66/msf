import { runnerStrokes } from '@/components/msf-runner-strokes';

const roles = [
  'أطباء وجراحون',
  'ممرضون وقابلات',
  'خبراء لوجستيون',
  'صيادلة',
  'متخصصو صحة نفسية',
  'إداريون وماليون',
];

function StillRunner() {
  return (
    <svg className="careers-eyebrow-runner" viewBox="-1 -1 91 70" aria-hidden="true" focusable="false" style={{ transform: 'scaleX(-1)' }}>
      {runnerStrokes.map(s => <path key={s.id} d={s.d} transform={s.transform} />)}
    </svg>
  );
}

export default function CareersIntroAr() {
  return (
    <div className="careers-intro" dir="rtl">
      <div>
        <p className="eyebrow careers-eyebrow">
          <StillRunner />
          اعمل معنا
        </p>
        <h2 id="careers-heading-ar" className="careers-title">
          مهاراتك<br />تصنع الفرق وتنقذ الأرواح.
        </h2>
      </div>
      <div className="careers-intro-copy">
        <p>
          من أجنحة المستشفيات إلى مرافق الرعاية الميدانية في حالات الطوارئ، يعمل المتخصصون في المجال الطبي وغير الطبي جنباً إلى جنب لتقديم رعاية صحية مستقلة أينما كانت الحاجة ماسة.
        </p>
        <p className="careers-roles-label">نحن نوظّف</p>
        <ul className="careers-roles">
          {roles.map(r => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
