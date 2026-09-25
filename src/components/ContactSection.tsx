import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, Instagram, Facebook } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ContactSectionProps {
  onSuccessToast?: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onSuccessToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'General Dining Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      if (onSuccessToast) {
        onSuccessToast('Your inquiry has been relayed directly to our Guest Concierge.');
      }
    }, 500);
  };

  return (
    <section id="contact" className="py-20 sm:py-32 lg:py-36 bg-[#090a0c] relative border-t border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#c9a84e]" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#c9a84e] font-semibold">
              The Concierge Desk
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#f7f5f0] tracking-tight">
            Connect With The Atelier
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left: Contact Info Channels */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="space-y-5 sm:space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-[#111217] border border-[#c9a84e]/30 flex items-center justify-center text-[#c9a84e] shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-serif font-medium text-[#f7f5f0]">Concierge Hotline</h3>
                  <p className="text-xs text-[#a09d94] mt-0.5">{RESTAURANT_INFO.phone}</p>
                  <p className="text-[11px] text-[#716e67]">Answered daily 10:00 – 23:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-[#111217] border border-[#c9a84e]/30 flex items-center justify-center text-[#c9a84e] shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-serif font-medium text-[#f7f5f0]">Electronic Inquiries</h3>
                  <p className="text-xs text-[#a09d94] mt-0.5">{RESTAURANT_INFO.email}</p>
                  <p className="text-[11px] text-[#716e67]">Events: {RESTAURANT_INFO.reservationsEmail}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-[#111217] border border-[#c9a84e]/30 flex items-center justify-center text-[#c9a84e] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-serif font-medium text-[#f7f5f0]">Address</h3>
                  <p className="text-xs text-[#a09d94] mt-0.5">{RESTAURANT_INFO.address}</p>
                  <p className="text-[11px] text-[#716e67]">North Porte-Cochère Valet Arrival</p>
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="pt-6 border-t border-white/[0.08] space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a84e] font-semibold block">
                Social Chronicles
              </span>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#b5b2a8]">
                <a
                  href="#hero"
                  className="flex items-center gap-2 hover:text-[#c9a84e] transition-colors bg-white/[0.03] px-3.5 py-2.5 rounded-sm border border-white/10 min-h-[44px]"
                >
                  <Instagram className="w-4 h-4 text-[#c9a84e]" />
                  <span>@aureliagastronomy</span>
                </a>
                <a
                  href="#hero"
                  className="flex items-center gap-2 hover:text-[#c9a84e] transition-colors bg-white/[0.03] px-3.5 py-2.5 rounded-sm border border-white/10 min-h-[44px]"
                >
                  <Facebook className="w-4 h-4 text-[#c9a84e]" />
                  <span>Aurelia Dining</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Clean Inquiry Form */}
          <div className="lg:col-span-7 bg-[#0b0c10] border border-white/[0.08] rounded-sm p-5 sm:p-9 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-[#c9a84e]/10 border border-[#c9a84e] flex items-center justify-center text-[#c9a84e] mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif text-[#f7f5f0]">Inquiry Relayed</h3>
                <p className="text-xs text-[#9c9990] max-w-md mx-auto leading-relaxed">
                  Thank you, {formData.name}. Our Head Maître d’ or Private Events Director will reply within four business hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', topic: 'General Dining Inquiry', message: '' });
                  }}
                  className="px-5 py-2.5 text-xs uppercase tracking-wider text-[#c9a84e] border border-[#c9a84e]/30 rounded-sm hover:bg-[#c9a84e]/10 transition-colors min-h-[44px]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs uppercase tracking-wider text-[#a09d94] mb-1.5 font-medium">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Vivienne Claire"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#111217] border border-white/10 text-[#f7f5f0] text-base sm:text-xs px-3.5 py-2.5 rounded-sm focus:border-[#c9a84e] focus:outline-none min-h-[42px]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs uppercase tracking-wider text-[#a09d94] mb-1.5 font-medium">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="claire@mayfair.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#111217] border border-white/10 text-[#f7f5f0] text-base sm:text-xs px-3.5 py-2.5 rounded-sm focus:border-[#c9a84e] focus:outline-none min-h-[42px]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-topic" className="block text-xs uppercase tracking-wider text-[#a09d94] mb-1.5 font-medium">
                    Subject of Inquiry
                  </label>
                  <select
                    id="contact-topic"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full bg-[#111217] border border-white/10 text-[#f7f5f0] text-base sm:text-xs px-3.5 py-2.5 rounded-sm focus:border-[#c9a84e] focus:outline-none min-h-[42px]"
                  >
                    <option value="General Dining Inquiry">General Dining Inquiry</option>
                    <option value="Private Salon Buyout (10+ guests)">Private Salon Buyout (10+ guests)</option>
                    <option value="Cellar & Sommelier Consultation">Cellar & Sommelier Consultation</option>
                    <option value="Press & Media Relations">Press & Media Relations</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs uppercase tracking-wider text-[#a09d94] mb-1.5 font-medium">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    placeholder="Share any preferred dates, event parameters, or specific culinary wishes..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#111217] border border-white/10 text-[#f7f5f0] text-base sm:text-xs p-3.5 rounded-sm focus:border-[#c9a84e] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 text-xs uppercase tracking-[0.2em] font-medium bg-[#c9a84e] hover:bg-[#d8b85c] text-[#090a0c] rounded-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 min-h-[44px]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? 'Relaying Message...' : 'Dispatch Message to Concierge'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
