import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ResumeBasics } from '../../../../core/models/resume.models';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  readonly basics = input.required<ResumeBasics>();
}
