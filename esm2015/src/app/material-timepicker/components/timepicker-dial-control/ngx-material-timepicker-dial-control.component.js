import * as tslib_1 from "tslib";
/* tslint:disable:triple-equals */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeUnit } from '../../models/time-unit.enum';
import { isDigit } from '../../utils/timepicker.utils';
import { TimeParserPipe } from '../../pipes/time-parser.pipe';
let NgxMaterialTimepickerDialControlComponent = class NgxMaterialTimepickerDialControlComponent {
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
export { NgxMaterialTimepickerDialControlComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC1jb250cm9sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1kaWFsLWNvbnRyb2wvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC1jb250cm9sLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsa0NBQWtDO0FBQ2xDLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFROUQsSUFBYSx5Q0FBeUMsR0FBdEQsTUFBYSx5Q0FBeUM7SUFnQmxELFlBQW9CLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUx4QyxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFZLENBQUM7UUFDL0MsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUNoRCxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUNuQyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQUcvQyxDQUFDO0lBRUQsSUFBWSxZQUFZO1FBQ3BCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDYixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6RDtJQUNMLENB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Qzs2Q0FpQnNDLGNBQWM7R0FoQnpDLHlDQUF5QyxDQTBFckQ7U0ExRVkseUNBQXlDO0FBNEV0RCxTQUFTLHNCQUFzQixDQUFDLFdBQW1CLEVBQUUsUUFBZ0IsRUFBRSxRQUF5QjtJQUM1RixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXJDLElBQUksUUFBUSxFQUFFO1FBQ1YsTUFBTSxJQUFJLEdBQUcsV0FBVyxHQUFHLFFBQVEsQ0FBQztRQUNwQyxPQUFPLGlCQUFpQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztLQUM1QztBQUNMLENBQUM7QUFFRCxTQUFTLGlCQUFpQixDQUFDLElBQVksRUFBRSxRQUF5QjtJQUM5RCxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xFLE9BQU8sQ0FBQyxZQUFZLElBQUksQ0FBQyxZQUFZLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3BFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZTp0cmlwbGUtZXF1YWxzICovXHJcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENsb2NrRmFjZVRpbWUgfSBmcm9tICcuLi8uLi9tb2RlbHMvY2xvY2stZmFjZS10aW1lLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFRpbWVVbml0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL3RpbWUtdW5pdC5lbnVtJztcclxuaW1wb3J0IHsgaXNEaWdpdCB9IGZyb20gJy4uLy4uL3V0aWxzL3RpbWVwaWNrZXIudXRpbHMnO1xyXG5pbXBvcnQgeyBUaW1lUGFyc2VyUGlwZSB9IGZyb20gJy4uLy4uL3BpcGVzL3RpbWUtcGFyc2VyLnBpcGUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLWRpYWwtY29udHJvbCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLWRpYWwtY29udHJvbC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC1jb250cm9sLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgICBwcm92aWRlcnM6IFtUaW1lUGFyc2VyUGlwZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsVGltZXBpY2tlckRpYWxDb250cm9sQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcmV2aW91c1RpbWU6IG51bWJlciB8IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSB0aW1lTGlzdDogQ2xvY2tGYWNlVGltZVtdO1xyXG4gICAgQElucHV0KCkgdGltZVVuaXQ6IFRpbWVVbml0O1xyXG4gICAgQElucHV0KCkgdGltZTogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgaXNBY3RpdmU6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSBpc0VkaXRhYmxlOiBib29sZWFuO1xyXG4gICAgQElucHV0KCkgbWludXRlc0dhcDogbnVtYmVyO1xyXG5cclxuICAgIEBPdXRwdXQoKSB0aW1lVW5pdENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFRpbWVVbml0PigpO1xyXG4gICAgQE91dHB1dCgpIHRpbWVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxDbG9ja0ZhY2VUaW1lPigpO1xyXG4gICAgQE91dHB1dCgpIGZvY3VzZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bGw+KCk7XHJcbiAgICBAT3V0cHV0KCkgdW5mb2N1c2VkID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdGltZVBhcnNlclBpcGU6IFRpbWVQYXJzZXJQaXBlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgc2VsZWN0ZWRUaW1lKCk6IENsb2NrRmFjZVRpbWUge1xyXG4gICAgICAgIGlmICghIXRoaXMudGltZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50aW1lTGlzdC5maW5kKHQgPT4gdC50aW1lID09PSArdGhpcy50aW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZVRpbWVBbmRDaGFuZ2VUaW1lVW5pdChldmVudDogRm9jdXNFdmVudCwgdW5pdDogVGltZVVuaXQpOiB2b2lkIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHRoaXMucHJldmlvdXNUaW1lID0gdGhpcy50aW1lO1xyXG4gICAgICAgIHRoaXMudGltZVVuaXRDaGFuZ2VkLm5leHQodW5pdCk7XHJcbiAgICAgICAgdGhpcy5mb2N1c2VkLm5leHQoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVUaW1lKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHRpbWUgPSB0aGlzLnNlbGVjdGVkVGltZTtcclxuICAgICAgICBpZiAodGltZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVDaGFuZ2VkLm5leHQodGltZSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNUaW1lID0gdGltZS50aW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbktleURvd24oZTogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUua2V5Q29kZSk7XHJcblxyXG5cclxuICAgICAgICBpZiAoKCFpc0RpZ2l0KGUpKSB8fCBpc1RpbWVEaXNhYmxlZFRvQ2hhbmdlKHRoaXMudGltZSwgY2hhciwgdGhpcy50aW1lTGlzdCkpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlzRGlnaXQoZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VUaW1lQnlBcnJvdyhlLmtleUNvZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbk1vZGVsQ2hhbmdlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLnRpbWVQYXJzZXJQaXBlLnRyYW5zZm9ybSh2YWx1ZSwgdGhpcy50aW1lVW5pdCkudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoYW5nZVRpbWVCeUFycm93KGtleUNvZGU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IEFSUk9XX1VQID0gMzg7XHJcbiAgICAgICAgY29uc3QgQVJST1dfRE9XTiA9IDQwO1xyXG4gICAgICAgIGxldCB0aW1lOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGlmIChrZXlDb2RlID09PSBBUlJPV19VUCkge1xyXG4gICAgICAgICAgICB0aW1lID0gU3RyaW5nKCt0aGlzLnRpbWUgKyAodGhpcy5taW51dGVzR2FwIHx8IDEpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IEFSUk9XX0RPV04pIHtcclxuICAgICAgICAgICAgdGltZSA9IFN0cmluZygrdGhpcy50aW1lIC0gKHRoaXMubWludXRlc0dhcCB8fCAxKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWlzVGltZVVuYXZhaWxhYmxlKHRpbWUsIHRoaXMudGltZUxpc3QpKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZSA9IHRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGltZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzVGltZURpc2FibGVkVG9DaGFuZ2UoY3VycmVudFRpbWU6IHN0cmluZywgbmV4dFRpbWU6IHN0cmluZywgdGltZUxpc3Q6IENsb2NrRmFjZVRpbWVbXSk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgaXNOdW1iZXIgPSAvXFxkLy50ZXN0KG5leHRUaW1lKTtcclxuXHJcbiAgICBpZiAoaXNOdW1iZXIpIHtcclxuICAgICAgICBjb25zdCB0aW1lID0gY3VycmVudFRpbWUgKyBuZXh0VGltZTtcclxuICAgICAgICByZXR1cm4gaXNUaW1lVW5hdmFpbGFibGUodGltZSwgdGltZUxpc3QpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc1RpbWVVbmF2YWlsYWJsZSh0aW1lOiBzdHJpbmcsIHRpbWVMaXN0OiBDbG9ja0ZhY2VUaW1lW10pOiBib29sZWFuIHtcclxuICAgIGNvbnN0IHNlbGVjdGVkVGltZSA9IHRpbWVMaXN0LmZpbmQodmFsdWUgPT4gdmFsdWUudGltZSA9PT0gK3RpbWUpO1xyXG4gICAgcmV0dXJuICFzZWxlY3RlZFRpbWUgfHwgKHNlbGVjdGVkVGltZSAmJiBzZWxlY3RlZFRpbWUuZGlzYWJsZWQpO1xyXG59XHJcbiJdfQ==