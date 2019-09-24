import * as tslib_1 from "tslib";
import { EventEmitter, Input, Output } from '@angular/core';
import { DateTime } from 'luxon';
import { getHours } from '../../utils/timepicker-time.utils';
export class NgxMaterialTimepickerHoursFace {
    constructor(format) {
        this.hourChange = new EventEmitter();
        this.hourSelected = new EventEmitter();
        this.hoursList = [];
        this.hoursList = getHours(format);
    }
    onTimeSelected(time) {
        this.hourSelected.next(time);
    }
}
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], NgxMaterialTimepickerHoursFace.prototype, "selectedHour", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", DateTime)
], NgxMaterialTimepickerHoursFace.prototype, "minTime", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", DateTime)
], NgxMaterialTimepickerHoursFace.prototype, "maxTime", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], NgxMaterialTimepickerHoursFace.prototype, "format", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], NgxMaterialTimepickerHoursFace.prototype, "hourChange", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], NgxMaterialTimepickerHoursFace.prototype, "hourSelected", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItaG91cnMtZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1ob3Vycy1mYWNlL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWhvdXJzLWZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBRWpDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUc3RCxNQUFNLE9BQU8sOEJBQThCO0lBWXZDLFlBQXNCLE1BQWM7UUFMMUIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO1FBQy9DLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUVwRCxjQUFTLEdBQW9CLEVBQUUsQ0FBQztRQUc1QixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsY0FBYyxDQUFDLElBQVk7UUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztDQUNKO0FBakJZO0lBQVIsS0FBSyxFQUFFOztvRUFBNkI7QUFDNUI7SUFBUixLQUFLLEVBQUU7c0NBQVUsUUFBUTsrREFBQztBQUNsQjtJQUFSLEtBQUssRUFBRTtzQ0FBVSxRQUFROytEQUFDO0FBQ2xCO0lBQVIsS0FBSyxFQUFFOzs4REFBZ0I7QUFFZDtJQUFULE1BQU0sRUFBRTs7a0VBQWdEO0FBQy9DO0lBQVQsTUFBTSxFQUFFOztvRUFBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XHJcbmltcG9ydCB7IENsb2NrRmFjZVRpbWUgfSBmcm9tICcuLi8uLi9tb2RlbHMvY2xvY2stZmFjZS10aW1lLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IGdldEhvdXJzIH0gZnJvbSAnLi4vLi4vdXRpbHMvdGltZXBpY2tlci10aW1lLnV0aWxzJztcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxUaW1lcGlja2VySG91cnNGYWNlIHtcclxuXHJcbiAgICBASW5wdXQoKSBzZWxlY3RlZEhvdXI6IENsb2NrRmFjZVRpbWU7XHJcbiAgICBASW5wdXQoKSBtaW5UaW1lOiBEYXRlVGltZTtcclxuICAgIEBJbnB1dCgpIG1heFRpbWU6IERhdGVUaW1lO1xyXG4gICAgQElucHV0KCkgZm9ybWF0OiBudW1iZXI7XHJcblxyXG4gICAgQE91dHB1dCgpIGhvdXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPENsb2NrRmFjZVRpbWU+KCk7XHJcbiAgICBAT3V0cHV0KCkgaG91clNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XHJcblxyXG4gICAgaG91cnNMaXN0OiBDbG9ja0ZhY2VUaW1lW10gPSBbXTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoZm9ybWF0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmhvdXJzTGlzdCA9IGdldEhvdXJzKGZvcm1hdCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25UaW1lU2VsZWN0ZWQodGltZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ob3VyU2VsZWN0ZWQubmV4dCh0aW1lKTtcclxuICAgIH1cclxufVxyXG4iXX0=