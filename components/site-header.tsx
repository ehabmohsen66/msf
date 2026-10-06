'use client';

import { useEffect, useState, useRef } from 'react';
import { ArrowRight, ChevronDown, Menu, Search, Globe, X } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { base, navMenu, navHref } from '@/lib/nav';

/* Utility bar + main navigation. Sits on top of a `.hero` image on every page. */
export default function SiteHeader(){
const [searchOpen,setSearchOpen]=useState(false);
const [searchQuery,setSearchQuery]=useState('');
const [openMobileGroup,setOpenMobileGroup]=useState<string|null>(null);
const [mobileOpen,setMobileOpen]=useState(false);
const searchInputRef=useRef<HTMLInputElement>(null);
const searchContainerRef=useRef<HTMLDivElement>(null);

useEffect(()=>{
  if(searchOpen){
    searchInputRef.current?.focus();
  }
},[searchOpen]);

useEffect(()=>{
  if(!searchOpen||searchQuery.trim()!=='')return;
  const idleTimer=window.setTimeout(()=>{
    setSearchOpen(false);
    setSearchQuery('');
  },5000);
  return()=>window.clearTimeout(idleTimer);
},[searchOpen,searchQuery]);

useEffect(()=>{
  function handleClickOutside(e:MouseEvent){
    if(searchContainerRef.current&&!searchContainerRef.current.contains(e.target as Node)){
      setSearchOpen(false);
    }
  }
  function handleKeyDown(e:KeyboardEvent){
    if(e.key==='Escape'){
      setSearchOpen(false);
    }
  }
  if(searchOpen){
    document.addEventListener('mousedown',handleClickOutside);
    document.addEventListener('keydown',handleKeyDown);
  }
  return()=>{
    document.removeEventListener('mousedown',handleClickOutside);
    document.removeEventListener('keydown',handleKeyDown);
  };
},[searchOpen]);

const handleSearchSubmit=(e:React.FormEvent)=>{
  e.preventDefault();
  if(searchQuery.trim()){
    window.location.href=`${base}/?s=${encodeURIComponent(searchQuery.trim())}`;
  }else{
    searchInputRef.current?.focus();
  }
};

return (
<header className="masthead">
<div className="utility"><span className="edition">MÉDECINS SANS FRONTIÈRES · LEBANON</span><div><a href="/work-with-us">Work with MSF</a><a href="https://www.msf.org">MSF worldwide <Globe size={14}/></a><a href={base+'/ar/home-ar/'} lang="ar" dir="rtl">العربية</a></div></div>
<div className="main-nav">
  <a href="/" className="brand" aria-label="MSF Lebanon home"><img src="/assets/logo.svg" alt="Médecins Sans Frontières — أطباء بلا حدود"/></a>
  <nav aria-label="Main navigation">
    {navMenu.map(item => (
      <div key={item.label} className="nav-item">
        <a href={navHref(item)} className="nav-item-link">
          {item.label}
          <ChevronDown size={14} className="nav-chevron" aria-hidden="true" />
        </a>
        <div className="nav-dropdown" role="menu" aria-label={`${item.label} submenu`}>
          {item.subItems.map(sub => (
            <a key={sub.label} href={navHref(sub)} role="menuitem">
              {sub.label}
            </a>
          ))}
        </div>
      </div>
    ))}
  </nav>
  <div className={`nav-search ${searchOpen?'is-expanded':''}`} ref={searchContainerRef}>
    <form className="nav-search-form" onSubmit={handleSearchSubmit} role="search">
      <button
        type={searchOpen?'submit':'button'}
        className="nav-search-toggle"
        onClick={()=>{
          if(!searchOpen){
            setSearchOpen(true);
          }
        }}
        aria-label={searchOpen?'Submit search':'Open search'}
        aria-expanded={searchOpen}
      >
        <Search size={22} aria-hidden="true"/>
      </button>
      <input
        ref={searchInputRef}
        type="search"
        className="nav-search-input"
        placeholder="Search MSF Lebanon..."
        value={searchQuery}
        onChange={e=>setSearchQuery(e.target.value)}
        aria-label="Search MSF Lebanon"
        tabIndex={searchOpen?0:-1}
      />
      {searchOpen&&(
        <button
          type="button"
          className="nav-search-close"
          onClick={e=>{
            e.stopPropagation();
            setSearchOpen(false);
            setSearchQuery('');
          }}
          aria-label="Close search"
        >
          <X size={18} aria-hidden="true"/>
        </button>
      )}
    </form>
  </div>
  <a className="pill nav-contact" href="/contact-us">Contact us</a>
  <div className="mobile-menu">
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <SheetTrigger aria-label="Open navigation"><Menu size={26}/></SheetTrigger>
      <SheetContent onClick={e=>{ if((e.target as HTMLElement).closest('a')) setMobileOpen(false); }}>
        <SheetHeader><SheetTitle>MSF Lebanon</SheetTitle><SheetDescription>Explore our work and stories.</SheetDescription></SheetHeader>
        <form
          className="mobile-sheet-search"
          onSubmit={e=>{
            e.preventDefault();
            const target=(e.currentTarget.elements.namedItem('q') as HTMLInputElement);
            if(target?.value.trim()){
              window.location.href=`${base}/?s=${encodeURIComponent(target.value.trim())}`;
            }
          }}
          role="search"
        >
          <input type="search" name="q" placeholder="Search MSF Lebanon..." aria-label="Search MSF Lebanon"/>
          <button type="submit" aria-label="Submit search"><Search size={18}/></button>
        </form>
        <nav className="mobile-links" aria-label="Mobile navigation">
          {navMenu.map(item => {
            const isOpen = openMobileGroup === item.label;
            return (
              <div key={item.label} className="mobile-nav-group">
                <div className="mobile-nav-header">
                  <a href={navHref(item)} className="mobile-nav-main-link">
                    {item.label}
                  </a>
                  <button
                    type="button"
                    className={`mobile-nav-toggle-btn ${isOpen ? 'is-open' : ''}`}
                    onClick={() => setOpenMobileGroup(isOpen ? null : item.label)}
                    aria-label={`Toggle ${item.label} submenu`}
                    aria-expanded={isOpen}
                  >
                    <ChevronDown size={18} />
                  </button>
                </div>
                {isOpen && (
                  <div className="mobile-nav-sublinks">
                    {item.subItems.map(sub => (
                      <a key={sub.label} href={navHref(sub)}>
                        <span>{sub.label}</span>
                        <ArrowRight size={14} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <a href="/contact-us" className="mobile-single-link">
            <span>Contact us</span>
            <ArrowRight size={18} />
          </a>
          <a href={base + '/ar/home-ar/'} className="mobile-single-link" lang="ar" dir="rtl">
            <span>العربية</span>
            <ArrowRight size={18} />
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  </div>
</div>
</header>
);
}
