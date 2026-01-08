import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';
import { CvService } from '../cv/cv.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        {
          provide: CvService,
          useValue: {
            cv$: of({
              basics: {
                name: 'Test Name',
                headline: 'Test Headline',
                location: 'Test Location',
                phone: 'Test Phone',
                email: 'test@example.com',
                links: [],
              },
              profile: 'Test Profile',
              skills: ['Skill A'],
              languages: [{ name: 'English' }],
              employment: [],
              education: [],
              courses: [],
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
