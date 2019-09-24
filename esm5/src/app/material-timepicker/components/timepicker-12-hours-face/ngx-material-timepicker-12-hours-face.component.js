import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgxMaterialTimepickerHoursFace } from '../timepicker-hours-face/ngx-material-timepicker-hours-face';
import { TimePeriod } from '../../models/time-period.enum';
import { disableHours } from '../../utils/timepicker-time.utils';
var NgxMaterialTimepicker12HoursFaceComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NgxMaterialTimepicker12HoursFaceComponent, _super);
    function NgxMaterialTimepicker12HoursFaceComponent() {
        return _super.call(this, 12) || this;
    }
    NgxMaterialTimepicker12HoursFaceComponent.prototype.ngOnChanges = function (changes) {
        if (changes['period'] && changes['period'].currentValue) {
            this.hoursList = disableHours(this.hoursList, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
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
    return NgxMaterialTimepicker12HoursFaceComponent;
}(NgxMaterialTimepickerHoursFace));
export { NgxMaterialTimepicker12HoursFaceComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItMTItaG91cnMtZmFjZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9jb21wb25lbnRzL3RpbWVwaWNrZXItMTItaG91cnMtZmFjZS9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci0xMi1ob3Vycy1mYWNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLDZEQUE2RCxDQUFDO0FBQzdHLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFTakU7SUFBK0QscUVBQThCO0lBSXpGO2VBQ0ksa0JBQU0sRUFBRSxDQUFDO0lBQ2IsQ0FBQztJQUVELCtEQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxFQUFFO1lBQ3JELElBQUksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQzFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTthQUN0QixDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFmUTtRQUFSLEtBQUssRUFBRTs7NkVBQW9CO0lBRm5CLHlDQUF5QztRQU5yRCxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsdUNBQXVDO1lBQ2pELDBQQUFtRTtZQUNuRSxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtTQUNsRCxDQUFDOztPQUVXLHlDQUF5QyxDQWtCckQ7SUFBRCxnREFBQztDQUFBLEFBbEJELENBQStELDhCQUE4QixHQWtCNUY7U0FsQlkseUNBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJIb3Vyc0ZhY2UgfSBmcm9tICcuLi90aW1lcGlja2VyLWhvdXJzLWZhY2Uvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItaG91cnMtZmFjZSc7XHJcbmltcG9ydCB7IFRpbWVQZXJpb2QgfSBmcm9tICcuLi8uLi9tb2RlbHMvdGltZS1wZXJpb2QuZW51bSc7XHJcbmltcG9ydCB7IGRpc2FibGVIb3VycyB9IGZyb20gJy4uLy4uL3V0aWxzL3RpbWVwaWNrZXItdGltZS51dGlscyc7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLTEyLWhvdXJzLWZhY2UnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci0xMi1ob3Vycy1mYWNlLmNvbXBvbmVudC5odG1sJyxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxUaW1lcGlja2VyMTJIb3Vyc0ZhY2VDb21wb25lbnQgZXh0ZW5kcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJIb3Vyc0ZhY2UgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG5cclxuICAgIEBJbnB1dCgpIHBlcmlvZDogVGltZVBlcmlvZDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigxMik7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgICAgIGlmIChjaGFuZ2VzWydwZXJpb2QnXSAmJiBjaGFuZ2VzWydwZXJpb2QnXS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5ob3Vyc0xpc3QgPSBkaXNhYmxlSG91cnModGhpcy5ob3Vyc0xpc3QsIHtcclxuICAgICAgICAgICAgICAgIG1pbjogdGhpcy5taW5UaW1lLFxyXG4gICAgICAgICAgICAgICAgbWF4OiB0aGlzLm1heFRpbWUsXHJcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IHRoaXMuZm9ybWF0LFxyXG4gICAgICAgICAgICAgICAgcGVyaW9kOiB0aGlzLnBlcmlvZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19