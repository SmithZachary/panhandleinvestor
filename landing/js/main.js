// Panhandle Investor Exchange — landing scripts.
// Initialises Firebase and handles waitlist form submission.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ---- Footer year ----
const yearEl = document.getElementById("footer-year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- Waitlist form ----
const form = document.getElementById("waitlist-form");
const statusEl = document.getElementById("wl-status");
const submitBtn = document.getElementById("wl-submit");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function setStatus(message, kind) {
  if (!statusEl) return;
  statusEl.textContent = message || "";
  statusEl.classList.remove("is-error", "is-success");
  if (kind === "error") statusEl.classList.add("is-error");
  if (kind === "success") statusEl.classList.add("is-success");
}

function validate({ name, email, honeypot }) {
  if (honeypot) return "Submission blocked.";
  if (!name || name.trim().length < 2) return "Please enter your name.";
  if (name.length > 80) return "Name is too long.";
  if (!email || !EMAIL_RE.test(email)) return "Please enter a valid email.";
  if (email.length > 120) return "Email is too long.";
  return null;
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus("", null);

    const formData = new FormData(form);
    const payload = {
      name: (formData.get("name") || "").toString().trim(),
      email: (formData.get("email") || "").toString().trim().toLowerCase(),
      honeypot: (formData.get("company") || "").toString().trim()
    };

    const error = validate(payload);
    if (error) {
      setStatus(error, "error");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Joining…";

    try {
      await addDoc(collection(db, "waitlist"), {
        name: payload.name,
        email: payload.email,
        source: "landing",
        path: location.pathname,
        referrer: document.referrer || null,
        userAgent: navigator.userAgent,
        createdAt: serverTimestamp()
      });

      form.innerHTML = `
        <div class="form-status is-success" style="display:block">
          <strong>You're on the list.</strong><br>
          Thanks, ${escapeHtml(payload.name.split(" ")[0])}. We'll email ${escapeHtml(payload.email)} when we open access.
        </div>
      `;
    } catch (err) {
      console.error("Waitlist submission failed:", err);
      setStatus(
        "Something went wrong. Please try again in a moment.",
        "error"
      );
      submitBtn.disabled = false;
      submitBtn.textContent = "Join the waitlist";
    }
  });
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));
}
