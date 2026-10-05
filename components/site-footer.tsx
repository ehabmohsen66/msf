import { ArrowRight, Globe } from 'lucide-react';
import { base } from '@/lib/nav';

export default function SiteFooter(){
return (
<footer><div className="wrap footer-top"><div><img className="footer-logo" src="/assets/logo.svg" alt="Médecins Sans Frontières"/><p>Medical humanitarian action.<br/>In Lebanon and around the world.</p></div><div><h3>Discover MSF</h3><a href="/about-us">Who we are</a><a href="/about-us#msf-in-lebanon">MSF in Lebanon</a><a href={base+'/medical-topics/'}>Medical topics</a></div><div><h3>Resources</h3><a href={base+'/news-events/research-publications/'}>Research & publications</a><a href="/news-events">News & events</a><a href="https://tembo.msf.org">Learning with Tembo</a></div><div><h3>Stay connected</h3><a href={base+'/contact-us/'}>Contact us</a><a href={base+'/subscribe-to-our-newsletters-2/'}>Subscribe to our newsletter <ArrowRight size={16}/></a><a href={base+'/ar/home-ar/'} lang="ar">العربية</a></div></div><div className="wrap footer-bottom"><span>© Médecins Sans Frontières</span><a href="https://www.msf.org">MSF worldwide <Globe size={16}/></a></div></footer>
);
}
