import * as tslib_1 from "tslib";
import { Directive, ElementRef, forwardRef, HostListener, Inject, Input } from '@angular/core';
import { NgxMaterialTimepickerComponent } from '../ngx-material-timepicker.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TimeAdapter } from '../services/time-adapter';
import { TIME_LOCALE } from '../tokens/time-locale.token';
const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line
    useExisting: forwardRef(() => TimepickerDirective),
    multi: true
};
let TimepickerDirective = class TimepickerDirective {
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
export { TimepickerDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvZGlyZWN0aXZlcy9uZ3gtdGltZXBpY2tlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBdUMsTUFBTSxlQUFlLENBQUM7QUFDcEksT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdEYsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFMUQsTUFBTSxjQUFjLEdBQUc7SUFDbkIsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQiwyQkFBMkI7SUFDM0IsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztJQUNsRCxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFXRixJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQXVHNUIsWUFBbUIsVUFBc0IsRUFDQSxNQUFjO1FBRHBDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDQSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBdEYvQyxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBdUViLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFLWiw0QkFBdUIsR0FBbUIsRUFBRSxDQUFDO1FBR3JELGNBQVMsR0FBRyxHQUFHLEVBQUU7UUFDakIsQ0FBQyxDQUFBO1FBRU8sYUFBUSxHQUF5QixHQUFHLEVBQUU7UUFDOUMsQ0FBQyxDQUFBO0lBSUQsQ0FBQztJ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VUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNyRCxDQUFDO0NBRUosQ0FBQTtBQXpLRztJQURDLEtBQUssRUFBRTs7O2lEQVVQO0FBU0Q7SUFEQyxLQUFLLEVBQUU7Ozs4Q0FPUDtBQVNEO0lBREMsS0FBSyxFQUFFOzs7OENBT1A7QUFTRDtJQURDLEtBQUssQ0FBQyxlQUFlLENBQUM7c0NBQ0EsOEJBQThCOzZDQUE5Qiw4QkFBOEI7cURBRXBEO0FBS0Q7SUFEQyxLQUFLLEVBQUU7OztnREF1QlA7QUFXUTtJQUFSLEtBQUssRUFBRTs7cURBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFOzt5REFBdUI7QUErQi9CO0lBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7O2tEQU1qQztBQWhJUSxtQkFBbUI7SUFUL0IsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixTQUFTLEVBQUUsQ0FBQyxjQUFjLENBQUM7UUFDM0IsSUFBSSxFQUFFO1lBQ0YsWUFBWSxFQUFFLFVBQVU7WUFDeEIsU0FBUyxFQUFFLDhCQUE4QjtZQUN6QyxRQUFRLEVBQUUsYUFBYTtTQUMxQjtLQUNKLENBQUM7SUF5R2UsbUJBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBOzZDQURELFVBQVU7R0F2R2hDLG1CQUFtQixDQTRLL0I7U0E1S1ksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmLCBIb3N0TGlzdGVuZXIsIEluamVjdCwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4uL25neC1tYXRlcmlhbC10aW1lcGlja2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFRpbWVBZGFwdGVyIH0gZnJvbSAnLi4vc2VydmljZXMvdGltZS1hZGFwdGVyJztcclxuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XHJcbmltcG9ydCB7IFRJTUVfTE9DQUxFIH0gZnJvbSAnLi4vdG9rZW5zL3RpbWUtbG9jYWxlLnRva2VuJztcclxuXHJcbmNvbnN0IFZBTFVFX0FDQ0VTU09SID0ge1xyXG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFRpbWVwaWNrZXJEaXJlY3RpdmUpLFxyXG4gICAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbbmd4VGltZXBpY2tlcl0nLFxyXG4gICAgcHJvdmlkZXJzOiBbVkFMVUVfQUNDRVNTT1JdLFxyXG4gICAgaG9zdDoge1xyXG4gICAgICAgICdbZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcclxuICAgICAgICAnKGlucHV0KSc6ICdvbklucHV0KCRldmVudC50YXJnZXQudmFsdWUpJyxcclxuICAgICAgICAnKGJsdXIpJzogJ29uVG91Y2hlZCgpJyxcclxuICAgIH0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUaW1lcGlja2VyRGlyZWN0aXZlIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IGZvcm1hdCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fZm9ybWF0ID0gdmFsdWUgPT09IDI0ID8gMjQgOiAxMjtcclxuICAgICAgICBjb25zdCBpc0R5bmFtaWNhbGx5Q2hhbmdlZCA9IHZhbHVlICYmICh0aGlzLnByZXZpb3VzRm9ybWF0ICYmIHRoaXMucHJldmlvdXNGb3JtYXQgIT09IHRoaXMuX2Zvcm1hdCk7XHJcblxyXG4gICAgICAgIGlmIChpc0R5bmFtaWNhbGx5Q2hhbmdlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5fdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVwaWNrZXIudXBkYXRlVGltZSh0aGlzLl92YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJldmlvdXNGb3JtYXQgPSB0aGlzLl9mb3JtYXQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGZvcm1hdCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mb3JtYXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZm9ybWF0ID0gMTI7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBtaW4odmFsdWU6IHN0cmluZyB8IERhdGVUaW1lKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWluID0gVGltZUFkYXB0ZXIucGFyc2VUaW1lKHZhbHVlLCB7bG9jYWxlOiB0aGlzLmxvY2FsZSwgZm9ybWF0OiB0aGlzLmZvcm1hdH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21pbiA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtaW4oKTogc3RyaW5nIHwgRGF0ZVRpbWUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9taW47XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbWluOiBzdHJpbmcgfCBEYXRlVGltZTtcclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IG1heCh2YWx1ZTogc3RyaW5nIHwgRGF0ZVRpbWUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXggPSBUaW1lQWRhcHRlci5wYXJzZVRpbWUodmFsdWUsIHtsb2NhbGU6IHRoaXMubG9jYWxlLCBmb3JtYXQ6IHRoaXMuZm9ybWF0fSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbWF4ID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1heCgpOiBzdHJpbmcgfCBEYXRlVGltZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9tYXg6IHN0cmluZyB8IERhdGVUaW1lO1xyXG5cclxuICAgIEBJbnB1dCgnbmd4VGltZXBpY2tlcicpXHJcbiAgICBzZXQgdGltZXBpY2tlcihwaWNrZXI6IE5neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudCkge1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJUaW1lcGlja2VyKHBpY2tlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdGltZXBpY2tlcjogTmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29tcG9uZW50O1xyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgdmFsdWUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSAnJztcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVJbnB1dFZhbHVlKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdGltZSA9IFRpbWVBZGFwdGVyLmZvcm1hdFRpbWUodmFsdWUsIHtsb2NhbGU6IHRoaXMubG9jYWxlLCBmb3JtYXQ6IHRoaXMuZm9ybWF0fSk7XHJcbiAgICAgICAgY29uc3QgaXNBdmFpbGFibGUgPSBUaW1lQWRhcHRlci5pc1RpbWVBdmFpbGFibGUoXHJcbiAgICAgICAgICAgIHRpbWUsXHJcbiAgICAgICAgICAgIDxEYXRlVGltZT50aGlzLl9taW4sXHJcbiAgICAgICAgICAgIDxEYXRlVGltZT50aGlzLl9tYXgsXHJcbiAgICAgICAgICAgICdtaW51dGVzJyxcclxuICAgICAgICAgICAgdGhpcy5fdGltZXBpY2tlci5taW51dGVzR2FwLFxyXG4gICAgICAgICAgICB0aGlzLl9mb3JtYXRcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBpZiAoaXNBdmFpbGFibGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSB0aW1lO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0VmFsdWUoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLndhcm4oJ1NlbGVjdGVkIHRpbWUgZG9lc25cXCd0IG1hdGNoIG1pbiBvciBtYXggdmFsdWUnKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmFsdWUoKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3ZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFRpbWVBZGFwdGVyLnRvTG9jYWxlVGltZVN0cmluZyh0aGlzLl92YWx1ZSwge2Zvcm1hdDogdGhpcy5mb3JtYXQsIGxvY2FsZTogdGhpcy5sb2NhbGV9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF92YWx1ZSA9ICcnO1xyXG5cclxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xyXG4gICAgQElucHV0KCkgZGlzYWJsZUNsaWNrOiBib29sZWFuO1xyXG5cclxuICAgIHByaXZhdGUgdGltZXBpY2tlclN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcbiAgICBwcml2YXRlIHByZXZpb3VzRm9ybWF0OiBudW1iZXI7XHJcblxyXG4gICAgb25Ub3VjaGVkID0gKCkgPT4ge1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxyXG4gICAgICAgICAgICAgICAgQEluamVjdChUSU1FX0xPQ0FMRSkgcHJpdmF0ZSBsb2NhbGU6IHN0cmluZykge1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0IGRlZmF1bHRUaW1lKHRpbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX3RpbWVwaWNrZXIuZGVmYXVsdFRpbWUgPSBUaW1lQWRhcHRlci5mb3JtYXRUaW1lKHRpbWUsIHtsb2NhbGU6IHRoaXMubG9jYWxlLCBmb3JtYXQ6IHRoaXMuZm9ybWF0fSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25JbnB1dCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgICAgICBpZiAoY2hhbmdlc1sndmFsdWUnXSAmJiBjaGFuZ2VzWyd2YWx1ZSddLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRUaW1lID0gY2hhbmdlc1sndmFsdWUnXS5jdXJyZW50VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcclxuICAgIG9uQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZUNsaWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVwaWNrZXIub3BlbigpO1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdFRpbWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy50aW1lcGlja2VyU3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZ2lzdGVyVGltZXBpY2tlcihwaWNrZXI6IE5neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChwaWNrZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGltZXBpY2tlciA9IHBpY2tlcjtcclxuICAgICAgICAgICAgdGhpcy5fdGltZXBpY2tlci5yZWdpc3RlcklucHV0KHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXJTdWJzY3JpcHRpb25zLnB1c2godGhpcy5fdGltZXBpY2tlci50aW1lU2V0LnN1YnNjcmliZSgodGltZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGltZTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHRoaXMudGltZXBpY2tlclN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RpbWVwaWNrZXIuY2xvc2VkLnN1YnNjcmliZSgoKSA9PiB0aGlzLmRlZmF1bHRUaW1lID0gdGhpcy5fdmFsdWUpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudCBpcyBub3QgZGVmaW5lZC4nICtcclxuICAgICAgICAgICAgICAgICcgUGxlYXNlIG1ha2Ugc3VyZSB5b3UgcGFzc2VkIHRoZSB0aW1lcGlja2VyIHRvIG5neFRpbWVwaWNrZXIgZGlyZWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlSW5wdXRWYWx1ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iXX0=