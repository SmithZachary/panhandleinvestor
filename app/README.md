# Flutter App

Will be initialized with `flutter create .` (web target enabled) inside this folder once Firebase project setup is complete.

## Planned structure

- `lib/core/` — Firebase init, routing (go_router), theming, env config
- `lib/features/` — `auth/`, `buyer/`, `wholesaler/`, `deals/`, `admin/`, `billing/`
- `lib/data/` — repositories, Firestore refs, models
- `lib/shared/` — widgets, utilities

## Key dependencies (planned)

- `firebase_core`, `firebase_auth`, `cloud_firestore`, `firebase_storage`, `firebase_app_check`
- `flutter_riverpod` + `riverpod_generator` + `riverpod_annotation` (state)
- `go_router` (routing)
- `flutter_stripe` (subscription UI)
- `freezed` + `json_serializable` (data models)
- `sentry_flutter` (error tracking)

## Build / deploy

Web build target: `app/build/web` — wired into `firebase.json` Hosting `app` target.
