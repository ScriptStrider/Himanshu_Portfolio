// Vercel serverless function: /api/contact
// Node.js runtime (edge not required; we need Node libs)

import fetch from "node-fetch"; // Vercel Node 18+ has fetch, but this keeps it explicit
import sgMail from "@sendgrid/mail";

// Basic config from env (set in Vercel)
const {
  SENDGRID_API_KEY,
  SENDGRID_TO,        // your email to receive messages
  SENDGRID_FROM,      // verified sender in SendGrid
  RECAPTCHA_SECRET,   // reCAPTCHA secret (server-side)
  ALLOWED_ORIGIN      // your site origin for CORS, e.g. https://yourdomain.com
} = process.env;

// Simple in-memory rate limiter (Vercel serverless = ephemeral; good enough for small traffic)
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5;                // 5 req/min/IP
const ipHits = new Map();

function rateLimit(ip) {
  const now = Date.now();
  const rec = ipHits.get(ip) || { count: 0, start: now };
  if (now - rec.start > RATE_LIMIT_WINDOW_MS) {
    ipHits.set(ip, { count: 1, start: now });
    return true;
  }
  if (rec.count >= RATE_LIMIT_MAX) return false;
  rec.count += 1;
  ipHits.set(ip, rec);
  return true;
}

function cors(res, origin) {
  res.setHeader("Access-Control-Allow-Origin", origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req, res) {
  const origin = req.headers.origin;
  cors(res, ALLOWED_ORIGIN || origin);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // CORS origin check (disabled for now)
    // if (ALLOWED_ORIGIN && origin !== ALLOWED_ORIGIN) {
    //   return res.status(403).json({ error: "Forbidden origin" });
    // }

    // Rate limiting
    const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0].trim();
    if (!rateLimit(ip)) {
      return res.status(429).json({ error: "Too many requests. Please try again later." });
    }

    const { from_name, reply_to, subject, message, token } = req.body || {};

    // Basic validation
    if (!from_name || !reply_to || !message) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    if (String(from_name).length > 120 || String(subject || "").length > 150 || String(message).length > 5000) {
      return res.status(400).json({ error: "Payload too large." });
    }

    // Verify reCAPTCHA (only if configured)
    if (RECAPTCHA_SECRET && token) {
      const verifyURL = "https://www.google.com/recaptcha/api/siteverify";
      const r = await fetch(verifyURL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: RECAPTCHA_SECRET,
          response: token
        })
      });
      const captcha = await r.json();
      if (!captcha.success) {
        return res.status(400).json({ error: "reCAPTCHA failed" });
      }
    }

    // Send email via SendGrid
    sgMail.setApiKey(SENDGRID_API_KEY);
    
    // Email to you (notification)
    const notificationHtml = `
      <h2>New Contact Message</h2>
      <p><b>Name:</b> ${escapeHtml(from_name)}</p>
      <p><b>Email:</b> ${escapeHtml(reply_to)}</p>
      <p><b>Subject:</b> ${escapeHtml(subject || "(no subject)")}</p>
      <p><b>Message:</b></p>
      <pre style="white-space:pre-wrap;font-family:ui-sans-serif,system-ui">${escapeHtml(message)}</pre>
    `;
    
    // Auto-reply to sender (acknowledgment)
    const autoReplyHtml = `
      <h2>Thank you for contacting me!</h2>
      <p>Hi ${escapeHtml(from_name)},</p>
      <p>Thank you for reaching out through my portfolio. I have received your message and will get back to you soon.</p>
      <p><b>Your message:</b></p>
      <blockquote style="border-left:3px solid #4f46e5;padding-left:16px;margin:16px 0;color:#666;">
        ${escapeHtml(message)}
      </blockquote>
      <p>Best regards,<br/>Devanshu Singh</p>
    `;
    
    // Send both emails
    await Promise.all([
      // Notification to you
      sgMail.send({
        to: SENDGRID_TO,
        from: SENDGRID_FROM,
        subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New Message`,
        text: `From: ${from_name} <${reply_to}>\n\n${message}`,
        html: notificationHtml
      }),
      // Auto-reply to sender
      sgMail.send({
        to: reply_to,
        from: SENDGRID_FROM,
        subject: "Thank you for contacting me - Devanshu Singh",
        text: `Hi ${from_name},\n\nThank you for reaching out through my portfolio. I have received your message and will get back to you soon.\n\nBest regards,\nDevanshu Singh`,
        html: autoReplyHtml
      })
    ]);

    return res.status(200).json({ ok: true, message: "Message sent and acknowledgment email delivered!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Ensure Vercel parses JSON body
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb"
    }
  }
};
