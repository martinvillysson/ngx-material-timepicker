import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { TimePeriod } from '../../../models/time-period.enum';
import { animate, style, transition, trigger } from '@angular/animations';
import { TIME_LOCALE } from '../../../tokens/time-locale.token';
import { Info } from 'luxon';
var NgxTimepickerPeriodSelectorComponent = /** @class */ (function () {
    function NgxTimepickerPeriodSelectorComponent(locale) {
        this.locale = locale;
        this.periodSelected = new EventEmitter();
        this.period = TimePeriod;
        this.meridiems = Info.meridiems({ locale: this.locale });
    }
    Object.defineProperty(NgxTimepickerPeriodSelectorComponent.prototype, "selectedPeriod", {
        set: function (period) {
            if (period) {
                var periods = [TimePeriod.AM, TimePeriod.PM];
                this.localizedPeriod = this.meridiems[periods.indexOf(period)];
            }
        },
        enumerable: true,
        configurable: true
    });
    NgxTimepickerPeriodSelectorComponent.prototype.open = function () {
        if (!this.disabled) {
            this.isOpened = true;
        }
    };
    NgxTimepickerPeriodSelectorComponent.prototype.select = function (period) {
        this.periodSelected.next(period);
        this.isOpened = false;
    };
    NgxTimepickerPeriodSelectorComponent.prototype.backdropClick = function () {
        this.isOpened = false;
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
    return NgxTimepickerPeriodSelectorComponent;
}());
export { NgxTimepickerPeriodSelectorComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXItcGVyaW9kLXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1maWVsZC90aW1lcGlja2VyLXBlcmlvZC1zZWxlY3Rvci9uZ3gtdGltZXBpY2tlci1wZXJpb2Qtc2VsZWN0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDOUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNoRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBb0I3QjtJQWtCSSw4Q0FBeUMsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFON0MsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO1FBRTFELFdBQU0sR0FBRyxVQUFVLENBQUM7UUFDcEIsY0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUM7SUFJbEQsQ0FBQztJQWRELHNCQUFJLGdFQUFjO2FBQWxCLFVBQW1CLE1BQWtCO1lBQ2pDLElBQUksTUFBTSxFQUFFO2dCQUNSLElBQU0sT0FBTyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDbEU7UUFDTCxDQUFDOzs7T0FBQTtJQVdELG1EQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFFRCxxREFBTSxHQUFOLFVBQU8sTUFBa0I7UUFDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUVELDREQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDO0lBaENRO1FBQVIsS0FBSyxFQUFFOzswRUFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7OzBFQUFtQjtJQUUzQjtRQURDLEtBQUssRUFBRTs7OzhFQU1QO0lBRVM7UUFBVCxNQUFNLEVBQUU7O2dGQUFpRDtJQVpqRCxvQ0FBb0M7UUFsQmhELFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxnQ0FBZ0M7WUFDMUMsaXpDQUE0RDtZQUU1RCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtZQUMvQyxVQUFVLEVBQUU7Z0JBQ1IsT0FBTyxDQUFDLFlBQVksRUFBRTtvQkFDbEIsVUFBVSxDQUFDLFFBQVEsRUFBRTt3QkFDakIsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUM7d0JBQzFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztxQkFDM0QsQ0FBQztvQkFDRixVQUFVLENBQUMsUUFBUSxFQUFFO3dCQUNqQixPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7cUJBQzNELENBQUM7aUJBQ0wsQ0FBQzthQUNMOztTQUNKLENBQUM7UUFvQmUsbUJBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBOztPQWxCdkIsb0NBQW9DLENBbUNoRDtJQUFELDJDQUFDO0NBQUEsQUFuQ0QsSUFtQ0M7U0FuQ1ksb0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVGltZVBlcmlvZCB9IGZyb20gJy4uLy4uLy4uL21vZGVscy90aW1lLXBlcmlvZC5lbnVtJztcclxuaW1wb3J0IHsgYW5pbWF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgVElNRV9MT0NBTEUgfSBmcm9tICcuLi8uLi8uLi90b2tlbnMvdGltZS1sb2NhbGUudG9rZW4nO1xyXG5pbXBvcnQgeyBJbmZvIH0gZnJvbSAnbHV4b24nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25neC10aW1lcGlja2VyLXBlcmlvZC1zZWxlY3RvcicsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ25neC10aW1lcGlja2VyLXBlcmlvZC1zZWxlY3Rvci5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9uZ3gtdGltZXBpY2tlci1wZXJpb2Qtc2VsZWN0b3IuY29tcG9uZW50LnNjc3MnXSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICAgIHRyaWdnZXIoJ3NjYWxlSW5PdXQnLCBbXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcclxuICAgICAgICAgICAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICdzY2FsZSgwKScsIG9wYWNpdHk6IDB9KSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGUoMjAwLCBzdHlsZSh7dHJhbnNmb3JtOiAnc2NhbGUoMSknLCBvcGFjaXR5OiAxfSkpXHJcbiAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXHJcbiAgICAgICAgICAgICAgICBhbmltYXRlKDIwMCwgc3R5bGUoe3RyYW5zZm9ybTogJ3NjYWxlKDApJywgb3BhY2l0eTogMH0pKVxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgIF0pXHJcbiAgICBdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTmd4VGltZXBpY2tlclBlcmlvZFNlbGVjdG9yQ29tcG9uZW50IHtcclxuXHJcbiAgICBASW5wdXQoKSBpc09wZW5lZDogYm9vbGVhbjtcclxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xyXG4gICAgQElucHV0KClcclxuICAgIHNldCBzZWxlY3RlZFBlcmlvZChwZXJpb2Q6IFRpbWVQZXJpb2QpIHtcclxuICAgICAgICBpZiAocGVyaW9kKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBlcmlvZHMgPSBbVGltZVBlcmlvZC5BTSwgVGltZVBlcmlvZC5QTV07XHJcbiAgICAgICAgICAgIHRoaXMubG9jYWxpemVkUGVyaW9kID0gdGhpcy5tZXJpZGllbXNbcGVyaW9kcy5pbmRleE9mKHBlcmlvZCldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBAT3V0cHV0KCkgcGVyaW9kU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFRpbWVQZXJpb2Q+KCk7XHJcblxyXG4gICAgcGVyaW9kID0gVGltZVBlcmlvZDtcclxuICAgIG1lcmlkaWVtcyA9IEluZm8ubWVyaWRpZW1zKHtsb2NhbGU6IHRoaXMubG9jYWxlfSk7XHJcbiAgICBsb2NhbGl6ZWRQZXJpb2Q6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KFRJTUVfTE9DQUxFKSBwcml2YXRlIGxvY2FsZTogc3RyaW5nKSB7XHJcbiAgICB9XHJcblxyXG4gICAgb3BlbigpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5pc09wZW5lZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdChwZXJpb2Q6IFRpbWVQZXJpb2QpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBlcmlvZFNlbGVjdGVkLm5leHQocGVyaW9kKTtcclxuICAgICAgICB0aGlzLmlzT3BlbmVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgYmFja2Ryb3BDbGljaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzT3BlbmVkID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuIl19