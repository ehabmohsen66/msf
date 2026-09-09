import {readFileSync,writeFileSync} from 'node:fs';
import {geoNaturalEarth1,geoPath} from 'd3-geo';
import {feature} from 'topojson-client';
const world=JSON.parse(readFileSync(new URL('../data/world-110m.json',import.meta.url)));
const projection=geoNaturalEarth1().fitExtent([[12,12],[988,508]],{type:'Sphere'});
const path=geoPath(projection).digits(2);
const shapes=feature(world,world.objects.countries).features.filter(f=>Number(f.id)!==10).map(f=>({id:Number(f.id),name:f.properties.name,d:path(f),center:path.centroid(f),bounds:path.bounds(f)}));
writeFileSync(new URL('../data/map-shapes.json',import.meta.url),JSON.stringify(shapes));
console.log('Generated',shapes.length,'country shapes from World Atlas / Natural Earth.');
