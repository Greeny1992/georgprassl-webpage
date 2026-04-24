import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Testimonial } from '../../../../core/models/resume.models';
import { InViewDirective } from '../../../../shared/directives/in-view.directive';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [LucideAngularModule, InViewDirective],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent {
  readonly testimonials = input<Testimonial[]>([]);
}
