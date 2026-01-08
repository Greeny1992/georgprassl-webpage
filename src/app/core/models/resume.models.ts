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

export interface EmploymentItem {
  title: string;
  company: string;
  location?: string;
  start: string; // Format: YYYY-MM
  end?: string; // Optional: if missing, display "Present"
  highlights?: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location?: string;
  start: string; // Format: YYYY-MM
  end?: string; // Optional: if missing, display "Present"
  focus?: string; // Optional description/specialization
}

export interface CourseItem {
  name: string;
  provider: string;
  date?: string; // Format: YYYY-MM
}

export interface LanguageItem {
  name: string;
  level?: string; // Optional proficiency level
}

export interface ResumeData {
  basics: ResumeBasics;
  profile?: string;
  skills: string[];
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
