/* eslint-disable no-undef */ // so grecaptcha doesn't trigger linter errors
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";

// Read from Vite env (.env)
const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // 1) Get token from reCAPTCHA checkbox
    const token = window.grecaptcha?.getResponse();
    if (!token) {
      alert("Please complete the reCAPTCHA.");
      setLoading(false);
      return;
    }

    // 2) Gather form data
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());
    payload.token = token; // include captcha token

    try {
      // 3) Call your serverless API
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });  

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to send");

      // 4) Success UX
      setSent(true);
      e.target.reset();
      window.grecaptcha.reset(); // reset the checkbox
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      alert(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-24">
      <div className="p-8 card">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Let’s build something</h2>
        <p className="text-white/80 mt-2">
          I’m open to roles, freelance work, and collaborations.
        </p>

        {/* --- Updated Form (names must match your API) --- */}
        <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4 mt-6">
          <input
            name="from_name"
            required
            placeholder="Your name"
            className="px-4 py-3 rounded-xl bg-slate-800 text-white placeholder-white/50 border border-slate-700 focus:outline-none"
          />
          <input
            name="reply_to"
            required
            type="email"
            placeholder="Your email"
            className="px-4 py-3 rounded-xl bg-slate-800 text-white placeholder-white/50 border border-slate-700 focus:outline-none"
          />
          <input
            name="subject"
            placeholder="Company / Project (subject)"
            className="md:col-span-2 px-4 py-3 rounded-xl bg-slate-800 text-white placeholder-white/50 border border-slate-700 focus:outline-none"
          />
          <textarea
            name="message"
            required
            placeholder="Message"
            rows={4}
            className="md:col-span-2 px-4 py-3 rounded-xl bg-slate-800 text-white placeholder-white/50 border border-slate-700 focus:outline-none"
          />

          {/* reCAPTCHA v2 checkbox */}
          <div className="md:col-span-2">
            <div className="g-recaptcha" data-sitekey={SITE_KEY}></div>
          </div>

          <button
            disabled={loading}
            className="md:col-span-2 btn px-5 py-3 bg-indigo-500 hover:bg-indigo-600 text-white disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Mail size={16} />
            {loading ? "Sending..." : "Send Message"}
          </button>

          <AnimatePresence>
            {sent && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="md:col-span-2 text-sm text-emerald-300"
              >
                ✅ Thanks! Your message has been sent successfully.
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </section>
  );
}
