import { Component, ContentChild, Input } from '@angular/core';
import { NgxMaterialTimepickerToggleIconDirective } from '../../directives/ngx-material-timepicker-toggle-icon.directive';
export class NgxMaterialTimepickerToggleComponent {
    get disabled() {
        return this._disabled === undefined ? this.timepicker.disabled : this._disabled;
    }
    set disabled(value) {
        this._disabled = value;
    }
    open(event) {
        if (this.timepicker) {
            this.timepicker.open();
            event.stopPropagation();
        }
    }
}
NgxMaterialTimepickerToggleComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker-toggle',
                template: "<button class=\"ngx-material-timepicker-toggle\" (click)=\"open($event)\" [disabled]=\"disabled\" type=\"button\">\r\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24px\" height=\"24px\" *ngIf=\"!customIcon\">\r\n        <path\r\n            d=\"M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003                   6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z\"/>\r\n    </svg>\r\n\r\n    <ng-content select=\"[ngxMaterialTimepickerToggleIcon]\"></ng-content>\r\n</button>\r\n",
                styles: [".ngx-material-timepicker-toggle{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;align-items:center;background-color:transparent;border:none;border-radius:50%;cursor:pointer;display:flex;justify-content:center;outline:none;padding:4px;text-align:center;transition:background-color .3s;user-select:none}.ngx-material-timepicker-toggle:focus{background-color:rgba(0,0,0,.07)}"]
            },] }
];
NgxMaterialTimepickerToggleComponent.propDecorators = {
    timepicker: [{ type: Input, args: ['for',] }],
    disabled: [{ type: Input }],
    customIcon: [{ type: ContentChild, args: [NgxMaterialTimepickerToggleIconDirective, { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItdG9nZ2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9jb21wb25lbnRzL3RpbWVwaWNrZXItdG9nZ2xlLWJ1dHRvbi9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci10b2dnbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUMsd0NBQXdDLEVBQUMsTUFBTSxnRUFBZ0UsQ0FBQztBQVN4SCxNQUFNLE9BQU8sb0NBQW9DO0lBSTdDLElBQ0ksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3BGLENBQUM7SUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFjO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFNRCxJQUFJLENBQUMsS0FBSztRQUNOLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7OztZQTVCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGdDQUFnQztnQkFDMUMsNnhCQUE0RDs7YUFFL0Q7Ozt5QkFJSSxLQUFLLFNBQUMsS0FBSzt1QkFFWCxLQUFLO3lCQVdMLFlBQVksU0FBQyx3Q0FBd0MsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgQ29udGVudENoaWxkLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Tmd4TWF0ZXJpYWxUaW1lcGlja2VyVG9nZ2xlSWNvbkRpcmVjdGl2ZX0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci10b2dnbGUtaWNvbi5kaXJlY3RpdmUnO1xyXG5pbXBvcnQge05neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudH0gZnJvbSAnLi4vLi4vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci10b2dnbGUnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci10b2dnbGUuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLXRvZ2dsZS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxUaW1lcGlja2VyVG9nZ2xlQ29tcG9uZW50IHtcclxuXHJcbiAgICBASW5wdXQoJ2ZvcicpIHRpbWVwaWNrZXI6IE5neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudDtcclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZCA9PT0gdW5kZWZpbmVkID8gdGhpcy50aW1lcGlja2VyLmRpc2FibGVkIDogdGhpcy5fZGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcclxuXHJcbiAgICBAQ29udGVudENoaWxkKE5neE1hdGVyaWFsVGltZXBpY2tlclRvZ2dsZUljb25EaXJlY3RpdmUsIHtzdGF0aWM6IHRydWV9KSBjdXN0b21JY29uOiBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUb2dnbGVJY29uRGlyZWN0aXZlO1xyXG5cclxuICAgIG9wZW4oZXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy50aW1lcGlja2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZXBpY2tlci5vcGVuKCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=