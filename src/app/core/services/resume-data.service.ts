import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import {
  ResumeData,
  isValidBasics,
  getEmptyResumeData,
} from '../models/resume.models';

/**
 * Service responsible for loading resume data from JSON file.
 * - Loads /assets/resume.json via HttpClient
 * - Caches the result using shareReplay(1)
 * - Provides runtime validation and safe fallback
 */
@Injectable({
  providedIn: 'root',
})
export class ResumeDataService {
  private readonly dataUrl = 'assets/resume.json';

  /**
   * Cached observable of resume data.
   * Uses shareReplay to ensure JSON is loaded only once.
   */
  readonly resumeData$: Observable<ResumeData>;

  constructor(private readonly http: HttpClient) {
    this.resumeData$ = this.http.get<ResumeData>(this.dataUrl).pipe(
      map((data) => this.validateAndNormalize(data)),
      catchError((error) => {
        console.error('Failed to load resume data:', error);
        return of(getEmptyResumeData());
      }),
      shareReplay({ bufferSize: 1, refCount: false })
    );
  }

  /**
   * Validates and normalizes resume data to prevent runtime crashes.
   * Ensures all required fields exist with safe defaults.
   */
  private validateAndNormalize(data: any): ResumeData {
    if (!data || typeof data !== 'object') {
      console.warn('Invalid resume data structure');
      return getEmptyResumeData();
    }

    // Validate basics
    if (!isValidBasics(data.basics)) {
      console.warn('Invalid basics section');
      data.basics = getEmptyResumeData().basics;
    }

    // Ensure arrays exist
    return {
      basics: data.basics,
      profile: data.profile || '',
      skills: Array.isArray(data.skills) ? data.skills : [],
      languages: Array.isArray(data.languages) ? data.languages : [],
      employment: Array.isArray(data.employment) ? data.employment : [],
      education: Array.isArray(data.education) ? data.education : [],
      courses: Array.isArray(data.courses) ? data.courses : [],
    };
  }
}
