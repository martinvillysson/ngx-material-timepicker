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
            .withPositions([{ originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' }]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFdBQVcsRUFDWCxVQUFVLEVBQ1YsU0FBUyxFQUNULGdCQUFnQixFQUVoQixpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUc3QyxPQUFPLEVBQ0gscUNBQXFDLEVBQ3hDLE1BQU0sd0ZBQXdGLENBQUM7QUFFaEcsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxPQUFPLEVBQWMsTUFBTSxzQkFBc0IsQ0FBQztBQUUzRCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFRbEIsSUFBYSw4QkFBOEIsR0FBM0MsTUFBYSw4QkFBOEI7SUFpRHZDLFlBQW9CLE9BQWdCLEVBQVUsR0FBcUI7UUFBL0MsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUFVLFFBQUcsR0FBSCxHQUFHLENBQWtCO1FBaERuRSxnQkFBVyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFLdEIsVUFBSyxHQUFHLElBQUksQ0FBQztRQVUzQixrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUF3QnpCLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQ3JDLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ2xDLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ2xDLGlCQUFZLEdBQUcsSUFBSSxZQUFZ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Q0FBQyxLQUFLLENBQUM7OzZEQUFjO0FBQ2xCO0lBQVIsS0FBSyxFQUFFOzsyRUFBOEI7QUFDN0I7SUFBUixLQUFLLEVBQUU7OzJFQUE4QjtBQUM3QjtJQUFSLEtBQUssRUFBRTs7d0VBQTJCO0FBQzFCO0lBQVIsS0FBSyxFQUFFOzttRUFBcUI7QUFDcEI7SUFBUixLQUFLLEVBQUU7c0NBQVUsVUFBVTsrREFBQztBQVE3QjtJQURDLEtBQUssRUFBRTs7OzREQUdQO0FBT0Q7SUFEQyxLQUFLLEVBQUU7OztnRUFPUDtBQU1TO0lBQVQsTUFBTSxFQUFFOzsrREFBc0M7QUFDckM7SUFBVCxNQUFNLEVBQUU7OzhEQUFtQztBQUNsQztJQUFULE1BQU0sRUFBRTs7OERBQW1DO0FBQ2xDO0lBQVQsTUFBTSxFQUFFOztvRUFBMkM7QUEzQzNDLDhCQUE4QjtJQU4xQyxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUseUJBQXlCO1FBQ25DLDJEQUFxRDtRQUV2RCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7S0FDdEMsQ0FBQzs2Q0FrRCtCLE9BQU8sRUFBZSxnQkFBZ0I7R0FqRDFELDhCQUE4QixDQXFKMUM7U0FySlksOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBUZW1wbGF0ZVJlZixcclxuICBFbGVtZW50UmVmLFxyXG4gIFZpZXdDaGlsZCxcclxuICBWaWV3Q29udGFpbmVyUmVmLFxyXG4gIE9uRGVzdHJveSxcclxuICBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgVGltZXBpY2tlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ3gtdGltZXBpY2tlci5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcclxuaW1wb3J0IHtcclxuICAgIE5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnRcclxufSBmcm9tICcuL2NvbXBvbmVudHMvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItY29udGVudC9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1jb250ZW50LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRpbWVwaWNrZXJSZWYgfSBmcm9tICcuL21vZGVscy90aW1lcGlja2VyLXJlZi5pbnRlcmZhY2UnO1xyXG5pbXBvcnQge0NvbXBvbmVudFBvcnRhbH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XHJcbmltcG9ydCB7IE92ZXJsYXksIE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XHJcblxyXG5jb25zdCBFU0NBUEUgPSAyNztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlcicsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL25neC1tYXRlcmlhbC10aW1lcGlja2VyLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgVGltZXBpY2tlclJlZiwgT25EZXN0cm95IHtcclxuICAgIHRpbWVVcGRhdGVkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG4gICAgQFZpZXdDaGlsZCgncGlja2VyVG1wbCcsIHsgc3RhdGljOiB0cnVlIH0pIHBpY2tlclRtcGw6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgICBASW5wdXQoKSBjYW5jZWxCdG5UbXBsOiBUZW1wbGF0ZVJlZjxOb2RlPjtcclxuICAgIEBJbnB1dCgpIGVkaXRhYmxlSGludFRtcGw6IFRlbXBsYXRlUmVmPE5vZGU+O1xyXG4gICAgQElucHV0KCkgY29uZmlybUJ0blRtcGw6IFRlbXBsYXRlUmVmPE5vZGU+O1xyXG4gICAgQElucHV0KCdFU0MnKSBpc0VzYyA9IHRydWU7XHJcbiAgICBASW5wdXQoKSBlbmFibGVLZXlib2FyZElucHV0OiBib29sZWFuO1xyXG4gICAgQElucHV0KCkgcHJldmVudE92ZXJsYXlDbGljazogYm9vbGVhbjtcclxuICAgIEBJbnB1dCgpIGRpc2FibGVBbmltYXRpb246IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSBkZWZhdWx0VGltZTogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgdHJpZ2dlcjogRWxlbWVudFJlZjtcclxuICAgIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWY7XHJcbiAgICBvdmVybGF5RGV0YWNobWVudHNTdWJzY3JpcHRpb246IGFueTtcclxuICAgIG92ZXJsYXlCYWNrZHJvcENsaWNrU3Vic2NyaXB0aW9uOiBhbnk7XHJcbiAgICBvdmVybGF5S2V5RG93blN1YnNjcmlwdGlvbjogYW55O1xyXG4gICAgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IGZvcm1hdCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fZm9ybWF0ID0gdmFsdWUgPT09IDI0ID8gMjQgOiAxMjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZm9ybWF0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZXBpY2tlcklucHV0ID8gdGhpcy50aW1lcGlja2VySW5wdXQuZm9ybWF0IDogdGhpcy5fZm9ybWF0O1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgbWludXRlc0dhcChnYXA6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChnYXAgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdhcCA9IE1hdGguZmxvb3IoZ2FwKTtcclxuICAgICAgICB0aGlzLl9taW51dGVzR2FwID0gZ2FwIDw9IDU5ID8gZ2FwIDogMTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWludXRlc0dhcCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9taW51dGVzR2FwO1xyXG4gICAgfVxyXG5cclxuICAgIEBPdXRwdXQoKSB0aW1lU2V0ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcbiAgICBAT3V0cHV0KCkgb3BlbmVkID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xyXG4gICAgQE91dHB1dCgpIGNsb3NlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcclxuICAgIEBPdXRwdXQoKSBob3VyU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcclxuXHJcbiAgICBwcml2YXRlIF9taW51dGVzR2FwOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9mb3JtYXQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgdGltZXBpY2tlcklucHV0OiBUaW1lcGlja2VyRGlyZWN0aXZlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSwgcHJpdmF0ZSB2Y3I6IFZpZXdDb250YWluZXJSZWYpIHtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWluVGltZSgpOiBEYXRlVGltZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZXBpY2tlcklucHV0ICYmICh0aGlzLnRpbWVwaWNrZXJJbnB1dC5taW4gYXMgRGF0ZVRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtYXhUaW1lKCk6IERhdGVUaW1lIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50aW1lcGlja2VySW5wdXQgJiYgKHRoaXMudGltZXBpY2tlcklucHV0Lm1heCBhcyBEYXRlVGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRpbWVwaWNrZXJJbnB1dCAmJiB0aGlzLnRpbWVwaWNrZXJJbnB1dC5kaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdGltZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRpbWVwaWNrZXJJbnB1dCAmJiB0aGlzLnRpbWVwaWNrZXJJbnB1dC52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiBSZWdpc3RlciBhbiBpbnB1dCB3aXRoIHRoaXMgdGltZXBpY2tlci5cclxuICAgICAqIGlucHV0IC0gVGhlIHRpbWVwaWNrZXIgaW5wdXQgdG8gcmVnaXN0ZXIgd2l0aCB0aGlzIHRpbWVwaWNrZXJcclxuICAgICAqL1xyXG4gICAgcmVnaXN0ZXJJbnB1dChpbnB1dDogVGltZXBpY2tlckRpcmVjdGl2ZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWVwaWNrZXJJbnB1dCkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcignQSBUaW1lcGlja2VyIGNhbiBvbmx5IGJlIGFzc29jaWF0ZWQgd2l0aCBhIHNpbmdsZSBpbnB1dC4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudGltZXBpY2tlcklucHV0ID0gaW5wdXQ7XHJcbiAgICAgICAgdGhpcy50cmlnZ2VyID0gaW5wdXQuZWxlbWVudFJlZjtcclxuICAgIH1cclxuXHJcbiAgICBvcGVuKCk6IHZvaWQge1xyXG5cclxuICAgICAgY29uc3QgcG9zaXRpb25TdHJhdGVneSA9IHRoaXMub3ZlcmxheVxyXG4gICAgICAgIC5wb3NpdGlvbigpXHJcbiAgICAgICAgLmZsZXhpYmxlQ29ubmVjdGVkVG8odGhpcy50cmlnZ2VyKVxyXG4gICAgICAgIC53aXRoUG9zaXRpb25zKFt7b3JpZ2luWDogJ2VuZCcsIG9yaWdpblk6ICdjZW50ZXInLCBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICdjZW50ZXInfV0pO1xyXG5cclxuICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZSh7XHJcbiAgICAgICAgaGFzQmFja2Ryb3A6IHRydWUsXHJcbiAgICAgICAgcG9zaXRpb25TdHJhdGVneTogcG9zaXRpb25TdHJhdGVneSxcclxuICAgICAgICBkaXNwb3NlT25OYXZpZ2F0aW9uOiB0cnVlLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQodGhpcy5vdmVybGF5UmVmXHJcbiAgICAgIC5rZXlkb3duRXZlbnRzKClcclxuICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcclxuICAgICAgICBpZiAoZXZlbnQua2V5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXHJcbiAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pKTtcclxuXHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQodGhpcy5vdmVybGF5UmVmLmJhY2tkcm9wQ2xpY2soKS5zdWJzY3JpYmUoKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xyXG4gICAgICB9KSk7XHJcblxyXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKHRoaXMub3ZlcmxheVJlZi5kZXRhY2htZW50cygpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jbG9zZWQubmV4dCgpO1xyXG4gICAgICB9KSk7XHJcblxyXG4gICAgICBjb25zdCBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50UG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbChOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50LCB0aGlzLnZjcik7XHJcblxyXG4gICAgICAgIGNvbnN0IG5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQgPSB0aGlzLm92ZXJsYXlSZWYuYXR0YWNoKG5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnRQb3J0YWwpO1xyXG5cclxuICAgICAgICBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50Lmluc3RhbmNlLnRpbWVwaWNrZXJCYXNlUmVmID0gdGhpcztcclxuICAgICAgICBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50Lmluc3RhbmNlLnRpbWUgPSB0aGlzLnRpbWU7XHJcbiAgICAgICAgbmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudC5pbnN0YW5jZS5kZWZhdWx0VGltZSA9IHRoaXMuZGVmYXVsdFRpbWU7XHJcbiAgICAgICAgbmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudC5pbnN0YW5jZS5tYXhUaW1lID0gdGhpcy5tYXhUaW1lO1xyXG4gICAgICAgIG5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQuaW5zdGFuY2UubWluVGltZSA9IHRoaXMubWluVGltZTtcclxuICAgICAgICBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50Lmluc3RhbmNlLmZvcm1hdCA9IHRoaXMuZm9ybWF0O1xyXG4gICAgICAgIG5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQuaW5zdGFuY2UubWludXRlc0dhcCA9IHRoaXMubWludXRlc0dhcDtcclxuICAgICAgICBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50Lmluc3RhbmNlLmRpc2FibGVBbmltYXRpb24gPSB0aGlzLmRpc2FibGVBbmltYXRpb247XHJcbiAgICAgICAgbmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudC5pbnN0YW5jZS5jYW5jZWxCdG5UbXBsID0gdGhpcy5jYW5jZWxCdG5UbXBsO1xyXG4gICAgICAgIG5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQuaW5zdGFuY2UuY29uZmlybUJ0blRtcGwgPSB0aGlzLmNvbmZpcm1CdG5UbXBsO1xyXG4gICAgICAgIG5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQuaW5zdGFuY2UuZWRpdGFibGVIaW50VG1wbCA9IHRoaXMuZWRpdGFibGVIaW50VG1wbDtcclxuICAgICAgICBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50Lmluc3RhbmNlLmRpc2FibGVkID0gdGhpcy5kaXNhYmxlZDtcclxuICAgICAgICBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50Lmluc3RhbmNlLmVuYWJsZUtleWJvYXJkSW5wdXQgPSB0aGlzLmVuYWJsZUtleWJvYXJkSW5wdXQ7XHJcbiAgICAgICAgbmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudC5pbnN0YW5jZS5wcmV2ZW50T3ZlcmxheUNsaWNrID0gdGhpcy5wcmV2ZW50T3ZlcmxheUNsaWNrO1xyXG4gICAgICAgIHRoaXMub3BlbmVkLm5leHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVGltZSh0aW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRpbWVVcGRhdGVkLm5leHQodGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==