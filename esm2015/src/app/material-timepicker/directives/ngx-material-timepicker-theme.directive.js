import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input } from '@angular/core';
let NgxMaterialTimepickerThemeDirective = class NgxMaterialTimepickerThemeDirective {
    constructor(elementRef) {
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
                            this.element.style.setProperty(`--${camelCaseToDash(prop)}`, theme[prop]);
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
    tslib_1.__metadata("design:paramtypes", [ElementRef])
], NgxMaterialTimepickerThemeDirective);
export { NgxMaterialTimepickerThemeDirective };
function camelCaseToDash(myStr) {
    return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItdGhlbWUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvZGlyZWN0aXZlcy9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci10aGVtZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFJMUUsSUFBYSxtQ0FBbUMsR0FBaEQsTUFBYSxtQ0FBbUM7SUFNNUMsWUFBWSxVQUFzQjtRQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7SUFDNUMsQ0FBQztJQUVELGVBQWU7UUFDWCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjtJQUNMLENBQUM7SUFFTyxRQUFRLENBQUMsS0FBSztRQUNsQixLQUFLLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBRTtZQUNyQixJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzNCLElBQUksT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxFQUFFO29CQUNoQyxLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRTt3QkFDdEIsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFOzRCQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt5QkFDN0U7cUJBQ0o7b0JBQ0QsT0FBTztpQkFDVjtnQkFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQzdCO1NBRUo7SUFDTCxDQUFDO0NBQ0osQ0FBQTtBQTlCd0M7SUFBcEMsS0FBSyxDQUFDLDRCQUE0QixDQUFDOztrRUFBbUM7QUFGOUQsbUNBQW1DO0lBRC9DLFNBQVMsQ0FBQyxFQUFDLFFBQVEsRUFBRSw4QkFBOEIsRUFBQyxDQUFDOzZDQU8xQixVQUFVO0dBTnpCLG1DQUFtQyxDQWdDL0M7U0FoQ1ksbUNBQW1DO0FBa0NoRCxTQUFTLGVBQWUsQ0FBQyxLQUFLO0lBQzFCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNuRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZX0gZnJvbSAnLi4vbW9kZWxzL25neC1tYXRlcmlhbC10aW1lcGlja2VyLXRoZW1lLmludGVyZmFjZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1tuZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZV0nfSlcclxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsVGltZXBpY2tlclRoZW1lRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG4gICAgQElucHV0KCduZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZScpIHRoZW1lOiBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZTtcclxuXHJcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRoZW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGhlbWUodGhpcy50aGVtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0VGhlbWUodGhlbWUpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IHZhbCBpbiB0aGVtZSkge1xyXG4gICAgICAgICAgICBpZiAodGhlbWUuaGFzT3duUHJvcGVydHkodmFsKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGVtZVt2YWxdID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiB0aGVtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlbWUuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShgLS0ke2NhbWVsQ2FzZVRvRGFzaChwcm9wKX1gLCB0aGVtZVtwcm9wXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUaGVtZSh0aGVtZVt2YWxdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbWVsQ2FzZVRvRGFzaChteVN0cikge1xyXG4gICAgcmV0dXJuIG15U3RyLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XHJcbn1cclxuIl19