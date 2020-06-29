import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { TimeUnit } from '../../models/time-unit.enum';
import { Info } from 'luxon';
import { disableHours, disableMinutes, getHours, getMinutes } from '../../utils/timepicker-time.utils';
import { TIME_LOCALE } from '../../tokens/time-locale.token';
export class NgxMaterialTimepickerDialComponent {
    constructor(locale) {
        this.locale = locale;
        this.timeUnit = TimeUnit;
        this.meridiems = Info.meridiems({ locale: this.locale });
        this.periodChanged = new EventEmitter();
        this.timeUnitChanged = new EventEmitter();
        this.hourChanged = new EventEmitter();
        this.minuteChanged = new EventEmitter();
    }
    ngOnChanges(changes) {
        if (changes['period'] && changes['period'].currentValue
            || changes['format'] && changes['format'].currentValue) {
            const hours = getHours(this.format);
            this.hours = disableHours(hours, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
        if (changes['period'] && changes['period'].currentValue
            || changes['hour'] && changes['hour'].currentValue) {
            const minutes = getMinutes(this.minutesGap);
            this.minutes = disableMinutes(minutes, +this.hour, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    }
    changeTimeUnit(unit) {
        this.timeUnitChanged.next(unit);
    }
    changePeriod(period) {
        this.periodChanged.next(period);
    }
    changeHour(hour) {
        this.hourChanged.next(hour);
    }
    changeMinute(minute) {
        this.minuteChanged.next(minute);
    }
    showHint() {
        this.isHintVisible = true;
    }
    hideHint() {
        this.isHintVisible = false;
    }
}
NgxMaterialTimepickerDialComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker-dial',
                template: "<div class=\"timepicker-dial\">\r\n    <div class=\"timepicker-dial__container\">\r\n        <div class=\"timepicker-dial__time\">\r\n            <ngx-material-timepicker-dial-control [timeList]=\"hours\" [time]=\"hour\" [timeUnit]=\"timeUnit.HOUR\"\r\n                                                  [isActive]=\"activeTimeUnit === timeUnit.HOUR\"\r\n                                                  [isEditable]=\"isEditable\"\r\n                                                  (timeUnitChanged)=\"changeTimeUnit($event)\"\r\n                                                  (timeChanged)=\"changeHour($event)\"\r\n                                                  (focused)=\"showHint()\"\r\n                                                  (unfocused)=\"hideHint()\">\r\n\r\n            </ngx-material-timepicker-dial-control>\r\n            <span>:</span>\r\n            <ngx-material-timepicker-dial-control [timeList]=\"minutes\" [time]=\"minute\" [timeUnit]=\"timeUnit.MINUTE\"\r\n                                                  [isActive]=\"activeTimeUnit === timeUnit.MINUTE\"\r\n                                                  [isEditable]=\"isEditable\"\r\n                                                  [minutesGap]=\"minutesGap\"\r\n                                                  (timeUnitChanged)=\"changeTimeUnit($event)\"\r\n                                                  (timeChanged)=\"changeMinute($event)\"\r\n                                                  (focused)=\"showHint()\"\r\n                                                  (unfocused)=\"hideHint()\">\r\n\r\n            </ngx-material-timepicker-dial-control>\r\n        </div>\r\n        <ngx-material-timepicker-period class=\"timepicker-dial__period\"\r\n                                        [ngClass]=\"{'timepicker-dial__period--hidden': format === 24}\"\r\n                                        [selectedPeriod]=\"period\" [activeTimeUnit]=\"activeTimeUnit\"\r\n                                        [maxTime]=\"maxTime\" [minTime]=\"minTime\" [format]=\"format\"\r\n                                        [hours]=\"hours\" [minutes]=\"minutes\" [selectedHour]=\"hour\"\r\n                                        [meridiems]=\"meridiems\"\r\n                                        (periodChanged)=\"changePeriod($event)\"></ngx-material-timepicker-period>\r\n    </div>\r\n    <div *ngIf=\"isEditable\" [ngClass]=\"{'timepicker-dial__hint-container--hidden': !isHintVisible}\">\r\n        <!--suppress HtmlUnknownAttribute -->\r\n        <ng-container *ngTemplateOutlet=\"editableHintTmpl ? editableHintTmpl : editableHintDefault\"></ng-container>\r\n        <ng-template #editableHintDefault>\r\n            <small class=\"timepicker-dial__hint\"> * use arrows (<span>&#8645;</span>) to change the time</small>\r\n        </ng-template>\r\n    </div>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".timepicker-dial{text-align:right}.timepicker-dial__container{-webkit-tap-highlight-color:rgba(0,0,0,0);align-items:center;display:flex;justify-content:flex-end}.timepicker-dial__time{align-items:baseline;color:hsla(0,0%,100%,.5);display:flex;font-family:Roboto,sans-serif;font-size:50px;line-height:normal}@supports (font-family:var(--primary-font-family)){.timepicker-dial__time{color:var(--dial-inactive-color);font-family:var(--primary-font-family)}}.timepicker-dial__period{display:block;margin-left:10px}.timepicker-dial__hint-container--hidden,.timepicker-dial__period--hidden{visibility:hidden}.timepicker-dial__hint{color:#fff;display:inline-block;font-size:10px}@supports (color:var(--dial-active-color)){.timepicker-dial__hint{color:var(--dial-active-color)}}.timepicker-dial__hint span{font-size:14px}@media (max-device-width:1023px) and (orientation:landscape){.timepicker-dial__container{flex-direction:column}.timepicker-dial__period{margin-left:0}}"]
            },] }
];
NgxMaterialTimepickerDialComponent.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [TIME_LOCALE,] }] }
];
NgxMaterialTimepickerDialComponent.propDecorators = {
    editableHintTmpl: [{ type: Input }],
    hour: [{ type: Input }],
    minute: [{ type: Input }],
    format: [{ type: Input }],
    period: [{ type: Input }],
    activeTimeUnit: [{ type: Input }],
    minTime: [{ type: Input }],
    maxTime: [{ type: Input }],
    isEditable: [{ type: Input }],
    minutesGap: [{ type: Input }],
    periodChanged: [{ type: Output }],
    timeUnitChanged: [{ type: Output }],
    hourChanged: [{ type: Output }],
    minuteChanged: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvY29tcG9uZW50cy90aW1lcGlja2VyLWRpYWwvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBRUwsTUFBTSxFQUdULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV2RCxPQUFPLEVBQVksSUFBSSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFRN0QsTUFBTSxPQUFPLGtDQUFrQztJQTBCM0MsWUFBeUMsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUF4QnZELGFBQVEsR0FBRyxRQUFRLENBQUM7UUFJcEIsY0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUM7UUFleEMsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO1FBQy9DLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQVksQ0FBQztRQUMvQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO1FBQ2hELGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7SUFHNUQsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWTtlQUNoRCxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksRUFBRTtZQUN4RCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXBDLElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLEtBQUssRUFBRTtnQkFDN0IsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUNqQixHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2FBQ3RCLENBQUMsQ0FBQztTQUNOO1FBQ0QsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVk7ZUFDaEQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEVBQUU7WUFDcEQsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUU1QyxJQUFJLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUMvQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ2pCLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07YUFDdEIsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRUQsY0FBYyxDQUFDLElBQWM7UUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELFlBQVksQ0FBQyxNQUFrQjtRQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQW1CO1FBQzFCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxZQUFZLENBQUMsTUFBcUI7UUFDOUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztJQUM5QixDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO0lBQy9CLENBQUM7OztZQWxGSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDhCQUE4QjtnQkFDeEMsazFGQUEwRDtnQkFFMUQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7eUNBMkJnQixNQUFNLFNBQUMsV0FBVzs7OytCQWhCOUIsS0FBSzttQkFDTCxLQUFLO3FCQUNMLEtBQUs7cUJBQ0wsS0FBSztxQkFDTCxLQUFLOzZCQUNMLEtBQUs7c0JBQ0wsS0FBSztzQkFDTCxLQUFLO3lCQUNMLEtBQUs7eUJBQ0wsS0FBSzs0QkFFTCxNQUFNOzhCQUNOLE1BQU07MEJBQ04sTUFBTTs0QkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSW5qZWN0LFxyXG4gICAgSW5wdXQsXHJcbiAgICBPbkNoYW5nZXMsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBTaW1wbGVDaGFuZ2VzLFxyXG4gICAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVGltZVBlcmlvZCB9IGZyb20gJy4uLy4uL21vZGVscy90aW1lLXBlcmlvZC5lbnVtJztcclxuaW1wb3J0IHsgVGltZVVuaXQgfSBmcm9tICcuLi8uLi9tb2RlbHMvdGltZS11bml0LmVudW0nO1xyXG5pbXBvcnQgeyBDbG9ja0ZhY2VUaW1lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2Nsb2NrLWZhY2UtdGltZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBEYXRlVGltZSwgSW5mbyB9IGZyb20gJ2x1eG9uJztcclxuaW1wb3J0IHsgZGlzYWJsZUhvdXJzLCBkaXNhYmxlTWludXRlcywgZ2V0SG91cnMsIGdldE1pbnV0ZXMgfSBmcm9tICcuLi8uLi91dGlscy90aW1lcGlja2VyLXRpbWUudXRpbHMnO1xyXG5pbXBvcnQgeyBUSU1FX0xPQ0FMRSB9IGZyb20gJy4uLy4uL3Rva2Vucy90aW1lLWxvY2FsZS50b2tlbic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLWRpYWwuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLWRpYWwuY29tcG9uZW50LnNjc3MnXSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJEaWFsQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuXHJcbiAgICB0aW1lVW5pdCA9IFRpbWVVbml0O1xyXG5cclxuICAgIGhvdXJzOiBDbG9ja0ZhY2VUaW1lW107XHJcbiAgICBtaW51dGVzOiBDbG9ja0ZhY2VUaW1lW107XHJcbiAgICBtZXJpZGllbXMgPSBJbmZvLm1lcmlkaWVtcyh7bG9jYWxlOiB0aGlzLmxvY2FsZX0pO1xyXG5cclxuICAgIGlzSGludFZpc2libGU6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgZWRpdGFibGVIaW50VG1wbDogVGVtcGxhdGVSZWY8Tm9kZT47XHJcbiAgICBASW5wdXQoKSBob3VyOiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBtaW51dGU6IG51bWJlciB8IHN0cmluZztcclxuICAgIEBJbnB1dCgpIGZvcm1hdDogbnVtYmVyO1xyXG4gICAgQElucHV0KCkgcGVyaW9kOiBUaW1lUGVyaW9kO1xyXG4gICAgQElucHV0KCkgYWN0aXZlVGltZVVuaXQ6IFRpbWVVbml0O1xyXG4gICAgQElucHV0KCkgbWluVGltZTogRGF0ZVRpbWU7XHJcbiAgICBASW5wdXQoKSBtYXhUaW1lOiBEYXRlVGltZTtcclxuICAgIEBJbnB1dCgpIGlzRWRpdGFibGU6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSBtaW51dGVzR2FwOiBudW1iZXI7XHJcblxyXG4gICAgQE91dHB1dCgpIHBlcmlvZENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFRpbWVQZXJpb2Q+KCk7XHJcbiAgICBAT3V0cHV0KCkgdGltZVVuaXRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxUaW1lVW5pdD4oKTtcclxuICAgIEBPdXRwdXQoKSBob3VyQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xvY2tGYWNlVGltZT4oKTtcclxuICAgIEBPdXRwdXQoKSBtaW51dGVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxDbG9ja0ZhY2VUaW1lPigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoVElNRV9MT0NBTEUpIHByaXZhdGUgbG9jYWxlOiBzdHJpbmcpIHtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ3BlcmlvZCddICYmIGNoYW5nZXNbJ3BlcmlvZCddLmN1cnJlbnRWYWx1ZVxyXG4gICAgICAgICAgICB8fCBjaGFuZ2VzWydmb3JtYXQnXSAmJiBjaGFuZ2VzWydmb3JtYXQnXS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgICAgICAgY29uc3QgaG91cnMgPSBnZXRIb3Vycyh0aGlzLmZvcm1hdCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmhvdXJzID0gZGlzYWJsZUhvdXJzKGhvdXJzLCB7XHJcbiAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluVGltZSxcclxuICAgICAgICAgICAgICAgIG1heDogdGhpcy5tYXhUaW1lLFxyXG4gICAgICAgICAgICAgICAgZm9ybWF0OiB0aGlzLmZvcm1hdCxcclxuICAgICAgICAgICAgICAgIHBlcmlvZDogdGhpcy5wZXJpb2RcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydwZXJpb2QnXSAmJiBjaGFuZ2VzWydwZXJpb2QnXS5jdXJyZW50VmFsdWVcclxuICAgICAgICAgICAgfHwgY2hhbmdlc1snaG91ciddICYmIGNoYW5nZXNbJ2hvdXInXS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgICAgICAgY29uc3QgbWludXRlcyA9IGdldE1pbnV0ZXModGhpcy5taW51dGVzR2FwKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWludXRlcyA9IGRpc2FibGVNaW51dGVzKG1pbnV0ZXMsICt0aGlzLmhvdXIsIHtcclxuICAgICAgICAgICAgICAgIG1pbjogdGhpcy5taW5UaW1lLFxyXG4gICAgICAgICAgICAgICAgbWF4OiB0aGlzLm1heFRpbWUsXHJcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IHRoaXMuZm9ybWF0LFxyXG4gICAgICAgICAgICAgICAgcGVyaW9kOiB0aGlzLnBlcmlvZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlVGltZVVuaXQodW5pdDogVGltZVVuaXQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRpbWVVbml0Q2hhbmdlZC5uZXh0KHVuaXQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVBlcmlvZChwZXJpb2Q6IFRpbWVQZXJpb2QpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBlcmlvZENoYW5nZWQubmV4dChwZXJpb2QpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZUhvdXIoaG91cjogQ2xvY2tGYWNlVGltZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaG91ckNoYW5nZWQubmV4dChob3VyKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VNaW51dGUobWludXRlOiBDbG9ja0ZhY2VUaW1lKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5taW51dGVDaGFuZ2VkLm5leHQobWludXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93SGludCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzSGludFZpc2libGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGVIaW50KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNIaW50VmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==