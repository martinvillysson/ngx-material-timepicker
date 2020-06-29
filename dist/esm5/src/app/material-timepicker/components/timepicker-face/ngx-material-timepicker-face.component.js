import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { TimeUnit } from '../../models/time-unit.enum';
var CLOCK_HAND_STYLES = {
    small: {
        height: '75px',
        top: 'calc(50% - 75px)'
    },
    large: {
        height: '103px',
        top: 'calc(50% - 103px)'
    }
};
var NgxMaterialTimepickerFaceComponent = /** @class */ (function () {
    function NgxMaterialTimepickerFaceComponent() {
        this.timeUnit = TimeUnit;
        this.innerClockFaceSize = 85;
        this.timeChange = new EventEmitter();
        this.timeSelected = new EventEmitter();
    }
    NgxMaterialTimepickerFaceComponent.prototype.ngAfterViewInit = function () {
        this.setClockHandPosition();
        this.addTouchEvents();
    };
    NgxMaterialTimepickerFaceComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var faceTimeChanges = changes['faceTime'];
        var selectedTimeChanges = changes['selectedTime'];
        if ((faceTimeChanges && faceTimeChanges.currentValue)
            && (selectedTimeChanges && selectedTimeChanges.currentValue)) {
            /* Set time according to passed an input value */
            this.selectedTime = this.faceTime.find(function (time) { return time.time === _this.selectedTime.time; });
        }
        if (selectedTimeChanges && selectedTimeChanges.currentValue) {
            this.setClockHandPosition();
        }
        if (faceTimeChanges && faceTimeChanges.currentValue) {
            // To avoid an error ExpressionChangedAfterItHasBeenCheckedError
            setTimeout(function () { return _this.selectAvailableTime(); });
        }
    };
    NgxMaterialTimepickerFaceComponent.prototype.trackByTime = function (_, time) {
        return time.time;
    };
    NgxMaterialTimepickerFaceComponent.prototype.onMousedown = function (e) {
        e.preventDefault();
        this.isStarted = true;
    };
    NgxMaterialTimepickerFaceComponent.prototype.selectTime = function (e) {
        if (!this.isStarted && (e instanceof MouseEvent && e.type !== 'click')) {
            return;
        }
        var clockFaceCords = this.clockFace.nativeElement.getBoundingClientRect();
        /* Get x0 and y0 of the circle */
        var centerX = clockFaceCords.left + clockFaceCords.width / 2;
        var centerY = clockFaceCords.top + clockFaceCords.height / 2;
        /* Counting the arctangent and convert it to from radian to deg */
        var arctangent = Math.atan(Math.abs(e.clientX - centerX) / Math.abs(e.clientY - centerY)) * 180 / Math.PI;
        /* Get angle according to quadrant */
        var circleAngle = countAngleByCords(centerX, centerY, e.clientX, e.clientY, arctangent);
        /* Check if selected time from the inner clock face (24 hours format only) */
        var isInnerClockChosen = this.format && this.isInnerClockFace(centerX, centerY, e.clientX, e.clientY);
        /* Round angle according to angle step */
        var angleStep = this.unit === TimeUnit.MINUTE ? (6 * (this.minutesGap || 1)) : 30;
        var roundedAngle = isInnerClockChosen
            ? roundAngle(circleAngle, angleStep) + 360
            : roundAngle(circleAngle, angleStep);
        var angle = roundedAngle === 0 ? 360 : roundedAngle;
        var selectedTime = this.faceTime.find(function (val) { return val.angle === angle; });
        if (selectedTime && !selectedTime.disabled) {
            this.timeChange.next(selectedTime);
            /* To let know whether user ended interaction with clock face */
            if (!this.isStarted) {
                this.timeSelected.next(selectedTime.time);
            }
        }
    };
    NgxMaterialTimepickerFaceComponent.prototype.onMouseup = function (e) {
        e.preventDefault();
        this.isStarted = false;
    };
    NgxMaterialTimepickerFaceComponent.prototype.ngOnDestroy = function () {
        this.removeTouchEvents();
    };
    NgxMaterialTimepickerFaceComponent.prototype.addTouchEvents = function () {
        this.touchStartHandler = this.onMousedown.bind(this);
        this.touchEndHandler = this.onMouseup.bind(this);
        this.clockFace.nativeElement.addEventListener('touchstart', this.touchStartHandler);
        this.clockFace.nativeElement.addEventListener('touchend', this.touchEndHandler);
    };
    NgxMaterialTimepickerFaceComponent.prototype.removeTouchEvents = function () {
        this.clockFace.nativeElement.removeEventListener('touchstart', this.touchStartHandler);
        this.clockFace.nativeElement.removeEventListener('touchend', this.touchEndHandler);
    };
    NgxMaterialTimepickerFaceComponent.prototype.setClockHandPosition = function () {
        if (this.format === 24) {
            if (this.selectedTime.time > 12 || this.selectedTime.time === 0) {
                this.decreaseClockHand();
            }
            else {
                this.increaseClockHand();
            }
        }
        this.clockHand.nativeElement.style.transform = "rotate(" + this.selectedTime.angle + "deg)";
    };
    NgxMaterialTimepickerFaceComponent.prototype.selectAvailableTime = function () {
        var _this = this;
        var currentTime = this.faceTime.find(function (time) { return _this.selectedTime.time === time.time; });
        this.isClockFaceDisabled = this.faceTime.every(function (time) { return time.disabled; });
        if ((currentTime && currentTime.disabled) && !this.isClockFaceDisabled) {
            var availableTime = this.faceTime.find(function (time) { return !time.disabled; });
            this.timeChange.next(availableTime);
        }
    };
    NgxMaterialTimepickerFaceComponent.prototype.isInnerClockFace = function (x0, y0, x, y) {
        /* Detect whether time from the inner clock face or not (24 format only) */
        return Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2)) < this.innerClockFaceSize;
    };
    NgxMaterialTimepickerFaceComponent.prototype.decreaseClockHand = function () {
        this.clockHand.nativeElement.style.height = CLOCK_HAND_STYLES.small.height;
        this.clockHand.nativeElement.style.top = CLOCK_HAND_STYLES.small.top;
    };
    NgxMaterialTimepickerFaceComponent.prototype.increaseClockHand = function () {
        this.clockHand.nativeElement.style.height = CLOCK_HAND_STYLES.large.height;
        this.clockHand.nativeElement.style.top = CLOCK_HAND_STYLES.large.top;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], NgxMaterialTimepickerFaceComponent.prototype, "faceTime", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], NgxMaterialTimepickerFaceComponent.prototype, "selectedTime", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], NgxMaterialTimepickerFaceComponent.prototype, "unit", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], NgxMaterialTimepickerFaceComponent.prototype, "format", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], NgxMaterialTimepickerFaceComponent.prototype, "minutesGap", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], NgxMaterialTimepickerFaceComponent.prototype, "timeChange", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], NgxMaterialTimepickerFaceComponent.prototype, "timeSelected", void 0);
    tslib_1.__decorate([
        ViewChild('clockFace', { static: true }),
        tslib_1.__metadata("design:type", ElementRef)
    ], NgxMaterialTimepickerFaceComponent.prototype, "clockFace", void 0);
    tslib_1.__decorate([
        ViewChild('clockHand', { static: true }),
        tslib_1.__metadata("design:type", ElementRef)
    ], NgxMaterialTimepickerFaceComponent.prototype, "clockHand", void 0);
    tslib_1.__decorate([
        HostListener('mousedown', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], NgxMaterialTimepickerFaceComponent.prototype, "onMousedown", null);
    tslib_1.__decorate([
        HostListener('click', ['$event']),
        HostListener('touchmove', ['$event.changedTouches[0]']),
        HostListener('touchend', ['$event.changedTouches[0]']),
        HostListener('mousemove', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], NgxMaterialTimepickerFaceComponent.prototype, "selectTime", null);
    tslib_1.__decorate([
        HostListener('mouseup', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], NgxMaterialTimepickerFaceComponent.prototype, "onMouseup", null);
    NgxMaterialTimepickerFaceComponent = tslib_1.__decorate([
        Component({
            selector: 'ngx-material-timepicker-face',
            template: "<div class=\"clock-face\" #clockFace>\r\n    <div *ngIf=\"unit !== timeUnit.MINUTE;else minutesFace\" class=\"clock-face__container\">\r\n        <div class=\"clock-face__number clock-face__number--outer\"\r\n             [style.transform]=\"'rotateZ('+ time.angle +'deg) translateX(-50%)' | styleSanitizer\"\r\n             *ngFor=\"let time of faceTime | slice: 0 : 12; trackBy: trackByTime\">\r\n\t\t\t<span [style.transform]=\"'rotateZ(-'+ time.angle +'deg)' | styleSanitizer\"\r\n                  [ngClass]=\"{'active': time.time | activeHour: selectedTime.time : isClockFaceDisabled,\r\n                   'disabled': time.disabled}\">\r\n                {{time.time | timeLocalizer: timeUnit.HOUR}}\r\n            </span>\r\n        </div>\r\n        <div class=\"clock-face__inner\" *ngIf=\"faceTime.length > 12\"\r\n             [style.top]=\"'calc(50% - ' + innerClockFaceSize + 'px)'\">\r\n            <div class=\"clock-face__number clock-face__number--inner\"\r\n                 [style.transform]=\"'rotateZ('+ time.angle +'deg) translateX(-50%)' | styleSanitizer\"\r\n                 [style.height.px]=\"innerClockFaceSize\"\r\n                 *ngFor=\"let time of faceTime | slice: 12 : 24; trackBy: trackByTime\">\r\n\t\t\t<span [style.transform]=\"'rotateZ(-'+ time.angle +'deg)' | styleSanitizer\"\r\n                  [ngClass]=\"{'active': time.time | activeHour: selectedTime?.time : isClockFaceDisabled,\r\n                   'disabled': time.disabled}\">\r\n                {{time.time | timeLocalizer: timeUnit.HOUR}}</span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <span class=\"clock-face__clock-hand\" [ngClass]=\"{'clock-face__clock-hand_minute': unit === timeUnit.MINUTE}\"\r\n          #clockHand [hidden]=\"isClockFaceDisabled\"></span>\r\n</div>\r\n<ng-template #minutesFace>\r\n    <div class=\"clock-face__container\">\r\n        <div class=\"clock-face__number clock-face__number--outer\"\r\n             [style.transform]=\"'rotateZ('+ time.angle +'deg) translateX(-50%)' | styleSanitizer\"\r\n             *ngFor=\"let time of faceTime; trackBy: trackByTime\">\r\n\t<span [style.transform]=\"'rotateZ(-'+ time.angle +'deg)' | styleSanitizer\"\r\n          [ngClass]=\"{'active': time.time | activeMinute: selectedTime?.time:minutesGap:isClockFaceDisabled,\r\n           'disabled': time.disabled}\">\r\n\t{{time.time | minutesFormatter: minutesGap | timeLocalizer: timeUnit.MINUTE}}</span>\r\n        </div>\r\n    </div>\r\n</ng-template>\r\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".clock-face{width:290px;height:290px;border-radius:50%;position:relative;display:flex;justify-content:center;padding:20px;box-sizing:border-box;background-color:#f0f0f0}@supports (background-color:var(--clock-face-background-color)){.clock-face{background-color:var(--clock-face-background-color)}}.clock-face__inner{position:absolute}.clock-face__container{margin-left:-2px}.clock-face__number{position:absolute;-webkit-transform-origin:0 100%;transform-origin:0 100%;width:50px;text-align:center;z-index:2}.clock-face__number--outer{height:calc(290px / 2 - 20px)}.clock-face__number--outer>span{font-size:16px;color:#6c6c6c}@supports (color:var(--clock-face-time-inactive-color)){.clock-face__number--outer>span{color:var(--clock-face-time-inactive-color)}}.clock-face__number--inner>span{font-size:14px;color:#929292}@supports (color:var(--clock-face-inner-time-inactive-color)){.clock-face__number--inner>span{color:var(--clock-face-inner-time-inactive-color)}}.clock-face__number>span{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:30px;height:30px;display:flex;justify-content:center;align-items:center;margin:auto;border-radius:50%;font-weight:500;font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.clock-face__number>span{font-family:var(--primary-font-family)}}.clock-face__number>span.active{background-color:#00bfff;color:#fff}@supports (background-color:var(--clock-hand-color)){.clock-face__number>span.active{background-color:var(--clock-hand-color);color:var(--clock-face-time-active-color)}}.clock-face__number>span.disabled{color:#c5c5c5}@supports (color:var(--clock-face-time-disabled-color)){.clock-face__number>span.disabled{color:var(--clock-face-time-disabled-color)}}.clock-face__clock-hand{height:103px;width:2px;-webkit-transform-origin:0 100%;transform-origin:0 100%;position:absolute;top:calc(50% - 103px);z-index:1;background-color:#00bfff}@supports (background-color:var(--clock-hand-color)){.clock-face__clock-hand{background-color:var(--clock-hand-color)}}.clock-face__clock-hand:after{content:'';width:7px;height:7px;border-radius:50%;background-color:inherit;position:absolute;bottom:-3px;left:-3.5px}.clock-face__clock-hand_minute:before{content:'';width:7px;height:7px;background-color:#fff;border-radius:50%;position:absolute;top:-8px;left:calc(50% - 8px);box-sizing:content-box;border:4px solid #00bfff}@supports (border-color:var(--clock-hand-color)){.clock-face__clock-hand_minute:before{border-color:var(--clock-hand-color)}}@media (max-device-width:1023px) and (orientation:landscape){.clock-face{width:225px;height:225px;padding:5px}.clock-face__number--outer{height:calc(225px / 2 - 5px)}.clock-face__clock-hand_minute:before{top:0}}"]
        })
    ], NgxMaterialTimepickerFaceComponent);
    return NgxMaterialTimepickerFaceComponent;
}());
export { NgxMaterialTimepickerFaceComponent };
function roundAngle(angle, step) {
    return Math.round(angle / step) * step;
}
function countAngleByCords(x0, y0, x, y, currentAngle) {
    if (y > y0 && x >= x0) { // II quarter
        return 180 - currentAngle;
    }
    else if (y > y0 && x < x0) { // III quarter
        return 180 + currentAngle;
    }
    else if (y < y0 && x < x0) { // IV quarter
        return 360 - currentAngle;
    }
    else { // I quarter
        return currentAngle;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZmFjZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9jb21wb25lbnRzL3RpbWVwaWNrZXItZmFjZS9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1mYWNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUVILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFFTixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXZELElBQU0saUJBQWlCLEdBQUc7SUFDdEIsS0FBSyxFQUFFO1FBQ0gsTUFBTSxFQUFFLE1BQU07UUFDZCxHQUFHLEVBQUUsa0JBQWtCO0tBQzFCO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsTUFBTSxFQUFFLE9BQU87UUFDZixHQUFHLEVBQUUsbUJBQW1CO0tBQzNCO0NBQ0osQ0FBQztBQVFGO0lBTkE7UUFRSSxhQUFRLEdBQUcsUUFBUSxDQUFDO1FBR3BCLHVCQUFrQixHQUFHLEVBQUUsQ0FBQztRQVFkLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUMvQyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUErSXhELENBQUM7SUF0SUcsNERBQWUsR0FBZjtRQUNJLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsd0RBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQWxDLGlCQWdCQztRQWZHLElBQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1QyxJQUFNLG1CQUFt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LENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztBQUMzQyxDQUFDO0FBRUQsU0FBUyxpQkFBaUIsQ0FBQyxFQUFVLEVBQUUsRUFBVSxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsWUFBb0I7SUFDekYsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBQyxhQUFhO1FBQ2pDLE9BQU8sR0FBRyxHQUFHLFlBQVksQ0FBQztLQUM3QjtTQUFNLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUMsY0FBYztRQUN4QyxPQUFPLEdBQUcsR0FBRyxZQUFZLENBQUM7S0FDN0I7U0FBTSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFDLGFBQWE7UUFDdkMsT0FBTyxHQUFHLEdBQUcsWUFBWSxDQUFDO0tBQzdCO1NBQU0sRUFBQyxZQUFZO1FBQ2hCLE9BQU8sWUFBWSxDQUFDO0tBQ3ZCO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBBZnRlclZpZXdJbml0LFxyXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSG9zdExpc3RlbmVyLFxyXG4gICAgSW5wdXQsXHJcbiAgICBPbkNoYW5nZXMsXHJcbiAgICBPbkRlc3Ryb3ksXHJcbiAgICBPdXRwdXQsXHJcbiAgICBTaW1wbGVDaGFuZ2VzLFxyXG4gICAgVmlld0NoaWxkXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENsb2NrRmFjZVRpbWUgfSBmcm9tICcuLi8uLi9tb2RlbHMvY2xvY2stZmFjZS10aW1lLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFRpbWVVbml0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL3RpbWUtdW5pdC5lbnVtJztcclxuXHJcbmNvbnN0IENMT0NLX0hBTkRfU1RZTEVTID0ge1xyXG4gICAgc21hbGw6IHtcclxuICAgICAgICBoZWlnaHQ6ICc3NXB4JyxcclxuICAgICAgICB0b3A6ICdjYWxjKDUwJSAtIDc1cHgpJ1xyXG4gICAgfSxcclxuICAgIGxhcmdlOiB7XHJcbiAgICAgICAgaGVpZ2h0OiAnMTAzcHgnLFxyXG4gICAgICAgIHRvcDogJ2NhbGMoNTAlIC0gMTAzcHgpJ1xyXG4gICAgfVxyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLWZhY2UnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWZhY2UuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZmFjZS5jb21wb25lbnQuc2NzcyddLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsVGltZXBpY2tlckZhY2VDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XHJcblxyXG4gICAgdGltZVVuaXQgPSBUaW1lVW5pdDtcclxuXHJcbiAgICBpc0Nsb2NrRmFjZURpc2FibGVkOiBib29sZWFuO1xyXG4gICAgaW5uZXJDbG9ja0ZhY2VTaXplID0gODU7XHJcblxyXG4gICAgQElucHV0KCkgZmFjZVRpbWU6IENsb2NrRmFjZVRpbWVbXTtcclxuICAgIEBJbnB1dCgpIHNlbGVjdGVkVGltZTogQ2xvY2tGYWNlVGltZTtcclxuICAgIEBJbnB1dCgpIHVuaXQ6IFRpbWVVbml0O1xyXG4gICAgQElucHV0KCkgZm9ybWF0OiBudW1iZXI7XHJcbiAgICBASW5wdXQoKSBtaW51dGVzR2FwOiBudW1iZXI7XHJcblxyXG4gICAgQE91dHB1dCgpIHRpbWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPENsb2NrRmFjZVRpbWU+KCk7XHJcbiAgICBAT3V0cHV0KCkgdGltZVNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnY2xvY2tGYWNlJywge3N0YXRpYzogdHJ1ZX0pIGNsb2NrRmFjZTogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoJ2Nsb2NrSGFuZCcsIHtzdGF0aWM6IHRydWV9KSBjbG9ja0hhbmQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgcHJpdmF0ZSBpc1N0YXJ0ZWQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIHRvdWNoU3RhcnRIYW5kbGVyOiAoKSA9PiBhbnk7XHJcbiAgICBwcml2YXRlIHRvdWNoRW5kSGFuZGxlcjogKCkgPT4gYW55O1xyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICB0aGlzLnNldENsb2NrSGFuZFBvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5hZGRUb3VjaEV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgICAgICBjb25zdCBmYWNlVGltZUNoYW5nZXMgPSBjaGFuZ2VzWydmYWNlVGltZSddO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVGltZUNoYW5nZXMgPSBjaGFuZ2VzWydzZWxlY3RlZFRpbWUnXTtcclxuXHJcbiAgICAgICAgaWYgKChmYWNlVGltZUNoYW5nZXMgJiYgZmFjZVRpbWVDaGFuZ2VzLmN1cnJlbnRWYWx1ZSlcclxuICAgICAgICAgICAgJiYgKHNlbGVjdGVkVGltZUNoYW5nZXMgJiYgc2VsZWN0ZWRUaW1lQ2hhbmdlcy5jdXJyZW50VmFsdWUpKSB7XHJcbiAgICAgICAgICAgIC8qIFNldCB0aW1lIGFjY29yZGluZyB0byBwYXNzZWQgYW4gaW5wdXQgdmFsdWUgKi9cclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRpbWUgPSB0aGlzLmZhY2VUaW1lLmZpbmQodGltZSA9PiB0aW1lLnRpbWUgPT09IHRoaXMuc2VsZWN0ZWRUaW1lLnRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2VsZWN0ZWRUaW1lQ2hhbmdlcyAmJiBzZWxlY3RlZFRpbWVDaGFuZ2VzLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldENsb2NrSGFuZFBvc2l0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChmYWNlVGltZUNoYW5nZXMgJiYgZmFjZVRpbWVDaGFuZ2VzLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAgICAgICAvLyBUbyBhdm9pZCBhbiBlcnJvciBFeHByZXNzaW9uQ2hhbmdlZEFmdGVySXRIYXNCZWVuQ2hlY2tlZEVycm9yXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zZWxlY3RBdmFpbGFibGVUaW1lKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgdHJhY2tCeVRpbWUoXywgdGltZTogQ2xvY2tGYWNlVGltZSk6IHN0cmluZyB8IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRpbWUudGltZTtcclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nLCBbJyRldmVudCddKVxyXG4gICAgb25Nb3VzZWRvd24oZTogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdGhpcy5pc1N0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcclxuICAgIEBIb3N0TGlzdGVuZXIoJ3RvdWNobW92ZScsIFsnJGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdJ10pXHJcbiAgICBASG9zdExpc3RlbmVyKCd0b3VjaGVuZCcsIFsnJGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdJ10pXHJcbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZW1vdmUnLCBbJyRldmVudCddKVxyXG4gICAgc2VsZWN0VGltZShlOiBNb3VzZUV2ZW50IHwgVG91Y2gpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RhcnRlZCAmJiAoZSBpbnN0YW5jZW9mIE1vdXNlRXZlbnQgJiYgZS50eXBlICE9PSAnY2xpY2snKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNsb2NrRmFjZUNvcmRzID0gdGhpcy5jbG9ja0ZhY2UubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgLyogR2V0IHgwIGFuZCB5MCBvZiB0aGUgY2lyY2xlICovXHJcbiAgICAgICAgY29uc3QgY2VudGVyWCA9IGNsb2NrRmFjZUNvcmRzLmxlZnQgKyBjbG9ja0ZhY2VDb3Jkcy53aWR0aCAvIDI7XHJcbiAgICAgICAgY29uc3QgY2VudGVyWSA9IGNsb2NrRmFjZUNvcmRzLnRvcCArIGNsb2NrRmFjZUNvcmRzLmhlaWdodCAvIDI7XHJcbiAgICAgICAgLyogQ291bnRpbmcgdGhlIGFyY3RhbmdlbnQgYW5kIGNvbnZlcnQgaXQgdG8gZnJvbSByYWRpYW4gdG8gZGVnICovXHJcbiAgICAgICAgY29uc3QgYXJjdGFuZ2VudCA9IE1hdGguYXRhbihNYXRoLmFicyhlLmNsaWVudFggLSBjZW50ZXJYKSAvIE1hdGguYWJzKGUuY2xpZW50WSAtIGNlbnRlclkpKSAqIDE4MCAvIE1hdGguUEk7XHJcbiAgICAgICAgLyogR2V0IGFuZ2xlIGFjY29yZGluZyB0byBxdWFkcmFudCAqL1xyXG4gICAgICAgIGNvbnN0IGNpcmNsZUFuZ2xlID0gY291bnRBbmdsZUJ5Q29yZHMoY2VudGVyWCwgY2VudGVyWSwgZS5jbGllbnRYLCBlLmNsaWVudFksIGFyY3RhbmdlbnQpO1xyXG4gICAgICAgIC8qIENoZWNrIGlmIHNlbGVjdGVkIHRpbWUgZnJvbSB0aGUgaW5uZXIgY2xvY2sgZmFjZSAoMjQgaG91cnMgZm9ybWF0IG9ubHkpICovXHJcbiAgICAgICAgY29uc3QgaXNJbm5lckNsb2NrQ2hvc2VuID0gdGhpcy5mb3JtYXQgJiYgdGhpcy5pc0lubmVyQ2xvY2tGYWNlKGNlbnRlclgsIGNlbnRlclksIGUuY2xpZW50WCwgZS5jbGllbnRZKTtcclxuICAgICAgICAvKiBSb3VuZCBhbmdsZSBhY2NvcmRpbmcgdG8gYW5nbGUgc3RlcCAqL1xyXG4gICAgICAgIGNvbnN0IGFuZ2xlU3RlcCA9IHRoaXMudW5pdCA9PT0gVGltZVVuaXQuTUlOVVRFID8gKDYgKiAodGhpcy5taW51dGVzR2FwIHx8IDEpKSA6IDMwO1xyXG4gICAgICAgIGNvbnN0IHJvdW5kZWRBbmdsZSA9IGlzSW5uZXJDbG9ja0Nob3NlblxyXG4gICAgICAgICAgICA/IHJvdW5kQW5nbGUoY2lyY2xlQW5nbGUsIGFuZ2xlU3RlcCkgKyAzNjBcclxuICAgICAgICAgICAgOiByb3VuZEFuZ2xlKGNpcmNsZUFuZ2xlLCBhbmdsZVN0ZXApO1xyXG4gICAgICAgIGNvbnN0IGFuZ2xlID0gcm91bmRlZEFuZ2xlID09PSAwID8gMzYwIDogcm91bmRlZEFuZ2xlO1xyXG5cclxuICAgICAgICBjb25zdCBzZWxlY3RlZFRpbWUgPSB0aGlzLmZhY2VUaW1lLmZpbmQodmFsID0+IHZhbC5hbmdsZSA9PT0gYW5nbGUpO1xyXG5cclxuICAgICAgICBpZiAoc2VsZWN0ZWRUaW1lICYmICFzZWxlY3RlZFRpbWUuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lQ2hhbmdlLm5leHQoc2VsZWN0ZWRUaW1lKTtcclxuXHJcbiAgICAgICAgICAgIC8qIFRvIGxldCBrbm93IHdoZXRoZXIgdXNlciBlbmRlZCBpbnRlcmFjdGlvbiB3aXRoIGNsb2NrIGZhY2UgKi9cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzU3RhcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lU2VsZWN0ZWQubmV4dChzZWxlY3RlZFRpbWUudGltZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNldXAnLCBbJyRldmVudCddKVxyXG4gICAgb25Nb3VzZXVwKGU6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHRoaXMuaXNTdGFydGVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVUb3VjaEV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkVG91Y2hFdmVudHMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50b3VjaFN0YXJ0SGFuZGxlciA9IHRoaXMub25Nb3VzZWRvd24uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnRvdWNoRW5kSGFuZGxlciA9IHRoaXMub25Nb3VzZXVwLmJpbmQodGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuY2xvY2tGYWNlLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMudG91Y2hTdGFydEhhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMuY2xvY2tGYWNlLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnRvdWNoRW5kSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW1vdmVUb3VjaEV2ZW50cygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNsb2NrRmFjZS5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLnRvdWNoU3RhcnRIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLmNsb2NrRmFjZS5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy50b3VjaEVuZEhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0Q2xvY2tIYW5kUG9zaXRpb24oKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybWF0ID09PSAyNCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFRpbWUudGltZSA+IDEyIHx8IHRoaXMuc2VsZWN0ZWRUaW1lLnRpbWUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVjcmVhc2VDbG9ja0hhbmQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5jcmVhc2VDbG9ja0hhbmQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jbG9ja0hhbmQubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7dGhpcy5zZWxlY3RlZFRpbWUuYW5nbGV9ZGVnKWA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZWxlY3RBdmFpbGFibGVUaW1lKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gdGhpcy5mYWNlVGltZS5maW5kKHRpbWUgPT4gdGhpcy5zZWxlY3RlZFRpbWUudGltZSA9PT0gdGltZS50aW1lKTtcclxuICAgICAgICB0aGlzLmlzQ2xvY2tGYWNlRGlzYWJsZWQgPSB0aGlzLmZhY2VUaW1lLmV2ZXJ5KHRpbWUgPT4gdGltZS5kaXNhYmxlZCk7XHJcblxyXG4gICAgICAgIGlmICgoY3VycmVudFRpbWUgJiYgY3VycmVudFRpbWUuZGlzYWJsZWQpICYmICF0aGlzLmlzQ2xvY2tGYWNlRGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgY29uc3QgYXZhaWxhYmxlVGltZSA9IHRoaXMuZmFjZVRpbWUuZmluZCh0aW1lID0+ICF0aW1lLmRpc2FibGVkKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudGltZUNoYW5nZS5uZXh0KGF2YWlsYWJsZVRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzSW5uZXJDbG9ja0ZhY2UoeDA6IG51bWJlciwgeTA6IG51bWJlciwgeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICAvKiBEZXRlY3Qgd2hldGhlciB0aW1lIGZyb20gdGhlIGlubmVyIGNsb2NrIGZhY2Ugb3Igbm90ICgyNCBmb3JtYXQgb25seSkgKi9cclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHggLSB4MCwgMikgKyBNYXRoLnBvdyh5IC0geTAsIDIpKSA8IHRoaXMuaW5uZXJDbG9ja0ZhY2VTaXplO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGVjcmVhc2VDbG9ja0hhbmQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jbG9ja0hhbmQubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBDTE9DS19IQU5EX1NUWUxFUy5zbWFsbC5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5jbG9ja0hhbmQubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSBDTE9DS19IQU5EX1NUWUxFUy5zbWFsbC50b3A7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbmNyZWFzZUNsb2NrSGFuZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNsb2NrSGFuZC5uYXRpdmVFbGVtZW50LnN0eWxlLmhlaWdodCA9IENMT0NLX0hBTkRfU1RZTEVTLmxhcmdlLmhlaWdodDtcclxuICAgICAgICB0aGlzLmNsb2NrSGFuZC5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IENMT0NLX0hBTkRfU1RZTEVTLmxhcmdlLnRvcDtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcm91bmRBbmdsZShhbmdsZTogbnVtYmVyLCBzdGVwOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1hdGgucm91bmQoYW5nbGUgLyBzdGVwKSAqIHN0ZXA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvdW50QW5nbGVCeUNvcmRzKHgwOiBudW1iZXIsIHkwOiBudW1iZXIsIHg6IG51bWJlciwgeTogbnVtYmVyLCBjdXJyZW50QW5nbGU6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICBpZiAoeSA+IHkwICYmIHggPj0geDApIHsvLyBJSSBxdWFydGVyXHJcbiAgICAgICAgcmV0dXJuIDE4MCAtIGN1cnJlbnRBbmdsZTtcclxuICAgIH0gZWxzZSBpZiAoeSA+IHkwICYmIHggPCB4MCkgey8vIElJSSBxdWFydGVyXHJcbiAgICAgICAgcmV0dXJuIDE4MCArIGN1cnJlbnRBbmdsZTtcclxuICAgIH0gZWxzZSBpZiAoeSA8IHkwICYmIHggPCB4MCkgey8vIElWIHF1YXJ0ZXJcclxuICAgICAgICByZXR1cm4gMzYwIC0gY3VycmVudEFuZ2xlO1xyXG4gICAgfSBlbHNlIHsvLyBJIHF1YXJ0ZXJcclxuICAgICAgICByZXR1cm4gY3VycmVudEFuZ2xlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==