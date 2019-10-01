import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, TemplateRef, ElementRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { NgxMaterialTimepickerContentComponent } from './components/ngx-material-timepicker-content/ngx-material-timepicker-content.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay } from '@angular/cdk/overlay';
const ESCAPE = 27;
let NgxMaterialTimepickerComponent = class NgxMaterialTimepickerComponent {
    constructor(overlay, vcr) {
        this.overlay = overlay;
        this.vcr = vcr;
        this.timeUpdated = new Subject();
        this.isEsc = true;
        this.positions = [{ originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' }];
        this.subscriptions = new Subscription();
        this.timeSet = new EventEmitter();
        this.opened = new EventEmitter();
        this.closed = new EventEmitter();
        this.hourSelected = new EventEmitter();
    }
    set format(value) {
        this._format = value === 24 ? 24 : 12;
    }
    get format() {
        return this.timepickerInput ? this.timepickerInput.format : this._format;
    }
    set minutesGap(gap) {
        if (gap == null) {
            return;
        }
        gap = Math.floor(gap);
        this._minutesGap = gap <= 59 ? gap : 1;
    }
    get minutesGap() {
        return this._minutesGap;
    }
    get minTime() {
        return this.timepickerInput && this.timepickerInput.min;
    }
    get maxTime() {
        return this.timepickerInput && this.timepickerInput.max;
    }
    get disabled() {
        return this.timepickerInput && this.timepickerInput.disabled;
    }
    get time() {
        return this.timepickerInput && this.timepickerInput.value;
    }
    /***
     * Register an input with this timepicker.
     * input - The timepicker input to register with this timepicker
     */
    registerInput(input) {
        if (this.timepickerInput) {
            throw Error('A Timepicker can only be associated with a single input.');
        }
        this.timepickerInput = input;
        this.trigger = input.elementRef;
    }
    open() {
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(this.trigger)
            .withPositions(this.positions);
        this.overlayRef = this.overlay.create({
            hasBackdrop: true,
            positionStrategy: positionStrategy,
            disposeOnNavigation: true,
        });
        this.subscriptions.add(this.overlayRef
            .keydownEvents()
            .subscribe((event) => {
            if (event.key !== undefined) {
                if (event.key === 'Escape') {
                    this.overlayRef.detach();
                }
            }
            else {
                // tslint:disable-next-line:deprecation
                if (event.keyCode === ESCAPE) {
                    this.overlayRef.detach();
                }
            }
        }));
        this.subscriptions.add(this.overlayRef.backdropClick().subscribe((event) => {
            this.overlayRef.detach();
        }));
        this.subscriptions.add(this.overlayRef.detachments().subscribe(() => {
            this.closed.next();
        }));
        const ngxMaterialTimepickerContentComponentPortal = new ComponentPortal(NgxMaterialTimepickerContentComponent, this.vcr);
        const ngxMaterialTimepickerContentComponent = this.overlayRef.attach(ngxMaterialTimepickerContentComponentPortal);
        ngxMaterialTimepickerContentComponent.instance.timepickerBaseRef = this;
        ngxMaterialTimepickerContentComponent.instance.time = this.time;
        ngxMaterialTimepickerContentComponent.instance.defaultTime = this.defaultTime;
        ngxMaterialTimepickerContentComponent.instance.maxTime = this.maxTime;
        ngxMaterialTimepickerContentComponent.instance.minTime = this.minTime;
        ngxMaterialTimepickerContentComponent.instance.format = this.format;
        ngxMaterialTimepickerContentComponent.instance.minutesGap = this.minutesGap;
        ngxMaterialTimepickerContentComponent.instance.disableAnimation = this.disableAnimation;
        ngxMaterialTimepickerContentComponent.instance.cancelBtnTmpl = this.cancelBtnTmpl;
        ngxMaterialTimepickerContentComponent.instance.confirmBtnTmpl = this.confirmBtnTmpl;
        ngxMaterialTimepickerContentComponent.instance.editableHintTmpl = this.editableHintTmpl;
        ngxMaterialTimepickerContentComponent.instance.disabled = this.disabled;
        ngxMaterialTimepickerContentComponent.instance.enableKeyboardInput = this.enableKeyboardInput;
        ngxMaterialTimepickerContentComponent.instance.preventOverlayClick = this.preventOverlayClick;
        this.opened.next();
    }
    close() {
        this.overlayRef.detach();
    }
    updateTime(time) {
        this.timeUpdated.next(time);
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
};
tslib_1.__decorate([
    ViewChild('pickerTmpl', { static: true }),
    tslib_1.__metadata("design:type", TemplateRef)
], NgxMaterialTimepickerComponent.prototype, "pickerTmpl", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], NgxMaterialTimepickerComponent.prototype, "cancelBtnTmpl", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], NgxMaterialTimepickerComponent.prototype, "editableHintTmpl", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], NgxMaterialTimepickerComponent.prototype, "confirmBtnTmpl", void 0);
tslib_1.__decorate([
    Input('ESC'),
    tslib_1.__metadata("design:type", Object)
], NgxMaterialTimepickerComponent.prototype, "isEsc", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], NgxMaterialTimepickerComponent.prototype, "enableKeyboardInput", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], NgxMaterialTimepickerComponent.prototype, "preventOverlayClick", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], NgxMaterialTimepickerComponent.prototype, "disableAnimation", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], NgxMaterialTimepickerComponent.prototype, "defaultTime", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", ElementRef)
], NgxMaterialTimepickerComponent.prototype, "trigger", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], NgxMaterialTimepickerComponent.prototype, "positions", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number),
    tslib_1.__metadata("design:paramtypes", [Number])
], NgxMaterialTimepickerComponent.prototype, "format", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number),
    tslib_1.__metadata("design:paramtypes", [Number])
], NgxMaterialTimepickerComponent.prototype, "minutesGap", null);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], NgxMaterialTimepickerComponent.prototype, "timeSet", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], NgxMaterialTimepickerComponent.prototype, "opened", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], NgxMaterialTimepickerComponent.prototype, "closed", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], NgxMaterialTimepickerComponent.prototype, "hourSelected", void 0);
NgxMaterialTimepickerComponent = tslib_1.__decorate([
    Component({
        selector: 'ngx-material-timepicker',
        template: "<ng-template #pickerTmpl>\r\n</ng-template>\r\n",
        encapsulation: ViewEncapsulation.None,
        styles: [".cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-overlay-container:empty{display:none}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000;display:flex;max-width:100%;max-height:100%}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:1}@media screen and (-ms-high-contrast:active){.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.6}}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.32)}.cdk-overlay-transparent-backdrop,.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing{opacity:0}.cdk-overlay-connected-position-bounding-box{position:absolute;z-index:1000;display:flex;flex-direction:column;min-width:1px;min-height:1px}.cdk-global-scrollblock{position:fixed;width:100%;overflow-y:scroll}"]
    }),
    tslib_1.__metadata("design:paramtypes", [Overlay, ViewContainerRef])
], NgxMaterialTimepickerComponent);
export { NgxMaterialTimepickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFdBQVcsRUFDWCxVQUFVLEVBQ1YsU0FBUyxFQUNULGdCQUFnQixFQUVoQixpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUc3QyxPQUFPLEVBQ0gscUNBQXFDLEVBQ3hDLE1BQU0sd0ZBQXdGLENBQUM7QUFFaEcsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxPQUFPLEVBQWlDLE1BQU0sc0JBQXNCLENBQUM7QUFFOUUsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBUWxCLElBQWEsOEJBQThCLEdBQTNDLE1BQWEsOEJBQThCO0lBa0R2QyxZQUFvQixPQUFnQixFQUFVLEdBQXFCO1FBQS9DLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFrQjtRQWpEbkUsZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBS3RCLFVBQUssR0FBRyxJQUFJLENBQUM7UUFNbEIsY0FBUyxHQUF3QixDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7UUFLdEgsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBd0J6QixZQUFPLEdBQUcs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QUFFO3NDQUFpQixXQUFXO3NFQUFPO0FBQzdCO0lBQWIsS0FBSyxDQUFDLEtBQUssQ0FBQzs7NkRBQWM7QUFDbEI7SUFBUixLQUFLLEVBQUU7OzJFQUE4QjtBQUM3QjtJQUFSLEtBQUssRUFBRTs7MkVBQThCO0FBQzdCO0lBQVIsS0FBSyxFQUFFOzt3RUFBMkI7QUFDMUI7SUFBUixLQUFLLEVBQUU7O21FQUFxQjtBQUNwQjtJQUFSLEtBQUssRUFBRTtzQ0FBVSxVQUFVOytEQUFDO0FBQ3BCO0lBQVIsS0FBSyxFQUFFOztpRUFBOEc7QUFRdEg7SUFEQyxLQUFLLEVBQUU7Ozs0REFHUDtBQU9EO0lBREMsS0FBSyxFQUFFOzs7Z0VBT1A7QUFNUztJQUFULE1BQU0sRUFBRTs7K0RBQXNDO0FBQ3JDO0lBQVQsTUFBTSxFQUFFOzs4REFBbUM7QUFDbEM7SUFBVCxNQUFNLEVBQUU7OzhEQUFtQztBQUNsQztJQUFULE1BQU0sRUFBRTs7b0VBQTJDO0FBNUMzQyw4QkFBOEI7SUFOMUMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLHlCQUF5QjtRQUNuQywyREFBcUQ7UUFFdkQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O0tBQ3RDLENBQUM7NkNBbUQrQixPQUFPLEVBQWUsZ0JBQWdCO0dBbEQxRCw4QkFBOEIsQ0FzSjFDO1NBdEpZLDhCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgRWxlbWVudFJlZixcclxuICBWaWV3Q2hpbGQsXHJcbiAgVmlld0NvbnRhaW5lclJlZixcclxuICBPbkRlc3Ryb3ksXHJcbiAgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFRpbWVwaWNrZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmd4LXRpbWVwaWNrZXIuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XHJcbmltcG9ydCB7XHJcbiAgICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50XHJcbn0gZnJvbSAnLi9jb21wb25lbnRzL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWNvbnRlbnQvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItY29udGVudC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUaW1lcGlja2VyUmVmIH0gZnJvbSAnLi9tb2RlbHMvdGltZXBpY2tlci1yZWYuaW50ZXJmYWNlJztcclxuaW1wb3J0IHtDb21wb25lbnRQb3J0YWx9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xyXG5pbXBvcnQgeyBPdmVybGF5LCBPdmVybGF5UmVmLCBDb25uZWN0ZWRQb3NpdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcclxuXHJcbmNvbnN0IEVTQ0FQRSA9IDI3O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50LnNjc3MnXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBUaW1lcGlja2VyUmVmLCBPbkRlc3Ryb3kge1xyXG4gICAgdGltZVVwZGF0ZWQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcbiAgICBAVmlld0NoaWxkKCdwaWNrZXJUbXBsJywgeyBzdGF0aWM6IHRydWUgfSkgcGlja2VyVG1wbDogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIEBJbnB1dCgpIGNhbmNlbEJ0blRtcGw6IFRlbXBsYXRlUmVmPE5vZGU+O1xyXG4gICAgQElucHV0KCkgZWRpdGFibGVIaW50VG1wbDogVGVtcGxhdGVSZWY8Tm9kZT47XHJcbiAgICBASW5wdXQoKSBjb25maXJtQnRuVG1wbDogVGVtcGxhdGVSZWY8Tm9kZT47XHJcbiAgICBASW5wdXQoJ0VTQycpIGlzRXNjID0gdHJ1ZTtcclxuICAgIEBJbnB1dCgpIGVuYWJsZUtleWJvYXJkSW5wdXQ6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSBwcmV2ZW50T3ZlcmxheUNsaWNrOiBib29sZWFuO1xyXG4gICAgQElucHV0KCkgZGlzYWJsZUFuaW1hdGlvbjogYm9vbGVhbjtcclxuICAgIEBJbnB1dCgpIGRlZmF1bHRUaW1lOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSB0cmlnZ2VyOiBFbGVtZW50UmVmO1xyXG4gICAgQElucHV0KCkgcG9zaXRpb25zOiBDb25uZWN0ZWRQb3NpdGlvbltdID0gW3tvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAnYm90dG9tJywgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAndG9wJ31dO1xyXG4gICAgb3ZlcmxheVJlZjogT3ZlcmxheVJlZjtcclxuICAgIG92ZXJsYXlEZXRhY2htZW50c1N1YnNjcmlwdGlvbjogYW55O1xyXG4gICAgb3ZlcmxheUJhY2tkcm9wQ2xpY2tTdWJzY3JpcHRpb246IGFueTtcclxuICAgIG92ZXJsYXlLZXlEb3duU3Vic2NyaXB0aW9uOiBhbnk7XHJcbiAgICBzdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgZm9ybWF0KHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9mb3JtYXQgPSB2YWx1ZSA9PT0gMjQgPyAyNCA6IDEyO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBmb3JtYXQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50aW1lcGlja2VySW5wdXQgPyB0aGlzLnRpbWVwaWNrZXJJbnB1dC5mb3JtYXQgOiB0aGlzLl9mb3JtYXQ7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBtaW51dGVzR2FwKGdhcDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGdhcCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2FwID0gTWF0aC5mbG9vcihnYXApO1xyXG4gICAgICAgIHRoaXMuX21pbnV0ZXNHYXAgPSBnYXAgPD0gNTkgPyBnYXAgOiAxO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtaW51dGVzR2FwKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbnV0ZXNHYXA7XHJcbiAgICB9XHJcblxyXG4gICAgQE91dHB1dCgpIHRpbWVTZXQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuICAgIEBPdXRwdXQoKSBvcGVuZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bGw+KCk7XHJcbiAgICBAT3V0cHV0KCkgY2xvc2VkID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xyXG4gICAgQE91dHB1dCgpIGhvdXJTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xyXG5cclxuICAgIHByaXZhdGUgX21pbnV0ZXNHYXA6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2Zvcm1hdDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSB0aW1lcGlja2VySW5wdXQ6IFRpbWVwaWNrZXJEaXJlY3RpdmU7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LCBwcml2YXRlIHZjcjogVmlld0NvbnRhaW5lclJlZikge1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtaW5UaW1lKCk6IERhdGVUaW1lIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50aW1lcGlja2VySW5wdXQgJiYgKHRoaXMudGltZXBpY2tlcklucHV0Lm1pbiBhcyBEYXRlVGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1heFRpbWUoKTogRGF0ZVRpbWUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRpbWVwaWNrZXJJbnB1dCAmJiAodGhpcy50aW1lcGlja2VySW5wdXQubWF4IGFzIERhdGVUaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZXBpY2tlcklucHV0ICYmIHRoaXMudGltZXBpY2tlcklucHV0LmRpc2FibGVkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0aW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZXBpY2tlcklucHV0ICYmIHRoaXMudGltZXBpY2tlcklucHV0LnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIFJlZ2lzdGVyIGFuIGlucHV0IHdpdGggdGhpcyB0aW1lcGlja2VyLlxyXG4gICAgICogaW5wdXQgLSBUaGUgdGltZXBpY2tlciBpbnB1dCB0byByZWdpc3RlciB3aXRoIHRoaXMgdGltZXBpY2tlclxyXG4gICAgICovXHJcbiAgICByZWdpc3RlcklucHV0KGlucHV0OiBUaW1lcGlja2VyRGlyZWN0aXZlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMudGltZXBpY2tlcklucHV0KSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdBIFRpbWVwaWNrZXIgY2FuIG9ubHkgYmUgYXNzb2NpYXRlZCB3aXRoIGEgc2luZ2xlIGlucHV0LicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50aW1lcGlja2VySW5wdXQgPSBpbnB1dDtcclxuICAgICAgICB0aGlzLnRyaWdnZXIgPSBpbnB1dC5lbGVtZW50UmVmO1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW4oKTogdm9pZCB7XHJcblxyXG4gICAgICBjb25zdCBwb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5vdmVybGF5XHJcbiAgICAgICAgLnBvc2l0aW9uKClcclxuICAgICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLnRyaWdnZXIpXHJcbiAgICAgICAgLndpdGhQb3NpdGlvbnModGhpcy5wb3NpdGlvbnMpO1xyXG5cclxuICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZSh7XHJcbiAgICAgICAgaGFzQmFja2Ryb3A6IHRydWUsXHJcbiAgICAgICAgcG9zaXRpb25TdHJhdGVneTogcG9zaXRpb25TdHJhdGVneSxcclxuICAgICAgICBkaXNwb3NlT25OYXZpZ2F0aW9uOiB0cnVlLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQodGhpcy5vdmVybGF5UmVmXHJcbiAgICAgIC5rZXlkb3duRXZlbnRzKClcclxuICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcclxuICAgICAgICBpZiAoZXZlbnQua2V5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXHJcbiAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pKTtcclxuXHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQodGhpcy5vdmVybGF5UmVmLmJhY2tkcm9wQ2xpY2soKS5zdWJzY3JpYmUoKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xyXG4gICAgICB9KSk7XHJcblxyXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKHRoaXMub3ZlcmxheVJlZi5kZXRhY2htZW50cygpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jbG9zZWQubmV4dCgpO1xyXG4gICAgICB9KSk7XHJcblxyXG4gICAgICBjb25zdCBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50UG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbChOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50LCB0aGlzLnZjcik7XHJcblxyXG4gICAgICAgIGNvbnN0IG5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQgPSB0aGlzLm92ZXJsYXlSZWYuYXR0YWNoKG5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnRQb3J0YWwpO1xyXG5cclxuICAgICAgICBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50Lmluc3RhbmNlLnRpbWVwaWNrZXJCYXNlUmVmID0gdGhpcztcclxuICAgICAgICBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50Lmluc3RhbmNlLnRpbWUgPSB0aGlzLnRpbWU7XHJcbiAgICAgICAgbmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudC5pbnN0YW5jZS5kZWZhdWx0VGltZSA9IHRoaXMuZGVmYXVsdFRpbWU7XHJcbiAgICAgICAgbmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudC5pbnN0YW5jZS5tYXhUaW1lID0gdGhpcy5tYXhUaW1lO1xyXG4gICAgICAgIG5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQuaW5zdGFuY2UubWluVGltZSA9IHRoaXMubWluVGltZTtcclxuICAgICAgICBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50Lmluc3RhbmNlLmZvcm1hdCA9IHRoaXMuZm9ybWF0O1xyXG4gICAgICAgIG5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQuaW5zdGFuY2UubWludXRlc0dhcCA9IHRoaXMubWludXRlc0dhcDtcclxuICAgICAgICBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50Lmluc3RhbmNlLmRpc2FibGVBbmltYXRpb24gPSB0aGlzLmRpc2FibGVBbmltYXRpb247XHJcbiAgICAgICAgbmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudC5pbnN0YW5jZS5jYW5jZWxCdG5UbXBsID0gdGhpcy5jYW5jZWxCdG5UbXBsO1xyXG4gICAgICAgIG5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQuaW5zdGFuY2UuY29uZmlybUJ0blRtcGwgPSB0aGlzLmNvbmZpcm1CdG5UbXBsO1xyXG4gICAgICAgIG5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQuaW5zdGFuY2UuZWRpdGFibGVIaW50VG1wbCA9IHRoaXMuZWRpdGFibGVIaW50VG1wbDtcclxuICAgICAgICBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50Lmluc3RhbmNlLmRpc2FibGVkID0gdGhpcy5kaXNhYmxlZDtcclxuICAgICAgICBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50Lmluc3RhbmNlLmVuYWJsZUtleWJvYXJkSW5wdXQgPSB0aGlzLmVuYWJsZUtleWJvYXJkSW5wdXQ7XHJcbiAgICAgICAgbmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudC5pbnN0YW5jZS5wcmV2ZW50T3ZlcmxheUNsaWNrID0gdGhpcy5wcmV2ZW50T3ZlcmxheUNsaWNrO1xyXG4gICAgICAgIHRoaXMub3BlbmVkLm5leHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVGltZSh0aW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRpbWVVcGRhdGVkLm5leHQodGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==