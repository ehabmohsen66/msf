import { ArrowDown, ArrowRight, Download } from 'lucide-react';

const reportUrl = 'https://msf-lebanon.org/news/international-activity-report-2025/';
const pdfUrl = 'https://www.msf.org/sites/default/files/2026-08/MSF_IAR_2025_1.pdf';

/* Chapters of the report. Two of them live further down this homepage,
   so they scroll the visitor there instead of leaving the page. */
const chapters = [
  { title: 'Foreword', note: 'Why the gaps in 2025 were not ours to fill', href: reportUrl + '#iar-foreword' },
  { title: '2025 in review', note: 'Where needs were greatest, and how our teams responded', href: reportUrl + '#iar-review' },
  { title: 'Feature articles', note: 'Gaza, Ukraine and the Ebola response in Ituri', href: reportUrl + '#iar-features' },
  { title: 'Facts and figures', note: 'Consultations, births and emergency care', href: '#msf-in-numbers', onPage: true },
  { title: 'Our activities around the world', note: 'Explore all 72 countries on the map', href: '#where-we-work', onPage: true },
  { title: 'International Financial Report', note: 'How every donation is used', href: reportUrl + '#iar-financial-report' },
];

export default function ActivityReport() {
  return (
    <section className="report-feature wrap" id="activity-report" aria-labelledby="report-heading">
      <a className="report-cover" href={reportUrl} aria-label="Open the International Activity Report 2025">
        <span className="report-cover-page report-cover-page-back" aria-hidden="true" />
        <span className="report-cover-page report-cover-page-mid" aria-hidden="true" />
        <span className="report-cover-sheet">
          <span className="report-cover-photo">
            <img src="/assets/report-cover.jpg" alt="An MSF staff member sits with a young patient at a health centre." loading="lazy" width="1400" height="934" />
          </span>
          <span className="report-cover-year" aria-hidden="true">2025</span>
          <span className="report-cover-foot">
            <img src="/assets/logo.svg" alt="" className="report-cover-logo" />
            <span className="report-cover-title">International<br />Activity Report</span>
          </span>
        </span>
      </a>

      <div className="report-content">
        <p className="eyebrow">Annual report · 2025</p>
        <h2 id="report-heading" className="report-heading">International Activity Report 2025</h2>
        <p className="report-lede">Aid cuts, conflict and outbreaks shaped 2025. Our teams still reached people in 72 countries. The report shows what they saw, what they did and how it was funded.</p>

        <p className="report-index-label">Inside the report</p>
        <ol className="report-index">
          {chapters.map((c, i) => (
            <li key={c.title}>
              <a href={c.href}>
                <span className="report-index-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="report-index-text">
                  <span className="report-index-title">{c.title}</span>
                  <span className="report-index-note">{c.note}</span>
                </span>
                {c.onPage && <span className="report-index-tag">On this page</span>}
                <span className="report-index-arrow">{c.onPage ? <ArrowDown size={18} aria-hidden="true" /> : <ArrowRight size={18} aria-hidden="true" />}</span>
              </a>
            </li>
          ))}
        </ol>

        <div className="report-actions">
          <a className="pill" href={reportUrl}>Read the report <ArrowRight size={19} /></a>
          <a className="text-link report-download" href={pdfUrl} target="_blank" rel="noopener">Download the PDF <Download size={19} /></a>
        </div>
      </div>
    </section>
  );
}
