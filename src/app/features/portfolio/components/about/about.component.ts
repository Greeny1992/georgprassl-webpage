import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import {
  AboutSection,
  LanguageItem,
} from '../../../../core/models/resume.models';
import { InViewDirective } from '../../../../shared/directives/in-view.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [LucideAngularModule, InViewDirective],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  readonly about = input<AboutSection | undefined>(undefined);
  readonly languages = input<LanguageItem[]>([]);
}
