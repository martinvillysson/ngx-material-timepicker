import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, TemplateRef, ElementRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { NgxMaterialTimepickerContentComponent } from './components/ngx-material-timepicker-content/ngx-material-timepicker-content.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay } from '@angular/cdk/overlay';
var ESCAPE = 27;
var NgxMaterialTimepickerComponent = /** @class */ (function () {
    function NgxMaterialTimepickerComponent(overlay, vcr) {
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
    Object.defineProperty(NgxMaterialTimepickerComponent.prototype, "format", {
        get: function () {
            return this.timepickerInput ? this.timepickerInput.format : this._format;
        },
        set: function (value) {
            this._format = value === 24 ? 24 : 12;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerComponent.prototype, "minutesGap", {
        get: function () {
            return this._minutesGap;
        },
        set: function (gap) {
            if (gap == null) {
                return;
            }
            gap = Math.floor(gap);
            this._minutesGap = gap <= 59 ? gap : 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerComponent.prototype, "minTime", {
        get: function () {
            return this.timepickerInput && this.timepickerInput.min;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerComponent.prototype, "maxTime", {
        get: function () {
            return this.timepickerInput && this.timepickerInput.max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerComponent.prototype, "disabled", {
        get: function () {
            return this.timepickerInput && this.timepickerInput.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerComponent.prototype, "time", {
        get: function () {
            return this.timepickerInput && this.timepickerInput.value;
        },
        enumerable: true,
        configurable: true
    });
    /***
     * Register an input with this timepicker.
     * input - The timepicker input to register with this timepicker
     */
    NgxMaterialTimepickerComponent.prototype.registerInput = function (input) {
        if (this.timepickerInput) {
            throw Error('A Timepicker can only be associated with a single input.');
        }
        this.timepickerInput = input;
        this.trigger = input.elementRef;
    };
    NgxMaterialTimepickerComponent.prototype.open = function () {
        var _this = this;
        var positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(this.trigger)
            .withPositions(this.positions);
        this.overlayRef = this.overlay.create({
            panelClass: this.panelClass,
            hasBackdrop: true,
            positionStrategy: positionStrategy,
            disposeOnNavigation: true,
        });
        this.subscriptions.add(this.overlayRef
            .keydownEvents()
            .subscribe(function (event) {
            if (event.key !== undefined) {
                if (event.key === 'Escape') {
                    _this.overlayRef.detach();
                }
            }
            else {
                // tslint:disable-next-line:deprecation
                if (event.keyCode === ESCAPE) {
                    _this.overlayRef.detach();
                }
            }
        }));
        this.subscriptions.add(this.overlayRef.backdropClick().subscribe(function (event) {
            _this.overlayRef.detach();
        }));
        this.subscriptions.add(this.overlayRef.detachments().subscribe(function () {
            _this.closed.next();
        }));
        var ngxMaterialTimepickerContentComponentPortal = new ComponentPortal(NgxMaterialTimepickerContentComponent, this.vcr);
        var ngxMaterialTimepickerContentComponent = this.overlayRef.attach(ngxMaterialTimepickerContentComponentPortal);
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
    };
    NgxMaterialTimepickerComponent.prototype.close = function () {
        this.overlayRef.detach();
    };
    NgxMaterialTimepickerComponent.prototype.updateTime = function (time) {
        this.timeUpdated.next(time);
    };
    NgxMaterialTimepickerComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
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
        tslib_1.__metadata("design:type", String)
    ], NgxMaterialTimepickerComponent.prototype, "panelClass", void 0);
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
    return NgxMaterialTimepickerComponent;
}());
export { NgxMaterialTimepickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFdBQVcsRUFDWCxVQUFVLEVBQ1YsU0FBUyxFQUNULGdCQUFnQixFQUVoQixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHN0MsT0FBTyxFQUNMLHFDQUFxQyxFQUN0QyxNQUFNLHdGQUF3RixDQUFDO0FBRWhHLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsT0FBTyxFQUFpQyxNQUFNLHNCQUFzQixDQUFDO0FBRTlFLElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztBQVFsQjtJQW1ERSx3Q0FBb0IsT0FBZ0IsRUFBVSxHQUFxQjtRQUEvQyxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBa0I7UUFsRG5FLGdCQUFXLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUt0QixVQUFLLEdBQUcsSUFBSSxDQUFDO1FBT2xCLGNBQVMsR0FBd0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBS3hILGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQXdCekIsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDckMsV0FB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QWdCLFdBQVc7eUVBQU87SUFDakM7UUFBUixLQUFLLEVBQUU7MENBQW1CLFdBQVc7NEVBQU87SUFDcEM7UUFBUixLQUFLLEVBQUU7MENBQWlCLFdBQVc7MEVBQU87SUFDN0I7UUFBYixLQUFLLENBQUMsS0FBSyxDQUFDOztpRUFBYztJQUNsQjtRQUFSLEtBQUssRUFBRTs7K0VBQThCO0lBQzdCO1FBQVIsS0FBSyxFQUFFOzsrRUFBOEI7SUFDN0I7UUFBUixLQUFLLEVBQUU7OzRFQUEyQjtJQUMxQjtRQUFSLEtBQUssRUFBRTs7dUVBQXFCO0lBQ3BCO1FBQVIsS0FBSyxFQUFFOzBDQUFVLFVBQVU7bUVBQUM7SUFDcEI7UUFBUixLQUFLLEVBQUU7O3NFQUFvQjtJQUNuQjtRQUFSLEtBQUssRUFBRTs7cUVBQWdIO0lBUXhIO1FBREMsS0FBSyxFQUFFOzs7Z0VBR1A7SUFPRDtRQURDLEtBQUssRUFBRTs7O29FQU9QO0lBTVM7UUFBVCxNQUFNLEVBQUU7O21FQUFzQztJQUNyQztRQUFULE1BQU0sRUFBRTs7a0VBQW1DO0lBQ2xDO1FBQVQsTUFBTSxFQUFFOztrRUFBbUM7SUFDbEM7UUFBVCxNQUFNLEVBQUU7O3dFQUEyQztJQTdDekMsOEJBQThCO1FBTjFDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSx5QkFBeUI7WUFDbkMsMkRBQXFEO1lBRXJELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztTQUN0QyxDQUFDO2lEQW9ENkIsT0FBTyxFQUFlLGdCQUFnQjtPQW5EeEQsOEJBQThCLENBd0oxQztJQUFELHFDQUFDO0NBQUEsQUF4SkQsSUF3SkM7U0F4SlksOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBUZW1wbGF0ZVJlZixcclxuICBFbGVtZW50UmVmLFxyXG4gIFZpZXdDaGlsZCxcclxuICBWaWV3Q29udGFpbmVyUmVmLFxyXG4gIE9uRGVzdHJveSxcclxuICBWaWV3RW5jYXBzdWxhdGlvblxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgVGltZXBpY2tlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ3gtdGltZXBpY2tlci5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcclxuaW1wb3J0IHtcclxuICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50XHJcbn0gZnJvbSAnLi9jb21wb25lbnRzL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWNvbnRlbnQvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItY29udGVudC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUaW1lcGlja2VyUmVmIH0gZnJvbSAnLi9tb2RlbHMvdGltZXBpY2tlci1yZWYuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XHJcbmltcG9ydCB7IE92ZXJsYXksIE92ZXJsYXlSZWYsIENvbm5lY3RlZFBvc2l0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xyXG5cclxuY29uc3QgRVNDQVBFID0gMjc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyJyxcclxuICB0ZW1wbGF0ZVVybDogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci5jb21wb25lbnQuc2NzcyddLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIFRpbWVwaWNrZXJSZWYsIE9uRGVzdHJveSB7XHJcbiAgdGltZVVwZGF0ZWQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcbiAgQFZpZXdDaGlsZCgncGlja2VyVG1wbCcsIHsgc3RhdGljOiB0cnVlIH0pIHBpY2tlclRtcGw6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgQElucHV0KCkgY2FuY2VsQnRuVG1wbDogVGVtcGxhdGVSZWY8Tm9kZT47XHJcbiAgQElucHV0KCkgZWRpdGFibGVIaW50VG1wbDogVGVtcGxhdGVSZWY8Tm9kZT47XHJcbiAgQElucHV0KCkgY29uZmlybUJ0blRtcGw6IFRlbXBsYXRlUmVmPE5vZGU+O1xyXG4gIEBJbnB1dCgnRVNDJykgaXNFc2MgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIGVuYWJsZUtleWJvYXJkSW5wdXQ6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgcHJldmVudE92ZXJsYXlDbGljazogYm9vbGVhbjtcclxuICBASW5wdXQoKSBkaXNhYmxlQW5pbWF0aW9uOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGRlZmF1bHRUaW1lOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgdHJpZ2dlcjogRWxlbWVudFJlZjtcclxuICBASW5wdXQoKSBwYW5lbENsYXNzOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcG9zaXRpb25zOiBDb25uZWN0ZWRQb3NpdGlvbltdID0gW3sgb3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ2JvdHRvbScsIG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ3RvcCcgfV07XHJcbiAgb3ZlcmxheVJlZjogT3ZlcmxheVJlZjtcclxuICBvdmVybGF5RGV0YWNobWVudHNTdWJzY3JpcHRpb246IGFueTtcclxuICBvdmVybGF5QmFja2Ryb3BDbGlja1N1YnNjcmlwdGlvbjogYW55O1xyXG4gIG92ZXJsYXlLZXlEb3duU3Vic2NyaXB0aW9uOiBhbnk7XHJcbiAgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgZm9ybWF0KHZhbHVlOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX2Zvcm1hdCA9IHZhbHVlID09PSAyNCA/IDI0IDogMTI7XHJcbiAgfVxyXG5cclxuICBnZXQgZm9ybWF0KCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy50aW1lcGlja2VySW5wdXQgPyB0aGlzLnRpbWVwaWNrZXJJbnB1dC5mb3JtYXQgOiB0aGlzLl9mb3JtYXQ7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBtaW51dGVzR2FwKGdhcDogbnVtYmVyKSB7XHJcbiAgICBpZiAoZ2FwID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZ2FwID0gTWF0aC5mbG9vcihnYXApO1xyXG4gICAgdGhpcy5fbWludXRlc0dhcCA9IGdhcCA8PSA1OSA/IGdhcCA6IDE7XHJcbiAgfVxyXG5cclxuICBnZXQgbWludXRlc0dhcCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX21pbnV0ZXNHYXA7XHJcbiAgfVxyXG5cclxuICBAT3V0cHV0KCkgdGltZVNldCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG4gIEBPdXRwdXQoKSBvcGVuZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bGw+KCk7XHJcbiAgQE91dHB1dCgpIGNsb3NlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcclxuICBAT3V0cHV0KCkgaG91clNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XHJcblxyXG4gIHByaXZhdGUgX21pbnV0ZXNHYXA6IG51bWJlcjtcclxuICBwcml2YXRlIF9mb3JtYXQ6IG51bWJlcjtcclxuICBwcml2YXRlIHRpbWVwaWNrZXJJbnB1dDogVGltZXBpY2tlckRpcmVjdGl2ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LCBwcml2YXRlIHZjcjogVmlld0NvbnRhaW5lclJlZikge1xyXG4gIH1cclxuXHJcbiAgZ2V0IG1pblRpbWUoKTogRGF0ZVRpbWUge1xyXG4gICAgcmV0dXJuIHRoaXMudGltZXBpY2tlcklucHV0ICYmICh0aGlzLnRpbWVwaWNrZXJJbnB1dC5taW4gYXMgRGF0ZVRpbWUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG1heFRpbWUoKTogRGF0ZVRpbWUge1xyXG4gICAgcmV0dXJuIHRoaXMudGltZXBpY2tlcklucHV0ICYmICh0aGlzLnRpbWVwaWNrZXJJbnB1dC5tYXggYXMgRGF0ZVRpbWUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMudGltZXBpY2tlcklucHV0ICYmIHRoaXMudGltZXBpY2tlcklucHV0LmRpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHRpbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLnRpbWVwaWNrZXJJbnB1dCAmJiB0aGlzLnRpbWVwaWNrZXJJbnB1dC52YWx1ZTtcclxuICB9XHJcblxyXG4gIC8qKipcclxuICAgKiBSZWdpc3RlciBhbiBpbnB1dCB3aXRoIHRoaXMgdGltZXBpY2tlci5cclxuICAgKiBpbnB1dCAtIFRoZSB0aW1lcGlja2VyIGlucHV0IHRvIHJlZ2lzdGVyIHdpdGggdGhpcyB0aW1lcGlja2VyXHJcbiAgICovXHJcbiAgcmVnaXN0ZXJJbnB1dChpbnB1dDogVGltZXBpY2tlckRpcmVjdGl2ZSk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMudGltZXBpY2tlcklucHV0KSB7XHJcbiAgICAgIHRocm93IEVycm9yKCdBIFRpbWVwaWNrZXIgY2FuIG9ubHkgYmUgYXNzb2NpYXRlZCB3aXRoIGEgc2luZ2xlIGlucHV0LicpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudGltZXBpY2tlcklucHV0ID0gaW5wdXQ7XHJcbiAgICB0aGlzLnRyaWdnZXIgPSBpbnB1dC5lbGVtZW50UmVmO1xyXG4gIH1cclxuXHJcbiAgb3BlbigpOiB2b2lkIHtcclxuXHJcbiAgICBjb25zdCBwb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5vdmVybGF5XHJcbiAgICAgIC5wb3NpdGlvbigpXHJcbiAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKHRoaXMudHJpZ2dlcilcclxuICAgICAgLndpdGhQb3NpdGlvbnModGhpcy5wb3NpdGlvbnMpO1xyXG5cclxuICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUoe1xyXG4gICAgICBwYW5lbENsYXNzOiB0aGlzLnBhbmVsQ2xhc3MsXHJcbiAgICAgIGhhc0JhY2tkcm9wOiB0cnVlLFxyXG4gICAgICBwb3NpdGlvblN0cmF0ZWd5OiBwb3NpdGlvblN0cmF0ZWd5LFxyXG4gICAgICBkaXNwb3NlT25OYXZpZ2F0aW9uOiB0cnVlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZCh0aGlzLm92ZXJsYXlSZWZcclxuICAgICAgLmtleWRvd25FdmVudHMoKVxyXG4gICAgICAuc3Vic2NyaWJlKChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICAgIGlmIChldmVudC5rZXkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcclxuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cclxuICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBFU0NBUEUpIHtcclxuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSkpO1xyXG5cclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQodGhpcy5vdmVybGF5UmVmLmJhY2tkcm9wQ2xpY2soKS5zdWJzY3JpYmUoKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcclxuICAgIH0pKTtcclxuXHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKHRoaXMub3ZlcmxheVJlZi5kZXRhY2htZW50cygpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuY2xvc2VkLm5leHQoKTtcclxuICAgIH0pKTtcclxuXHJcbiAgICBjb25zdCBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50UG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbChOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50LCB0aGlzLnZjcik7XHJcblxyXG4gICAgY29uc3Qgbmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudCA9IHRoaXMub3ZlcmxheVJlZi5hdHRhY2gobmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudFBvcnRhbCk7XHJcblxyXG4gICAgbmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudC5pbnN0YW5jZS50aW1lcGlja2VyQmFzZVJlZiA9IHRoaXM7XHJcbiAgICBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50Lmluc3RhbmNlLnRpbWUgPSB0aGlzLnRpbWU7XHJcbiAgICBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50Lmluc3RhbmNlLmRlZmF1bHRUaW1lID0gdGhpcy5kZWZhdWx0VGltZTtcclxuICAgIG5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQuaW5zdGFuY2UubWF4VGltZSA9IHRoaXMubWF4VGltZTtcclxuICAgIG5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQuaW5zdGFuY2UubWluVGltZSA9IHRoaXMubWluVGltZTtcclxuICAgIG5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQuaW5zdGFuY2UuZm9ybWF0ID0gdGhpcy5mb3JtYXQ7XHJcbiAgICBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50Lmluc3RhbmNlLm1pbnV0ZXNHYXAgPSB0aGlzLm1pbnV0ZXNHYXA7XHJcbiAgICBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50Lmluc3RhbmNlLmRpc2FibGVBbmltYXRpb24gPSB0aGlzLmRpc2FibGVBbmltYXRpb247XHJcbiAgICBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50Lmluc3RhbmNlLmNhbmNlbEJ0blRtcGwgPSB0aGlzLmNhbmNlbEJ0blRtcGw7XHJcbiAgICBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50Lmluc3RhbmNlLmNvbmZpcm1CdG5UbXBsID0gdGhpcy5jb25maXJtQnRuVG1wbDtcclxuICAgIG5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQuaW5zdGFuY2UuZWRpdGFibGVIaW50VG1wbCA9IHRoaXMuZWRpdGFibGVIaW50VG1wbDtcclxuICAgIG5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQuaW5zdGFuY2UuZGlzYWJsZWQgPSB0aGlzLmRpc2FibGVkO1xyXG4gICAgbmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudC5pbnN0YW5jZS5lbmFibGVLZXlib2FyZElucHV0ID0gdGhpcy5lbmFibGVLZXlib2FyZElucHV0O1xyXG4gICAgbmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudC5pbnN0YW5jZS5wcmV2ZW50T3ZlcmxheUNsaWNrID0gdGhpcy5wcmV2ZW50T3ZlcmxheUNsaWNrO1xyXG4gICAgdGhpcy5vcGVuZWQubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgY2xvc2UoKTogdm9pZCB7XHJcbiAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVUaW1lKHRpbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy50aW1lVXBkYXRlZC5uZXh0KHRpbWUpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcbn1cclxuIl19