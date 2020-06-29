import { ɵɵdefineInjectable, Injectable, Component, Input, EventEmitter, ViewEncapsulation, ViewContainerRef, ViewChild, Output, Directive, ContentChild, InjectionToken, forwardRef, ElementRef, Inject, HostListener, Renderer2, ChangeDetectionStrategy, Pipe, Optional, NgModule } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { trigger, transition, style, animate, sequence } from '@angular/animations';
import { DateTime, Info } from 'luxon';
import { shareReplay, takeUntil } from 'rxjs/operators';
import { ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

var TimeUnit;
(function (TimeUnit) {
    TimeUnit[TimeUnit["HOUR"] = 0] = "HOUR";
    TimeUnit[TimeUnit["MINUTE"] = 1] = "MINUTE";
})(TimeUnit || (TimeUnit = {}));

var TimePeriod;
(function (TimePeriod) {
    TimePeriod["AM"] = "AM";
    TimePeriod["PM"] = "PM";
})(TimePeriod || (TimePeriod = {}));

var TimeFormat;
(function (TimeFormat) {
    TimeFormat["TWELVE"] = "hh:mm a";
    TimeFormat["TWELVE_SHORT"] = "h:m a";
    TimeFormat["TWENTY_FOUR"] = "HH:mm";
    TimeFormat["TWENTY_FOUR_SHORT"] = "H:m";
})(TimeFormat || (TimeFormat = {}));

function isSameOrAfter(time, compareWith, unit = 'minutes') {
    if (unit === 'hours') {
        return time.hour >= compareWith.hour;
    }
    if (unit === 'minutes') {
        return time.hasSame(compareWith, unit) || time.valueOf() > compareWith.valueOf();
    }
}
function isSameOrBefore(time, compareWith, unit = 'minutes') {
    if (unit === 'hours') {
        return time.hour <= compareWith.hour;
    }
    if (unit === 'minutes') {
        return time.hasSame(compareWith, unit) || time.valueOf() <= compareWith.valueOf();
    }
}
function isBetween(time, before, after, unit = 'minutes') {
    if (unit === 'hours') {
        return isSameOrBefore(time, after, unit) && isSameOrAfter(time, before, unit);
    }
    if (unit === 'minutes') {
        return isSameOrBefore(time, after) && isSameOrAfter(time, before);
    }
}
function isDigit(e) {
    // Allow: backspace, delete, tab, escape, enter
    if ([46, 8, 9, 27, 13].some(n => n === e.keyCode) ||
        // Allow: Ctrl/cmd+A
        (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+C
        (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+X
        (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right, up, down
        (e.keyCode >= 35 && e.keyCode <= 40)) {
        return true;
    }
    return !((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105));
}

// @dynamic
class TimeAdapter {
    static parseTime(time, opts) {
        const { numberingSystem, locale } = TimeAdapter.getLocaleOptionsByTime(time, opts);
        const isPeriodExist = time.split(' ').length === 2;
        const timeMask = isPeriodExist ? TimeFormat.TWELVE_SHORT : TimeFormat.TWENTY_FOUR_SHORT;
        return DateTime.fromFormat(time, timeMask, { numberingSystem, locale });
    }
    static formatTime(time, opts) {
        const { format } = opts;
        return TimeAdapter.parseTime(time, opts).setLocale(TimeAdapter.DEFAULT_LOCALE)
            .toLocaleString(Object.assign(Object.assign({}, DateTime.TIME_SIMPLE), { hour12: format !== 24, numberingSystem: TimeAdapter.DEFAULT_NUMBERING_SYSTEM }));
    }
    static toLocaleTimeString(time, opts = {}) {
        const { format = TimeAdapter.DEFAULT_FORMAT, locale = TimeAdapter.DEFAULT_LOCALE } = opts;
        const timeFormat = Object.assign(Object.assign({}, DateTime.TIME_SIMPLE), { hour12: format !== 24 });
        const timeMask = (format === 24) ? TimeFormat.TWENTY_FOUR_SHORT : TimeFormat.TWELVE_SHORT;
        return DateTime.fromFormat(time, timeMask).setLocale(locale).toLocaleString(timeFormat);
    }
    static isTimeAvailable(time, min, max, granularity, minutesGap, format) {
        if (!time) {
            return;
        }
        const convertedTime = this.parseTime(time, { format });
        const minutes = convertedTime.minute;
        if (minutesGap && minutes === minutes && minutes % minutesGap !== 0) {
            throw new Error(`Your minutes - ${minutes} doesn\'t match your minutesGap - ${minutesGap}`);
        }
        const isAfter = (min && !max)
            && isSameOrAfter(convertedTime, min, granularity);
        const isBefore = (max && !min)
            && isSameOrBefore(convertedTime, max, granularity);
        const between = (min && max)
            && isBetween(convertedTime, min, max, granularity);
        const isAvailable = !min && !max;
        return isAfter || isBefore || between || isAvailable;
    }
    /***
     *  Format hour according to time format (12 or 24)
     */
    static formatHour(currentHour, format, period) {
        if (format === 24) {
            return currentHour;
        }
        const hour = period === TimePeriod.AM ? currentHour : currentHour + 12;
        if (period === TimePeriod.AM && hour === 12) {
            return 0;
        }
        else if (period === TimePeriod.PM && hour === 24) {
            return 12;
        }
        return hour;
    }
    static fromDateTimeToString(time, format) {
        const timeFormat = format === 24 ? TimeFormat.TWENTY_FOUR : TimeFormat.TWELVE;
        return time.reconfigure({
            numberingSystem: TimeAdapter.DEFAULT_NUMBERING_SYSTEM,
            locale: TimeAdapter.DEFAULT_LOCALE
        }).toFormat(timeFormat);
    }
    static getLocaleOptionsByTime(time, opts) {
        const { numberingSystem, locale } = DateTime.local().setLocale(opts.locale).resolvedLocaleOpts();
        const localeConfig = { numberingSystem: numberingSystem, locale };
        const defaultConfig = { numberingSystem: TimeAdapter.DEFAULT_NUMBERING_SYSTEM, locale: TimeAdapter.DEFAULT_LOCALE };
        return isNaN(parseInt(time, 10)) ? localeConfig : defaultConfig;
    }
}
TimeAdapter.DEFAULT_FORMAT = 12;
TimeAdapter.DEFAULT_LOCALE = 'en-US';
TimeAdapter.DEFAULT_NUMBERING_SYSTEM = 'latn';

const DEFAULT_HOUR = {
    time: 12,
    angle: 360
};
const DEFAULT_MINUTE = {
    time: 0,
    angle: 360
};
class NgxMaterialTimepickerService {
    constructor() {
        this.hourSubject = new BehaviorSubject(DEFAULT_HOUR);
        this.minuteSubject = new BehaviorSubject(DEFAULT_MINUTE);
        this.periodSubject = new BehaviorSubject(TimePeriod.AM);
    }
    set hour(hour) {
        this.hourSubject.next(hour);
    }
    get selectedHour() {
        return this.hourSubject.asObservable();
    }
    set minute(minute) {
        this.minuteSubject.next(minute);
    }
    get selectedMinute() {
        return this.minuteSubject.asObservable();
    }
    set period(period) {
        const isPeriodValid = (period === TimePeriod.AM) || (period === TimePeriod.PM);
        if (isPeriodValid) {
            this.periodSubject.next(period);
        }
    }
    get selectedPeriod() {
        return this.periodSubject.asObservable();
    }
    setDefaultTimeIfAvailable(time, min, max, format, minutesGap) {
        /* Workaround to double error message*/
        try {
            if (TimeAdapter.isTimeAvailable(time, min, max, 'minutes', minutesGap)) {
                this.setDefaultTime(time, format);
            }
        }
        catch (e) {
            console.error(e);
        }
    }
    getFullTime(format) {
        const hour = this.hourSubject.getValue().time;
        const minute = this.minuteSubject.getValue().time;
        const period = format === 12 ? this.periodSubject.getValue() : '';
        const time = `${hour}:${minute} ${period}`.trim();
        return TimeAdapter.formatTime(time, { format });
    }
    setDefaultTime(time, format) {
        const defaultTime = TimeAdapter.parseTime(time, { format }).toJSDate();
        if (DateTime.fromJSDate(defaultTime).isValid) {
            const period = time.substr(time.length - 2).toUpperCase();
            const hour = defaultTime.getHours();
            this.hour = Object.assign(Object.assign({}, DEFAULT_HOUR), { time: formatHourByPeriod(hour, period) });
            this.minute = Object.assign(Object.assign({}, DEFAULT_MINUTE), { time: defaultTime.getMinutes() });
            this.period = period;
        }
        else {
            this.resetTime();
        }
    }
    resetTime() {
        this.hour = Object.assign({}, DEFAULT_HOUR);
        this.minute = Object.assign({}, DEFAULT_MINUTE);
        this.period = TimePeriod.AM;
    }
}
NgxMaterialTimepickerService.ɵprov = ɵɵdefineInjectable({ factory: function NgxMaterialTimepickerService_Factory() { return new NgxMaterialTimepickerService(); }, token: NgxMaterialTimepickerService, providedIn: "root" });
NgxMaterialTimepickerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/***
 *  Format hour in 24hours format to meridian (AM or PM) format
 */
function formatHourByPeriod(hour, period) {
    switch (period) {
        case TimePeriod.AM:
            return hour === 0 ? 12 : hour;
        case TimePeriod.PM:
            return hour === 12 ? 12 : hour - 12;
        default:
            return hour;
    }
}

var AnimationState;
(function (AnimationState) {
    AnimationState["ENTER"] = "enter";
    AnimationState["LEAVE"] = "leave";
})(AnimationState || (AnimationState = {}));
class NgxMaterialTimepickerContentComponent {
    constructor(timepickerService) {
        this.timepickerService = timepickerService;
        this.timeUnit = TimeUnit;
        this.activeTimeUnit = TimeUnit.HOUR;
        this.unsubscribe = new Subject();
    }
    set defaultTime(time) {
        this.setDefaultTime(time);
    }
    ngOnInit() {
        this.animationState = !this.disableAnimation && AnimationState.ENTER;
        this.defineTime();
        this.selectedHour = this.timepickerService.selectedHour
            .pipe(shareReplay({ bufferSize: 1, refCount: true }));
        this.selectedMinute = this.timepickerService.selectedMinute
            .pipe(shareReplay({ bufferSize: 1, refCount: true }));
        this.selectedPeriod = this.timepickerService.selectedPeriod
            .pipe(shareReplay({ bufferSize: 1, refCount: true }));
        this.timepickerBaseRef.timeUpdated.pipe(takeUntil(this.unsubscribe))
            .subscribe(this.setDefaultTime.bind(this));
    }
    onHourChange(hour) {
        this.timepickerService.hour = hour;
    }
    onHourSelected(hour) {
        this.changeTimeUnit(TimeUnit.MINUTE);
        this.timepickerBaseRef.hourSelected.next(hour);
    }
    onMinuteChange(minute) {
        this.timepickerService.minute = minute;
    }
    changePeriod(period) {
        this.timepickerService.period = period;
    }
    changeTimeUnit(unit) {
        this.activeTimeUnit = unit;
    }
    setTime() {
        this.timepickerBaseRef.timeSet.next(this.timepickerService.getFullTime(this.format));
        this.close();
    }
    close() {
        if (this.disableAnimation) {
            this.timepickerBaseRef.close();
            return;
        }
        this.animationState = AnimationState.LEAVE;
    }
    animationDone(event) {
        if (event.phaseName === 'done' && event.toState === AnimationState.LEAVE) {
            this.timepickerBaseRef.close();
        }
    }
    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
    setDefaultTime(time) {
        this.timepickerService.setDefaultTimeIfAvailable(time, this.minTime, this.maxTime, this.format, this.minutesGap);
    }
    defineTime() {
        const minTime = this.minTime;
        if (minTime && !this.time) {
            const time = TimeAdapter.fromDateTimeToString(minTime, this.format);
            this.setDefaultTime(time);
        }
    }
}
NgxMaterialTimepickerContentComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker-content',
                template: "<div class=\"timepicker-overlay\">\r\n    <div class=\"timepicker\" [@timepicker]=\"animationState\" (@timepicker.done)=\"animationDone($event)\">\r\n        <header class=\"timepicker__header\">\r\n            <ngx-material-timepicker-dial [format]=\"format\" [hour]=\"(selectedHour | async)?.time\"\r\n                                          [minute]=\"(selectedMinute | async)?.time\"\r\n                                          [period]=\"selectedPeriod | async\"\r\n                                          [activeTimeUnit]=\"activeTimeUnit\"\r\n                                          [minTime]=\"minTime\"\r\n                                          [maxTime]=\"maxTime\"\r\n                                          [isEditable]=\"enableKeyboardInput\"\r\n                                          [editableHintTmpl]=\"editableHintTmpl\"\r\n                                          [minutesGap]=\"minutesGap\"\r\n                                          (periodChanged)=\"changePeriod($event)\"\r\n                                          (timeUnitChanged)=\"changeTimeUnit($event)\"\r\n                                          (hourChanged)=\"onHourChange($event)\"\r\n                                          (minuteChanged)=\"onMinuteChange($event)\"\r\n            ></ngx-material-timepicker-dial>\r\n        </header>\r\n        <div class=\"timepicker__main-content\">\r\n            <div class=\"timepicker__body\" [ngSwitch]=\"activeTimeUnit\">\r\n                <div *ngSwitchCase=\"timeUnit.HOUR\">\r\n                    <ngx-material-timepicker-24-hours-face *ngIf=\"format === 24;else ampmHours\"\r\n                                                           (hourChange)=\"onHourChange($event)\"\r\n                                                           [selectedHour]=\"selectedHour | async\"\r\n                                                           [minTime]=\"minTime\"\r\n                                                           [maxTime]=\"maxTime\"\r\n                                                           [format]=\"format\"\r\n                                                           (hourSelected)=\"onHourSelected($event)\"></ngx-material-timepicker-24-hours-face>\r\n                    <ng-template #ampmHours>\r\n                        <ngx-material-timepicker-12-hours-face\r\n                            (hourChange)=\"onHourChange($event)\"\r\n                            [selectedHour]=\"selectedHour | async\"\r\n                            [period]=\"selectedPeriod | async\"\r\n                            [minTime]=\"minTime\"\r\n                            [maxTime]=\"maxTime\"\r\n                            (hourSelected)=\"onHourSelected($event)\"></ngx-material-timepicker-12-hours-face>\r\n                    </ng-template>\r\n                </div>\r\n                <ngx-material-timepicker-minutes-face *ngSwitchCase=\"timeUnit.MINUTE\"\r\n                                                      [selectedMinute]=\"selectedMinute | async\"\r\n                                                      [selectedHour]=\"(selectedHour | async)?.time\"\r\n                                                      [minTime]=\"minTime\"\r\n                                                      [maxTime]=\"maxTime\"\r\n                                                      [format]=\"format\"\r\n                                                      [period]=\"selectedPeriod | async\"\r\n                                                      [minutesGap]=\"minutesGap\"\r\n                                                      (minuteChange)=\"onMinuteChange($event)\"></ngx-material-timepicker-minutes-face>\r\n            </div>\r\n            <div class=\"timepicker__actions\">\r\n                <div (click)=\"close()\">\r\n                    <!--suppress HtmlUnknownAttribute -->\r\n                    <ng-container\r\n                        *ngTemplateOutlet=\"cancelBtnTmpl ? cancelBtnTmpl : cancelBtnDefault\"></ng-container>\r\n                </div>\r\n                <div (click)=\"setTime()\">\r\n                    <!--suppress HtmlUnknownAttribute -->\r\n                    <ng-container\r\n                        *ngTemplateOutlet=\"confirmBtnTmpl ? confirmBtnTmpl : confirmBtnDefault\"></ng-container>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<ng-template #cancelBtnDefault>\r\n    <ngx-material-timepicker-button>Cancel</ngx-material-timepicker-button>\r\n</ng-template>\r\n<ng-template #confirmBtnDefault>\r\n    <ngx-material-timepicker-button>Ok</ngx-material-timepicker-button>\r\n</ng-template>\r\n",
                animations: [
                    trigger('timepicker', [
                        transition(`* => ${AnimationState.ENTER}`, [
                            style({ transform: 'translateY(-30%)' }),
                            animate('0.2s ease-out', style({ transform: 'translateY(0)' }))
                        ]),
                        transition(`${AnimationState.ENTER} => ${AnimationState.LEAVE}`, [
                            style({ transform: 'translateY(0)', opacity: 1 }),
                            animate('0.2s ease-out', style({ transform: 'translateY(-30%)', opacity: 0 }))
                        ])
                    ])
                ],
                providers: [NgxMaterialTimepickerService],
                styles: [":host{--body-background-color:#fff;--button-color:#00bfff;--clock-face-background-color:#f0f0f0;--clock-face-inner-time-inactive-color:#929292;--clock-face-time-active-color:#fff;--clock-face-time-disabled-color:#c5c5c5;--clock-face-time-inactive-color:#6c6c6c;--clock-hand-color:#00bfff;--dial-active-color:#fff;--dial-background-color:#00bfff;--dial-editable-active-color:#00bfff;--dial-editable-background-color:#fff;--dial-inactive-color:hsla(0,0%,100%,0.5);--primary-font-family:\"Roboto\",sans-serif}.timepicker{border-radius:2px;box-shadow:0 14px 45px rgba(0,0,0,.25),0 10px 18px rgba(0,0,0,.22);outline:none;pointer-events:auto;position:static;width:300px;z-index:999}.timepicker__header{background-color:#00bfff;padding:15px 30px}@supports (background-color:var(--dial-background-color)){.timepicker__header{background-color:var(--dial-background-color)}}.timepicker__body{align-items:center;background-color:#fff;display:flex;justify-content:center;padding:15px 5px}@supports (background-color:var(--body-background-color)){.timepicker__body{background-color:var(--body-background-color)}}.timepicker__actions{background-color:#fff;display:flex;justify-content:flex-end;padding:15px}@supports (background-color:var(--body-background-color)){.timepicker__actions{background-color:var(--body-background-color)}}@media (max-device-width:1023px) and (orientation:landscape){.timepicker{display:flex;width:515px}.timepicker__header{align-items:center;display:flex}.timepicker__main-content{display:flex;flex-direction:column;width:100%}.timepicker__actions{margin-top:-1px;padding:5px}}"]
            },] }
];
NgxMaterialTimepickerContentComponent.ctorParameters = () => [
    { type: NgxMaterialTimepickerService }
];
NgxMaterialTimepickerContentComponent.propDecorators = {
    defaultTime: [{ type: Input }]
};

const ESCAPE = 27;
class NgxMaterialTimepickerComponent {
    constructor(overlay, vcr) {
        this.overlay = overlay;
        this.vcr = vcr;
        this.timeUpdated = new Subject();
        this.isEsc = true;
        this.positions = [{ originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' }];
        this.subscriptions = new Subscription();
        this.timeSet = new EventEmitter();
        this.opened = new EventEmitter();
        this.closed = new EventEmitter();
        this.hourSelected = new EventEmitter();
    }
    set format(value) {
        this._format = value === 24 ? 24 : 12;
    }
    get format() {
        return this.timepickerInput ? this.timepickerInput.format : this._format;
    }
    set minutesGap(gap) {
        if (gap == null) {
            return;
        }
        gap = Math.floor(gap);
        this._minutesGap = gap <= 59 ? gap : 1;
    }
    get minutesGap() {
        return this._minutesGap;
    }
    get minTime() {
        return this.timepickerInput && this.timepickerInput.min;
    }
    get maxTime() {
        return this.timepickerInput && this.timepickerInput.max;
    }
    get disabled() {
        return this.timepickerInput && this.timepickerInput.disabled;
    }
    get time() {
        return this.timepickerInput && this.timepickerInput.value;
    }
    /***
     * Register an input with this timepicker.
     * input - The timepicker input to register with this timepicker
     */
    registerInput(input) {
        if (this.timepickerInput) {
            throw Error('A Timepicker can only be associated with a single input.');
        }
        this.timepickerInput = input;
        this.trigger = input.elementRef;
    }
    open() {
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(this.trigger)
            .withPositions(this.positions);
        this.overlayRef = this.overlay.create({
            panelClass: this.panelClass,
            hasBackdrop: true,
            positionStrategy: positionStrategy,
            disposeOnNavigation: true,
        });
        this.subscriptions.add(this.overlayRef
            .keydownEvents()
            .subscribe((event) => {
            if (event.key !== undefined) {
                if (event.key === 'Escape') {
                    this.overlayRef.detach();
                }
            }
            else {
                // tslint:disable-next-line:deprecation
                if (event.keyCode === ESCAPE) {
                    this.overlayRef.detach();
                }
            }
        }));
        this.subscriptions.add(this.overlayRef.backdropClick().subscribe((event) => {
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
    close() {
        this.overlayRef.detach();
    }
    updateTime(time) {
        this.timeUpdated.next(time);
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
NgxMaterialTimepickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker',
                template: "<ng-template #pickerTmpl>\r\n</ng-template>\r\n",
                encapsulation: ViewEncapsulation.None,
                styles: ["@import url(C:\\mv\\ngx-material-timepicker\\node_modules\\@angular\\cdk\\overlay-prebuilt.css);"]
            },] }
];
NgxMaterialTimepickerComponent.ctorParameters = () => [
    { type: Overlay },
    { type: ViewContainerRef }
];
NgxMaterialTimepickerComponent.propDecorators = {
    pickerTmpl: [{ type: ViewChild, args: ['pickerTmpl', { static: true },] }],
    cancelBtnTmpl: [{ type: Input }],
    editableHintTmpl: [{ type: Input }],
    confirmBtnTmpl: [{ type: Input }],
    isEsc: [{ type: Input, args: ['ESC',] }],
    enableKeyboardInput: [{ type: Input }],
    preventOverlayClick: [{ type: Input }],
    disableAnimation: [{ type: Input }],
    defaultTime: [{ type: Input }],
    trigger: [{ type: Input }],
    panelClass: [{ type: Input }],
    positions: [{ type: Input }],
    format: [{ type: Input }],
    minutesGap: [{ type: Input }],
    timeSet: [{ type: Output }],
    opened: [{ type: Output }],
    closed: [{ type: Output }],
    hourSelected: [{ type: Output }]
};

/* To override a default toggle icon */
class NgxMaterialTimepickerToggleIconDirective {
}
NgxMaterialTimepickerToggleIconDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngxMaterialTimepickerToggleIcon]' },] }
];

class NgxMaterialTimepickerToggleComponent {
    get disabled() {
        return this._disabled === undefined ? this.timepicker.disabled : this._disabled;
    }
    set disabled(value) {
        this._disabled = value;
    }
    open(event) {
        if (this.timepicker) {
            this.timepicker.open();
            event.stopPropagation();
        }
    }
}
NgxMaterialTimepickerToggleComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker-toggle',
                template: "<button class=\"ngx-material-timepicker-toggle\" (click)=\"open($event)\" [disabled]=\"disabled\" type=\"button\">\r\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24px\" height=\"24px\" *ngIf=\"!customIcon\">\r\n        <path\r\n            d=\"M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003                   6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z\"/>\r\n    </svg>\r\n\r\n    <ng-content select=\"[ngxMaterialTimepickerToggleIcon]\"></ng-content>\r\n</button>\r\n",
                styles: [".ngx-material-timepicker-toggle{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;align-items:center;background-color:transparent;border:none;border-radius:50%;cursor:pointer;display:flex;justify-content:center;outline:none;padding:4px;text-align:center;transition:background-color .3s;user-select:none}.ngx-material-timepicker-toggle:focus{background-color:rgba(0,0,0,.07)}"]
            },] }
];
NgxMaterialTimepickerToggleComponent.propDecorators = {
    timepicker: [{ type: Input, args: ['for',] }],
    disabled: [{ type: Input }],
    customIcon: [{ type: ContentChild, args: [NgxMaterialTimepickerToggleIconDirective, { static: true },] }]
};

const TIME_LOCALE = new InjectionToken('TimeLocale');

const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line
    useExisting: forwardRef(() => TimepickerDirective),
    multi: true
};
class TimepickerDirective {
    constructor(elementRef, locale) {
        this.elementRef = elementRef;
        this.locale = locale;
        this._format = 12;
        this._value = '';
        this.timepickerSubscriptions = [];
        this.onTouched = () => {
        };
        this.onChange = () => {
        };
    }
    set format(value) {
        this._format = value === 24 ? 24 : 12;
        const isDynamicallyChanged = value && (this.previousFormat && this.previousFormat !== this._format);
        if (isDynamicallyChanged) {
            this.value = this._value;
            this._timepicker.updateTime(this._value);
        }
        this.previousFormat = this._format;
    }
    get format() {
        return this._format;
    }
    set min(value) {
        if (typeof value === 'string') {
            this._min = TimeAdapter.parseTime(value, { locale: this.locale, format: this.format });
            return;
        }
        this._min = value;
    }
    get min() {
        return this._min;
    }
    set max(value) {
        if (typeof value === 'string') {
            this._max = TimeAdapter.parseTime(value, { locale: this.locale, format: this.format });
            return;
        }
        this._max = value;
    }
    get max() {
        return this._max;
    }
    set timepicker(picker) {
        this.registerTimepicker(picker);
    }
    set value(value) {
        if (!value) {
            this._value = '';
            this.updateInputValue();
            return;
        }
        const time = TimeAdapter.formatTime(value, { locale: this.locale, format: this.format });
        const isAvailable = TimeAdapter.isTimeAvailable(time, this._min, this._max, 'minutes', this._timepicker.minutesGap, this._format);
        if (isAvailable) {
            this._value = time;
            this.updateInputValue();
            return;
        }
        console.warn('Selected time doesn\'t match min or max value');
    }
    get value() {
        if (!this._value) {
            return '';
        }
        return TimeAdapter.toLocaleTimeString(this._value, { format: this.format, locale: this.locale });
    }
    set defaultTime(time) {
        this._timepicker.defaultTime = TimeAdapter.formatTime(time, { locale: this.locale, format: this.format });
    }
    onInput(value) {
        this.value = value;
        this.onChange(value);
    }
    ngOnChanges(changes) {
        if (changes['value'] && changes['value'].currentValue) {
            this.defaultTime = changes['value'].currentValue;
        }
    }
    onClick(event) {
        if (!this.disableClick) {
            this._timepicker.open();
            event.stopPropagation();
        }
    }
    writeValue(value) {
        this.value = value;
        this.defaultTime = value;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    ngOnDestroy() {
        this.timepickerSubscriptions.forEach(s => s.unsubscribe());
    }
    registerTimepicker(picker) {
        if (picker) {
            this._timepicker = picker;
            this._timepicker.registerInput(this);
            this.timepickerSubscriptions.push(this._timepicker.timeSet.subscribe((time) => {
                this.value = time;
                this.onChange(this.value);
                this.onTouched();
            }));
            this.timepickerSubscriptions.push(this._timepicker.closed.subscribe(() => this.defaultTime = this._value));
        }
        else {
            throw new Error('NgxMaterialTimepickerComponent is not defined.' +
                ' Please make sure you passed the timepicker to ngxTimepicker directive');
        }
    }
    updateInputValue() {
        this.elementRef.nativeElement.value = this.value;
    }
}
TimepickerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngxTimepicker]',
                providers: [VALUE_ACCESSOR],
                host: {
                    '[disabled]': 'disabled',
                    '(input)': 'onInput($event.target.value)',
                    '(blur)': 'onTouched()',
                },
            },] }
];
TimepickerDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: String, decorators: [{ type: Inject, args: [TIME_LOCALE,] }] }
];
TimepickerDirective.propDecorators = {
    format: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    timepicker: [{ type: Input, args: ['ngxTimepicker',] }],
    value: [{ type: Input }],
    disabled: [{ type: Input }],
    disableClick: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};

class NgxMaterialTimepickerThemeDirective {
    constructor(elementRef, renderer) {
        this.renderer = renderer;
        this.element = elementRef.nativeElement;
    }
    ngAfterViewInit() {
        if (this.theme) {
            this.setTheme(this.theme);
        }
    }
    setTheme(theme) {
        for (const val in theme) {
            if (theme.hasOwnProperty(val)) {
                if (typeof theme[val] === 'string') {
                    for (const prop in theme) {
                        if (theme.hasOwnProperty(prop)) {
                            this.renderer.setStyle(this.element, `--${camelCaseToDash(prop)}`, theme[prop]);
                        }
                    }
                    return;
                }
                this.setTheme(theme[val]);
            }
        }
    }
}
NgxMaterialTimepickerThemeDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngxMaterialTimepickerTheme]' },] }
];
NgxMaterialTimepickerThemeDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
NgxMaterialTimepickerThemeDirective.propDecorators = {
    theme: [{ type: Input, args: ['ngxMaterialTimepickerTheme',] }]
};
function camelCaseToDash(myStr) {
    return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function getHours(format) {
    return Array(format).fill(1).map((v, i) => {
        const angleStep = 30;
        const time = v + i;
        const angle = angleStep * time;
        return { time: time === 24 ? 0 : time, angle };
    });
}
function disableHours(hours, config) {
    if (config.min || config.max) {
        return hours.map(value => {
            const hour = config.format === 24 ? value.time : TimeAdapter.formatHour(value.time, config.format, config.period);
            const currentTime = DateTime.fromObject({ hour }).toFormat(TimeFormat.TWELVE);
            return Object.assign(Object.assign({}, value), { disabled: !TimeAdapter.isTimeAvailable(currentTime, config.min, config.max, 'hours') });
        });
    }
    return hours;
}
function getMinutes(gap = 1) {
    const minutesCount = 60;
    const angleStep = 360 / minutesCount;
    const minutes = [];
    for (let i = 0; i < minutesCount; i++) {
        const angle = angleStep * i;
        if (i % gap === 0) {
            minutes.push({ time: i, angle: angle !== 0 ? angle : 360 });
        }
    }
    return minutes;
}
function disableMinutes(minutes, selectedHour, config) {
    if (config.min || config.max) {
        const hour = TimeAdapter.formatHour(selectedHour, config.format, config.period);
        return minutes.map(value => {
            const currentTime = DateTime.fromObject({ hour, minute: value.time }).toFormat(TimeFormat.TWELVE);
            return Object.assign(Object.assign({}, value), { disabled: !TimeAdapter.isTimeAvailable(currentTime, config.min, config.max, 'minutes') });
        });
    }
    return minutes;
}

class NgxMaterialTimepickerHoursFace {
    constructor(format) {
        this.hourChange = new EventEmitter();
        this.hourSelected = new EventEmitter();
        this.hoursList = [];
        this.hoursList = getHours(format);
    }
    onTimeSelected(time) {
        this.hourSelected.next(time);
    }
}
NgxMaterialTimepickerHoursFace.decorators = [
    { type: Directive }
];
NgxMaterialTimepickerHoursFace.ctorParameters = () => [
    { type: Number }
];
NgxMaterialTimepickerHoursFace.propDecorators = {
    selectedHour: [{ type: Input }],
    minTime: [{ type: Input }],
    maxTime: [{ type: Input }],
    format: [{ type: Input }],
    hourChange: [{ type: Output }],
    hourSelected: [{ type: Output }]
};

class NgxMaterialTimepicker24HoursFaceComponent extends NgxMaterialTimepickerHoursFace {
    constructor() {
        super(24);
    }
    ngAfterContentInit() {
        this.hoursList = disableHours(this.hoursList, {
            min: this.minTime,
            max: this.maxTime,
            format: this.format
        });
    }
}
NgxMaterialTimepicker24HoursFaceComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker-24-hours-face',
                template: "<ngx-material-timepicker-face [selectedTime]=\"selectedHour\" [faceTime]=\"hoursList\" [format]=\"format\"\r\n                              (timeChange)=\"hourChange.next($event)\"\r\n                              (timeSelected)=\"onTimeSelected($event)\"></ngx-material-timepicker-face>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NgxMaterialTimepicker24HoursFaceComponent.ctorParameters = () => [];

class NgxMaterialTimepicker12HoursFaceComponent extends NgxMaterialTimepickerHoursFace {
    constructor() {
        super(12);
    }
    ngOnChanges(changes) {
        if (changes['period'] && changes['period'].currentValue) {
            this.hoursList = disableHours(this.hoursList, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    }
}
NgxMaterialTimepicker12HoursFaceComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker-12-hours-face',
                template: "<ngx-material-timepicker-face [selectedTime]=\"selectedHour\" [faceTime]=\"hoursList\"\r\n                              (timeChange)=\"hourChange.next($event)\" (timeSelected)=\"onTimeSelected($event)\"></ngx-material-timepicker-face>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NgxMaterialTimepicker12HoursFaceComponent.ctorParameters = () => [];
NgxMaterialTimepicker12HoursFaceComponent.propDecorators = {
    period: [{ type: Input }]
};

class NgxMaterialTimepickerMinutesFaceComponent {
    constructor() {
        this.minutesList = [];
        this.timeUnit = TimeUnit;
        this.minuteChange = new EventEmitter();
    }
    ngOnChanges(changes) {
        if (changes['period'] && changes['period'].currentValue) {
            const minutes = getMinutes(this.minutesGap);
            this.minutesList = disableMinutes(minutes, this.selectedHour, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    }
}
NgxMaterialTimepickerMinutesFaceComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker-minutes-face',
                template: "<ngx-material-timepicker-face [faceTime]=\"minutesList\" [selectedTime]=\"selectedMinute\"\r\n                              [minutesGap]=\"minutesGap\"\r\n                              (timeChange)=\"minuteChange.next($event)\" [unit]=\"timeUnit.MINUTE\"></ngx-material-timepicker-face>\r\n"
            },] }
];
NgxMaterialTimepickerMinutesFaceComponent.propDecorators = {
    selectedMinute: [{ type: Input }],
    selectedHour: [{ type: Input }],
    period: [{ type: Input }],
    minTime: [{ type: Input }],
    maxTime: [{ type: Input }],
    format: [{ type: Input }],
    minutesGap: [{ type: Input }],
    minuteChange: [{ type: Output }]
};

const CLOCK_HAND_STYLES = {
    small: {
        height: '75px',
        top: 'calc(50% - 75px)'
    },
    large: {
        height: '103px',
        top: 'calc(50% - 103px)'
    }
};
class NgxMaterialTimepickerFaceComponent {
    constructor() {
        this.timeUnit = TimeUnit;
        this.innerClockFaceSize = 85;
        this.timeChange = new EventEmitter();
        this.timeSelected = new EventEmitter();
    }
    ngAfterViewInit() {
        this.setClockHandPosition();
        this.addTouchEvents();
    }
    ngOnChanges(changes) {
        const faceTimeChanges = changes['faceTime'];
        const selectedTimeChanges = changes['selectedTime'];
        if ((faceTimeChanges && faceTimeChanges.currentValue)
            && (selectedTimeChanges && selectedTimeChanges.currentValue)) {
            /* Set time according to passed an input value */
            this.selectedTime = this.faceTime.find(time => time.time === this.selectedTime.time);
        }
        if (selectedTimeChanges && selectedTimeChanges.currentValue) {
            this.setClockHandPosition();
        }
        if (faceTimeChanges && faceTimeChanges.currentValue) {
            // To avoid an error ExpressionChangedAfterItHasBeenCheckedError
            setTimeout(() => this.selectAvailableTime());
        }
    }
    trackByTime(_, time) {
        return time.time;
    }
    onMousedown(e) {
        e.preventDefault();
        this.isStarted = true;
    }
    selectTime(e) {
        if (!this.isStarted && (e instanceof MouseEvent && e.type !== 'click')) {
            return;
        }
        const clockFaceCords = this.clockFace.nativeElement.getBoundingClientRect();
        /* Get x0 and y0 of the circle */
        const centerX = clockFaceCords.left + clockFaceCords.width / 2;
        const centerY = clockFaceCords.top + clockFaceCords.height / 2;
        /* Counting the arctangent and convert it to from radian to deg */
        const arctangent = Math.atan(Math.abs(e.clientX - centerX) / Math.abs(e.clientY - centerY)) * 180 / Math.PI;
        /* Get angle according to quadrant */
        const circleAngle = countAngleByCords(centerX, centerY, e.clientX, e.clientY, arctangent);
        /* Check if selected time from the inner clock face (24 hours format only) */
        const isInnerClockChosen = this.format && this.isInnerClockFace(centerX, centerY, e.clientX, e.clientY);
        /* Round angle according to angle step */
        const angleStep = this.unit === TimeUnit.MINUTE ? (6 * (this.minutesGap || 1)) : 30;
        const roundedAngle = isInnerClockChosen
            ? roundAngle(circleAngle, angleStep) + 360
            : roundAngle(circleAngle, angleStep);
        const angle = roundedAngle === 0 ? 360 : roundedAngle;
        const selectedTime = this.faceTime.find(val => val.angle === angle);
        if (selectedTime && !selectedTime.disabled) {
            this.timeChange.next(selectedTime);
            /* To let know whether user ended interaction with clock face */
            if (!this.isStarted) {
                this.timeSelected.next(selectedTime.time);
            }
        }
    }
    onMouseup(e) {
        e.preventDefault();
        this.isStarted = false;
    }
    ngOnDestroy() {
        this.removeTouchEvents();
    }
    addTouchEvents() {
        this.touchStartHandler = this.onMousedown.bind(this);
        this.touchEndHandler = this.onMouseup.bind(this);
        this.clockFace.nativeElement.addEventListener('touchstart', this.touchStartHandler);
        this.clockFace.nativeElement.addEventListener('touchend', this.touchEndHandler);
    }
    removeTouchEvents() {
        this.clockFace.nativeElement.removeEventListener('touchstart', this.touchStartHandler);
        this.clockFace.nativeElement.removeEventListener('touchend', this.touchEndHandler);
    }
    setClockHandPosition() {
        if (this.format === 24) {
            if (this.selectedTime.time > 12 || this.selectedTime.time === 0) {
                this.decreaseClockHand();
            }
            else {
                this.increaseClockHand();
            }
        }
        this.clockHand.nativeElement.style.transform = `rotate(${this.selectedTime.angle}deg)`;
    }
    selectAvailableTime() {
        const currentTime = this.faceTime.find(time => this.selectedTime.time === time.time);
        this.isClockFaceDisabled = this.faceTime.every(time => time.disabled);
        if ((currentTime && currentTime.disabled) && !this.isClockFaceDisabled) {
            const availableTime = this.faceTime.find(time => !time.disabled);
            this.timeChange.next(availableTime);
        }
    }
    isInnerClockFace(x0, y0, x, y) {
        /* Detect whether time from the inner clock face or not (24 format only) */
        return Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2)) < this.innerClockFaceSize;
    }
    decreaseClockHand() {
        this.clockHand.nativeElement.style.height = CLOCK_HAND_STYLES.small.height;
        this.clockHand.nativeElement.style.top = CLOCK_HAND_STYLES.small.top;
    }
    increaseClockHand() {
        this.clockHand.nativeElement.style.height = CLOCK_HAND_STYLES.large.height;
        this.clockHand.nativeElement.style.top = CLOCK_HAND_STYLES.large.top;
    }
}
NgxMaterialTimepickerFaceComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker-face',
                template: "<div class=\"clock-face\" #clockFace>\r\n    <div *ngIf=\"unit !== timeUnit.MINUTE;else minutesFace\" class=\"clock-face__container\">\r\n        <div class=\"clock-face__number clock-face__number--outer\"\r\n             [style.transform]=\"'rotateZ('+ time.angle +'deg) translateX(-50%)' | styleSanitizer\"\r\n             *ngFor=\"let time of faceTime | slice: 0 : 12; trackBy: trackByTime\">\r\n\t\t\t<span [style.transform]=\"'rotateZ(-'+ time.angle +'deg)' | styleSanitizer\"\r\n                  [ngClass]=\"{'active': time.time | activeHour: selectedTime.time : isClockFaceDisabled,\r\n                   'disabled': time.disabled}\">\r\n                {{time.time | timeLocalizer: timeUnit.HOUR}}\r\n            </span>\r\n        </div>\r\n        <div class=\"clock-face__inner\" *ngIf=\"faceTime.length > 12\"\r\n             [style.top]=\"'calc(50% - ' + innerClockFaceSize + 'px)'\">\r\n            <div class=\"clock-face__number clock-face__number--inner\"\r\n                 [style.transform]=\"'rotateZ('+ time.angle +'deg) translateX(-50%)' | styleSanitizer\"\r\n                 [style.height.px]=\"innerClockFaceSize\"\r\n                 *ngFor=\"let time of faceTime | slice: 12 : 24; trackBy: trackByTime\">\r\n\t\t\t<span [style.transform]=\"'rotateZ(-'+ time.angle +'deg)' | styleSanitizer\"\r\n                  [ngClass]=\"{'active': time.time | activeHour: selectedTime?.time : isClockFaceDisabled,\r\n                   'disabled': time.disabled}\">\r\n                {{time.time | timeLocalizer: timeUnit.HOUR}}</span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <span class=\"clock-face__clock-hand\" [ngClass]=\"{'clock-face__clock-hand_minute': unit === timeUnit.MINUTE}\"\r\n          #clockHand [hidden]=\"isClockFaceDisabled\"></span>\r\n</div>\r\n<ng-template #minutesFace>\r\n    <div class=\"clock-face__container\">\r\n        <div class=\"clock-face__number clock-face__number--outer\"\r\n             [style.transform]=\"'rotateZ('+ time.angle +'deg) translateX(-50%)' | styleSanitizer\"\r\n             *ngFor=\"let time of faceTime; trackBy: trackByTime\">\r\n\t<span [style.transform]=\"'rotateZ(-'+ time.angle +'deg)' | styleSanitizer\"\r\n          [ngClass]=\"{'active': time.time | activeMinute: selectedTime?.time:minutesGap:isClockFaceDisabled,\r\n           'disabled': time.disabled}\">\r\n\t{{time.time | minutesFormatter: minutesGap | timeLocalizer: timeUnit.MINUTE}}</span>\r\n        </div>\r\n    </div>\r\n</ng-template>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".clock-face{background-color:#f0f0f0;border-radius:50%;box-sizing:border-box;display:flex;height:290px;justify-content:center;padding:20px;position:relative;width:290px}@supports (background-color:var(--clock-face-background-color)){.clock-face{background-color:var(--clock-face-background-color)}}.clock-face__inner{position:absolute}.clock-face__container{margin-left:-2px}.clock-face__number{position:absolute;text-align:center;transform-origin:0 100%;width:50px;z-index:2}.clock-face__number--outer{height:125px}.clock-face__number--outer>span{color:#6c6c6c;font-size:16px}@supports (color:var(--clock-face-time-inactive-color)){.clock-face__number--outer>span{color:var(--clock-face-time-inactive-color)}}.clock-face__number--inner>span{color:#929292;font-size:14px}@supports (color:var(--clock-face-inner-time-inactive-color)){.clock-face__number--inner>span{color:var(--clock-face-inner-time-inactive-color)}}.clock-face__number>span{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;align-items:center;border-radius:50%;display:flex;font-family:Roboto,sans-serif;font-weight:500;height:30px;justify-content:center;margin:auto;user-select:none;width:30px}@supports (font-family:var(--primary-font-family)){.clock-face__number>span{font-family:var(--primary-font-family)}}.clock-face__number>span.active{background-color:#00bfff;color:#fff}@supports (background-color:var(--clock-hand-color)){.clock-face__number>span.active{background-color:var(--clock-hand-color);color:var(--clock-face-time-active-color)}}.clock-face__number>span.disabled{color:#c5c5c5}@supports (color:var(--clock-face-time-disabled-color)){.clock-face__number>span.disabled{color:var(--clock-face-time-disabled-color)}}.clock-face__clock-hand{background-color:#00bfff;height:103px;position:absolute;top:calc(50% - 103px);transform-origin:0 100%;width:2px;z-index:1}@supports (background-color:var(--clock-hand-color)){.clock-face__clock-hand{background-color:var(--clock-hand-color)}}.clock-face__clock-hand:after{background-color:inherit;border-radius:50%;bottom:-3px;content:\"\";height:7px;left:-3.5px;position:absolute;width:7px}.clock-face__clock-hand_minute:before{background-color:#fff;border:4px solid #00bfff;border-radius:50%;box-sizing:content-box;content:\"\";height:7px;left:calc(50% - 8px);position:absolute;top:-8px;width:7px}@supports (border-color:var(--clock-hand-color)){.clock-face__clock-hand_minute:before{border-color:var(--clock-hand-color)}}@media (max-device-width:1023px) and (orientation:landscape){.clock-face{height:225px;padding:5px;width:225px}.clock-face__number--outer{height:107.5px}.clock-face__clock-hand_minute:before{top:0}}"]
            },] }
];
NgxMaterialTimepickerFaceComponent.propDecorators = {
    faceTime: [{ type: Input }],
    selectedTime: [{ type: Input }],
    unit: [{ type: Input }],
    format: [{ type: Input }],
    minutesGap: [{ type: Input }],
    timeChange: [{ type: Output }],
    timeSelected: [{ type: Output }],
    clockFace: [{ type: ViewChild, args: ['clockFace', { static: true },] }],
    clockHand: [{ type: ViewChild, args: ['clockHand', { static: true },] }],
    onMousedown: [{ type: HostListener, args: ['mousedown', ['$event'],] }],
    selectTime: [{ type: HostListener, args: ['click', ['$event'],] }, { type: HostListener, args: ['touchmove', ['$event.changedTouches[0]'],] }, { type: HostListener, args: ['touchend', ['$event.changedTouches[0]'],] }, { type: HostListener, args: ['mousemove', ['$event'],] }],
    onMouseup: [{ type: HostListener, args: ['mouseup', ['$event'],] }]
};
function roundAngle(angle, step) {
    return Math.round(angle / step) * step;
}
function countAngleByCords(x0, y0, x, y, currentAngle) {
    if (y > y0 && x >= x0) { // II quarter
        return 180 - currentAngle;
    }
    else if (y > y0 && x < x0) { // III quarter
        return 180 + currentAngle;
    }
    else if (y < y0 && x < x0) { // IV quarter
        return 360 - currentAngle;
    }
    else { // I quarter
        return currentAngle;
    }
}

class NgxMaterialTimepickerButtonComponent {
}
NgxMaterialTimepickerButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker-button',
                template: "<button class=\"timepicker-button\" type=\"button\">\r\n  <span><ng-content></ng-content></span>\r\n</button>\r\n",
                styles: [".timepicker-button{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;background-color:transparent;border:12px;border-radius:2px;color:#00bfff;cursor:pointer;display:inline-block;height:36px;line-height:36px;min-width:88px;outline:none;overflow:hidden;position:relative;text-align:center;transition:all .45s cubic-bezier(.23,1,.32,1);user-select:none}@supports (color:var(--button-color)){.timepicker-button{color:var(--button-color)}}.timepicker-button:focus,.timepicker-button:hover{background-color:hsla(0,0%,60%,.2)}.timepicker-button>span{font-family:Roboto,sans-serif;font-size:14px;font-weight:600;padding-left:16px;padding-right:16px;text-transform:uppercase}@supports (font-family:var(--primary-font-family)){.timepicker-button>span{font-family:var(--primary-font-family)}}"]
            },] }
];

class NgxMaterialTimepickerDialComponent {
    constructor(locale) {
        this.locale = locale;
        this.timeUnit = TimeUnit;
        this.meridiems = Info.meridiems({ locale: this.locale });
        this.periodChanged = new EventEmitter();
        this.timeUnitChanged = new EventEmitter();
        this.hourChanged = new EventEmitter();
        this.minuteChanged = new EventEmitter();
    }
    ngOnChanges(changes) {
        if (changes['period'] && changes['period'].currentValue
            || changes['format'] && changes['format'].currentValue) {
            const hours = getHours(this.format);
            this.hours = disableHours(hours, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
        if (changes['period'] && changes['period'].currentValue
            || changes['hour'] && changes['hour'].currentValue) {
            const minutes = getMinutes(this.minutesGap);
            this.minutes = disableMinutes(minutes, +this.hour, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    }
    changeTimeUnit(unit) {
        this.timeUnitChanged.next(unit);
    }
    changePeriod(period) {
        this.periodChanged.next(period);
    }
    changeHour(hour) {
        this.hourChanged.next(hour);
    }
    changeMinute(minute) {
        this.minuteChanged.next(minute);
    }
    showHint() {
        this.isHintVisible = true;
    }
    hideHint() {
        this.isHintVisible = false;
    }
}
NgxMaterialTimepickerDialComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker-dial',
                template: "<div class=\"timepicker-dial\">\r\n    <div class=\"timepicker-dial__container\">\r\n        <div class=\"timepicker-dial__time\">\r\n            <ngx-material-timepicker-dial-control [timeList]=\"hours\" [time]=\"hour\" [timeUnit]=\"timeUnit.HOUR\"\r\n                                                  [isActive]=\"activeTimeUnit === timeUnit.HOUR\"\r\n                                                  [isEditable]=\"isEditable\"\r\n                                                  (timeUnitChanged)=\"changeTimeUnit($event)\"\r\n                                                  (timeChanged)=\"changeHour($event)\"\r\n                                                  (focused)=\"showHint()\"\r\n                                                  (unfocused)=\"hideHint()\">\r\n\r\n            </ngx-material-timepicker-dial-control>\r\n            <span>:</span>\r\n            <ngx-material-timepicker-dial-control [timeList]=\"minutes\" [time]=\"minute\" [timeUnit]=\"timeUnit.MINUTE\"\r\n                                                  [isActive]=\"activeTimeUnit === timeUnit.MINUTE\"\r\n                                                  [isEditable]=\"isEditable\"\r\n                                                  [minutesGap]=\"minutesGap\"\r\n                                                  (timeUnitChanged)=\"changeTimeUnit($event)\"\r\n                                                  (timeChanged)=\"changeMinute($event)\"\r\n                                                  (focused)=\"showHint()\"\r\n                                                  (unfocused)=\"hideHint()\">\r\n\r\n            </ngx-material-timepicker-dial-control>\r\n        </div>\r\n        <ngx-material-timepicker-period class=\"timepicker-dial__period\"\r\n                                        [ngClass]=\"{'timepicker-dial__period--hidden': format === 24}\"\r\n                                        [selectedPeriod]=\"period\" [activeTimeUnit]=\"activeTimeUnit\"\r\n                                        [maxTime]=\"maxTime\" [minTime]=\"minTime\" [format]=\"format\"\r\n                                        [hours]=\"hours\" [minutes]=\"minutes\" [selectedHour]=\"hour\"\r\n                                        [meridiems]=\"meridiems\"\r\n                                        (periodChanged)=\"changePeriod($event)\"></ngx-material-timepicker-period>\r\n    </div>\r\n    <div *ngIf=\"isEditable\" [ngClass]=\"{'timepicker-dial__hint-container--hidden': !isHintVisible}\">\r\n        <!--suppress HtmlUnknownAttribute -->\r\n        <ng-container *ngTemplateOutlet=\"editableHintTmpl ? editableHintTmpl : editableHintDefault\"></ng-container>\r\n        <ng-template #editableHintDefault>\r\n            <small class=\"timepicker-dial__hint\"> * use arrows (<span>&#8645;</span>) to change the time</small>\r\n        </ng-template>\r\n    </div>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".timepicker-dial{text-align:right}.timepicker-dial__container{-webkit-tap-highlight-color:rgba(0,0,0,0);align-items:center;display:flex;justify-content:flex-end}.timepicker-dial__time{align-items:baseline;color:hsla(0,0%,100%,.5);display:flex;font-family:Roboto,sans-serif;font-size:50px;line-height:normal}@supports (font-family:var(--primary-font-family)){.timepicker-dial__time{color:var(--dial-inactive-color);font-family:var(--primary-font-family)}}.timepicker-dial__period{display:block;margin-left:10px}.timepicker-dial__hint-container--hidden,.timepicker-dial__period--hidden{visibility:hidden}.timepicker-dial__hint{color:#fff;display:inline-block;font-size:10px}@supports (color:var(--dial-active-color)){.timepicker-dial__hint{color:var(--dial-active-color)}}.timepicker-dial__hint span{font-size:14px}@media (max-device-width:1023px) and (orientation:landscape){.timepicker-dial__container{flex-direction:column}.timepicker-dial__period{margin-left:0}}"]
            },] }
];
NgxMaterialTimepickerDialComponent.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [TIME_LOCALE,] }] }
];
NgxMaterialTimepickerDialComponent.propDecorators = {
    editableHintTmpl: [{ type: Input }],
    hour: [{ type: Input }],
    minute: [{ type: Input }],
    format: [{ type: Input }],
    period: [{ type: Input }],
    activeTimeUnit: [{ type: Input }],
    minTime: [{ type: Input }],
    maxTime: [{ type: Input }],
    isEditable: [{ type: Input }],
    minutesGap: [{ type: Input }],
    periodChanged: [{ type: Output }],
    timeUnitChanged: [{ type: Output }],
    hourChanged: [{ type: Output }],
    minuteChanged: [{ type: Output }]
};

class TimeParserPipe {
    constructor(locale) {
        this.locale = locale;
        this.numberingSystem = DateTime.local().setLocale(this.locale).resolvedLocaleOpts().numberingSystem;
    }
    transform(time, timeUnit = TimeUnit.HOUR) {
        if (time == null || time === '') {
            return '';
        }
        if (!isNaN(+time)) {
            return time;
        }
        if (timeUnit === TimeUnit.MINUTE) {
            return this.parseTime(time, 'm', 'minute');
        }
        return this.parseTime(time, 'H', 'hour');
    }
    parseTime(time, format, timeMeasure) {
        const parsedTime = DateTime.fromFormat(String(time), format, { numberingSystem: this.numberingSystem })[timeMeasure];
        if (!isNaN(parsedTime)) {
            return parsedTime;
        }
        throw new Error(`Cannot parse time - ${time}`);
    }
}
TimeParserPipe.decorators = [
    { type: Pipe, args: [{
                name: 'timeParser'
            },] }
];
TimeParserPipe.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [TIME_LOCALE,] }] }
];

/* tslint:disable:triple-equals */
class NgxMaterialTimepickerDialControlComponent {
    constructor(timeParserPipe) {
        this.timeParserPipe = timeParserPipe;
        this.timeUnitChanged = new EventEmitter();
        this.timeChanged = new EventEmitter();
        this.focused = new EventEmitter();
        this.unfocused = new EventEmitter();
    }
    get selectedTime() {
        if (!!this.time) {
            return this.timeList.find(t => t.time === +this.time);
        }
    }
    saveTimeAndChangeTimeUnit(event, unit) {
        event.preventDefault();
        this.previousTime = this.time;
        this.timeUnitChanged.next(unit);
        this.focused.next();
    }
    updateTime() {
        const time = this.selectedTime;
        if (time) {
            this.timeChanged.next(time);
            this.previousTime = time.time;
        }
    }
    onKeyDown(e) {
        const char = String.fromCharCode(e.keyCode);
        if ((!isDigit(e)) || isTimeDisabledToChange(this.time, char, this.timeList)) {
            e.preventDefault();
        }
        if (isDigit(e)) {
            this.changeTimeByArrow(e.keyCode);
        }
    }
    onModelChange(value) {
        this.time = this.timeParserPipe.transform(value, this.timeUnit).toString();
    }
    changeTimeByArrow(keyCode) {
        const ARROW_UP = 38;
        const ARROW_DOWN = 40;
        let time;
        if (keyCode === ARROW_UP) {
            time = String(+this.time + (this.minutesGap || 1));
        }
        else if (keyCode === ARROW_DOWN) {
            time = String(+this.time - (this.minutesGap || 1));
        }
        if (!isTimeUnavailable(time, this.timeList)) {
            this.time = time;
            this.updateTime();
        }
    }
}
NgxMaterialTimepickerDialControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker-dial-control',
                template: "<!--suppress HtmlFormInputWithoutLabel, HtmlUnknownAttribute -->\r\n<input class=\"timepicker-dial__control timepicker-dial__item\"\r\n       [ngClass]=\"{'timepicker-dial__item_active': isActive}\"\r\n       [ngModel]=\"time | timeLocalizer: timeUnit\"\r\n       (ngModelChange)=\"time = $event\"\r\n       (input)=\"updateTime()\" (focus)=\"saveTimeAndChangeTimeUnit($event, timeUnit)\"\r\n       readonly [timepickerAutofocus]=\"isActive\" (keydown)=\"onKeyDown($event)\"\r\n       *ngIf=\"!isEditable;else editableTemplate\">\r\n\r\n<ng-template #editableTemplate>\r\n    <!--suppress HtmlFormInputWithoutLabel, HtmlUnknownAttribute -->\r\n    <input class=\"timepicker-dial__control timepicker-dial__item timepicker-dial__control_editable\"\r\n           [ngClass]=\"{'timepicker-dial__item_active': isActive}\"\r\n           [ngModel]=\"time | timeParser: timeUnit | timeLocalizer: timeUnit\"\r\n           (ngModelChange)=\"onModelChange($event)\"\r\n           (input)=\"updateTime()\" (focus)=\"saveTimeAndChangeTimeUnit($event, timeUnit)\"\r\n           [timepickerAutofocus]=\"isActive\" (keydown)=\"onKeyDown($event)\">\r\n</ng-template>\r\n",
                providers: [TimeParserPipe],
                styles: [".timepicker-dial__item{color:hsla(0,0%,100%,.5);cursor:pointer;font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.timepicker-dial__item{color:var(--dial-inactive-color);font-family:var(--primary-font-family)}}.timepicker-dial__item_active{color:#fff}@supports (color:var(--dial-active-color)){.timepicker-dial__item_active{color:var(--dial-active-color)}}.timepicker-dial__control{background-color:transparent;border:none;border-radius:3px;font-size:50px;padding:0;text-align:right;width:60px}.timepicker-dial__control_editable:focus{background-color:#fff;color:#00bfff;outline:#00bfff}@supports (color:var(--dial-editable-active-color)){.timepicker-dial__control_editable:focus{color:var(--dial-editable-active-color)}}@supports (background-color:var(--dial-editable-background-color)){.timepicker-dial__control_editable:focus{background-color:var(--dial-editable-background-color)}}@supports (outline:var(--dial-editable-active-color)){.timepicker-dial__control_editable:focus{outline:var(--dial-editable-active-color)}}"]
            },] }
];
NgxMaterialTimepickerDialControlComponent.ctorParameters = () => [
    { type: TimeParserPipe }
];
NgxMaterialTimepickerDialControlComponent.propDecorators = {
    timeList: [{ type: Input }],
    timeUnit: [{ type: Input }],
    time: [{ type: Input }],
    isActive: [{ type: Input }],
    isEditable: [{ type: Input }],
    minutesGap: [{ type: Input }],
    timeUnitChanged: [{ type: Output }],
    timeChanged: [{ type: Output }],
    focused: [{ type: Output }],
    unfocused: [{ type: Output }]
};
function isTimeDisabledToChange(currentTime, nextTime, timeList) {
    const isNumber = /\d/.test(nextTime);
    if (isNumber) {
        const time = currentTime + nextTime;
        return isTimeUnavailable(time, timeList);
    }
}
function isTimeUnavailable(time, timeList) {
    const selectedTime = timeList.find(value => value.time === +time);
    return !selectedTime || (selectedTime && selectedTime.disabled);
}

class NgxMaterialTimepickerPeriodComponent {
    constructor() {
        this.timePeriod = TimePeriod;
        this.isPeriodAvailable = true;
        this.periodChanged = new EventEmitter();
    }
    changePeriod(period) {
        this.isPeriodAvailable = this.isSwitchPeriodAvailable(period);
        if (this.isPeriodAvailable) {
            this.periodChanged.next(period);
        }
    }
    animationDone() {
        this.isPeriodAvailable = true;
    }
    isSwitchPeriodAvailable(period) {
        const time = this.getDisabledTimeByPeriod(period);
        return !time.every(t => t.disabled);
    }
    getDisabledTimeByPeriod(period) {
        switch (this.activeTimeUnit) {
            case TimeUnit.HOUR:
                return disableHours(this.hours, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period
                });
            case TimeUnit.MINUTE:
                return disableMinutes(this.minutes, +this.selectedHour, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period
                });
            default:
                throw new Error('no such TimeUnit');
        }
    }
}
NgxMaterialTimepickerPeriodComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker-period',
                template: "<div class=\"timepicker-period\">\r\n\t\t\t<button class=\"timepicker-dial__item timepicker-period__btn\"\r\n                  [ngClass]=\"{'timepicker-dial__item_active': selectedPeriod === timePeriod.AM}\"\r\n                  (click)=\"changePeriod(timePeriod.AM)\"\r\n                  type=\"button\">{{meridiems[0]}}</button>\r\n    <button class=\"timepicker-dial__item timepicker-period__btn\"\r\n          [ngClass]=\"{'timepicker-dial__item_active': selectedPeriod === timePeriod.PM}\"\r\n          (click)=\"changePeriod(timePeriod.PM)\"\r\n          type=\"button\">{{meridiems[1]}}</button>\r\n    <div class=\"timepicker-period__warning\" [@scaleInOut] (@scaleInOut.done)=\"animationDone()\" *ngIf=\"!isPeriodAvailable\">\r\n        <p>Current time would be invalid in this period.</p>\r\n    </div>\r\n</div>\r\n",
                animations: [
                    trigger('scaleInOut', [
                        transition(':enter', [
                            style({ transform: 'scale(0)' }),
                            animate('.2s', style({ transform: 'scale(1)' })),
                            sequence([
                                animate('3s', style({ opacity: 1 })),
                                animate('.3s', style({ opacity: 0 }))
                            ])
                        ])
                    ])
                ],
                styles: [".timepicker-dial__item{color:hsla(0,0%,100%,.5);cursor:pointer;font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.timepicker-dial__item{color:var(--dial-inactive-color);font-family:var(--primary-font-family)}}.timepicker-dial__item_active{color:#fff}@supports (color:var(--dial-active-color)){.timepicker-dial__item_active{color:var(--dial-active-color)}}.timepicker-period{display:flex;flex-direction:column;position:relative}.timepicker-period__btn{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;background-color:transparent;border:0;border-radius:3px;font-family:Roboto,sans-serif;font-size:18px;font-weight:500;outline:none;padding:1px 3px;transition:background-color .5s;user-select:none}@supports (font-family:var(--primary-font-family)){.timepicker-period__btn{font-family:var(--primary-font-family)}}.timepicker-period__btn:focus{background-color:rgba(0,0,0,.07)}.timepicker-period__warning{background-color:rgba(0,0,0,.55);border-radius:3px;color:#fff;left:-20px;padding:5px 10px;position:absolute;top:40px;width:200px}.timepicker-period__warning>p{font-family:Roboto,sans-serif;font-size:12px;margin:0}@supports (font-family:var(--primary-font-family)){.timepicker-period__warning>p{font-family:var(--primary-font-family)}}"]
            },] }
];
NgxMaterialTimepickerPeriodComponent.propDecorators = {
    selectedPeriod: [{ type: Input }],
    format: [{ type: Input }],
    activeTimeUnit: [{ type: Input }],
    hours: [{ type: Input }],
    minutes: [{ type: Input }],
    minTime: [{ type: Input }],
    maxTime: [{ type: Input }],
    selectedHour: [{ type: Input }],
    meridiems: [{ type: Input }],
    periodChanged: [{ type: Output }]
};

class StyleSanitizerPipe {
    constructor(domSanitizer) {
        this.domSanitizer = domSanitizer;
    }
    transform(value) {
        if (!value) {
            return value;
        }
        return this.domSanitizer.bypassSecurityTrustStyle(value);
    }
}
StyleSanitizerPipe.decorators = [
    { type: Pipe, args: [{
                name: 'styleSanitizer'
            },] }
];
StyleSanitizerPipe.ctorParameters = () => [
    { type: DomSanitizer }
];

class TimeFormatterPipe {
    transform(time, timeUnit) {
        if (time == null || time === '') {
            return time;
        }
        switch (timeUnit) {
            case TimeUnit.HOUR:
                return DateTime.fromObject({ hour: +time }).toFormat('HH');
            case TimeUnit.MINUTE:
                return DateTime.fromObject({ minute: +time }).toFormat('mm');
            default:
                throw new Error('no such time unit');
        }
    }
}
TimeFormatterPipe.decorators = [
    { type: Pipe, args: [{
                name: 'timeFormatter'
            },] }
];

class MinutesFormatterPipe {
    transform(minute, gap = 5) {
        if (!minute) {
            return minute;
        }
        return minute % gap === 0 ? minute : '';
    }
}
MinutesFormatterPipe.decorators = [
    { type: Pipe, args: [{
                name: 'minutesFormatter'
            },] }
];

class NgxTimepickerFieldComponent {
    constructor(timepickerService, locale) {
        this.timepickerService = timepickerService;
        this.locale = locale;
        this.minHour = 1;
        this.maxHour = 12;
        this.timeUnit = TimeUnit;
        this.buttonAlign = 'right';
        this._format = 12;
        this.unsubscribe$ = new Subject();
        this.onChange = () => {
        };
    }
    set format(value) {
        this._format = value === 24 ? 24 : 12;
        this.minHour = this._format === 12 ? 1 : 0;
        this.maxHour = this._format === 12 ? 12 : 23;
        this.hoursList = getHours(this._format);
        const isDynamicallyChanged = value && (this.previousFormat && this.previousFormat !== this._format);
        if (isDynamicallyChanged) {
            this.defaultTime = this.timepickerTime;
        }
        this.previousFormat = this._format;
    }
    get format() {
        return this._format;
    }
    set defaultTime(val) {
        const time = TimeAdapter.formatTime(val, { locale: this.locale, format: this._format });
        this.timepickerService.setDefaultTimeIfAvailable(time, null, null, this._format);
        this._defaultTime = time;
        this.timepickerTime = time;
        this.isDefaultTime = !!time;
    }
    get defaultTime() {
        return this._defaultTime;
    }
    ngOnInit() {
        this.period$ = this.timepickerService.selectedPeriod;
        this.timepickerService.selectedHour.pipe(takeUntil(this.unsubscribe$))
            .subscribe(hour => this.hour = hour.time);
        this.timepickerService.selectedMinute.pipe(takeUntil(this.unsubscribe$))
            .subscribe(minute => this.minute = minute.time);
        this.hoursList = getHours(this._format);
        this.minutesList = getMinutes();
    }
    writeValue(val) {
        if (val) {
            this.defaultTime = val;
        }
    }
    registerOnTouched(fn) {
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    changeHour(hour) {
        this.timepickerService.hour = this.hoursList.find(h => h.time === hour);
        this.changeTime();
    }
    changeMinute(minute) {
        this.timepickerService.minute = this.minutesList.find(m => m.time === minute);
        this.changeTime();
    }
    changePeriod(period) {
        this.timepickerService.period = period;
        this.changeTime();
    }
    onTimeSet(time) {
        const localeTime = TimeAdapter.toLocaleTimeString(time, { format: this.format, locale: this.locale });
        this.defaultTime = time;
        this.onChange(localeTime);
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
    }
    changeTime() {
        const time = this.timepickerService.getFullTime(this._format);
        this.timepickerTime = time;
        this.onChange(time);
    }
}
NgxTimepickerFieldComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-timepicker-field',
                template: "<div class=\"ngx-timepicker\" [ngClass]=\"{'ngx-timepicker--disabled': disabled}\" #trigger>\r\n    <ngx-timepicker-time-control\r\n        class=\"ngx-timepicker__control--first\"\r\n        [placeholder]=\"'HH'\"\r\n        [time]=\"hour\"\r\n        [min]=\"minHour\"\r\n        [max]=\"maxHour\"\r\n        [timeUnit]=\"timeUnit.HOUR\"\r\n        [disabled]=\"disabled\"\r\n        [isDefaultTimeSet]=\"isDefaultTime\"\r\n        (timeChanged)=\"changeHour($event)\"></ngx-timepicker-time-control>\r\n    <span class=\"ngx-timepicker__time-colon ngx-timepicker__control--second\">:</span>\r\n    <ngx-timepicker-time-control\r\n        class=\"ngx-timepicker__control--third\"\r\n        [placeholder]=\"'MM'\"\r\n        [time]=\"minute\"\r\n        [min]=\"0\"\r\n        [max]=\"59\"\r\n        [timeUnit]=\"timeUnit.MINUTE\"\r\n        [disabled]=\"disabled\"\r\n        [isDefaultTimeSet]=\"isDefaultTime\"\r\n        (timeChanged)=\"changeMinute($event)\"></ngx-timepicker-time-control>\r\n    <ngx-timepicker-period-selector\r\n        class=\"ngx-timepicker__control--forth\"\r\n        [selectedPeriod]=\"period$|async\"\r\n        [disabled]=\"disabled\"\r\n        (periodSelected)=\"changePeriod($event)\"\r\n        *ngIf=\"format !== 24\"></ngx-timepicker-period-selector>\r\n    <ngx-material-timepicker-toggle\r\n        class=\"ngx-timepicker__toggle\"\r\n        *ngIf=\"!controlOnly\"\r\n        [ngClass]=\"{'ngx-timepicker__toggle--left': buttonAlign === 'left'}\"\r\n        [for]=\"timepicker\"\r\n        [disabled]=\"disabled\">\r\n        <span ngxMaterialTimepickerToggleIcon>\r\n            <!--suppress HtmlUnknownAttribute -->\r\n            <ng-container *ngTemplateOutlet=\"toggleIcon || defaultIcon\"></ng-container>\r\n        </span>\r\n    </ngx-material-timepicker-toggle>\r\n</div>\r\n<ngx-material-timepicker\r\n    [trigger]=\"trigger\"\r\n    [ngxMaterialTimepickerTheme]=\"clockTheme\"\r\n    [defaultTime]=\"timepickerTime\"\r\n    [format]=\"format\"\r\n    [cancelBtnTmpl]=\"cancelBtnTmpl\"\r\n    [confirmBtnTmpl]=\"confirmBtnTmpl\"\r\n    (timeSet)=\"onTimeSet($event)\" #timepicker></ngx-material-timepicker>\r\n\r\n<ng-template #defaultIcon>\r\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24px\" height=\"24px\">\r\n        <!--suppress CheckEmptyScriptTag -->\r\n        <path\r\n            d=\"M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003                   6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z\"/>\r\n    </svg>\r\n</ng-template>\r\n",
                providers: [
                    NgxMaterialTimepickerService,
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => NgxTimepickerFieldComponent),
                        multi: true
                    }
                ],
                styles: [".ngx-timepicker{align-items:center;border-bottom:1px solid rgba(0,0,0,.12);display:flex;height:100%}.ngx-timepicker--disabled{background:rgba(0,0,0,.07);pointer-events:none}.ngx-timepicker__time-colon{margin-left:10px}.ngx-timepicker__control--first{order:1}.ngx-timepicker__control--second{order:2}.ngx-timepicker__control--third{order:3}.ngx-timepicker__control--forth,.ngx-timepicker__toggle{order:4}.ngx-timepicker__toggle--left{order:0}"]
            },] }
];
NgxTimepickerFieldComponent.ctorParameters = () => [
    { type: NgxMaterialTimepickerService },
    { type: String, decorators: [{ type: Inject, args: [TIME_LOCALE,] }] }
];
NgxTimepickerFieldComponent.propDecorators = {
    disabled: [{ type: Input }],
    toggleIcon: [{ type: Input }],
    buttonAlign: [{ type: Input }],
    clockTheme: [{ type: Input }],
    controlOnly: [{ type: Input }],
    cancelBtnTmpl: [{ type: Input }],
    confirmBtnTmpl: [{ type: Input }],
    format: [{ type: Input }],
    defaultTime: [{ type: Input }]
};

class NgxTimepickerTimeControlComponent {
    constructor(timeParser) {
        this.timeParser = timeParser;
        this.timeChanged = new EventEmitter();
    }
    ngOnInit() {
        if (this.isDefaultTimeSet) {
            this.time = new TimeFormatterPipe().transform(this.time, this.timeUnit);
        }
    }
    ngOnChanges(changes) {
        const timeChanges = changes['time'];
        const isTimeNotProvided = timeChanges && timeChanges.isFirstChange() && !this.isDefaultTimeSet;
        if (isTimeNotProvided) {
            this.time = null;
        }
    }
    onKeydown(event) {
        if (!isDigit(event)) {
            event.preventDefault();
        }
        switch (event.key) {
            case 'ArrowUp':
                this.increase();
                break;
            case 'ArrowDown':
                this.decrease();
                break;
        }
    }
    increase() {
        if (!this.disabled) {
            let nextTime = +this.time + 1;
            if (nextTime > this.max) {
                nextTime = this.min;
            }
            this.timeChanged.emit(nextTime);
        }
    }
    decrease() {
        if (!this.disabled) {
            let previousTime = +this.time - 1;
            if (previousTime < this.min) {
                previousTime = this.max;
            }
            this.timeChanged.emit(previousTime);
        }
    }
    onInput(input) {
        const value = parseInt(input.value, 10);
        if (!isNaN(value)) {
            this.time = value;
            if (this.time > this.max) {
                this.time = +String(value)[0];
            }
            if (this.time < this.min) {
                this.time = this.min;
            }
            input.value = String(this.time);
            this.timeChanged.emit(this.time);
        }
    }
    onFocus() {
        this.isFocused = true;
    }
    onBlur() {
        this.time = new TimeFormatterPipe().transform(this.time, this.timeUnit);
        this.isFocused = false;
    }
    onModelChange(value) {
        this.time = +this.timeParser.transform(value, this.timeUnit);
    }
}
NgxTimepickerTimeControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-timepicker-time-control',
                template: "<div class=\"ngx-timepicker-control\" [ngClass]=\"{'ngx-timepicker-control--active': isFocused}\">\r\n    <!--suppress HtmlFormInputWithoutLabel -->\r\n    <input class=\"ngx-timepicker-control__input\"\r\n           maxlength=\"2\"\r\n           [ngModel]=\"time | timeParser: timeUnit | timeLocalizer: timeUnit\"\r\n           (ngModelChange)=\"onModelChange($event)\"\r\n           [placeholder]=\"placeholder\"\r\n           [disabled]=\"disabled\"\r\n           (keydown)=\"onKeydown($event)\"\r\n           (input)=\"onInput(inputElement)\"\r\n           (focus)=\"onFocus()\"\r\n           (blur)=\"onBlur()\" #inputElement>\r\n    <div class=\"ngx-timepicker-control__arrows\">\r\n            <span class=\"ngx-timepicker-control__arrow\" role=\"button\" (click)=\"increase()\">\r\n                &#9650;\r\n            </span>\r\n        <span class=\"ngx-timepicker-control__arrow\" role=\"button\" (click)=\"decrease()\">\r\n                &#9660;\r\n            </span>\r\n    </div>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [TimeParserPipe],
                styles: [".ngx-timepicker-control{box-sizing:border-box;display:flex;height:30px;padding:0 5px;position:relative;width:60px}.ngx-timepicker-control--active:after{background-color:#00bfff;bottom:-2px;content:\"\";height:1px;left:0;position:absolute;width:100%}.ngx-timepicker-control__input{border:0;color:inherit;font-size:1rem;height:100%;outline:none;padding:0 5px 0 0;text-align:center;width:100%}.ngx-timepicker-control__input:disabled{background-color:transparent}.ngx-timepicker-control__arrows{display:flex;flex-direction:column;position:absolute;right:2px;top:0}.ngx-timepicker-control__arrow{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;color:rgba(0,0,0,.4);cursor:pointer;font-size:11px;transition:color .2s;user-select:none}.ngx-timepicker-control__arrow:hover{color:rgba(0,0,0,.9)}"]
            },] }
];
NgxTimepickerTimeControlComponent.ctorParameters = () => [
    { type: TimeParserPipe }
];
NgxTimepickerTimeControlComponent.propDecorators = {
    time: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    placeholder: [{ type: Input }],
    timeUnit: [{ type: Input }],
    disabled: [{ type: Input }],
    isDefaultTimeSet: [{ type: Input }],
    timeChanged: [{ type: Output }]
};

class NgxTimepickerPeriodSelectorComponent {
    constructor(locale) {
        this.locale = locale;
        this.periodSelected = new EventEmitter();
        this.period = TimePeriod;
        this.meridiems = Info.meridiems({ locale: this.locale });
    }
    set selectedPeriod(period) {
        if (period) {
            const periods = [TimePeriod.AM, TimePeriod.PM];
            this.localizedPeriod = this.meridiems[periods.indexOf(period)];
        }
    }
    open() {
        if (!this.disabled) {
            this.isOpened = true;
        }
    }
    select(period) {
        this.periodSelected.next(period);
        this.isOpened = false;
    }
    backdropClick() {
        this.isOpened = false;
    }
}
NgxTimepickerPeriodSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-timepicker-period-selector',
                template: "<div class=\"period\">\r\n    <div class=\"period-control\">\r\n        <button class=\"period-control__button period__btn--default\"\r\n                [ngClass]=\"{'period-control__button--disabled': disabled}\"\r\n                type=\"button\"\r\n                (click)=\"open()\">\r\n            <span>{{localizedPeriod}}</span>\r\n            <span class=\"period-control__arrow\">&#9660;</span>\r\n        </button>\r\n    </div>\r\n    <ul class=\"period-selector\" @scaleInOut *ngIf=\"isOpened\" [timepickerAutofocus]=\"true\">\r\n        <li>\r\n            <button class=\"period-selector__button period__btn--default\"\r\n                    type=\"button\"\r\n                    (click)=\"select(period.AM)\"\r\n                    [ngClass]=\"{'period-selector__button--active': localizedPeriod === meridiems[0]}\">{{meridiems[0]}}</button>\r\n        </li>\r\n        <li>\r\n            <button class=\"period-selector__button period__btn--default\"\r\n                    type=\"button\"\r\n                    (click)=\"select(period.PM)\"\r\n                    [ngClass]=\"{'period-selector__button--active': localizedPeriod === meridiems[1]}\">{{meridiems[1]}}</button>\r\n        </li>\r\n    </ul>\r\n</div>\r\n<div class=\"overlay\" (click)=\"backdropClick()\" *ngIf=\"isOpened\"></div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [
                    trigger('scaleInOut', [
                        transition(':enter', [
                            style({ transform: 'scale(0)', opacity: 0 }),
                            animate(200, style({ transform: 'scale(1)', opacity: 1 }))
                        ]),
                        transition(':leave', [
                            animate(200, style({ transform: 'scale(0)', opacity: 0 }))
                        ])
                    ])
                ],
                styles: [".period{position:relative}.period__btn--default{-moz-user-select:none;-ms-user-select:none;-webkit-tap-highlight-color:transparent;-webkit-user-select:none;background-color:transparent;border:none;cursor:pointer;outline:none;padding:0;text-align:left;user-select:none}.period-control{position:relative}.period-control__button{color:inherit;font-size:1rem;position:relative;text-align:center;width:60px}.period-control__button:not(.period-control__button--disabled):focus:after{background-color:#00bfff;bottom:-8px;content:\"\";height:1px;left:0;position:absolute;width:100%}.period-control__arrow{color:rgba(0,0,0,.4);font-size:12px;margin-left:10px}.period-selector{background-color:#f5f5f5;box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);list-style:none;margin:0;max-width:135px;padding:6px 0;position:absolute;right:calc(-50% + -50px);top:calc(50% - 50px);width:150px;z-index:201}.period-selector__button{height:48px;line-height:48px;padding:0 16px;width:100%}.period-selector__button--active{color:#00bfff}.period-selector__button:focus{background-color:#eee}.overlay{background-color:transparent;height:100%;left:0;position:fixed;top:0;width:100%;z-index:200}"]
            },] }
];
NgxTimepickerPeriodSelectorComponent.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [TIME_LOCALE,] }] }
];
NgxTimepickerPeriodSelectorComponent.propDecorators = {
    isOpened: [{ type: Input }],
    disabled: [{ type: Input }],
    selectedPeriod: [{ type: Input }],
    periodSelected: [{ type: Output }]
};

class TimeLocalizerPipe {
    constructor(locale) {
        this.locale = locale;
    }
    transform(time, timeUnit) {
        if (time == null || time === '') {
            return '';
        }
        switch (timeUnit) {
            case TimeUnit.HOUR: {
                const format = time === 0 ? 'HH' : 'H';
                return this.formatTime('hour', time, format);
            }
            case TimeUnit.MINUTE:
                return this.formatTime('minute', time, 'mm');
            default:
                throw new Error(`There is no Time Unit with type ${timeUnit}`);
        }
    }
    formatTime(timeMeasure, time, format) {
        try {
            return DateTime.fromObject({ [timeMeasure]: +time }).setLocale(this.locale).toFormat(format);
        }
        catch (_a) {
            throw new Error(`Cannot format provided time - ${time} to locale - ${this.locale}`);
        }
    }
}
TimeLocalizerPipe.decorators = [
    { type: Pipe, args: [{
                name: 'timeLocalizer'
            },] }
];
TimeLocalizerPipe.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [TIME_LOCALE,] }] }
];

class ActiveHourPipe {
    transform(hour, currentHour, isClockFaceDisabled) {
        if (hour == null || isClockFaceDisabled) {
            return false;
        }
        return hour === currentHour;
    }
}
ActiveHourPipe.decorators = [
    { type: Pipe, args: [{
                name: 'activeHour'
            },] }
];

class ActiveMinutePipe {
    transform(minute, currentMinute, gap, isClockFaceDisabled) {
        if (minute == null || isClockFaceDisabled) {
            return false;
        }
        const defaultGap = 5;
        return ((currentMinute === minute) && (minute % (gap || defaultGap) === 0));
    }
}
ActiveMinutePipe.decorators = [
    { type: Pipe, args: [{
                name: 'activeMinute'
            },] }
];

class AutofocusDirective {
    constructor(element, document) {
        this.element = element;
        this.document = document;
        this.activeElement = this.document.activeElement;
    }
    ngOnChanges() {
        if (this.isFocusActive) {
            // To avoid ExpressionChangedAfterItHasBeenCheckedError;
            setTimeout(() => this.element.nativeElement.focus({ preventScroll: true }));
        }
    }
    ngOnDestroy() {
        // To avoid ExpressionChangedAfterItHasBeenCheckedError;
        setTimeout(() => this.activeElement.focus({ preventScroll: true }));
    }
}
AutofocusDirective.decorators = [
    { type: Directive, args: [{
                selector: '[timepickerAutofocus]'
            },] }
];
AutofocusDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
];
AutofocusDirective.propDecorators = {
    isFocusActive: [{ type: Input, args: ['timepickerAutofocus',] }]
};

const ɵ0 = TimeAdapter.DEFAULT_LOCALE;
class NgxMaterialTimepickerModule {
    static setLocale(locale) {
        return {
            ngModule: NgxMaterialTimepickerModule,
            providers: [
                { provide: TIME_LOCALE, useValue: locale }
            ]
        };
    }
}
NgxMaterialTimepickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    PortalModule,
                    OverlayModule
                ],
                exports: [
                    NgxMaterialTimepickerComponent,
                    NgxMaterialTimepickerToggleComponent,
                    NgxTimepickerFieldComponent,
                    TimepickerDirective,
                    NgxMaterialTimepickerToggleIconDirective,
                    NgxMaterialTimepickerThemeDirective
                ],
                declarations: [
                    AutofocusDirective,
                    NgxMaterialTimepickerComponent,
                    NgxMaterialTimepicker24HoursFaceComponent,
                    NgxMaterialTimepicker12HoursFaceComponent,
                    NgxMaterialTimepickerMinutesFaceComponent,
                    NgxMaterialTimepickerFaceComponent,
                    NgxMaterialTimepickerToggleComponent,
                    NgxMaterialTimepickerButtonComponent,
                    NgxMaterialTimepickerDialComponent,
                    NgxMaterialTimepickerDialControlComponent,
                    NgxMaterialTimepickerPeriodComponent,
                    StyleSanitizerPipe,
                    TimeFormatterPipe,
                    TimepickerDirective,
                    NgxMaterialTimepickerToggleIconDirective,
                    MinutesFormatterPipe,
                    NgxMaterialTimepickerThemeDirective,
                    NgxTimepickerFieldComponent,
                    NgxTimepickerTimeControlComponent,
                    NgxTimepickerPeriodSelectorComponent,
                    TimeLocalizerPipe,
                    TimeParserPipe,
                    ActiveHourPipe,
                    ActiveMinutePipe,
                    NgxMaterialTimepickerContentComponent
                ],
                providers: [
                    { provide: TIME_LOCALE, useValue: ɵ0 }
                ],
                entryComponents: [NgxMaterialTimepickerContentComponent]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { NgxMaterialTimepickerComponent, NgxMaterialTimepickerModule, NgxMaterialTimepickerThemeDirective, NgxMaterialTimepickerToggleIconDirective, NgxTimepickerFieldComponent, TimepickerDirective, ɵ0, NgxMaterialTimepickerToggleComponent as ɵa, NgxMaterialTimepickerService as ɵb, TIME_LOCALE as ɵc, AutofocusDirective as ɵd, NgxMaterialTimepicker24HoursFaceComponent as ɵe, NgxMaterialTimepickerHoursFace as ɵf, NgxMaterialTimepicker12HoursFaceComponent as ɵg, NgxMaterialTimepickerMinutesFaceComponent as ɵh, NgxMaterialTimepickerFaceComponent as ɵi, NgxMaterialTimepickerButtonComponent as ɵj, NgxMaterialTimepickerDialComponent as ɵk, NgxMaterialTimepickerDialControlComponent as ɵl, TimeParserPipe as ɵm, NgxMaterialTimepickerPeriodComponent as ɵn, StyleSanitizerPipe as ɵo, TimeFormatterPipe as ɵp, MinutesFormatterPipe as ɵq, NgxTimepickerTimeControlComponent as ɵr, NgxTimepickerPeriodSelectorComponent as ɵs, TimeLocalizerPipe as ɵt, ActiveHourPipe as ɵu, ActiveMinutePipe as ɵv, AnimationState as ɵw, NgxMaterialTimepickerContentComponent as ɵx, TimeAdapter as ɵy };
//# sourceMappingURL=ngx-material-timepicker.js.map
