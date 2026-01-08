# Resume Page Implementation - Complete Rebuild

## Overview
Complete architectural rebuild of the CV/resume webpage with Notion-like design and horizontal timeline scroll hijacking functionality.

## Architecture

### Core Layer (Data & Models)
- **models/resume.models.ts**: TypeScript interfaces matching JSON schema
  - ResumeData, ResumeBasics, EmploymentItem, EducationItem, CourseItem, LanguageItem
  - Runtime validation guards (isValidBasics)
  - Safe fallback (getEmptyResumeData)

- **services/resume-data.service.ts**: Data loading service
  - Loads `assets/resume.json` via HttpClient
  - Caching with `shareReplay(1)`
  - Runtime validation with `validateAndNormalize()`
  - Error handling with safe fallback

### Features Layer (Pages)
- **features/resume/resume-page.component.***
  - Main resume page with hero, profile, timelines, skills, languages, courses
  - Transforms JSON data to timeline format
  - Formats dates ("YYYY-MM" → "Feb 2022" or "Present")
  - Sorts items descending by date (most recent first)

### Shared Layer (Reusable Components)
- **shared/components/section-header**: Reusable section titles with optional subtitles
- **shared/components/horizontal-timeline**: Horizontal scrollable container with scroll hijacking
- **shared/components/timeline-item**: Individual milestone cards with alternating above/below positioning
- **shared/directives/horizontal-scroll-hijack.directive.ts**: IntersectionObserver + wheel event hijacking

## Scroll Choreography

### Behavior Flow
1. **Vertical scroll** (normal page flow)
2. **Education timeline enters viewport** (≥60% visible) → horizontal scroll hijacking activates
3. **User scrolls down** → deltaY converts to scrollLeft
4. **Timeline reaches right end** → releases back to vertical scroll
5. **Vertical scroll** continues to Employment section
6. **Employment timeline** → same horizontal scroll behavior
7. **Vertical scroll** continues to bottom

### Implementation Details
- **IntersectionObserver**: Detects when timeline is ≥60% in viewport
- **Wheel event**: Prevents default and converts deltaY to scrollLeft when:
  - Timeline is active (isActive = true)
  - Timeline can scroll horizontally (not at boundaries)
  - User preference allows motion (prefers-reduced-motion: no-preference)
- **Keyboard navigation**: ArrowLeft/Right scroll 200px with smooth behavior
- **Mobile fallback**: `scroll-snap-type: x mandatory` for touch swiping

## Styling (Notion-like Design)

### Color Palette
- Uses Material 3 system tokens: `--mat-sys-primary`, `--mat-sys-surface`, `--mat-sys-outline-variant`
- Neutral backgrounds with subtle borders
- Azure primary (#2563eb), Rose tertiary (from Material 3 theme)

### Visual Characteristics
- **Generous whitespace**: 48px page padding, 64px section margins
- **Rounded corners**: 12px border-radius on cards
- **Subtle borders**: 1px solid with 12% opacity
- **Clean typography**: -0.03em letter-spacing on headings, 1.7 line-height on body
- **Gentle transitions**: 0.2s ease-out for hover effects
- **Minimal shadows**: 0 2px 6px rgba(0,0,0,0.08) on hover

### Timeline Design
- **Center line**: 2px solid line with dots at milestones
- **Alternating cards**: nth-child(odd) above, nth-child(even) below
- **Milestone dots**: 14px circles on center line, scale 1.2 on hover
- **Card spacing**: 32px gap between items, min-width 340px
- **Horizontal scrollbar**: Thin (8px) with subtle thumb color

## Data Structure

### JSON Schema (assets/resume.json)
```json
{
  "basics": {
    "name": "string",
    "headline": "string",
    "location?": "string",
    "phone?": "string",
    "email?": "string",
    "links?": [{ "label": "string", "url?": "string" }]
  },
  "profile?": "string",
  "skills": ["string"],
  "languages": [{ "name": "string", "level?": "string" }],
  "employment": [{
    "title": "string",
    "company": "string",
    "location?": "string",
    "start": "YYYY-MM",
    "end?": "YYYY-MM",
    "highlights?": ["string"]
  }],
  "education": [{
    "degree": "string",
    "institution": "string",
    "location?": "string",
    "start": "YYYY-MM",
    "end?": "YYYY-MM",
    "focus?": "string"
  }],
  "courses": [{
    "name": "string",
    "provider": "string",
    "date?": "YYYY-MM"
  }]
}
```

## Accessibility Features

### Keyboard Navigation
- **Tab navigation**: All timeline items focusable with tabindex="0"
- **Arrow keys**: ArrowLeft/Right scroll horizontal timelines
- **Focus indicators**: 2px primary color outline on focus
- **ARIA labels**: region role with descriptive aria-label

### Reduced Motion
- **Media query**: Respects `prefers-reduced-motion: reduce`
- **Disables**: Scroll hijacking when reduced motion preferred
- **Fallback**: Standard scroll behavior with auto scroll-behavior

### Screen Readers
- **Semantic HTML**: section, article, header elements
- **ARIA attributes**: aria-label for timelines and timeline items
- **Alt text**: Descriptive labels for all interactive elements

## Mobile Responsiveness

### Breakpoint: 768px
- **Timeline items**: min-width 280px (down from 340px)
- **Card spacing**: 24px gap (down from 32px)
- **Page padding**: 32px/20px (down from 48px/32px)
- **Hero name**: 36px (down from 48px)
- **Scroll snap**: x proximity (less strict than mandatory)

### Touch Optimization
- **Scroll snap**: Horizontal snap points for smooth swiping
- **Larger touch targets**: 16px padding on cards
- **Readable font sizes**: Minimum 13px on small screens

## Testing & Validation

### Build Status
✅ Production build successful (373.27 kB initial bundle)
✅ No TypeScript compilation errors
✅ All imports resolved correctly

### Development Server
✅ Running at http://localhost:4200/
✅ Hot reload enabled
✅ Watch mode active

### Browser Support
- Chrome/Edge: Full support (IntersectionObserver, scroll-snap, CSS variables)
- Firefox: Full support
- Safari: Full support (with vendor prefixes for scrollbar)

## Key Files Created

### Core
- `src/app/core/models/resume.models.ts`
- `src/app/core/services/resume-data.service.ts`

### Features
- `src/app/features/resume/resume-page.component.ts`
- `src/app/features/resume/resume-page.component.html`
- `src/app/features/resume/resume-page.component.scss`

### Shared
- `src/app/shared/components/section-header/section-header.component.ts`
- `src/app/shared/components/horizontal-timeline/horizontal-timeline.component.ts`
- `src/app/shared/components/horizontal-timeline/horizontal-timeline.component.scss`
- `src/app/shared/components/timeline-item/timeline-item.component.ts`
- `src/app/shared/components/timeline-item/timeline-item.component.scss`
- `src/app/shared/directives/horizontal-scroll-hijack.directive.ts`

### Data
- `src/assets/resume.json` (copied from cv.json)

### Configuration
- `src/app/app-routing.routes.ts` (updated to use ResumePageComponent)
- `src/app/app.component.ts` (simplified to router-outlet only)
- `src/app/app.component.html` (minimal template)

## Firebase Hosting
- No changes to `firebase.json` (as required)
- Output directory: `dist/georgprassl-webpage/browser`
- Deploy with: `firebase deploy`

## Future Enhancements
- [ ] Add animations (fade-in on scroll)
- [ ] Implement smooth scroll to section navigation
- [ ] Add print stylesheet
- [ ] Optimize for SEO (meta tags, structured data)
- [ ] Add loading skeleton states
- [ ] Implement dark mode toggle (currently auto-detects)
