import { Pipe } from '@angular/core';
export class MinutesFormatterPipe {
    transform(minute, gap = 5) {
        if (!minute) {
            return minute;
        }
        return minute % gap === 0 ? minute : '';
    }
}
MinutesFormatterPipe.decorators = [
    { type: Pipe, args: [{
                name: 'minutesFormatter'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludXRlcy1mb3JtYXR0ZXIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9waXBlcy9taW51dGVzLWZvcm1hdHRlci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBS2xELE1BQU0sT0FBTyxvQkFBb0I7SUFFN0IsU0FBUyxDQUFDLE1BQWMsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsT0FBTyxNQUFNLENBQUM7U0FDakI7UUFFRCxPQUFPLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUM1QyxDQUFDOzs7WUFYSixJQUFJLFNBQUM7Z0JBQ0YsSUFBSSxFQUFFLGtCQUFrQjthQUMzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAnbWludXRlc0Zvcm1hdHRlcidcclxufSlcclxuZXhwb3J0IGNsYXNzIE1pbnV0ZXNGb3JtYXR0ZXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcblxyXG4gICAgdHJhbnNmb3JtKG1pbnV0ZTogbnVtYmVyLCBnYXAgPSA1KTogbnVtYmVyIHwgc3RyaW5nIHtcclxuICAgICAgICBpZiAoIW1pbnV0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWludXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1pbnV0ZSAlIGdhcCA9PT0gMCA/IG1pbnV0ZSA6ICcnO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=