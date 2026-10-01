'use client';

import { useRef, useState } from 'react';
import { ArrowRight, Minus, Plus, RotateCcw, Search } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import countries from '@/data/countries.json';
import shapes from '@/data/map-shapes.json';

const regions = [ ['all','All regions'], ['africa','Africa'], ['asia','Asia & Pacific'], ['mena','Middle East & North Africa'], ['europe','Europe & Central Asia'], ['americas','The Americas'] ];
const countryByCode = new Map(countries.map(c => [c.code,c]));
const shapeByCode = new Map(shapes.map(s => [s.id,s]));
const sortedCountries = [...countries].sort((a,b)=>a.name.localeCompare(b.name));
const defaultView = {x:500,y:260,scale:1};

export default function WorldMap(){
 const [region,setRegion] = useState('all');
 const [query,setQuery] = useState('');
 const [selected,setSelected] = useState<number|null>(422);
 const [view,setView] = useState(defaultView);
 const drag = useRef<{x:number;y:number;viewX:number;viewY:number;width:number;scale:number;moved:boolean}|null>(null);
 const visible = sortedCountries.filter(c=>(region==='all'||c.region===region)&&c.name.toLowerCase().includes(query.trim().toLowerCase()));
 const visibleCodes = new Set(visible.map(c=>c.code));
 const country = selected===null?null:countryByCode.get(selected);
 const selectedShape=selected===null?null:shapeByCode.get(selected);
 function selectCountry(code:number){
  if(drag.current?.moved)return;
  setSelected(code);
  const shape=shapeByCode.get(code);
  if(shape){const [[x0,y0],[x1,y1]]=shape.bounds;setView({x:(x0+x1)/2,y:(y0+y1)/2,scale:Math.max(1.5,Math.min(6,0.55/Math.max((x1-x0)/1000,(y1-y0)/520)))});}
 }
 function changeRegion(value:unknown){setRegion(String(value));setSelected(null);setView(defaultView);}
 function changeQuery(value:string){setQuery(value);setSelected(null);setView(defaultView);}
 function reset(){setRegion('all');setQuery('');setSelected(422);setView(defaultView);}
 const mapContent=<div className="map-layout">
  <div>
   <div className="map-stage">
    <svg viewBox={`${view.x-500/view.scale} ${view.y-260/view.scale} ${1000/view.scale} ${520/view.scale}`} role="group" aria-label="World map. Select a highlighted country to explore MSF activities." onPointerDown={e=>{if(e.button!==0)return;drag.current={x:e.clientX,y:e.clientY,viewX:view.x,viewY:view.y,width:e.currentTarget.getBoundingClientRect().width,scale:view.scale,moved:false}}} onPointerMove={e=>{const d=drag.current;if(!d||e.buttons!==1)return;if(Math.abs(e.clientX-d.x)+Math.abs(e.clientY-d.y)>5){d.moved=true;e.currentTarget.setPointerCapture(e.pointerId);setView(v=>({...v,x:Math.max(0,Math.min(1000,d.viewX-(e.clientX-d.x)*1000/d.width/d.scale)),y:Math.max(0,Math.min(520,d.viewY-(e.clientY-d.y)*1000/d.width/d.scale))}));}}} onPointerUp={()=>{setTimeout(()=>{drag.current=null},0)}} onPointerCancel={()=>{drag.current=null}}>
     <title>MSF activities around the world</title>
      {shapes.map((shape, idx)=>{const id=shape.id;const c=id!=null?countryByCode.get(id):undefined;const active=id!=null?visibleCodes.has(id):false;return <path key={id??idx} d={shape.d??''} className={`map-land ${c?'map-country':''} ${c&&!active?'map-dimmed':''} ${selected===id?'map-selected':''}`} role={active?'button':undefined} tabIndex={active?0:undefined} aria-label={active?`Explore MSF activities in ${c?.name}`:undefined} aria-pressed={active?selected===id:undefined} onClick={()=>{if(active&&id!=null)selectCountry(id)}} onKeyDown={e=>{if(active&&id!=null&&(e.key==='Enter'||e.key===' ')){e.preventDefault();selectCountry(id)}}}><title>{c?.name??shape.name}</title></path>})}
     {selectedShape&&country?<g pointerEvents="none"><circle cx={selectedShape.center[0]} cy={selectedShape.center[1]} r={7/view.scale} fill="white" stroke="#e60000" strokeWidth={2/view.scale}/><circle cx={selectedShape.center[0]} cy={selectedShape.center[1]} r={2.3/view.scale} fill="#e60000"/></g>:null}
    </svg>
    <div className="map-controls"><button type="button" aria-label="Zoom in" disabled={view.scale>=8} onClick={()=>setView(v=>({...v,scale:Math.min(8,v.scale*1.5)}))}><Plus size={19}/></button><button type="button" aria-label="Zoom out" disabled={view.scale<=1} onClick={()=>setView(v=>({...v,scale:Math.max(1,v.scale/1.5)}))}><Minus size={19}/></button><button type="button" aria-label="Reset map and filters" onClick={reset}><RotateCcw size={17}/></button></div>
   </div>
   <div className="map-legend"><span><i/>Countries in the activity map</span><span><i className="muted-swatch"/>Other countries</span><span>Drag to move · Use + to zoom</span></div>
  </div>
  <aside className="map-panel">
   <div className="map-selection" aria-live="polite">{country?<><p className="eyebrow">{regions.find(r=>r[0]===country.region)?.[1]}</p><h3>{country.name}</h3><p>{country.code===422?'Explore our medical humanitarian work in Lebanon and the communities our teams support.':`Explore MSF’s medical humanitarian work in ${country.name}.`}</p><a className="text-link" href={country.code===422?'https://msf-lebanon.org/what-we-do/msf-in-leb/':country.url}>Our work in {country.name}<ArrowRight size={19}/></a></>:<><p className="eyebrow">Explore our work</p><h3>{visible.length===0?'No countries found':'Select a country'}</h3><p>{visible.length===0?'Try another country name or choose a different region.':'Select a highlighted country on the map or choose from the list below.'}</p></>}</div>
   <div className="country-list-heading"><span>{visible.length} {visible.length===1?'country':'countries'}</span><span>Browse A–Z</span></div>
   <ul className="map-country-list" aria-label="Countries matching your filters">{visible.map(c=><li key={c.code}><button type="button" aria-pressed={selected===c.code} onClick={()=>selectCountry(c.code)}>{c.name}<ArrowRight size={14}/></button></li>)}</ul>
  </aside>
 </div>;
 return <section className="world-section wrap" id="where-we-work" aria-labelledby="map-heading">
  <div className="section-heading"><div><p className="eyebrow">Where we work</p><h2 id="map-heading">Our activities around the world</h2></div><a className="text-link" href="https://www.msf.org/international-activity-report-2025">Explore the 2025 report <ArrowRight size={19}/></a></div>
  <p className="map-intro">From Lebanon to the wider world, our teams bring medical care to people who need it. Explore countries by region or search by name.</p>
  <Tabs value={region} onValueChange={changeRegion}>
   <div className="map-toolbar"><TabsList className="region-tabs" aria-label="Filter by region">{regions.map(([key,label])=><TabsTrigger key={key} value={key}>{label}</TabsTrigger>)}</TabsList><div className="country-search"><label className="sr-only" htmlFor="country-search">Search countries</label><Input id="country-search" type="search" value={query} placeholder="Search for a country" onChange={e=>changeQuery(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&visible.length){e.preventDefault();selectCountry(visible[0].code)}}}/><Search size={18} aria-hidden="true"/></div></div>
   {regions.map(([key])=><TabsContent key={key} value={key}>{region===key?mapContent:null}</TabsContent>)}
  </Tabs>
  <p className="map-note">Place names and boundaries do not imply any position by MSF on their legal status.</p>
 </section>;
}
