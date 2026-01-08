import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { CvData } from './cv.model';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  readonly cv$ = this.http
    .get<CvData>('assets/cv/cv.json')
    .pipe(shareReplay({ bufferSize: 1, refCount: false }));

  constructor(private readonly http: HttpClient) {}
}
