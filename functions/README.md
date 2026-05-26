# Cloud Functions

Will be initialized with `firebase init functions` (Node 20 + TypeScript) once the Firebase project is created.

## Planned modules

- `deals/` — publish, anonymize, expire, regenerate teaser pages
- `billing/` — Stripe webhooks, subscription state sync
- `notifications/` — Postmark (transactional email) + Twilio (SMS alerts)
- `verification/` — POF review hooks, daisy-chain detection, deal verification workflows
- `seo/` — regenerate `landing/deals/*.html` anonymized teaser pages on Firestore writes
- `admin/` — privileged operations (user suspension, deal removal, featured placement)
- `waitlist/` — `submitWaitlist` endpoint for landing-page signup forms (buyer + wholesaler)

## Runtime

Node 20 + TypeScript. Functions deployed to `us-central1` unless cost/latency analysis dictates otherwise.
