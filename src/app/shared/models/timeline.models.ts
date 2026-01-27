import { HighlightItem } from 'src/app/core/models/resume.models';

export interface TimelineItemData {
  title: string;
  subtitle: string;
  dateRange: string;
  details?: string;
  highlights?: (HighlightItem | string)[];
  logoUrl?: string;
  _sortStart?: string;
  _sortEnd?: string;
}
