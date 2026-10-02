import { runnerStrokes } from '@/components/msf-runner-strokes';

const roles = ['Doctors & surgeons', 'Nurses & midwives', 'Logisticians', 'Pharmacists', 'Mental health', 'Administrators'];

/* The plain running man from the logo, used small in front of "Work with MSF". */
function StillRunner() {
  return (
    <svg className="careers-eyebrow-runner" viewBox="-1 -1 91 70" aria-hidden="true" focusable="false">
      {runnerStrokes.map(s => <path key={s.id} d={s.d} transform={s.transform} />)}
    </svg>
  );
}

export default function CareersIntro() {
  return (
    <div className="careers-intro">
      <div>
        <p className="eyebrow careers-eyebrow"><StillRunner />Work with MSF</p>
        <h2 id="careers-heading" className="careers-title">Your skills<br />can save lives.</h2>
      </div>
      <div className="careers-intro-copy">
        <p>From hospital wards to emergency field hospitals, medical and non-medical professionals work side by side to deliver independent healthcare where it is needed most.</p>
        <p className="careers-roles-label">We recruit</p>
        <ul className="careers-roles">
          {roles.map(r => <li key={r}>{r}</li>)}
        </ul>
      </div>
    </div>
  );
}
