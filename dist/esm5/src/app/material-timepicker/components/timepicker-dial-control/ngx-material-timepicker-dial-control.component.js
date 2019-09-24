import * as tslib_1 from "tslib";
/* tslint:disable:triple-equals */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeUnit } from '../../models/time-unit.enum';
import { isDigit } from '../../utils/timepicker.utils';
import { TimeParserPipe } from '../../pipes/time-parser.pipe';
var NgxMaterialTimepickerDialControlComponent = /** @class */ (function () {
    function NgxMaterialTimepickerDialControlComponent(timeParserPipe) {
        this.timeParserPipe = timeParserPipe;
        this.timeUnitChanged = new EventEmitter();
        this.timeChanged = new EventEmitter();
        this.focused = new EventEmitter();
        this.unfocused = new EventEmitter();
    }
    Object.defineProperty(NgxMaterialTimepickerDialControlComponent.prototype, "selectedTime", {
        get: function () {
            var _this = this;
            if (!!this.time) {
                return this.timeList.find(function (t) { return t.time === +_this.time; });
            }
        },
        enumerable: true,
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
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], NgxMaterialTimepickerDialControlComponent.prototype, "timeList", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], NgxMaterialTimepickerDialControlComponent.prototype, "timeUnit", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], NgxMaterialTimepickerDialControlComponent.prototype, "time", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], NgxMaterialTimepickerDialControlComponent.prototype, "isActive", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], NgxMaterialTimepickerDialControlComponent.prototype, "isEditable", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], NgxMaterialTimepickerDialControlComponent.prototype, "minutesGap", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], NgxMaterialTimepickerDialControlComponent.prototype, "timeUnitChanged", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], NgxMaterialTimepickerDialControlComponent.prototype, "timeChanged", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], NgxMaterialTimepickerDialControlComponent.prototype, "focused", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], NgxMaterialTimepickerDialControlComponent.prototype, "unfocused", void 0);
    NgxMaterialTimepickerDialControlComponent = tslib_1.__decorate([
        Component({
            selector: 'ngx-material-timepicker-dial-control',
            template: "<!--suppress HtmlFormInputWithoutLabel, HtmlUnknownAttribute -->\r\n<input class=\"timepicker-dial__control timepicker-dial__item\"\r\n       [ngClass]=\"{'timepicker-dial__item_active': isActive}\"\r\n       [ngModel]=\"time | timeLocalizer: timeUnit\"\r\n       (ngModelChange)=\"time = $event\"\r\n       (input)=\"updateTime()\" (focus)=\"saveTimeAndChangeTimeUnit($event, timeUnit)\"\r\n       readonly [timepickerAutofocus]=\"isActive\" (keydown)=\"onKeyDown($event)\"\r\n       *ngIf=\"!isEditable;else editableTemplate\">\r\n\r\n<ng-template #editableTemplate>\r\n    <!--suppress HtmlFormInputWithoutLabel, HtmlUnknownAttribute -->\r\n    <input class=\"timepicker-dial__control timepicker-dial__item timepicker-dial__control_editable\"\r\n           [ngClass]=\"{'timepicker-dial__item_active': isActive}\"\r\n           [ngModel]=\"time | timeParser: timeUnit | timeLocalizer: timeUnit\"\r\n           (ngModelChange)=\"onModelChange($event)\"\r\n           (input)=\"updateTime()\" (focus)=\"saveTimeAndChangeTimeUnit($event, timeUnit)\"\r\n           [timepickerAutofocus]=\"isActive\" (keydown)=\"onKeyDown($event)\">\r\n</ng-template>\r\n",
            providers: [TimeParserPipe],
            styles: [".timepicker-dial__item{cursor:pointer;color:rgba(255,255,255,.5);font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.timepicker-dial__item{font-family:var(--primary-font-family);color:var(--dial-inactive-color)}}.timepicker-dial__item_active{color:#fff}@supports (color:var(--dial-active-color)){.timepicker-dial__item_active{color:var(--dial-active-color)}}.timepicker-dial__control{border:none;background-color:transparent;font-size:50px;width:60px;padding:0;border-radius:3px;text-align:right}.timepicker-dial__control_editable:focus{color:#00bfff;background-color:#fff;outline:#00bfff}@supports (color:var(--dial-editable-active-color)){.timepicker-dial__control_editable:focus{color:var(--dial-editable-active-color)}}@supports (background-color:var(--dial-editable-background-color)){.timepicker-dial__control_editable:focus{background-color:var(--dial-editable-background-color)}}@supports (outline:var(--dial-editable-active-color)){.timepicker-dial__control_editable:focus{outline:var(--dial-editable-active-color)}}"]
        }),
        tslib_1.__metadata("design:paramtypes", [TimeParserPipe])
    ], NgxMaterialTimepickerDialControlComponent);
    return NgxMaterialTimepickerDialControlComponent;
}());
export { NgxMaterialTimepickerDialControlComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC1jb250cm9sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1kaWFsLWNvbnRyb2wvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC1jb250cm9sLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsa0NBQWtDO0FBQ2xDLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFROUQ7SUFnQkksbURBQW9CLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUx4QyxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFZLENBQUM7UUFDL0MsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUNoRCxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUNuQyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQUcvQyxDQUFDO0lBRUQsc0JBQVksbUVBQVk7YUFBeEI7WUFBQSxpQkFJQztZQUhHLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFJLENBQUMsSUFBSSxFQUFyQixDQUFxQixDQUFDLENBQUM7YUFDekQ7UUFDTCxD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RUFBRSxDQUFDLGNBQWMsQ0FBQzs7U0FDOUIsQ0FBQztpREFpQnNDLGNBQWM7T0FoQnpDLHlDQUF5QyxDQTBFckQ7SUFBRCxnREFBQztDQUFBLEFBMUVELElBMEVDO1NBMUVZLHlDQUF5QztBQTRFdEQsU0FBUyxzQkFBc0IsQ0FBQyxXQUFtQixFQUFFLFFBQWdCLEVBQUUsUUFBeUI7SUFDNUYsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUVyQyxJQUFJLFFBQVEsRUFBRTtRQUNWLElBQU0sSUFBSSxHQUFHLFdBQVcsR0FBRyxRQUFRLENBQUM7UUFDcEMsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDNUM7QUFDTCxDQUFDO0FBRUQsU0FBUyxpQkFBaUIsQ0FBQyxJQUFZLEVBQUUsUUFBeUI7SUFDOUQsSUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQXBCLENBQW9CLENBQUMsQ0FBQztJQUNsRSxPQUFPLENBQUMsWUFBWSxJQUFJLENBQUMsWUFBWSxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNwRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGU6dHJpcGxlLWVxdWFscyAqL1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDbG9ja0ZhY2VUaW1lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2Nsb2NrLWZhY2UtdGltZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBUaW1lVW5pdCB9IGZyb20gJy4uLy4uL21vZGVscy90aW1lLXVuaXQuZW51bSc7XHJcbmltcG9ydCB7IGlzRGlnaXQgfSBmcm9tICcuLi8uLi91dGlscy90aW1lcGlja2VyLnV0aWxzJztcclxuaW1wb3J0IHsgVGltZVBhcnNlclBpcGUgfSBmcm9tICcuLi8uLi9waXBlcy90aW1lLXBhcnNlci5waXBlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1kaWFsLWNvbnRyb2wnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1kaWFsLWNvbnRyb2wuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLWRpYWwtY29udHJvbC5jb21wb25lbnQuc2NzcyddLFxyXG4gICAgcHJvdmlkZXJzOiBbVGltZVBhcnNlclBpcGVdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJEaWFsQ29udHJvbENvbXBvbmVudCB7XHJcblxyXG4gICAgcHJldmlvdXNUaW1lOiBudW1iZXIgfCBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgdGltZUxpc3Q6IENsb2NrRmFjZVRpbWVbXTtcclxuICAgIEBJbnB1dCgpIHRpbWVVbml0OiBUaW1lVW5pdDtcclxuICAgIEBJbnB1dCgpIHRpbWU6IHN0cmluZztcclxuICAgIEBJbnB1dCgpIGlzQWN0aXZlOiBib29sZWFuO1xyXG4gICAgQElucHV0KCkgaXNFZGl0YWJsZTogYm9vbGVhbjtcclxuICAgIEBJbnB1dCgpIG1pbnV0ZXNHYXA6IG51bWJlcjtcclxuXHJcbiAgICBAT3V0cHV0KCkgdGltZVVuaXRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxUaW1lVW5pdD4oKTtcclxuICAgIEBPdXRwdXQoKSB0aW1lQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xvY2tGYWNlVGltZT4oKTtcclxuICAgIEBPdXRwdXQoKSBmb2N1c2VkID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xyXG4gICAgQE91dHB1dCgpIHVuZm9jdXNlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRpbWVQYXJzZXJQaXBlOiBUaW1lUGFyc2VyUGlwZSkge1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0IHNlbGVjdGVkVGltZSgpOiBDbG9ja0ZhY2VUaW1lIHtcclxuICAgICAgICBpZiAoISF0aGlzLnRpbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGltZUxpc3QuZmluZCh0ID0+IHQudGltZSA9PT0gK3RoaXMudGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNhdmVUaW1lQW5kQ2hhbmdlVGltZVVuaXQoZXZlbnQ6IEZvY3VzRXZlbnQsIHVuaXQ6IFRpbWVVbml0KTogdm9pZCB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB0aGlzLnByZXZpb3VzVGltZSA9IHRoaXMudGltZTtcclxuICAgICAgICB0aGlzLnRpbWVVbml0Q2hhbmdlZC5uZXh0KHVuaXQpO1xyXG4gICAgICAgIHRoaXMuZm9jdXNlZC5uZXh0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVGltZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB0aW1lID0gdGhpcy5zZWxlY3RlZFRpbWU7XHJcbiAgICAgICAgaWYgKHRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lQ2hhbmdlZC5uZXh0KHRpbWUpO1xyXG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzVGltZSA9IHRpbWUudGltZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25LZXlEb3duKGU6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLmtleUNvZGUpO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKCghaXNEaWdpdChlKSkgfHwgaXNUaW1lRGlzYWJsZWRUb0NoYW5nZSh0aGlzLnRpbWUsIGNoYXIsIHRoaXMudGltZUxpc3QpKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc0RpZ2l0KGUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVGltZUJ5QXJyb3coZS5rZXlDb2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Nb2RlbENoYW5nZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50aW1lID0gdGhpcy50aW1lUGFyc2VyUGlwZS50cmFuc2Zvcm0odmFsdWUsIHRoaXMudGltZVVuaXQpLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGFuZ2VUaW1lQnlBcnJvdyhrZXlDb2RlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBBUlJPV19VUCA9IDM4O1xyXG4gICAgICAgIGNvbnN0IEFSUk9XX0RPV04gPSA0MDtcclxuICAgICAgICBsZXQgdGltZTogc3RyaW5nO1xyXG5cclxuICAgICAgICBpZiAoa2V5Q29kZSA9PT0gQVJST1dfVVApIHtcclxuICAgICAgICAgICAgdGltZSA9IFN0cmluZygrdGhpcy50aW1lICsgKHRoaXMubWludXRlc0dhcCB8fCAxKSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBBUlJPV19ET1dOKSB7XHJcbiAgICAgICAgICAgIHRpbWUgPSBTdHJpbmcoK3RoaXMudGltZSAtICh0aGlzLm1pbnV0ZXNHYXAgfHwgMSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFpc1RpbWVVbmF2YWlsYWJsZSh0aW1lLCB0aGlzLnRpbWVMaXN0KSkge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWUgPSB0aW1lO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRpbWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBpc1RpbWVEaXNhYmxlZFRvQ2hhbmdlKGN1cnJlbnRUaW1lOiBzdHJpbmcsIG5leHRUaW1lOiBzdHJpbmcsIHRpbWVMaXN0OiBDbG9ja0ZhY2VUaW1lW10pOiBib29sZWFuIHtcclxuICAgIGNvbnN0IGlzTnVtYmVyID0gL1xcZC8udGVzdChuZXh0VGltZSk7XHJcblxyXG4gICAgaWYgKGlzTnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgdGltZSA9IGN1cnJlbnRUaW1lICsgbmV4dFRpbWU7XHJcbiAgICAgICAgcmV0dXJuIGlzVGltZVVuYXZhaWxhYmxlKHRpbWUsIHRpbWVMaXN0KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaXNUaW1lVW5hdmFpbGFibGUodGltZTogc3RyaW5nLCB0aW1lTGlzdDogQ2xvY2tGYWNlVGltZVtdKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBzZWxlY3RlZFRpbWUgPSB0aW1lTGlzdC5maW5kKHZhbHVlID0+IHZhbHVlLnRpbWUgPT09ICt0aW1lKTtcclxuICAgIHJldHVybiAhc2VsZWN0ZWRUaW1lIHx8IChzZWxlY3RlZFRpbWUgJiYgc2VsZWN0ZWRUaW1lLmRpc2FibGVkKTtcclxufVxyXG4iXX0=