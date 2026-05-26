# Panhandle Investor Exchange

Hyperlocal verified investor deal board for the Pensacola, Escambia, and Santa Rosa County market.

Trust-first, local-first. Verified wholesalers submit assignable opportunities; verified buyers get fast, organized access to off-market deals with enough data to make a decision.

## Repository layout

| Path | Purpose |
| --- | --- |
| `landing/` | Static HTML/CSS/JS marketing site. SEO surface. Served at apex domain. |
| `app/` | Flutter Web app (mobile later). Served at `app.<domain>.com`. |
| `functions/` | Firebase Cloud Functions (Node 20 + TypeScript). |
| `firestore.rules` | Firestore security rules. Default deny — expand per collection. |
| `firestore.indexes.json` | Firestore composite index definitions. |
| `storage.rules` | Cloud Storage security rules. Default deny. |
| `firebase.json` | Firebase project config — multi-site Hosting, Functions, Firestore, Storage. |
| `.firebaserc` | Firebase project + Hosting target aliases. |

## Tech stack

- **Frontend (app):** Flutter Web — Riverpod 2 (state), go_router (routing), flutter_stripe (billing UI)
- **Frontend (landing):** Plain HTML/CSS/JS, Tailwind (TBD: CDN vs local build)
- **Backend:** Firebase Auth, Firestore, Cloud Storage, Cloud Functions (Node 20 + TS), Hosting, App Check
- **Payments:** Stripe (Subscriptions + Customer Portal)
- **Email:** Postmark (transactional)
- **SMS:** Twilio
- **Maps:** Mapbox (area outlines only — exact addresses gated by tier)
- **Search:** Firestore native at MVP, Typesense Cloud later

## Status

Scaffold only. No Firebase project linked yet. No real landing content. No Flutter project initialized. Next:

1. Create Firebase project + multi-site Hosting (landing + app sites)
2. Wire `.firebaserc` and Hosting target IDs
3. Build landing page v0 (waitlist forms for buyer + wholesaler)
4. Deploy landing, drive signups, validate before building the app

## Legal posture

Platform operates as software + data + advertising. **Not** a brokerage. No closing-tied fees. Monetization is subscription / listing / verification / sponsorship only. See FL Statute 475.01 for context.
