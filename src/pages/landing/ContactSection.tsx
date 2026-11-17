import { useState, type FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock, Check, MessageCircle, Send, Truck } from 'lucide-react';

const WHATSAPP_NUMBER = '+94755201694';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all three fields: name, email, and message.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubmitted(true);
  };

  return (
    <section id="contact" className="w-full py-16 sm:py-24 border-t border-white/[0.08] bg-[#060609]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37] font-semibold">
              Customer Care
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold leading-tight">
              Get in Touch
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Have questions about our fragrances or delivery? Reach out via email or connect with us on WhatsApp.
            </p>

            <div className="pt-1">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi LUXERA, I have a question about your perfumes.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <div className="space-y-4 pt-3 text-xs text-zinc-300">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Colombo 03, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>+94 75 520 1694</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>naveendz2003@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Island-Wide Cash on Delivery Available</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0c0c11] shadow-xl">
              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <h3 className="font-serif text-2xl text-white font-bold">Message Sent</h3>
                  <p className="text-xs text-zinc-300 max-w-sm mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{formData.name}</span>! We will reply to <span className="text-[#e2c785] font-medium">{formData.email}</span> shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className="text-xs text-[#d4af37] hover:underline pt-2 cursor-pointer font-medium"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1 pb-1">
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-bold">
                      Send Us a Message
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Fill out the form below and we'll get back to you soon.
                    </p>
                  </div>

                  {error && (
                    <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs text-zinc-300 mb-1.5 font-medium">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-300 mb-1.5 font-medium">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-300 mb-1.5 font-medium">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your message here..."
                      className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#d4af37] hover:bg-[#e0bf50] text-black text-xs font-bold tracking-wider uppercase transition-all cursor-pointer shadow-[0_4px_15px_rgba(212,175,55,0.25)] hover:shadow-[0_4px_20px_rgba(212,175,55,0.4)]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}