import type { Metadata } from 'next';
import { Oswald, Source_Sans_3 } from 'next/font/google';
import './globals.css';
const heading=Oswald({variable:'--font-heading-face',subsets:['latin'],weight:['500','600','700']});
const body=Source_Sans_3({variable:'--font-body-face',subsets:['latin']});
export const metadata:Metadata={title:'MSF Lebanon | Homepage design preview',description:'Medical humanitarian action in Lebanon and around the world.',robots:{index:false,follow:false}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${heading.variable} ${body.variable}`}>{children}</body></html>}
