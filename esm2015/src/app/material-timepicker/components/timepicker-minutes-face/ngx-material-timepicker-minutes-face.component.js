import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeUnit } from '../../models/time-unit.enum';
import { TimePeriod } from '../../models/time-period.enum';
import { DateTime } from 'luxon';
import { disableMinutes, getMinutes } from '../../utils/timepicker-time.utils';
let NgxMaterialTimepickerMinutesFaceComponent = class NgxMaterialTimepickerMinutesFaceComponent {
    constructor() {
        this.minutesList = [];
        this.timeUnit = TimeUnit;
        this.minuteChange = new EventEmitter();
    }
    ngOnChanges(changes) {
        if (changes['period'] && changes['period'].currentValue) {
            const minutes = getMinutes(this.minutesGap);
            this.minutesList = disableMinutes(minutes, this.selectedHour, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], NgxMaterialTimepickerMinutesFaceComponent.prototype, "selectedMinute", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], NgxMaterialTimepickerMinutesFaceComponent.prototype, "selectedHour", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], NgxMaterialTimepickerMinutesFaceComponent.prototype, "period", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", DateTime)
], NgxMaterialTimepickerMinutesFaceComponent.prototype, "minTime", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", DateTime)
], NgxMaterialTimepickerMinutesFaceComponent.prototype, "maxTime", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], NgxMaterialTimepickerMinutesFaceComponent.prototype, "format", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], NgxMaterialTimepickerMinutesFaceComponent.prototype, "minutesGap", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], NgxMaterialTimepickerMinutesFaceComponent.prototype, "minuteChange", void 0);
NgxMaterialTimepickerMinutesFaceComponent = tslib_1.__decorate([
    Component({
        selector: 'ngx-material-timepicker-minutes-face',
        template: "<ngx-material-timepicker-face [faceTime]=\"minutesList\" [selectedTime]=\"selectedMinute\"\r\n                              [minutesGap]=\"minutesGap\"\r\n                              (timeChange)=\"minuteChange.next($event)\" [unit]=\"timeUnit.MINUTE\"></ngx-material-timepicker-face>\r\n"
    })
], NgxMaterialTimepickerMinutesFaceComponent);
export { NgxMaterialTimepickerMinutesFaceComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItbWludXRlcy1mYWNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1taW51dGVzLWZhY2Uvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItbWludXRlcy1mYWNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFakcsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFPL0UsSUFBYSx5Q0FBeUMsR0FBdEQsTUFBYSx5Q0FBeUM7SUFKdEQ7UUFNSSxnQkFBVyxHQUFvQixFQUFFLENBQUM7UUFDbEMsYUFBUSxHQUFHLFFBQVEsQ0FBQztRQVVWLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7SUFhL0QsQ0FBQztJQVhHLFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxFQUFFO1lBQ3JELE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQzFELEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTthQUN0QixDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7Q0FDSixDQUFBO0FBckJZO0lBQVIsS0FBSyxFQUFFOztpRkFBK0I7QUFDOUI7SUFBUixLQUFLLEVBQUU7OytFQUFzQjtBQUNyQjtJQUFSLEtBQUssRUFBRTs7eUVBQW9CO0FBQ25CO0lBQVIsS0FBSyxFQUFFO3NDQUFVLFFBQVE7MEVBQUM7QUFDbEI7SUFBUixLQUFLLEVBQUU7c0NBQVUsUUFBUTswRUFBQztBQUNsQjtJQUFSLEtBQUssRUFBRTs7eUVBQWdCO0FBQ2Y7SUFBUixLQUFLLEVBQUU7OzZFQUFvQjtBQUVsQjtJQUFULE1BQU0sRUFBRTs7K0VBQWtEO0FBYmxELHlDQUF5QztJQUpyRCxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsc0NBQXNDO1FBQ2hELDhTQUFvRTtLQUN2RSxDQUFDO0dBQ1cseUNBQXlDLENBMEJyRDtTQTFCWSx5Q0FBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENsb2NrRmFjZVRpbWUgfSBmcm9tICcuLi8uLi9tb2RlbHMvY2xvY2stZmFjZS10aW1lLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFRpbWVVbml0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL3RpbWUtdW5pdC5lbnVtJztcclxuaW1wb3J0IHsgVGltZVBlcmlvZCB9IGZyb20gJy4uLy4uL21vZGVscy90aW1lLXBlcmlvZC5lbnVtJztcclxuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XHJcbmltcG9ydCB7IGRpc2FibGVNaW51dGVzLCBnZXRNaW51dGVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvdGltZXBpY2tlci10aW1lLnV0aWxzJztcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItbWludXRlcy1mYWNlJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1taW51dGVzLWZhY2UuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJNaW51dGVzRmFjZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcblxyXG4gICAgbWludXRlc0xpc3Q6IENsb2NrRmFjZVRpbWVbXSA9IFtdO1xyXG4gICAgdGltZVVuaXQgPSBUaW1lVW5pdDtcclxuXHJcbiAgICBASW5wdXQoKSBzZWxlY3RlZE1pbnV0ZTogQ2xvY2tGYWNlVGltZTtcclxuICAgIEBJbnB1dCgpIHNlbGVjdGVkSG91cjogbnVtYmVyO1xyXG4gICAgQElucHV0KCkgcGVyaW9kOiBUaW1lUGVyaW9kO1xyXG4gICAgQElucHV0KCkgbWluVGltZTogRGF0ZVRpbWU7XHJcbiAgICBASW5wdXQoKSBtYXhUaW1lOiBEYXRlVGltZTtcclxuICAgIEBJbnB1dCgpIGZvcm1hdDogbnVtYmVyO1xyXG4gICAgQElucHV0KCkgbWludXRlc0dhcDogbnVtYmVyO1xyXG5cclxuICAgIEBPdXRwdXQoKSBtaW51dGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPENsb2NrRmFjZVRpbWU+KCk7XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgICAgIGlmIChjaGFuZ2VzWydwZXJpb2QnXSAmJiBjaGFuZ2VzWydwZXJpb2QnXS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgICAgICAgY29uc3QgbWludXRlcyA9IGdldE1pbnV0ZXModGhpcy5taW51dGVzR2FwKTtcclxuICAgICAgICAgICAgdGhpcy5taW51dGVzTGlzdCA9IGRpc2FibGVNaW51dGVzKG1pbnV0ZXMsIHRoaXMuc2VsZWN0ZWRIb3VyLCB7XHJcbiAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluVGltZSxcclxuICAgICAgICAgICAgICAgIG1heDogdGhpcy5tYXhUaW1lLFxyXG4gICAgICAgICAgICAgICAgZm9ybWF0OiB0aGlzLmZvcm1hdCxcclxuICAgICAgICAgICAgICAgIHBlcmlvZDogdGhpcy5wZXJpb2RcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=