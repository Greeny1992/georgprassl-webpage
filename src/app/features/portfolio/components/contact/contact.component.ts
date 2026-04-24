import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ResumeBasics } from '../../../../core/models/resume.models';
import { InViewDirective } from '../../../../shared/directives/in-view.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [LucideAngularModule, InViewDirective],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  readonly basics = input.required<ResumeBasics>();

  linkIcon(label: string): string {
    const lower = label.toLowerCase();
    if (lower.includes('linkedin')) return 'linkedin';
    if (lower.includes('@') || lower.startsWith('mailto')) return 'mail';
    return 'external-link';
  }
}
