import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var ActiveHourPipe = /** @class */ (function () {
    function ActiveHourPipe() {
    }
    ActiveHourPipe.prototype.transform = function (hour, currentHour, isClockFaceDisabled) {
        if (hour == null || isClockFaceDisabled) {
            return false;
        }
        return hour === currentHour;
    };
    ActiveHourPipe = tslib_1.__decorate([
        Pipe({
            name: 'activeHour'
        })
    ], ActiveHourPipe);
    return ActiveHourPipe;
}());
export { ActiveHourPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLWhvdXIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL3BpcGVzL2FjdGl2ZS1ob3VyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBS3BEO0lBQUE7SUFVQSxDQUFDO0lBUkcsa0NBQVMsR0FBVCxVQUFVLElBQVksRUFBRSxXQUFtQixFQUFFLG1CQUE0QjtRQUNyRSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksbUJBQW1CLEVBQUU7WUFDckMsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxPQUFPLElBQUksS0FBSyxXQUFXLENBQUM7SUFDaEMsQ0FBQztJQVJRLGNBQWM7UUFIMUIsSUFBSSxDQUFDO1lBQ0YsSUFBSSxFQUFFLFlBQVk7U0FDckIsQ0FBQztPQUNXLGNBQWMsQ0FVMUI7SUFBRCxxQkFBQztDQUFBLEFBVkQsSUFVQztTQVZZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAnYWN0aXZlSG91cidcclxufSlcclxuZXhwb3J0IGNsYXNzIEFjdGl2ZUhvdXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcblxyXG4gICAgdHJhbnNmb3JtKGhvdXI6IG51bWJlciwgY3VycmVudEhvdXI6IG51bWJlciwgaXNDbG9ja0ZhY2VEaXNhYmxlZDogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChob3VyID09IG51bGwgfHwgaXNDbG9ja0ZhY2VEaXNhYmxlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaG91ciA9PT0gY3VycmVudEhvdXI7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==