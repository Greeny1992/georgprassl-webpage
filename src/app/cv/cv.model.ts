export interface CvLink {
  label: string;
  url: string;
}

export interface CvBasics {
  name: string;
  headline: string;
  location: string;
  phone: string;
  email: string;
  links: CvLink[];
}

export interface CvEmployment {
  title: string;
  company: string;
  location: string;
  start: string; // YYYY-MM
  end?: string; // YYYY-MM (omit for present)
  highlights: string[];
}

export interface CvEducation {
  degree: string;
  institution: string;
  location: string;
  start: string; // YYYY-MM
  end: string; // YYYY-MM
  focus?: string;
}

export interface CvCourse {
  name: string;
  provider: string;
  date: string; // YYYY-MM
}

export interface CvLanguage {
  name: string;
  level?: string;
}

export interface CvData {
  basics: CvBasics;
  profile: string;
  skills: string[];
  languages: CvLanguage[];
  employment: CvEmployment[];
  education: CvEducation[];
  courses: CvCourse[];
}
