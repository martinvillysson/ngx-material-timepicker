import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { TimeUnit } from '../../models/time-unit.enum';
const CLOCK_HAND_STYLES = {
    small: {
        height: '75px',
        top: 'calc(50% - 75px)'
    },
    large: {
        height: '103px',
        top: 'calc(50% - 103px)'
    }
};
export class NgxMaterialTimepickerFaceComponent {
    constructor() {
        this.timeUnit = TimeUnit;
        this.innerClockFaceSize = 85;
        this.timeChange = new EventEmitter();
        this.timeSelected = new EventEmitter();
    }
    ngAfterViewInit() {
        this.setClockHandPosition();
        this.addTouchEvents();
    }
    ngOnChanges(changes) {
        const faceTimeChanges = changes['faceTime'];
        const selectedTimeChanges = changes['selectedTime'];
        if ((faceTimeChanges && faceTimeChanges.currentValue)
            && (selectedTimeChanges && selectedTimeChanges.currentValue)) {
            /* Set time according to passed an input value */
            this.selectedTime = this.faceTime.find(time => time.time === this.selectedTime.time);
        }
        if (selectedTimeChanges && selectedTimeChanges.currentValue) {
            this.setClockHandPosition();
        }
        if (faceTimeChanges && faceTimeChanges.currentValue) {
            // To avoid an error ExpressionChangedAfterItHasBeenCheckedError
            setTimeout(() => this.selectAvailableTime());
        }
    }
    trackByTime(_, time) {
        return time.time;
    }
    onMousedown(e) {
        e.preventDefault();
        this.isStarted = true;
    }
    selectTime(e) {
        if (!this.isStarted && (e instanceof MouseEvent && e.type !== 'click')) {
            return;
        }
        const clockFaceCords = this.clockFace.nativeElement.getBoundingClientRect();
        /* Get x0 and y0 of the circle */
        const centerX = clockFaceCords.left + clockFaceCords.width / 2;
        const centerY = clockFaceCords.top + clockFaceCords.height / 2;
        /* Counting the arctangent and convert it to from radian to deg */
        const arctangent = Math.atan(Math.abs(e.clientX - centerX) / Math.abs(e.clientY - centerY)) * 180 / Math.PI;
        /* Get angle according to quadrant */
        const circleAngle = countAngleByCords(centerX, centerY, e.clientX, e.clientY, arctangent);
        /* Check if selected time from the inner clock face (24 hours format only) */
        const isInnerClockChosen = this.format && this.isInnerClockFace(centerX, centerY, e.clientX, e.clientY);
        /* Round angle according to angle step */
        const angleStep = this.unit === TimeUnit.MINUTE ? (6 * (this.minutesGap || 1)) : 30;
        const roundedAngle = isInnerClockChosen
            ? roundAngle(circleAngle, angleStep) + 360
            : roundAngle(circleAngle, angleStep);
        const angle = roundedAngle === 0 ? 360 : roundedAngle;
        const selectedTime = this.faceTime.find(val => val.angle === angle);
        if (selectedTime && !selectedTime.disabled) {
            this.timeChange.next(selectedTime);
            /* To let know whether user ended interaction with clock face */
            if (!this.isStarted) {
                this.timeSelected.next(selectedTime.time);
            }
        }
    }
    onMouseup(e) {
        e.preventDefault();
        this.isStarted = false;
    }
    ngOnDestroy() {
        this.removeTouchEvents();
    }
    addTouchEvents() {
        this.touchStartHandler = this.onMousedown.bind(this);
        this.touchEndHandler = this.onMouseup.bind(this);
        this.clockFace.nativeElement.addEventListener('touchstart', this.touchStartHandler);
        this.clockFace.nativeElement.addEventListener('touchend', this.touchEndHandler);
    }
    removeTouchEvents() {
        this.clockFace.nativeElement.removeEventListener('touchstart', this.touchStartHandler);
        this.clockFace.nativeElement.removeEventListener('touchend', this.touchEndHandler);
    }
    setClockHandPosition() {
        if (this.format === 24) {
            if (this.selectedTime.time > 12 || this.selectedTime.time === 0) {
                this.decreaseClockHand();
            }
            else {
                this.increaseClockHand();
            }
        }
        this.clockHand.nativeElement.style.transform = `rotate(${this.selectedTime.angle}deg)`;
    }
    selectAvailableTime() {
        const currentTime = this.faceTime.find(time => this.selectedTime.time === time.time);
        this.isClockFaceDisabled = this.faceTime.every(time => time.disabled);
        if ((currentTime && currentTime.disabled) && !this.isClockFaceDisabled) {
            const availableTime = this.faceTime.find(time => !time.disabled);
            this.timeChange.next(availableTime);
        }
    }
    isInnerClockFace(x0, y0, x, y) {
        /* Detect whether time from the inner clock face or not (24 format only) */
        return Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2)) < this.innerClockFaceSize;
    }
    decreaseClockHand() {
        this.clockHand.nativeElement.style.height = CLOCK_HAND_STYLES.small.height;
        this.clockHand.nativeElement.style.top = CLOCK_HAND_STYLES.small.top;
    }
    increaseClockHand() {
        this.clockHand.nativeElement.style.height = CLOCK_HAND_STYLES.large.height;
        this.clockHand.nativeElement.style.top = CLOCK_HAND_STYLES.large.top;
    }
}
NgxMaterialTimepickerFaceComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker-face',
                template: "<div class=\"clock-face\" #clockFace>\r\n    <div *ngIf=\"unit !== timeUnit.MINUTE;else minutesFace\" class=\"clock-face__container\">\r\n        <div class=\"clock-face__number clock-face__number--outer\"\r\n             [style.transform]=\"'rotateZ('+ time.angle +'deg) translateX(-50%)' | styleSanitizer\"\r\n             *ngFor=\"let time of faceTime | slice: 0 : 12; trackBy: trackByTime\">\r\n\t\t\t<span [style.transform]=\"'rotateZ(-'+ time.angle +'deg)' | styleSanitizer\"\r\n                  [ngClass]=\"{'active': time.time | activeHour: selectedTime.time : isClockFaceDisabled,\r\n                   'disabled': time.disabled}\">\r\n                {{time.time | timeLocalizer: timeUnit.HOUR}}\r\n            </span>\r\n        </div>\r\n        <div class=\"clock-face__inner\" *ngIf=\"faceTime.length > 12\"\r\n             [style.top]=\"'calc(50% - ' + innerClockFaceSize + 'px)'\">\r\n            <div class=\"clock-face__number clock-face__number--inner\"\r\n                 [style.transform]=\"'rotateZ('+ time.angle +'deg) translateX(-50%)' | styleSanitizer\"\r\n                 [style.height.px]=\"innerClockFaceSize\"\r\n                 *ngFor=\"let time of faceTime | slice: 12 : 24; trackBy: trackByTime\">\r\n\t\t\t<span [style.transform]=\"'rotateZ(-'+ time.angle +'deg)' | styleSanitizer\"\r\n                  [ngClass]=\"{'active': time.time | activeHour: selectedTime?.time : isClockFaceDisabled,\r\n                   'disabled': time.disabled}\">\r\n                {{time.time | timeLocalizer: timeUnit.HOUR}}</span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <span class=\"clock-face__clock-hand\" [ngClass]=\"{'clock-face__clock-hand_minute': unit === timeUnit.MINUTE}\"\r\n          #clockHand [hidden]=\"isClockFaceDisabled\"></span>\r\n</div>\r\n<ng-template #minutesFace>\r\n    <div class=\"clock-face__container\">\r\n        <div class=\"clock-face__number clock-face__number--outer\"\r\n             [style.transform]=\"'rotateZ('+ time.angle +'deg) translateX(-50%)' | styleSanitizer\"\r\n             *ngFor=\"let time of faceTime; trackBy: trackByTime\">\r\n\t<span [style.transform]=\"'rotateZ(-'+ time.angle +'deg)' | styleSanitizer\"\r\n          [ngClass]=\"{'active': time.time | activeMinute: selectedTime?.time:minutesGap:isClockFaceDisabled,\r\n           'disabled': time.disabled}\">\r\n\t{{time.time | minutesFormatter: minutesGap | timeLocalizer: timeUnit.MINUTE}}</span>\r\n        </div>\r\n    </div>\r\n</ng-template>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".clock-face{background-color:#f0f0f0;border-radius:50%;box-sizing:border-box;display:flex;height:290px;justify-content:center;padding:20px;position:relative;width:290px}@supports (background-color:var(--clock-face-background-color)){.clock-face{background-color:var(--clock-face-background-color)}}.clock-face__inner{position:absolute}.clock-face__container{margin-left:-2px}.clock-face__number{position:absolute;text-align:center;transform-origin:0 100%;width:50px;z-index:2}.clock-face__number--outer{height:125px}.clock-face__number--outer>span{color:#6c6c6c;font-size:16px}@supports (color:var(--clock-face-time-inactive-color)){.clock-face__number--outer>span{color:var(--clock-face-time-inactive-color)}}.clock-face__number--inner>span{color:#929292;font-size:14px}@supports (color:var(--clock-face-inner-time-inactive-color)){.clock-face__number--inner>span{color:var(--clock-face-inner-time-inactive-color)}}.clock-face__number>span{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;align-items:center;border-radius:50%;display:flex;font-family:Roboto,sans-serif;font-weight:500;height:30px;justify-content:center;margin:auto;user-select:none;width:30px}@supports (font-family:var(--primary-font-family)){.clock-face__number>span{font-family:var(--primary-font-family)}}.clock-face__number>span.active{background-color:#00bfff;color:#fff}@supports (background-color:var(--clock-hand-color)){.clock-face__number>span.active{background-color:var(--clock-hand-color);color:var(--clock-face-time-active-color)}}.clock-face__number>span.disabled{color:#c5c5c5}@supports (color:var(--clock-face-time-disabled-color)){.clock-face__number>span.disabled{color:var(--clock-face-time-disabled-color)}}.clock-face__clock-hand{background-color:#00bfff;height:103px;position:absolute;top:calc(50% - 103px);transform-origin:0 100%;width:2px;z-index:1}@supports (background-color:var(--clock-hand-color)){.clock-face__clock-hand{background-color:var(--clock-hand-color)}}.clock-face__clock-hand:after{background-color:inherit;border-radius:50%;bottom:-3px;content:\"\";height:7px;left:-3.5px;position:absolute;width:7px}.clock-face__clock-hand_minute:before{background-color:#fff;border:4px solid #00bfff;border-radius:50%;box-sizing:content-box;content:\"\";height:7px;left:calc(50% - 8px);position:absolute;top:-8px;width:7px}@supports (border-color:var(--clock-hand-color)){.clock-face__clock-hand_minute:before{border-color:var(--clock-hand-color)}}@media (max-device-width:1023px) and (orientation:landscape){.clock-face{height:225px;padding:5px;width:225px}.clock-face__number--outer{height:107.5px}.clock-face__clock-hand_minute:before{top:0}}"]
            },] }
];
NgxMaterialTimepickerFaceComponent.propDecorators = {
    faceTime: [{ type: Input }],
    selectedTime: [{ type: Input }],
    unit: [{ type: Input }],
    format: [{ type: Input }],
    minutesGap: [{ type: Input }],
    timeChange: [{ type: Output }],
    timeSelected: [{ type: Output }],
    clockFace: [{ type: ViewChild, args: ['clockFace', { static: true },] }],
    clockHand: [{ type: ViewChild, args: ['clockHand', { static: true },] }],
    onMousedown: [{ type: HostListener, args: ['mousedown', ['$event'],] }],
    selectTime: [{ type: HostListener, args: ['click', ['$event'],] }, { type: HostListener, args: ['touchmove', ['$event.changedTouches[0]'],] }, { type: HostListener, args: ['touchend', ['$event.changedTouches[0]'],] }, { type: HostListener, args: ['mousemove', ['$event'],] }],
    onMouseup: [{ type: HostListener, args: ['mouseup', ['$event'],] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZmFjZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvY29tcG9uZW50cy90aW1lcGlja2VyLWZhY2Uvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZmFjZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVILHVCQUF1QixFQUN2QixTQUFTLEVBRVQsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUVOLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFdkQsTUFBTSxpQkFBaUIsR0FBRztJQUN0QixLQUFLLEVBQUU7UUFDSCxNQUFNLEVBQUUsTUFBTTtRQUNkLEdBQUcsRUFBRSxrQkFBa0I7S0FDMUI7SUFDRCxLQUFLLEVBQUU7UUFDSCxNQUFNLEVBQUUsT0FBTztRQUNmLEdBQUcsRUFBRSxtQkFBbUI7S0FDM0I7Q0FDSixDQUFDO0FBUUYsTUFBTSxPQUFPLGtDQUFrQztJQU4vQztRQVFJLGFBQVEsR0FBRyxRQUFRLENBQUM7UUFHcEIsdUJBQWtCLEdBQUcsRUFBRSxDQUFDO1FBUWQsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO1FBQy9DLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQStJeEQsQ0FBQztJQXRJRyxlQUFlO1FBQ1gsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDOUIsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sbUJBQW1CLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FB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bXBvcnQge1xyXG4gICAgQWZ0ZXJWaWV3SW5pdCxcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgRWxlbWVudFJlZixcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIEhvc3RMaXN0ZW5lcixcclxuICAgIElucHV0LFxyXG4gICAgT25DaGFuZ2VzLFxyXG4gICAgT25EZXN0cm95LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgU2ltcGxlQ2hhbmdlcyxcclxuICAgIFZpZXdDaGlsZFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDbG9ja0ZhY2VUaW1lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2Nsb2NrLWZhY2UtdGltZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBUaW1lVW5pdCB9IGZyb20gJy4uLy4uL21vZGVscy90aW1lLXVuaXQuZW51bSc7XHJcblxyXG5jb25zdCBDTE9DS19IQU5EX1NUWUxFUyA9IHtcclxuICAgIHNtYWxsOiB7XHJcbiAgICAgICAgaGVpZ2h0OiAnNzVweCcsXHJcbiAgICAgICAgdG9wOiAnY2FsYyg1MCUgLSA3NXB4KSdcclxuICAgIH0sXHJcbiAgICBsYXJnZToge1xyXG4gICAgICAgIGhlaWdodDogJzEwM3B4JyxcclxuICAgICAgICB0b3A6ICdjYWxjKDUwJSAtIDEwM3B4KSdcclxuICAgIH1cclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1mYWNlJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1mYWNlLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWZhY2UuY29tcG9uZW50LnNjc3MnXSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJGYWNlQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG5cclxuICAgIHRpbWVVbml0ID0gVGltZVVuaXQ7XHJcblxyXG4gICAgaXNDbG9ja0ZhY2VEaXNhYmxlZDogYm9vbGVhbjtcclxuICAgIGlubmVyQ2xvY2tGYWNlU2l6ZSA9IDg1O1xyXG5cclxuICAgIEBJbnB1dCgpIGZhY2VUaW1lOiBDbG9ja0ZhY2VUaW1lW107XHJcbiAgICBASW5wdXQoKSBzZWxlY3RlZFRpbWU6IENsb2NrRmFjZVRpbWU7XHJcbiAgICBASW5wdXQoKSB1bml0OiBUaW1lVW5pdDtcclxuICAgIEBJbnB1dCgpIGZvcm1hdDogbnVtYmVyO1xyXG4gICAgQElucHV0KCkgbWludXRlc0dhcDogbnVtYmVyO1xyXG5cclxuICAgIEBPdXRwdXQoKSB0aW1lQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxDbG9ja0ZhY2VUaW1lPigpO1xyXG4gICAgQE91dHB1dCgpIHRpbWVTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ2Nsb2NrRmFjZScsIHtzdGF0aWM6IHRydWV9KSBjbG9ja0ZhY2U6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKCdjbG9ja0hhbmQnLCB7c3RhdGljOiB0cnVlfSkgY2xvY2tIYW5kOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIHByaXZhdGUgaXNTdGFydGVkOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSB0b3VjaFN0YXJ0SGFuZGxlcjogKCkgPT4gYW55O1xyXG4gICAgcHJpdmF0ZSB0b3VjaEVuZEhhbmRsZXI6ICgpID0+IGFueTtcclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRDbG9ja0hhbmRQb3NpdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYWRkVG91Y2hFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICAgICAgY29uc3QgZmFjZVRpbWVDaGFuZ2VzID0gY2hhbmdlc1snZmFjZVRpbWUnXTtcclxuICAgICAgICBjb25zdCBzZWxlY3RlZFRpbWVDaGFuZ2VzID0gY2hhbmdlc1snc2VsZWN0ZWRUaW1lJ107XHJcblxyXG4gICAgICAgIGlmICgoZmFjZVRpbWVDaGFuZ2VzICYmIGZhY2VUaW1lQ2hhbmdlcy5jdXJyZW50VmFsdWUpXHJcbiAgICAgICAgICAgICYmIChzZWxlY3RlZFRpbWVDaGFuZ2VzICYmIHNlbGVjdGVkVGltZUNoYW5nZXMuY3VycmVudFZhbHVlKSkge1xyXG4gICAgICAgICAgICAvKiBTZXQgdGltZSBhY2NvcmRpbmcgdG8gcGFzc2VkIGFuIGlucHV0IHZhbHVlICovXHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUaW1lID0gdGhpcy5mYWNlVGltZS5maW5kKHRpbWUgPT4gdGltZS50aW1lID09PSB0aGlzLnNlbGVjdGVkVGltZS50aW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkVGltZUNoYW5nZXMgJiYgc2VsZWN0ZWRUaW1lQ2hhbmdlcy5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRDbG9ja0hhbmRQb3NpdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZmFjZVRpbWVDaGFuZ2VzICYmIGZhY2VUaW1lQ2hhbmdlcy5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgICAgICAgLy8gVG8gYXZvaWQgYW4gZXJyb3IgRXhwcmVzc2lvbkNoYW5nZWRBZnRlckl0SGFzQmVlbkNoZWNrZWRFcnJvclxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2VsZWN0QXZhaWxhYmxlVGltZSgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHRyYWNrQnlUaW1lKF8sIHRpbWU6IENsb2NrRmFjZVRpbWUpOiBzdHJpbmcgfCBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aW1lLnRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJywgWyckZXZlbnQnXSlcclxuICAgIG9uTW91c2Vkb3duKGU6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHRoaXMuaXNTdGFydGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXHJcbiAgICBASG9zdExpc3RlbmVyKCd0b3VjaG1vdmUnLCBbJyRldmVudC5jaGFuZ2VkVG91Y2hlc1swXSddKVxyXG4gICAgQEhvc3RMaXN0ZW5lcigndG91Y2hlbmQnLCBbJyRldmVudC5jaGFuZ2VkVG91Y2hlc1swXSddKVxyXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2Vtb3ZlJywgWyckZXZlbnQnXSlcclxuICAgIHNlbGVjdFRpbWUoZTogTW91c2VFdmVudCB8IFRvdWNoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5pc1N0YXJ0ZWQgJiYgKGUgaW5zdGFuY2VvZiBNb3VzZUV2ZW50ICYmIGUudHlwZSAhPT0gJ2NsaWNrJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjbG9ja0ZhY2VDb3JkcyA9IHRoaXMuY2xvY2tGYWNlLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICAgIC8qIEdldCB4MCBhbmQgeTAgb2YgdGhlIGNpcmNsZSAqL1xyXG4gICAgICAgIGNvbnN0IGNlbnRlclggPSBjbG9ja0ZhY2VDb3Jkcy5sZWZ0ICsgY2xvY2tGYWNlQ29yZHMud2lkdGggLyAyO1xyXG4gICAgICAgIGNvbnN0IGNlbnRlclkgPSBjbG9ja0ZhY2VDb3Jkcy50b3AgKyBjbG9ja0ZhY2VDb3Jkcy5oZWlnaHQgLyAyO1xyXG4gICAgICAgIC8qIENvdW50aW5nIHRoZSBhcmN0YW5nZW50IGFuZCBjb252ZXJ0IGl0IHRvIGZyb20gcmFkaWFuIHRvIGRlZyAqL1xyXG4gICAgICAgIGNvbnN0IGFyY3RhbmdlbnQgPSBNYXRoLmF0YW4oTWF0aC5hYnMoZS5jbGllbnRYIC0gY2VudGVyWCkgLyBNYXRoLmFicyhlLmNsaWVudFkgLSBjZW50ZXJZKSkgKiAxODAgLyBNYXRoLlBJO1xyXG4gICAgICAgIC8qIEdldCBhbmdsZSBhY2NvcmRpbmcgdG8gcXVhZHJhbnQgKi9cclxuICAgICAgICBjb25zdCBjaXJjbGVBbmdsZSA9IGNvdW50QW5nbGVCeUNvcmRzKGNlbnRlclgsIGNlbnRlclksIGUuY2xpZW50WCwgZS5jbGllbnRZLCBhcmN0YW5nZW50KTtcclxuICAgICAgICAvKiBDaGVjayBpZiBzZWxlY3RlZCB0aW1lIGZyb20gdGhlIGlubmVyIGNsb2NrIGZhY2UgKDI0IGhvdXJzIGZvcm1hdCBvbmx5KSAqL1xyXG4gICAgICAgIGNvbnN0IGlzSW5uZXJDbG9ja0Nob3NlbiA9IHRoaXMuZm9ybWF0ICYmIHRoaXMuaXNJbm5lckNsb2NrRmFjZShjZW50ZXJYLCBjZW50ZXJZLCBlLmNsaWVudFgsIGUuY2xpZW50WSk7XHJcbiAgICAgICAgLyogUm91bmQgYW5nbGUgYWNjb3JkaW5nIHRvIGFuZ2xlIHN0ZXAgKi9cclxuICAgICAgICBjb25zdCBhbmdsZVN0ZXAgPSB0aGlzLnVuaXQgPT09IFRpbWVVbml0Lk1JTlVURSA/ICg2ICogKHRoaXMubWludXRlc0dhcCB8fCAxKSkgOiAzMDtcclxuICAgICAgICBjb25zdCByb3VuZGVkQW5nbGUgPSBpc0lubmVyQ2xvY2tDaG9zZW5cclxuICAgICAgICAgICAgPyByb3VuZEFuZ2xlKGNpcmNsZUFuZ2xlLCBhbmdsZVN0ZXApICsgMzYwXHJcbiAgICAgICAgICAgIDogcm91bmRBbmdsZShjaXJjbGVBbmdsZSwgYW5nbGVTdGVwKTtcclxuICAgICAgICBjb25zdCBhbmdsZSA9IHJvdW5kZWRBbmdsZSA9PT0gMCA/IDM2MCA6IHJvdW5kZWRBbmdsZTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRUaW1lID0gdGhpcy5mYWNlVGltZS5maW5kKHZhbCA9PiB2YWwuYW5nbGUgPT09IGFuZ2xlKTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGVjdGVkVGltZSAmJiAhc2VsZWN0ZWRUaW1lLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZUNoYW5nZS5uZXh0KHNlbGVjdGVkVGltZSk7XHJcblxyXG4gICAgICAgICAgICAvKiBUbyBsZXQga25vdyB3aGV0aGVyIHVzZXIgZW5kZWQgaW50ZXJhY3Rpb24gd2l0aCBjbG9jayBmYWNlICovXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1N0YXJ0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZVNlbGVjdGVkLm5leHQoc2VsZWN0ZWRUaW1lLnRpbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZXVwJywgWyckZXZlbnQnXSlcclxuICAgIG9uTW91c2V1cChlOiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB0aGlzLmlzU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlVG91Y2hFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZFRvdWNoRXZlbnRzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudG91Y2hTdGFydEhhbmRsZXIgPSB0aGlzLm9uTW91c2Vkb3duLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy50b3VjaEVuZEhhbmRsZXIgPSB0aGlzLm9uTW91c2V1cC5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLmNsb2NrRmFjZS5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLnRvdWNoU3RhcnRIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLmNsb2NrRmFjZS5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy50b3VjaEVuZEhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlVG91Y2hFdmVudHMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jbG9ja0ZhY2UubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy50b3VjaFN0YXJ0SGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5jbG9ja0ZhY2UubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudG91Y2hFbmRIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldENsb2NrSGFuZFBvc2l0aW9uKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmZvcm1hdCA9PT0gMjQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRUaW1lLnRpbWUgPiAxMiB8fCB0aGlzLnNlbGVjdGVkVGltZS50aW1lID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlY3JlYXNlQ2xvY2tIYW5kKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluY3JlYXNlQ2xvY2tIYW5kKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2xvY2tIYW5kLm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke3RoaXMuc2VsZWN0ZWRUaW1lLmFuZ2xlfWRlZylgO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VsZWN0QXZhaWxhYmxlVGltZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IHRoaXMuZmFjZVRpbWUuZmluZCh0aW1lID0+IHRoaXMuc2VsZWN0ZWRUaW1lLnRpbWUgPT09IHRpbWUudGltZSk7XHJcbiAgICAgICAgdGhpcy5pc0Nsb2NrRmFjZURpc2FibGVkID0gdGhpcy5mYWNlVGltZS5ldmVyeSh0aW1lID0+IHRpbWUuZGlzYWJsZWQpO1xyXG5cclxuICAgICAgICBpZiAoKGN1cnJlbnRUaW1lICYmIGN1cnJlbnRUaW1lLmRpc2FibGVkKSAmJiAhdGhpcy5pc0Nsb2NrRmFjZURpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGF2YWlsYWJsZVRpbWUgPSB0aGlzLmZhY2VUaW1lLmZpbmQodGltZSA9PiAhdGltZS5kaXNhYmxlZCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRpbWVDaGFuZ2UubmV4dChhdmFpbGFibGVUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0lubmVyQ2xvY2tGYWNlKHgwOiBudW1iZXIsIHkwOiBudW1iZXIsIHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLyogRGV0ZWN0IHdoZXRoZXIgdGltZSBmcm9tIHRoZSBpbm5lciBjbG9jayBmYWNlIG9yIG5vdCAoMjQgZm9ybWF0IG9ubHkpICovXHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh4IC0geDAsIDIpICsgTWF0aC5wb3coeSAtIHkwLCAyKSkgPCB0aGlzLmlubmVyQ2xvY2tGYWNlU2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlY3JlYXNlQ2xvY2tIYW5kKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2xvY2tIYW5kLm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gQ0xPQ0tfSEFORF9TVFlMRVMuc21hbGwuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuY2xvY2tIYW5kLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gQ0xPQ0tfSEFORF9TVFlMRVMuc21hbGwudG9wO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5jcmVhc2VDbG9ja0hhbmQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jbG9ja0hhbmQubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBDTE9DS19IQU5EX1NUWUxFUy5sYXJnZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5jbG9ja0hhbmQubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSBDTE9DS19IQU5EX1NUWUxFUy5sYXJnZS50b3A7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJvdW5kQW5nbGUoYW5nbGU6IG51bWJlciwgc3RlcDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKGFuZ2xlIC8gc3RlcCkgKiBzdGVwO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb3VudEFuZ2xlQnlDb3Jkcyh4MDogbnVtYmVyLCB5MDogbnVtYmVyLCB4OiBudW1iZXIsIHk6IG51bWJlciwgY3VycmVudEFuZ2xlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgaWYgKHkgPiB5MCAmJiB4ID49IHgwKSB7Ly8gSUkgcXVhcnRlclxyXG4gICAgICAgIHJldHVybiAxODAgLSBjdXJyZW50QW5nbGU7XHJcbiAgICB9IGVsc2UgaWYgKHkgPiB5MCAmJiB4IDwgeDApIHsvLyBJSUkgcXVhcnRlclxyXG4gICAgICAgIHJldHVybiAxODAgKyBjdXJyZW50QW5nbGU7XHJcbiAgICB9IGVsc2UgaWYgKHkgPCB5MCAmJiB4IDwgeDApIHsvLyBJViBxdWFydGVyXHJcbiAgICAgICAgcmV0dXJuIDM2MCAtIGN1cnJlbnRBbmdsZTtcclxuICAgIH0gZWxzZSB7Ly8gSSBxdWFydGVyXHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRBbmdsZTtcclxuICAgIH1cclxufVxyXG4iXX0=