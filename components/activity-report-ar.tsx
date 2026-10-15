import { ArrowDown, ArrowLeft, Download } from 'lucide-react';
import { reportChaptersAr } from '@/data/ar/home';

const reportUrl = '/news/international-activity-report-2025';
const pdfUrl = 'https://www.msf.org/sites/default/files/2026-08/MSF_IAR_2025_1.pdf';

export default function ActivityReportAr() {
  return (
    <section className="report-feature wrap" id="activity-report" aria-labelledby="report-heading-ar" dir="rtl">
      <a className="report-cover" href={reportUrl} aria-label="افتح التقرير الدولي السنوي لأطباء بلا حدود 2025">
        <span className="report-cover-page report-cover-page-back" aria-hidden="true" />
        <span className="report-cover-page report-cover-page-mid" aria-hidden="true" />
        <span className="report-cover-sheet">
          <span className="report-cover-photo">
            <img src="/assets/report-cover.jpg" alt="أحد كوادر أطباء بلا حدود يجلس مع مريض شاب في مركز صحي." loading="lazy" width="1400" height="934" />
          </span>
          <span className="report-cover-year" aria-hidden="true">2025</span>
          <span className="report-cover-foot">
            <img src="/assets/logo.svg" alt="" className="report-cover-logo" />
            <span className="report-cover-title">التقرير الدولي<br />السنوي للأنشطة</span>
          </span>
        </span>
      </a>

      <div className="report-content">
        <p className="eyebrow">التقرير السنوي · 2025</p>
        <h2 id="report-heading-ar" className="report-heading">التقرير الدولي السنوي لأنشطة 2025</h2>
        <p className="report-lede">
          شكلت النزاعات وتفشي الأوبئة ونقص التمويل ملامح عام 2025. ورغم التحديات، واصلت فرقنا تقديم الرعاية للمجتمعات في 72 دولة. يوثق هذا التقرير ما شاهدته فرقنا، وما قدمته ميدانياً، وكيف أُديرت الموارد بشفافية.
        </p>

        <p className="report-index-label">في محتويات التقرير</p>
        <ol className="report-index">
          {reportChaptersAr.map((c, i) => (
            <li key={c.title}>
              <a href={c.href}>
                <span className="report-index-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="report-index-text">
                  <span className="report-index-title">{c.title}</span>
                  <span className="report-index-note">{c.note}</span>
                </span>
                {c.onPage && <span className="report-index-tag">في هذه الصفحة</span>}
                <span className="report-index-arrow">
                  {c.onPage ? <ArrowDown size={18} aria-hidden="true" /> : <ArrowLeft size={18} aria-hidden="true" />}
                </span>
              </a>
            </li>
          ))}
        </ol>

        <div className="report-actions">
          <a className="pill" href={reportUrl}>
            اقرأ التقرير الكامل <ArrowLeft size={19} />
          </a>
          <a className="text-link report-download" href={pdfUrl} target="_blank" rel="noopener">
            تحميل نسخة PDF <Download size={19} />
          </a>
        </div>
      </div>
    </section>
  );
}
