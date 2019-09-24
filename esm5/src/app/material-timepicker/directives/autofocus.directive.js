import * as tslib_1 from "tslib";
import { Directive, ElementRef, Inject, Input, Optional } from '@angular/core';
import { DOCUMENT } from '@angular/common';
var AutofocusDirective = /** @class */ (function () {
    function AutofocusDirective(element, document) {
        this.element = element;
        this.document = document;
        this.activeElement = this.document.activeElement;
    }
    AutofocusDirective.prototype.ngOnChanges = function () {
        var _this = this;
        if (this.isFocusActive) {
            // To avoid ExpressionChangedAfterItHasBeenCheckedError;
            setTimeout(function () { return _this.element.nativeElement.focus({ preventScroll: true }); });
        }
    };
    AutofocusDirective.prototype.ngOnDestroy = function () {
        var _this = this;
        // To avoid ExpressionChangedAfterItHasBeenCheckedError;
        setTimeout(function () { return _this.activeElement.focus({ preventScroll: true }); });
    };
    tslib_1.__decorate([
        Input('timepickerAutofocus'),
        tslib_1.__metadata("design:type", Boolean)
    ], AutofocusDirective.prototype, "isFocusActive", void 0);
    AutofocusDirective = tslib_1.__decorate([
        Directive({
            selector: '[timepickerAutofocus]'
        }),
        tslib_1.__param(1, Optional()), tslib_1.__param(1, Inject(DOCUMENT)),
        tslib_1.__metadata("design:paramtypes", [ElementRef, Object])
    ], AutofocusDirective);
    return AutofocusDirective;
}());
export { AutofocusDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2ZvY3VzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2RpcmVjdGl2ZXMvYXV0b2ZvY3VzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBd0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ25HLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUt6QztJQU1JLDRCQUFvQixPQUFtQixFQUF3QyxRQUFhO1FBQXhFLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBd0MsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQUN4RixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO0lBQ3JELENBQUM7SUFFRCx3Q0FBVyxHQUFYO1FBQUEsaUJBS0M7UUFKRyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDcEIsd0RBQXdEO1lBQ3hELFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQXpELENBQXlELENBQUMsQ0FBQztTQUMvRTtJQUNMLENBQUM7SUFFRCx3Q0FBVyxHQUFYO1FBQUEsaUJBR0M7UUFGRyx3REFBd0Q7UUFDeEQsVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFqRCxDQUFpRCxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQWxCNkI7UUFBN0IsS0FBSyxDQUFDLHFCQUFxQixDQUFDOzs2REFBd0I7SUFGNUMsa0JBQWtCO1FBSDlCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSx1QkFBdUI7U0FDcEMsQ0FBQztRQU80QyxtQkFBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLG1CQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtpREFBekMsVUFBVTtPQU45QixrQkFBa0IsQ0FxQjlCO0lBQUQseUJBQUM7Q0FBQSxBQXJCRCxJQXFCQztTQXJCWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9wdGlvbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbdGltZXBpY2tlckF1dG9mb2N1c10nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBdXRvZm9jdXNEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XHJcblxyXG4gICAgQElucHV0KCd0aW1lcGlja2VyQXV0b2ZvY3VzJykgaXNGb2N1c0FjdGl2ZTogYm9vbGVhbjtcclxuXHJcbiAgICBwcml2YXRlIGFjdGl2ZUVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZiwgQE9wdGlvbmFsKCkgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVFbGVtZW50ID0gdGhpcy5kb2N1bWVudC5hY3RpdmVFbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRm9jdXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgLy8gVG8gYXZvaWQgRXhwcmVzc2lvbkNoYW5nZWRBZnRlckl0SGFzQmVlbkNoZWNrZWRFcnJvcjtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICAvLyBUbyBhdm9pZCBFeHByZXNzaW9uQ2hhbmdlZEFmdGVySXRIYXNCZWVuQ2hlY2tlZEVycm9yO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hY3RpdmVFbGVtZW50LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KSk7XHJcbiAgICB9XHJcbn1cclxuIl19