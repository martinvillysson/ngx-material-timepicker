import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { isDigit } from '../../../utils/timepicker.utils';
import { TimeFormatterPipe } from '../../../pipes/time-formatter.pipe';
import { TimeUnit } from '../../../models/time-unit.enum';
import { TimeParserPipe } from '../../../pipes/time-parser.pipe';
var NgxTimepickerTimeControlComponent = /** @class */ (function () {
    function NgxTimepickerTimeControlComponent(timeParser) {
        this.timeParser = timeParser;
        this.timeChanged = new EventEmitter();
    }
    NgxTimepickerTimeControlComponent.prototype.ngOnInit = function () {
        if (this.isDefaultTimeSet) {
            this.time = new TimeFormatterPipe().transform(this.time, this.timeUnit);
        }
    };
    NgxTimepickerTimeControlComponent.prototype.ngOnChanges = function (changes) {
        var timeChanges = changes['time'];
        var isTimeNotProvided = timeChanges && timeChanges.isFirstChange() && !this.isDefaultTimeSet;
        if (isTimeNotProvided) {
            this.time = null;
        }
    };
    NgxTimepickerTimeControlComponent.prototype.onKeydown = function (event) {
        if (!isDigit(event)) {
            event.preventDefault();
        }
        switch (event.key) {
            case 'ArrowUp':
                this.increase();
                break;
            case 'ArrowDown':
                this.decrease();
                break;
        }
    };
    NgxTimepickerTimeControlComponent.prototype.increase = function () {
        if (!this.disabled) {
            var nextTime = +this.time + 1;
            if (nextTime > this.max) {
                nextTime = this.min;
            }
            this.timeChanged.emit(nextTime);
        }
    };
    NgxTimepickerTimeControlComponent.prototype.decrease = function () {
        if (!this.disabled) {
            var previousTime = +this.time - 1;
            if (previousTime < this.min) {
                previousTime = this.max;
            }
            this.timeChanged.emit(previousTime);
        }
    };
    NgxTimepickerTimeControlComponent.prototype.onInput = function (input) {
        var value = parseInt(input.value, 10);
        if (!isNaN(value)) {
            this.time = value;
            if (this.time > this.max) {
                this.time = +String(value)[0];
            }
            if (this.time < this.min) {
                this.time = this.min;
            }
            input.value = String(this.time);
            this.timeChanged.emit(this.time);
        }
    };
    NgxTimepickerTimeControlComponent.prototype.onFocus = function () {
        this.isFocused = true;
    };
    NgxTimepickerTimeControlComponent.prototype.onBlur = function () {
        this.time = new TimeFormatterPipe().transform(this.time, this.timeUnit);
        this.isFocused = false;
    };
    NgxTimepickerTimeControlComponent.prototype.onModelChange = function (value) {
        this.time = +this.timeParser.transform(value, this.timeUnit);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], NgxTimepickerTimeControlComponent.prototype, "time", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], NgxTimepickerTimeControlComponent.prototype, "min", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], NgxTimepickerTimeControlComponent.prototype, "max", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], NgxTimepickerTimeControlComponent.prototype, "placeholder", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], NgxTimepickerTimeControlComponent.prototype, "timeUnit", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], NgxTimepickerTimeControlComponent.prototype, "disabled", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], NgxTimepickerTimeControlComponent.prototype, "isDefaultTimeSet", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], NgxTimepickerTimeControlComponent.prototype, "timeChanged", void 0);
    NgxTimepickerTimeControlComponent = tslib_1.__decorate([
        Component({
            selector: 'ngx-timepicker-time-control',
            template: "<div class=\"ngx-timepicker-control\" [ngClass]=\"{'ngx-timepicker-control--active': isFocused}\">\r\n    <!--suppress HtmlFormInputWithoutLabel -->\r\n    <input class=\"ngx-timepicker-control__input\"\r\n           maxlength=\"2\"\r\n           [ngModel]=\"time | timeParser: timeUnit | timeLocalizer: timeUnit\"\r\n           (ngModelChange)=\"onModelChange($event)\"\r\n           [placeholder]=\"placeholder\"\r\n           [disabled]=\"disabled\"\r\n           (keydown)=\"onKeydown($event)\"\r\n           (input)=\"onInput(inputElement)\"\r\n           (focus)=\"onFocus()\"\r\n           (blur)=\"onBlur()\" #inputElement>\r\n    <div class=\"ngx-timepicker-control__arrows\">\r\n            <span class=\"ngx-timepicker-control__arrow\" role=\"button\" (click)=\"increase()\">\r\n                &#9650;\r\n            </span>\r\n        <span class=\"ngx-timepicker-control__arrow\" role=\"button\" (click)=\"decrease()\">\r\n                &#9660;\r\n            </span>\r\n    </div>\r\n</div>\r\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [TimeParserPipe],
            styles: [".ngx-timepicker-control{position:relative;display:flex;width:60px;height:30px;padding:0 5px;box-sizing:border-box}.ngx-timepicker-control--active:after{content:'';position:absolute;bottom:-2px;left:0;width:100%;height:1px;background-color:#00bfff}.ngx-timepicker-control__input{width:100%;height:100%;padding:0 5px 0 0;border:0;font-size:1rem;color:inherit;outline:0;text-align:center}.ngx-timepicker-control__input:disabled{background-color:transparent}.ngx-timepicker-control__arrows{position:absolute;right:2px;top:0;display:flex;flex-direction:column}.ngx-timepicker-control__arrow{font-size:11px;color:rgba(0,0,0,.4);cursor:pointer;transition:color .2s;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ngx-timepicker-control__arrow:hover{color:rgba(0,0,0,.9)}"]
        }),
        tslib_1.__metadata("design:paramtypes", [TimeParserPipe])
    ], NgxTimepickerTimeControlComponent);
    return NgxTimepickerTimeControlComponent;
}());
export { NgxTimepickerTimeControlComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXItdGltZS1jb250cm9sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1maWVsZC90aW1lcGlja2VyLXRpbWUtY29udHJvbC9uZ3gtdGltZXBpY2tlci10aW1lLWNvbnRyb2wuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDbEksT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzFELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFVakU7SUFjSSwyQ0FBb0IsVUFBMEI7UUFBMUIsZUFBVSxHQUFWLFVBQVUsQ0FBZ0I7UUFKcEMsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBS25ELENBQUM7SUFFRCxvREFBUSxHQUFSO1FBQ0ksSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzNFO0lBQ0wsQ0FBQztJQUVELHVEQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUM5QixJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsSUFBTSxpQkFBaUIsR0FBRyxXQUFXLElBQUksV0FB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QztJQXBHUTtRQUFSLEtBQUssRUFBRTs7bUVBQWM7SUFDYjtRQUFSLEtBQUssRUFBRTs7a0VBQWE7SUFDWjtRQUFSLEtBQUssRUFBRTs7a0VBQWE7SUFDWjtRQUFSLEtBQUssRUFBRTs7MEVBQXFCO0lBQ3BCO1FBQVIsS0FBSyxFQUFFOzt1RUFBb0I7SUFDbkI7UUFBUixLQUFLLEVBQUU7O3VFQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTs7K0VBQTJCO0lBRXpCO1FBQVQsTUFBTSxFQUFFOzswRUFBMEM7SUFWMUMsaUNBQWlDO1FBUjdDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSw2QkFBNkI7WUFDdkMsKy9CQUEyRDtZQUUzRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtZQUMvQyxTQUFTLEVBQUUsQ0FBQyxjQUFjLENBQUM7O1NBQzlCLENBQUM7aURBZ0JrQyxjQUFjO09BZHJDLGlDQUFpQyxDQXVHN0M7SUFBRCx3Q0FBQztDQUFBLEFBdkdELElBdUdDO1NBdkdZLGlDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgaXNEaWdpdCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL3RpbWVwaWNrZXIudXRpbHMnO1xyXG5pbXBvcnQgeyBUaW1lRm9ybWF0dGVyUGlwZSB9IGZyb20gJy4uLy4uLy4uL3BpcGVzL3RpbWUtZm9ybWF0dGVyLnBpcGUnO1xyXG5pbXBvcnQgeyBUaW1lVW5pdCB9IGZyb20gJy4uLy4uLy4uL21vZGVscy90aW1lLXVuaXQuZW51bSc7XHJcbmltcG9ydCB7IFRpbWVQYXJzZXJQaXBlIH0gZnJvbSAnLi4vLi4vLi4vcGlwZXMvdGltZS1wYXJzZXIucGlwZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbmd4LXRpbWVwaWNrZXItdGltZS1jb250cm9sJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9uZ3gtdGltZXBpY2tlci10aW1lLWNvbnRyb2wuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vbmd4LXRpbWVwaWNrZXItdGltZS1jb250cm9sLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAgIHByb3ZpZGVyczogW1RpbWVQYXJzZXJQaXBlXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIE5neFRpbWVwaWNrZXJUaW1lQ29udHJvbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuXHJcbiAgICBASW5wdXQoKSB0aW1lOiBudW1iZXI7XHJcbiAgICBASW5wdXQoKSBtaW46IG51bWJlcjtcclxuICAgIEBJbnB1dCgpIG1heDogbnVtYmVyO1xyXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcclxuICAgIEBJbnB1dCgpIHRpbWVVbml0OiBUaW1lVW5pdDtcclxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xyXG4gICAgQElucHV0KCkgaXNEZWZhdWx0VGltZVNldDogYm9vbGVhbjtcclxuXHJcbiAgICBAT3V0cHV0KCkgdGltZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcclxuXHJcbiAgICBpc0ZvY3VzZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0aW1lUGFyc2VyOiBUaW1lUGFyc2VyUGlwZSkge1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRGVmYXVsdFRpbWVTZXQpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lID0gbmV3IFRpbWVGb3JtYXR0ZXJQaXBlKCkudHJhbnNmb3JtKHRoaXMudGltZSwgdGhpcy50aW1lVW5pdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB0aW1lQ2hhbmdlcyA9IGNoYW5nZXNbJ3RpbWUnXTtcclxuICAgICAgICBjb25zdCBpc1RpbWVOb3RQcm92aWRlZCA9IHRpbWVDaGFuZ2VzICYmIHRpbWVDaGFuZ2VzLmlzRmlyc3RDaGFuZ2UoKSAmJiAhdGhpcy5pc0RlZmF1bHRUaW1lU2V0O1xyXG5cclxuICAgICAgICBpZiAoaXNUaW1lTm90UHJvdmlkZWQpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFpc0RpZ2l0KGV2ZW50KSkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcclxuICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluY3JlYXNlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVjcmVhc2UoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbmNyZWFzZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgbGV0IG5leHRUaW1lID0gK3RoaXMudGltZSArIDE7XHJcblxyXG4gICAgICAgICAgICBpZiAobmV4dFRpbWUgPiB0aGlzLm1heCkge1xyXG4gICAgICAgICAgICAgICAgbmV4dFRpbWUgPSB0aGlzLm1pbjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy50aW1lQ2hhbmdlZC5lbWl0KG5leHRUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVjcmVhc2UoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIGxldCBwcmV2aW91c1RpbWUgPSArdGhpcy50aW1lIC0gMTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwcmV2aW91c1RpbWUgPCB0aGlzLm1pbikge1xyXG4gICAgICAgICAgICAgICAgcHJldmlvdXNUaW1lID0gdGhpcy5tYXg7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMudGltZUNoYW5nZWQuZW1pdChwcmV2aW91c1RpbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbklucHV0KGlucHV0OiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBwYXJzZUludChpbnB1dC52YWx1ZSwgMTApO1xyXG5cclxuICAgICAgICBpZiAoIWlzTmFOKHZhbHVlKSkge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWUgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWUgPiB0aGlzLm1heCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lID0gK1N0cmluZyh2YWx1ZSlbMF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWUgPCB0aGlzLm1pbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lID0gdGhpcy5taW47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlucHV0LnZhbHVlID0gU3RyaW5nKHRoaXMudGltZSk7XHJcbiAgICAgICAgICAgIHRoaXMudGltZUNoYW5nZWQuZW1pdCh0aGlzLnRpbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25Gb2N1cygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzRm9jdXNlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgb25CbHVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGltZSA9IG5ldyBUaW1lRm9ybWF0dGVyUGlwZSgpLnRyYW5zZm9ybSh0aGlzLnRpbWUsIHRoaXMudGltZVVuaXQpO1xyXG4gICAgICAgIHRoaXMuaXNGb2N1c2VkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25Nb2RlbENoYW5nZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50aW1lID0gK3RoaXMudGltZVBhcnNlci50cmFuc2Zvcm0odmFsdWUsIHRoaXMudGltZVVuaXQpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==