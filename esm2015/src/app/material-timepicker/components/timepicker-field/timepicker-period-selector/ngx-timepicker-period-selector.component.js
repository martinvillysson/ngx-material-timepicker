import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { TimePeriod } from '../../../models/time-period.enum';
import { animate, style, transition, trigger } from '@angular/animations';
import { TIME_LOCALE } from '../../../tokens/time-locale.token';
import { Info } from 'luxon';
export class NgxTimepickerPeriodSelectorComponent {
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
}
NgxTimepickerPeriodSelectorComponent.decorators = [
    { type: Component, args: [{
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
                styles: [".period{position:relative}.period__btn--default{-moz-user-select:none;-ms-user-select:none;-webkit-tap-highlight-color:transparent;-webkit-user-select:none;background-color:transparent;border:none;cursor:pointer;outline:none;padding:0;text-align:left;user-select:none}.period-control{position:relative}.period-control__button{color:inherit;font-size:1rem;position:relative;text-align:center;width:60px}.period-control__button:not(.period-control__button--disabled):focus:after{background-color:#00bfff;bottom:-8px;content:\"\";height:1px;left:0;position:absolute;width:100%}.period-control__arrow{color:rgba(0,0,0,.4);font-size:12px;margin-left:10px}.period-selector{background-color:#f5f5f5;box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);list-style:none;margin:0;max-width:135px;padding:6px 0;position:absolute;right:calc(-50% + -50px);top:calc(50% - 50px);width:150px;z-index:201}.period-selector__button{height:48px;line-height:48px;padding:0 16px;width:100%}.period-selector__button--active{color:#00bfff}.period-selector__button:focus{background-color:#eee}.overlay{background-color:transparent;height:100%;left:0;position:fixed;top:0;width:100%;z-index:200}"]
            },] }
];
NgxTimepickerPeriodSelectorComponent.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [TIME_LOCALE,] }] }
];
NgxTimepickerPeriodSelectorComponent.propDecorators = {
    isOpened: [{ type: Input }],
    disabled: [{ type: Input }],
    selectedPeriod: [{ type: Input }],
    periodSelected: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXItcGVyaW9kLXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9jb21wb25lbnRzL3RpbWVwaWNrZXItZmllbGQvdGltZXBpY2tlci1wZXJpb2Qtc2VsZWN0b3Ivbmd4LXRpbWVwaWNrZXItcGVyaW9kLXNlbGVjdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDOUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNoRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBb0I3QixNQUFNLE9BQU8sb0NBQW9DO0lBa0I3QyxZQUF5QyxNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQU43QyxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFjLENBQUM7UUFFMUQsV0FBTSxHQUFHLFVBQVUsQ0FBQztRQUNwQixjQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQztJQUlsRCxDQUFDO0lBZkQsSUFDSSxjQUFjLENBQUMsTUFBa0I7UUFDakMsSUFBSSxNQUFNLEVBQUU7WUFDUixNQUFNLE9BQU8sR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDbEU7SUFDTCxDQUFDO0lBV0QsSUFBSTtRQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFrQjtRQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDO0lBRUQsYUFBYTtRQUNULElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7OztZQXBESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGdDQUFnQztnQkFDMUMsaXpDQUE0RDtnQkFFNUQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFVBQVUsRUFBRTtvQkFDUixPQUFPLENBQUMsWUFBWSxFQUFFO3dCQUNsQixVQUFVLENBQUMsUUFBUSxFQUFFOzRCQUNqQixLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQzs0QkFDMUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO3lCQUMzRCxDQUFDO3dCQUNGLFVBQVUsQ0FBQyxRQUFRLEVBQUU7NEJBQ2pCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQzt5QkFDM0QsQ0FBQztxQkFDTCxDQUFDO2lCQUNMOzthQUNKOzs7eUNBb0JnQixNQUFNLFNBQUMsV0FBVzs7O3VCQWhCOUIsS0FBSzt1QkFDTCxLQUFLOzZCQUNMLEtBQUs7NkJBUUwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRpbWVQZXJpb2QgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMvdGltZS1wZXJpb2QuZW51bSc7XHJcbmltcG9ydCB7IGFuaW1hdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IFRJTUVfTE9DQUxFIH0gZnJvbSAnLi4vLi4vLi4vdG9rZW5zL3RpbWUtbG9jYWxlLnRva2VuJztcclxuaW1wb3J0IHsgSW5mbyB9IGZyb20gJ2x1eG9uJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICduZ3gtdGltZXBpY2tlci1wZXJpb2Qtc2VsZWN0b3InLFxyXG4gICAgdGVtcGxhdGVVcmw6ICduZ3gtdGltZXBpY2tlci1wZXJpb2Qtc2VsZWN0b3IuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vbmd4LXRpbWVwaWNrZXItcGVyaW9kLXNlbGVjdG9yLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgICB0cmlnZ2VyKCdzY2FsZUluT3V0JywgW1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXHJcbiAgICAgICAgICAgICAgICBzdHlsZSh7dHJhbnNmb3JtOiAnc2NhbGUoMCknLCBvcGFjaXR5OiAwfSksXHJcbiAgICAgICAgICAgICAgICBhbmltYXRlKDIwMCwgc3R5bGUoe3RyYW5zZm9ybTogJ3NjYWxlKDEpJywgb3BhY2l0eTogMX0pKVxyXG4gICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgyMDAsIHN0eWxlKHt0cmFuc2Zvcm06ICdzY2FsZSgwKScsIG9wYWNpdHk6IDB9KSlcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICBdKVxyXG4gICAgXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIE5neFRpbWVwaWNrZXJQZXJpb2RTZWxlY3RvckNvbXBvbmVudCB7XHJcblxyXG4gICAgQElucHV0KCkgaXNPcGVuZWQ6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgc2VsZWN0ZWRQZXJpb2QocGVyaW9kOiBUaW1lUGVyaW9kKSB7XHJcbiAgICAgICAgaWYgKHBlcmlvZCkge1xyXG4gICAgICAgICAgICBjb25zdCBwZXJpb2RzID0gW1RpbWVQZXJpb2QuQU0sIFRpbWVQZXJpb2QuUE1dO1xyXG4gICAgICAgICAgICB0aGlzLmxvY2FsaXplZFBlcmlvZCA9IHRoaXMubWVyaWRpZW1zW3BlcmlvZHMuaW5kZXhPZihwZXJpb2QpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQE91dHB1dCgpIHBlcmlvZFNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUaW1lUGVyaW9kPigpO1xyXG5cclxuICAgIHBlcmlvZCA9IFRpbWVQZXJpb2Q7XHJcbiAgICBtZXJpZGllbXMgPSBJbmZvLm1lcmlkaWVtcyh7bG9jYWxlOiB0aGlzLmxvY2FsZX0pO1xyXG4gICAgbG9jYWxpemVkUGVyaW9kOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoQEluamVjdChUSU1FX0xPQ0FMRSkgcHJpdmF0ZSBsb2NhbGU6IHN0cmluZykge1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW4oKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3QocGVyaW9kOiBUaW1lUGVyaW9kKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wZXJpb2RTZWxlY3RlZC5uZXh0KHBlcmlvZCk7XHJcbiAgICAgICAgdGhpcy5pc09wZW5lZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGJhY2tkcm9wQ2xpY2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc09wZW5lZCA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==