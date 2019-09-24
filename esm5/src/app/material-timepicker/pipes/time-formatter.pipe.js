import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { TimeUnit } from '../models/time-unit.enum';
import { DateTime } from 'luxon';
var TimeFormatterPipe = /** @class */ (function () {
    function TimeFormatterPipe() {
    }
    TimeFormatterPipe.prototype.transform = function (time, timeUnit) {
        if (time == null || time === '') {
            return time;
        }
        switch (timeUnit) {
            case TimeUnit.HOUR:
                return DateTime.fromObject({ hour: +time }).toFormat('HH');
            case TimeUnit.MINUTE:
                return DateTime.fromObject({ minute: +time }).toFormat('mm');
            default:
                throw new Error('no such time unit');
        }
    };
    TimeFormatterPipe = tslib_1.__decorate([
        Pipe({
            name: 'timeFormatter'
        })
    ], TimeFormatterPipe);
    return TimeFormatterPipe;
}());
export { TimeFormatterPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1mb3JtYXR0ZXIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL3BpcGVzL3RpbWUtZm9ybWF0dGVyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBS2pDO0lBQUE7SUFnQkEsQ0FBQztJQWRHLHFDQUFTLEdBQVQsVUFBVSxJQUFxQixFQUFFLFFBQWtCO1FBQy9DLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRSxFQUFFO1lBQzdCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxRQUFRLFFBQVEsRUFBRTtZQUNkLEtBQUssUUFBUSxDQUFDLElBQUk7Z0JBQ2QsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0QsS0FBSyxRQUFRLENBQUMsTUFBTTtnQkFDaEIsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0Q7Z0JBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQzVDO0lBQ0wsQ0FBQztJQWRRLGlCQUFpQjtRQUg3QixJQUFJLENBQUM7WUFDRixJQUFJLEVBQUUsZUFBZTtTQUN4QixDQUFDO09BQ1csaUJBQWlCLENBZ0I3QjtJQUFELHdCQUFDO0NBQUEsQUFoQkQsSUFnQkM7U0FoQlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUaW1lVW5pdCB9IGZyb20gJy4uL21vZGVscy90aW1lLXVuaXQuZW51bSc7XHJcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nO1xyXG5cclxuQFBpcGUoe1xyXG4gICAgbmFtZTogJ3RpbWVGb3JtYXR0ZXInXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUaW1lRm9ybWF0dGVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICAgIHRyYW5zZm9ybSh0aW1lOiBudW1iZXIgfCBzdHJpbmcsIHRpbWVVbml0OiBUaW1lVW5pdCk6IGFueSB7XHJcbiAgICAgICAgaWYgKHRpbWUgPT0gbnVsbCB8fCB0aW1lID09PSAnJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGltZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoICh0aW1lVW5pdCkge1xyXG4gICAgICAgICAgICBjYXNlIFRpbWVVbml0LkhPVVI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRGF0ZVRpbWUuZnJvbU9iamVjdCh7aG91cjogK3RpbWV9KS50b0Zvcm1hdCgnSEgnKTtcclxuICAgICAgICAgICAgY2FzZSBUaW1lVW5pdC5NSU5VVEU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRGF0ZVRpbWUuZnJvbU9iamVjdCh7bWludXRlOiArdGltZX0pLnRvRm9ybWF0KCdtbScpO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBzdWNoIHRpbWUgdW5pdCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19