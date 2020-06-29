import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimePeriod } from '../../models/time-period.enum';
import { TimeUnit } from '../../models/time-unit.enum';
import { animate, sequence, style, transition, trigger } from '@angular/animations';
import { disableHours, disableMinutes } from '../../utils/timepicker-time.utils';
export class NgxMaterialTimepickerPeriodComponent {
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
}
NgxMaterialTimepickerPeriodComponent.decorators = [
    { type: Component, args: [{
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
                styles: [".timepicker-dial__item{color:hsla(0,0%,100%,.5);cursor:pointer;font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.timepicker-dial__item{color:var(--dial-inactive-color);font-family:var(--primary-font-family)}}.timepicker-dial__item_active{color:#fff}@supports (color:var(--dial-active-color)){.timepicker-dial__item_active{color:var(--dial-active-color)}}.timepicker-period{display:flex;flex-direction:column;position:relative}.timepicker-period__btn{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;background-color:transparent;border:0;border-radius:3px;font-family:Roboto,sans-serif;font-size:18px;font-weight:500;outline:none;padding:1px 3px;transition:background-color .5s;user-select:none}@supports (font-family:var(--primary-font-family)){.timepicker-period__btn{font-family:var(--primary-font-family)}}.timepicker-period__btn:focus{background-color:rgba(0,0,0,.07)}.timepicker-period__warning{background-color:rgba(0,0,0,.55);border-radius:3px;color:#fff;left:-20px;padding:5px 10px;position:absolute;top:40px;width:200px}.timepicker-period__warning>p{font-family:Roboto,sans-serif;font-size:12px;margin:0}@supports (font-family:var(--primary-font-family)){.timepicker-period__warning>p{font-family:var(--primary-font-family)}}"]
            },] }
];
NgxMaterialTimepickerPeriodComponent.propDecorators = {
    selectedPeriod: [{ type: Input }],
    format: [{ type: Input }],
    activeTimeUnit: [{ type: Input }],
    hours: [{ type: Input }],
    minutes: [{ type: Input }],
    minTime: [{ type: Input }],
    maxTime: [{ type: Input }],
    selectedHour: [{ type: Input }],
    meridiems: [{ type: Input }],
    periodChanged: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItcGVyaW9kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9jb21wb25lbnRzL3RpbWVwaWNrZXItcGVyaW9kL25neC1tYXRlcmlhbC10aW1lcGlja2VyLXBlcmlvZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXZELE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFcEYsT0FBTyxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQW1CakYsTUFBTSxPQUFPLG9DQUFvQztJQWpCakQ7UUFtQkksZUFBVSxHQUFHLFVBQVUsQ0FBQztRQUN4QixzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFZZixrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFjLENBQUM7SUFzQzdELENBQUM7SUFwQ0csWUFBWSxDQUFDLE1BQWtCO1FBQzNCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbkM7SUFDTCxDQUFDO0lBRUQsYUFBYTtRQUNULElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7SUFDbEMsQ0FBQztJQUVPLHVCQUF1QixDQUFDLE1BQWtCO1FBQzlDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRCxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU8sdUJBQXVCLENBQUMsTUFBa0I7UUFDOUMsUUFBUSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3pCLEtBQUssUUFBUSxDQUFDLElBQUk7Z0JBQ2QsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDNUIsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO29CQUNqQixHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87b0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtvQkFDbkIsTUFBTTtpQkFDVCxDQUFDLENBQUM7WUFDUCxLQUFLLFFBQVEsQ0FBQyxNQUFNO2dCQUNoQixPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDcEQsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO29CQUNqQixHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87b0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtvQkFDbkIsTUFBTTtpQkFDVCxDQUFDLENBQUM7WUFDUDtnQkFDSSxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDM0M7SUFDTCxDQUFDOzs7WUFyRUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQ0FBZ0M7Z0JBQzFDLHUwQkFBNEQ7Z0JBRTVELFVBQVUsRUFBRTtvQkFDUixPQUFPLENBQUMsWUFBWSxFQUFFO3dCQUNsQixVQUFVLENBQUMsUUFBUSxFQUFFOzRCQUNqQixLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFDLENBQUM7NEJBQzlCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUM7NEJBQzlDLFFBQVEsQ0FBQztnQ0FDTCxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO2dDQUNsQyxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDOzZCQUN0QyxDQUFDO3lCQUNMLENBQUM7cUJBQ0wsQ0FBQztpQkFDTDs7YUFDSjs7OzZCQU1JLEtBQUs7cUJBQ0wsS0FBSzs2QkFDTCxLQUFLO29CQUNMLEtBQUs7c0JBQ0wsS0FBSztzQkFDTCxLQUFLO3NCQUNMLEtBQUs7MkJBQ0wsS0FBSzt3QkFDTCxLQUFLOzRCQUVMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUaW1lUGVyaW9kIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3RpbWUtcGVyaW9kLmVudW0nO1xyXG5pbXBvcnQgeyBUaW1lVW5pdCB9IGZyb20gJy4uLy4uL21vZGVscy90aW1lLXVuaXQuZW51bSc7XHJcbmltcG9ydCB7IENsb2NrRmFjZVRpbWUgfSBmcm9tICcuLi8uLi9tb2RlbHMvY2xvY2stZmFjZS10aW1lLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IGFuaW1hdGUsIHNlcXVlbmNlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcclxuaW1wb3J0IHsgZGlzYWJsZUhvdXJzLCBkaXNhYmxlTWludXRlcyB9IGZyb20gJy4uLy4uL3V0aWxzL3RpbWVwaWNrZXItdGltZS51dGlscyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItcGVyaW9kJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItcGVyaW9kLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWyduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1wZXJpb2QuY29tcG9uZW50LnNjc3MnXSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgICB0cmlnZ2VyKCdzY2FsZUluT3V0JywgW1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXHJcbiAgICAgICAgICAgICAgICBzdHlsZSh7dHJhbnNmb3JtOiAnc2NhbGUoMCknfSksXHJcbiAgICAgICAgICAgICAgICBhbmltYXRlKCcuMnMnLCBzdHlsZSh7dHJhbnNmb3JtOiAnc2NhbGUoMSknfSkpLFxyXG4gICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGUoJzNzJywgc3R5bGUoe29wYWNpdHk6IDF9KSksXHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZSgnLjNzJywgc3R5bGUoe29wYWNpdHk6IDB9KSlcclxuICAgICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgXSlcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsVGltZXBpY2tlclBlcmlvZENvbXBvbmVudCB7XHJcblxyXG4gICAgdGltZVBlcmlvZCA9IFRpbWVQZXJpb2Q7XHJcbiAgICBpc1BlcmlvZEF2YWlsYWJsZSA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KCkgc2VsZWN0ZWRQZXJpb2Q6IFRpbWVQZXJpb2Q7XHJcbiAgICBASW5wdXQoKSBmb3JtYXQ6IG51bWJlcjtcclxuICAgIEBJbnB1dCgpIGFjdGl2ZVRpbWVVbml0OiBUaW1lVW5pdDtcclxuICAgIEBJbnB1dCgpIGhvdXJzOiBDbG9ja0ZhY2VUaW1lW107XHJcbiAgICBASW5wdXQoKSBtaW51dGVzOiBDbG9ja0ZhY2VUaW1lW107XHJcbiAgICBASW5wdXQoKSBtaW5UaW1lOiBEYXRlVGltZTtcclxuICAgIEBJbnB1dCgpIG1heFRpbWU6IERhdGVUaW1lO1xyXG4gICAgQElucHV0KCkgc2VsZWN0ZWRIb3VyOiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBtZXJpZGllbXM6IHN0cmluZ1tdO1xyXG5cclxuICAgIEBPdXRwdXQoKSBwZXJpb2RDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxUaW1lUGVyaW9kPigpO1xyXG5cclxuICAgIGNoYW5nZVBlcmlvZChwZXJpb2Q6IFRpbWVQZXJpb2QpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzUGVyaW9kQXZhaWxhYmxlID0gdGhpcy5pc1N3aXRjaFBlcmlvZEF2YWlsYWJsZShwZXJpb2QpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzUGVyaW9kQXZhaWxhYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGVyaW9kQ2hhbmdlZC5uZXh0KHBlcmlvZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGlvbkRvbmUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc1BlcmlvZEF2YWlsYWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc1N3aXRjaFBlcmlvZEF2YWlsYWJsZShwZXJpb2Q6IFRpbWVQZXJpb2QpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCB0aW1lID0gdGhpcy5nZXREaXNhYmxlZFRpbWVCeVBlcmlvZChwZXJpb2QpO1xyXG4gICAgICAgIHJldHVybiAhdGltZS5ldmVyeSh0ID0+IHQuZGlzYWJsZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGlzYWJsZWRUaW1lQnlQZXJpb2QocGVyaW9kOiBUaW1lUGVyaW9kKTogQ2xvY2tGYWNlVGltZVtdIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuYWN0aXZlVGltZVVuaXQpIHtcclxuICAgICAgICAgICAgY2FzZSBUaW1lVW5pdC5IT1VSOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpc2FibGVIb3Vycyh0aGlzLmhvdXJzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluOiB0aGlzLm1pblRpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4OiB0aGlzLm1heFRpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiB0aGlzLmZvcm1hdCxcclxuICAgICAgICAgICAgICAgICAgICBwZXJpb2RcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjYXNlIFRpbWVVbml0Lk1JTlVURTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBkaXNhYmxlTWludXRlcyh0aGlzLm1pbnV0ZXMsICt0aGlzLnNlbGVjdGVkSG91ciwge1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbjogdGhpcy5taW5UaW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heDogdGhpcy5tYXhUaW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogdGhpcy5mb3JtYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgcGVyaW9kXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm8gc3VjaCBUaW1lVW5pdCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=