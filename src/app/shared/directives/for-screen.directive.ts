import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  AfterViewInit,
  OnInit,
  OnDestroy
} from '@angular/core';
import { IForScreenConfig } from '../models/for-screen-config.model';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Directive({
  selector: '[appForScreen]',
})
export class ForScreenDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input() appForScreen: string;
  private hasMobileView = false;
  private hasTabletView = false;
  private hasDesktopView = false;
  private config: IForScreenConfig = { mobile: 767, tablet: 991 };
  private viewPortWidth = window.innerWidth;
  resizeObservable$: Observable<any>;
  resizeSubscription$: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    if (
      this.appForScreen === 'mobile' &&
      this.viewPortWidth <= this.config.mobile
    ) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasMobileView = true;
    } else if (
      this.appForScreen === 'tablet' &&
      this.viewPortWidth <= this.config.tablet &&
      this.viewPortWidth > this.config.mobile
    ) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasTabletView = true;
    } else if (
      this.appForScreen === 'desktop' &&
      this.viewPortWidth > this.config.tablet
    ) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasDesktopView = true;
    } else if (
      this.appForScreen === 'desktop&tablet' &&
      this.viewPortWidth > this.config.mobile
    ) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasDesktopView = true;
      this.hasTabletView = true;
    } else {
      this.viewContainer.clear();
    }
  }

  ngAfterViewInit() {
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe((event) => {
      this.viewPortWidth = event.target.innerWidth;
      if (
        this.appForScreen === 'mobile' &&
        this.viewPortWidth <= this.config.mobile &&
        !this.hasMobileView
      ) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasMobileView = true;
      } else if (
        this.appForScreen === 'mobile' &&
        this.viewPortWidth > this.config.mobile &&
        this.hasMobileView
      ) {
        this.viewContainer.clear();
        this.hasMobileView = false;
      }
      if (
        this.appForScreen === 'tablet' &&
        this.viewPortWidth <= this.config.tablet &&
        this.viewPortWidth > this.config.mobile &&
        !this.hasTabletView
      ) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasTabletView = true;
      } else if (
        this.appForScreen === 'tablet' &&
        (this.viewPortWidth > this.config.tablet ||
          this.viewPortWidth <= this.config.mobile) &&
        this.hasTabletView
      ) {
        this.viewContainer.clear();
        this.hasTabletView = false;
      }
      if (
        this.appForScreen === 'desktop' &&
        this.viewPortWidth > this.config.tablet &&
        !this.hasDesktopView
      ) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasDesktopView = true;
      } else if (
        this.appForScreen === 'desktop' &&
        this.viewPortWidth <= this.config.tablet &&
        this.hasDesktopView
      ) {
        this.viewContainer.clear();
        this.hasDesktopView = false;
      }
      if (
        this.appForScreen === 'desktop&tablet' &&
        this.viewPortWidth > this.config.mobile &&
        !this.hasDesktopView && !this.hasTabletView
      ) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasDesktopView = true;
        this.hasTabletView = true;
      } else if (
        this.appForScreen === 'desktop&tablet' &&
        this.viewPortWidth <= this.config.mobile &&
        this.hasDesktopView && this.hasTabletView
      ) {
        this.viewContainer.clear();
        this.hasDesktopView = false;
        this.hasTabletView = false;
      }
      if (
        this.appForScreen === 'desktop&mobile' &&
        (this.viewPortWidth > this.config.tablet || this.viewPortWidth <= this.config.mobile) &&
        !this.hasDesktopView && !this.hasMobileView
      ) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasDesktopView = true;
        this.hasMobileView = true;
      } else if (
        this.appForScreen === 'desktop&mobile' &&
        this.viewPortWidth <= this.config.tablet &&
        this.viewPortWidth > this.config.mobile &&
        this.hasDesktopView && this.hasMobileView
      ) {
        this.viewContainer.clear();
        this.hasDesktopView = false;
        this.hasMobileView = false;
      }
      if (
        this.appForScreen === 'tablet&mobile' &&
        this.viewPortWidth <= this.config.tablet &&
        !this.hasTabletView && !this.hasMobileView
      ) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasTabletView = true;
        this.hasMobileView = true;
      } else if (
        this.appForScreen === 'tablet&mobile' &&
        this.viewPortWidth > this.config.tablet &&
        this.hasTabletView && this.hasMobileView
      ) {
        this.viewContainer.clear();
        this.hasTabletView = false;
        this.hasMobileView = false;
      }
    });
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe();
  }
}
