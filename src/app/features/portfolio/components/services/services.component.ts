import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ServiceItem } from '../../../../core/models/resume.models';
import { InViewDirective } from '../../../../shared/directives/in-view.directive';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [LucideAngularModule, InViewDirective],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent {
  readonly services = input<ServiceItem[]>([]);
}
