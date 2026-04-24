/**
 * TypeScript models for resume/portfolio data.
 * Matches the JSON schema from /assets/resume.json
 */

export interface ResumeLink {
  label: string;
  url?: string;
}

export interface ResumeBasics {
  name: string;
  headline: string;
  tagline?: string;
  valueProp?: string;
  heroSubline?: string;
  availability?: string;
  website?: string;
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
  start: string;
  end?: string;
  highlights?: (string | HighlightItem)[];
  logoUrl?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location?: string;
  start: string;
  end?: string;
  focus?: string;
  logoUrl?: string;
}

export interface CourseItem {
  name: string;
  provider: string;
  date?: string;
  expiryDate?: string;
  logoUrl?: string;
}

export interface LanguageItem {
  name: string;
  level?: number;
}

export interface SkillItem {
  name: string;
  subline?: string;
}

export interface ServiceItem {
  icon: string;
  title: string;
  summary: string;
  bullets?: string[];
}

export interface ProjectResult {
  label: string;
  value: string;
}

export interface ProjectItem {
  title: string;
  company?: string;
  role?: string;
  period?: string;
  description: string;
  image?: string;
  tech?: string[];
  results?: ProjectResult[];
}

export interface Credential {
  label: string;
  detail?: string;
}

export interface AboutSection {
  photo?: string;
  intro: string;
  story?: string;
  credentials?: Credential[];
  personal?: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  avatar?: string | null;
}

export interface TechStackGroup {
  group: string;
  items: string[];
}

export interface ResumeData {
  basics: ResumeBasics;
  profile?: string;
  services?: ServiceItem[];
  projects?: ProjectItem[];
  about?: AboutSection;
  testimonials?: Testimonial[];
  techStack?: TechStackGroup[];
  skills: SkillItem[];
  languages: LanguageItem[];
  employment: EmploymentItem[];
  education: EducationItem[];
  courses: CourseItem[];
}

export function isValidBasics(obj: any): obj is ResumeBasics {
  return (
    obj && typeof obj.name === 'string' && typeof obj.headline === 'string'
  );
}

export function getEmptyResumeData(): ResumeData {
  return {
    basics: {
      name: 'Portfolio',
      headline: 'Consultant',
    },
    profile: '',
    services: [],
    projects: [],
    testimonials: [],
    techStack: [],
    skills: [],
    languages: [],
    employment: [],
    education: [],
    courses: [],
  };
}
