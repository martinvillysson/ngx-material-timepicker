import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeUnit } from '../../models/time-unit.enum';
import { disableMinutes, getMinutes } from '../../utils/timepicker-time.utils';
export class NgxMaterialTimepickerMinutesFaceComponent {
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
}
NgxMaterialTimepickerMinutesFaceComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker-minutes-face',
                template: "<ngx-material-timepicker-face [faceTime]=\"minutesList\" [selectedTime]=\"selectedMinute\"\r\n                              [minutesGap]=\"minutesGap\"\r\n                              (timeChange)=\"minuteChange.next($event)\" [unit]=\"timeUnit.MINUTE\"></ngx-material-timepicker-face>\r\n"
            },] }
];
NgxMaterialTimepickerMinutesFaceComponent.propDecorators = {
    selectedMinute: [{ type: Input }],
    selectedHour: [{ type: Input }],
    period: [{ type: Input }],
    minTime: [{ type: Input }],
    maxTime: [{ type: Input }],
    format: [{ type: Input }],
    minutesGap: [{ type: Input }],
    minuteChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItbWludXRlcy1mYWNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9jb21wb25lbnRzL3RpbWVwaWNrZXItbWludXRlcy1mYWNlL25neC1tYXRlcmlhbC10aW1lcGlja2VyLW1pbnV0ZXMtZmFjZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFakcsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBR3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFPL0UsTUFBTSxPQUFPLHlDQUF5QztJQUp0RDtRQU1JLGdCQUFXLEdBQW9CLEVBQUUsQ0FBQztRQUNsQyxhQUFRLEdBQUcsUUFBUSxDQUFDO1FBVVYsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztJQWEvRCxDQUFDO0lBWEcsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLEVBQUU7WUFDckQsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDMUQsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUNqQixHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2FBQ3RCLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQzs7O1lBN0JKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsc0NBQXNDO2dCQUNoRCw4U0FBb0U7YUFDdkU7Ozs2QkFNSSxLQUFLOzJCQUNMLEtBQUs7cUJBQ0wsS0FBSztzQkFDTCxLQUFLO3NCQUNMLEtBQUs7cUJBQ0wsS0FBSzt5QkFDTCxLQUFLOzJCQUVMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENsb2NrRmFjZVRpbWUgfSBmcm9tICcuLi8uLi9tb2RlbHMvY2xvY2stZmFjZS10aW1lLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFRpbWVVbml0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL3RpbWUtdW5pdC5lbnVtJztcclxuaW1wb3J0IHsgVGltZVBlcmlvZCB9IGZyb20gJy4uLy4uL21vZGVscy90aW1lLXBlcmlvZC5lbnVtJztcclxuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XHJcbmltcG9ydCB7IGRpc2FibGVNaW51dGVzLCBnZXRNaW51dGVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvdGltZXBpY2tlci10aW1lLnV0aWxzJztcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItbWludXRlcy1mYWNlJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1taW51dGVzLWZhY2UuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJNaW51dGVzRmFjZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcblxyXG4gICAgbWludXRlc0xpc3Q6IENsb2NrRmFjZVRpbWVbXSA9IFtdO1xyXG4gICAgdGltZVVuaXQgPSBUaW1lVW5pdDtcclxuXHJcbiAgICBASW5wdXQoKSBzZWxlY3RlZE1pbnV0ZTogQ2xvY2tGYWNlVGltZTtcclxuICAgIEBJbnB1dCgpIHNlbGVjdGVkSG91cjogbnVtYmVyO1xyXG4gICAgQElucHV0KCkgcGVyaW9kOiBUaW1lUGVyaW9kO1xyXG4gICAgQElucHV0KCkgbWluVGltZTogRGF0ZVRpbWU7XHJcbiAgICBASW5wdXQoKSBtYXhUaW1lOiBEYXRlVGltZTtcclxuICAgIEBJbnB1dCgpIGZvcm1hdDogbnVtYmVyO1xyXG4gICAgQElucHV0KCkgbWludXRlc0dhcDogbnVtYmVyO1xyXG5cclxuICAgIEBPdXRwdXQoKSBtaW51dGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPENsb2NrRmFjZVRpbWU+KCk7XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgICAgIGlmIChjaGFuZ2VzWydwZXJpb2QnXSAmJiBjaGFuZ2VzWydwZXJpb2QnXS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgICAgICAgY29uc3QgbWludXRlcyA9IGdldE1pbnV0ZXModGhpcy5taW51dGVzR2FwKTtcclxuICAgICAgICAgICAgdGhpcy5taW51dGVzTGlzdCA9IGRpc2FibGVNaW51dGVzKG1pbnV0ZXMsIHRoaXMuc2VsZWN0ZWRIb3VyLCB7XHJcbiAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluVGltZSxcclxuICAgICAgICAgICAgICAgIG1heDogdGhpcy5tYXhUaW1lLFxyXG4gICAgICAgICAgICAgICAgZm9ybWF0OiB0aGlzLmZvcm1hdCxcclxuICAgICAgICAgICAgICAgIHBlcmlvZDogdGhpcy5wZXJpb2RcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=