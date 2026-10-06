'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const countries = ['Lebanon', 'Syria', 'Jordan', 'Iraq', 'Palestine', 'Egypt', 'France', 'Belgium', 'Switzerland', 'United Kingdom', 'United States', 'Other'];
const interests = ['Career', 'Media', 'Volunteering'];

/* Mirrors the live Contact Form 7 fields. On WordPress this is the Elementor/CF7 form;
   in the demo it opens the visitor's mail client with the message pre-filled. */
export default function ContactForm({ email }: { email: string }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = ['Name', 'Email', 'Country', 'Telephone', 'Interest']
      .map(k => `${k}: ${d.get(k.toLowerCase()) || '-'}`)
      .join('\n') + `\n\n${d.get('message') || ''}${d.get('newsletter') ? '\n\n[Sign me up for the newsletter]' : ''}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Website enquiry: ${d.get('interest') || 'General'}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="contact-sent" role="status">
        <CheckCircle2 size={40} aria-hidden="true" />
        <h3>Thank you</h3>
        <p>Your email app should have opened with your message. If it didn’t, write to us at <a href={`mailto:${email}`}>{email}</a>.</p>
        <button type="button" className="text-link" onClick={() => setSent(false)}>Send another message <ArrowRight size={18} /></button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <label><span>Name *</span><input name="name" required autoComplete="name" /></label>
      <label><span>Email *</span><input name="email" type="email" required autoComplete="email" /></label>
      <label><span>Country</span>
        <select name="country" defaultValue=""><option value="" disabled>Choose your country</option>{countries.map(c => <option key={c}>{c}</option>)}</select>
      </label>
      <label><span>Telephone</span><input name="telephone" type="tel" autoComplete="tel" /></label>
      <label className="full"><span>Interest</span>
        <select name="interest" defaultValue=""><option value="" disabled>Choose interest</option>{interests.map(c => <option key={c}>{c}</option>)}</select>
      </label>
      <label className="full"><span>Message *</span><textarea name="message" rows={6} required /></label>
      <label className="contact-check full"><input type="checkbox" name="newsletter" /> Sign me up for the newsletter!</label>
      <button type="submit" className="pill full-start">Send message <ArrowRight size={19} /></button>
    </form>
  );
}
