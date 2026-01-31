/**
 * TypeScript models for resume/portfolio data.
 * Matches the JSON schema from /assets/resume.json
 */

export interface ResumeLink {
  label: string;
  url?: string; // Optional: may be empty/missing
}

export interface ResumeBasics {
  name: string;
  headline: string;
  location?: string;
  phone?: string;
  email?: string;
  links?: ResumeLink[];
}

export interface HighlightItem {
  mainHighlight: string;
  subHighlights?: string[];
}

export interface EmploymentItem {
  title: string;
  company: string;
  location?: string;
  start: string; // Format: YYYY-MM
  end?: string; // Optional: if missing, display "Present"
  highlights?: (string | HighlightItem)[];
  logoUrl?: string; // Optional logo URL for company
}

export interface EducationItem {
  degree: string;
  institution: string;
  location?: string;
  start: string; // Format: YYYY-MM
  end?: string; // Optional: if missing, display "Present"
  focus?: string; // Optional description/specialization
  logoUrl?: string; // Optional logo URL for institution
}

export interface CourseItem {
  name: string;
  provider: string;
  date?: string; // Format: YYYY-MM
  expiryDate?: string; // Optional expiry date
  logoUrl?: string; // Optional logo URL for certification provider
}

export interface LanguageItem {
  name: string;
  level?: number; // Optional proficiency level (1-5)
}

export interface SkillItem {
  name: string;
  subline?: string; // Optional short description/subline
}

export interface ResumeData {
  basics: ResumeBasics;
  profile?: string;
  skills: SkillItem[];
  languages: LanguageItem[];
  employment: EmploymentItem[];
  education: EducationItem[];
  courses: CourseItem[];
}

/**
 * Runtime type guard to ensure basics is valid
 */
export function isValidBasics(obj: any): obj is ResumeBasics {
  return (
    obj && typeof obj.name === 'string' && typeof obj.headline === 'string'
  );
}

/**
 * Provides safe fallback for resume data
 */
export function getEmptyResumeData(): ResumeData {
  return {
    basics: {
      name: 'Resume',
      headline: 'Professional',
    },
    profile: '',
    skills: [],
    languages: [],
    employment: [],
    education: [],
    courses: [],
  };
}
