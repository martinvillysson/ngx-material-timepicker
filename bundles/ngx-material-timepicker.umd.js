(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs'), require('@angular/animations'), require('luxon'), require('rxjs/operators'), require('@angular/cdk/portal'), require('@angular/cdk/overlay'), require('@angular/forms'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('ngx-material-timepicker', ['exports', '@angular/core', '@angular/common', 'rxjs', '@angular/animations', 'luxon', 'rxjs/operators', '@angular/cdk/portal', '@angular/cdk/overlay', '@angular/forms', '@angular/platform-browser'], factory) :
    (global = global || self, factory(global['ngx-material-timepicker'] = {}, global.ng.core, global.ng.common, global.rxjs, global.ng.animations, global.luxon, global.rxjs.operators, global.ng.cdk.portal, global.ng.cdk.overlay, global.ng.forms, global.ng.platformBrowser));
}(this, (function (exports, i0, common, rxjs, animations, luxon, operators, portal, overlay, forms, platformBrowser) { 'use strict';

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

    function isSameOrAfter(time, compareWith, unit) {
        if (unit === void 0) { unit = 'minutes'; }
        if (unit === 'hours') {
            return time.hour >= compareWith.hour;
        }
        if (unit === 'minutes') {
            return time.hasSame(compareWith, unit) || time.valueOf() > compareWith.valueOf();
        }
    }
    function isSameOrBefore(time, compareWith, unit) {
        if (unit === void 0) { unit = 'minutes'; }
        if (unit === 'hours') {
            return time.hour <= compareWith.hour;
        }
        if (unit === 'minutes') {
            return time.hasSame(compareWith, unit) || time.valueOf() <= compareWith.valueOf();
        }
    }
    function isBetween(time, before, after, unit) {
        if (unit === void 0) { unit = 'minutes'; }
        if (unit === 'hours') {
            return isSameOrBefore(time, after, unit) && isSameOrAfter(time, before, unit);
        }
        if (unit === 'minutes') {
            return isSameOrBefore(time, after) && isSameOrAfter(time, before);
        }
    }
    function isDigit(e) {
        // Allow: backspace, delete, tab, escape, enter
        if ([46, 8, 9, 27, 13].some(function (n) { return n === e.keyCode; }) ||
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
    var TimeAdapter = /** @class */ (function () {
        function TimeAdapter() {
        }
        TimeAdapter.parseTime = function (time, opts) {
            var _a = TimeAdapter.getLocaleOptionsByTime(time, opts), numberingSystem = _a.numberingSystem, locale = _a.locale;
            var isPeriodExist = time.split(' ').length === 2;
            var timeMask = isPeriodExist ? TimeFormat.TWELVE_SHORT : TimeFormat.TWENTY_FOUR_SHORT;
            return luxon.DateTime.fromFormat(time, timeMask, { numberingSystem: numberingSystem, locale: locale });
        };
        TimeAdapter.formatTime = function (time, opts) {
            var format = opts.format;
            return TimeAdapter.parseTime(time, opts).setLocale(TimeAdapter.DEFAULT_LOCALE)
                .toLocaleString(Object.assign(Object.assign({}, luxon.DateTime.TIME_SIMPLE), { hour12: format !== 24, numberingSystem: TimeAdapter.DEFAULT_NUMBERING_SYSTEM }));
        };
        TimeAdapter.toLocaleTimeString = function (time, opts) {
            if (opts === void 0) { opts = {}; }
            var _a = opts.format, format = _a === void 0 ? TimeAdapter.DEFAULT_FORMAT : _a, _b = opts.locale, locale = _b === void 0 ? TimeAdapter.DEFAULT_LOCALE : _b;
            var timeFormat = Object.assign(Object.assign({}, luxon.DateTime.TIME_SIMPLE), { hour12: format !== 24 });
            var timeMask = (format === 24) ? TimeFormat.TWENTY_FOUR_SHORT : TimeFormat.TWELVE_SHORT;
            return luxon.DateTime.fromFormat(time, timeMask).setLocale(locale).toLocaleString(timeFormat);
        };
        TimeAdapter.isTimeAvailable = function (time, min, max, granularity, minutesGap, format) {
            if (!time) {
                return;
            }
            var convertedTime = this.parseTime(time, { format: format });
            var minutes = convertedTime.minute;
            if (minutesGap && minutes === minutes && minutes % minutesGap !== 0) {
                throw new Error("Your minutes - " + minutes + " doesn't match your minutesGap - " + minutesGap);
            }
            var isAfter = (min && !max)
                && isSameOrAfter(convertedTime, min, granularity);
            var isBefore = (max && !min)
                && isSameOrBefore(convertedTime, max, granularity);
            var between = (min && max)
                && isBetween(convertedTime, min, max, granularity);
            var isAvailable = !min && !max;
            return isAfter || isBefore || between || isAvailable;
        };
        /***
         *  Format hour according to time format (12 or 24)
         */
        TimeAdapter.formatHour = function (currentHour, format, period) {
            if (format === 24) {
                return currentHour;
            }
            var hour = period === TimePeriod.AM ? currentHour : currentHour + 12;
            if (period === TimePeriod.AM && hour === 12) {
                return 0;
            }
            else if (period === TimePeriod.PM && hour === 24) {
                return 12;
            }
            return hour;
        };
        TimeAdapter.fromDateTimeToString = function (time, format) {
            var timeFormat = format === 24 ? TimeFormat.TWENTY_FOUR : TimeFormat.TWELVE;
            return time.reconfigure({
                numberingSystem: TimeAdapter.DEFAULT_NUMBERING_SYSTEM,
                locale: TimeAdapter.DEFAULT_LOCALE
            }).toFormat(timeFormat);
        };
        TimeAdapter.getLocaleOptionsByTime = function (time, opts) {
            var _a = luxon.DateTime.local().setLocale(opts.locale).resolvedLocaleOpts(), numberingSystem = _a.numberingSystem, locale = _a.locale;
            var localeConfig = { numberingSystem: numberingSystem, locale: locale };
            var defaultConfig = { numberingSystem: TimeAdapter.DEFAULT_NUMBERING_SYSTEM, locale: TimeAdapter.DEFAULT_LOCALE };
            return isNaN(parseInt(time, 10)) ? localeConfig : defaultConfig;
        };
        return TimeAdapter;
    }());
    TimeAdapter.DEFAULT_FORMAT = 12;
    TimeAdapter.DEFAULT_LOCALE = 'en-US';
    TimeAdapter.DEFAULT_NUMBERING_SYSTEM = 'latn';

    var DEFAULT_HOUR = {
        time: 12,
        angle: 360
    };
    var DEFAULT_MINUTE = {
        time: 0,
        angle: 360
    };
    var NgxMaterialTimepickerService = /** @class */ (function () {
        function NgxMaterialTimepickerService() {
            this.hourSubject = new rxjs.BehaviorSubject(DEFAULT_HOUR);
            this.minuteSubject = new rxjs.BehaviorSubject(DEFAULT_MINUTE);
            this.periodSubject = new rxjs.BehaviorSubject(TimePeriod.AM);
        }
        Object.defineProperty(NgxMaterialTimepickerService.prototype, "hour", {
            set: function (hour) {
                this.hourSubject.next(hour);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgxMaterialTimepickerService.prototype, "selectedHour", {
            get: function () {
                return this.hourSubject.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgxMaterialTimepickerService.prototype, "minute", {
            set: function (minute) {
                this.minuteSubject.next(minute);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgxMaterialTimepickerService.prototype, "selectedMinute", {
            get: function () {
                return this.minuteSubject.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgxMaterialTimepickerService.prototype, "period", {
            set: function (period) {
                var isPeriodValid = (period === TimePeriod.AM) || (period === TimePeriod.PM);
                if (isPeriodValid) {
                    this.periodSubject.next(period);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgxMaterialTimepickerService.prototype, "selectedPeriod", {
            get: function () {
                return this.periodSubject.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        NgxMaterialTimepickerService.prototype.setDefaultTimeIfAvailable = function (time, min, max, format, minutesGap) {
            /* Workaround to double error message*/
            try {
                if (TimeAdapter.isTimeAvailable(time, min, max, 'minutes', minutesGap)) {
                    this.setDefaultTime(time, format);
                }
            }
            catch (e) {
                console.error(e);
            }
        };
        NgxMaterialTimepickerService.prototype.getFullTime = function (format) {
            var hour = this.hourSubject.getValue().time;
            var minute = this.minuteSubject.getValue().time;
            var period = format === 12 ? this.periodSubject.getValue() : '';
            var time = (hour + ":" + minute + " " + period).trim();
            return TimeAdapter.formatTime(time, { format: format });
        };
        NgxMaterialTimepickerService.prototype.setDefaultTime = function (time, format) {
            var defaultTime = TimeAdapter.parseTime(time, { format: format }).toJSDate();
            if (luxon.DateTime.fromJSDate(defaultTime).isValid) {
                var period = time.substr(time.length - 2).toUpperCase();
                var hour = defaultTime.getHours();
                this.hour = Object.assign(Object.assign({}, DEFAULT_HOUR), { time: formatHourByPeriod(hour, period) });
                this.minute = Object.assign(Object.assign({}, DEFAULT_MINUTE), { time: defaultTime.getMinutes() });
                this.period = period;
            }
            else {
                this.resetTime();
            }
        };
        NgxMaterialTimepickerService.prototype.resetTime = function () {
            this.hour = Object.assign({}, DEFAULT_HOUR);
            this.minute = Object.assign({}, DEFAULT_MINUTE);
            this.period = TimePeriod.AM;
        };
        return NgxMaterialTimepickerService;
    }());
    NgxMaterialTimepickerService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgxMaterialTimepickerService_Factory() { return new NgxMaterialTimepickerService(); }, token: NgxMaterialTimepickerService, providedIn: "root" });
    NgxMaterialTimepickerService.decorators = [
        { type: i0.Injectable, args: [{
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

    (function (AnimationState) {
        AnimationState["ENTER"] = "enter";
        AnimationState["LEAVE"] = "leave";
    })(exports.ɵw || (exports.ɵw = {}));
    var NgxMaterialTimepickerContentComponent = /** @class */ (function () {
        function NgxMaterialTimepickerContentComponent(timepickerService) {
            this.timepickerService = timepickerService;
            this.timeUnit = TimeUnit;
            this.activeTimeUnit = TimeUnit.HOUR;
            this.unsubscribe = new rxjs.Subject();
        }
        Object.defineProperty(NgxMaterialTimepickerContentComponent.prototype, "defaultTime", {
            set: function (time) {
                this.setDefaultTime(time);
            },
            enumerable: false,
            configurable: true
        });
        NgxMaterialTimepickerContentComponent.prototype.ngOnInit = function () {
            this.animationState = !this.disableAnimation && exports.ɵw.ENTER;
            this.defineTime();
            this.selectedHour = this.timepickerService.selectedHour
                .pipe(operators.shareReplay({ bufferSize: 1, refCount: true }));
            this.selectedMinute = this.timepickerService.selectedMinute
                .pipe(operators.shareReplay({ bufferSize: 1, refCount: true }));
            this.selectedPeriod = this.timepickerService.selectedPeriod
                .pipe(operators.shareReplay({ bufferSize: 1, refCount: true }));
            this.timepickerBaseRef.timeUpdated.pipe(operators.takeUntil(this.unsubscribe))
                .subscribe(this.setDefaultTime.bind(this));
        };
        NgxMaterialTimepickerContentComponent.prototype.onHourChange = function (hour) {
            this.timepickerService.hour = hour;
        };
        NgxMaterialTimepickerContentComponent.prototype.onHourSelected = function (hour) {
            this.changeTimeUnit(TimeUnit.MINUTE);
            this.timepickerBaseRef.hourSelected.next(hour);
        };
        NgxMaterialTimepickerContentComponent.prototype.onMinuteChange = function (minute) {
            this.timepickerService.minute = minute;
        };
        NgxMaterialTimepickerContentComponent.prototype.changePeriod = function (period) {
            this.timepickerService.period = period;
        };
        NgxMaterialTimepickerContentComponent.prototype.changeTimeUnit = function (unit) {
            this.activeTimeUnit = unit;
        };
        NgxMaterialTimepickerContentComponent.prototype.setTime = function () {
            this.timepickerBaseRef.timeSet.next(this.timepickerService.getFullTime(this.format));
            this.close();
        };
        NgxMaterialTimepickerContentComponent.prototype.close = function () {
            if (this.disableAnimation) {
                this.timepickerBaseRef.close();
                return;
            }
            this.animationState = exports.ɵw.LEAVE;
        };
        NgxMaterialTimepickerContentComponent.prototype.animationDone = function (event) {
            if (event.phaseName === 'done' && event.toState === exports.ɵw.LEAVE) {
                this.timepickerBaseRef.close();
            }
        };
        NgxMaterialTimepickerContentComponent.prototype.ngOnDestroy = function () {
            this.unsubscribe.next();
            this.unsubscribe.complete();
        };
        NgxMaterialTimepickerContentComponent.prototype.setDefaultTime = function (time) {
            this.timepickerService.setDefaultTimeIfAvailable(time, this.minTime, this.maxTime, this.format, this.minutesGap);
        };
        NgxMaterialTimepickerContentComponent.prototype.defineTime = function () {
            var minTime = this.minTime;
            if (minTime && !this.time) {
                var time = TimeAdapter.fromDateTimeToString(minTime, this.format);
                this.setDefaultTime(time);
            }
        };
        return NgxMaterialTimepickerContentComponent;
    }());
    NgxMaterialTimepickerContentComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngx-material-timepicker-content',
                    template: "<div class=\"timepicker-overlay\">\r\n    <div class=\"timepicker\" [@timepicker]=\"animationState\" (@timepicker.done)=\"animationDone($event)\">\r\n        <header class=\"timepicker__header\">\r\n            <ngx-material-timepicker-dial [format]=\"format\" [hour]=\"(selectedHour | async)?.time\"\r\n                                          [minute]=\"(selectedMinute | async)?.time\"\r\n                                          [period]=\"selectedPeriod | async\"\r\n                                          [activeTimeUnit]=\"activeTimeUnit\"\r\n                                          [minTime]=\"minTime\"\r\n                                          [maxTime]=\"maxTime\"\r\n                                          [isEditable]=\"enableKeyboardInput\"\r\n                                          [editableHintTmpl]=\"editableHintTmpl\"\r\n                                          [minutesGap]=\"minutesGap\"\r\n                                          (periodChanged)=\"changePeriod($event)\"\r\n                                          (timeUnitChanged)=\"changeTimeUnit($event)\"\r\n                                          (hourChanged)=\"onHourChange($event)\"\r\n                                          (minuteChanged)=\"onMinuteChange($event)\"\r\n            ></ngx-material-timepicker-dial>\r\n        </header>\r\n        <div class=\"timepicker__main-content\">\r\n            <div class=\"timepicker__body\" [ngSwitch]=\"activeTimeUnit\">\r\n                <div *ngSwitchCase=\"timeUnit.HOUR\">\r\n                    <ngx-material-timepicker-24-hours-face *ngIf=\"format === 24;else ampmHours\"\r\n                                                           (hourChange)=\"onHourChange($event)\"\r\n                                                           [selectedHour]=\"selectedHour | async\"\r\n                                                           [minTime]=\"minTime\"\r\n                                                           [maxTime]=\"maxTime\"\r\n                                                           [format]=\"format\"\r\n                                                           (hourSelected)=\"onHourSelected($event)\"></ngx-material-timepicker-24-hours-face>\r\n                    <ng-template #ampmHours>\r\n                        <ngx-material-timepicker-12-hours-face\r\n                            (hourChange)=\"onHourChange($event)\"\r\n                            [selectedHour]=\"selectedHour | async\"\r\n                            [period]=\"selectedPeriod | async\"\r\n                            [minTime]=\"minTime\"\r\n                            [maxTime]=\"maxTime\"\r\n                            (hourSelected)=\"onHourSelected($event)\"></ngx-material-timepicker-12-hours-face>\r\n                    </ng-template>\r\n                </div>\r\n                <ngx-material-timepicker-minutes-face *ngSwitchCase=\"timeUnit.MINUTE\"\r\n                                                      [selectedMinute]=\"selectedMinute | async\"\r\n                                                      [selectedHour]=\"(selectedHour | async)?.time\"\r\n                                                      [minTime]=\"minTime\"\r\n                                                      [maxTime]=\"maxTime\"\r\n                                                      [format]=\"format\"\r\n                                                      [period]=\"selectedPeriod | async\"\r\n                                                      [minutesGap]=\"minutesGap\"\r\n                                                      (minuteChange)=\"onMinuteChange($event)\"></ngx-material-timepicker-minutes-face>\r\n            </div>\r\n            <div class=\"timepicker__actions\">\r\n                <div (click)=\"close()\">\r\n                    <!--suppress HtmlUnknownAttribute -->\r\n                    <ng-container\r\n                        *ngTemplateOutlet=\"cancelBtnTmpl ? cancelBtnTmpl : cancelBtnDefault\"></ng-container>\r\n                </div>\r\n                <div (click)=\"setTime()\">\r\n                    <!--suppress HtmlUnknownAttribute -->\r\n                    <ng-container\r\n                        *ngTemplateOutlet=\"confirmBtnTmpl ? confirmBtnTmpl : confirmBtnDefault\"></ng-container>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<ng-template #cancelBtnDefault>\r\n    <ngx-material-timepicker-button>Cancel</ngx-material-timepicker-button>\r\n</ng-template>\r\n<ng-template #confirmBtnDefault>\r\n    <ngx-material-timepicker-button>Ok</ngx-material-timepicker-button>\r\n</ng-template>\r\n",
                    animations: [
                        animations.trigger('timepicker', [
                            animations.transition("* => " + exports.ɵw.ENTER, [
                                animations.style({ transform: 'translateY(-30%)' }),
                                animations.animate('0.2s ease-out', animations.style({ transform: 'translateY(0)' }))
                            ]),
                            animations.transition(exports.ɵw.ENTER + " => " + exports.ɵw.LEAVE, [
                                animations.style({ transform: 'translateY(0)', opacity: 1 }),
                                animations.animate('0.2s ease-out', animations.style({ transform: 'translateY(-30%)', opacity: 0 }))
                            ])
                        ])
                    ],
                    providers: [NgxMaterialTimepickerService],
                    styles: [":host{--body-background-color:#fff;--button-color:#00bfff;--clock-face-background-color:#f0f0f0;--clock-face-inner-time-inactive-color:#929292;--clock-face-time-active-color:#fff;--clock-face-time-disabled-color:#c5c5c5;--clock-face-time-inactive-color:#6c6c6c;--clock-hand-color:#00bfff;--dial-active-color:#fff;--dial-background-color:#00bfff;--dial-editable-active-color:#00bfff;--dial-editable-background-color:#fff;--dial-inactive-color:hsla(0,0%,100%,0.5);--primary-font-family:\"Roboto\",sans-serif}.timepicker{border-radius:2px;box-shadow:0 14px 45px rgba(0,0,0,.25),0 10px 18px rgba(0,0,0,.22);outline:none;pointer-events:auto;position:static;width:300px;z-index:999}.timepicker__header{background-color:#00bfff;padding:15px 30px}@supports (background-color:var(--dial-background-color)){.timepicker__header{background-color:var(--dial-background-color)}}.timepicker__body{align-items:center;background-color:#fff;display:flex;justify-content:center;padding:15px 5px}@supports (background-color:var(--body-background-color)){.timepicker__body{background-color:var(--body-background-color)}}.timepicker__actions{background-color:#fff;display:flex;justify-content:flex-end;padding:15px}@supports (background-color:var(--body-background-color)){.timepicker__actions{background-color:var(--body-background-color)}}@media (max-device-width:1023px) and (orientation:landscape){.timepicker{display:flex;width:515px}.timepicker__header{align-items:center;display:flex}.timepicker__main-content{display:flex;flex-direction:column;width:100%}.timepicker__actions{margin-top:-1px;padding:5px}}"]
                },] }
    ];
    NgxMaterialTimepickerContentComponent.ctorParameters = function () { return [
        { type: NgxMaterialTimepickerService }
    ]; };
    NgxMaterialTimepickerContentComponent.propDecorators = {
        defaultTime: [{ type: i0.Input }]
    };

    var ESCAPE = 27;
    var NgxMaterialTimepickerComponent = /** @class */ (function () {
        function NgxMaterialTimepickerComponent(overlay, vcr) {
            this.overlay = overlay;
            this.vcr = vcr;
            this.timeUpdated = new rxjs.Subject();
            this.isEsc = true;
            this.positions = [{ originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' }];
            this.subscriptions = new rxjs.Subscription();
            this.timeSet = new i0.EventEmitter();
            this.opened = new i0.EventEmitter();
            this.closed = new i0.EventEmitter();
            this.hourSelected = new i0.EventEmitter();
        }
        Object.defineProperty(NgxMaterialTimepickerComponent.prototype, "format", {
            get: function () {
                return this.timepickerInput ? this.timepickerInput.format : this._format;
            },
            set: function (value) {
                this._format = value === 24 ? 24 : 12;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgxMaterialTimepickerComponent.prototype, "minutesGap", {
            get: function () {
                return this._minutesGap;
            },
            set: function (gap) {
                if (gap == null) {
                    return;
                }
                gap = Math.floor(gap);
                this._minutesGap = gap <= 59 ? gap : 1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgxMaterialTimepickerComponent.prototype, "minTime", {
            get: function () {
                return this.timepickerInput && this.timepickerInput.min;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgxMaterialTimepickerComponent.prototype, "maxTime", {
            get: function () {
                return this.timepickerInput && this.timepickerInput.max;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgxMaterialTimepickerComponent.prototype, "disabled", {
            get: function () {
                return this.timepickerInput && this.timepickerInput.disabled;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgxMaterialTimepickerComponent.prototype, "time", {
            get: function () {
                return this.timepickerInput && this.timepickerInput.value;
            },
            enumerable: false,
            configurable: true
        });
        /***
         * Register an input with this timepicker.
         * input - The timepicker input to register with this timepicker
         */
        NgxMaterialTimepickerComponent.prototype.registerInput = function (input) {
            if (this.timepickerInput) {
                throw Error('A Timepicker can only be associated with a single input.');
            }
            this.timepickerInput = input;
            this.trigger = input.elementRef;
        };
        NgxMaterialTimepickerComponent.prototype.open = function () {
            var _this = this;
            var positionStrategy = this.overlay
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
                .subscribe(function (event) {
                if (event.key !== undefined) {
                    if (event.key === 'Escape') {
                        _this.overlayRef.detach();
                    }
                }
                else {
                    // tslint:disable-next-line:deprecation
                    if (event.keyCode === ESCAPE) {
                        _this.overlayRef.detach();
                    }
                }
            }));
            this.subscriptions.add(this.overlayRef.backdropClick().subscribe(function (event) {
                _this.overlayRef.detach();
            }));
            this.subscriptions.add(this.overlayRef.detachments().subscribe(function () {
                _this.closed.next();
            }));
            var ngxMaterialTimepickerContentComponentPortal = new portal.ComponentPortal(NgxMaterialTimepickerContentComponent, this.vcr);
            var ngxMaterialTimepickerContentComponent = this.overlayRef.attach(ngxMaterialTimepickerContentComponentPortal);
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
        };
        NgxMaterialTimepickerComponent.prototype.close = function () {
            this.overlayRef.detach();
        };
        NgxMaterialTimepickerComponent.prototype.updateTime = function (time) {
            this.timeUpdated.next(time);
        };
        NgxMaterialTimepickerComponent.prototype.ngOnDestroy = function () {
            this.subscriptions.unsubscribe();
        };
        return NgxMaterialTimepickerComponent;
    }());
    NgxMaterialTimepickerComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngx-material-timepicker',
                    template: "<ng-template #pickerTmpl>\r\n</ng-template>\r\n",
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: ["@import url(C:\\mv\\ngx-material-timepicker\\node_modules\\@angular\\cdk\\overlay-prebuilt.css);"]
                },] }
    ];
    NgxMaterialTimepickerComponent.ctorParameters = function () { return [
        { type: overlay.Overlay },
        { type: i0.ViewContainerRef }
    ]; };
    NgxMaterialTimepickerComponent.propDecorators = {
        pickerTmpl: [{ type: i0.ViewChild, args: ['pickerTmpl', { static: true },] }],
        cancelBtnTmpl: [{ type: i0.Input }],
        editableHintTmpl: [{ type: i0.Input }],
        confirmBtnTmpl: [{ type: i0.Input }],
        isEsc: [{ type: i0.Input, args: ['ESC',] }],
        enableKeyboardInput: [{ type: i0.Input }],
        preventOverlayClick: [{ type: i0.Input }],
        disableAnimation: [{ type: i0.Input }],
        defaultTime: [{ type: i0.Input }],
        trigger: [{ type: i0.Input }],
        panelClass: [{ type: i0.Input }],
        positions: [{ type: i0.Input }],
        format: [{ type: i0.Input }],
        minutesGap: [{ type: i0.Input }],
        timeSet: [{ type: i0.Output }],
        opened: [{ type: i0.Output }],
        closed: [{ type: i0.Output }],
        hourSelected: [{ type: i0.Output }]
    };

    /* To override a default toggle icon */
    var NgxMaterialTimepickerToggleIconDirective = /** @class */ (function () {
        function NgxMaterialTimepickerToggleIconDirective() {
        }
        return NgxMaterialTimepickerToggleIconDirective;
    }());
    NgxMaterialTimepickerToggleIconDirective.decorators = [
        { type: i0.Directive, args: [{ selector: '[ngxMaterialTimepickerToggleIcon]' },] }
    ];

    var NgxMaterialTimepickerToggleComponent = /** @class */ (function () {
        function NgxMaterialTimepickerToggleComponent() {
        }
        Object.defineProperty(NgxMaterialTimepickerToggleComponent.prototype, "disabled", {
            get: function () {
                return this._disabled === undefined ? this.timepicker.disabled : this._disabled;
            },
            set: function (value) {
                this._disabled = value;
            },
            enumerable: false,
            configurable: true
        });
        NgxMaterialTimepickerToggleComponent.prototype.open = function (event) {
            if (this.timepicker) {
                this.timepicker.open();
                event.stopPropagation();
            }
        };
        return NgxMaterialTimepickerToggleComponent;
    }());
    NgxMaterialTimepickerToggleComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngx-material-timepicker-toggle',
                    template: "<button class=\"ngx-material-timepicker-toggle\" (click)=\"open($event)\" [disabled]=\"disabled\" type=\"button\">\r\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24px\" height=\"24px\" *ngIf=\"!customIcon\">\r\n        <path\r\n            d=\"M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003                   6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z\"/>\r\n    </svg>\r\n\r\n    <ng-content select=\"[ngxMaterialTimepickerToggleIcon]\"></ng-content>\r\n</button>\r\n",
                    styles: [".ngx-material-timepicker-toggle{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;align-items:center;background-color:transparent;border:none;border-radius:50%;cursor:pointer;display:flex;justify-content:center;outline:none;padding:4px;text-align:center;transition:background-color .3s;user-select:none}.ngx-material-timepicker-toggle:focus{background-color:rgba(0,0,0,.07)}"]
                },] }
    ];
    NgxMaterialTimepickerToggleComponent.propDecorators = {
        timepicker: [{ type: i0.Input, args: ['for',] }],
        disabled: [{ type: i0.Input }],
        customIcon: [{ type: i0.ContentChild, args: [NgxMaterialTimepickerToggleIconDirective, { static: true },] }]
    };

    var TIME_LOCALE = new i0.InjectionToken('TimeLocale');

    var VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        // tslint:disable-next-line
        useExisting: i0.forwardRef(function () { return TimepickerDirective; }),
        multi: true
    };
    var TimepickerDirective = /** @class */ (function () {
        function TimepickerDirective(elementRef, locale) {
            this.elementRef = elementRef;
            this.locale = locale;
            this._format = 12;
            this._value = '';
            this.timepickerSubscriptions = [];
            this.onTouched = function () {
            };
            this.onChange = function () {
            };
        }
        Object.defineProperty(TimepickerDirective.prototype, "format", {
            get: function () {
                return this._format;
            },
            set: function (value) {
                this._format = value === 24 ? 24 : 12;
                var isDynamicallyChanged = value && (this.previousFormat && this.previousFormat !== this._format);
                if (isDynamicallyChanged) {
                    this.value = this._value;
                    this._timepicker.updateTime(this._value);
                }
                this.previousFormat = this._format;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TimepickerDirective.prototype, "min", {
            get: function () {
                return this._min;
            },
            set: function (value) {
                if (typeof value === 'string') {
                    this._min = TimeAdapter.parseTime(value, { locale: this.locale, format: this.format });
                    return;
                }
                this._min = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TimepickerDirective.prototype, "max", {
            get: function () {
                return this._max;
            },
            set: function (value) {
                if (typeof value === 'string') {
                    this._max = TimeAdapter.parseTime(value, { locale: this.locale, format: this.format });
                    return;
                }
                this._max = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TimepickerDirective.prototype, "timepicker", {
            set: function (picker) {
                this.registerTimepicker(picker);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TimepickerDirective.prototype, "value", {
            get: function () {
                if (!this._value) {
                    return '';
                }
                return TimeAdapter.toLocaleTimeString(this._value, { format: this.format, locale: this.locale });
            },
            set: function (value) {
                if (!value) {
                    this._value = '';
                    this.updateInputValue();
                    return;
                }
                var time = TimeAdapter.formatTime(value, { locale: this.locale, format: this.format });
                var isAvailable = TimeAdapter.isTimeAvailable(time, this._min, this._max, 'minutes', this._timepicker.minutesGap, this._format);
                if (isAvailable) {
                    this._value = time;
                    this.updateInputValue();
                    return;
                }
                console.warn('Selected time doesn\'t match min or max value');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TimepickerDirective.prototype, "defaultTime", {
            set: function (time) {
                this._timepicker.defaultTime = TimeAdapter.formatTime(time, { locale: this.locale, format: this.format });
            },
            enumerable: false,
            configurable: true
        });
        TimepickerDirective.prototype.onInput = function (value) {
            this.value = value;
            this.onChange(value);
        };
        TimepickerDirective.prototype.ngOnChanges = function (changes) {
            if (changes['value'] && changes['value'].currentValue) {
                this.defaultTime = changes['value'].currentValue;
            }
        };
        TimepickerDirective.prototype.onClick = function (event) {
            if (!this.disableClick) {
                this._timepicker.open();
                event.stopPropagation();
            }
        };
        TimepickerDirective.prototype.writeValue = function (value) {
            this.value = value;
            this.defaultTime = value;
        };
        TimepickerDirective.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        TimepickerDirective.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        TimepickerDirective.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
        };
        TimepickerDirective.prototype.ngOnDestroy = function () {
            this.timepickerSubscriptions.forEach(function (s) { return s.unsubscribe(); });
        };
        TimepickerDirective.prototype.registerTimepicker = function (picker) {
            var _this = this;
            if (picker) {
                this._timepicker = picker;
                this._timepicker.registerInput(this);
                this.timepickerSubscriptions.push(this._timepicker.timeSet.subscribe(function (time) {
                    _this.value = time;
                    _this.onChange(_this.value);
                    _this.onTouched();
                }));
                this.timepickerSubscriptions.push(this._timepicker.closed.subscribe(function () { return _this.defaultTime = _this._value; }));
            }
            else {
                throw new Error('NgxMaterialTimepickerComponent is not defined.' +
                    ' Please make sure you passed the timepicker to ngxTimepicker directive');
            }
        };
        TimepickerDirective.prototype.updateInputValue = function () {
            this.elementRef.nativeElement.value = this.value;
        };
        return TimepickerDirective;
    }());
    TimepickerDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[ngxTimepicker]',
                    providers: [VALUE_ACCESSOR],
                    host: {
                        '[disabled]': 'disabled',
                        '(input)': 'onInput($event.target.value)',
                        '(blur)': 'onTouched()',
                    },
                },] }
    ];
    TimepickerDirective.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: String, decorators: [{ type: i0.Inject, args: [TIME_LOCALE,] }] }
    ]; };
    TimepickerDirective.propDecorators = {
        format: [{ type: i0.Input }],
        min: [{ type: i0.Input }],
        max: [{ type: i0.Input }],
        timepicker: [{ type: i0.Input, args: ['ngxTimepicker',] }],
        value: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        disableClick: [{ type: i0.Input }],
        onClick: [{ type: i0.HostListener, args: ['click', ['$event'],] }]
    };

    var NgxMaterialTimepickerThemeDirective = /** @class */ (function () {
        function NgxMaterialTimepickerThemeDirective(elementRef, renderer) {
            this.renderer = renderer;
            this.element = elementRef.nativeElement;
        }
        NgxMaterialTimepickerThemeDirective.prototype.ngAfterViewInit = function () {
            if (this.theme) {
                this.setTheme(this.theme);
            }
        };
        NgxMaterialTimepickerThemeDirective.prototype.setTheme = function (theme) {
            for (var val in theme) {
                if (theme.hasOwnProperty(val)) {
                    if (typeof theme[val] === 'string') {
                        for (var prop in theme) {
                            if (theme.hasOwnProperty(prop)) {
                                this.renderer.setStyle(this.element, "--" + camelCaseToDash(prop), theme[prop]);
                            }
                        }
                        return;
                    }
                    this.setTheme(theme[val]);
                }
            }
        };
        return NgxMaterialTimepickerThemeDirective;
    }());
    NgxMaterialTimepickerThemeDirective.decorators = [
        { type: i0.Directive, args: [{ selector: '[ngxMaterialTimepickerTheme]' },] }
    ];
    NgxMaterialTimepickerThemeDirective.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: i0.Renderer2 }
    ]; };
    NgxMaterialTimepickerThemeDirective.propDecorators = {
        theme: [{ type: i0.Input, args: ['ngxMaterialTimepickerTheme',] }]
    };
    function camelCaseToDash(myStr) {
        return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, exports) {
        for (var p in m)
            if (p !== "default" && !exports.hasOwnProperty(p))
                __createBinding(exports, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    function getHours(format) {
        return Array(format).fill(1).map(function (v, i) {
            var angleStep = 30;
            var time = v + i;
            var angle = angleStep * time;
            return { time: time === 24 ? 0 : time, angle: angle };
        });
    }
    function disableHours(hours, config) {
        if (config.min || config.max) {
            return hours.map(function (value) {
                var hour = config.format === 24 ? value.time : TimeAdapter.formatHour(value.time, config.format, config.period);
                var currentTime = luxon.DateTime.fromObject({ hour: hour }).toFormat(TimeFormat.TWELVE);
                return Object.assign(Object.assign({}, value), { disabled: !TimeAdapter.isTimeAvailable(currentTime, config.min, config.max, 'hours') });
            });
        }
        return hours;
    }
    function getMinutes(gap) {
        if (gap === void 0) { gap = 1; }
        var minutesCount = 60;
        var angleStep = 360 / minutesCount;
        var minutes = [];
        for (var i = 0; i < minutesCount; i++) {
            var angle = angleStep * i;
            if (i % gap === 0) {
                minutes.push({ time: i, angle: angle !== 0 ? angle : 360 });
            }
        }
        return minutes;
    }
    function disableMinutes(minutes, selectedHour, config) {
        if (config.min || config.max) {
            var hour_1 = TimeAdapter.formatHour(selectedHour, config.format, config.period);
            return minutes.map(function (value) {
                var currentTime = luxon.DateTime.fromObject({ hour: hour_1, minute: value.time }).toFormat(TimeFormat.TWELVE);
                return Object.assign(Object.assign({}, value), { disabled: !TimeAdapter.isTimeAvailable(currentTime, config.min, config.max, 'minutes') });
            });
        }
        return minutes;
    }

    var NgxMaterialTimepickerHoursFace = /** @class */ (function () {
        function NgxMaterialTimepickerHoursFace(format) {
            this.hourChange = new i0.EventEmitter();
            this.hourSelected = new i0.EventEmitter();
            this.hoursList = [];
            this.hoursList = getHours(format);
        }
        NgxMaterialTimepickerHoursFace.prototype.onTimeSelected = function (time) {
            this.hourSelected.next(time);
        };
        return NgxMaterialTimepickerHoursFace;
    }());
    NgxMaterialTimepickerHoursFace.decorators = [
        { type: i0.Directive }
    ];
    NgxMaterialTimepickerHoursFace.ctorParameters = function () { return [
        { type: Number }
    ]; };
    NgxMaterialTimepickerHoursFace.propDecorators = {
        selectedHour: [{ type: i0.Input }],
        minTime: [{ type: i0.Input }],
        maxTime: [{ type: i0.Input }],
        format: [{ type: i0.Input }],
        hourChange: [{ type: i0.Output }],
        hourSelected: [{ type: i0.Output }]
    };

    var NgxMaterialTimepicker24HoursFaceComponent = /** @class */ (function (_super) {
        __extends(NgxMaterialTimepicker24HoursFaceComponent, _super);
        function NgxMaterialTimepicker24HoursFaceComponent() {
            return _super.call(this, 24) || this;
        }
        NgxMaterialTimepicker24HoursFaceComponent.prototype.ngAfterContentInit = function () {
            this.hoursList = disableHours(this.hoursList, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format
            });
        };
        return NgxMaterialTimepicker24HoursFaceComponent;
    }(NgxMaterialTimepickerHoursFace));
    NgxMaterialTimepicker24HoursFaceComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngx-material-timepicker-24-hours-face',
                    template: "<ngx-material-timepicker-face [selectedTime]=\"selectedHour\" [faceTime]=\"hoursList\" [format]=\"format\"\r\n                              (timeChange)=\"hourChange.next($event)\"\r\n                              (timeSelected)=\"onTimeSelected($event)\"></ngx-material-timepicker-face>\r\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush
                },] }
    ];
    NgxMaterialTimepicker24HoursFaceComponent.ctorParameters = function () { return []; };

    var NgxMaterialTimepicker12HoursFaceComponent = /** @class */ (function (_super) {
        __extends(NgxMaterialTimepicker12HoursFaceComponent, _super);
        function NgxMaterialTimepicker12HoursFaceComponent() {
            return _super.call(this, 12) || this;
        }
        NgxMaterialTimepicker12HoursFaceComponent.prototype.ngOnChanges = function (changes) {
            if (changes['period'] && changes['period'].currentValue) {
                this.hoursList = disableHours(this.hoursList, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period: this.period
                });
            }
        };
        return NgxMaterialTimepicker12HoursFaceComponent;
    }(NgxMaterialTimepickerHoursFace));
    NgxMaterialTimepicker12HoursFaceComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngx-material-timepicker-12-hours-face',
                    template: "<ngx-material-timepicker-face [selectedTime]=\"selectedHour\" [faceTime]=\"hoursList\"\r\n                              (timeChange)=\"hourChange.next($event)\" (timeSelected)=\"onTimeSelected($event)\"></ngx-material-timepicker-face>\r\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush
                },] }
    ];
    NgxMaterialTimepicker12HoursFaceComponent.ctorParameters = function () { return []; };
    NgxMaterialTimepicker12HoursFaceComponent.propDecorators = {
        period: [{ type: i0.Input }]
    };

    var NgxMaterialTimepickerMinutesFaceComponent = /** @class */ (function () {
        function NgxMaterialTimepickerMinutesFaceComponent() {
            this.minutesList = [];
            this.timeUnit = TimeUnit;
            this.minuteChange = new i0.EventEmitter();
        }
        NgxMaterialTimepickerMinutesFaceComponent.prototype.ngOnChanges = function (changes) {
            if (changes['period'] && changes['period'].currentValue) {
                var minutes = getMinutes(this.minutesGap);
                this.minutesList = disableMinutes(minutes, this.selectedHour, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period: this.period
                });
            }
        };
        return NgxMaterialTimepickerMinutesFaceComponent;
    }());
    NgxMaterialTimepickerMinutesFaceComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngx-material-timepicker-minutes-face',
                    template: "<ngx-material-timepicker-face [faceTime]=\"minutesList\" [selectedTime]=\"selectedMinute\"\r\n                              [minutesGap]=\"minutesGap\"\r\n                              (timeChange)=\"minuteChange.next($event)\" [unit]=\"timeUnit.MINUTE\"></ngx-material-timepicker-face>\r\n"
                },] }
    ];
    NgxMaterialTimepickerMinutesFaceComponent.propDecorators = {
        selectedMinute: [{ type: i0.Input }],
        selectedHour: [{ type: i0.Input }],
        period: [{ type: i0.Input }],
        minTime: [{ type: i0.Input }],
        maxTime: [{ type: i0.Input }],
        format: [{ type: i0.Input }],
        minutesGap: [{ type: i0.Input }],
        minuteChange: [{ type: i0.Output }]
    };

    var CLOCK_HAND_STYLES = {
        small: {
            height: '75px',
            top: 'calc(50% - 75px)'
        },
        large: {
            height: '103px',
            top: 'calc(50% - 103px)'
        }
    };
    var NgxMaterialTimepickerFaceComponent = /** @class */ (function () {
        function NgxMaterialTimepickerFaceComponent() {
            this.timeUnit = TimeUnit;
            this.innerClockFaceSize = 85;
            this.timeChange = new i0.EventEmitter();
            this.timeSelected = new i0.EventEmitter();
        }
        NgxMaterialTimepickerFaceComponent.prototype.ngAfterViewInit = function () {
            this.setClockHandPosition();
            this.addTouchEvents();
        };
        NgxMaterialTimepickerFaceComponent.prototype.ngOnChanges = function (changes) {
            var _this = this;
            var faceTimeChanges = changes['faceTime'];
            var selectedTimeChanges = changes['selectedTime'];
            if ((faceTimeChanges && faceTimeChanges.currentValue)
                && (selectedTimeChanges && selectedTimeChanges.currentValue)) {
                /* Set time according to passed an input value */
                this.selectedTime = this.faceTime.find(function (time) { return time.time === _this.selectedTime.time; });
            }
            if (selectedTimeChanges && selectedTimeChanges.currentValue) {
                this.setClockHandPosition();
            }
            if (faceTimeChanges && faceTimeChanges.currentValue) {
                // To avoid an error ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(function () { return _this.selectAvailableTime(); });
            }
        };
        NgxMaterialTimepickerFaceComponent.prototype.trackByTime = function (_, time) {
            return time.time;
        };
        NgxMaterialTimepickerFaceComponent.prototype.onMousedown = function (e) {
            e.preventDefault();
            this.isStarted = true;
        };
        NgxMaterialTimepickerFaceComponent.prototype.selectTime = function (e) {
            if (!this.isStarted && (e instanceof MouseEvent && e.type !== 'click')) {
                return;
            }
            var clockFaceCords = this.clockFace.nativeElement.getBoundingClientRect();
            /* Get x0 and y0 of the circle */
            var centerX = clockFaceCords.left + clockFaceCords.width / 2;
            var centerY = clockFaceCords.top + clockFaceCords.height / 2;
            /* Counting the arctangent and convert it to from radian to deg */
            var arctangent = Math.atan(Math.abs(e.clientX - centerX) / Math.abs(e.clientY - centerY)) * 180 / Math.PI;
            /* Get angle according to quadrant */
            var circleAngle = countAngleByCords(centerX, centerY, e.clientX, e.clientY, arctangent);
            /* Check if selected time from the inner clock face (24 hours format only) */
            var isInnerClockChosen = this.format && this.isInnerClockFace(centerX, centerY, e.clientX, e.clientY);
            /* Round angle according to angle step */
            var angleStep = this.unit === TimeUnit.MINUTE ? (6 * (this.minutesGap || 1)) : 30;
            var roundedAngle = isInnerClockChosen
                ? roundAngle(circleAngle, angleStep) + 360
                : roundAngle(circleAngle, angleStep);
            var angle = roundedAngle === 0 ? 360 : roundedAngle;
            var selectedTime = this.faceTime.find(function (val) { return val.angle === angle; });
            if (selectedTime && !selectedTime.disabled) {
                this.timeChange.next(selectedTime);
                /* To let know whether user ended interaction with clock face */
                if (!this.isStarted) {
                    this.timeSelected.next(selectedTime.time);
                }
            }
        };
        NgxMaterialTimepickerFaceComponent.prototype.onMouseup = function (e) {
            e.preventDefault();
            this.isStarted = false;
        };
        NgxMaterialTimepickerFaceComponent.prototype.ngOnDestroy = function () {
            this.removeTouchEvents();
        };
        NgxMaterialTimepickerFaceComponent.prototype.addTouchEvents = function () {
            this.touchStartHandler = this.onMousedown.bind(this);
            this.touchEndHandler = this.onMouseup.bind(this);
            this.clockFace.nativeElement.addEventListener('touchstart', this.touchStartHandler);
            this.clockFace.nativeElement.addEventListener('touchend', this.touchEndHandler);
        };
        NgxMaterialTimepickerFaceComponent.prototype.removeTouchEvents = function () {
            this.clockFace.nativeElement.removeEventListener('touchstart', this.touchStartHandler);
            this.clockFace.nativeElement.removeEventListener('touchend', this.touchEndHandler);
        };
        NgxMaterialTimepickerFaceComponent.prototype.setClockHandPosition = function () {
            if (this.format === 24) {
                if (this.selectedTime.time > 12 || this.selectedTime.time === 0) {
                    this.decreaseClockHand();
                }
                else {
                    this.increaseClockHand();
                }
            }
            this.clockHand.nativeElement.style.transform = "rotate(" + this.selectedTime.angle + "deg)";
        };
        NgxMaterialTimepickerFaceComponent.prototype.selectAvailableTime = function () {
            var _this = this;
            var currentTime = this.faceTime.find(function (time) { return _this.selectedTime.time === time.time; });
            this.isClockFaceDisabled = this.faceTime.every(function (time) { return time.disabled; });
            if ((currentTime && currentTime.disabled) && !this.isClockFaceDisabled) {
                var availableTime = this.faceTime.find(function (time) { return !time.disabled; });
                this.timeChange.next(availableTime);
            }
        };
        NgxMaterialTimepickerFaceComponent.prototype.isInnerClockFace = function (x0, y0, x, y) {
            /* Detect whether time from the inner clock face or not (24 format only) */
            return Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2)) < this.innerClockFaceSize;
        };
        NgxMaterialTimepickerFaceComponent.prototype.decreaseClockHand = function () {
            this.clockHand.nativeElement.style.height = CLOCK_HAND_STYLES.small.height;
            this.clockHand.nativeElement.style.top = CLOCK_HAND_STYLES.small.top;
        };
        NgxMaterialTimepickerFaceComponent.prototype.increaseClockHand = function () {
            this.clockHand.nativeElement.style.height = CLOCK_HAND_STYLES.large.height;
            this.clockHand.nativeElement.style.top = CLOCK_HAND_STYLES.large.top;
        };
        return NgxMaterialTimepickerFaceComponent;
    }());
    NgxMaterialTimepickerFaceComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngx-material-timepicker-face',
                    template: "<div class=\"clock-face\" #clockFace>\r\n    <div *ngIf=\"unit !== timeUnit.MINUTE;else minutesFace\" class=\"clock-face__container\">\r\n        <div class=\"clock-face__number clock-face__number--outer\"\r\n             [style.transform]=\"'rotateZ('+ time.angle +'deg) translateX(-50%)' | styleSanitizer\"\r\n             *ngFor=\"let time of faceTime | slice: 0 : 12; trackBy: trackByTime\">\r\n\t\t\t<span [style.transform]=\"'rotateZ(-'+ time.angle +'deg)' | styleSanitizer\"\r\n                  [ngClass]=\"{'active': time.time | activeHour: selectedTime.time : isClockFaceDisabled,\r\n                   'disabled': time.disabled}\">\r\n                {{time.time | timeLocalizer: timeUnit.HOUR}}\r\n            </span>\r\n        </div>\r\n        <div class=\"clock-face__inner\" *ngIf=\"faceTime.length > 12\"\r\n             [style.top]=\"'calc(50% - ' + innerClockFaceSize + 'px)'\">\r\n            <div class=\"clock-face__number clock-face__number--inner\"\r\n                 [style.transform]=\"'rotateZ('+ time.angle +'deg) translateX(-50%)' | styleSanitizer\"\r\n                 [style.height.px]=\"innerClockFaceSize\"\r\n                 *ngFor=\"let time of faceTime | slice: 12 : 24; trackBy: trackByTime\">\r\n\t\t\t<span [style.transform]=\"'rotateZ(-'+ time.angle +'deg)' | styleSanitizer\"\r\n                  [ngClass]=\"{'active': time.time | activeHour: selectedTime?.time : isClockFaceDisabled,\r\n                   'disabled': time.disabled}\">\r\n                {{time.time | timeLocalizer: timeUnit.HOUR}}</span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <span class=\"clock-face__clock-hand\" [ngClass]=\"{'clock-face__clock-hand_minute': unit === timeUnit.MINUTE}\"\r\n          #clockHand [hidden]=\"isClockFaceDisabled\"></span>\r\n</div>\r\n<ng-template #minutesFace>\r\n    <div class=\"clock-face__container\">\r\n        <div class=\"clock-face__number clock-face__number--outer\"\r\n             [style.transform]=\"'rotateZ('+ time.angle +'deg) translateX(-50%)' | styleSanitizer\"\r\n             *ngFor=\"let time of faceTime; trackBy: trackByTime\">\r\n\t<span [style.transform]=\"'rotateZ(-'+ time.angle +'deg)' | styleSanitizer\"\r\n          [ngClass]=\"{'active': time.time | activeMinute: selectedTime?.time:minutesGap:isClockFaceDisabled,\r\n           'disabled': time.disabled}\">\r\n\t{{time.time | minutesFormatter: minutesGap | timeLocalizer: timeUnit.MINUTE}}</span>\r\n        </div>\r\n    </div>\r\n</ng-template>\r\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".clock-face{background-color:#f0f0f0;border-radius:50%;box-sizing:border-box;display:flex;height:290px;justify-content:center;padding:20px;position:relative;width:290px}@supports (background-color:var(--clock-face-background-color)){.clock-face{background-color:var(--clock-face-background-color)}}.clock-face__inner{position:absolute}.clock-face__container{margin-left:-2px}.clock-face__number{position:absolute;text-align:center;transform-origin:0 100%;width:50px;z-index:2}.clock-face__number--outer{height:125px}.clock-face__number--outer>span{color:#6c6c6c;font-size:16px}@supports (color:var(--clock-face-time-inactive-color)){.clock-face__number--outer>span{color:var(--clock-face-time-inactive-color)}}.clock-face__number--inner>span{color:#929292;font-size:14px}@supports (color:var(--clock-face-inner-time-inactive-color)){.clock-face__number--inner>span{color:var(--clock-face-inner-time-inactive-color)}}.clock-face__number>span{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;align-items:center;border-radius:50%;display:flex;font-family:Roboto,sans-serif;font-weight:500;height:30px;justify-content:center;margin:auto;user-select:none;width:30px}@supports (font-family:var(--primary-font-family)){.clock-face__number>span{font-family:var(--primary-font-family)}}.clock-face__number>span.active{background-color:#00bfff;color:#fff}@supports (background-color:var(--clock-hand-color)){.clock-face__number>span.active{background-color:var(--clock-hand-color);color:var(--clock-face-time-active-color)}}.clock-face__number>span.disabled{color:#c5c5c5}@supports (color:var(--clock-face-time-disabled-color)){.clock-face__number>span.disabled{color:var(--clock-face-time-disabled-color)}}.clock-face__clock-hand{background-color:#00bfff;height:103px;position:absolute;top:calc(50% - 103px);transform-origin:0 100%;width:2px;z-index:1}@supports (background-color:var(--clock-hand-color)){.clock-face__clock-hand{background-color:var(--clock-hand-color)}}.clock-face__clock-hand:after{background-color:inherit;border-radius:50%;bottom:-3px;content:\"\";height:7px;left:-3.5px;position:absolute;width:7px}.clock-face__clock-hand_minute:before{background-color:#fff;border:4px solid #00bfff;border-radius:50%;box-sizing:content-box;content:\"\";height:7px;left:calc(50% - 8px);position:absolute;top:-8px;width:7px}@supports (border-color:var(--clock-hand-color)){.clock-face__clock-hand_minute:before{border-color:var(--clock-hand-color)}}@media (max-device-width:1023px) and (orientation:landscape){.clock-face{height:225px;padding:5px;width:225px}.clock-face__number--outer{height:107.5px}.clock-face__clock-hand_minute:before{top:0}}"]
                },] }
    ];
    NgxMaterialTimepickerFaceComponent.propDecorators = {
        faceTime: [{ type: i0.Input }],
        selectedTime: [{ type: i0.Input }],
        unit: [{ type: i0.Input }],
        format: [{ type: i0.Input }],
        minutesGap: [{ type: i0.Input }],
        timeChange: [{ type: i0.Output }],
        timeSelected: [{ type: i0.Output }],
        clockFace: [{ type: i0.ViewChild, args: ['clockFace', { static: true },] }],
        clockHand: [{ type: i0.ViewChild, args: ['clockHand', { static: true },] }],
        onMousedown: [{ type: i0.HostListener, args: ['mousedown', ['$event'],] }],
        selectTime: [{ type: i0.HostListener, args: ['click', ['$event'],] }, { type: i0.HostListener, args: ['touchmove', ['$event.changedTouches[0]'],] }, { type: i0.HostListener, args: ['touchend', ['$event.changedTouches[0]'],] }, { type: i0.HostListener, args: ['mousemove', ['$event'],] }],
        onMouseup: [{ type: i0.HostListener, args: ['mouseup', ['$event'],] }]
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

    var NgxMaterialTimepickerButtonComponent = /** @class */ (function () {
        function NgxMaterialTimepickerButtonComponent() {
        }
        return NgxMaterialTimepickerButtonComponent;
    }());
    NgxMaterialTimepickerButtonComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngx-material-timepicker-button',
                    template: "<button class=\"timepicker-button\" type=\"button\">\r\n  <span><ng-content></ng-content></span>\r\n</button>\r\n",
                    styles: [".timepicker-button{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;background-color:transparent;border:12px;border-radius:2px;color:#00bfff;cursor:pointer;display:inline-block;height:36px;line-height:36px;min-width:88px;outline:none;overflow:hidden;position:relative;text-align:center;transition:all .45s cubic-bezier(.23,1,.32,1);user-select:none}@supports (color:var(--button-color)){.timepicker-button{color:var(--button-color)}}.timepicker-button:focus,.timepicker-button:hover{background-color:hsla(0,0%,60%,.2)}.timepicker-button>span{font-family:Roboto,sans-serif;font-size:14px;font-weight:600;padding-left:16px;padding-right:16px;text-transform:uppercase}@supports (font-family:var(--primary-font-family)){.timepicker-button>span{font-family:var(--primary-font-family)}}"]
                },] }
    ];

    var NgxMaterialTimepickerDialComponent = /** @class */ (function () {
        function NgxMaterialTimepickerDialComponent(locale) {
            this.locale = locale;
            this.timeUnit = TimeUnit;
            this.meridiems = luxon.Info.meridiems({ locale: this.locale });
            this.periodChanged = new i0.EventEmitter();
            this.timeUnitChanged = new i0.EventEmitter();
            this.hourChanged = new i0.EventEmitter();
            this.minuteChanged = new i0.EventEmitter();
        }
        NgxMaterialTimepickerDialComponent.prototype.ngOnChanges = function (changes) {
            if (changes['period'] && changes['period'].currentValue
                || changes['format'] && changes['format'].currentValue) {
                var hours = getHours(this.format);
                this.hours = disableHours(hours, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period: this.period
                });
            }
            if (changes['period'] && changes['period'].currentValue
                || changes['hour'] && changes['hour'].currentValue) {
                var minutes = getMinutes(this.minutesGap);
                this.minutes = disableMinutes(minutes, +this.hour, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period: this.period
                });
            }
        };
        NgxMaterialTimepickerDialComponent.prototype.changeTimeUnit = function (unit) {
            this.timeUnitChanged.next(unit);
        };
        NgxMaterialTimepickerDialComponent.prototype.changePeriod = function (period) {
            this.periodChanged.next(period);
        };
        NgxMaterialTimepickerDialComponent.prototype.changeHour = function (hour) {
            this.hourChanged.next(hour);
        };
        NgxMaterialTimepickerDialComponent.prototype.changeMinute = function (minute) {
            this.minuteChanged.next(minute);
        };
        NgxMaterialTimepickerDialComponent.prototype.showHint = function () {
            this.isHintVisible = true;
        };
        NgxMaterialTimepickerDialComponent.prototype.hideHint = function () {
            this.isHintVisible = false;
        };
        return NgxMaterialTimepickerDialComponent;
    }());
    NgxMaterialTimepickerDialComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngx-material-timepicker-dial',
                    template: "<div class=\"timepicker-dial\">\r\n    <div class=\"timepicker-dial__container\">\r\n        <div class=\"timepicker-dial__time\">\r\n            <ngx-material-timepicker-dial-control [timeList]=\"hours\" [time]=\"hour\" [timeUnit]=\"timeUnit.HOUR\"\r\n                                                  [isActive]=\"activeTimeUnit === timeUnit.HOUR\"\r\n                                                  [isEditable]=\"isEditable\"\r\n                                                  (timeUnitChanged)=\"changeTimeUnit($event)\"\r\n                                                  (timeChanged)=\"changeHour($event)\"\r\n                                                  (focused)=\"showHint()\"\r\n                                                  (unfocused)=\"hideHint()\">\r\n\r\n            </ngx-material-timepicker-dial-control>\r\n            <span>:</span>\r\n            <ngx-material-timepicker-dial-control [timeList]=\"minutes\" [time]=\"minute\" [timeUnit]=\"timeUnit.MINUTE\"\r\n                                                  [isActive]=\"activeTimeUnit === timeUnit.MINUTE\"\r\n                                                  [isEditable]=\"isEditable\"\r\n                                                  [minutesGap]=\"minutesGap\"\r\n                                                  (timeUnitChanged)=\"changeTimeUnit($event)\"\r\n                                                  (timeChanged)=\"changeMinute($event)\"\r\n                                                  (focused)=\"showHint()\"\r\n                                                  (unfocused)=\"hideHint()\">\r\n\r\n            </ngx-material-timepicker-dial-control>\r\n        </div>\r\n        <ngx-material-timepicker-period class=\"timepicker-dial__period\"\r\n                                        [ngClass]=\"{'timepicker-dial__period--hidden': format === 24}\"\r\n                                        [selectedPeriod]=\"period\" [activeTimeUnit]=\"activeTimeUnit\"\r\n                                        [maxTime]=\"maxTime\" [minTime]=\"minTime\" [format]=\"format\"\r\n                                        [hours]=\"hours\" [minutes]=\"minutes\" [selectedHour]=\"hour\"\r\n                                        [meridiems]=\"meridiems\"\r\n                                        (periodChanged)=\"changePeriod($event)\"></ngx-material-timepicker-period>\r\n    </div>\r\n    <div *ngIf=\"isEditable\" [ngClass]=\"{'timepicker-dial__hint-container--hidden': !isHintVisible}\">\r\n        <!--suppress HtmlUnknownAttribute -->\r\n        <ng-container *ngTemplateOutlet=\"editableHintTmpl ? editableHintTmpl : editableHintDefault\"></ng-container>\r\n        <ng-template #editableHintDefault>\r\n            <small class=\"timepicker-dial__hint\"> * use arrows (<span>&#8645;</span>) to change the time</small>\r\n        </ng-template>\r\n    </div>\r\n</div>\r\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".timepicker-dial{text-align:right}.timepicker-dial__container{-webkit-tap-highlight-color:rgba(0,0,0,0);align-items:center;display:flex;justify-content:flex-end}.timepicker-dial__time{align-items:baseline;color:hsla(0,0%,100%,.5);display:flex;font-family:Roboto,sans-serif;font-size:50px;line-height:normal}@supports (font-family:var(--primary-font-family)){.timepicker-dial__time{color:var(--dial-inactive-color);font-family:var(--primary-font-family)}}.timepicker-dial__period{display:block;margin-left:10px}.timepicker-dial__hint-container--hidden,.timepicker-dial__period--hidden{visibility:hidden}.timepicker-dial__hint{color:#fff;display:inline-block;font-size:10px}@supports (color:var(--dial-active-color)){.timepicker-dial__hint{color:var(--dial-active-color)}}.timepicker-dial__hint span{font-size:14px}@media (max-device-width:1023px) and (orientation:landscape){.timepicker-dial__container{flex-direction:column}.timepicker-dial__period{margin-left:0}}"]
                },] }
    ];
    NgxMaterialTimepickerDialComponent.ctorParameters = function () { return [
        { type: String, decorators: [{ type: i0.Inject, args: [TIME_LOCALE,] }] }
    ]; };
    NgxMaterialTimepickerDialComponent.propDecorators = {
        editableHintTmpl: [{ type: i0.Input }],
        hour: [{ type: i0.Input }],
        minute: [{ type: i0.Input }],
        format: [{ type: i0.Input }],
        period: [{ type: i0.Input }],
        activeTimeUnit: [{ type: i0.Input }],
        minTime: [{ type: i0.Input }],
        maxTime: [{ type: i0.Input }],
        isEditable: [{ type: i0.Input }],
        minutesGap: [{ type: i0.Input }],
        periodChanged: [{ type: i0.Output }],
        timeUnitChanged: [{ type: i0.Output }],
        hourChanged: [{ type: i0.Output }],
        minuteChanged: [{ type: i0.Output }]
    };

    var TimeParserPipe = /** @class */ (function () {
        function TimeParserPipe(locale) {
            this.locale = locale;
            this.numberingSystem = luxon.DateTime.local().setLocale(this.locale).resolvedLocaleOpts().numberingSystem;
        }
        TimeParserPipe.prototype.transform = function (time, timeUnit) {
            if (timeUnit === void 0) { timeUnit = TimeUnit.HOUR; }
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
        };
        TimeParserPipe.prototype.parseTime = function (time, format, timeMeasure) {
            var parsedTime = luxon.DateTime.fromFormat(String(time), format, { numberingSystem: this.numberingSystem })[timeMeasure];
            if (!isNaN(parsedTime)) {
                return parsedTime;
            }
            throw new Error("Cannot parse time - " + time);
        };
        return TimeParserPipe;
    }());
    TimeParserPipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'timeParser'
                },] }
    ];
    TimeParserPipe.ctorParameters = function () { return [
        { type: String, decorators: [{ type: i0.Inject, args: [TIME_LOCALE,] }] }
    ]; };

    /* tslint:disable:triple-equals */
    var NgxMaterialTimepickerDialControlComponent = /** @class */ (function () {
        function NgxMaterialTimepickerDialControlComponent(timeParserPipe) {
            this.timeParserPipe = timeParserPipe;
            this.timeUnitChanged = new i0.EventEmitter();
            this.timeChanged = new i0.EventEmitter();
            this.focused = new i0.EventEmitter();
            this.unfocused = new i0.EventEmitter();
        }
        Object.defineProperty(NgxMaterialTimepickerDialControlComponent.prototype, "selectedTime", {
            get: function () {
                var _this = this;
                if (!!this.time) {
                    return this.timeList.find(function (t) { return t.time === +_this.time; });
                }
            },
            enumerable: false,
            configurable: true
        });
        NgxMaterialTimepickerDialControlComponent.prototype.saveTimeAndChangeTimeUnit = function (event, unit) {
            event.preventDefault();
            this.previousTime = this.time;
            this.timeUnitChanged.next(unit);
            this.focused.next();
        };
        NgxMaterialTimepickerDialControlComponent.prototype.updateTime = function () {
            var time = this.selectedTime;
            if (time) {
                this.timeChanged.next(time);
                this.previousTime = time.time;
            }
        };
        NgxMaterialTimepickerDialControlComponent.prototype.onKeyDown = function (e) {
            var char = String.fromCharCode(e.keyCode);
            if ((!isDigit(e)) || isTimeDisabledToChange(this.time, char, this.timeList)) {
                e.preventDefault();
            }
            if (isDigit(e)) {
                this.changeTimeByArrow(e.keyCode);
            }
        };
        NgxMaterialTimepickerDialControlComponent.prototype.onModelChange = function (value) {
            this.time = this.timeParserPipe.transform(value, this.timeUnit).toString();
        };
        NgxMaterialTimepickerDialControlComponent.prototype.changeTimeByArrow = function (keyCode) {
            var ARROW_UP = 38;
            var ARROW_DOWN = 40;
            var time;
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
        };
        return NgxMaterialTimepickerDialControlComponent;
    }());
    NgxMaterialTimepickerDialControlComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngx-material-timepicker-dial-control',
                    template: "<!--suppress HtmlFormInputWithoutLabel, HtmlUnknownAttribute -->\r\n<input class=\"timepicker-dial__control timepicker-dial__item\"\r\n       [ngClass]=\"{'timepicker-dial__item_active': isActive}\"\r\n       [ngModel]=\"time | timeLocalizer: timeUnit\"\r\n       (ngModelChange)=\"time = $event\"\r\n       (input)=\"updateTime()\" (focus)=\"saveTimeAndChangeTimeUnit($event, timeUnit)\"\r\n       readonly [timepickerAutofocus]=\"isActive\" (keydown)=\"onKeyDown($event)\"\r\n       *ngIf=\"!isEditable;else editableTemplate\">\r\n\r\n<ng-template #editableTemplate>\r\n    <!--suppress HtmlFormInputWithoutLabel, HtmlUnknownAttribute -->\r\n    <input class=\"timepicker-dial__control timepicker-dial__item timepicker-dial__control_editable\"\r\n           [ngClass]=\"{'timepicker-dial__item_active': isActive}\"\r\n           [ngModel]=\"time | timeParser: timeUnit | timeLocalizer: timeUnit\"\r\n           (ngModelChange)=\"onModelChange($event)\"\r\n           (input)=\"updateTime()\" (focus)=\"saveTimeAndChangeTimeUnit($event, timeUnit)\"\r\n           [timepickerAutofocus]=\"isActive\" (keydown)=\"onKeyDown($event)\">\r\n</ng-template>\r\n",
                    providers: [TimeParserPipe],
                    styles: [".timepicker-dial__item{color:hsla(0,0%,100%,.5);cursor:pointer;font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.timepicker-dial__item{color:var(--dial-inactive-color);font-family:var(--primary-font-family)}}.timepicker-dial__item_active{color:#fff}@supports (color:var(--dial-active-color)){.timepicker-dial__item_active{color:var(--dial-active-color)}}.timepicker-dial__control{background-color:transparent;border:none;border-radius:3px;font-size:50px;padding:0;text-align:right;width:60px}.timepicker-dial__control_editable:focus{background-color:#fff;color:#00bfff;outline:#00bfff}@supports (color:var(--dial-editable-active-color)){.timepicker-dial__control_editable:focus{color:var(--dial-editable-active-color)}}@supports (background-color:var(--dial-editable-background-color)){.timepicker-dial__control_editable:focus{background-color:var(--dial-editable-background-color)}}@supports (outline:var(--dial-editable-active-color)){.timepicker-dial__control_editable:focus{outline:var(--dial-editable-active-color)}}"]
                },] }
    ];
    NgxMaterialTimepickerDialControlComponent.ctorParameters = function () { return [
        { type: TimeParserPipe }
    ]; };
    NgxMaterialTimepickerDialControlComponent.propDecorators = {
        timeList: [{ type: i0.Input }],
        timeUnit: [{ type: i0.Input }],
        time: [{ type: i0.Input }],
        isActive: [{ type: i0.Input }],
        isEditable: [{ type: i0.Input }],
        minutesGap: [{ type: i0.Input }],
        timeUnitChanged: [{ type: i0.Output }],
        timeChanged: [{ type: i0.Output }],
        focused: [{ type: i0.Output }],
        unfocused: [{ type: i0.Output }]
    };
    function isTimeDisabledToChange(currentTime, nextTime, timeList) {
        var isNumber = /\d/.test(nextTime);
        if (isNumber) {
            var time = currentTime + nextTime;
            return isTimeUnavailable(time, timeList);
        }
    }
    function isTimeUnavailable(time, timeList) {
        var selectedTime = timeList.find(function (value) { return value.time === +time; });
        return !selectedTime || (selectedTime && selectedTime.disabled);
    }

    var NgxMaterialTimepickerPeriodComponent = /** @class */ (function () {
        function NgxMaterialTimepickerPeriodComponent() {
            this.timePeriod = TimePeriod;
            this.isPeriodAvailable = true;
            this.periodChanged = new i0.EventEmitter();
        }
        NgxMaterialTimepickerPeriodComponent.prototype.changePeriod = function (period) {
            this.isPeriodAvailable = this.isSwitchPeriodAvailable(period);
            if (this.isPeriodAvailable) {
                this.periodChanged.next(period);
            }
        };
        NgxMaterialTimepickerPeriodComponent.prototype.animationDone = function () {
            this.isPeriodAvailable = true;
        };
        NgxMaterialTimepickerPeriodComponent.prototype.isSwitchPeriodAvailable = function (period) {
            var time = this.getDisabledTimeByPeriod(period);
            return !time.every(function (t) { return t.disabled; });
        };
        NgxMaterialTimepickerPeriodComponent.prototype.getDisabledTimeByPeriod = function (period) {
            switch (this.activeTimeUnit) {
                case TimeUnit.HOUR:
                    return disableHours(this.hours, {
                        min: this.minTime,
                        max: this.maxTime,
                        format: this.format,
                        period: period
                    });
                case TimeUnit.MINUTE:
                    return disableMinutes(this.minutes, +this.selectedHour, {
                        min: this.minTime,
                        max: this.maxTime,
                        format: this.format,
                        period: period
                    });
                default:
                    throw new Error('no such TimeUnit');
            }
        };
        return NgxMaterialTimepickerPeriodComponent;
    }());
    NgxMaterialTimepickerPeriodComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngx-material-timepicker-period',
                    template: "<div class=\"timepicker-period\">\r\n\t\t\t<button class=\"timepicker-dial__item timepicker-period__btn\"\r\n                  [ngClass]=\"{'timepicker-dial__item_active': selectedPeriod === timePeriod.AM}\"\r\n                  (click)=\"changePeriod(timePeriod.AM)\"\r\n                  type=\"button\">{{meridiems[0]}}</button>\r\n    <button class=\"timepicker-dial__item timepicker-period__btn\"\r\n          [ngClass]=\"{'timepicker-dial__item_active': selectedPeriod === timePeriod.PM}\"\r\n          (click)=\"changePeriod(timePeriod.PM)\"\r\n          type=\"button\">{{meridiems[1]}}</button>\r\n    <div class=\"timepicker-period__warning\" [@scaleInOut] (@scaleInOut.done)=\"animationDone()\" *ngIf=\"!isPeriodAvailable\">\r\n        <p>Current time would be invalid in this period.</p>\r\n    </div>\r\n</div>\r\n",
                    animations: [
                        animations.trigger('scaleInOut', [
                            animations.transition(':enter', [
                                animations.style({ transform: 'scale(0)' }),
                                animations.animate('.2s', animations.style({ transform: 'scale(1)' })),
                                animations.sequence([
                                    animations.animate('3s', animations.style({ opacity: 1 })),
                                    animations.animate('.3s', animations.style({ opacity: 0 }))
                                ])
                            ])
                        ])
                    ],
                    styles: [".timepicker-dial__item{color:hsla(0,0%,100%,.5);cursor:pointer;font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.timepicker-dial__item{color:var(--dial-inactive-color);font-family:var(--primary-font-family)}}.timepicker-dial__item_active{color:#fff}@supports (color:var(--dial-active-color)){.timepicker-dial__item_active{color:var(--dial-active-color)}}.timepicker-period{display:flex;flex-direction:column;position:relative}.timepicker-period__btn{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;background-color:transparent;border:0;border-radius:3px;font-family:Roboto,sans-serif;font-size:18px;font-weight:500;outline:none;padding:1px 3px;transition:background-color .5s;user-select:none}@supports (font-family:var(--primary-font-family)){.timepicker-period__btn{font-family:var(--primary-font-family)}}.timepicker-period__btn:focus{background-color:rgba(0,0,0,.07)}.timepicker-period__warning{background-color:rgba(0,0,0,.55);border-radius:3px;color:#fff;left:-20px;padding:5px 10px;position:absolute;top:40px;width:200px}.timepicker-period__warning>p{font-family:Roboto,sans-serif;font-size:12px;margin:0}@supports (font-family:var(--primary-font-family)){.timepicker-period__warning>p{font-family:var(--primary-font-family)}}"]
                },] }
    ];
    NgxMaterialTimepickerPeriodComponent.propDecorators = {
        selectedPeriod: [{ type: i0.Input }],
        format: [{ type: i0.Input }],
        activeTimeUnit: [{ type: i0.Input }],
        hours: [{ type: i0.Input }],
        minutes: [{ type: i0.Input }],
        minTime: [{ type: i0.Input }],
        maxTime: [{ type: i0.Input }],
        selectedHour: [{ type: i0.Input }],
        meridiems: [{ type: i0.Input }],
        periodChanged: [{ type: i0.Output }]
    };

    var StyleSanitizerPipe = /** @class */ (function () {
        function StyleSanitizerPipe(domSanitizer) {
            this.domSanitizer = domSanitizer;
        }
        StyleSanitizerPipe.prototype.transform = function (value) {
            if (!value) {
                return value;
            }
            return this.domSanitizer.bypassSecurityTrustStyle(value);
        };
        return StyleSanitizerPipe;
    }());
    StyleSanitizerPipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'styleSanitizer'
                },] }
    ];
    StyleSanitizerPipe.ctorParameters = function () { return [
        { type: platformBrowser.DomSanitizer }
    ]; };

    var TimeFormatterPipe = /** @class */ (function () {
        function TimeFormatterPipe() {
        }
        TimeFormatterPipe.prototype.transform = function (time, timeUnit) {
            if (time == null || time === '') {
                return time;
            }
            switch (timeUnit) {
                case TimeUnit.HOUR:
                    return luxon.DateTime.fromObject({ hour: +time }).toFormat('HH');
                case TimeUnit.MINUTE:
                    return luxon.DateTime.fromObject({ minute: +time }).toFormat('mm');
                default:
                    throw new Error('no such time unit');
            }
        };
        return TimeFormatterPipe;
    }());
    TimeFormatterPipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'timeFormatter'
                },] }
    ];

    var MinutesFormatterPipe = /** @class */ (function () {
        function MinutesFormatterPipe() {
        }
        MinutesFormatterPipe.prototype.transform = function (minute, gap) {
            if (gap === void 0) { gap = 5; }
            if (!minute) {
                return minute;
            }
            return minute % gap === 0 ? minute : '';
        };
        return MinutesFormatterPipe;
    }());
    MinutesFormatterPipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'minutesFormatter'
                },] }
    ];

    var NgxTimepickerFieldComponent = /** @class */ (function () {
        function NgxTimepickerFieldComponent(timepickerService, locale) {
            this.timepickerService = timepickerService;
            this.locale = locale;
            this.minHour = 1;
            this.maxHour = 12;
            this.timeUnit = TimeUnit;
            this.buttonAlign = 'right';
            this._format = 12;
            this.unsubscribe$ = new rxjs.Subject();
            this.onChange = function () {
            };
        }
        Object.defineProperty(NgxTimepickerFieldComponent.prototype, "format", {
            get: function () {
                return this._format;
            },
            set: function (value) {
                this._format = value === 24 ? 24 : 12;
                this.minHour = this._format === 12 ? 1 : 0;
                this.maxHour = this._format === 12 ? 12 : 23;
                this.hoursList = getHours(this._format);
                var isDynamicallyChanged = value && (this.previousFormat && this.previousFormat !== this._format);
                if (isDynamicallyChanged) {
                    this.defaultTime = this.timepickerTime;
                }
                this.previousFormat = this._format;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgxTimepickerFieldComponent.prototype, "defaultTime", {
            get: function () {
                return this._defaultTime;
            },
            set: function (val) {
                var time = TimeAdapter.formatTime(val, { locale: this.locale, format: this._format });
                this.timepickerService.setDefaultTimeIfAvailable(time, null, null, this._format);
                this._defaultTime = time;
                this.timepickerTime = time;
                this.isDefaultTime = !!time;
            },
            enumerable: false,
            configurable: true
        });
        NgxTimepickerFieldComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.period$ = this.timepickerService.selectedPeriod;
            this.timepickerService.selectedHour.pipe(operators.takeUntil(this.unsubscribe$))
                .subscribe(function (hour) { return _this.hour = hour.time; });
            this.timepickerService.selectedMinute.pipe(operators.takeUntil(this.unsubscribe$))
                .subscribe(function (minute) { return _this.minute = minute.time; });
            this.hoursList = getHours(this._format);
            this.minutesList = getMinutes();
        };
        NgxTimepickerFieldComponent.prototype.writeValue = function (val) {
            if (val) {
                this.defaultTime = val;
            }
        };
        NgxTimepickerFieldComponent.prototype.registerOnTouched = function (fn) {
        };
        NgxTimepickerFieldComponent.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        NgxTimepickerFieldComponent.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
        };
        NgxTimepickerFieldComponent.prototype.changeHour = function (hour) {
            this.timepickerService.hour = this.hoursList.find(function (h) { return h.time === hour; });
            this.changeTime();
        };
        NgxTimepickerFieldComponent.prototype.changeMinute = function (minute) {
            this.timepickerService.minute = this.minutesList.find(function (m) { return m.time === minute; });
            this.changeTime();
        };
        NgxTimepickerFieldComponent.prototype.changePeriod = function (period) {
            this.timepickerService.period = period;
            this.changeTime();
        };
        NgxTimepickerFieldComponent.prototype.onTimeSet = function (time) {
            var localeTime = TimeAdapter.toLocaleTimeString(time, { format: this.format, locale: this.locale });
            this.defaultTime = time;
            this.onChange(localeTime);
        };
        NgxTimepickerFieldComponent.prototype.ngOnDestroy = function () {
            this.unsubscribe$.next();
        };
        NgxTimepickerFieldComponent.prototype.changeTime = function () {
            var time = this.timepickerService.getFullTime(this._format);
            this.timepickerTime = time;
            this.onChange(time);
        };
        return NgxTimepickerFieldComponent;
    }());
    NgxTimepickerFieldComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngx-timepicker-field',
                    template: "<div class=\"ngx-timepicker\" [ngClass]=\"{'ngx-timepicker--disabled': disabled}\" #trigger>\r\n    <ngx-timepicker-time-control\r\n        class=\"ngx-timepicker__control--first\"\r\n        [placeholder]=\"'HH'\"\r\n        [time]=\"hour\"\r\n        [min]=\"minHour\"\r\n        [max]=\"maxHour\"\r\n        [timeUnit]=\"timeUnit.HOUR\"\r\n        [disabled]=\"disabled\"\r\n        [isDefaultTimeSet]=\"isDefaultTime\"\r\n        (timeChanged)=\"changeHour($event)\"></ngx-timepicker-time-control>\r\n    <span class=\"ngx-timepicker__time-colon ngx-timepicker__control--second\">:</span>\r\n    <ngx-timepicker-time-control\r\n        class=\"ngx-timepicker__control--third\"\r\n        [placeholder]=\"'MM'\"\r\n        [time]=\"minute\"\r\n        [min]=\"0\"\r\n        [max]=\"59\"\r\n        [timeUnit]=\"timeUnit.MINUTE\"\r\n        [disabled]=\"disabled\"\r\n        [isDefaultTimeSet]=\"isDefaultTime\"\r\n        (timeChanged)=\"changeMinute($event)\"></ngx-timepicker-time-control>\r\n    <ngx-timepicker-period-selector\r\n        class=\"ngx-timepicker__control--forth\"\r\n        [selectedPeriod]=\"period$|async\"\r\n        [disabled]=\"disabled\"\r\n        (periodSelected)=\"changePeriod($event)\"\r\n        *ngIf=\"format !== 24\"></ngx-timepicker-period-selector>\r\n    <ngx-material-timepicker-toggle\r\n        class=\"ngx-timepicker__toggle\"\r\n        *ngIf=\"!controlOnly\"\r\n        [ngClass]=\"{'ngx-timepicker__toggle--left': buttonAlign === 'left'}\"\r\n        [for]=\"timepicker\"\r\n        [disabled]=\"disabled\">\r\n        <span ngxMaterialTimepickerToggleIcon>\r\n            <!--suppress HtmlUnknownAttribute -->\r\n            <ng-container *ngTemplateOutlet=\"toggleIcon || defaultIcon\"></ng-container>\r\n        </span>\r\n    </ngx-material-timepicker-toggle>\r\n</div>\r\n<ngx-material-timepicker\r\n    [trigger]=\"trigger\"\r\n    [ngxMaterialTimepickerTheme]=\"clockTheme\"\r\n    [defaultTime]=\"timepickerTime\"\r\n    [format]=\"format\"\r\n    [cancelBtnTmpl]=\"cancelBtnTmpl\"\r\n    [confirmBtnTmpl]=\"confirmBtnTmpl\"\r\n    (timeSet)=\"onTimeSet($event)\" #timepicker></ngx-material-timepicker>\r\n\r\n<ng-template #defaultIcon>\r\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24px\" height=\"24px\">\r\n        <!--suppress CheckEmptyScriptTag -->\r\n        <path\r\n            d=\"M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003                   6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z\"/>\r\n    </svg>\r\n</ng-template>\r\n",
                    providers: [
                        NgxMaterialTimepickerService,
                        {
                            provide: forms.NG_VALUE_ACCESSOR,
                            useExisting: i0.forwardRef(function () { return NgxTimepickerFieldComponent; }),
                            multi: true
                        }
                    ],
                    styles: [".ngx-timepicker{align-items:center;border-bottom:1px solid rgba(0,0,0,.12);display:flex;height:100%}.ngx-timepicker--disabled{background:rgba(0,0,0,.07);pointer-events:none}.ngx-timepicker__time-colon{margin-left:10px}.ngx-timepicker__control--first{order:1}.ngx-timepicker__control--second{order:2}.ngx-timepicker__control--third{order:3}.ngx-timepicker__control--forth,.ngx-timepicker__toggle{order:4}.ngx-timepicker__toggle--left{order:0}"]
                },] }
    ];
    NgxTimepickerFieldComponent.ctorParameters = function () { return [
        { type: NgxMaterialTimepickerService },
        { type: String, decorators: [{ type: i0.Inject, args: [TIME_LOCALE,] }] }
    ]; };
    NgxTimepickerFieldComponent.propDecorators = {
        disabled: [{ type: i0.Input }],
        toggleIcon: [{ type: i0.Input }],
        buttonAlign: [{ type: i0.Input }],
        clockTheme: [{ type: i0.Input }],
        controlOnly: [{ type: i0.Input }],
        cancelBtnTmpl: [{ type: i0.Input }],
        confirmBtnTmpl: [{ type: i0.Input }],
        format: [{ type: i0.Input }],
        defaultTime: [{ type: i0.Input }]
    };

    var NgxTimepickerTimeControlComponent = /** @class */ (function () {
        function NgxTimepickerTimeControlComponent(timeParser) {
            this.timeParser = timeParser;
            this.timeChanged = new i0.EventEmitter();
        }
        NgxTimepickerTimeControlComponent.prototype.ngOnInit = function () {
            if (this.isDefaultTimeSet) {
                this.time = new TimeFormatterPipe().transform(this.time, this.timeUnit);
            }
        };
        NgxTimepickerTimeControlComponent.prototype.ngOnChanges = function (changes) {
            var timeChanges = changes['time'];
            var isTimeNotProvided = timeChanges && timeChanges.isFirstChange() && !this.isDefaultTimeSet;
            if (isTimeNotProvided) {
                this.time = null;
            }
        };
        NgxTimepickerTimeControlComponent.prototype.onKeydown = function (event) {
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
        };
        NgxTimepickerTimeControlComponent.prototype.increase = function () {
            if (!this.disabled) {
                var nextTime = +this.time + 1;
                if (nextTime > this.max) {
                    nextTime = this.min;
                }
                this.timeChanged.emit(nextTime);
            }
        };
        NgxTimepickerTimeControlComponent.prototype.decrease = function () {
            if (!this.disabled) {
                var previousTime = +this.time - 1;
                if (previousTime < this.min) {
                    previousTime = this.max;
                }
                this.timeChanged.emit(previousTime);
            }
        };
        NgxTimepickerTimeControlComponent.prototype.onInput = function (input) {
            var value = parseInt(input.value, 10);
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
        };
        NgxTimepickerTimeControlComponent.prototype.onFocus = function () {
            this.isFocused = true;
        };
        NgxTimepickerTimeControlComponent.prototype.onBlur = function () {
            this.time = new TimeFormatterPipe().transform(this.time, this.timeUnit);
            this.isFocused = false;
        };
        NgxTimepickerTimeControlComponent.prototype.onModelChange = function (value) {
            this.time = +this.timeParser.transform(value, this.timeUnit);
        };
        return NgxTimepickerTimeControlComponent;
    }());
    NgxTimepickerTimeControlComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngx-timepicker-time-control',
                    template: "<div class=\"ngx-timepicker-control\" [ngClass]=\"{'ngx-timepicker-control--active': isFocused}\">\r\n    <!--suppress HtmlFormInputWithoutLabel -->\r\n    <input class=\"ngx-timepicker-control__input\"\r\n           maxlength=\"2\"\r\n           [ngModel]=\"time | timeParser: timeUnit | timeLocalizer: timeUnit\"\r\n           (ngModelChange)=\"onModelChange($event)\"\r\n           [placeholder]=\"placeholder\"\r\n           [disabled]=\"disabled\"\r\n           (keydown)=\"onKeydown($event)\"\r\n           (input)=\"onInput(inputElement)\"\r\n           (focus)=\"onFocus()\"\r\n           (blur)=\"onBlur()\" #inputElement>\r\n    <div class=\"ngx-timepicker-control__arrows\">\r\n            <span class=\"ngx-timepicker-control__arrow\" role=\"button\" (click)=\"increase()\">\r\n                &#9650;\r\n            </span>\r\n        <span class=\"ngx-timepicker-control__arrow\" role=\"button\" (click)=\"decrease()\">\r\n                &#9660;\r\n            </span>\r\n    </div>\r\n</div>\r\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    providers: [TimeParserPipe],
                    styles: [".ngx-timepicker-control{box-sizing:border-box;display:flex;height:30px;padding:0 5px;position:relative;width:60px}.ngx-timepicker-control--active:after{background-color:#00bfff;bottom:-2px;content:\"\";height:1px;left:0;position:absolute;width:100%}.ngx-timepicker-control__input{border:0;color:inherit;font-size:1rem;height:100%;outline:none;padding:0 5px 0 0;text-align:center;width:100%}.ngx-timepicker-control__input:disabled{background-color:transparent}.ngx-timepicker-control__arrows{display:flex;flex-direction:column;position:absolute;right:2px;top:0}.ngx-timepicker-control__arrow{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;color:rgba(0,0,0,.4);cursor:pointer;font-size:11px;transition:color .2s;user-select:none}.ngx-timepicker-control__arrow:hover{color:rgba(0,0,0,.9)}"]
                },] }
    ];
    NgxTimepickerTimeControlComponent.ctorParameters = function () { return [
        { type: TimeParserPipe }
    ]; };
    NgxTimepickerTimeControlComponent.propDecorators = {
        time: [{ type: i0.Input }],
        min: [{ type: i0.Input }],
        max: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        timeUnit: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        isDefaultTimeSet: [{ type: i0.Input }],
        timeChanged: [{ type: i0.Output }]
    };

    var NgxTimepickerPeriodSelectorComponent = /** @class */ (function () {
        function NgxTimepickerPeriodSelectorComponent(locale) {
            this.locale = locale;
            this.periodSelected = new i0.EventEmitter();
            this.period = TimePeriod;
            this.meridiems = luxon.Info.meridiems({ locale: this.locale });
        }
        Object.defineProperty(NgxTimepickerPeriodSelectorComponent.prototype, "selectedPeriod", {
            set: function (period) {
                if (period) {
                    var periods = [TimePeriod.AM, TimePeriod.PM];
                    this.localizedPeriod = this.meridiems[periods.indexOf(period)];
                }
            },
            enumerable: false,
            configurable: true
        });
        NgxTimepickerPeriodSelectorComponent.prototype.open = function () {
            if (!this.disabled) {
                this.isOpened = true;
            }
        };
        NgxTimepickerPeriodSelectorComponent.prototype.select = function (period) {
            this.periodSelected.next(period);
            this.isOpened = false;
        };
        NgxTimepickerPeriodSelectorComponent.prototype.backdropClick = function () {
            this.isOpened = false;
        };
        return NgxTimepickerPeriodSelectorComponent;
    }());
    NgxTimepickerPeriodSelectorComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngx-timepicker-period-selector',
                    template: "<div class=\"period\">\r\n    <div class=\"period-control\">\r\n        <button class=\"period-control__button period__btn--default\"\r\n                [ngClass]=\"{'period-control__button--disabled': disabled}\"\r\n                type=\"button\"\r\n                (click)=\"open()\">\r\n            <span>{{localizedPeriod}}</span>\r\n            <span class=\"period-control__arrow\">&#9660;</span>\r\n        </button>\r\n    </div>\r\n    <ul class=\"period-selector\" @scaleInOut *ngIf=\"isOpened\" [timepickerAutofocus]=\"true\">\r\n        <li>\r\n            <button class=\"period-selector__button period__btn--default\"\r\n                    type=\"button\"\r\n                    (click)=\"select(period.AM)\"\r\n                    [ngClass]=\"{'period-selector__button--active': localizedPeriod === meridiems[0]}\">{{meridiems[0]}}</button>\r\n        </li>\r\n        <li>\r\n            <button class=\"period-selector__button period__btn--default\"\r\n                    type=\"button\"\r\n                    (click)=\"select(period.PM)\"\r\n                    [ngClass]=\"{'period-selector__button--active': localizedPeriod === meridiems[1]}\">{{meridiems[1]}}</button>\r\n        </li>\r\n    </ul>\r\n</div>\r\n<div class=\"overlay\" (click)=\"backdropClick()\" *ngIf=\"isOpened\"></div>\r\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    animations: [
                        animations.trigger('scaleInOut', [
                            animations.transition(':enter', [
                                animations.style({ transform: 'scale(0)', opacity: 0 }),
                                animations.animate(200, animations.style({ transform: 'scale(1)', opacity: 1 }))
                            ]),
                            animations.transition(':leave', [
                                animations.animate(200, animations.style({ transform: 'scale(0)', opacity: 0 }))
                            ])
                        ])
                    ],
                    styles: [".period{position:relative}.period__btn--default{-moz-user-select:none;-ms-user-select:none;-webkit-tap-highlight-color:transparent;-webkit-user-select:none;background-color:transparent;border:none;cursor:pointer;outline:none;padding:0;text-align:left;user-select:none}.period-control{position:relative}.period-control__button{color:inherit;font-size:1rem;position:relative;text-align:center;width:60px}.period-control__button:not(.period-control__button--disabled):focus:after{background-color:#00bfff;bottom:-8px;content:\"\";height:1px;left:0;position:absolute;width:100%}.period-control__arrow{color:rgba(0,0,0,.4);font-size:12px;margin-left:10px}.period-selector{background-color:#f5f5f5;box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);list-style:none;margin:0;max-width:135px;padding:6px 0;position:absolute;right:calc(-50% + -50px);top:calc(50% - 50px);width:150px;z-index:201}.period-selector__button{height:48px;line-height:48px;padding:0 16px;width:100%}.period-selector__button--active{color:#00bfff}.period-selector__button:focus{background-color:#eee}.overlay{background-color:transparent;height:100%;left:0;position:fixed;top:0;width:100%;z-index:200}"]
                },] }
    ];
    NgxTimepickerPeriodSelectorComponent.ctorParameters = function () { return [
        { type: String, decorators: [{ type: i0.Inject, args: [TIME_LOCALE,] }] }
    ]; };
    NgxTimepickerPeriodSelectorComponent.propDecorators = {
        isOpened: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        selectedPeriod: [{ type: i0.Input }],
        periodSelected: [{ type: i0.Output }]
    };

    var TimeLocalizerPipe = /** @class */ (function () {
        function TimeLocalizerPipe(locale) {
            this.locale = locale;
        }
        TimeLocalizerPipe.prototype.transform = function (time, timeUnit) {
            if (time == null || time === '') {
                return '';
            }
            switch (timeUnit) {
                case TimeUnit.HOUR: {
                    var format = time === 0 ? 'HH' : 'H';
                    return this.formatTime('hour', time, format);
                }
                case TimeUnit.MINUTE:
                    return this.formatTime('minute', time, 'mm');
                default:
                    throw new Error("There is no Time Unit with type " + timeUnit);
            }
        };
        TimeLocalizerPipe.prototype.formatTime = function (timeMeasure, time, format) {
            var _b;
            try {
                return luxon.DateTime.fromObject((_b = {}, _b[timeMeasure] = +time, _b)).setLocale(this.locale).toFormat(format);
            }
            catch (_a) {
                throw new Error("Cannot format provided time - " + time + " to locale - " + this.locale);
            }
        };
        return TimeLocalizerPipe;
    }());
    TimeLocalizerPipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'timeLocalizer'
                },] }
    ];
    TimeLocalizerPipe.ctorParameters = function () { return [
        { type: String, decorators: [{ type: i0.Inject, args: [TIME_LOCALE,] }] }
    ]; };

    var ActiveHourPipe = /** @class */ (function () {
        function ActiveHourPipe() {
        }
        ActiveHourPipe.prototype.transform = function (hour, currentHour, isClockFaceDisabled) {
            if (hour == null || isClockFaceDisabled) {
                return false;
            }
            return hour === currentHour;
        };
        return ActiveHourPipe;
    }());
    ActiveHourPipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'activeHour'
                },] }
    ];

    var ActiveMinutePipe = /** @class */ (function () {
        function ActiveMinutePipe() {
        }
        ActiveMinutePipe.prototype.transform = function (minute, currentMinute, gap, isClockFaceDisabled) {
            if (minute == null || isClockFaceDisabled) {
                return false;
            }
            var defaultGap = 5;
            return ((currentMinute === minute) && (minute % (gap || defaultGap) === 0));
        };
        return ActiveMinutePipe;
    }());
    ActiveMinutePipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'activeMinute'
                },] }
    ];

    var AutofocusDirective = /** @class */ (function () {
        function AutofocusDirective(element, document) {
            this.element = element;
            this.document = document;
            this.activeElement = this.document.activeElement;
        }
        AutofocusDirective.prototype.ngOnChanges = function () {
            var _this = this;
            if (this.isFocusActive) {
                // To avoid ExpressionChangedAfterItHasBeenCheckedError;
                setTimeout(function () { return _this.element.nativeElement.focus({ preventScroll: true }); });
            }
        };
        AutofocusDirective.prototype.ngOnDestroy = function () {
            var _this = this;
            // To avoid ExpressionChangedAfterItHasBeenCheckedError;
            setTimeout(function () { return _this.activeElement.focus({ preventScroll: true }); });
        };
        return AutofocusDirective;
    }());
    AutofocusDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[timepickerAutofocus]'
                },] }
    ];
    AutofocusDirective.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: undefined, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [common.DOCUMENT,] }] }
    ]; };
    AutofocusDirective.propDecorators = {
        isFocusActive: [{ type: i0.Input, args: ['timepickerAutofocus',] }]
    };

    var ɵ0 = TimeAdapter.DEFAULT_LOCALE;
    var NgxMaterialTimepickerModule = /** @class */ (function () {
        function NgxMaterialTimepickerModule() {
        }
        NgxMaterialTimepickerModule.setLocale = function (locale) {
            return {
                ngModule: NgxMaterialTimepickerModule,
                providers: [
                    { provide: TIME_LOCALE, useValue: locale }
                ]
            };
        };
        return NgxMaterialTimepickerModule;
    }());
    NgxMaterialTimepickerModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        forms.FormsModule,
                        portal.PortalModule,
                        overlay.OverlayModule
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

    exports.NgxMaterialTimepickerComponent = NgxMaterialTimepickerComponent;
    exports.NgxMaterialTimepickerModule = NgxMaterialTimepickerModule;
    exports.NgxMaterialTimepickerThemeDirective = NgxMaterialTimepickerThemeDirective;
    exports.NgxMaterialTimepickerToggleIconDirective = NgxMaterialTimepickerToggleIconDirective;
    exports.NgxTimepickerFieldComponent = NgxTimepickerFieldComponent;
    exports.TimepickerDirective = TimepickerDirective;
    exports.ɵ0 = ɵ0;
    exports.ɵa = NgxMaterialTimepickerToggleComponent;
    exports.ɵb = NgxMaterialTimepickerService;
    exports.ɵc = TIME_LOCALE;
    exports.ɵd = AutofocusDirective;
    exports.ɵe = NgxMaterialTimepicker24HoursFaceComponent;
    exports.ɵf = NgxMaterialTimepickerHoursFace;
    exports.ɵg = NgxMaterialTimepicker12HoursFaceComponent;
    exports.ɵh = NgxMaterialTimepickerMinutesFaceComponent;
    exports.ɵi = NgxMaterialTimepickerFaceComponent;
    exports.ɵj = NgxMaterialTimepickerButtonComponent;
    exports.ɵk = NgxMaterialTimepickerDialComponent;
    exports.ɵl = NgxMaterialTimepickerDialControlComponent;
    exports.ɵm = TimeParserPipe;
    exports.ɵn = NgxMaterialTimepickerPeriodComponent;
    exports.ɵo = StyleSanitizerPipe;
    exports.ɵp = TimeFormatterPipe;
    exports.ɵq = MinutesFormatterPipe;
    exports.ɵr = NgxTimepickerTimeControlComponent;
    exports.ɵs = NgxTimepickerPeriodSelectorComponent;
    exports.ɵt = TimeLocalizerPipe;
    exports.ɵu = ActiveHourPipe;
    exports.ɵv = ActiveMinutePipe;
    exports.ɵx = NgxMaterialTimepickerContentComponent;
    exports.ɵy = TimeAdapter;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-material-timepicker.umd.js.map
