import * as tslib_1 from "tslib";
var NgxTimepickerFieldComponent_1;
import { Component, forwardRef, Inject, Input, TemplateRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxMaterialTimepickerService } from '../../services/ngx-material-timepicker.service';
import { Subject } from 'rxjs';
import { getHours, getMinutes } from '../../utils/timepicker-time.utils';
import { TimeUnit } from '../../models/time-unit.enum';
import { takeUntil } from 'rxjs/operators';
import { TimeAdapter } from '../../services/time-adapter';
import { TIME_LOCALE } from '../../tokens/time-locale.token';
let NgxTimepickerFieldComponent = NgxTimepickerFieldComponent_1 = class NgxTimepickerFieldComponent {
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
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], NgxTimepickerFieldComponent.prototype, "disabled", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], NgxTimepickerFieldComponent.prototype, "toggleIcon", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], NgxTimepickerFieldComponent.prototype, "buttonAlign", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], NgxTimepickerFieldComponent.prototype, "clockTheme", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], NgxTimepickerFieldComponent.prototype, "controlOnly", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], NgxTimepickerFieldComponent.prototype, "cancelBtnTmpl", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], NgxTimepickerFieldComponent.prototype, "confirmBtnTmpl", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number),
    tslib_1.__metadata("design:paramtypes", [Number])
], NgxTimepickerFieldComponent.prototype, "format", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], NgxTimepickerFieldComponent.prototype, "defaultTime", null);
NgxTimepickerFieldComponent = NgxTimepickerFieldComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'ngx-timepicker-field',
        template: "<div class=\"ngx-timepicker\" [ngClass]=\"{'ngx-timepicker--disabled': disabled}\" #trigger>\r\n    <ngx-timepicker-time-control\r\n        class=\"ngx-timepicker__control--first\"\r\n        [placeholder]=\"'HH'\"\r\n        [time]=\"hour\"\r\n        [min]=\"minHour\"\r\n        [max]=\"maxHour\"\r\n        [timeUnit]=\"timeUnit.HOUR\"\r\n        [disabled]=\"disabled\"\r\n        [isDefaultTimeSet]=\"isDefaultTime\"\r\n        (timeChanged)=\"changeHour($event)\"></ngx-timepicker-time-control>\r\n    <span class=\"ngx-timepicker__time-colon ngx-timepicker__control--second\">:</span>\r\n    <ngx-timepicker-time-control\r\n        class=\"ngx-timepicker__control--third\"\r\n        [placeholder]=\"'MM'\"\r\n        [time]=\"minute\"\r\n        [min]=\"0\"\r\n        [max]=\"59\"\r\n        [timeUnit]=\"timeUnit.MINUTE\"\r\n        [disabled]=\"disabled\"\r\n        [isDefaultTimeSet]=\"isDefaultTime\"\r\n        (timeChanged)=\"changeMinute($event)\"></ngx-timepicker-time-control>\r\n    <ngx-timepicker-period-selector\r\n        class=\"ngx-timepicker__control--forth\"\r\n        [selectedPeriod]=\"period$|async\"\r\n        [disabled]=\"disabled\"\r\n        (periodSelected)=\"changePeriod($event)\"\r\n        *ngIf=\"format !== 24\"></ngx-timepicker-period-selector>\r\n    <ngx-material-timepicker-toggle\r\n        class=\"ngx-timepicker__toggle\"\r\n        *ngIf=\"!controlOnly\"\r\n        [ngClass]=\"{'ngx-timepicker__toggle--left': buttonAlign === 'left'}\"\r\n        [for]=\"timepicker\"\r\n        [disabled]=\"disabled\">\r\n        <span ngxMaterialTimepickerToggleIcon>\r\n            <!--suppress HtmlUnknownAttribute -->\r\n            <ng-container *ngTemplateOutlet=\"toggleIcon || defaultIcon\"></ng-container>\r\n        </span>\r\n    </ngx-material-timepicker-toggle>\r\n</div>\r\n<ngx-material-timepicker\r\n    [trigger]=\"trigger\"\r\n    [ngxMaterialTimepickerTheme]=\"clockTheme\"\r\n    [defaultTime]=\"timepickerTime\"\r\n    [format]=\"format\"\r\n    [cancelBtnTmpl]=\"cancelBtnTmpl\"\r\n    [confirmBtnTmpl]=\"confirmBtnTmpl\"\r\n    (timeSet)=\"onTimeSet($event)\" #timepicker></ngx-material-timepicker>\r\n\r\n<ng-template #defaultIcon>\r\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24px\" height=\"24px\">\r\n        <!--suppress CheckEmptyScriptTag -->\r\n        <path\r\n            d=\"M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003                   6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z\"/>\r\n    </svg>\r\n</ng-template>\r\n",
        providers: [
            NgxMaterialTimepickerService,
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => NgxTimepickerFieldComponent_1),
                multi: true
            }
        ],
        styles: [".ngx-timepicker{display:flex;align-items:center;height:100%;border-bottom:1px solid rgba(0,0,0,.12)}.ngx-timepicker--disabled{background:rgba(0,0,0,.07);pointer-events:none}.ngx-timepicker__time-colon{margin-left:10px}.ngx-timepicker__control--first{order:1}.ngx-timepicker__control--second{order:2}.ngx-timepicker__control--third{order:3}.ngx-timepicker__control--forth,.ngx-timepicker__toggle{order:4}.ngx-timepicker__toggle--left{order:0}"]
    }),
    tslib_1.__param(1, Inject(TIME_LOCALE)),
    tslib_1.__metadata("design:paramtypes", [NgxMaterialTimepickerService, String])
], NgxTimepickerFieldComponent);
export { NgxTimepickerFieldComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXItZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvY29tcG9uZW50cy90aW1lcGlja2VyLWZpZWxkL25neC10aW1lcGlja2VyLWZpZWxkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQXFCLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRyxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDOUYsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUczQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzFELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQWU3RCxJQUFhLDJCQUEyQixtQ0FBeEMsTUFBYSwyQkFBMkI7SUFrRXBDLFlBQW9CLGlCQUErQyxFQUMxQixNQUFjO1FBRG5DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBOEI7UUFDMUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQTVEdkQsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFFYixhQUFRLEdBQUcsUUFBUSxDQUFDO1FBTVgsZ0JBQVcsR0FBcUIsT0FBTyxDQUFDO1FB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c3Ryb3ksIE9uSW5pdCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQ2xvY2tGYWNlVGltZSB9IGZyb20gJy4uLy4uL21vZGVscy9jbG9jay1mYWNlLXRpbWUuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgVGltZVBlcmlvZCB9IGZyb20gJy4uLy4uL21vZGVscy90aW1lLXBlcmlvZC5lbnVtJztcclxuaW1wb3J0IHsgZ2V0SG91cnMsIGdldE1pbnV0ZXMgfSBmcm9tICcuLi8uLi91dGlscy90aW1lcGlja2VyLXRpbWUudXRpbHMnO1xyXG5pbXBvcnQgeyBUaW1lVW5pdCB9IGZyb20gJy4uLy4uL21vZGVscy90aW1lLXVuaXQuZW51bSc7XHJcbmltcG9ydCB7IE5neE1hdGVyaWFsVGltZXBpY2tlclRoZW1lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL25neC1tYXRlcmlhbC10aW1lcGlja2VyLXRoZW1lLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgVGltZUFkYXB0ZXIgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90aW1lLWFkYXB0ZXInO1xyXG5pbXBvcnQgeyBUSU1FX0xPQ0FMRSB9IGZyb20gJy4uLy4uL3Rva2Vucy90aW1lLWxvY2FsZS50b2tlbic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbmd4LXRpbWVwaWNrZXItZmllbGQnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL25neC10aW1lcGlja2VyLWZpZWxkLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL25neC10aW1lcGlja2VyLWZpZWxkLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJTZXJ2aWNlLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neFRpbWVwaWNrZXJGaWVsZENvbXBvbmVudCksXHJcbiAgICAgICAgICAgIG11bHRpOiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4VGltZXBpY2tlckZpZWxkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuXHJcbiAgICBwZXJpb2QkOiBPYnNlcnZhYmxlPFRpbWVQZXJpb2Q+O1xyXG5cclxuICAgIGhvdXI6IG51bWJlcjtcclxuICAgIG1pbnV0ZTogbnVtYmVyO1xyXG5cclxuICAgIG1pbkhvdXIgPSAxO1xyXG4gICAgbWF4SG91ciA9IDEyO1xyXG5cclxuICAgIHRpbWVVbml0ID0gVGltZVVuaXQ7XHJcbiAgICB0aW1lcGlja2VyVGltZTogc3RyaW5nO1xyXG4gICAgaXNEZWZhdWx0VGltZTogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcclxuICAgIEBJbnB1dCgpIHRvZ2dsZUljb246IFRlbXBsYXRlUmVmPEhUTUxPYmplY3RFbGVtZW50PjtcclxuICAgIEBJbnB1dCgpIGJ1dHRvbkFsaWduOiAncmlnaHQnIHwgJ2xlZnQnID0gJ3JpZ2h0JztcclxuICAgIEBJbnB1dCgpIGNsb2NrVGhlbWU6IE5neE1hdGVyaWFsVGltZXBpY2tlclRoZW1lO1xyXG4gICAgQElucHV0KCkgY29udHJvbE9ubHk6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSBjYW5jZWxCdG5UbXBsOiBUZW1wbGF0ZVJlZjxOb2RlPjtcclxuICAgIEBJbnB1dCgpIGNvbmZpcm1CdG5UbXBsOiBUZW1wbGF0ZVJlZjxOb2RlPjtcclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IGZvcm1hdCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fZm9ybWF0ID0gdmFsdWUgPT09IDI0ID8gMjQgOiAxMjtcclxuICAgICAgICB0aGlzLm1pbkhvdXIgPSB0aGlzLl9mb3JtYXQgPT09IDEyID8gMSA6IDA7XHJcbiAgICAgICAgdGhpcy5tYXhIb3VyID0gdGhpcy5fZm9ybWF0ID09PSAxMiA/IDEyIDogMjM7XHJcbiAgICAgICAgdGhpcy5ob3Vyc0xpc3QgPSBnZXRIb3Vycyh0aGlzLl9mb3JtYXQpO1xyXG4gICAgICAgIGNvbnN0IGlzRHluYW1pY2FsbHlDaGFuZ2VkID0gdmFsdWUgJiYgKHRoaXMucHJldmlvdXNGb3JtYXQgJiYgdGhpcy5wcmV2aW91c0Zvcm1hdCAhPT0gdGhpcy5fZm9ybWF0KTtcclxuXHJcbiAgICAgICAgaWYgKGlzRHluYW1pY2FsbHlDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdFRpbWUgPSB0aGlzLnRpbWVwaWNrZXJUaW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByZXZpb3VzRm9ybWF0ID0gdGhpcy5fZm9ybWF0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBmb3JtYXQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZm9ybWF0O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IGRlZmF1bHRUaW1lKHZhbDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgdGltZSA9IFRpbWVBZGFwdGVyLmZvcm1hdFRpbWUodmFsLCB7bG9jYWxlOiB0aGlzLmxvY2FsZSwgZm9ybWF0OiB0aGlzLl9mb3JtYXR9KTtcclxuICAgICAgICB0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLnNldERlZmF1bHRUaW1lSWZBdmFpbGFibGUodGltZSwgbnVsbCwgbnVsbCwgdGhpcy5fZm9ybWF0KTtcclxuICAgICAgICB0aGlzLl9kZWZhdWx0VGltZSA9IHRpbWU7XHJcbiAgICAgICAgdGhpcy50aW1lcGlja2VyVGltZSA9IHRpbWU7XHJcbiAgICAgICAgdGhpcy5pc0RlZmF1bHRUaW1lID0gISF0aW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBkZWZhdWx0VGltZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0VGltZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9kZWZhdWx0VGltZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfZm9ybWF0ID0gMTI7XHJcbiAgICBwcml2YXRlIHByZXZpb3VzRm9ybWF0OiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBob3Vyc0xpc3Q6IENsb2NrRmFjZVRpbWVbXTtcclxuICAgIHByaXZhdGUgbWludXRlc0xpc3Q6IENsb2NrRmFjZVRpbWVbXTtcclxuXHJcbiAgICBwcml2YXRlIHVuc3Vic2NyaWJlJCA9IG5ldyBTdWJqZWN0KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQgPSAoKSA9PiB7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0aW1lcGlja2VyU2VydmljZTogTmd4TWF0ZXJpYWxUaW1lcGlja2VyU2VydmljZSxcclxuICAgICAgICAgICAgICAgIEBJbmplY3QoVElNRV9MT0NBTEUpIHByaXZhdGUgbG9jYWxlOiBzdHJpbmcpIHtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnBlcmlvZCQgPSB0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLnNlbGVjdGVkUGVyaW9kO1xyXG5cclxuICAgICAgICB0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLnNlbGVjdGVkSG91ci5waXBlKHRha2VVbnRpbCh0aGlzLnVuc3Vic2NyaWJlJCkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoaG91ciA9PiB0aGlzLmhvdXIgPSBob3VyLnRpbWUpO1xyXG5cclxuICAgICAgICB0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLnNlbGVjdGVkTWludXRlLnBpcGUodGFrZVVudGlsKHRoaXMudW5zdWJzY3JpYmUkKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShtaW51dGUgPT4gdGhpcy5taW51dGUgPSBtaW51dGUudGltZSk7XHJcblxyXG4gICAgICAgIHRoaXMuaG91cnNMaXN0ID0gZ2V0SG91cnModGhpcy5fZm9ybWF0KTtcclxuICAgICAgICB0aGlzLm1pbnV0ZXNMaXN0ID0gZ2V0TWludXRlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHdyaXRlVmFsdWUodmFsOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAodmFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdFRpbWUgPSB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlSG91cihob3VyOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLmhvdXIgPSB0aGlzLmhvdXJzTGlzdC5maW5kKGggPT4gaC50aW1lID09PSBob3VyKTtcclxuICAgICAgICB0aGlzLmNoYW5nZVRpbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VNaW51dGUobWludXRlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLm1pbnV0ZSA9IHRoaXMubWludXRlc0xpc3QuZmluZChtID0+IG0udGltZSA9PT0gbWludXRlKTtcclxuICAgICAgICB0aGlzLmNoYW5nZVRpbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VQZXJpb2QocGVyaW9kOiBUaW1lUGVyaW9kKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50aW1lcGlja2VyU2VydmljZS5wZXJpb2QgPSBwZXJpb2Q7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VUaW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25UaW1lU2V0KHRpbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGxvY2FsZVRpbWUgPSBUaW1lQWRhcHRlci50b0xvY2FsZVRpbWVTdHJpbmcodGltZSwge2Zvcm1hdDogdGhpcy5mb3JtYXQsIGxvY2FsZTogdGhpcy5sb2NhbGV9KTtcclxuXHJcbiAgICAgICAgdGhpcy5kZWZhdWx0VGltZSA9IHRpbWU7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZShsb2NhbGVUaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlJC5uZXh0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGFuZ2VUaW1lKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHRpbWUgPSB0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLmdldEZ1bGxUaW1lKHRoaXMuX2Zvcm1hdCk7XHJcbiAgICAgICAgdGhpcy50aW1lcGlja2VyVGltZSA9IHRpbWU7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh0aW1lKTtcclxuICAgIH1cclxufVxyXG4iXX0=