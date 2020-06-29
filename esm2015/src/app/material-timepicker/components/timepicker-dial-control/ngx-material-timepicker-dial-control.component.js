/* tslint:disable:triple-equals */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { isDigit } from '../../utils/timepicker.utils';
import { TimeParserPipe } from '../../pipes/time-parser.pipe';
export class NgxMaterialTimepickerDialControlComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC1jb250cm9sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9jb21wb25lbnRzL3RpbWVwaWNrZXItZGlhbC1jb250cm9sL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWRpYWwtY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsa0NBQWtDO0FBQ2xDLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHdkUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQVE5RCxNQUFNLE9BQU8seUNBQXlDO0lBZ0JsRCxZQUFvQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFMeEMsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBWSxDQUFDO1FBQy9DLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFDaEQsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDbkMsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7SUFHL0MsQ0FBQztJQUVELElBQVksWUFBWTtRQUNwQixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekQ7SUFDTCxDQUFDO0lBRUQseUJBQXlCLENBQUMsS0FBaUIsRUFBRSxJQUFjO1FBQ3ZELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FB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LENBQUMsSUFBWSxFQUFFLFFBQXlCO0lBQzlELE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEUsT0FBTyxDQUFDLFlBQVksSUFBSSxDQUFDLFlBQVksSUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDcEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlOnRyaXBsZS1lcXVhbHMgKi9cclxuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2xvY2tGYWNlVGltZSB9IGZyb20gJy4uLy4uL21vZGVscy9jbG9jay1mYWNlLXRpbWUuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgVGltZVVuaXQgfSBmcm9tICcuLi8uLi9tb2RlbHMvdGltZS11bml0LmVudW0nO1xyXG5pbXBvcnQgeyBpc0RpZ2l0IH0gZnJvbSAnLi4vLi4vdXRpbHMvdGltZXBpY2tlci51dGlscyc7XHJcbmltcG9ydCB7IFRpbWVQYXJzZXJQaXBlIH0gZnJvbSAnLi4vLi4vcGlwZXMvdGltZS1wYXJzZXIucGlwZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC1jb250cm9sJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC1jb250cm9sLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWyduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1kaWFsLWNvbnRyb2wuY29tcG9uZW50LnNjc3MnXSxcclxuICAgIHByb3ZpZGVyczogW1RpbWVQYXJzZXJQaXBlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxUaW1lcGlja2VyRGlhbENvbnRyb2xDb21wb25lbnQge1xyXG5cclxuICAgIHByZXZpb3VzVGltZTogbnVtYmVyIHwgc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIHRpbWVMaXN0OiBDbG9ja0ZhY2VUaW1lW107XHJcbiAgICBASW5wdXQoKSB0aW1lVW5pdDogVGltZVVuaXQ7XHJcbiAgICBASW5wdXQoKSB0aW1lOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBpc0FjdGl2ZTogYm9vbGVhbjtcclxuICAgIEBJbnB1dCgpIGlzRWRpdGFibGU6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSBtaW51dGVzR2FwOiBudW1iZXI7XHJcblxyXG4gICAgQE91dHB1dCgpIHRpbWVVbml0Q2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VGltZVVuaXQ+KCk7XHJcbiAgICBAT3V0cHV0KCkgdGltZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPENsb2NrRmFjZVRpbWU+KCk7XHJcbiAgICBAT3V0cHV0KCkgZm9jdXNlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcclxuICAgIEBPdXRwdXQoKSB1bmZvY3VzZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bGw+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0aW1lUGFyc2VyUGlwZTogVGltZVBhcnNlclBpcGUpIHtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldCBzZWxlY3RlZFRpbWUoKTogQ2xvY2tGYWNlVGltZSB7XHJcbiAgICAgICAgaWYgKCEhdGhpcy50aW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRpbWVMaXN0LmZpbmQodCA9PiB0LnRpbWUgPT09ICt0aGlzLnRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzYXZlVGltZUFuZENoYW5nZVRpbWVVbml0KGV2ZW50OiBGb2N1c0V2ZW50LCB1bml0OiBUaW1lVW5pdCk6IHZvaWQge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdGhpcy5wcmV2aW91c1RpbWUgPSB0aGlzLnRpbWU7XHJcbiAgICAgICAgdGhpcy50aW1lVW5pdENoYW5nZWQubmV4dCh1bml0KTtcclxuICAgICAgICB0aGlzLmZvY3VzZWQubmV4dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVRpbWUoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdGltZSA9IHRoaXMuc2VsZWN0ZWRUaW1lO1xyXG4gICAgICAgIGlmICh0aW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZUNoYW5nZWQubmV4dCh0aW1lKTtcclxuICAgICAgICAgICAgdGhpcy5wcmV2aW91c1RpbWUgPSB0aW1lLnRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uS2V5RG93bihlOiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgY2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS5rZXlDb2RlKTtcclxuXHJcblxyXG4gICAgICAgIGlmICgoIWlzRGlnaXQoZSkpIHx8IGlzVGltZURpc2FibGVkVG9DaGFuZ2UodGhpcy50aW1lLCBjaGFyLCB0aGlzLnRpbWVMaXN0KSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNEaWdpdChlKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRpbWVCeUFycm93KGUua2V5Q29kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTW9kZWxDaGFuZ2UodmFsdWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGltZSA9IHRoaXMudGltZVBhcnNlclBpcGUudHJhbnNmb3JtKHZhbHVlLCB0aGlzLnRpbWVVbml0KS50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hhbmdlVGltZUJ5QXJyb3coa2V5Q29kZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgQVJST1dfVVAgPSAzODtcclxuICAgICAgICBjb25zdCBBUlJPV19ET1dOID0gNDA7XHJcbiAgICAgICAgbGV0IHRpbWU6IHN0cmluZztcclxuXHJcbiAgICAgICAgaWYgKGtleUNvZGUgPT09IEFSUk9XX1VQKSB7XHJcbiAgICAgICAgICAgIHRpbWUgPSBTdHJpbmcoK3RoaXMudGltZSArICh0aGlzLm1pbnV0ZXNHYXAgfHwgMSkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gQVJST1dfRE9XTikge1xyXG4gICAgICAgICAgICB0aW1lID0gU3RyaW5nKCt0aGlzLnRpbWUgLSAodGhpcy5taW51dGVzR2FwIHx8IDEpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghaXNUaW1lVW5hdmFpbGFibGUodGltZSwgdGhpcy50aW1lTGlzdCkpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lID0gdGltZTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVUaW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gaXNUaW1lRGlzYWJsZWRUb0NoYW5nZShjdXJyZW50VGltZTogc3RyaW5nLCBuZXh0VGltZTogc3RyaW5nLCB0aW1lTGlzdDogQ2xvY2tGYWNlVGltZVtdKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBpc051bWJlciA9IC9cXGQvLnRlc3QobmV4dFRpbWUpO1xyXG5cclxuICAgIGlmIChpc051bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHRpbWUgPSBjdXJyZW50VGltZSArIG5leHRUaW1lO1xyXG4gICAgICAgIHJldHVybiBpc1RpbWVVbmF2YWlsYWJsZSh0aW1lLCB0aW1lTGlzdCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzVGltZVVuYXZhaWxhYmxlKHRpbWU6IHN0cmluZywgdGltZUxpc3Q6IENsb2NrRmFjZVRpbWVbXSk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRUaW1lID0gdGltZUxpc3QuZmluZCh2YWx1ZSA9PiB2YWx1ZS50aW1lID09PSArdGltZSk7XHJcbiAgICByZXR1cm4gIXNlbGVjdGVkVGltZSB8fCAoc2VsZWN0ZWRUaW1lICYmIHNlbGVjdGVkVGltZS5kaXNhYmxlZCk7XHJcbn1cclxuIl19