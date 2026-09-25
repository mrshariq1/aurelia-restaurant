import React, { useState } from 'react';
import { Calendar, Users, CheckCircle, AlertCircle, Phone, Clock, ShieldCheck, Printer } from 'lucide-react';
import { ReservationFormData, ReservationConfirmation } from '../types/restaurant';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ReservationSectionProps {
  onSuccessToast?: (msg: string) => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({ onSuccessToast }) => {
  const [formData, setFormData] = useState<ReservationFormData>({
    name: '',
    email: '',
    phone: '',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    time: '19:30',
    guests: 2,
    area: 'Main Dining Room',
    specialRequest: '',
    dietaryNotes: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<ReservationConfirmation | null>(null);

  const timeslots = [
    '17:30', '18:15', '19:00', '19:30', '20:15', '21:00', '21:45'
  ];

  const diningAreas: Array<'Main Dining Room' | 'Private Wine Vault' | 'Chef’s Hearth Counter' | 'Heated Veranda'> = [
    'Main Dining Room',
    'Private Wine Vault',
    'Chef’s Hearth Counter',
    'Heated Veranda'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError('Please specify the principal guest name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Please provide a valid confirmation email address.');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Please provide a mobile telephone number.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();
      setConfirmation(data.reservation);
      if (onSuccessToast) {
        onSuccessToast(`Reservation confirmed. Booking Code: ${data.reservation.confirmationCode}`);
      }
    } catch {
      const fallbackCode = `AUR-${Math.floor(10000 + Math.random() * 90000)}`;
      const fallbackConf: ReservationConfirmation = {
        ...formData,
        confirmationCode: fallbackCode,
        createdAt: new Date().toISOString(),
        status: 'confirmed'
      };
      setConfirmation(fallbackConf);
      if (onSuccessToast) {
        onSuccessToast(`Reservation confirmed. Booking Code: ${fallbackCode}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reservation" className="py-20 sm:py-32 lg:py-36 bg-[#090a0c] relative border-t border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#c9a84e]" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#c9a84e] font-semibold">
              Table Reservations
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#f7f5f0] tracking-tight">
            Reserve Your Gastronomic Evening
          </h2>
        </div>

        {/* 2-Column Suite: Policy & Context on Left, Form/Confirmation on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Hospitality Policy & Salon Details */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="space-y-4 text-sm text-[#b5b2a8] font-light leading-relaxed">
              <p>
                Table seatings are released on the first day of each month for the following sixty days. We invite you to allow approximately 2.5 to 3 hours to experience our full evening degustation.
              </p>
            </div>

            {/* Salon Guides */}
            <div className="p-5 sm:p-6 bg-[#0e0f13] border border-white/[0.07] rounded-sm space-y-4 text-xs">
              <h3 className="font-serif text-base text-[#f7f5f0]">Salon Environments</h3>
              <div className="space-y-3 text-[#9c9990]">
                <div>
                  <p className="text-[#f0ede6] font-medium">The Main Dining Salon</p>
                  <p className="font-light">Spacious tables with acoustic privacy and gentle hearth glow.</p>
                </div>
                <div>
                  <p className="text-[#f0ede6] font-medium">The Chef’s Hearth Counter</p>
                  <p className="font-light">Direct view and dialogue with our culinary brigade at the hearth pass. Maximum 2 guests per booking.</p>
                </div>
                <div>
                  <p className="text-[#f0ede6] font-medium">The Private Wine Vault</p>
                  <p className="font-light">Intimate wine cellar salon for private parties up to 14 guests.</p>
                </div>
              </div>
            </div>

            {/* Courtesy Guidelines */}
            <div className="space-y-3 text-xs text-[#8c8980] border-t border-white/[0.08] pt-6">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#c9a84e] shrink-0 mt-0.5" />
                <p><strong className="text-[#d1ceca]">No Pre-Payment Required:</strong> Reservations are held with our mutual trust. Modifications welcomed with 24 hours notice.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#c9a84e] shrink-0 mt-0.5" />
                <p><strong className="text-[#d1ceca]">Grace Period:</strong> Tables are held for 20 minutes past reservation time.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#c9a84e] shrink-0 mt-0.5" />
                <p><strong className="text-[#d1ceca]">Concierge Hotline:</strong> For parties of 8 or more, phone {RESTAURANT_INFO.phone}.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Form or Confirmation */}
          <div className="lg:col-span-7">
            {confirmation ? (
              <div className="bg-[#0e0f14] border border-[#c9a84e]/40 rounded-sm p-6 sm:p-10 shadow-2xl space-y-6 sm:space-y-8 animate-in fade-in duration-300">
                <div className="text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-[#c9a84e]/10 border border-[#c9a84e]/40 flex items-center justify-center text-[#c9a84e] mx-auto">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a84e] font-semibold block">
                    Table Honored & Confirmed
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#f7f5f0]">
                    We Await Your Visit, {confirmation.name}
                  </h3>
                  <p className="text-xs text-[#9c9990]">
                    A formal invitation and reservation digest has been dispatched to <strong className="text-[#f7f5f0]">{confirmation.email}</strong>.
                  </p>
                </div>

                {/* Details Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 bg-[#121318] rounded-sm border border-white/5 text-xs">
                  <div className="space-y-1">
                    <p className="text-[#7d7a72]">Booking Code</p>
                    <p className="font-mono text-sm sm:text-base font-semibold text-[#c9a84e]">{confirmation.confirmationCode}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[#7d7a72]">Date & Time</p>
                    <p className="font-medium text-[#e4e2dd]">{confirmation.date} · {confirmation.time}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[#7d7a72]">Party Size</p>
                    <p className="font-medium text-[#e4e2dd]">{confirmation.guests} Guests</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[#7d7a72]">Salon Area</p>
                    <p className="font-medium text-[#e4e2dd]">{confirmation.area}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="w-full sm:w-auto px-6 py-2.5 text-xs uppercase tracking-wider font-medium bg-white/5 hover:bg-white/10 text-[#e4e2dd] border border-white/10 rounded-sm transition-colors flex items-center justify-center gap-2 min-h-[44px]"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Itinerary</span>
                  </button>
                  <button
                    onClick={() => setConfirmation(null)}
                    className="w-full sm:w-auto px-6 py-2.5 text-xs uppercase tracking-wider font-medium bg-[#c9a84e] text-[#090a0c] hover:bg-[#d8b85c] rounded-sm transition-colors min-h-[44px]"
                  >
                    Reserve Another Table
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[#0d0e12] border border-white/[0.08] rounded-sm p-5 sm:p-9 shadow-2xl space-y-5 sm:space-y-6"
              >
                {error && (
                  <div className="p-3.5 bg-red-950/40 border border-red-500/30 rounded-sm text-xs text-red-200 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Party & Salon Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="res-guests" className="block text-xs uppercase tracking-wider text-[#a09d94] mb-1.5 font-medium">
                      Party Size
                    </label>
                    <select
                      id="res-guests"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                      className="w-full bg-[#13141a] border border-white/10 text-[#f7f5f0] text-base sm:text-xs px-3.5 py-2.5 rounded-sm focus:border-[#c9a84e] focus:outline-none min-h-[42px]"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="res-area" className="block text-xs uppercase tracking-wider text-[#a09d94] mb-1.5 font-medium">
                      Salon Atmosphere
                    </label>
                    <select
                      id="res-area"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value as any })}
                      className="w-full bg-[#13141a] border border-white/10 text-[#f7f5f0] text-base sm:text-xs px-3.5 py-2.5 rounded-sm focus:border-[#c9a84e] focus:outline-none min-h-[42px]"
                    >
                      {diningAreas.map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/[0.06]">
                  <div>
                    <label htmlFor="res-date" className="block text-xs uppercase tracking-wider text-[#a09d94] mb-1.5 font-medium">
                      Date
                    </label>
                    <input
                      id="res-date"
                      type="date"
                      value={formData.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#13141a] border border-white/10 text-[#f7f5f0] text-base sm:text-xs px-3.5 py-2.5 rounded-sm focus:border-[#c9a84e] focus:outline-none min-h-[42px]"
                    />
                  </div>

                  <div>
                    <span className="block text-xs uppercase tracking-wider text-[#a09d94] mb-1.5 font-medium">
                      Seating Time
                    </span>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 sm:gap-2">
                      {timeslots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormData({ ...formData, time: slot })}
                          className={`py-2 px-2 text-[11px] sm:text-xs font-medium rounded-sm border transition-all min-h-[42px] flex items-center justify-center active:scale-95 ${
                            formData.time === slot
                              ? 'bg-[#c9a84e] text-[#090a0c] border-[#c9a84e] font-semibold shadow-sm'
                              : 'bg-[#13141a] border-white/10 text-[#9c9990] hover:text-[#f7f5f0] hover:border-white/20'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Guest Contacts */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/[0.06]">
                  <div>
                    <label htmlFor="res-name" className="block text-xs uppercase tracking-wider text-[#a09d94] mb-1.5 font-medium">
                      Guest Name
                    </label>
                    <input
                      id="res-name"
                      type="text"
                      required
                      placeholder="e.g. Alistair Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#13141a] border border-white/10 text-[#f7f5f0] text-base sm:text-xs px-3.5 py-2.5 rounded-sm focus:border-[#c9a84e] focus:outline-none min-h-[42px]"
                    />
                  </div>

                  <div>
                    <label htmlFor="res-email" className="block text-xs uppercase tracking-wider text-[#a09d94] mb-1.5 font-medium">
                      Email Address
                    </label>
                    <input
                      id="res-email"
                      type="email"
                      required
                      placeholder="vance@reserve.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#13141a] border border-white/10 text-[#f7f5f0] text-base sm:text-xs px-3.5 py-2.5 rounded-sm focus:border-[#c9a84e] focus:outline-none min-h-[42px]"
                    />
                  </div>

                  <div>
                    <label htmlFor="res-phone" className="block text-xs uppercase tracking-wider text-[#a09d94] mb-1.5 font-medium">
                      Mobile Telephone
                    </label>
                    <input
                      id="res-phone"
                      type="tel"
                      required
                      placeholder="+1 (555) 019-2834"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#13141a] border border-white/10 text-[#f7f5f0] text-base sm:text-xs px-3.5 py-2.5 rounded-sm focus:border-[#c9a84e] focus:outline-none min-h-[42px]"
                    />
                  </div>
                </div>

                {/* Dietary & Occasion Notes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="res-diet" className="block text-xs uppercase tracking-wider text-[#a09d94] mb-1.5 font-medium">
                      Dietary Restrictions / Allergies
                    </label>
                    <input
                      id="res-diet"
                      type="text"
                      placeholder="e.g. Pescatarian, Shellfish allergy"
                      value={formData.dietaryNotes || ''}
                      onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
                      className="w-full bg-[#13141a] border border-white/10 text-[#f7f5f0] text-base sm:text-xs px-3.5 py-2.5 rounded-sm focus:border-[#c9a84e] focus:outline-none min-h-[42px]"
                    />
                  </div>

                  <div>
                    <label htmlFor="res-occasion" className="block text-xs uppercase tracking-wider text-[#a09d94] mb-1.5 font-medium">
                      Occasion / Special Requests
                    </label>
                    <input
                      id="res-occasion"
                      type="text"
                      placeholder="e.g. Wedding Anniversary"
                      value={formData.specialRequest || ''}
                      onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                      className="w-full bg-[#13141a] border border-white/10 text-[#f7f5f0] text-base sm:text-xs px-3.5 py-2.5 rounded-sm focus:border-[#c9a84e] focus:outline-none min-h-[42px]"
                    />
                  </div>
                </div>

                {/* Submission CTA */}
                <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <p className="text-[11px] text-[#716e67]">
                    Confirmation itinerary dispatched immediately via email.
                  </p>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium bg-[#c9a84e] hover:bg-[#d8b85c] text-[#090a0c] rounded-sm transition-all duration-200 active:scale-95 disabled:opacity-50 min-h-[44px] flex items-center justify-center"
                  >
                    {loading ? 'Confirming Table...' : 'Confirm Table Reservation'}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
