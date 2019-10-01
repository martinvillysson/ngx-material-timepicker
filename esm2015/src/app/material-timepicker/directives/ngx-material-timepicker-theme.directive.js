import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
let NgxMaterialTimepickerThemeDirective = class NgxMaterialTimepickerThemeDirective {
    constructor(elementRef, renderer) {
        this.renderer = renderer;
        this.element = elementRef.nativeElement;
    }
    ngAfterViewInit() {
        if (this.theme) {
            this.setTheme(this.theme);
        }
    }
    setTheme(theme) {
        for (const val in theme) {
            if (theme.hasOwnProperty(val)) {
                if (typeof theme[val] === 'string') {
                    for (const prop in theme) {
                        if (theme.hasOwnProperty(prop)) {
                            this.renderer.setStyle(this.element, `--${camelCaseToDash(prop)}`, theme[prop]);
                        }
                    }
                    return;
                }
                this.setTheme(theme[val]);
            }
        }
    }
};
tslib_1.__decorate([
    Input('ngxMaterialTimepickerTheme'),
    tslib_1.__metadata("design:type", Object)
], NgxMaterialTimepickerThemeDirective.prototype, "theme", void 0);
NgxMaterialTimepickerThemeDirective = tslib_1.__decorate([
    Directive({ selector: '[ngxMaterialTimepickerTheme]' }),
    tslib_1.__metadata("design:paramtypes", [ElementRef, Renderer2])
], NgxMaterialTimepickerThemeDirective);
export { NgxMaterialTimepickerThemeDirective };
function camelCaseToDash(myStr) {
    return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItdGhlbWUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvZGlyZWN0aXZlcy9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci10aGVtZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBSXJGLElBQWEsbUNBQW1DLEdBQWhELE1BQWEsbUNBQW1DO0lBTTVDLFlBQVksVUFBc0IsRUFBVSxRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQzNELElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztJQUM1QyxDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdCO0lBQ0wsQ0FBQztJQUVPLFFBQVEsQ0FBQyxLQUFLO1FBQ2xCLEtBQUssTUFBTSxHQUFHLElBQUksS0FBSyxFQUFFO1lBQ3JCLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDM0IsSUFBSSxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLEVBQUU7b0JBQ2hDLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFO3dCQUN0QixJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7NEJBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt5QkFDbkY7cUJBQ0o7b0JBQ0QsT0FBTztpQkFDVjtnQkFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQzdCO1NBRUo7SUFDTCxDQUFDO0NBQ0osQ0FBQTtBQTlCd0M7SUFBcEMsS0FBSyxDQUFDLDRCQUE0QixDQUFDOztrRUFBbUM7QUFGOUQsbUNBQW1DO0lBRC9DLFNBQVMsQ0FBQyxFQUFDLFFBQVEsRUFBRSw4QkFBOEIsRUFBQyxDQUFDOzZDQU8xQixVQUFVLEVBQW9CLFNBQVM7R0FOdEQsbUNBQW1DLENBZ0MvQztTQWhDWSxtQ0FBbUM7QUFrQ2hELFNBQVMsZUFBZSxDQUFDLEtBQUs7SUFDMUIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ25FLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIFJlbmRlcmVyMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Tmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWV9IGZyb20gJy4uL21vZGVscy9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci10aGVtZS5pbnRlcmZhY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWVdJ30pXHJcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xyXG5cclxuICAgIEBJbnB1dCgnbmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWUnKSB0aGVtZTogTmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWU7XHJcblxyXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRoZW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGhlbWUodGhpcy50aGVtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0VGhlbWUodGhlbWUpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IHZhbCBpbiB0aGVtZSkge1xyXG4gICAgICAgICAgICBpZiAodGhlbWUuaGFzT3duUHJvcGVydHkodmFsKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGVtZVt2YWxdID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiB0aGVtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlbWUuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50LCBgLS0ke2NhbWVsQ2FzZVRvRGFzaChwcm9wKX1gLCB0aGVtZVtwcm9wXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUaGVtZSh0aGVtZVt2YWxdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbWVsQ2FzZVRvRGFzaChteVN0cikge1xyXG4gICAgcmV0dXJuIG15U3RyLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XHJcbn1cclxuIl19