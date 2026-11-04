import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, Clock } from 'lucide-react';
import { Language } from '../types';
import { useCms } from '../context/CmsContext';

interface ContactPageProps {
  lang: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang }) => {
  const { content } = useCms();
  const { branding } = content;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+971 ');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 bg-white">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-left rtl:text-right">
        <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#b87e2a] uppercase block mb-2">
          {lang === 'ar' ? 'تواصل معنا' : 'Get in Touch'}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 font-serif">
          {lang === 'ar' ? `يسعدنا تواصلكم مع ${branding.brandNameAr}` : `Contact ${branding.brandNameEn}`}
        </h1>
        <p className="mt-3 text-base text-gray-600 max-w-2xl leading-relaxed">
          {lang === 'ar'
            ? 'فريقنا في دبي جاهز للرد على كافة استفساراتكم وتقديم المشورة الفنية وعينات المواد المناسبة لمشاريعكم.'
            : 'Visit our production facility in Dubai or contact our corporate sales team for inquiries, project consultations, or custom branding samples.'}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6 text-left rtl:text-right">
            
            {/* Phone Card */}
            <div className="p-6 bg-[#faf8f5] rounded-2xl border border-amber-900/10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Direct Phone & WhatsApp</span>
                <a href={`tel:${branding.phonePrimary}`} className="text-lg font-bold text-gray-900 hover:text-[#b87e2a] transition-colors block mt-0.5">
                  {branding.phonePrimary}
                </a>
                <span className="text-xs text-gray-500 block mt-1">Direct sales, quotations & inquiries (Dubai, UAE)</span>
              </div>
            </div>

            {/* Email Card with All Official Team Emails */}
            <div className="p-6 bg-[#faf8f5] rounded-2xl border border-amber-900/10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="w-full">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Official Email Contacts</span>
                
                <div className="space-y-2 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-1.5 border-b border-gray-200/60">
                    <span className="text-gray-600 font-medium">General & Quotations:</span>
                    <a href="mailto:info@aladeeladvertising.com" className="font-bold text-gray-900 hover:text-[#b87e2a] transition-colors">
                      info@aladeeladvertising.com
                    </a>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-1.5 border-b border-gray-200/60">
                    <span className="text-gray-600 font-medium">Adeel (Executive):</span>
                    <a href="mailto:adeel@aladeeladvertising.com" className="font-bold text-gray-900 hover:text-[#b87e2a] transition-colors">
                      adeel@aladeeladvertising.com
                    </a>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-1.5 border-b border-gray-200/60">
                    <span className="text-gray-600 font-medium">Carina (Sales & Accounts):</span>
                    <a href="mailto:carina@aladeeladvertising.com" className="font-bold text-gray-900 hover:text-[#b87e2a] transition-colors">
                      carina@aladeeladvertising.com
                    </a>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <span className="text-gray-600 font-medium">Noor (Client Relations):</span>
                    <a href="mailto:noor@aladeeladvertising.com" className="font-bold text-gray-900 hover:text-[#b87e2a] transition-colors">
                      noor@aladeeladvertising.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="p-6 bg-[#faf8f5] rounded-2xl border border-amber-900/10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-900 text-white flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Showroom & Workshop</span>
                <span className="text-base font-bold text-gray-900 block mt-0.5">Dubai, United Arab Emirates</span>
                <span className="text-xs text-gray-500 block mt-1">Full production plant with client showroom</span>
              </div>
            </div>

            {/* WhatsApp Direct Action */}
            <a
              href="https://wa.me/971562612617?text=Hello%20Al%20Adeel%20Advertising%20LLC,%20I%20would%20like%20to%20discuss%20a%20branding%20project."
              target="_blank"
              rel="noreferrer"
              className="p-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-between transition-colors shadow-md group"
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6" />
                <span className="font-bold text-sm">Instant Chat on WhatsApp (+971 56 261 2617)</span>
              </div>
              <span className="text-white group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">→</span>
            </a>

            {/* Social Channels Quick Connect */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/aladeeladvertisingllc?utm_source=qr&psln=N2hpaWU0bGk3NDRs"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-between transition-all hover:opacity-95 shadow-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <div>
                    <span className="font-bold text-xs block">Instagram</span>
                    <span className="text-[10px] text-white/90 block">@aladeeladvertisingllc</span>
                  </div>
                </div>
                <span className="text-white text-xs group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">→</span>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/1J3jsDu2DB/"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-[#1877F2] hover:bg-[#166fe5] text-white flex items-center justify-between transition-colors shadow-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.2 22 12z"/>
                  </svg>
                  <div>
                    <span className="font-bold text-xs block">Facebook</span>
                    <span className="text-[10px] text-white/90 block">Official Page</span>
                  </div>
                </div>
                <span className="text-white text-xs group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">→</span>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@al.adeel.advertis?_r=1&_t=ZS-9B4DpB1d6Ty"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-[#010101] hover:bg-[#1a1a1a] text-white flex items-center justify-between transition-colors shadow-xs group border border-gray-800"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                  <div>
                    <span className="font-bold text-xs block">TikTok</span>
                    <span className="text-[10px] text-gray-400 block">@al.adeel.advertis</span>
                  </div>
                </div>
                <span className="text-white text-xs group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">→</span>
              </a>
            </div>

            {/* Working Hours */}
            <div className="p-4 rounded-xl border border-gray-200 text-xs text-gray-600 flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div>
                <span className="font-bold text-gray-900 block">
                  {lang === 'ar' ? 'ساعات العمل:' : 'Working Hours:'}
                </span>
                <span>
                  {lang === 'ar'
                    ? 'من الإثنين إلى الأحد: ٩:۰۰ صباحاً حتى ۷:۰۰ مساءً'
                    : 'Monday to Sunday: 9:00 AM to 7:00 PM'}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-[#faf8f5] p-8 rounded-3xl border border-amber-900/10 text-left rtl:text-right">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-gray-900">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Thank you for reaching out, <strong>{name}</strong>. Our customer support team in Dubai will reply to <strong>{email}</strong> within a few hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#b87e2a] text-white text-xs font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold font-serif text-gray-900 mb-2">
                  Send Us a Direct Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Tariq Al Hashimi"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. tariq@company.ae"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+971 50 ..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Inquiry Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Commercial Printing">Commercial Printing</option>
                      <option value="Uniform Embroidery">Uniform Embroidery</option>
                      <option value="Storefront Signage">Storefront Signage</option>
                      <option value="Vehicle Branding">Vehicle Branding</option>
                      <option value="Corporate Gifts">Corporate Gifts</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your requirements, quantities, or delivery location in UAE..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#b87e2a] hover:bg-[#a36e22] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry Message</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
