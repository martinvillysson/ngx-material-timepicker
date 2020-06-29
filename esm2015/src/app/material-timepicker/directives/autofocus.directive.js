import { Directive, ElementRef, Inject, Input, Optional } from '@angular/core';
import { DOCUMENT } from '@angular/common';
export class AutofocusDirective {
    constructor(element, document) {
        this.element = element;
        this.document = document;
        this.activeElement = this.document.activeElement;
    }
    ngOnChanges() {
        if (this.isFocusActive) {
            // To avoid ExpressionChangedAfterItHasBeenCheckedError;
            setTimeout(() => this.element.nativeElement.focus({ preventScroll: true }));
        }
    }
    ngOnDestroy() {
        // To avoid ExpressionChangedAfterItHasBeenCheckedError;
        setTimeout(() => this.activeElement.focus({ preventScroll: true }));
    }
}
AutofocusDirective.decorators = [
    { type: Directive, args: [{
                selector: '[timepickerAutofocus]'
            },] }
];
AutofocusDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
];
AutofocusDirective.propDecorators = {
    isFocusActive: [{ type: Input, args: ['timepickerAutofocus',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2ZvY3VzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9kaXJlY3RpdmVzL2F1dG9mb2N1cy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBd0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ25HLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUt6QyxNQUFNLE9BQU8sa0JBQWtCO0lBTTNCLFlBQW9CLE9BQW1CLEVBQXdDLFFBQWE7UUFBeEUsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUF3QyxhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQ3hGLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7SUFDckQsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDcEIsd0RBQXdEO1lBQ3hELFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQy9FO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDUCx3REFBd0Q7UUFDeEQsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDOzs7WUF2QkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx1QkFBdUI7YUFDcEM7OztZQUxrQixVQUFVOzRDQVlpQixRQUFRLFlBQUksTUFBTSxTQUFDLFFBQVE7Ozs0QkFKcEUsS0FBSyxTQUFDLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3QsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1t0aW1lcGlja2VyQXV0b2ZvY3VzXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIEF1dG9mb2N1c0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoJ3RpbWVwaWNrZXJBdXRvZm9jdXMnKSBpc0ZvY3VzQWN0aXZlOiBib29sZWFuO1xyXG5cclxuICAgIHByaXZhdGUgYWN0aXZlRWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLCBAT3B0aW9uYWwoKSBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZUVsZW1lbnQgPSB0aGlzLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNGb2N1c0FjdGl2ZSkge1xyXG4gICAgICAgICAgICAvLyBUbyBhdm9pZCBFeHByZXNzaW9uQ2hhbmdlZEFmdGVySXRIYXNCZWVuQ2hlY2tlZEVycm9yO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIC8vIFRvIGF2b2lkIEV4cHJlc3Npb25DaGFuZ2VkQWZ0ZXJJdEhhc0JlZW5DaGVja2VkRXJyb3I7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmFjdGl2ZUVsZW1lbnQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pKTtcclxuICAgIH1cclxufVxyXG4iXX0=