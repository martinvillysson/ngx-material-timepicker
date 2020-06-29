import { Pipe } from '@angular/core';
export class ActiveMinutePipe {
    transform(minute, currentMinute, gap, isClockFaceDisabled) {
        if (minute == null || isClockFaceDisabled) {
            return false;
        }
        const defaultGap = 5;
        return ((currentMinute === minute) && (minute % (gap || defaultGap) === 0));
    }
}
ActiveMinutePipe.decorators = [
    { type: Pipe, args: [{
                name: 'activeMinute'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLW1pbnV0ZS5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL3BpcGVzL2FjdGl2ZS1taW51dGUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUtwRCxNQUFNLE9BQU8sZ0JBQWdCO0lBRXpCLFNBQVMsQ0FBQyxNQUFjLEVBQUUsYUFBcUIsRUFBRSxHQUFXLEVBQUUsbUJBQTRCO1FBQ3RGLElBQUksTUFBTSxJQUFJLElBQUksSUFBSSxtQkFBbUIsRUFBRTtZQUN2QyxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELE1BQU0sVUFBVSxHQUFHLENBQUMsQ0FBQztRQUVyQixPQUFPLENBQUMsQ0FBQyxhQUFhLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRixDQUFDOzs7WUFaSixJQUFJLFNBQUM7Z0JBQ0YsSUFBSSxFQUFFLGNBQWM7YUFDdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAnYWN0aXZlTWludXRlJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQWN0aXZlTWludXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICAgIHRyYW5zZm9ybShtaW51dGU6IG51bWJlciwgY3VycmVudE1pbnV0ZTogbnVtYmVyLCBnYXA6IG51bWJlciwgaXNDbG9ja0ZhY2VEaXNhYmxlZDogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChtaW51dGUgPT0gbnVsbCB8fCBpc0Nsb2NrRmFjZURpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZGVmYXVsdEdhcCA9IDU7XHJcblxyXG4gICAgICAgIHJldHVybiAoKGN1cnJlbnRNaW51dGUgPT09IG1pbnV0ZSkgJiYgKG1pbnV0ZSAlIChnYXAgfHwgZGVmYXVsdEdhcCkgPT09IDApKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19