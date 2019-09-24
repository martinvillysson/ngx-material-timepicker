import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxMaterialTimepickerHoursFace } from '../timepicker-hours-face/ngx-material-timepicker-hours-face';
import { disableHours } from '../../utils/timepicker-time.utils';
let NgxMaterialTimepicker24HoursFaceComponent = class NgxMaterialTimepicker24HoursFaceComponent extends NgxMaterialTimepickerHoursFace {
    constructor() {
        super(24);
    }
    ngAfterContentInit() {
        this.hoursList = disableHours(this.hoursList, {
            min: this.minTime,
            max: this.maxTime,
            format: this.format
        });
    }
};
NgxMaterialTimepicker24HoursFaceComponent = tslib_1.__decorate([
    Component({
        selector: 'ngx-material-timepicker-24-hours-face',
        template: "<ngx-material-timepicker-face [selectedTime]=\"selectedHour\" [faceTime]=\"hoursList\" [format]=\"format\"\r\n                              (timeChange)=\"hourChange.next($event)\"\r\n                              (timeSelected)=\"onTimeSelected($event)\"></ngx-material-timepicker-face>\r\n",
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    tslib_1.__metadata("design:paramtypes", [])
], NgxMaterialTimepicker24HoursFaceComponent);
export { NgxMaterialTimepicker24HoursFaceComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItMjQtaG91cnMtZmFjZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9jb21wb25lbnRzL3RpbWVwaWNrZXItMjQtaG91cnMtZmFjZS9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci0yNC1ob3Vycy1mYWNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFvQix1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckYsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFDN0csT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBUWpFLElBQWEseUNBQXlDLEdBQXRELE1BQWEseUNBQTBDLFNBQVEsOEJBQThCO0lBRXpGO1FBQ0ksS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2QsQ0FBQztJQUVELGtCQUFrQjtRQUNkLElBQUksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDMUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ2pCLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTztZQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDdEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKLENBQUE7QUFiWSx5Q0FBeUM7SUFOckQsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLHVDQUF1QztRQUNqRCwrU0FBbUU7UUFDbkUsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07S0FDbEQsQ0FBQzs7R0FFVyx5Q0FBeUMsQ0FhckQ7U0FiWSx5Q0FBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5neE1hdGVyaWFsVGltZXBpY2tlckhvdXJzRmFjZSB9IGZyb20gJy4uL3RpbWVwaWNrZXItaG91cnMtZmFjZS9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1ob3Vycy1mYWNlJztcclxuaW1wb3J0IHsgZGlzYWJsZUhvdXJzIH0gZnJvbSAnLi4vLi4vdXRpbHMvdGltZXBpY2tlci10aW1lLnV0aWxzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci0yNC1ob3Vycy1mYWNlJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItMjQtaG91cnMtZmFjZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsVGltZXBpY2tlcjI0SG91cnNGYWNlQ29tcG9uZW50IGV4dGVuZHMgTmd4TWF0ZXJpYWxUaW1lcGlja2VySG91cnNGYWNlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoMjQpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgICAgICB0aGlzLmhvdXJzTGlzdCA9IGRpc2FibGVIb3Vycyh0aGlzLmhvdXJzTGlzdCwge1xyXG4gICAgICAgICAgICBtaW46IHRoaXMubWluVGltZSxcclxuICAgICAgICAgICAgbWF4OiB0aGlzLm1heFRpbWUsXHJcbiAgICAgICAgICAgIGZvcm1hdDogdGhpcy5mb3JtYXRcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=