import { HighlightItem } from 'src/app/core/models/resume.models';

export interface TimelineItemData {
  title: string;
  subtitle: string;
  dateRange: string;
  initials?: string;
  details?: string;
  highlights?: (HighlightItem | string)[];
  _sortStart?: string;
  _sortEnd?: string;
}
