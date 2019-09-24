import * as tslib_1 from "tslib";
import { Component, forwardRef, Inject, Input, TemplateRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxMaterialTimepickerService } from '../../services/ngx-material-timepicker.service';
import { Subject } from 'rxjs';
import { getHours, getMinutes } from '../../utils/timepicker-time.utils';
import { TimeUnit } from '../../models/time-unit.enum';
import { takeUntil } from 'rxjs/operators';
import { TimeAdapter } from '../../services/time-adapter';
import { TIME_LOCALE } from '../../tokens/time-locale.token';
var NgxTimepickerFieldComponent = /** @class */ (function () {
    function NgxTimepickerFieldComponent(timepickerService, locale) {
        this.timepickerService = timepickerService;
        this.locale = locale;
        this.minHour = 1;
        this.maxHour = 12;
        this.timeUnit = TimeUnit;
        this.buttonAlign = 'right';
        this._format = 12;
        this.unsubscribe$ = new Subject();
        this.onChange = function () {
        };
    }
    NgxTimepickerFieldComponent_1 = NgxTimepickerFieldComponent;
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
        enumerable: true,
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
        enumerable: true,
        configurable: true
    });
    NgxTimepickerFieldComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.period$ = this.timepickerService.selectedPeriod;
        this.timepickerService.selectedHour.pipe(takeUntil(this.unsubscribe$))
            .subscribe(function (hour) { return _this.hour = hour.time; });
        this.timepickerService.selectedMinute.pipe(takeUntil(this.unsubscribe$))
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
    var NgxTimepickerFieldComponent_1;
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
                    useExisting: forwardRef(function () { return NgxTimepickerFieldComponent_1; }),
                    multi: true
                }
            ],
            styles: [".ngx-timepicker{display:flex;align-items:center;height:100%;border-bottom:1px solid rgba(0,0,0,.12)}.ngx-timepicker--disabled{background:rgba(0,0,0,.07);pointer-events:none}.ngx-timepicker__time-colon{margin-left:10px}.ngx-timepicker__control--first{order:1}.ngx-timepicker__control--second{order:2}.ngx-timepicker__control--third{order:3}.ngx-timepicker__control--forth,.ngx-timepicker__toggle{order:4}.ngx-timepicker__toggle--left{order:0}"]
        }),
        tslib_1.__param(1, Inject(TIME_LOCALE)),
        tslib_1.__metadata("design:paramtypes", [NgxMaterialTimepickerService, String])
    ], NgxTimepickerFieldComponent);
    return NgxTimepickerFieldComponent;
}());
export { NgxTimepickerFieldComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXItZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvY29tcG9uZW50cy90aW1lcGlja2VyLWZpZWxkL25neC10aW1lcGlja2VyLWZpZWxkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBcUIsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JHLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUM5RixPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDekUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXZELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBZTdEO0lBa0VJLHFDQUFvQixpQkFBK0MsRUFDMUIsTUFBYztRQURuQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQThCO1FBQzFCLFdBQU0sR0FBTixNQUFNLENBQVE7UUE1RHZELFlBQU8sR0FBRyxDQUFDLENBQUM7UUFDWixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWIsYUFBUSxHQUFHLFFBQVEsQ0FBQztRQU1YLGdCQUFXLEdBQXFCLE9BQU8sQ0FBQztRQXVDekMsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQU1iLGlC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QkFBNEI7T0FsRTFELDJCQUEyQixDQW1JdkM7SUFBRCxrQ0FBQztDQUFBLEFBbklELElBbUlDO1NBbklZLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgZm9yd2FyZFJlZiwgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgTmd4TWF0ZXJpYWxUaW1lcGlja2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25neC1tYXRlcmlhbC10aW1lcGlja2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IENsb2NrRmFjZVRpbWUgfSBmcm9tICcuLi8uLi9tb2RlbHMvY2xvY2stZmFjZS10aW1lLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFRpbWVQZXJpb2QgfSBmcm9tICcuLi8uLi9tb2RlbHMvdGltZS1wZXJpb2QuZW51bSc7XHJcbmltcG9ydCB7IGdldEhvdXJzLCBnZXRNaW51dGVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvdGltZXBpY2tlci10aW1lLnV0aWxzJztcclxuaW1wb3J0IHsgVGltZVVuaXQgfSBmcm9tICcuLi8uLi9tb2RlbHMvdGltZS11bml0LmVudW0nO1xyXG5pbXBvcnQgeyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZSB9IGZyb20gJy4uLy4uL21vZGVscy9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci10aGVtZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFRpbWVBZGFwdGVyIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdGltZS1hZGFwdGVyJztcclxuaW1wb3J0IHsgVElNRV9MT0NBTEUgfSBmcm9tICcuLi8uLi90b2tlbnMvdGltZS1sb2NhbGUudG9rZW4nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25neC10aW1lcGlja2VyLWZpZWxkJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9uZ3gtdGltZXBpY2tlci1maWVsZC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9uZ3gtdGltZXBpY2tlci1maWVsZC5jb21wb25lbnQuc2NzcyddLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgTmd4TWF0ZXJpYWxUaW1lcGlja2VyU2VydmljZSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ3hUaW1lcGlja2VyRmllbGRDb21wb25lbnQpLFxyXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5neFRpbWVwaWNrZXJGaWVsZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcblxyXG4gICAgcGVyaW9kJDogT2JzZXJ2YWJsZTxUaW1lUGVyaW9kPjtcclxuXHJcbiAgICBob3VyOiBudW1iZXI7XHJcbiAgICBtaW51dGU6IG51bWJlcjtcclxuXHJcbiAgICBtaW5Ib3VyID0gMTtcclxuICAgIG1heEhvdXIgPSAxMjtcclxuXHJcbiAgICB0aW1lVW5pdCA9IFRpbWVVbml0O1xyXG4gICAgdGltZXBpY2tlclRpbWU6IHN0cmluZztcclxuICAgIGlzRGVmYXVsdFRpbWU6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSB0b2dnbGVJY29uOiBUZW1wbGF0ZVJlZjxIVE1MT2JqZWN0RWxlbWVudD47XHJcbiAgICBASW5wdXQoKSBidXR0b25BbGlnbjogJ3JpZ2h0JyB8ICdsZWZ0JyA9ICdyaWdodCc7XHJcbiAgICBASW5wdXQoKSBjbG9ja1RoZW1lOiBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZTtcclxuICAgIEBJbnB1dCgpIGNvbnRyb2xPbmx5OiBib29sZWFuO1xyXG4gICAgQElucHV0KCkgY2FuY2VsQnRuVG1wbDogVGVtcGxhdGVSZWY8Tm9kZT47XHJcbiAgICBASW5wdXQoKSBjb25maXJtQnRuVG1wbDogVGVtcGxhdGVSZWY8Tm9kZT47XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBmb3JtYXQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2Zvcm1hdCA9IHZhbHVlID09PSAyNCA/IDI0IDogMTI7XHJcbiAgICAgICAgdGhpcy5taW5Ib3VyID0gdGhpcy5fZm9ybWF0ID09PSAxMiA/IDEgOiAwO1xyXG4gICAgICAgIHRoaXMubWF4SG91ciA9IHRoaXMuX2Zvcm1hdCA9PT0gMTIgPyAxMiA6IDIzO1xyXG4gICAgICAgIHRoaXMuaG91cnNMaXN0ID0gZ2V0SG91cnModGhpcy5fZm9ybWF0KTtcclxuICAgICAgICBjb25zdCBpc0R5bmFtaWNhbGx5Q2hhbmdlZCA9IHZhbHVlICYmICh0aGlzLnByZXZpb3VzRm9ybWF0ICYmIHRoaXMucHJldmlvdXNGb3JtYXQgIT09IHRoaXMuX2Zvcm1hdCk7XHJcblxyXG4gICAgICAgIGlmIChpc0R5bmFtaWNhbGx5Q2hhbmdlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRUaW1lID0gdGhpcy50aW1lcGlja2VyVGltZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wcmV2aW91c0Zvcm1hdCA9IHRoaXMuX2Zvcm1hdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZm9ybWF0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1hdDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBkZWZhdWx0VGltZSh2YWw6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHRpbWUgPSBUaW1lQWRhcHRlci5mb3JtYXRUaW1lKHZhbCwge2xvY2FsZTogdGhpcy5sb2NhbGUsIGZvcm1hdDogdGhpcy5fZm9ybWF0fSk7XHJcbiAgICAgICAgdGhpcy50aW1lcGlja2VyU2VydmljZS5zZXREZWZhdWx0VGltZUlmQXZhaWxhYmxlKHRpbWUsIG51bGwsIG51bGwsIHRoaXMuX2Zvcm1hdCk7XHJcbiAgICAgICAgdGhpcy5fZGVmYXVsdFRpbWUgPSB0aW1lO1xyXG4gICAgICAgIHRoaXMudGltZXBpY2tlclRpbWUgPSB0aW1lO1xyXG4gICAgICAgIHRoaXMuaXNEZWZhdWx0VGltZSA9ICEhdGltZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGVmYXVsdFRpbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdFRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZGVmYXVsdFRpbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2Zvcm1hdCA9IDEyO1xyXG4gICAgcHJpdmF0ZSBwcmV2aW91c0Zvcm1hdDogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgaG91cnNMaXN0OiBDbG9ja0ZhY2VUaW1lW107XHJcbiAgICBwcml2YXRlIG1pbnV0ZXNMaXN0OiBDbG9ja0ZhY2VUaW1lW107XHJcblxyXG4gICAgcHJpdmF0ZSB1bnN1YnNjcmliZSQgPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICAgIHByaXZhdGUgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkID0gKCkgPT4ge1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdGltZXBpY2tlclNlcnZpY2U6IE5neE1hdGVyaWFsVGltZXBpY2tlclNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBASW5qZWN0KFRJTUVfTE9DQUxFKSBwcml2YXRlIGxvY2FsZTogc3RyaW5nKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5wZXJpb2QkID0gdGhpcy50aW1lcGlja2VyU2VydmljZS5zZWxlY3RlZFBlcmlvZDtcclxuXHJcbiAgICAgICAgdGhpcy50aW1lcGlja2VyU2VydmljZS5zZWxlY3RlZEhvdXIucGlwZSh0YWtlVW50aWwodGhpcy51bnN1YnNjcmliZSQpKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGhvdXIgPT4gdGhpcy5ob3VyID0gaG91ci50aW1lKTtcclxuXHJcbiAgICAgICAgdGhpcy50aW1lcGlja2VyU2VydmljZS5zZWxlY3RlZE1pbnV0ZS5waXBlKHRha2VVbnRpbCh0aGlzLnVuc3Vic2NyaWJlJCkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUobWludXRlID0+IHRoaXMubWludXRlID0gbWludXRlLnRpbWUpO1xyXG5cclxuICAgICAgICB0aGlzLmhvdXJzTGlzdCA9IGdldEhvdXJzKHRoaXMuX2Zvcm1hdCk7XHJcbiAgICAgICAgdGhpcy5taW51dGVzTGlzdCA9IGdldE1pbnV0ZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICB3cml0ZVZhbHVlKHZhbDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHZhbCkge1xyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRUaW1lID0gdmFsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZUhvdXIoaG91cjogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50aW1lcGlja2VyU2VydmljZS5ob3VyID0gdGhpcy5ob3Vyc0xpc3QuZmluZChoID0+IGgudGltZSA9PT0gaG91cik7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VUaW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlTWludXRlKG1pbnV0ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50aW1lcGlja2VyU2VydmljZS5taW51dGUgPSB0aGlzLm1pbnV0ZXNMaXN0LmZpbmQobSA9PiBtLnRpbWUgPT09IG1pbnV0ZSk7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VUaW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlUGVyaW9kKHBlcmlvZDogVGltZVBlcmlvZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGltZXBpY2tlclNlcnZpY2UucGVyaW9kID0gcGVyaW9kO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlVGltZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVGltZVNldCh0aW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBsb2NhbGVUaW1lID0gVGltZUFkYXB0ZXIudG9Mb2NhbGVUaW1lU3RyaW5nKHRpbWUsIHtmb3JtYXQ6IHRoaXMuZm9ybWF0LCBsb2NhbGU6IHRoaXMubG9jYWxlfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZGVmYXVsdFRpbWUgPSB0aW1lO1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UobG9jYWxlVGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZSQubmV4dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hhbmdlVGltZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB0aW1lID0gdGhpcy50aW1lcGlja2VyU2VydmljZS5nZXRGdWxsVGltZSh0aGlzLl9mb3JtYXQpO1xyXG4gICAgICAgIHRoaXMudGltZXBpY2tlclRpbWUgPSB0aW1lO1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UodGltZSk7XHJcbiAgICB9XHJcbn1cclxuIl19