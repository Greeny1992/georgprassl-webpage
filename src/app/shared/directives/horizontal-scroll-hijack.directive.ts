import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  HostListener,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Directive to hijack vertical scroll and convert to horizontal scroll
 * when the timeline container is in viewport and has horizontal scrollability.
 *
 * Improvements:
 * - RAF throttling for smooth scrolling
 * - Normalized deltaMode handling (pixel vs line)
 * - Only preventDefault when horizontal scroll is actually possible
 * - Immediate release at boundaries
 */
@Directive({
  selector: '[appHorizontalScrollHijack]',
  standalone: true,
})
export class HorizontalScrollHijackDirective implements OnInit, OnDestroy {
  private observer?: IntersectionObserver;
  private isActive = false;
  private element: HTMLElement;
  private prefersReducedMotion = false;
  private rafPending = false;
  private accumulatedDelta = 0;

  constructor(
    private el: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.element = this.el.nativeElement;
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.prefersReducedMotion = mediaQuery.matches;
    mediaQuery.addEventListener('change', (e) => {
      this.prefersReducedMotion = e.matches;
    });

    // Observe when timeline enters/exits viewport
    // Use narrower threshold to prevent multi-timeline activation
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Activate when ≥70% visible (stricter to avoid overlap)
          this.isActive = entry.intersectionRatio >= 0.7;
        });
      },
      {
        threshold: [0, 0.5, 0.7, 1],
      }
    );

    this.observer.observe(this.element);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    if (!this.isActive || this.prefersReducedMotion) {
      return;
    }

    // Normalize deltaY based on deltaMode
    let normalizedDelta = event.deltaY;
    if (event.deltaMode === 1) {
      // Line mode: multiply by ~16px per line
      normalizedDelta *= 16;
    } else if (event.deltaMode === 2) {
      // Page mode: multiply by viewport height
      normalizedDelta *= window.innerHeight;
    }

    const { scrollLeft, scrollWidth, clientWidth } = this.element;
    const maxScrollLeft = scrollWidth - clientWidth;

    // Check if horizontal scroll is possible in the intended direction
    const scrollingRight = normalizedDelta > 0;
    const canScrollRight = scrollLeft < maxScrollLeft - 2; // 2px threshold
    const canScrollLeft = scrollLeft > 2;

    const shouldHijack = scrollingRight ? canScrollRight : canScrollLeft;

    // Only preventDefault if we can actually scroll horizontally
    if (shouldHijack) {
      event.preventDefault();
      this.accumulatedDelta += normalizedDelta;

      // Use RAF to throttle and smooth the scrolling
      if (!this.rafPending) {
        this.rafPending = true;
        requestAnimationFrame(() => {
          this.element.scrollLeft += this.accumulatedDelta;
          this.accumulatedDelta = 0;
          this.rafPending = false;
        });
      }
    }
    // Otherwise, allow default vertical scroll immediately
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (!this.isActive) {
      return;
    }

    // ArrowLeft/Right for horizontal navigation
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.element.scrollBy({ left: -200, behavior: 'smooth' });
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.element.scrollBy({ left: 200, behavior: 'smooth' });
    }
  }
}
