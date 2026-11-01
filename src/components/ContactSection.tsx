import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, Clock, Navigation, Send, Check } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/products';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    subject: 'General Inquiry / Reservation',
    message: '',
  });
  const [messageSent, setMessageSent] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.message.trim()) return;

    // Build WhatsApp quick contact link
    const text = `Hello Oven Bites!
Name: ${formState.name.trim()}
Phone: ${formState.phone.trim()}
Subject: ${formState.subject}
Message: ${formState.message.trim()}`;

    const url = `https://wa.me/${RESTAURANT_INFO.whatsappInternational}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setFormState({ name: '', phone: '', subject: 'General Inquiry / Reservation', message: '' });
    }, 3000);
  };

  const googleMapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Commercial Area near UBL Islamic Bank Bahawalpur Punjab Pakistan'
  )}`;

  return (
    <section id="contact" className="py-24 bg-[#111111] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F47721]/15 border border-[#F47721]/30 text-xs font-bold text-[#F47721] uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Visit Us or Order Delivery</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-4">
            LOCATION & CONTACT
          </h2>

          <p className="text-base sm:text-lg text-[#FFF4E5]/75">
            Conveniently situated in the Commercial Area near UBL & Islamic Bank, Bahawalpur.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Contact Info & Action Buttons */}
          <div className="lg:col-span-5 space-y-6">
            {/* Business Card */}
            <div className="p-8 rounded-3xl bg-[#17171a] border border-white/10 shadow-xl space-y-6">
              <h3 className="font-display font-extrabold text-2xl text-white">
                Oven Bites Cafe & Pizzeria
              </h3>

              <div className="space-y-4 text-sm text-[#FFF4E5]/80">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#F47721]/20 text-[#F47721] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">
                      Address
                    </div>
                    <p className="leading-relaxed">
                      {RESTAURANT_INFO.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#F47721]/20 text-[#F47721] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">
                      Direct Kitchen Call
                    </div>
                    <a
                      href={`tel:${RESTAURANT_INFO.phone}`}
                      className="font-mono text-base font-bold text-[#F47721] hover:underline"
                    >
                      {RESTAURANT_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">
                      WhatsApp Orders
                    </div>
                    <a
                      href={`https://wa.me/${RESTAURANT_INFO.whatsappInternational}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-base font-bold text-emerald-400 hover:underline"
                    >
                      {RESTAURANT_INFO.whatsappDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-white/10 text-white shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">
                      Opening Hours
                    </div>
                    <p className="text-white font-medium">
                      {RESTAURANT_INFO.openingHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <Phone className="w-4 h-4 text-[#F47721]" />
                  <span>Click to Call</span>
                </a>

                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappInternational}?text=${encodeURIComponent(
                    'Hello Oven Bites Cafe! I would like to place an order.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-emerald-600/30 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>

              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#F47721] hover:bg-[#ff8a3d] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#F47721]/30 transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions on Google Maps</span>
              </a>
            </div>

            {/* Quick Inquiry Form */}
            <div className="p-6 rounded-3xl bg-[#161619] border border-white/10">
              <h4 className="font-display font-bold text-lg text-white mb-3">
                Send a Quick Message
              </h4>
              <form onSubmit={handleSendMessage} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#F47721]"
                />
                <input
                  type="tel"
                  placeholder="Your Contact Number"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#F47721]"
                />
                <textarea
                  rows={2}
                  required
                  placeholder="How can we help? (Party reservation, feedback, corporate orders)"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#F47721]"
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-colors border border-white/10"
                >
                  <Send className="w-3.5 h-3.5 text-[#F47721]" />
                  <span>Send via WhatsApp</span>
                </button>
                {messageSent && (
                  <p className="text-[11px] text-emerald-400 text-center font-medium">
                    Opening WhatsApp to send your message!
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Right Column: Interactive Map */}
          <div className="lg:col-span-7 h-full flex flex-col">
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative h-[480px] lg:h-[620px] bg-[#141416]">
              {/* Responsive Embedded Map for Bahawalpur Punjab Pakistan */}
              <iframe
                title="Oven Bites Bahawalpur Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110537.1121852655!2d71.61483838274195!3d29.39569503463878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393b90c4c478a87d%3A0x8ff89c8369408e03!2sBahawalpur%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(110%)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Map Floating Location Pin Badge */}
              <div className="absolute top-5 left-5 p-4 rounded-2xl bg-[#111111]/90 backdrop-blur-md border border-[#F47721]/30 max-w-xs shadow-2xl">
                <div className="flex items-center gap-2 text-xs font-bold text-[#F47721] mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>BAHAWALPUR OUTLET</span>
                </div>
                <p className="text-xs text-white font-medium">
                  Commercial Area near UBL & Islamic Bank
                </p>
                <div className="text-[10px] text-[#FFF4E5]/60 mt-1">
                  Bahawalpur, Punjab, Pakistan
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
