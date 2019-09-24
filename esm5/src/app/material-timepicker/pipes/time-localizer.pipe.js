import * as tslib_1 from "tslib";
import { Inject, Pipe } from '@angular/core';
import { TIME_LOCALE } from '../tokens/time-locale.token';
import { TimeUnit } from '../models/time-unit.enum';
import { DateTime } from 'luxon';
var TimeLocalizerPipe = /** @class */ (function () {
    function TimeLocalizerPipe(locale) {
        this.locale = locale;
    }
    TimeLocalizerPipe.prototype.transform = function (time, timeUnit) {
        if (time == null || time === '') {
            return '';
        }
        switch (timeUnit) {
            case TimeUnit.HOUR: {
                var format = time === 0 ? 'HH' : 'H';
                return this.formatTime('hour', time, format);
            }
            case TimeUnit.MINUTE:
                return this.formatTime('minute', time, 'mm');
            default:
                throw new Error("There is no Time Unit with type " + timeUnit);
        }
    };
    TimeLocalizerPipe.prototype.formatTime = function (timeMeasure, time, format) {
        var _a;
        try {
            return DateTime.fromObject((_a = {}, _a[timeMeasure] = +time, _a)).setLocale(this.locale).toFormat(format);
        }
        catch (_b) {
            throw new Error("Cannot format provided time - " + time + " to locale - " + this.locale);
        }
    };
    TimeLocalizerPipe = tslib_1.__decorate([
        Pipe({
            name: 'timeLocalizer'
        }),
        tslib_1.__param(0, Inject(TIME_LOCALE)),
        tslib_1.__metadata("design:paramtypes", [String])
    ], TimeLocalizerPipe);
    return TimeLocalizerPipe;
}());
export { TimeLocalizerPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1sb2NhbGl6ZXIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL3BpcGVzL3RpbWUtbG9jYWxpemVyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFPakM7SUFFSSwyQkFBeUMsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDdkQsQ0FBQztJQUVELHFDQUFTLEdBQVQsVUFBVSxJQUFxQixFQUFFLFFBQWtCO1FBQy9DLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRSxFQUFFO1lBQzdCLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFFRCxRQUFRLFFBQVEsRUFBRTtZQUNkLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoQixJQUFNLE1BQU0sR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQkFDdkMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDaEQ7WUFDRCxLQUFLLFFBQVEsQ0FBQyxNQUFNO2dCQUNoQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNqRDtnQkFDSSxNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFtQyxRQUFVLENBQUMsQ0FBQztTQUN0RTtJQUNMLENBQUM7SUFFTyxzQ0FBVSxHQUFsQixVQUFtQixXQUF3QixFQUFFLElBQXFCLEVBQUUsTUFBYzs7UUFDOUUsSUFBSTtZQUNBLE9BQU8sUUFBUSxDQUFDLFVBQVUsV0FBRSxHQUFDLFdBQVcsSUFBRyxDQUFDLElBQUksTUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzlGO1FBQUMsV0FBTTtZQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsbUNBQWlDLElBQUkscUJBQWdCLElBQUksQ0FBQyxNQUFRLENBQUMsQ0FBQztTQUN2RjtJQUNMLENBQUM7SUE1QlEsaUJBQWlCO1FBSDdCLElBQUksQ0FBQztZQUNGLElBQUksRUFBRSxlQUFlO1NBQ3hCLENBQUM7UUFHZSxtQkFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7O09BRnZCLGlCQUFpQixDQTZCN0I7SUFBRCx3QkFBQztDQUFBLEFBN0JELElBNkJDO1NBN0JZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUSU1FX0xPQ0FMRSB9IGZyb20gJy4uL3Rva2Vucy90aW1lLWxvY2FsZS50b2tlbic7XHJcbmltcG9ydCB7IFRpbWVVbml0IH0gZnJvbSAnLi4vbW9kZWxzL3RpbWUtdW5pdC5lbnVtJztcclxuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XHJcblxyXG50eXBlIFRpbWVNZWFzdXJlID0gJ2hvdXInIHwgJ21pbnV0ZSc7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAndGltZUxvY2FsaXplcidcclxufSlcclxuZXhwb3J0IGNsYXNzIFRpbWVMb2NhbGl6ZXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoQEluamVjdChUSU1FX0xPQ0FMRSkgcHJpdmF0ZSBsb2NhbGU6IHN0cmluZykge1xyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zZm9ybSh0aW1lOiBudW1iZXIgfCBzdHJpbmcsIHRpbWVVbml0OiBUaW1lVW5pdCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHRpbWUgPT0gbnVsbCB8fCB0aW1lID09PSAnJykge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzd2l0Y2ggKHRpbWVVbml0KSB7XHJcbiAgICAgICAgICAgIGNhc2UgVGltZVVuaXQuSE9VUjoge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybWF0ID0gdGltZSA9PT0gMCA/ICdISCcgOiAnSCc7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRUaW1lKCdob3VyJywgdGltZSwgZm9ybWF0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFRpbWVVbml0Lk1JTlVURTpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1hdFRpbWUoJ21pbnV0ZScsIHRpbWUsICdtbScpO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGVyZSBpcyBubyBUaW1lIFVuaXQgd2l0aCB0eXBlICR7dGltZVVuaXR9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZm9ybWF0VGltZSh0aW1lTWVhc3VyZTogVGltZU1lYXN1cmUsIHRpbWU6IHN0cmluZyB8IG51bWJlciwgZm9ybWF0OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBEYXRlVGltZS5mcm9tT2JqZWN0KHtbdGltZU1lYXN1cmVdOiArdGltZX0pLnNldExvY2FsZSh0aGlzLmxvY2FsZSkudG9Gb3JtYXQoZm9ybWF0KTtcclxuICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgZm9ybWF0IHByb3ZpZGVkIHRpbWUgLSAke3RpbWV9IHRvIGxvY2FsZSAtICR7dGhpcy5sb2NhbGV9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==