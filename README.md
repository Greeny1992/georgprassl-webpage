# GeorgprasslWebpage

Professional resume website built with Angular and hosted on Firebase Hosting.

## Maintain the Resume

Edit `src/assets/resume.json` to update your employment, education, courses, skills, languages, and personal information.

## Development server

Run `npm start` and open `http://localhost:4200/`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build`. The build artifacts are in `dist/georgprassl-webpage/browser`.

## Running unit tests

Run `npm test` to execute the unit tests via Karma.

## Firebase Hosting

This repo is configured for SPA hosting (`firebase.json` rewrites all routes to `index.html`).

Typical deploy flow:

1. `npm run build`
2. `firebase login`
3. `firebase init hosting` (first time only)
4. `firebase deploy`

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on Angular CLI use `ng help`.
