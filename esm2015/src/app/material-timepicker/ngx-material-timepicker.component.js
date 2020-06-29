import { Component, EventEmitter, Input, Output, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { NgxMaterialTimepickerContentComponent } from './components/ngx-material-timepicker-content/ngx-material-timepicker-content.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay } from '@angular/cdk/overlay';
const ESCAPE = 27;
export class NgxMaterialTimepickerComponent {
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
            panelClass: this.panelClass,
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
}
NgxMaterialTimepickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker',
                template: "<ng-template #pickerTmpl>\r\n</ng-template>\r\n",
                encapsulation: ViewEncapsulation.None,
                styles: ["@import url(C:\\mv\\ngx-material-timepicker\\node_modules\\@angular\\cdk\\overlay-prebuilt.css);"]
            },] }
];
NgxMaterialTimepickerComponent.ctorParameters = () => [
    { type: Overlay },
    { type: ViewContainerRef }
];
NgxMaterialTimepickerComponent.propDecorators = {
    pickerTmpl: [{ type: ViewChild, args: ['pickerTmpl', { static: true },] }],
    cancelBtnTmpl: [{ type: Input }],
    editableHintTmpl: [{ type: Input }],
    confirmBtnTmpl: [{ type: Input }],
    isEsc: [{ type: Input, args: ['ESC',] }],
    enableKeyboardInput: [{ type: Input }],
    preventOverlayClick: [{ type: Input }],
    disableAnimation: [{ type: Input }],
    defaultTime: [{ type: Input }],
    trigger: [{ type: Input }],
    panelClass: [{ type: Input }],
    positions: [{ type: Input }],
    format: [{ type: Input }],
    minutesGap: [{ type: Input }],
    timeSet: [{ type: Output }],
    opened: [{ type: Output }],
    closed: [{ type: Output }],
    hourSelected: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL25neC1tYXRlcmlhbC10aW1lcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUdOLFNBQVMsRUFDVCxnQkFBZ0IsRUFFaEIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRzdDLE9BQU8sRUFDTCxxQ0FBcUMsRUFDdEMsTUFBTSx3RkFBd0YsQ0FBQztBQUVoRyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLE9BQU8sRUFBaUMsTUFBTSxzQkFBc0IsQ0FBQztBQUU5RSxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFRbEIsTUFBTSxPQUFPLDhCQUE4QjtJQW1EekMsWUFBb0IsT0FBZ0IsRUFBVSxHQUFxQjtRQUEvQyxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBa0I7UUFsRG5FLGdCQUFXLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUt0QixVQUFLLEdBQUcsSUFBSSxDQUFDO1FBT2xCLGNBQVMsR0FBd0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBS3hILGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQXdCekIsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDckMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDbEMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDbEMsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBT3BELENBQUM7SUFoQ0QsSUFDSSxNQUFNLENBQUMsS0FBYTtRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQzNFLENBQUM7SUFFRCxJQUNJLFVBQVUsQ0FBQyxHQUFXO1FBQ3hCLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtZQUNmLE9BQU87U0FDUjtRQUNELEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBY0QsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsZUFBZSxJQUFLLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBZ0IsQ0FBQztJQUN4RSxDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsZUFBZSxJQUFLLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBZ0IsQ0FBQztJQUN4RSxDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDO0lBQy9ELENBQUM7SUFFRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUM7SUFDNUQsQ0FBQztJQUVEOzs7T0FHRztJQUNILGFBQWEsQ0FBQyxLQUEwQjtRQUN0QyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsTUFBTSxLQUFLLENBQUMsMERBQTBELENBQUMsQ0FBQztTQUN6RTtRQUVELElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsSUFBSTtRQUVGLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE9BQU87YUFDbEMsUUFBUSxFQUFFO2FBQ1YsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUNqQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRWpDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDcEMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLGdCQUFnQixFQUFFLGdCQUFnQjtZQUNsQyxtQkFBbUIsRUFBRSxJQUFJO1NBQzFCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVO2FBQ25DLGFBQWEsRUFBRTthQUNmLFNBQVMsQ0FBQyxDQUFDLEtBQW9CLEVBQUUsRUFBRTtZQUNsQyxJQUFJLEtBQUssQ0FBQyxHQUFHLEtBQUssU0FBUyxFQUFFO2dCQUMzQixJQUFJLEtBQUssQ0FBQyxHQUFHLEtBQUssUUFBUSxFQUFFO29CQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUMxQjthQUNGO2lCQUFNO2dCQUNMLHVDQUF1QztnQkFDdkMsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLE1BQU0sRUFBRTtvQkFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDMUI7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFTixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQWlCLEVBQUUsRUFBRTtZQUNyRixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFSixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDbEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRUosTUFBTSwyQ0FBMkMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxxQ0FBcUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFekgsTUFBTSxxQ0FBcUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1FBRWxILHFDQUFxQyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDeEUscUNBQXFDLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ2hFLHFDQUFxQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM5RSxxQ0FBcUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEUscUNBQXFDLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RFLHFDQUFxQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNwRSxxQ0FBcUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDNUUscUNBQXFDLENBQUMsUUFBUSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUN4RixxQ0FBcUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDbEYscUNBQXFDLENBQUMsUUFBUSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQ3BGLHFDQUFxQyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDeEYscUNBQXFDLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3hFLHFDQUFxQyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUM7UUFDOUYscUNBQXFDLENBQUMsUUFBUSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztRQUM5RixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsVUFBVSxDQUFDLElBQVk7UUFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7OztZQTdKRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsMkRBQXFEO2dCQUVyRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDdEM7OztZQVRRLE9BQU87WUFaZCxnQkFBZ0I7Ozt5QkF3QmYsU0FBUyxTQUFDLFlBQVksRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7NEJBQ3hDLEtBQUs7K0JBQ0wsS0FBSzs2QkFDTCxLQUFLO29CQUNMLEtBQUssU0FBQyxLQUFLO2tDQUNYLEtBQUs7a0NBQ0wsS0FBSzsrQkFDTCxLQUFLOzBCQUNMLEtBQUs7c0JBQ0wsS0FBSzt5QkFDTCxLQUFLO3dCQUNMLEtBQUs7cUJBT0wsS0FBSzt5QkFTTCxLQUFLO3NCQWFMLE1BQU07cUJBQ04sTUFBTTtxQkFDTixNQUFNOzJCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgVmlld0NoaWxkLFxyXG4gIFZpZXdDb250YWluZXJSZWYsXHJcbiAgT25EZXN0cm95LFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBUaW1lcGlja2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL25neC10aW1lcGlja2VyLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nO1xyXG5pbXBvcnQge1xyXG4gIE5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnRcclxufSBmcm9tICcuL2NvbXBvbmVudHMvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItY29udGVudC9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1jb250ZW50LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRpbWVwaWNrZXJSZWYgfSBmcm9tICcuL21vZGVscy90aW1lcGlja2VyLXJlZi5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcclxuaW1wb3J0IHsgT3ZlcmxheSwgT3ZlcmxheVJlZiwgQ29ubmVjdGVkUG9zaXRpb24gfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XHJcblxyXG5jb25zdCBFU0NBUEUgPSAyNztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL25neC1tYXRlcmlhbC10aW1lcGlja2VyLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgVGltZXBpY2tlclJlZiwgT25EZXN0cm95IHtcclxuICB0aW1lVXBkYXRlZCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuICBAVmlld0NoaWxkKCdwaWNrZXJUbXBsJywgeyBzdGF0aWM6IHRydWUgfSkgcGlja2VyVG1wbDogVGVtcGxhdGVSZWY8YW55PjtcclxuICBASW5wdXQoKSBjYW5jZWxCdG5UbXBsOiBUZW1wbGF0ZVJlZjxOb2RlPjtcclxuICBASW5wdXQoKSBlZGl0YWJsZUhpbnRUbXBsOiBUZW1wbGF0ZVJlZjxOb2RlPjtcclxuICBASW5wdXQoKSBjb25maXJtQnRuVG1wbDogVGVtcGxhdGVSZWY8Tm9kZT47XHJcbiAgQElucHV0KCdFU0MnKSBpc0VzYyA9IHRydWU7XHJcbiAgQElucHV0KCkgZW5hYmxlS2V5Ym9hcmRJbnB1dDogYm9vbGVhbjtcclxuICBASW5wdXQoKSBwcmV2ZW50T3ZlcmxheUNsaWNrOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGRpc2FibGVBbmltYXRpb246IGJvb2xlYW47XHJcbiAgQElucHV0KCkgZGVmYXVsdFRpbWU6IHN0cmluZztcclxuICBASW5wdXQoKSB0cmlnZ2VyOiBFbGVtZW50UmVmO1xyXG4gIEBJbnB1dCgpIHBhbmVsQ2xhc3M6IHN0cmluZztcclxuICBASW5wdXQoKSBwb3NpdGlvbnM6IENvbm5lY3RlZFBvc2l0aW9uW10gPSBbeyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAnYm90dG9tJywgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAndG9wJyB9XTtcclxuICBvdmVybGF5UmVmOiBPdmVybGF5UmVmO1xyXG4gIG92ZXJsYXlEZXRhY2htZW50c1N1YnNjcmlwdGlvbjogYW55O1xyXG4gIG92ZXJsYXlCYWNrZHJvcENsaWNrU3Vic2NyaXB0aW9uOiBhbnk7XHJcbiAgb3ZlcmxheUtleURvd25TdWJzY3JpcHRpb246IGFueTtcclxuICBzdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBmb3JtYXQodmFsdWU6IG51bWJlcikge1xyXG4gICAgdGhpcy5fZm9ybWF0ID0gdmFsdWUgPT09IDI0ID8gMjQgOiAxMjtcclxuICB9XHJcblxyXG4gIGdldCBmb3JtYXQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLnRpbWVwaWNrZXJJbnB1dCA/IHRoaXMudGltZXBpY2tlcklucHV0LmZvcm1hdCA6IHRoaXMuX2Zvcm1hdDtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IG1pbnV0ZXNHYXAoZ2FwOiBudW1iZXIpIHtcclxuICAgIGlmIChnYXAgPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBnYXAgPSBNYXRoLmZsb29yKGdhcCk7XHJcbiAgICB0aGlzLl9taW51dGVzR2FwID0gZ2FwIDw9IDU5ID8gZ2FwIDogMTtcclxuICB9XHJcblxyXG4gIGdldCBtaW51dGVzR2FwKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWludXRlc0dhcDtcclxuICB9XHJcblxyXG4gIEBPdXRwdXQoKSB0aW1lU2V0ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcbiAgQE91dHB1dCgpIG9wZW5lZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcclxuICBAT3V0cHV0KCkgY2xvc2VkID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xyXG4gIEBPdXRwdXQoKSBob3VyU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcclxuXHJcbiAgcHJpdmF0ZSBfbWludXRlc0dhcDogbnVtYmVyO1xyXG4gIHByaXZhdGUgX2Zvcm1hdDogbnVtYmVyO1xyXG4gIHByaXZhdGUgdGltZXBpY2tlcklucHV0OiBUaW1lcGlja2VyRGlyZWN0aXZlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksIHByaXZhdGUgdmNyOiBWaWV3Q29udGFpbmVyUmVmKSB7XHJcbiAgfVxyXG5cclxuICBnZXQgbWluVGltZSgpOiBEYXRlVGltZSB7XHJcbiAgICByZXR1cm4gdGhpcy50aW1lcGlja2VySW5wdXQgJiYgKHRoaXMudGltZXBpY2tlcklucHV0Lm1pbiBhcyBEYXRlVGltZSk7XHJcbiAgfVxyXG5cclxuICBnZXQgbWF4VGltZSgpOiBEYXRlVGltZSB7XHJcbiAgICByZXR1cm4gdGhpcy50aW1lcGlja2VySW5wdXQgJiYgKHRoaXMudGltZXBpY2tlcklucHV0Lm1heCBhcyBEYXRlVGltZSk7XHJcbiAgfVxyXG5cclxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy50aW1lcGlja2VySW5wdXQgJiYgdGhpcy50aW1lcGlja2VySW5wdXQuZGlzYWJsZWQ7XHJcbiAgfVxyXG5cclxuICBnZXQgdGltZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMudGltZXBpY2tlcklucHV0ICYmIHRoaXMudGltZXBpY2tlcklucHV0LnZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLyoqKlxyXG4gICAqIFJlZ2lzdGVyIGFuIGlucHV0IHdpdGggdGhpcyB0aW1lcGlja2VyLlxyXG4gICAqIGlucHV0IC0gVGhlIHRpbWVwaWNrZXIgaW5wdXQgdG8gcmVnaXN0ZXIgd2l0aCB0aGlzIHRpbWVwaWNrZXJcclxuICAgKi9cclxuICByZWdpc3RlcklucHV0KGlucHV0OiBUaW1lcGlja2VyRGlyZWN0aXZlKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy50aW1lcGlja2VySW5wdXQpIHtcclxuICAgICAgdGhyb3cgRXJyb3IoJ0EgVGltZXBpY2tlciBjYW4gb25seSBiZSBhc3NvY2lhdGVkIHdpdGggYSBzaW5nbGUgaW5wdXQuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50aW1lcGlja2VySW5wdXQgPSBpbnB1dDtcclxuICAgIHRoaXMudHJpZ2dlciA9IGlucHV0LmVsZW1lbnRSZWY7XHJcbiAgfVxyXG5cclxuICBvcGVuKCk6IHZvaWQge1xyXG5cclxuICAgIGNvbnN0IHBvc2l0aW9uU3RyYXRlZ3kgPSB0aGlzLm92ZXJsYXlcclxuICAgICAgLnBvc2l0aW9uKClcclxuICAgICAgLmZsZXhpYmxlQ29ubmVjdGVkVG8odGhpcy50cmlnZ2VyKVxyXG4gICAgICAud2l0aFBvc2l0aW9ucyh0aGlzLnBvc2l0aW9ucyk7XHJcblxyXG4gICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZSh7XHJcbiAgICAgIHBhbmVsQ2xhc3M6IHRoaXMucGFuZWxDbGFzcyxcclxuICAgICAgaGFzQmFja2Ryb3A6IHRydWUsXHJcbiAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHBvc2l0aW9uU3RyYXRlZ3ksXHJcbiAgICAgIGRpc3Bvc2VPbk5hdmlnYXRpb246IHRydWUsXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKHRoaXMub3ZlcmxheVJlZlxyXG4gICAgICAua2V5ZG93bkV2ZW50cygpXHJcbiAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKGV2ZW50LmtleSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxyXG4gICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSkge1xyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KSk7XHJcblxyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZCh0aGlzLm92ZXJsYXlSZWYuYmFja2Ryb3BDbGljaygpLnN1YnNjcmliZSgoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQodGhpcy5vdmVybGF5UmVmLmRldGFjaG1lbnRzKCkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5jbG9zZWQubmV4dCgpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGNvbnN0IG5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnRQb3J0YWwgPSBuZXcgQ29tcG9uZW50UG9ydGFsKE5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQsIHRoaXMudmNyKTtcclxuXHJcbiAgICBjb25zdCBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50ID0gdGhpcy5vdmVybGF5UmVmLmF0dGFjaChuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50UG9ydGFsKTtcclxuXHJcbiAgICBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50Lmluc3RhbmNlLnRpbWVwaWNrZXJCYXNlUmVmID0gdGhpcztcclxuICAgIG5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQuaW5zdGFuY2UudGltZSA9IHRoaXMudGltZTtcclxuICAgIG5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQuaW5zdGFuY2UuZGVmYXVsdFRpbWUgPSB0aGlzLmRlZmF1bHRUaW1lO1xyXG4gICAgbmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudC5pbnN0YW5jZS5tYXhUaW1lID0gdGhpcy5tYXhUaW1lO1xyXG4gICAgbmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudC5pbnN0YW5jZS5taW5UaW1lID0gdGhpcy5taW5UaW1lO1xyXG4gICAgbmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudC5pbnN0YW5jZS5mb3JtYXQgPSB0aGlzLmZvcm1hdDtcclxuICAgIG5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQuaW5zdGFuY2UubWludXRlc0dhcCA9IHRoaXMubWludXRlc0dhcDtcclxuICAgIG5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQuaW5zdGFuY2UuZGlzYWJsZUFuaW1hdGlvbiA9IHRoaXMuZGlzYWJsZUFuaW1hdGlvbjtcclxuICAgIG5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQuaW5zdGFuY2UuY2FuY2VsQnRuVG1wbCA9IHRoaXMuY2FuY2VsQnRuVG1wbDtcclxuICAgIG5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQuaW5zdGFuY2UuY29uZmlybUJ0blRtcGwgPSB0aGlzLmNvbmZpcm1CdG5UbXBsO1xyXG4gICAgbmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudC5pbnN0YW5jZS5lZGl0YWJsZUhpbnRUbXBsID0gdGhpcy5lZGl0YWJsZUhpbnRUbXBsO1xyXG4gICAgbmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudC5pbnN0YW5jZS5kaXNhYmxlZCA9IHRoaXMuZGlzYWJsZWQ7XHJcbiAgICBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50Lmluc3RhbmNlLmVuYWJsZUtleWJvYXJkSW5wdXQgPSB0aGlzLmVuYWJsZUtleWJvYXJkSW5wdXQ7XHJcbiAgICBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50Lmluc3RhbmNlLnByZXZlbnRPdmVybGF5Q2xpY2sgPSB0aGlzLnByZXZlbnRPdmVybGF5Q2xpY2s7XHJcbiAgICB0aGlzLm9wZW5lZC5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICBjbG9zZSgpOiB2b2lkIHtcclxuICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVRpbWUodGltZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLnRpbWVVcGRhdGVkLm5leHQodGltZSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxufVxyXG4iXX0=