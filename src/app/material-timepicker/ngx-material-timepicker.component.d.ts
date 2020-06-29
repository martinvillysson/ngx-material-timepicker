import { EventEmitter, TemplateRef, ElementRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { TimepickerDirective } from './directives/ngx-timepicker.directive';
import { DateTime } from 'luxon';
import { TimepickerRef } from './models/timepicker-ref.interface';
import { Overlay, OverlayRef, ConnectedPosition } from '@angular/cdk/overlay';
export declare class NgxMaterialTimepickerComponent implements TimepickerRef, OnDestroy {
    private overlay;
    private vcr;
    timeUpdated: Subject<string>;
    pickerTmpl: TemplateRef<any>;
    cancelBtnTmpl: TemplateRef<Node>;
    editableHintTmpl: TemplateRef<Node>;
    confirmBtnTmpl: TemplateRef<Node>;
    isEsc: boolean;
    enableKeyboardInput: boolean;
    preventOverlayClick: boolean;
    disableAnimation: boolean;
    defaultTime: string;
    trigger: ElementRef;
    panelClass: string;
    positions: ConnectedPosition[];
    overlayRef: OverlayRef;
    overlayDetachmentsSubscription: any;
    overlayBackdropClickSubscription: any;
    overlayKeyDownSubscription: any;
    subscriptions: Subscription;
    set format(value: number);
    get format(): number;
    set minutesGap(gap: number);
    get minutesGap(): number;
    timeSet: EventEmitter<string>;
    opened: EventEmitter<null>;
    closed: EventEmitter<null>;
    hourSelected: EventEmitter<number>;
    private _minutesGap;
    private _format;
    private timepickerInput;
    constructor(overlay: Overlay, vcr: ViewContainerRef);
    get minTime(): DateTime;
    get maxTime(): DateTime;
    get disabled(): boolean;
    get time(): string;
    /***
     * Register an input with this timepicker.
     * input - The timepicker input to register with this timepicker
     */
    registerInput(input: TimepickerDirective): void;
    open(): void;
    close(): void;
    updateTime(time: string): void;
    ngOnDestroy(): void;
}
