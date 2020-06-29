import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { isDigit } from '../../../utils/timepicker.utils';
import { TimeFormatterPipe } from '../../../pipes/time-formatter.pipe';
import { TimeParserPipe } from '../../../pipes/time-parser.pipe';
export class NgxTimepickerTimeControlComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXItdGltZS1jb250cm9sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9jb21wb25lbnRzL3RpbWVwaWNrZXItZmllbGQvdGltZXBpY2tlci10aW1lLWNvbnRyb2wvbmd4LXRpbWVwaWNrZXItdGltZS1jb250cm9sLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDbEksT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzFELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRXZFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQVVqRSxNQUFNLE9BQU8saUNBQWlDO0lBYzFDLFlBQW9CLFVBQTBCO1FBQTFCLGVBQVUsR0FBVixVQUFVLENBQWdCO1FBSnBDLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUtuRCxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMzRTtJQUNMLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDOUIsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLE1BQU0saUJBQWlCLEdBQUcsV0FBVyxJQUFJLFdBQVcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0Is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LE1BQU07Z0JBQy9DLFNBQVMsRUFBRSxDQUFDLGNBQWMsQ0FBQzs7YUFDOUI7OztZQVJRLGNBQWM7OzttQkFZbEIsS0FBSztrQkFDTCxLQUFLO2tCQUNMLEtBQUs7MEJBQ0wsS0FBSzt1QkFDTCxLQUFLO3VCQUNMLEtBQUs7K0JBQ0wsS0FBSzswQkFFTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBpc0RpZ2l0IH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvdGltZXBpY2tlci51dGlscyc7XHJcbmltcG9ydCB7IFRpbWVGb3JtYXR0ZXJQaXBlIH0gZnJvbSAnLi4vLi4vLi4vcGlwZXMvdGltZS1mb3JtYXR0ZXIucGlwZSc7XHJcbmltcG9ydCB7IFRpbWVVbml0IH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzL3RpbWUtdW5pdC5lbnVtJztcclxuaW1wb3J0IHsgVGltZVBhcnNlclBpcGUgfSBmcm9tICcuLi8uLi8uLi9waXBlcy90aW1lLXBhcnNlci5waXBlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICduZ3gtdGltZXBpY2tlci10aW1lLWNvbnRyb2wnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL25neC10aW1lcGlja2VyLXRpbWUtY29udHJvbC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9uZ3gtdGltZXBpY2tlci10aW1lLWNvbnRyb2wuY29tcG9uZW50LnNjc3MnXSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gICAgcHJvdmlkZXJzOiBbVGltZVBhcnNlclBpcGVdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTmd4VGltZXBpY2tlclRpbWVDb250cm9sQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG5cclxuICAgIEBJbnB1dCgpIHRpbWU6IG51bWJlcjtcclxuICAgIEBJbnB1dCgpIG1pbjogbnVtYmVyO1xyXG4gICAgQElucHV0KCkgbWF4OiBudW1iZXI7XHJcbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgdGltZVVuaXQ6IFRpbWVVbml0O1xyXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSBpc0RlZmF1bHRUaW1lU2V0OiBib29sZWFuO1xyXG5cclxuICAgIEBPdXRwdXQoKSB0aW1lQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xyXG5cclxuICAgIGlzRm9jdXNlZDogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRpbWVQYXJzZXI6IFRpbWVQYXJzZXJQaXBlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNEZWZhdWx0VGltZVNldCkge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWUgPSBuZXcgVGltZUZvcm1hdHRlclBpcGUoKS50cmFuc2Zvcm0odGhpcy50aW1lLCB0aGlzLnRpbWVVbml0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHRpbWVDaGFuZ2VzID0gY2hhbmdlc1sndGltZSddO1xyXG4gICAgICAgIGNvbnN0IGlzVGltZU5vdFByb3ZpZGVkID0gdGltZUNoYW5nZXMgJiYgdGltZUNoYW5nZXMuaXNGaXJzdENoYW5nZSgpICYmICF0aGlzLmlzRGVmYXVsdFRpbWVTZXQ7XHJcblxyXG4gICAgICAgIGlmIChpc1RpbWVOb3RQcm92aWRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIWlzRGlnaXQoZXZlbnQpKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xyXG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5jcmVhc2UoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWNyZWFzZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluY3JlYXNlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICBsZXQgbmV4dFRpbWUgPSArdGhpcy50aW1lICsgMTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuZXh0VGltZSA+IHRoaXMubWF4KSB7XHJcbiAgICAgICAgICAgICAgICBuZXh0VGltZSA9IHRoaXMubWluO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRpbWVDaGFuZ2VkLmVtaXQobmV4dFRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZWNyZWFzZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgbGV0IHByZXZpb3VzVGltZSA9ICt0aGlzLnRpbWUgLSAxO1xyXG5cclxuICAgICAgICAgICAgaWYgKHByZXZpb3VzVGltZSA8IHRoaXMubWluKSB7XHJcbiAgICAgICAgICAgICAgICBwcmV2aW91c1RpbWUgPSB0aGlzLm1heDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy50aW1lQ2hhbmdlZC5lbWl0KHByZXZpb3VzVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uSW5wdXQoaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHBhcnNlSW50KGlucHV0LnZhbHVlLCAxMCk7XHJcblxyXG4gICAgICAgIGlmICghaXNOYU4odmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZSA9IHZhbHVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudGltZSA+IHRoaXMubWF4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWUgPSArU3RyaW5nKHZhbHVlKVswXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudGltZSA8IHRoaXMubWluKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLm1pbjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBTdHJpbmcodGhpcy50aW1lKTtcclxuICAgICAgICAgICAgdGhpcy50aW1lQ2hhbmdlZC5lbWl0KHRoaXMudGltZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkZvY3VzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNGb2N1c2VkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkJsdXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50aW1lID0gbmV3IFRpbWVGb3JtYXR0ZXJQaXBlKCkudHJhbnNmb3JtKHRoaXMudGltZSwgdGhpcy50aW1lVW5pdCk7XHJcbiAgICAgICAgdGhpcy5pc0ZvY3VzZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbk1vZGVsQ2hhbmdlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRpbWUgPSArdGhpcy50aW1lUGFyc2VyLnRyYW5zZm9ybSh2YWx1ZSwgdGhpcy50aW1lVW5pdCk7XHJcbiAgICB9XHJcbn1cclxuIl19