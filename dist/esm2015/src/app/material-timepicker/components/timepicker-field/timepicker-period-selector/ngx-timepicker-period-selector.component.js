import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { TimePeriod } from '../../../models/time-period.enum';
import { animate, style, transition, trigger } from '@angular/animations';
import { TIME_LOCALE } from '../../../tokens/time-locale.token';
import { Info } from 'luxon';
let NgxTimepickerPeriodSelectorComponent = class NgxTimepickerPeriodSelectorComponent {
    constructor(locale) {
        this.locale = locale;
        this.periodSelected = new EventEmitter();
        this.period = TimePeriod;
        this.meridiems = Info.meridiems({ locale: this.locale });
    }
    set selectedPeriod(period) {
        if (period) {
            const periods = [TimePeriod.AM, TimePeriod.PM];
            this.localizedPeriod = this.meridiems[periods.indexOf(period)];
        }
    }
    open() {
        if (!this.disabled) {
            this.isOpened = true;
        }
    }
    select(period) {
        this.periodSelected.next(period);
        this.isOpened = false;
    }
    backdropClick() {
        this.isOpened = false;
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], NgxTimepickerPeriodSelectorComponent.prototype, "isOpened", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], NgxTimepickerPeriodSelectorComponent.prototype, "disabled", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], NgxTimepickerPeriodSelectorComponent.prototype, "selectedPeriod", null);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], NgxTimepickerPeriodSelectorComponent.prototype, "periodSelected", void 0);
NgxTimepickerPeriodSelectorComponent = tslib_1.__decorate([
    Component({
        selector: 'ngx-timepicker-period-selector',
        template: "<div class=\"period\">\r\n    <div class=\"period-control\">\r\n        <button class=\"period-control__button period__btn--default\"\r\n                [ngClass]=\"{'period-control__button--disabled': disabled}\"\r\n                type=\"button\"\r\n                (click)=\"open()\">\r\n            <span>{{localizedPeriod}}</span>\r\n            <span class=\"period-control__arrow\">&#9660;</span>\r\n        </button>\r\n    </div>\r\n    <ul class=\"period-selector\" @scaleInOut *ngIf=\"isOpened\" [timepickerAutofocus]=\"true\">\r\n        <li>\r\n            <button class=\"period-selector__button period__btn--default\"\r\n                    type=\"button\"\r\n                    (click)=\"select(period.AM)\"\r\n                    [ngClass]=\"{'period-selector__button--active': localizedPeriod === meridiems[0]}\">{{meridiems[0]}}</button>\r\n        </li>\r\n        <li>\r\n            <button class=\"period-selector__button period__btn--default\"\r\n                    type=\"button\"\r\n                    (click)=\"select(period.PM)\"\r\n                    [ngClass]=\"{'period-selector__button--active': localizedPeriod === meridiems[1]}\">{{meridiems[1]}}</button>\r\n        </li>\r\n    </ul>\r\n</div>\r\n<div class=\"overlay\" (click)=\"backdropClick()\" *ngIf=\"isOpened\"></div>\r\n",
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [
            trigger('scaleInOut', [
                transition(':enter', [
                    style({ transform: 'scale(0)', opacity: 0 }),
                    animate(200, style({ transform: 'scale(1)', opacity: 1 }))
                ]),
                transition(':leave', [
                    animate(200, style({ transform: 'scale(0)', opacity: 0 }))
                ])
            ])
        ],
        styles: [".period{position:relative}.period__btn--default{padding:0;border:none;background-color:transparent;cursor:pointer;text-align:left;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;outline:0}.period-control{position:relative}.period-control__button{position:relative;width:60px;font-size:1rem;color:inherit;text-align:center}.period-control__button:not(.period-control__button--disabled):focus:after{content:'';position:absolute;bottom:-8px;left:0;width:100%;height:1px;background-color:#00bfff}.period-control__arrow{margin-left:10px;font-size:12px;color:rgba(0,0,0,.4)}.period-selector{position:absolute;top:calc(50% - 50px);right:calc(-50% + -50px);max-width:135px;width:150px;padding:6px 0;margin:0;list-style:none;background-color:#f5f5f5;box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);z-index:201}.period-selector__button{width:100%;height:48px;padding:0 16px;line-height:48px}.period-selector__button--active{color:#00bfff}.period-selector__button:focus{background-color:#eee}.overlay{position:fixed;width:100%;height:100%;top:0;left:0;background-color:transparent;z-index:200}"]
    }),
    tslib_1.__param(0, Inject(TIME_LOCALE)),
    tslib_1.__metadata("design:paramtypes", [String])
], NgxTimepickerPeriodSelectorComponent);
export { NgxTimepickerPeriodSelectorComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXItcGVyaW9kLXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1maWVsZC90aW1lcGlja2VyLXBlcmlvZC1zZWxlY3Rvci9uZ3gtdGltZXBpY2tlci1wZXJpb2Qtc2VsZWN0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDOUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNoRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBb0I3QixJQUFhLG9DQUFvQyxHQUFqRCxNQUFhLG9DQUFvQztJQWtCN0MsWUFBeUMsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFON0MsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO1FBRTFELFdBQU0sR0FBRyxVQUFVLENBQUM7UUFDcEIsY0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUM7SUFJbEQsQ0FBQztJQWRELElBQUksY0FBYyxDQUFDLE1BQWtCO1FBQ2pDLElBQUksTUFBTSxFQUFFO1lBQ1IsTUFBTSxPQUFPLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ2xFO0lBQ0wsQ0FBQztJQVdELElBQUk7UUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsTUFBa0I7UUFDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUVELGFBQWE7UUFDVCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDO0NBQ0osQ0FBQTtBQWpDWTtJQUFSLEtBQUssRUFBRTs7c0VBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFOztzRUFBbUI7QUFFM0I7SUFEQyxLQUFLLEVBQUU7OzswRUFNUDtBQUVTO0lBQVQsTUFBTSxFQUFFOzs0RUFBaUQ7QUFaakQsb0NBQW9DO0lBbEJoRCxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsZ0NBQWdDO1FBQzFDLGl6Q0FBNEQ7UUFFNUQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07UUFDL0MsVUFBVSxFQUFFO1lBQ1IsT0FBTyxDQUFDLFlBQVksRUFBRTtnQkFDbEIsVUFBVSxDQUFDLFFBQVEsRUFBRTtvQkFDakIsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUM7b0JBQzFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztpQkFDM0QsQ0FBQztnQkFDRixVQUFVLENBQUMsUUFBUSxFQUFFO29CQUNqQixPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7aUJBQzNELENBQUM7YUFDTCxDQUFDO1NBQ0w7O0tBQ0osQ0FBQztJQW9CZSxtQkFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7O0dBbEJ2QixvQ0FBb0MsQ0FtQ2hEO1NBbkNZLG9DQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRpbWVQZXJpb2QgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMvdGltZS1wZXJpb2QuZW51bSc7XHJcbmltcG9ydCB7IGFuaW1hdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IFRJTUVfTE9DQUxFIH0gZnJvbSAnLi4vLi4vLi4vdG9rZW5zL3RpbWUtbG9jYWxlLnRva2VuJztcclxuaW1wb3J0IHsgSW5mbyB9IGZyb20gJ2x1eG9uJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICduZ3gtdGltZXBpY2tlci1wZXJpb2Qtc2VsZWN0b3InLFxyXG4gICAgdGVtcGxhdGVVcmw6ICduZ3gtdGltZXBpY2tlci1wZXJpb2Qtc2VsZWN0b3IuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vbmd4LXRpbWVwaWNrZXItcGVyaW9kLXNlbGVjdG9yLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgICB0cmlnZ2VyKCdzY2FsZUluT3V0JywgW1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXHJcbiAgICAgICAgICAgICAgICBzdHlsZSh7dHJhbnNmb3JtOiAnc2NhbGUoMCknLCBvcGFjaXR5OiAwfSksXHJcbiAgICAgICAgICAgICAgICBhbmltYXRlKDIwMCwgc3R5bGUoe3RyYW5zZm9ybTogJ3NjYWxlKDEpJywgb3BhY2l0eTogMX0pKVxyXG4gICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgyMDAsIHN0eWxlKHt0cmFuc2Zvcm06ICdzY2FsZSgwKScsIG9wYWNpdHk6IDB9KSlcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICBdKVxyXG4gICAgXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIE5neFRpbWVwaWNrZXJQZXJpb2RTZWxlY3RvckNvbXBvbmVudCB7XHJcblxyXG4gICAgQElucHV0KCkgaXNPcGVuZWQ6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgc2VsZWN0ZWRQZXJpb2QocGVyaW9kOiBUaW1lUGVyaW9kKSB7XHJcbiAgICAgICAgaWYgKHBlcmlvZCkge1xyXG4gICAgICAgICAgICBjb25zdCBwZXJpb2RzID0gW1RpbWVQZXJpb2QuQU0sIFRpbWVQZXJpb2QuUE1dO1xyXG4gICAgICAgICAgICB0aGlzLmxvY2FsaXplZFBlcmlvZCA9IHRoaXMubWVyaWRpZW1zW3BlcmlvZHMuaW5kZXhPZihwZXJpb2QpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQE91dHB1dCgpIHBlcmlvZFNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUaW1lUGVyaW9kPigpO1xyXG5cclxuICAgIHBlcmlvZCA9IFRpbWVQZXJpb2Q7XHJcbiAgICBtZXJpZGllbXMgPSBJbmZvLm1lcmlkaWVtcyh7bG9jYWxlOiB0aGlzLmxvY2FsZX0pO1xyXG4gICAgbG9jYWxpemVkUGVyaW9kOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoQEluamVjdChUSU1FX0xPQ0FMRSkgcHJpdmF0ZSBsb2NhbGU6IHN0cmluZykge1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW4oKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3QocGVyaW9kOiBUaW1lUGVyaW9kKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wZXJpb2RTZWxlY3RlZC5uZXh0KHBlcmlvZCk7XHJcbiAgICAgICAgdGhpcy5pc09wZW5lZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGJhY2tkcm9wQ2xpY2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc09wZW5lZCA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==