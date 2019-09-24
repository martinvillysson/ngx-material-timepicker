import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeUnit } from '../../models/time-unit.enum';
import { TimePeriod } from '../../models/time-period.enum';
import { DateTime } from 'luxon';
import { disableMinutes, getMinutes } from '../../utils/timepicker-time.utils';
var NgxMaterialTimepickerMinutesFaceComponent = /** @class */ (function () {
    function NgxMaterialTimepickerMinutesFaceComponent() {
        this.minutesList = [];
        this.timeUnit = TimeUnit;
        this.minuteChange = new EventEmitter();
    }
    NgxMaterialTimepickerMinutesFaceComponent.prototype.ngOnChanges = function (changes) {
        if (changes['period'] && changes['period'].currentValue) {
            var minutes = getMinutes(this.minutesGap);
            this.minutesList = disableMinutes(minutes, this.selectedHour, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
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
    return NgxMaterialTimepickerMinutesFaceComponent;
}());
export { NgxMaterialTimepickerMinutesFaceComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItbWludXRlcy1mYWNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1taW51dGVzLWZhY2Uvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItbWludXRlcy1mYWNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFakcsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFPL0U7SUFKQTtRQU1JLGdCQUFXLEdBQW9CLEVBQUUsQ0FBQztRQUNsQyxhQUFRLEdBQUcsUUFBUSxDQUFDO1FBVVYsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztJQWEvRCxDQUFDO0lBWEcsK0RBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQzlCLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLEVBQUU7WUFDckQsSUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDMUQsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUNqQixHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2FBQ3RCLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQXBCUTtRQUFSLEtBQUssRUFBRTs7cUZBQStCO0lBQzlCO1FBQVIsS0FBSyxFQUFFOzttRkFBc0I7SUFDckI7UUFBUixLQUFLLEVBQUU7OzZFQUFvQjtJQUNuQjtRQUFSLEtBQUssRUFBRTswQ0FBVSxRQUFROzhFQUFDO0lBQ2xCO1FBQVIsS0FBSyxFQUFFOzBDQUFVLFFBQVE7OEVBQUM7SUFDbEI7UUFBUixLQUFLLEVBQUU7OzZFQUFnQjtJQUNmO1FBQVIsS0FBSyxFQUFFOztpRkFBb0I7SUFFbEI7UUFBVCxNQUFNLEVBQUU7O21GQUFrRDtJQWJsRCx5Q0FBeUM7UUFKckQsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHNDQUFzQztZQUNoRCw4U0FBb0U7U0FDdkUsQ0FBQztPQUNXLHlDQUF5QyxDQTBCckQ7SUFBRCxnREFBQztDQUFBLEFBMUJELElBMEJDO1NBMUJZLHlDQUF5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2xvY2tGYWNlVGltZSB9IGZyb20gJy4uLy4uL21vZGVscy9jbG9jay1mYWNlLXRpbWUuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgVGltZVVuaXQgfSBmcm9tICcuLi8uLi9tb2RlbHMvdGltZS11bml0LmVudW0nO1xyXG5pbXBvcnQgeyBUaW1lUGVyaW9kIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3RpbWUtcGVyaW9kLmVudW0nO1xyXG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcclxuaW1wb3J0IHsgZGlzYWJsZU1pbnV0ZXMsIGdldE1pbnV0ZXMgfSBmcm9tICcuLi8uLi91dGlscy90aW1lcGlja2VyLXRpbWUudXRpbHMnO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1taW51dGVzLWZhY2UnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL25neC1tYXRlcmlhbC10aW1lcGlja2VyLW1pbnV0ZXMtZmFjZS5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsVGltZXBpY2tlck1pbnV0ZXNGYWNlQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuXHJcbiAgICBtaW51dGVzTGlzdDogQ2xvY2tGYWNlVGltZVtdID0gW107XHJcbiAgICB0aW1lVW5pdCA9IFRpbWVVbml0O1xyXG5cclxuICAgIEBJbnB1dCgpIHNlbGVjdGVkTWludXRlOiBDbG9ja0ZhY2VUaW1lO1xyXG4gICAgQElucHV0KCkgc2VsZWN0ZWRIb3VyOiBudW1iZXI7XHJcbiAgICBASW5wdXQoKSBwZXJpb2Q6IFRpbWVQZXJpb2Q7XHJcbiAgICBASW5wdXQoKSBtaW5UaW1lOiBEYXRlVGltZTtcclxuICAgIEBJbnB1dCgpIG1heFRpbWU6IERhdGVUaW1lO1xyXG4gICAgQElucHV0KCkgZm9ybWF0OiBudW1iZXI7XHJcbiAgICBASW5wdXQoKSBtaW51dGVzR2FwOiBudW1iZXI7XHJcblxyXG4gICAgQE91dHB1dCgpIG1pbnV0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xvY2tGYWNlVGltZT4oKTtcclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ3BlcmlvZCddICYmIGNoYW5nZXNbJ3BlcmlvZCddLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAgICAgICBjb25zdCBtaW51dGVzID0gZ2V0TWludXRlcyh0aGlzLm1pbnV0ZXNHYXApO1xyXG4gICAgICAgICAgICB0aGlzLm1pbnV0ZXNMaXN0ID0gZGlzYWJsZU1pbnV0ZXMobWludXRlcywgdGhpcy5zZWxlY3RlZEhvdXIsIHtcclxuICAgICAgICAgICAgICAgIG1pbjogdGhpcy5taW5UaW1lLFxyXG4gICAgICAgICAgICAgICAgbWF4OiB0aGlzLm1heFRpbWUsXHJcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IHRoaXMuZm9ybWF0LFxyXG4gICAgICAgICAgICAgICAgcGVyaW9kOiB0aGlzLnBlcmlvZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==