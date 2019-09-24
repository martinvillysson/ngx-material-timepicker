import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ElementRef,
  ViewChild,
  ViewContainerRef,
  OnDestroy,
  ViewEncapsulation } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { TimepickerDirective } from './directives/ngx-timepicker.directive';
import { DateTime } from 'luxon';
import {
    NgxMaterialTimepickerContentComponent
} from './components/ngx-material-timepicker-content/ngx-material-timepicker-content.component';
import { TimepickerRef } from './models/timepicker-ref.interface';
import {ComponentPortal} from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';

const ESCAPE = 27;

@Component({
    selector: 'ngx-material-timepicker',
    templateUrl: 'ngx-material-timepicker.component.html',
    styleUrls: ['./ngx-material-timepicker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NgxMaterialTimepickerComponent implements TimepickerRef, OnDestroy {
    timeUpdated = new Subject<string>();
    @ViewChild('pickerTmpl', { static: true }) pickerTmpl: TemplateRef<any>;
    @Input() cancelBtnTmpl: TemplateRef<Node>;
    @Input() editableHintTmpl: TemplateRef<Node>;
    @Input() confirmBtnTmpl: TemplateRef<Node>;
    @Input('ESC') isEsc = true;
    @Input() enableKeyboardInput: boolean;
    @Input() preventOverlayClick: boolean;
    @Input() disableAnimation: boolean;
    @Input() defaultTime: string;
    @Input() trigger: ElementRef;
    overlayRef: OverlayRef;
    overlayDetachmentsSubscription: any;
    overlayBackdropClickSubscription: any;
    overlayKeyDownSubscription: any;
    subscriptions = new Subscription();

    @Input()
    set format(value: number) {
        this._format = value === 24 ? 24 : 12;
    }

    get format(): number {
        return this.timepickerInput ? this.timepickerInput.format : this._format;
    }

    @Input()
    set minutesGap(gap: number) {
        if (gap == null) {
            return;
        }
        gap = Math.floor(gap);
        this._minutesGap = gap <= 59 ? gap : 1;
    }

    get minutesGap(): number {
        return this._minutesGap;
    }

    @Output() timeSet = new EventEmitter<string>();
    @Output() opened = new EventEmitter<null>();
    @Output() closed = new EventEmitter<null>();
    @Output() hourSelected = new EventEmitter<number>();

    private _minutesGap: number;
    private _format: number;
    private timepickerInput: TimepickerDirective;

    constructor(private overlay: Overlay, private vcr: ViewContainerRef) {
    }

    get minTime(): DateTime {
        return this.timepickerInput && (this.timepickerInput.min as DateTime);
    }

    get maxTime(): DateTime {
        return this.timepickerInput && (this.timepickerInput.max as DateTime);
    }

    get disabled(): boolean {
        return this.timepickerInput && this.timepickerInput.disabled;
    }

    get time(): string {
        return this.timepickerInput && this.timepickerInput.value;
    }

    /***
     * Register an input with this timepicker.
     * input - The timepicker input to register with this timepicker
     */
    registerInput(input: TimepickerDirective): void {
        if (this.timepickerInput) {
            throw Error('A Timepicker can only be associated with a single input.');
        }

        this.timepickerInput = input;
        this.trigger = input.elementRef;
    }

    open(): void {

      const positionStrategy = this.overlay
        .position()
        .flexibleConnectedTo(this.trigger)
        .withPositions([{originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center'}]);

      this.overlayRef = this.overlay.create({
        hasBackdrop: true,
        positionStrategy: positionStrategy,
        disposeOnNavigation: true,
      });

      this.subscriptions.add(this.overlayRef
      .keydownEvents()
      .subscribe((event: KeyboardEvent) => {
        if (event.key !== undefined) {
          if (event.key === 'Escape') {
            this.overlayRef.detach();
          }
        } else {
          // tslint:disable-next-line:deprecation
          if (event.keyCode === ESCAPE) {
            this.overlayRef.detach();
          }
        }
      }));

      this.subscriptions.add(this.overlayRef.backdropClick().subscribe((event: MouseEvent) => {
        this.overlayRef.detach();
      }));

      this.subscriptions.add(this.overlayRef.detachments().subscribe(() => {
        this.closed.next();
      }));

      const ngxMaterialTimepickerContentComponentPortal = new ComponentPortal(NgxMaterialTimepickerContentComponent, this.vcr);

        const ngxMaterialTimepickerContentComponent = this.overlayRef.attach(ngxMaterialTimepickerContentComponentPortal);

        ngxMaterialTimepickerContentComponent.instance.timepickerBaseRef = this;
        ngxMaterialTimepickerContentComponent.instance.time = this.time;
        ngxMaterialTimepickerContentComponent.instance.defaultTime = this.defaultTime;
        ngxMaterialTimepickerContentComponent.instance.maxTime = this.maxTime;
        ngxMaterialTimepickerContentComponent.instance.minTime = this.minTime;
        ngxMaterialTimepickerContentComponent.instance.format = this.format;
        ngxMaterialTimepickerContentComponent.instance.minutesGap = this.minutesGap;
        ngxMaterialTimepickerContentComponent.instance.disableAnimation = this.disableAnimation;
        ngxMaterialTimepickerContentComponent.instance.cancelBtnTmpl = this.cancelBtnTmpl;
        ngxMaterialTimepickerContentComponent.instance.confirmBtnTmpl = this.confirmBtnTmpl;
        ngxMaterialTimepickerContentComponent.instance.editableHintTmpl = this.editableHintTmpl;
        ngxMaterialTimepickerContentComponent.instance.disabled = this.disabled;
        ngxMaterialTimepickerContentComponent.instance.enableKeyboardInput = this.enableKeyboardInput;
        ngxMaterialTimepickerContentComponent.instance.preventOverlayClick = this.preventOverlayClick;
        this.opened.next();
    }

    close(): void {
        this.overlayRef.detach();
    }

    updateTime(time: string): void {
        this.timeUpdated.next(time);
    }

    ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
    }
}
