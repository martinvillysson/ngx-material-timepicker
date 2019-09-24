import * as tslib_1 from "tslib";
import { Component, ContentChild, Input } from '@angular/core';
import { NgxMaterialTimepickerToggleIconDirective } from '../../directives/ngx-material-timepicker-toggle-icon.directive';
import { NgxMaterialTimepickerComponent } from '../../ngx-material-timepicker.component';
let NgxMaterialTimepickerToggleComponent = class NgxMaterialTimepickerToggleComponent {
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
};
tslib_1.__decorate([
    Input('for'),
    tslib_1.__metadata("design:type", NgxMaterialTimepickerComponent)
], NgxMaterialTimepickerToggleComponent.prototype, "timepicker", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], NgxMaterialTimepickerToggleComponent.prototype, "disabled", null);
tslib_1.__decorate([
    ContentChild(NgxMaterialTimepickerToggleIconDirective, { static: true }),
    tslib_1.__metadata("design:type", NgxMaterialTimepickerToggleIconDirective)
], NgxMaterialTimepickerToggleComponent.prototype, "customIcon", void 0);
NgxMaterialTimepickerToggleComponent = tslib_1.__decorate([
    Component({
        selector: 'ngx-material-timepicker-toggle',
        template: "<button class=\"ngx-material-timepicker-toggle\" (click)=\"open($event)\" [disabled]=\"disabled\" type=\"button\">\r\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24px\" height=\"24px\" *ngIf=\"!customIcon\">\r\n        <path\r\n            d=\"M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003                   6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z\"/>\r\n    </svg>\r\n\r\n    <ng-content select=\"[ngxMaterialTimepickerToggleIcon]\"></ng-content>\r\n</button>\r\n",
        styles: [".ngx-material-timepicker-toggle{display:flex;justify-content:center;align-items:center;padding:4px;background-color:transparent;border-radius:50%;text-align:center;border:none;outline:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:background-color .3s;cursor:pointer}.ngx-material-timepicker-toggle:focus{background-color:rgba(0,0,0,.07)}"]
    })
], NgxMaterialTimepickerToggleComponent);
export { NgxMaterialTimepickerToggleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItdG9nZ2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci10b2dnbGUtYnV0dG9uL25neC1tYXRlcmlhbC10aW1lcGlja2VyLXRvZ2dsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUMsd0NBQXdDLEVBQUMsTUFBTSxnRUFBZ0UsQ0FBQztBQUN4SCxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQVF2RixJQUFhLG9DQUFvQyxHQUFqRCxNQUFhLG9DQUFvQztJQUs3QyxJQUFJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUNwRixDQUFDO0lBRUQsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBTUQsSUFBSSxDQUFDLEtBQUs7UUFDTixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDM0I7SUFDTCxDQUFDO0NBQ0osQ0FBQTtBQXJCaUI7SUFBYixLQUFLLENBQUMsS0FBSyxDQUFDO3NDQUFhLDhCQUE4Qjt3RUFBQztBQUd6RDtJQURDLEtBQUssRUFBRTs7O29FQUdQO0FBUXVFO0lBQXZFLFlBQVksQ0FBQyx3Q0FBd0MsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQztzQ0FBYSx3Q0FBd0M7d0VBQUM7QUFmcEgsb0NBQW9DO0lBTmhELFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxnQ0FBZ0M7UUFDMUMsNnhCQUE0RDs7S0FFL0QsQ0FBQztHQUVXLG9DQUFvQyxDQXVCaEQ7U0F2Qlksb0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05neE1hdGVyaWFsVGltZXBpY2tlclRvZ2dsZUljb25EaXJlY3RpdmV9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItdG9nZ2xlLWljb24uZGlyZWN0aXZlJztcclxuaW1wb3J0IHtOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb21wb25lbnR9IGZyb20gJy4uLy4uL25neC1tYXRlcmlhbC10aW1lcGlja2VyLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItdG9nZ2xlJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItdG9nZ2xlLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWyduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci10b2dnbGUuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsVGltZXBpY2tlclRvZ2dsZUNvbXBvbmVudCB7XHJcblxyXG4gICAgQElucHV0KCdmb3InKSB0aW1lcGlja2VyOiBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb21wb25lbnQ7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQgPT09IHVuZGVmaW5lZCA/IHRoaXMudGltZXBpY2tlci5kaXNhYmxlZCA6IHRoaXMuX2Rpc2FibGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZChOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUb2dnbGVJY29uRGlyZWN0aXZlLCB7c3RhdGljOiB0cnVlfSkgY3VzdG9tSWNvbjogTmd4TWF0ZXJpYWxUaW1lcGlja2VyVG9nZ2xlSWNvbkRpcmVjdGl2ZTtcclxuXHJcbiAgICBvcGVuKGV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMudGltZXBpY2tlcikge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXIub3BlbigpO1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19