import { ArrowLeft, Globe } from 'lucide-react';
import { base } from '@/lib/nav';

export default function SiteFooterAr() {
  return (
    <footer dir="rtl">
      <div className="wrap footer-top">
        <div>
          <img className="footer-logo" src="/assets/logo.svg" alt="أطباء بلا حدود" />
          <p>
            العمل الطبي الإنساني المستقل.<br />
            في لبنان ومختلف أنحاء العالم.
          </p>
        </div>
        <div>
          <h3>اكتشف أطباء بلا حدود</h3>
          <a href="/ar#about-msf">من نحن ومبادئنا</a>
          <a href="https://msf-lebanon.org/ar/%d8%a7%d8%b7%d8%a8%d8%a7%d8%a1-%d8%a8%d9%84%d8%a7-%d8%ad%d8%af%d9%88%d8%af-%d9%81%d9%8a-%d9%84%d8%a8%d9%86%d8%a7%d9%86/">أطباء بلا حدود في لبنان</a>
          <a href="/ar#medical-topics">مواضيع طبية</a>
          <a href="/ar#in-focus">في بؤرة الضوء</a>
        </div>
        <div>
          <h3>الموارد والتقارير</h3>
          <a href="https://msf-lebanon.org/ar/%d8%a7%d9%84%d8%a3%d8%ae%d8%a8%d8%a7%d8%b1-%d9%88%d8%a7%d9%84%d8%a3%d9%86%d8%b4%d8%b7%d8%a9/%d8%a7%d9%84%d8%a8%d8%ad%d9%88%d8%ab-%d9%88%d8%a7%d9%84%d9%85%d9%86%d8%b4%d9%88%d8%b1%d8%a7%d8%aa/">البحوث والمنشورات</a>
          <a href="/ar#latest">آخر الأخبار والقصص</a>
          <a href="https://tembo.msf.org">التعلّم مع منصة تيمبو</a>
        </div>
        <div>
          <h3>ابقَ على تواصل</h3>
          <a href="/contact-us">اتّصل بنا</a>
          <a href="https://msf-lebanon.org/ar/%d8%a7%d8%b4%d8%aa%d8%b1%d9%83-%d9%81%d9%8a-%d9%86%d8%b4%d8%b1%d8%a7%d8%aa%d9%86%d8%a7-%d8%a7%d9%84%d8%a5%d8%ae%d8%a8%d8%a7%d8%b1%d9%8a%d8%a9/">
            اشترك في نشرتنا الإخبارية <ArrowLeft size={16} />
          </a>
          <a href="/" lang="en" dir="ltr" className="lang-switch-en">
            English
          </a>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© أطباء بلا حدود — Médecins Sans Frontières</span>
        <a href="https://www.msf.org">
          أطباء بلا حدود حول العالم <Globe size={16} />
        </a>
      </div>
    </footer>
  );
}
