import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { ResumeDataService } from './core/services/resume-data.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppComponent],
      providers: [
        {
          provide: ResumeDataService,
          useValue: {
            resumeData$: of({
              basics: {
                name: 'Test Name',
                headline: 'Test Headline',
                location: 'Test Location',
                phone: 'Test Phone',
                email: 'test@example.com',
                links: [],
              },
              profile: 'Test Profile',
              skills: [],
              languages: [],
              employment: [],
              education: [],
              courses: [],
            }),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render name in toolbar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.app-name')?.textContent).toContain(
      'Test Name',
    );
  });
});
