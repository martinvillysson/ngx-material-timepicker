import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimePeriod } from '../../models/time-period.enum';
import { TimeUnit } from '../../models/time-unit.enum';
import { animate, sequence, style, transition, trigger } from '@angular/animations';
import { DateTime } from 'luxon';
import { disableHours, disableMinutes } from '../../utils/timepicker-time.utils';
let NgxMaterialTimepickerPeriodComponent = class NgxMaterialTimepickerPeriodComponent {
    constructor() {
        this.timePeriod = TimePeriod;
        this.isPeriodAvailable = true;
        this.periodChanged = new EventEmitter();
    }
    changePeriod(period) {
        this.isPeriodAvailable = this.isSwitchPeriodAvailable(period);
        if (this.isPeriodAvailable) {
            this.periodChanged.next(period);
        }
    }
    animationDone() {
        this.isPeriodAvailable = true;
    }
    isSwitchPeriodAvailable(period) {
        const time = this.getDisabledTimeByPeriod(period);
        return !time.every(t => t.disabled);
    }
    getDisabledTimeByPeriod(period) {
        switch (this.activeTimeUnit) {
            case TimeUnit.HOUR:
                return disableHours(this.hours, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period
                });
            case TimeUnit.MINUTE:
                return disableMinutes(this.minutes, +this.selectedHour, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period
                });
            default:
                throw new Error('no such TimeUnit');
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], NgxMaterialTimepickerPeriodComponent.prototype, "selectedPeriod", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], NgxMaterialTimepickerPeriodComponent.prototype, "format", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], NgxMaterialTimepickerPeriodComponent.prototype, "activeTimeUnit", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], NgxMaterialTimepickerPeriodComponent.prototype, "hours", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], NgxMaterialTimepickerPeriodComponent.prototype, "minutes", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", DateTime)
], NgxMaterialTimepickerPeriodComponent.prototype, "minTime", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", DateTime)
], NgxMaterialTimepickerPeriodComponent.prototype, "maxTime", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], NgxMaterialTimepickerPeriodComponent.prototype, "selectedHour", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], NgxMaterialTimepickerPeriodComponent.prototype, "meridiems", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], NgxMaterialTimepickerPeriodComponent.prototype, "periodChanged", void 0);
NgxMaterialTimepickerPeriodComponent = tslib_1.__decorate([
    Component({
        selector: 'ngx-material-timepicker-period',
        template: "<div class=\"timepicker-period\">\r\n\t\t\t<button class=\"timepicker-dial__item timepicker-period__btn\"\r\n                  [ngClass]=\"{'timepicker-dial__item_active': selectedPeriod === timePeriod.AM}\"\r\n                  (click)=\"changePeriod(timePeriod.AM)\"\r\n                  type=\"button\">{{meridiems[0]}}</button>\r\n    <button class=\"timepicker-dial__item timepicker-period__btn\"\r\n          [ngClass]=\"{'timepicker-dial__item_active': selectedPeriod === timePeriod.PM}\"\r\n          (click)=\"changePeriod(timePeriod.PM)\"\r\n          type=\"button\">{{meridiems[1]}}</button>\r\n    <div class=\"timepicker-period__warning\" [@scaleInOut] (@scaleInOut.done)=\"animationDone()\" *ngIf=\"!isPeriodAvailable\">\r\n        <p>Current time would be invalid in this period.</p>\r\n    </div>\r\n</div>\r\n",
        animations: [
            trigger('scaleInOut', [
                transition(':enter', [
                    style({ transform: 'scale(0)' }),
                    animate('.2s', style({ transform: 'scale(1)' })),
                    sequence([
                        animate('3s', style({ opacity: 1 })),
                        animate('.3s', style({ opacity: 0 }))
                    ])
                ])
            ])
        ],
        styles: [".timepicker-dial__item{cursor:pointer;color:rgba(255,255,255,.5);font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.timepicker-dial__item{font-family:var(--primary-font-family);color:var(--dial-inactive-color)}}.timepicker-dial__item_active{color:#fff}@supports (color:var(--dial-active-color)){.timepicker-dial__item_active{color:var(--dial-active-color)}}.timepicker-period{display:flex;flex-direction:column;position:relative}.timepicker-period__btn{padding:1px 3px;border:0;background-color:transparent;font-size:18px;font-weight:500;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;outline:0;border-radius:3px;transition:background-color .5s;font-family:Roboto,sans-serif}.timepicker-period__btn:focus{background-color:rgba(0,0,0,.07)}.timepicker-period__warning{padding:5px 10px;border-radius:3px;background-color:rgba(0,0,0,.55);color:#fff;position:absolute;width:200px;left:-20px;top:40px}.timepicker-period__warning>p{margin:0;font-size:12px;font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.timepicker-period__btn,.timepicker-period__warning>p{font-family:var(--primary-font-family)}}"]
    })
], NgxMaterialTimepickerPeriodComponent);
export { NgxMaterialTimepickerPeriodComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItcGVyaW9kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1wZXJpb2Qvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItcGVyaW9kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXZELE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNqQyxPQUFPLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBbUJqRixJQUFhLG9DQUFvQyxHQUFqRCxNQUFhLG9DQUFvQztJQWpCakQ7UUFtQkksZUFBVSxHQUFHLFVBQVUsQ0FBQztRQUN4QixzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFZZixrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFjLENBQUM7SUFzQzdELENBQUM7SUFwQ0csWUFBWSxDQUFDLE1BQWtCO1FBQzNCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbkM7SUFDTCxDQUFDO0lBRUQsYUFBYTtRQUNULElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7SUFDbEMsQ0FBQztJQUVPLHVCQUF1QixDQUFDLE1BQWtCO1FBQzlDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRCxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU8sdUJBQXVCLENBQUMsTUFBa0I7UUFDOUMsUUFBUSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3pCLEtBQUssUUFBUSxDQUFDLElBQUk7Z0JBQ2QsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDNUIsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO29CQUNqQixHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87b0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtvQkFDbkIsTUFBTTtpQkFDVCxDQUFDLENBQUM7WUFDUCxLQUFLLFFBQVEsQ0FBQyxNQUFNO2dCQUNoQixPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDcEQsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO29CQUNqQixHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87b0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtvQkFDbkIsTUFBTTtpQkFDVCxDQUFDLENBQUM7WUFDUDtnQkFDSSxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDM0M7SUFDTCxDQUFDO0NBQ0osQ0FBQTtBQWhEWTtJQUFSLEtBQUssRUFBRTs7NEVBQTRCO0FBQzNCO0lBQVIsS0FBSyxFQUFFOztvRUFBZ0I7QUFDZjtJQUFSLEtBQUssRUFBRTs7NEVBQTBCO0FBQ3pCO0lBQVIsS0FBSyxFQUFFOzttRUFBd0I7QUFDdkI7SUFBUixLQUFLLEVBQUU7O3FFQUEwQjtBQUN6QjtJQUFSLEtBQUssRUFBRTtzQ0FBVSxRQUFRO3FFQUFDO0FBQ2xCO0lBQVIsS0FBSyxFQUFFO3NDQUFVLFFBQVE7cUVBQUM7QUFDbEI7SUFBUixLQUFLLEVBQUU7OzBFQUErQjtBQUM5QjtJQUFSLEtBQUssRUFBRTs7dUVBQXFCO0FBRW5CO0lBQVQsTUFBTSxFQUFFOzsyRUFBZ0Q7QUFmaEQsb0NBQW9DO0lBakJoRCxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsZ0NBQWdDO1FBQzFDLHUwQkFBNEQ7UUFFNUQsVUFBVSxFQUFFO1lBQ1IsT0FBTyxDQUFDLFlBQVksRUFBRTtnQkFDbEIsVUFBVSxDQUFDLFFBQVEsRUFBRTtvQkFDakIsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBQyxDQUFDO29CQUM5QixPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDO29CQUM5QyxRQUFRLENBQUM7d0JBQ0wsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQzt3QkFDbEMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztxQkFDdEMsQ0FBQztpQkFDTCxDQUFDO2FBQ0wsQ0FBQztTQUNMOztLQUNKLENBQUM7R0FDVyxvQ0FBb0MsQ0FxRGhEO1NBckRZLG9DQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRpbWVQZXJpb2QgfSBmcm9tICcuLi8uLi9tb2RlbHMvdGltZS1wZXJpb2QuZW51bSc7XHJcbmltcG9ydCB7IFRpbWVVbml0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL3RpbWUtdW5pdC5lbnVtJztcclxuaW1wb3J0IHsgQ2xvY2tGYWNlVGltZSB9IGZyb20gJy4uLy4uL21vZGVscy9jbG9jay1mYWNlLXRpbWUuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgYW5pbWF0ZSwgc2VxdWVuY2UsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nO1xyXG5pbXBvcnQgeyBkaXNhYmxlSG91cnMsIGRpc2FibGVNaW51dGVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvdGltZXBpY2tlci10aW1lLnV0aWxzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1wZXJpb2QnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1wZXJpb2QuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLXBlcmlvZC5jb21wb25lbnQuc2NzcyddLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICAgIHRyaWdnZXIoJ3NjYWxlSW5PdXQnLCBbXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcclxuICAgICAgICAgICAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICdzY2FsZSgwKSd9KSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJy4ycycsIHN0eWxlKHt0cmFuc2Zvcm06ICdzY2FsZSgxKSd9KSksXHJcbiAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZSgnM3MnLCBzdHlsZSh7b3BhY2l0eTogMX0pKSxcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlKCcuM3MnLCBzdHlsZSh7b3BhY2l0eTogMH0pKVxyXG4gICAgICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICBdKVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxUaW1lcGlja2VyUGVyaW9kQ29tcG9uZW50IHtcclxuXHJcbiAgICB0aW1lUGVyaW9kID0gVGltZVBlcmlvZDtcclxuICAgIGlzUGVyaW9kQXZhaWxhYmxlID0gdHJ1ZTtcclxuXHJcbiAgICBASW5wdXQoKSBzZWxlY3RlZFBlcmlvZDogVGltZVBlcmlvZDtcclxuICAgIEBJbnB1dCgpIGZvcm1hdDogbnVtYmVyO1xyXG4gICAgQElucHV0KCkgYWN0aXZlVGltZVVuaXQ6IFRpbWVVbml0O1xyXG4gICAgQElucHV0KCkgaG91cnM6IENsb2NrRmFjZVRpbWVbXTtcclxuICAgIEBJbnB1dCgpIG1pbnV0ZXM6IENsb2NrRmFjZVRpbWVbXTtcclxuICAgIEBJbnB1dCgpIG1pblRpbWU6IERhdGVUaW1lO1xyXG4gICAgQElucHV0KCkgbWF4VGltZTogRGF0ZVRpbWU7XHJcbiAgICBASW5wdXQoKSBzZWxlY3RlZEhvdXI6IG51bWJlciB8IHN0cmluZztcclxuICAgIEBJbnB1dCgpIG1lcmlkaWVtczogc3RyaW5nW107XHJcblxyXG4gICAgQE91dHB1dCgpIHBlcmlvZENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFRpbWVQZXJpb2Q+KCk7XHJcblxyXG4gICAgY2hhbmdlUGVyaW9kKHBlcmlvZDogVGltZVBlcmlvZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNQZXJpb2RBdmFpbGFibGUgPSB0aGlzLmlzU3dpdGNoUGVyaW9kQXZhaWxhYmxlKHBlcmlvZCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQZXJpb2RBdmFpbGFibGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wZXJpb2RDaGFuZ2VkLm5leHQocGVyaW9kKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0aW9uRG9uZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzUGVyaW9kQXZhaWxhYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzU3dpdGNoUGVyaW9kQXZhaWxhYmxlKHBlcmlvZDogVGltZVBlcmlvZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IHRpbWUgPSB0aGlzLmdldERpc2FibGVkVGltZUJ5UGVyaW9kKHBlcmlvZCk7XHJcbiAgICAgICAgcmV0dXJuICF0aW1lLmV2ZXJ5KHQgPT4gdC5kaXNhYmxlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREaXNhYmxlZFRpbWVCeVBlcmlvZChwZXJpb2Q6IFRpbWVQZXJpb2QpOiBDbG9ja0ZhY2VUaW1lW10ge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5hY3RpdmVUaW1lVW5pdCkge1xyXG4gICAgICAgICAgICBjYXNlIFRpbWVVbml0LkhPVVI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlzYWJsZUhvdXJzKHRoaXMuaG91cnMsIHtcclxuICAgICAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluVGltZSxcclxuICAgICAgICAgICAgICAgICAgICBtYXg6IHRoaXMubWF4VGltZSxcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IHRoaXMuZm9ybWF0LFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcmlvZFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNhc2UgVGltZVVuaXQuTUlOVVRFOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpc2FibGVNaW51dGVzKHRoaXMubWludXRlcywgK3RoaXMuc2VsZWN0ZWRIb3VyLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluOiB0aGlzLm1pblRpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4OiB0aGlzLm1heFRpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiB0aGlzLmZvcm1hdCxcclxuICAgICAgICAgICAgICAgICAgICBwZXJpb2RcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBzdWNoIFRpbWVVbml0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==