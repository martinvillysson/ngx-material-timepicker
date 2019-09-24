import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var ActiveMinutePipe = /** @class */ (function () {
    function ActiveMinutePipe() {
    }
    ActiveMinutePipe.prototype.transform = function (minute, currentMinute, gap, isClockFaceDisabled) {
        if (minute == null || isClockFaceDisabled) {
            return false;
        }
        var defaultGap = 5;
        return ((currentMinute === minute) && (minute % (gap || defaultGap) === 0));
    };
    ActiveMinutePipe = tslib_1.__decorate([
        Pipe({
            name: 'activeMinute'
        })
    ], ActiveMinutePipe);
    return ActiveMinutePipe;
}());
export { ActiveMinutePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLW1pbnV0ZS5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvcGlwZXMvYWN0aXZlLW1pbnV0ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUtwRDtJQUFBO0lBV0EsQ0FBQztJQVRHLG9DQUFTLEdBQVQsVUFBVSxNQUFjLEVBQUUsYUFBcUIsRUFBRSxHQUFXLEVBQUUsbUJBQTRCO1FBQ3RGLElBQUksTUFBTSxJQUFJLElBQUksSUFBSSxtQkFBbUIsRUFBRTtZQUN2QyxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQU0sVUFBVSxHQUFHLENBQUMsQ0FBQztRQUVyQixPQUFPLENBQUMsQ0FBQyxhQUFhLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBVFEsZ0JBQWdCO1FBSDVCLElBQUksQ0FBQztZQUNGLElBQUksRUFBRSxjQUFjO1NBQ3ZCLENBQUM7T0FDVyxnQkFBZ0IsQ0FXNUI7SUFBRCx1QkFBQztDQUFBLEFBWEQsSUFXQztTQVhZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBQaXBlKHtcclxuICAgIG5hbWU6ICdhY3RpdmVNaW51dGUnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBY3RpdmVNaW51dGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcblxyXG4gICAgdHJhbnNmb3JtKG1pbnV0ZTogbnVtYmVyLCBjdXJyZW50TWludXRlOiBudW1iZXIsIGdhcDogbnVtYmVyLCBpc0Nsb2NrRmFjZURpc2FibGVkOiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKG1pbnV0ZSA9PSBudWxsIHx8IGlzQ2xvY2tGYWNlRGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBkZWZhdWx0R2FwID0gNTtcclxuXHJcbiAgICAgICAgcmV0dXJuICgoY3VycmVudE1pbnV0ZSA9PT0gbWludXRlKSAmJiAobWludXRlICUgKGdhcCB8fCBkZWZhdWx0R2FwKSA9PT0gMCkpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=