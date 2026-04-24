import { Component, input } from '@angular/core';
import { TechStackGroup } from '../../../../core/models/resume.models';
import { InViewDirective } from '../../../../shared/directives/in-view.directive';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [InViewDirective],
  templateUrl: './tech-stack.component.html',
  styleUrls: ['./tech-stack.component.scss'],
})
export class TechStackComponent {
  readonly groups = input<TechStackGroup[]>([]);
}
