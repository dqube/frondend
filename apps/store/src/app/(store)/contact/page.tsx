"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-muted-foreground">Have a question or need help? We&apos;re here for you.</p>
      </motion.div>

      {/* Contact cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Phone, title: "Call Us", detail: "+44 20 7123 4567", sub: "Mon–Sat, 8am–8pm" },
          { icon: Mail, title: "Email Us", detail: "hello@modernstores.com", sub: "We reply within 24h" },
          { icon: MessageCircle, title: "Live Chat", detail: "Start a conversation", sub: "Available 24/7" },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm p-5 text-center"
            >
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold">{card.title}</h3>
              <p className="text-sm text-primary mt-1">{card.detail}</p>
              <p className="text-xs text-muted-foreground">{card.sub}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm p-6"
        >
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto" />
              <h3 className="text-lg font-semibold">Message Sent!</h3>
              <p className="text-sm text-muted-foreground">We&apos;ll get back to you within 24 hours.</p>
              <button onClick={() => setSubmitted(false)} className="text-sm text-primary font-medium hover:underline">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-semibold">Send a Message</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <input required placeholder="Your Name" className="rounded-xl border border-border/50 bg-white/80 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input required type="email" placeholder="Email Address" className="rounded-xl border border-border/50 bg-white/80 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <select className="w-full rounded-xl border border-border/50 bg-white/80 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option>General Inquiry</option>
                <option>Order Issue</option>
                <option>Delivery Problem</option>
                <option>Product Feedback</option>
                <option>Partnership</option>
                <option>Other</option>
              </select>
              <textarea
                required
                rows={4}
                placeholder="Your message..."
                className="w-full rounded-xl border border-border/50 bg-white/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              />
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                <Send className="h-4 w-4" /> Send Message
              </button>
            </form>
          )}
        </motion.div>

        {/* Store info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-3">Visit Our Store</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p className="text-muted-foreground">42 Green Lane, Shoreditch<br />London, E1 6AN</p>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div className="text-muted-foreground">
                  <p>Mon – Fri: 7am – 10pm</p>
                  <p>Saturday: 8am – 9pm</p>
                  <p>Sunday: 9am – 8pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/80 rounded-2xl h-44 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-1" />
              <p className="text-xs text-blue-600 font-medium">View on Map</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
