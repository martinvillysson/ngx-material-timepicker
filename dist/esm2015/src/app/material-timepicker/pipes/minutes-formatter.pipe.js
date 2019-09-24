import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let MinutesFormatterPipe = class MinutesFormatterPipe {
    transform(minute, gap = 5) {
        if (!minute) {
            return minute;
        }
        return minute % gap === 0 ? minute : '';
    }
};
MinutesFormatterPipe = tslib_1.__decorate([
    Pipe({
        name: 'minutesFormatter'
    })
], MinutesFormatterPipe);
export { MinutesFormatterPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludXRlcy1mb3JtYXR0ZXIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL3BpcGVzL21pbnV0ZXMtZm9ybWF0dGVyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBS2xELElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBRTdCLFNBQVMsQ0FBQyxNQUFjLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE9BQU8sTUFBTSxDQUFDO1NBQ2pCO1FBRUQsT0FBTyxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDNUMsQ0FBQztDQUVKLENBQUE7QUFWWSxvQkFBb0I7SUFIaEMsSUFBSSxDQUFDO1FBQ0YsSUFBSSxFQUFFLGtCQUFrQjtLQUMzQixDQUFDO0dBQ1csb0JBQW9CLENBVWhDO1NBVlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBQaXBlKHtcclxuICAgIG5hbWU6ICdtaW51dGVzRm9ybWF0dGVyJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTWludXRlc0Zvcm1hdHRlclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuXHJcbiAgICB0cmFuc2Zvcm0obWludXRlOiBudW1iZXIsIGdhcCA9IDUpOiBudW1iZXIgfCBzdHJpbmcge1xyXG4gICAgICAgIGlmICghbWludXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtaW51dGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWludXRlICUgZ2FwID09PSAwID8gbWludXRlIDogJyc7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==