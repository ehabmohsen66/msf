'use client';

import { useRef, useState } from 'react';
import { ArrowLeft, Minus, Plus, RotateCcw, Search } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import countries from '@/data/countries.json';
import shapes from '@/data/map-shapes.json';
import { arabicCountriesMap } from '@/data/ar/home';

const regions = [
  ['all', 'جميع المناطق'],
  ['africa', 'أفريقيا'],
  ['asia', 'آسيا والمحيط الهادئ'],
  ['mena', 'الشرق الأوسط وشمال أفريقيا'],
  ['europe', 'أوروبا وآسيا الوسطى'],
  ['americas', 'الأمريكتان'],
];

const countryByCode = new Map(countries.map(c => [c.code, c]));
const shapeByCode = new Map(shapes.map(s => [s.id, s]));

// Add Arabic name property for sorting and searching
const localizedCountries = countries.map(c => ({
  ...c,
  arName: arabicCountriesMap[c.code] || c.name,
}));

const sortedCountries = [...localizedCountries].sort((a, b) => a.arName.localeCompare(b.arName, 'ar'));
const defaultView = { x: 500, y: 260, scale: 1 };

export default function WorldMapAr() {
  const [region, setRegion] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<number | null>(422);
  const [view, setView] = useState(defaultView);
  const drag = useRef<{ x: number; y: number; viewX: number; viewY: number; width: number; scale: number; moved: boolean } | null>(null);

  const q = query.trim().toLowerCase();
  const visible = sortedCountries.filter(c =>
    (region === 'all' || c.region === region) &&
    (c.arName.toLowerCase().includes(q) || c.name.toLowerCase().includes(q))
  );
  const visibleCodes = new Set(visible.map(c => c.code));
  const country = selected === null ? null : localizedCountries.find(c => c.code === selected);
  const selectedShape = selected === null ? null : shapeByCode.get(selected);

  function selectCountry(code: number) {
    if (drag.current?.moved) return;
    setSelected(code);
    const shape = shapeByCode.get(code);
    if (shape) {
      const [[x0, y0], [x1, y1]] = shape.bounds;
      setView({
        x: (x0 + x1) / 2,
        y: (y0 + y1) / 2,
        scale: Math.max(1.5, Math.min(6, 0.55 / Math.max((x1 - x0) / 1000, (y1 - y0) / 520))),
      });
    }
  }

  function changeRegion(value: unknown) {
    setRegion(String(value));
    setSelected(null);
    setView(defaultView);
  }

  function changeQuery(value: string) {
    setQuery(value);
    setSelected(null);
    setView(defaultView);
  }

  function reset() {
    setRegion('all');
    setQuery('');
    setSelected(422);
    setView(defaultView);
  }

  const mapContent = (
    <div className="map-layout" dir="rtl">
      <div>
        <div className="map-stage">
          <svg
            viewBox={`${view.x - 500 / view.scale} ${view.y - 260 / view.scale} ${1000 / view.scale} ${520 / view.scale}`}
            role="group"
            aria-label="خريطة العالم لأنشطة أطباء بلا حدود"
            onPointerDown={e => {
              if (e.button !== 0) return;
              drag.current = {
                x: e.clientX,
                y: e.clientY,
                viewX: view.x,
                viewY: view.y,
                width: e.currentTarget.getBoundingClientRect().width,
                scale: view.scale,
                moved: false,
              };
            }}
            onPointerMove={e => {
              const d = drag.current;
              if (!d || e.buttons !== 1) return;
              if (Math.abs(e.clientX - d.x) + Math.abs(e.clientY - d.y) > 5) {
                d.moved = true;
                e.currentTarget.setPointerCapture(e.pointerId);
                setView(v => ({
                  ...v,
                  x: Math.max(0, Math.min(1000, d.viewX - (e.clientX - d.x) * 1000 / d.width / d.scale)),
                  y: Math.max(0, Math.min(520, d.viewY - (e.clientY - d.y) * 1000 / d.width / d.scale)),
                }));
              }
            }}
            onPointerUp={() => {
              setTimeout(() => {
                drag.current = null;
              }, 0);
            }}
            onPointerCancel={() => {
              drag.current = null;
            }}
          >
            <title>أنشطة أطباء بلا حدود حول العالم</title>
            {shapes.map((shape, idx) => {
              const id = shape.id;
              const c = id != null ? localizedCountries.find(x => x.code === id) : undefined;
              const active = id != null ? visibleCodes.has(id) : false;
              return (
                <path
                  key={id ?? idx}
                  d={shape.d ?? ''}
                  className={`map-land ${c ? 'map-country' : ''} ${c && !active ? 'map-dimmed' : ''} ${selected === id ? 'map-selected' : ''}`}
                  role={active ? 'button' : undefined}
                  tabIndex={active ? 0 : undefined}
                  aria-label={active ? `استكشف أنشطة أطباء بلا حدود في ${c?.arName}` : undefined}
                  aria-pressed={active ? selected === id : undefined}
                  onClick={() => {
                    if (active && id != null) selectCountry(id);
                  }}
                  onKeyDown={e => {
                    if (active && id != null && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      selectCountry(id);
                    }
                  }}
                >
                  <title>{c?.arName ?? shape.name}</title>
                </path>
              );
            })}
            {selectedShape && country ? (
              <g pointerEvents="none">
                <circle cx={selectedShape.center[0]} cy={selectedShape.center[1]} r={7 / view.scale} fill="white" stroke="#e60000" strokeWidth={2 / view.scale} />
                <circle cx={selectedShape.center[0]} cy={selectedShape.center[1]} r={2.3 / view.scale} fill="#e60000" />
              </g>
            ) : null}
          </svg>
          <div className="map-controls">
            <button type="button" aria-label="تكبير الخريطة" disabled={view.scale >= 8} onClick={() => setView(v => ({ ...v, scale: Math.min(8, v.scale * 1.5) }))}>
              <Plus size={19} />
            </button>
            <button type="button" aria-label="تصغير الخريطة" disabled={view.scale <= 1} onClick={() => setView(v => ({ ...v, scale: Math.max(1, v.scale / 1.5) }))}>
              <Minus size={19} />
            </button>
            <button type="button" aria-label="إعادة تعيين الخريطة والفلاتر" onClick={reset}>
              <RotateCcw size={17} />
            </button>
          </div>
        </div>
        <div className="map-legend">
          <span><i />دول تشملها خريطة الأنشطة</span>
          <span><i className="muted-swatch" />دول ومناطق أخرى</span>
          <span>اسحب للتحريك · استخدم + للتكبير</span>
        </div>
      </div>
      <aside className="map-panel">
        <div className="map-selection" aria-live="polite">
          {country ? (
            <>
              <p className="eyebrow">{regions.find(r => r[0] === country.region)?.[1]}</p>
              <h3>{country.arName}</h3>
              <p>
                {country.code === 422
                  ? 'استكشف عملنا الطبي الإنساني في لبنان والمجتمعات التي تدعمها فرقنا الميدانية.'
                  : `استكشف عمل أطباء بلا حدود الطبي الإنساني في ${country.arName}.`}
              </p>
              <a className="text-link" href={country.code === 422 ? 'https://msf-lebanon.org/ar/اطباء-بلا-حدود-في-لبنان/' : country.url}>
                عملنا في {country.arName} <ArrowLeft size={19} />
              </a>
            </>
          ) : (
            <>
              <p className="eyebrow">استكشف أنشطتنا</p>
              <h3>{visible.length === 0 ? 'لم يتم العثور على دول' : 'اختر دولة'}</h3>
              <p>
                {visible.length === 0
                  ? 'جرّب البحث باسم دولة أخرى أو اختر منطقة جغرافية مختلفة.'
                  : 'حدد دولة مظللة على الخريطة أو اختر من القائمة أدناه.'}
              </p>
            </>
          )}
        </div>
        <div className="country-list-heading">
          <span>{visible.length} {visible.length === 1 ? 'دولة' : 'دولة'}</span>
          <span>ترتيب أبجدي</span>
        </div>
        <ul className="map-country-list" aria-label="قائمة الدول المطابقة">
          {visible.map(c => (
            <li key={c.code}>
              <button type="button" aria-pressed={selected === c.code} onClick={() => selectCountry(c.code)}>
                <span>{c.arName}</span>
                <ArrowLeft size={14} />
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );

  return (
    <section className="world-section wrap" id="where-we-work" aria-labelledby="map-heading-ar" dir="rtl">
      <div className="section-heading">
        <div>
          <p className="eyebrow">أين نعمل</p>
          <h2 id="map-heading-ar">أنشطتنا الطبية حول العالم</h2>
        </div>
        <a className="text-link" href="https://www.msf.org/international-activity-report-2025">
          استكشف تقرير 2025 الدولي <ArrowLeft size={19} />
        </a>
      </div>
      <p className="map-intro">
        من لبنان إلى مختلف مناطق العالم، تقدم فرقنا الرعاية الطبية الحيوية للأشخاص في أوقات الأزمات. استكشف الدول بحسب المنطقة أو ابحث بالاسم.
      </p>
      <Tabs value={region} onValueChange={changeRegion}>
        <div className="map-toolbar">
          <TabsList className="region-tabs" aria-label="تصفية حسب المنطقة">
            {regions.map(([key, label]) => (
              <TabsTrigger key={key} value={key}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="country-search">
            <label className="sr-only" htmlFor="country-search-ar">
              ابحث عن دولة
            </label>
            <Input
              id="country-search-ar"
              type="search"
              value={query}
              placeholder="ابحث عن دولة..."
              onChange={e => changeQuery(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && visible.length) {
                  e.preventDefault();
                  selectCountry(visible[0].code);
                }
              }}
            />
            <Search size={18} aria-hidden="true" />
          </div>
        </div>
        {regions.map(([key]) => (
          <TabsContent key={key} value={key}>
            {region === key ? mapContent : null}
          </TabsContent>
        ))}
      </Tabs>
      <p className="map-note">أسماء الأماكن والحدود الواردة على الخريطة لا تعبّر عن أي موقف لمنظمة أطباء بلا حدود بشأن وضعها القانوني.</p>
    </section>
  );
}
