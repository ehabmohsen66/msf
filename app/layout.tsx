import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'MSF Lebanon | Homepage design preview',description:'Medical humanitarian action in Lebanon and around the world.',robots:{index:false,follow:false}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Tajawal:wght@500;700&family=Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400&display=swap"/></head><body>{children}</body></html>}
