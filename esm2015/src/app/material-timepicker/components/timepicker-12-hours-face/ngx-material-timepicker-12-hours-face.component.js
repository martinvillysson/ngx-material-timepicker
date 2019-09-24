import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgxMaterialTimepickerHoursFace } from '../timepicker-hours-face/ngx-material-timepicker-hours-face';
import { TimePeriod } from '../../models/time-period.enum';
import { disableHours } from '../../utils/timepicker-time.utils';
let NgxMaterialTimepicker12HoursFaceComponent = class NgxMaterialTimepicker12HoursFaceComponent extends NgxMaterialTimepickerHoursFace {
    constructor() {
        super(12);
    }
    ngOnChanges(changes) {
        if (changes['period'] && changes['period'].currentValue) {
            this.hoursList = disableHours(this.hoursList, {
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
    tslib_1.__metadata("design:type", String)
], NgxMaterialTimepicker12HoursFaceComponent.prototype, "period", void 0);
NgxMaterialTimepicker12HoursFaceComponent = tslib_1.__decorate([
    Component({
        selector: 'ngx-material-timepicker-12-hours-face',
        template: "<ngx-material-timepicker-face [selectedTime]=\"selectedHour\" [faceTime]=\"hoursList\"\r\n                              (timeChange)=\"hourChange.next($event)\" (timeSelected)=\"onTimeSelected($event)\"></ngx-material-timepicker-face>\r\n",
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    tslib_1.__metadata("design:paramtypes", [])
], NgxMaterialTimepicker12HoursFaceComponent);
export { NgxMaterialTimepicker12HoursFaceComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItMTItaG91cnMtZmFjZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9jb21wb25lbnRzL3RpbWVwaWNrZXItMTItaG91cnMtZmFjZS9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci0xMi1ob3Vycy1mYWNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLDZEQUE2RCxDQUFDO0FBQzdHLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFTakUsSUFBYSx5Q0FBeUMsR0FBdEQsTUFBYSx5Q0FBMEMsU0FBUSw4QkFBOEI7SUFJekY7UUFDSSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDZCxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLEVBQUU7WUFDckQsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDMUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUNqQixHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2FBQ3RCLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztDQUNKLENBQUE7QUFoQlk7SUFBUixLQUFLLEVBQUU7O3lFQUFvQjtBQUZuQix5Q0FBeUM7SUFOckQsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLHVDQUF1QztRQUNqRCwwUEFBbUU7UUFDbkUsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07S0FDbEQsQ0FBQzs7R0FFVyx5Q0FBeUMsQ0FrQnJEO1NBbEJZLHlDQUF5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmd4TWF0ZXJpYWxUaW1lcGlja2VySG91cnNGYWNlIH0gZnJvbSAnLi4vdGltZXBpY2tlci1ob3Vycy1mYWNlL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWhvdXJzLWZhY2UnO1xyXG5pbXBvcnQgeyBUaW1lUGVyaW9kIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3RpbWUtcGVyaW9kLmVudW0nO1xyXG5pbXBvcnQgeyBkaXNhYmxlSG91cnMgfSBmcm9tICcuLi8uLi91dGlscy90aW1lcGlja2VyLXRpbWUudXRpbHMnO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci0xMi1ob3Vycy1mYWNlJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItMTItaG91cnMtZmFjZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsVGltZXBpY2tlcjEySG91cnNGYWNlQ29tcG9uZW50IGV4dGVuZHMgTmd4TWF0ZXJpYWxUaW1lcGlja2VySG91cnNGYWNlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuXHJcbiAgICBASW5wdXQoKSBwZXJpb2Q6IFRpbWVQZXJpb2Q7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoMTIpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgICAgICBpZiAoY2hhbmdlc1sncGVyaW9kJ10gJiYgY2hhbmdlc1sncGVyaW9kJ10uY3VycmVudFZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG91cnNMaXN0ID0gZGlzYWJsZUhvdXJzKHRoaXMuaG91cnNMaXN0LCB7XHJcbiAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluVGltZSxcclxuICAgICAgICAgICAgICAgIG1heDogdGhpcy5tYXhUaW1lLFxyXG4gICAgICAgICAgICAgICAgZm9ybWF0OiB0aGlzLmZvcm1hdCxcclxuICAgICAgICAgICAgICAgIHBlcmlvZDogdGhpcy5wZXJpb2RcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==