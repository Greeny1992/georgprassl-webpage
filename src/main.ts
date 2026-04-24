import {
  enableProdMode,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { ROUTES } from './app/app-routing.routes';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import {
  LucideAngularModule,
  Compass,
  Code,
  LifeBuoy,
  GitBranch,
  Menu,
  X,
  Sun,
  Moon,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  ArrowRight,
  Download,
  Quote,
  Check,
  ChevronDown,
  ExternalLink,
  Award,
  Mountain,
  Shield,
  GraduationCap,
  Calendar,
} from 'lucide-angular';

if (environment.production) {
  enableProdMode();
}

console.info(
  ` /\\_/\\
( o.o )  Curious cat says hi!
 > ^ <  I appreciate your keen eye in my code and your way of analyzing this page.
        If you spot anything odd or have ideas to improve it, please contact: office@georgprassl.at`,
);

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    importProvidersFrom(BrowserModule),
    importProvidersFrom(
      LucideAngularModule.pick({
        Compass,
        Code,
        LifeBuoy,
        GitBranch,
        Menu,
        X,
        Sun,
        Moon,
        Mail,
        Phone,
        MapPin,
        Linkedin,
        Globe,
        ArrowRight,
        Download,
        Quote,
        Check,
        ChevronDown,
        ExternalLink,
        Award,
        Mountain,
        Shield,
        GraduationCap,
        Calendar,
      }),
    ),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideRouter(ROUTES),
  ],
}).catch((err) => console.error(err));
