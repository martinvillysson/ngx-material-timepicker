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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFdBQVcsRUFDWCxVQUFVLEVBQ1YsU0FBUyxFQUNULGdCQUFnQixFQUVoQixpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUc3QyxPQUFPLEVBQ0gscUNBQXFDLEVBQ3hDLE1BQU0sd0ZBQXdGLENBQUM7QUFFaEcsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxPQUFPLEVBQWlDLE1BQU0sc0JBQXNCLENBQUM7QUFFOUUsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBUWxCO0lBa0RJLHdDQUFvQixPQUFnQixFQUFVLEdBQXFCO1FBQS9DLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFrQjtRQWpEbkUsZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBS3RCLFVBQUssR0FBRyxJQUFJLENBQUM7UUFNbEIsY0FBUyxHQUF3QixDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7UUFLdEgsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBd0J6QixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUNyQyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUNsQyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUNsQyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFPcEQsQ0FBQztJQS9CRCxzQkFBSSxrREFBTTthQUlWO1lBQ0ksT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3RSxDQUFDO2FBTkQsVUFBVyxLQUFhO1lBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDMUMsQ0FBQzs7O09BQUE7SUFPRCxzQkFBSSxzREFBVTthQVFkO1lBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzVCLENBQUM7YUFWRCxVQUFlLEdBQVc7WUFDdEIsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO2dCQUNiLE9BQU87YUFDVjtZQUNELEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0MsQ0FBQzs7O09BQUE7SUFrQkQsc0JBQUksbURBQU87YUFBWDtZQUNJLE9BQU8sSUFBSSxDQUFDLGVBQWUsSUFBSyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQWdCLENBQUM7UUFDMUUsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxtREFBTzthQUFYO1lBQ0ksT0FBTyxJQUFJLENBQUMsZUFBZSxJQUFLLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBZ0IsQ0FBQztRQUMxRSxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLG9EQUFRO2FBQVo7WUFDSSxPQUFPLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUM7UUFDakUsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxnREFBSTthQUFSO1lBQ0ksT0FBTyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO1FBQzlELENBQUM7OztPQUFBO0lBRUQ7OztPQUdHO0lBQ0gsc0RBQWEsR0FBYixVQUFjLEtBQTBCO1FBQ3BDLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN0QixNQUFNLEtBQUssQ0FBQywwREFBMEQsQ0FBQyxDQUFDO1NBQzNFO1FBRUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO0lBQ3BDLENBQUM7SUFFRCw2Q0FBSSxHQUFKO1FBQUEsaUJBdURDO1FBckRDLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE9BQU87YUFDbEMsUUFBUSxFQUFFO2FBQ1YsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUNqQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRWpDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDcEMsV0FBVyxFQUFFLElBQUk7WUFDakIsZ0JBQWdCLEVBQUUsZ0JBQWdCO1lBQ2xDLG1CQUFtQixFQUFFLElBQUk7U0FDMUIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVU7YUFDckMsYUFBYSxFQUFFO2FBQ2YsU0FBUyxDQUFDLFVBQUMsS0FBb0I7WUFDOUIsSUFBSSxLQUFLLENBQUMsR0FBRyxLQUFLLFNBQVMsRUFBRTtnQkFDM0IsSUFBSSxLQUFLLENBQUMsR0FBRyxLQUFLLFFBQVEsRUFBRTtvQkFDMUIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDMUI7YUFDRjtpQkFBTTtnQkFDTCx1Q0FBdUM7Z0JBQ3ZDLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxNQUFNLEVBQUU7b0JBQzVCLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQzFCO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRUosSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFpQjtZQUNqRixLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFSixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUM3RCxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFSixJQUFNLDJDQUEyQyxHQUFHLElBQUksZUFBZSxDQUFDLHFDQUFxQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV2SCxJQUFNLHFDQUFxQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLDJDQUEyQyxDQUFDLENBQUM7UUFFbEgscUNBQXFDLENBQUMsUUFBUSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUN4RSxxQ0FBcUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDaEUscUNBQXFDLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzlFLHFDQUFxQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN0RSxxQ0FBcUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEUscUNBQXFDLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3BFLHFDQUFxQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUM1RSxxQ0FBcUMsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ3hGLHFDQUFxQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUNsRixxQ0FBcUMsQ0FBQyxRQUFRLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDcEYscUNBQXFDLENBQUMsUUFBUSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUN4RixxQ0FBcUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDeEUscUNBQXFDLENBQUMsUUFBUSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztRQUM5RixxQ0FBcUMsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1FBQzlGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELDhDQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxtREFBVSxHQUFWLFVBQVcsSUFBWTtRQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsb0RBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQW5KMEM7UUFBMUMsU0FBUyxDQUFDLFlBQVksRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQzswQ0FBYSxXQUFXO3NFQUFNO0lBQy9EO1FBQVIsS0FBSyxFQUFFOzBDQUFnQixXQUFXO3lFQUFPO0lBQ2pDO1FBQVIsS0FBSyxFQUFFOzBDQUFtQixXQUFXOzRFQUFPO0lBQ3BDO1FBQVIsS0FBSyxFQUFFOzBDQUFpQixXQUFXOzBFQUFPO0lBQzdCO1FBQWIsS0FBSyxDQUFDLEtBQUssQ0FBQzs7aUVBQWM7SUFDbEI7UUFBUixLQUFLLEVBQUU7OytFQUE4QjtJQUM3QjtRQUFSLEtBQUssRUFBRTs7K0VBQThCO0lBQzdCO1FBQVIsS0FBSyxFQUFFOzs0RUFBMkI7SUFDMUI7UUFBUixLQUFLLEVBQUU7O3VFQUFxQjtJQUNwQjtRQUFSLEtBQUssRUFBRTswQ0FBVSxVQUFVO21FQUFDO0lBQ3BCO1FBQVIsS0FBSyxFQUFFOztxRUFBOEc7SUFRdEg7UUFEQyxLQUFLLEVBQUU7OztnRUFHUDtJQU9EO1FBREMsS0FBSyxFQUFFOzs7b0VBT1A7SUFNUztRQUFULE1BQU0sRUFBRTs7bUVBQXNDO0lBQ3JDO1FBQVQsTUFBTSxFQUFFOztrRUFBbUM7SUFDbEM7UUFBVCxNQUFNLEVBQUU7O2tFQUFtQztJQUNsQztRQUFULE1BQU0sRUFBRTs7d0VBQTJDO0lBNUMzQyw4QkFBOEI7UUFOMUMsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHlCQUF5QjtZQUNuQywyREFBcUQ7WUFFdkQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O1NBQ3RDLENBQUM7aURBbUQrQixPQUFPLEVBQWUsZ0JBQWdCO09BbEQxRCw4QkFBOEIsQ0FzSjFDO0lBQUQscUNBQUM7Q0FBQSxBQXRKRCxJQXNKQztTQXRKWSw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgVmlld0NoaWxkLFxyXG4gIFZpZXdDb250YWluZXJSZWYsXHJcbiAgT25EZXN0cm95LFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBUaW1lcGlja2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL25neC10aW1lcGlja2VyLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nO1xyXG5pbXBvcnQge1xyXG4gICAgTmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudFxyXG59IGZyb20gJy4vY29tcG9uZW50cy9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1jb250ZW50L25neC1tYXRlcmlhbC10aW1lcGlja2VyLWNvbnRlbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGltZXBpY2tlclJlZiB9IGZyb20gJy4vbW9kZWxzL3RpbWVwaWNrZXItcmVmLmludGVyZmFjZSc7XHJcbmltcG9ydCB7Q29tcG9uZW50UG9ydGFsfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcclxuaW1wb3J0IHsgT3ZlcmxheSwgT3ZlcmxheVJlZiwgQ29ubmVjdGVkUG9zaXRpb24gfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XHJcblxyXG5jb25zdCBFU0NBUEUgPSAyNztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlcicsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL25neC1tYXRlcmlhbC10aW1lcGlja2VyLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgVGltZXBpY2tlclJlZiwgT25EZXN0cm95IHtcclxuICAgIHRpbWVVcGRhdGVkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG4gICAgQFZpZXdDaGlsZCgncGlja2VyVG1wbCcsIHsgc3RhdGljOiB0cnVlIH0pIHBpY2tlclRtcGw6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgICBASW5wdXQoKSBjYW5jZWxCdG5UbXBsOiBUZW1wbGF0ZVJlZjxOb2RlPjtcclxuICAgIEBJbnB1dCgpIGVkaXRhYmxlSGludFRtcGw6IFRlbXBsYXRlUmVmPE5vZGU+O1xyXG4gICAgQElucHV0KCkgY29uZmlybUJ0blRtcGw6IFRlbXBsYXRlUmVmPE5vZGU+O1xyXG4gICAgQElucHV0KCdFU0MnKSBpc0VzYyA9IHRydWU7XHJcbiAgICBASW5wdXQoKSBlbmFibGVLZXlib2FyZElucHV0OiBib29sZWFuO1xyXG4gICAgQElucHV0KCkgcHJldmVudE92ZXJsYXlDbGljazogYm9vbGVhbjtcclxuICAgIEBJbnB1dCgpIGRpc2FibGVBbmltYXRpb246IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSBkZWZhdWx0VGltZTogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgdHJpZ2dlcjogRWxlbWVudFJlZjtcclxuICAgIEBJbnB1dCgpIHBvc2l0aW9uczogQ29ubmVjdGVkUG9zaXRpb25bXSA9IFt7b3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ2JvdHRvbScsIG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ3RvcCd9XTtcclxuICAgIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWY7XHJcbiAgICBvdmVybGF5RGV0YWNobWVudHNTdWJzY3JpcHRpb246IGFueTtcclxuICAgIG92ZXJsYXlCYWNrZHJvcENsaWNrU3Vic2NyaXB0aW9uOiBhbnk7XHJcbiAgICBvdmVybGF5S2V5RG93blN1YnNjcmlwdGlvbjogYW55O1xyXG4gICAgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IGZvcm1hdCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fZm9ybWF0ID0gdmFsdWUgPT09IDI0ID8gMjQgOiAxMjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZm9ybWF0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZXBpY2tlcklucHV0ID8gdGhpcy50aW1lcGlja2VySW5wdXQuZm9ybWF0IDogdGhpcy5fZm9ybWF0O1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgbWludXRlc0dhcChnYXA6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChnYXAgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdhcCA9IE1hdGguZmxvb3IoZ2FwKTtcclxuICAgICAgICB0aGlzLl9taW51dGVzR2FwID0gZ2FwIDw9IDU5ID8gZ2FwIDogMTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWludXRlc0dhcCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9taW51dGVzR2FwO1xyXG4gICAgfVxyXG5cclxuICAgIEBPdXRwdXQoKSB0aW1lU2V0ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcbiAgICBAT3V0cHV0KCkgb3BlbmVkID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xyXG4gICAgQE91dHB1dCgpIGNsb3NlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcclxuICAgIEBPdXRwdXQoKSBob3VyU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcclxuXHJcbiAgICBwcml2YXRlIF9taW51dGVzR2FwOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9mb3JtYXQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgdGltZXBpY2tlcklucHV0OiBUaW1lcGlja2VyRGlyZWN0aXZlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSwgcHJpdmF0ZSB2Y3I6IFZpZXdDb250YWluZXJSZWYpIHtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWluVGltZSgpOiBEYXRlVGltZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZXBpY2tlcklucHV0ICYmICh0aGlzLnRpbWVwaWNrZXJJbnB1dC5taW4gYXMgRGF0ZVRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtYXhUaW1lKCk6IERhdGVUaW1lIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50aW1lcGlja2VySW5wdXQgJiYgKHRoaXMudGltZXBpY2tlcklucHV0Lm1heCBhcyBEYXRlVGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRpbWVwaWNrZXJJbnB1dCAmJiB0aGlzLnRpbWVwaWNrZXJJbnB1dC5kaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdGltZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRpbWVwaWNrZXJJbnB1dCAmJiB0aGlzLnRpbWVwaWNrZXJJbnB1dC52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiBSZWdpc3RlciBhbiBpbnB1dCB3aXRoIHRoaXMgdGltZXBpY2tlci5cclxuICAgICAqIGlucHV0IC0gVGhlIHRpbWVwaWNrZXIgaW5wdXQgdG8gcmVnaXN0ZXIgd2l0aCB0aGlzIHRpbWVwaWNrZXJcclxuICAgICAqL1xyXG4gICAgcmVnaXN0ZXJJbnB1dChpbnB1dDogVGltZXBpY2tlckRpcmVjdGl2ZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWVwaWNrZXJJbnB1dCkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcignQSBUaW1lcGlja2VyIGNhbiBvbmx5IGJlIGFzc29jaWF0ZWQgd2l0aCBhIHNpbmdsZSBpbnB1dC4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudGltZXBpY2tlcklucHV0ID0gaW5wdXQ7XHJcbiAgICAgICAgdGhpcy50cmlnZ2VyID0gaW5wdXQuZWxlbWVudFJlZjtcclxuICAgIH1cclxuXHJcbiAgICBvcGVuKCk6IHZvaWQge1xyXG5cclxuICAgICAgY29uc3QgcG9zaXRpb25TdHJhdGVneSA9IHRoaXMub3ZlcmxheVxyXG4gICAgICAgIC5wb3NpdGlvbigpXHJcbiAgICAgICAgLmZsZXhpYmxlQ29ubmVjdGVkVG8odGhpcy50cmlnZ2VyKVxyXG4gICAgICAgIC53aXRoUG9zaXRpb25zKHRoaXMucG9zaXRpb25zKTtcclxuXHJcbiAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUoe1xyXG4gICAgICAgIGhhc0JhY2tkcm9wOiB0cnVlLFxyXG4gICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHBvc2l0aW9uU3RyYXRlZ3ksXHJcbiAgICAgICAgZGlzcG9zZU9uTmF2aWdhdGlvbjogdHJ1ZSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKHRoaXMub3ZlcmxheVJlZlxyXG4gICAgICAua2V5ZG93bkV2ZW50cygpXHJcbiAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKGV2ZW50LmtleSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxyXG4gICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSkge1xyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KSk7XHJcblxyXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKHRoaXMub3ZlcmxheVJlZi5iYWNrZHJvcENsaWNrKCkuc3Vic2NyaWJlKChldmVudDogTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcclxuICAgICAgfSkpO1xyXG5cclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZCh0aGlzLm92ZXJsYXlSZWYuZGV0YWNobWVudHMoKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuY2xvc2VkLm5leHQoKTtcclxuICAgICAgfSkpO1xyXG5cclxuICAgICAgY29uc3Qgbmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudFBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWwoTmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudCwgdGhpcy52Y3IpO1xyXG5cclxuICAgICAgICBjb25zdCBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50ID0gdGhpcy5vdmVybGF5UmVmLmF0dGFjaChuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50UG9ydGFsKTtcclxuXHJcbiAgICAgICAgbmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudC5pbnN0YW5jZS50aW1lcGlja2VyQmFzZVJlZiA9IHRoaXM7XHJcbiAgICAgICAgbmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudC5pbnN0YW5jZS50aW1lID0gdGhpcy50aW1lO1xyXG4gICAgICAgIG5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQuaW5zdGFuY2UuZGVmYXVsdFRpbWUgPSB0aGlzLmRlZmF1bHRUaW1lO1xyXG4gICAgICAgIG5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQuaW5zdGFuY2UubWF4VGltZSA9IHRoaXMubWF4VGltZTtcclxuICAgICAgICBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50Lmluc3RhbmNlLm1pblRpbWUgPSB0aGlzLm1pblRpbWU7XHJcbiAgICAgICAgbmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudC5pbnN0YW5jZS5mb3JtYXQgPSB0aGlzLmZvcm1hdDtcclxuICAgICAgICBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50Lmluc3RhbmNlLm1pbnV0ZXNHYXAgPSB0aGlzLm1pbnV0ZXNHYXA7XHJcbiAgICAgICAgbmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudC5pbnN0YW5jZS5kaXNhYmxlQW5pbWF0aW9uID0gdGhpcy5kaXNhYmxlQW5pbWF0aW9uO1xyXG4gICAgICAgIG5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQuaW5zdGFuY2UuY2FuY2VsQnRuVG1wbCA9IHRoaXMuY2FuY2VsQnRuVG1wbDtcclxuICAgICAgICBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50Lmluc3RhbmNlLmNvbmZpcm1CdG5UbXBsID0gdGhpcy5jb25maXJtQnRuVG1wbDtcclxuICAgICAgICBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50Lmluc3RhbmNlLmVkaXRhYmxlSGludFRtcGwgPSB0aGlzLmVkaXRhYmxlSGludFRtcGw7XHJcbiAgICAgICAgbmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudC5pbnN0YW5jZS5kaXNhYmxlZCA9IHRoaXMuZGlzYWJsZWQ7XHJcbiAgICAgICAgbmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudC5pbnN0YW5jZS5lbmFibGVLZXlib2FyZElucHV0ID0gdGhpcy5lbmFibGVLZXlib2FyZElucHV0O1xyXG4gICAgICAgIG5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQuaW5zdGFuY2UucHJldmVudE92ZXJsYXlDbGljayA9IHRoaXMucHJldmVudE92ZXJsYXlDbGljaztcclxuICAgICAgICB0aGlzLm9wZW5lZC5uZXh0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVRpbWUodGltZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50aW1lVXBkYXRlZC5uZXh0KHRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxufVxyXG4iXX0=