import { EventEmitter, Input, Output, Directive } from '@angular/core';
import { getHours } from '../../utils/timepicker-time.utils';
export class NgxMaterialTimepickerHoursFace {
    constructor(format) {
        this.hourChange = new EventEmitter();
        this.hourSelected = new EventEmitter();
        this.hoursList = [];
        this.hoursList = getHours(format);
    }
    onTimeSelected(time) {
        this.hourSelected.next(time);
    }
}
NgxMaterialTimepickerHoursFace.decorators = [
    { type: Directive }
];
NgxMaterialTimepickerHoursFace.ctorParameters = () => [
    { type: Number }
];
NgxMaterialTimepickerHoursFace.propDecorators = {
    selectedHour: [{ type: Input }],
    minTime: [{ type: Input }],
    maxTime: [{ type: Input }],
    format: [{ type: Input }],
    hourChange: [{ type: Output }],
    hourSelected: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItaG91cnMtZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9jb21wb25lbnRzL3RpbWVwaWNrZXItaG91cnMtZmFjZS9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1ob3Vycy1mYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHdkUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBSTdELE1BQU0sT0FBTyw4QkFBOEI7SUFZdkMsWUFBc0IsTUFBYztRQUwxQixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFDL0MsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBRXBELGNBQVMsR0FBb0IsRUFBRSxDQUFDO1FBRzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxjQUFjLENBQUMsSUFBWTtRQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7WUFuQkosU0FBUzs7Ozs7OzJCQUdMLEtBQUs7c0JBQ0wsS0FBSztzQkFDTCxLQUFLO3FCQUNMLEtBQUs7eUJBRUwsTUFBTTsyQkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XHJcbmltcG9ydCB7IENsb2NrRmFjZVRpbWUgfSBmcm9tICcuLi8uLi9tb2RlbHMvY2xvY2stZmFjZS10aW1lLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IGdldEhvdXJzIH0gZnJvbSAnLi4vLi4vdXRpbHMvdGltZXBpY2tlci10aW1lLnV0aWxzJztcclxuXHJcblxyXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJIb3Vyc0ZhY2Uge1xyXG5cclxuICAgIEBJbnB1dCgpIHNlbGVjdGVkSG91cjogQ2xvY2tGYWNlVGltZTtcclxuICAgIEBJbnB1dCgpIG1pblRpbWU6IERhdGVUaW1lO1xyXG4gICAgQElucHV0KCkgbWF4VGltZTogRGF0ZVRpbWU7XHJcbiAgICBASW5wdXQoKSBmb3JtYXQ6IG51bWJlcjtcclxuXHJcbiAgICBAT3V0cHV0KCkgaG91ckNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xvY2tGYWNlVGltZT4oKTtcclxuICAgIEBPdXRwdXQoKSBob3VyU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcclxuXHJcbiAgICBob3Vyc0xpc3Q6IENsb2NrRmFjZVRpbWVbXSA9IFtdO1xyXG5cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcihmb3JtYXQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuaG91cnNMaXN0ID0gZ2V0SG91cnMoZm9ybWF0KTtcclxuICAgIH1cclxuXHJcbiAgICBvblRpbWVTZWxlY3RlZCh0aW1lOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmhvdXJTZWxlY3RlZC5uZXh0KHRpbWUpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==