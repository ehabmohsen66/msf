'use client';

import { useEffect, useState, useRef } from 'react';
import { ArrowLeft, ChevronDown, Menu, Search, Globe, X } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { base, navMenuAr, navHref } from '@/lib/nav';

/* Utility bar + main navigation for Arabic site. Sits on top of a `.hero` image on every page. */
export default function SiteHeaderAr() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen || searchQuery.trim() !== '') return;
    const idleTimer = window.setTimeout(() => {
      setSearchOpen(false);
      setSearchQuery('');
    }, 5000);
    return () => window.clearTimeout(idleTimer);
  }, [searchOpen, searchQuery]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    }
    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `${base}/ar/?s=${encodeURIComponent(searchQuery.trim())}`;
    } else {
      searchInputRef.current?.focus();
    }
  };

  return (
    <header className="masthead" dir="rtl">
      <div className="utility">
        <span className="edition">أطباء بلا حدود · مكتب لبنان</span>
        <div>
          <a href="/contact-us">اتّصل بنا</a>
          <a href="https://www.msf.org">
            أطباء بلا حدود حول العالم <Globe size={14} />
          </a>
          <a href="/" lang="en" dir="ltr" className="lang-switch-en">
            English
          </a>
        </div>
      </div>
      <div className="main-nav">
        <a href="/ar" className="brand" aria-label="الصفحة الرئيسية لأطباء بلا حدود لبنان">
          <img src="/assets/logo.svg" alt="أطباء بلا حدود — Médecins Sans Frontières" />
        </a>
        <nav aria-label="التنقل الرئيسي">
          {navMenuAr.map(item => (
            <div key={item.label} className="nav-item">
              <a href={navHref(item)} className="nav-item-link">
                {item.label}
                <ChevronDown size={14} className="nav-chevron" aria-hidden="true" />
              </a>
              <div className="nav-dropdown" role="menu" aria-label={`قائمة ${item.label}`}>
                {item.subItems.map(sub => (
                  <a key={sub.label} href={navHref(sub)} role="menuitem" className={sub.indent ? 'is-indent' : undefined}>
                    {sub.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className={`nav-search ${searchOpen ? 'is-expanded' : ''}`} ref={searchContainerRef}>
          <form className="nav-search-form" onSubmit={handleSearchSubmit} role="search">
            <button
              type={searchOpen ? 'submit' : 'button'}
              className="nav-search-toggle"
              onClick={() => {
                if (!searchOpen) {
                  setSearchOpen(true);
                }
              }}
              aria-label={searchOpen ? 'إرسال البحث' : 'فتح البحث'}
              aria-expanded={searchOpen}
            >
              <Search size={22} aria-hidden="true" />
            </button>
            <input
              ref={searchInputRef}
              type="search"
              className="nav-search-input"
              placeholder="ابحث في الأخبار والأنشطة..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              tabIndex={searchOpen ? 0 : -1}
              aria-label="عبارة البحث"
            />
            {searchOpen && (
              <button
                type="button"
                className="nav-search-close"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                }}
                aria-label="إغلاق البحث"
              >
                <X size={18} aria-hidden="true" />
              </button>
            )}
          </form>
        </div>
        <a className="pill nav-contact" href="https://msf-lebanon.org/ar/%d8%aa%d8%a8%d8%b1%d8%b9/">
          تبرّع الآن
        </a>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger aria-label="فتح القائمة الرئيسية" className="mobile-menu">
            <Menu size={24} />
          </SheetTrigger>
          <SheetContent side="right" className="p-0 flex flex-col justify-between w-[320px] sm:w-[380px]" dir="rtl">
            <div>
              <SheetHeader className="p-6 pb-2 text-right">
                <SheetTitle className="sr-only">قائمة التنقل</SheetTitle>
                <SheetDescription className="sr-only">استكشف أقسام الموقع الرئيسية لأطباء بلا حدود</SheetDescription>
                <a href="/ar" className="brand block w-fit" onClick={() => setMobileOpen(false)}>
                  <img src="/assets/logo.svg" alt="أطباء بلا حدود" width={140} height={75} />
                </a>
              </SheetHeader>

              {/* Mobile Search Input */}
              <form
                className="mobile-sheet-search"
                onSubmit={e => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    window.location.href = `${base}/ar/?s=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
                role="search"
              >
                <input
                  type="search"
                  placeholder="ابحث في الموقع..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  aria-label="عبارة البحث"
                />
                <button type="submit" aria-label="بحث">
                  <Search size={18} aria-hidden="true" />
                </button>
              </form>

              <div className="mobile-links">
                {navMenuAr.map(item => {
                  const hasSub = item.subItems && item.subItems.length > 0;
                  const isOpen = openMobileGroup === item.label;

                  return (
                    <div key={item.label} className="mobile-nav-group">
                      <div className="mobile-nav-header">
                        <a
                          href={navHref(item)}
                          className="mobile-nav-main-link"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </a>
                        {hasSub && (
                          <button
                            type="button"
                            className={`mobile-nav-toggle-btn ${isOpen ? 'is-open' : ''}`}
                            onClick={() => setOpenMobileGroup(isOpen ? null : item.label)}
                            aria-expanded={isOpen}
                            aria-label={`توسيع ${item.label}`}
                          >
                            <ChevronDown size={18} />
                          </button>
                        )}
                      </div>

                      {hasSub && isOpen && (
                        <div className="mobile-nav-sublinks">
                          {item.subItems.map(sub => (
                            <a
                              key={sub.label}
                              href={navHref(sub)}
                              className={sub.indent ? 'is-indent' : undefined}
                              onClick={() => setMobileOpen(false)}
                            >
                              <span>{sub.label}</span>
                              <ArrowLeft size={14} className="opacity-40" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                <a href="/contact-us" className="mobile-single-link" onClick={() => setMobileOpen(false)}>
                  <span>اتّصل بنا</span>
                  <ArrowLeft size={16} />
                </a>
                <a href="/" className="mobile-single-link" onClick={() => setMobileOpen(false)} dir="ltr">
                  <span>English</span>
                  <Globe size={16} />
                </a>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex flex-col gap-4">
              <a
                className="pill w-full text-center justify-center"
                href="https://msf-lebanon.org/ar/%d8%aa%d8%a8%d8%b1%d8%b9/"
                onClick={() => setMobileOpen(false)}
              >
                تبرّع الآن
              </a>
              <p className="text-xs text-center text-gray-500">
                منظمة طبية إنسانية دولية مستقلة
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
