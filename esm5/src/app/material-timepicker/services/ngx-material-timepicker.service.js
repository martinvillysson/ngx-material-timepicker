import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimePeriod } from '../models/time-period.enum';
import { TimeAdapter } from './time-adapter';
import { DateTime } from 'luxon';
import * as i0 from "@angular/core";
var DEFAULT_HOUR = {
    time: 12,
    angle: 360
};
var DEFAULT_MINUTE = {
    time: 0,
    angle: 360
};
var NgxMaterialTimepickerService = /** @class */ (function () {
    function NgxMaterialTimepickerService() {
        this.hourSubject = new BehaviorSubject(DEFAULT_HOUR);
        this.minuteSubject = new BehaviorSubject(DEFAULT_MINUTE);
        this.periodSubject = new BehaviorSubject(TimePeriod.AM);
    }
    Object.defineProperty(NgxMaterialTimepickerService.prototype, "hour", {
        set: function (hour) {
            this.hourSubject.next(hour);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerService.prototype, "selectedHour", {
        get: function () {
            return this.hourSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerService.prototype, "minute", {
        set: function (minute) {
            this.minuteSubject.next(minute);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerService.prototype, "selectedMinute", {
        get: function () {
            return this.minuteSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerService.prototype, "period", {
        set: function (period) {
            var isPeriodValid = (period === TimePeriod.AM) || (period === TimePeriod.PM);
            if (isPeriodValid) {
                this.periodSubject.next(period);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerService.prototype, "selectedPeriod", {
        get: function () {
            return this.periodSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    NgxMaterialTimepickerService.prototype.setDefaultTimeIfAvailable = function (time, min, max, format, minutesGap) {
        /* Workaround to double error message*/
        try {
            if (TimeAdapter.isTimeAvailable(time, min, max, 'minutes', minutesGap)) {
                this.setDefaultTime(time, format);
            }
        }
        catch (e) {
            console.error(e);
        }
    };
    NgxMaterialTimepickerService.prototype.getFullTime = function (format) {
        var hour = this.hourSubject.getValue().time;
        var minute = this.minuteSubject.getValue().time;
        var period = format === 12 ? this.periodSubject.getValue() : '';
        var time = (hour + ":" + minute + " " + period).trim();
        return TimeAdapter.formatTime(time, { format: format });
    };
    NgxMaterialTimepickerService.prototype.setDefaultTime = function (time, format) {
        var defaultTime = TimeAdapter.parseTime(time, { format: format }).toJSDate();
        if (DateTime.fromJSDate(defaultTime).isValid) {
            var period = time.substr(time.length - 2).toUpperCase();
            var hour = defaultTime.getHours();
            this.hour = tslib_1.__assign({}, DEFAULT_HOUR, { time: formatHourByPeriod(hour, period) });
            this.minute = tslib_1.__assign({}, DEFAULT_MINUTE, { time: defaultTime.getMinutes() });
            this.period = period;
        }
        else {
            this.resetTime();
        }
    };
    NgxMaterialTimepickerService.prototype.resetTime = function () {
        this.hour = tslib_1.__assign({}, DEFAULT_HOUR);
        this.minute = tslib_1.__assign({}, DEFAULT_MINUTE);
        this.period = TimePeriod.AM;
    };
    NgxMaterialTimepickerService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NgxMaterialTimepickerService_Factory() { return new NgxMaterialTimepickerService(); }, token: NgxMaterialTimepickerService, providedIn: "root" });
    NgxMaterialTimepickerService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        })
    ], NgxMaterialTimepickerService);
    return NgxMaterialTimepickerService;
}());
export { NgxMaterialTimepickerService };
/***
 *  Format hour in 24hours format to meridian (AM or PM) format
 */
function formatHourByPeriod(hour, period) {
    switch (period) {
        case TimePeriod.AM:
            return hour === 0 ? 12 : hour;
        case TimePeriod.PM:
            return hour === 12 ? 12 : hour - 12;
        default:
            return hour;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL3NlcnZpY2VzL25neC1tYXRlcmlhbC10aW1lcGlja2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7O0FBR2pDLElBQU0sWUFBWSxHQUFrQjtJQUNoQyxJQUFJLEVBQUUsRUFBRTtJQUNSLEtBQUssRUFBRSxHQUFHO0NBQ2IsQ0FBQztBQUNGLElBQU0sY0FBYyxHQUFrQjtJQUNsQyxJQUFJLEVBQUUsQ0FBQztJQUNQLEtBQUssRUFBRSxHQUFHO0NBQ2IsQ0FBQztBQUtGO0lBSEE7UUFLWSxnQkFBVyxHQUFHLElBQUksZUFBZSxDQUFnQixZQUFZLENBQUMsQ0FBQztRQUMvRCxrQkFBYSxHQUFHLElBQUksZUFBZSxDQUFnQixjQUFjLENBQUMsQ0FBQztRQUNuRSxrQkFBYSxHQUFHLElBQUksZUFBZSxDQUFhLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQXlFMUU7SUF0RUcsc0JBQUksOENBQUk7YUFBUixVQUFTLElBQW1CO1lBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksc0RBQVk7YUFBaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFF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RXRDO2FBQU07WUFDSCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDcEI7SUFDTCxDQUFDO0lBRU8sZ0RBQVMsR0FBakI7UUFDSSxJQUFJLENBQUMsSUFBSSx3QkFBTyxZQUFZLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsTUFBTSx3QkFBTyxjQUFjLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7SUE1RVEsNEJBQTRCO1FBSHhDLFVBQVUsQ0FBQztZQUNSLFVBQVUsRUFBRSxNQUFNO1NBQ3JCLENBQUM7T0FDVyw0QkFBNEIsQ0E2RXhDO3VDQWpHRDtDQWlHQyxBQTdFRCxJQTZFQztTQTdFWSw0QkFBNEI7QUErRXpDOztHQUVHO0FBQ0gsU0FBUyxrQkFBa0IsQ0FBQyxJQUFZLEVBQUUsTUFBa0I7SUFDeEQsUUFBUSxNQUFNLEVBQUU7UUFDWixLQUFLLFVBQVUsQ0FBQyxFQUFFO1lBQ2QsT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNsQyxLQUFLLFVBQVUsQ0FBQyxFQUFFO1lBQ2QsT0FBTyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDeEM7WUFDSSxPQUFPLElBQUksQ0FBQztLQUNuQjtBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENsb2NrRmFjZVRpbWUgfSBmcm9tICcuLi9tb2RlbHMvY2xvY2stZmFjZS10aW1lLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBUaW1lUGVyaW9kIH0gZnJvbSAnLi4vbW9kZWxzL3RpbWUtcGVyaW9kLmVudW0nO1xyXG5pbXBvcnQgeyBUaW1lQWRhcHRlciB9IGZyb20gJy4vdGltZS1hZGFwdGVyJztcclxuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XHJcblxyXG5cclxuY29uc3QgREVGQVVMVF9IT1VSOiBDbG9ja0ZhY2VUaW1lID0ge1xyXG4gICAgdGltZTogMTIsXHJcbiAgICBhbmdsZTogMzYwXHJcbn07XHJcbmNvbnN0IERFRkFVTFRfTUlOVVRFOiBDbG9ja0ZhY2VUaW1lID0ge1xyXG4gICAgdGltZTogMCxcclxuICAgIGFuZ2xlOiAzNjBcclxufTtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxUaW1lcGlja2VyU2VydmljZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBob3VyU3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Q2xvY2tGYWNlVGltZT4oREVGQVVMVF9IT1VSKTtcclxuICAgIHByaXZhdGUgbWludXRlU3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Q2xvY2tGYWNlVGltZT4oREVGQVVMVF9NSU5VVEUpO1xyXG4gICAgcHJpdmF0ZSBwZXJpb2RTdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUaW1lUGVyaW9kPihUaW1lUGVyaW9kLkFNKTtcclxuXHJcblxyXG4gICAgc2V0IGhvdXIoaG91cjogQ2xvY2tGYWNlVGltZSkge1xyXG4gICAgICAgIHRoaXMuaG91clN1YmplY3QubmV4dChob3VyKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2VsZWN0ZWRIb3VyKCk6IE9ic2VydmFibGU8Q2xvY2tGYWNlVGltZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhvdXJTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBtaW51dGUobWludXRlOiBDbG9ja0ZhY2VUaW1lKSB7XHJcbiAgICAgICAgdGhpcy5taW51dGVTdWJqZWN0Lm5leHQobWludXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2VsZWN0ZWRNaW51dGUoKTogT2JzZXJ2YWJsZTxDbG9ja0ZhY2VUaW1lPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWludXRlU3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgcGVyaW9kKHBlcmlvZDogVGltZVBlcmlvZCkge1xyXG4gICAgICAgIGNvbnN0IGlzUGVyaW9kVmFsaWQgPSAocGVyaW9kID09PSBUaW1lUGVyaW9kLkFNKSB8fCAocGVyaW9kID09PSBUaW1lUGVyaW9kLlBNKTtcclxuXHJcbiAgICAgICAgaWYgKGlzUGVyaW9kVmFsaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5wZXJpb2RTdWJqZWN0Lm5leHQocGVyaW9kKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNlbGVjdGVkUGVyaW9kKCk6IE9ic2VydmFibGU8VGltZVBlcmlvZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBlcmlvZFN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHNldERlZmF1bHRUaW1lSWZBdmFpbGFibGUodGltZTogc3RyaW5nLCBtaW46IERhdGVUaW1lLCBtYXg6IERhdGVUaW1lLCBmb3JtYXQ6IG51bWJlciwgbWludXRlc0dhcD86IG51bWJlcikge1xyXG4gICAgICAgIC8qIFdvcmthcm91bmQgdG8gZG91YmxlIGVycm9yIG1lc3NhZ2UqL1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChUaW1lQWRhcHRlci5pc1RpbWVBdmFpbGFibGUodGltZSwgbWluLCBtYXgsICdtaW51dGVzJywgbWludXRlc0dhcCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGVmYXVsdFRpbWUodGltZSwgZm9ybWF0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RnVsbFRpbWUoZm9ybWF0OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IGhvdXIgPSB0aGlzLmhvdXJTdWJqZWN0LmdldFZhbHVlKCkudGltZTtcclxuICAgICAgICBjb25zdCBtaW51dGUgPSB0aGlzLm1pbnV0ZVN1YmplY3QuZ2V0VmFsdWUoKS50aW1lO1xyXG4gICAgICAgIGNvbnN0IHBlcmlvZCA9IGZvcm1hdCA9PT0gMTIgPyB0aGlzLnBlcmlvZFN1YmplY3QuZ2V0VmFsdWUoKSA6ICcnO1xyXG4gICAgICAgIGNvbnN0IHRpbWUgPSBgJHtob3VyfToke21pbnV0ZX0gJHtwZXJpb2R9YC50cmltKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBUaW1lQWRhcHRlci5mb3JtYXRUaW1lKHRpbWUsIHtmb3JtYXR9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldERlZmF1bHRUaW1lKHRpbWU6IHN0cmluZywgZm9ybWF0OiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBkZWZhdWx0VGltZSA9IFRpbWVBZGFwdGVyLnBhcnNlVGltZSh0aW1lLCB7Zm9ybWF0fSkudG9KU0RhdGUoKTtcclxuXHJcbiAgICAgICAgaWYgKERhdGVUaW1lLmZyb21KU0RhdGUoZGVmYXVsdFRpbWUpLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgY29uc3QgcGVyaW9kID0gdGltZS5zdWJzdHIodGltZS5sZW5ndGggLSAyKS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgICAgICBjb25zdCBob3VyID0gZGVmYXVsdFRpbWUuZ2V0SG91cnMoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaG91ciA9IHsuLi5ERUZBVUxUX0hPVVIsIHRpbWU6IGZvcm1hdEhvdXJCeVBlcmlvZChob3VyLCBwZXJpb2QgYXMgVGltZVBlcmlvZCl9O1xyXG4gICAgICAgICAgICB0aGlzLm1pbnV0ZSA9IHsuLi5ERUZBVUxUX01JTlVURSwgdGltZTogZGVmYXVsdFRpbWUuZ2V0TWludXRlcygpfTtcclxuICAgICAgICAgICAgdGhpcy5wZXJpb2QgPSBwZXJpb2QgYXMgVGltZVBlcmlvZDtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldFRpbWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXNldFRpbWUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ob3VyID0gey4uLkRFRkFVTFRfSE9VUn07XHJcbiAgICAgICAgdGhpcy5taW51dGUgPSB7Li4uREVGQVVMVF9NSU5VVEV9O1xyXG4gICAgICAgIHRoaXMucGVyaW9kID0gVGltZVBlcmlvZC5BTTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqKlxyXG4gKiAgRm9ybWF0IGhvdXIgaW4gMjRob3VycyBmb3JtYXQgdG8gbWVyaWRpYW4gKEFNIG9yIFBNKSBmb3JtYXRcclxuICovXHJcbmZ1bmN0aW9uIGZvcm1hdEhvdXJCeVBlcmlvZChob3VyOiBudW1iZXIsIHBlcmlvZDogVGltZVBlcmlvZCk6IG51bWJlciB7XHJcbiAgICBzd2l0Y2ggKHBlcmlvZCkge1xyXG4gICAgICAgIGNhc2UgVGltZVBlcmlvZC5BTTpcclxuICAgICAgICAgICAgcmV0dXJuIGhvdXIgPT09IDAgPyAxMiA6IGhvdXI7XHJcbiAgICAgICAgY2FzZSBUaW1lUGVyaW9kLlBNOlxyXG4gICAgICAgICAgICByZXR1cm4gaG91ciA9PT0gMTIgPyAxMiA6IGhvdXIgLSAxMjtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gaG91cjtcclxuICAgIH1cclxufVxyXG4iXX0=