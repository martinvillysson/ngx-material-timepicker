import { Directive, ElementRef, forwardRef, HostListener, Inject, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TimeAdapter } from '../services/time-adapter';
import { TIME_LOCALE } from '../tokens/time-locale.token';
const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line
    useExisting: forwardRef(() => TimepickerDirective),
    multi: true
};
export class TimepickerDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2RpcmVjdGl2ZXMvbmd4LXRpbWVwaWNrZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBdUMsTUFBTSxlQUFlLENBQUM7QUFFcEksT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFMUQsTUFBTSxjQUFjLEdBQUc7SUFDbkIsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQiwyQkFBMkI7SUFDM0IsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztJQUNsRCxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFXRixNQUFNLE9BQU8sbUJBQW1CO0lBdUc1QixZQUFtQixVQUFzQixFQUNBLE1BQWM7UUFEcEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNBLFdBQU0sR0FBTixNQUFNLENBQVE7UUF0Ri9DLFlBQU8sR0FBRyxFQUFFLENBQUM7UUF1RWIsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUtaLDRCQUF1QixHQUFtQixFQUFFLENBQUM7UUFHckQsY0FBUyxHQUFHLEdBQUcsRUFBRTtRQUNqQixDQUFDLENBQUE7UUFFTyxhQUFRLEdBQXlCLEdBQUcsRUFBRTtRQUM5QyxDQUFDLENBQUE7SUFJRCxDQUFDO0lBdkdELElBQ0ksTUFBTSxDQUFDLEtBQWE7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLEtBQUssRUFBRSxDQUFD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QUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsU0FBUyxFQUFFLENBQUMsY0FBYyxDQUFDO2dCQUMzQixJQUFJLEVBQUU7b0JBQ0YsWUFBWSxFQUFFLFVBQVU7b0JBQ3hCLFNBQVMsRUFBRSw4QkFBOEI7b0JBQ3pDLFFBQVEsRUFBRSxhQUFhO2lCQUMxQjthQUNKOzs7WUF2Qm1CLFVBQVU7eUNBZ0liLE1BQU0sU0FBQyxXQUFXOzs7cUJBdEc5QixLQUFLO2tCQWtCTCxLQUFLO2tCQWVMLEtBQUs7eUJBZUwsS0FBSyxTQUFDLGVBQWU7b0JBT3JCLEtBQUs7dUJBa0NMLEtBQUs7MkJBQ0wsS0FBSztzQkE4QkwsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgZm9yd2FyZFJlZiwgSG9zdExpc3RlbmVyLCBJbmplY3QsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb21wb25lbnQgfSBmcm9tICcuLi9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBUaW1lQWRhcHRlciB9IGZyb20gJy4uL3NlcnZpY2VzL3RpbWUtYWRhcHRlcic7XHJcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nO1xyXG5pbXBvcnQgeyBUSU1FX0xPQ0FMRSB9IGZyb20gJy4uL3Rva2Vucy90aW1lLWxvY2FsZS50b2tlbic7XHJcblxyXG5jb25zdCBWQUxVRV9BQ0NFU1NPUiA9IHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUaW1lcGlja2VyRGlyZWN0aXZlKSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW25neFRpbWVwaWNrZXJdJyxcclxuICAgIHByb3ZpZGVyczogW1ZBTFVFX0FDQ0VTU09SXSxcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICAnW2Rpc2FibGVkXSc6ICdkaXNhYmxlZCcsXHJcbiAgICAgICAgJyhpbnB1dCknOiAnb25JbnB1dCgkZXZlbnQudGFyZ2V0LnZhbHVlKScsXHJcbiAgICAgICAgJyhibHVyKSc6ICdvblRvdWNoZWQoKScsXHJcbiAgICB9LFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGltZXBpY2tlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBmb3JtYXQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2Zvcm1hdCA9IHZhbHVlID09PSAyNCA/IDI0IDogMTI7XHJcbiAgICAgICAgY29uc3QgaXNEeW5hbWljYWxseUNoYW5nZWQgPSB2YWx1ZSAmJiAodGhpcy5wcmV2aW91c0Zvcm1hdCAmJiB0aGlzLnByZXZpb3VzRm9ybWF0ICE9PSB0aGlzLl9mb3JtYXQpO1xyXG5cclxuICAgICAgICBpZiAoaXNEeW5hbWljYWxseUNoYW5nZWQpIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lcGlja2VyLnVwZGF0ZVRpbWUodGhpcy5fdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByZXZpb3VzRm9ybWF0ID0gdGhpcy5fZm9ybWF0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBmb3JtYXQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZm9ybWF0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2Zvcm1hdCA9IDEyO1xyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgbWluKHZhbHVlOiBzdHJpbmcgfCBEYXRlVGltZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21pbiA9IFRpbWVBZGFwdGVyLnBhcnNlVGltZSh2YWx1ZSwge2xvY2FsZTogdGhpcy5sb2NhbGUsIGZvcm1hdDogdGhpcy5mb3JtYXR9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9taW4gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWluKCk6IHN0cmluZyB8IERhdGVUaW1lIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWluO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX21pbjogc3RyaW5nIHwgRGF0ZVRpbWU7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBtYXgodmFsdWU6IHN0cmluZyB8IERhdGVUaW1lKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWF4ID0gVGltZUFkYXB0ZXIucGFyc2VUaW1lKHZhbHVlLCB7bG9jYWxlOiB0aGlzLmxvY2FsZSwgZm9ybWF0OiB0aGlzLmZvcm1hdH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21heCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtYXgoKTogc3RyaW5nIHwgRGF0ZVRpbWUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbWF4OiBzdHJpbmcgfCBEYXRlVGltZTtcclxuXHJcbiAgICBASW5wdXQoJ25neFRpbWVwaWNrZXInKVxyXG4gICAgc2V0IHRpbWVwaWNrZXIocGlja2VyOiBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb21wb25lbnQpIHtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyVGltZXBpY2tlcihwaWNrZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3RpbWVwaWNrZXI6IE5neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudDtcclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRWYWx1ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHRpbWUgPSBUaW1lQWRhcHRlci5mb3JtYXRUaW1lKHZhbHVlLCB7bG9jYWxlOiB0aGlzLmxvY2FsZSwgZm9ybWF0OiB0aGlzLmZvcm1hdH0pO1xyXG4gICAgICAgIGNvbnN0IGlzQXZhaWxhYmxlID0gVGltZUFkYXB0ZXIuaXNUaW1lQXZhaWxhYmxlKFxyXG4gICAgICAgICAgICB0aW1lLFxyXG4gICAgICAgICAgICA8RGF0ZVRpbWU+dGhpcy5fbWluLFxyXG4gICAgICAgICAgICA8RGF0ZVRpbWU+dGhpcy5fbWF4LFxyXG4gICAgICAgICAgICAnbWludXRlcycsXHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVwaWNrZXIubWludXRlc0dhcCxcclxuICAgICAgICAgICAgdGhpcy5fZm9ybWF0XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKGlzQXZhaWxhYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gdGltZTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVJbnB1dFZhbHVlKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdTZWxlY3RlZCB0aW1lIGRvZXNuXFwndCBtYXRjaCBtaW4gb3IgbWF4IHZhbHVlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl92YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBUaW1lQWRhcHRlci50b0xvY2FsZVRpbWVTdHJpbmcodGhpcy5fdmFsdWUsIHtmb3JtYXQ6IHRoaXMuZm9ybWF0LCBsb2NhbGU6IHRoaXMubG9jYWxlfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdmFsdWUgPSAnJztcclxuXHJcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcclxuICAgIEBJbnB1dCgpIGRpc2FibGVDbGljazogYm9vbGVhbjtcclxuXHJcbiAgICBwcml2YXRlIHRpbWVwaWNrZXJTdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBwcmV2aW91c0Zvcm1hdDogbnVtYmVyO1xyXG5cclxuICAgIG9uVG91Y2hlZCA9ICgpID0+IHtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgICAgICAgICAgICAgIEBJbmplY3QoVElNRV9MT0NBTEUpIHByaXZhdGUgbG9jYWxlOiBzdHJpbmcpIHtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldCBkZWZhdWx0VGltZSh0aW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl90aW1lcGlja2VyLmRlZmF1bHRUaW1lID0gVGltZUFkYXB0ZXIuZm9ybWF0VGltZSh0aW1lLCB7bG9jYWxlOiB0aGlzLmxvY2FsZSwgZm9ybWF0OiB0aGlzLmZvcm1hdH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSW5wdXQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ3ZhbHVlJ10gJiYgY2hhbmdlc1sndmFsdWUnXS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0VGltZSA9IGNoYW5nZXNbJ3ZhbHVlJ10uY3VycmVudFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXHJcbiAgICBvbkNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVDbGljaykge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lcGlja2VyLm9wZW4oKTtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmRlZmF1bHRUaW1lID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMudGltZXBpY2tlclN1YnNjcmlwdGlvbnMuZm9yRWFjaChzID0+IHMudW5zdWJzY3JpYmUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWdpc3RlclRpbWVwaWNrZXIocGlja2VyOiBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb21wb25lbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAocGlja2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVwaWNrZXIgPSBwaWNrZXI7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVwaWNrZXIucmVnaXN0ZXJJbnB1dCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyU3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuX3RpbWVwaWNrZXIudGltZVNldC5zdWJzY3JpYmUoKHRpbWU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRpbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXJTdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgICAgICAgICAgICB0aGlzLl90aW1lcGlja2VyLmNsb3NlZC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kZWZhdWx0VGltZSA9IHRoaXMuX3ZhbHVlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb21wb25lbnQgaXMgbm90IGRlZmluZWQuJyArXHJcbiAgICAgICAgICAgICAgICAnIFBsZWFzZSBtYWtlIHN1cmUgeW91IHBhc3NlZCB0aGUgdGltZXBpY2tlciB0byBuZ3hUaW1lcGlja2VyIGRpcmVjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZUlucHV0VmFsdWUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIl19