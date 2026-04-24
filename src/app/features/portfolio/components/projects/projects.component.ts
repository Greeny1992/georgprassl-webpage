import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ProjectItem } from '../../../../core/models/resume.models';
import { InViewDirective } from '../../../../shared/directives/in-view.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [LucideAngularModule, InViewDirective],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  readonly projects = input<ProjectItem[]>([]);
}
