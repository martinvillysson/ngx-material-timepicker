import * as tslib_1 from "tslib";
import { Directive, ElementRef, forwardRef, HostListener, Inject, Input } from '@angular/core';
import { NgxMaterialTimepickerComponent } from '../ngx-material-timepicker.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TimeAdapter } from '../services/time-adapter';
import { TIME_LOCALE } from '../tokens/time-locale.token';
var VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line
    useExisting: forwardRef(function () { return TimepickerDirective; }),
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
        enumerable: true,
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
        enumerable: true,
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimepickerDirective.prototype, "timepicker", {
        set: function (picker) {
            this.registerTimepicker(picker);
        },
        enumerable: true,
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimepickerDirective.prototype, "defaultTime", {
        set: function (time) {
            this._timepicker.defaultTime = TimeAdapter.formatTime(time, { locale: this.locale, format: this.format });
        },
        enumerable: true,
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
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number),
        tslib_1.__metadata("design:paramtypes", [Number])
    ], TimepickerDirective.prototype, "format", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], TimepickerDirective.prototype, "min", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], TimepickerDirective.prototype, "max", null);
    tslib_1.__decorate([
        Input('ngxTimepicker'),
        tslib_1.__metadata("design:type", NgxMaterialTimepickerComponent),
        tslib_1.__metadata("design:paramtypes", [NgxMaterialTimepickerComponent])
    ], TimepickerDirective.prototype, "timepicker", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], TimepickerDirective.prototype, "value", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], TimepickerDirective.prototype, "disabled", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], TimepickerDirective.prototype, "disableClick", void 0);
    tslib_1.__decorate([
        HostListener('click', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TimepickerDirective.prototype, "onClick", null);
    TimepickerDirective = tslib_1.__decorate([
        Directive({
            selector: '[ngxTimepicker]',
            providers: [VALUE_ACCESSOR],
            host: {
                '[disabled]': 'disabled',
                '(input)': 'onInput($event.target.value)',
                '(blur)': 'onTouched()',
            },
        }),
        tslib_1.__param(1, Inject(TIME_LOCALE)),
        tslib_1.__metadata("design:paramtypes", [ElementRef, String])
    ], TimepickerDirective);
    return TimepickerDirective;
}());
export { TimepickerDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvZGlyZWN0aXZlcy9uZ3gtdGltZXBpY2tlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBdUMsTUFBTSxlQUFlLENBQUM7QUFDcEksT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdEYsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFMUQsSUFBTSxjQUFjLEdBQUc7SUFDbkIsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQiwyQkFBMkI7SUFDM0IsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsbUJBQW1CLEVBQW5CLENBQW1CLENBQUM7SUFDbEQsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBV0Y7SUF1R0ksNkJBQW1CLFVBQXNCLEVBQ0EsTUFBYztRQURwQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ0EsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQXRGL0MsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQXVFYixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBS1osNEJBQXVCLEdBQW1CLEVBQUUsQ0FBQztRQUdyRCxjQUFTLEdBQUc7UUFDWixDQUFDLENBQUE7UUFFTyxhQUFRLEdBQXlCO1FBQ3pDLENBQUMsQ0FBQTtJQUlELENBQUM7SUF0R0Qsc0JBQUksdUNBQU07YUFXVjtZQUNJLE9BQU8sSUFBSSxDQUFDLE9B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QU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdEO2dCQUM1RCx3RUFBd0UsQ0FBQyxDQUFDO1NBQ2pGO0lBQ0wsQ0FBQztJQUVPLDhDQUFnQixHQUF4QjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3JELENBQUM7SUF2S0Q7UUFEQyxLQUFLLEVBQUU7OztxREFVUDtJQVNEO1FBREMsS0FBSyxFQUFFOzs7a0RBT1A7SUFTRDtRQURDLEtBQUssRUFBRTs7O2tEQU9QO0lBU0Q7UUFEQyxLQUFLLENBQUMsZUFBZSxDQUFDOzBDQUNBLDhCQUE4QjtpREFBOUIsOEJBQThCO3lEQUVwRDtJQUtEO1FBREMsS0FBSyxFQUFFOzs7b0RBdUJQO0lBV1E7UUFBUixLQUFLLEVBQUU7O3lEQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTs7NkRBQXVCO0lBK0IvQjtRQURDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7OztzREFNakM7SUFoSVEsbUJBQW1CO1FBVC9CLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsU0FBUyxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQzNCLElBQUksRUFBRTtnQkFDRixZQUFZLEVBQUUsVUFBVTtnQkFDeEIsU0FBUyxFQUFFLDhCQUE4QjtnQkFDekMsUUFBUSxFQUFFLGFBQWE7YUFDMUI7U0FDSixDQUFDO1FBeUdlLG1CQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtpREFERCxVQUFVO09BdkdoQyxtQkFBbUIsQ0E0Sy9CO0lBQUQsMEJBQUM7Q0FBQSxBQTVLRCxJQTRLQztTQTVLWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIGZvcndhcmRSZWYsIEhvc3RMaXN0ZW5lciwgSW5qZWN0LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi4vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgVGltZUFkYXB0ZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy90aW1lLWFkYXB0ZXInO1xyXG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcclxuaW1wb3J0IHsgVElNRV9MT0NBTEUgfSBmcm9tICcuLi90b2tlbnMvdGltZS1sb2NhbGUudG9rZW4nO1xyXG5cclxuY29uc3QgVkFMVUVfQUNDRVNTT1IgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVGltZXBpY2tlckRpcmVjdGl2ZSksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1tuZ3hUaW1lcGlja2VyXScsXHJcbiAgICBwcm92aWRlcnM6IFtWQUxVRV9BQ0NFU1NPUl0sXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJ1tkaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxyXG4gICAgICAgICcoaW5wdXQpJzogJ29uSW5wdXQoJGV2ZW50LnRhcmdldC52YWx1ZSknLFxyXG4gICAgICAgICcoYmx1ciknOiAnb25Ub3VjaGVkKCknLFxyXG4gICAgfSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFRpbWVwaWNrZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgZm9ybWF0KHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9mb3JtYXQgPSB2YWx1ZSA9PT0gMjQgPyAyNCA6IDEyO1xyXG4gICAgICAgIGNvbnN0IGlzRHluYW1pY2FsbHlDaGFuZ2VkID0gdmFsdWUgJiYgKHRoaXMucHJldmlvdXNGb3JtYXQgJiYgdGhpcy5wcmV2aW91c0Zvcm1hdCAhPT0gdGhpcy5fZm9ybWF0KTtcclxuXHJcbiAgICAgICAgaWYgKGlzRHluYW1pY2FsbHlDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLl92YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fdGltZXBpY2tlci51cGRhdGVUaW1lKHRoaXMuX3ZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wcmV2aW91c0Zvcm1hdCA9IHRoaXMuX2Zvcm1hdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZm9ybWF0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1hdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9mb3JtYXQgPSAxMjtcclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IG1pbih2YWx1ZTogc3RyaW5nIHwgRGF0ZVRpbWUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLl9taW4gPSBUaW1lQWRhcHRlci5wYXJzZVRpbWUodmFsdWUsIHtsb2NhbGU6IHRoaXMubG9jYWxlLCBmb3JtYXQ6IHRoaXMuZm9ybWF0fSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbWluID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1pbigpOiBzdHJpbmcgfCBEYXRlVGltZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9taW46IHN0cmluZyB8IERhdGVUaW1lO1xyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgbWF4KHZhbHVlOiBzdHJpbmcgfCBEYXRlVGltZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21heCA9IFRpbWVBZGFwdGVyLnBhcnNlVGltZSh2YWx1ZSwge2xvY2FsZTogdGhpcy5sb2NhbGUsIGZvcm1hdDogdGhpcy5mb3JtYXR9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tYXggPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWF4KCk6IHN0cmluZyB8IERhdGVUaW1lIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWF4O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX21heDogc3RyaW5nIHwgRGF0ZVRpbWU7XHJcblxyXG4gICAgQElucHV0KCduZ3hUaW1lcGlja2VyJylcclxuICAgIHNldCB0aW1lcGlja2VyKHBpY2tlcjogTmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29tcG9uZW50KSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlclRpbWVwaWNrZXIocGlja2VyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF90aW1lcGlja2VyOiBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb21wb25lbnQ7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCB2YWx1ZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0VmFsdWUoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0aW1lID0gVGltZUFkYXB0ZXIuZm9ybWF0VGltZSh2YWx1ZSwge2xvY2FsZTogdGhpcy5sb2NhbGUsIGZvcm1hdDogdGhpcy5mb3JtYXR9KTtcclxuICAgICAgICBjb25zdCBpc0F2YWlsYWJsZSA9IFRpbWVBZGFwdGVyLmlzVGltZUF2YWlsYWJsZShcclxuICAgICAgICAgICAgdGltZSxcclxuICAgICAgICAgICAgPERhdGVUaW1lPnRoaXMuX21pbixcclxuICAgICAgICAgICAgPERhdGVUaW1lPnRoaXMuX21heCxcclxuICAgICAgICAgICAgJ21pbnV0ZXMnLFxyXG4gICAgICAgICAgICB0aGlzLl90aW1lcGlja2VyLm1pbnV0ZXNHYXAsXHJcbiAgICAgICAgICAgIHRoaXMuX2Zvcm1hdFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmIChpc0F2YWlsYWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRWYWx1ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUud2FybignU2VsZWN0ZWQgdGltZSBkb2VzblxcJ3QgbWF0Y2ggbWluIG9yIG1heCB2YWx1ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICghdGhpcy5fdmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gVGltZUFkYXB0ZXIudG9Mb2NhbGVUaW1lU3RyaW5nKHRoaXMuX3ZhbHVlLCB7Zm9ybWF0OiB0aGlzLmZvcm1hdCwgbG9jYWxlOiB0aGlzLmxvY2FsZX0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3ZhbHVlID0gJyc7XHJcblxyXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSBkaXNhYmxlQ2xpY2s6IGJvb2xlYW47XHJcblxyXG4gICAgcHJpdmF0ZSB0aW1lcGlja2VyU3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuICAgIHByaXZhdGUgcHJldmlvdXNGb3JtYXQ6IG51bWJlcjtcclxuXHJcbiAgICBvblRvdWNoZWQgPSAoKSA9PiB7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgICAgICAgICBASW5qZWN0KFRJTUVfTE9DQUxFKSBwcml2YXRlIGxvY2FsZTogc3RyaW5nKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXQgZGVmYXVsdFRpbWUodGltZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fdGltZXBpY2tlci5kZWZhdWx0VGltZSA9IFRpbWVBZGFwdGVyLmZvcm1hdFRpbWUodGltZSwge2xvY2FsZTogdGhpcy5sb2NhbGUsIGZvcm1hdDogdGhpcy5mb3JtYXR9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbklucHV0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgICAgIGlmIChjaGFuZ2VzWyd2YWx1ZSddICYmIGNoYW5nZXNbJ3ZhbHVlJ10uY3VycmVudFZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdFRpbWUgPSBjaGFuZ2VzWyd2YWx1ZSddLmN1cnJlbnRWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxyXG4gICAgb25DbGljayhldmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlQ2xpY2spIHtcclxuICAgICAgICAgICAgdGhpcy5fdGltZXBpY2tlci5vcGVuKCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0VGltZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnRpbWVwaWNrZXJTdWJzY3JpcHRpb25zLmZvckVhY2gocyA9PiBzLnVuc3Vic2NyaWJlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVnaXN0ZXJUaW1lcGlja2VyKHBpY2tlcjogTmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29tcG9uZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHBpY2tlcikge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lcGlja2VyID0gcGlja2VyO1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lcGlja2VyLnJlZ2lzdGVySW5wdXQodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMudGltZXBpY2tlclN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLl90aW1lcGlja2VyLnRpbWVTZXQuc3Vic2NyaWJlKCh0aW1lOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyU3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGltZXBpY2tlci5jbG9zZWQuc3Vic2NyaWJlKCgpID0+IHRoaXMuZGVmYXVsdFRpbWUgPSB0aGlzLl92YWx1ZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29tcG9uZW50IGlzIG5vdCBkZWZpbmVkLicgK1xyXG4gICAgICAgICAgICAgICAgJyBQbGVhc2UgbWFrZSBzdXJlIHlvdSBwYXNzZWQgdGhlIHRpbWVwaWNrZXIgdG8gbmd4VGltZXBpY2tlciBkaXJlY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVJbnB1dFZhbHVlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiJdfQ==