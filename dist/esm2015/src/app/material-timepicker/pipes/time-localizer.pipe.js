import * as tslib_1 from "tslib";
import { Inject, Pipe } from '@angular/core';
import { TIME_LOCALE } from '../tokens/time-locale.token';
import { TimeUnit } from '../models/time-unit.enum';
import { DateTime } from 'luxon';
let TimeLocalizerPipe = class TimeLocalizerPipe {
    constructor(locale) {
        this.locale = locale;
    }
    transform(time, timeUnit) {
        if (time == null || time === '') {
            return '';
        }
        switch (timeUnit) {
            case TimeUnit.HOUR: {
                const format = time === 0 ? 'HH' : 'H';
                return this.formatTime('hour', time, format);
            }
            case TimeUnit.MINUTE:
                return this.formatTime('minute', time, 'mm');
            default:
                throw new Error(`There is no Time Unit with type ${timeUnit}`);
        }
    }
    formatTime(timeMeasure, time, format) {
        try {
            return DateTime.fromObject({ [timeMeasure]: +time }).setLocale(this.locale).toFormat(format);
        }
        catch (_a) {
            throw new Error(`Cannot format provided time - ${time} to locale - ${this.locale}`);
        }
    }
};
TimeLocalizerPipe = tslib_1.__decorate([
    Pipe({
        name: 'timeLocalizer'
    }),
    tslib_1.__param(0, Inject(TIME_LOCALE)),
    tslib_1.__metadata("design:paramtypes", [String])
], TimeLocalizerPipe);
export { TimeLocalizerPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1sb2NhbGl6ZXIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL3BpcGVzL3RpbWUtbG9jYWxpemVyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFPakMsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFFMUIsWUFBeUMsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDdkQsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUFxQixFQUFFLFFBQWtCO1FBQy9DLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRSxFQUFFO1lBQzdCLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFFRCxRQUFRLFFBQVEsRUFBRTtZQUNkLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoQixNQUFNLE1BQU0sR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQkFDdkMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDaEQ7WUFDRCxLQUFLLFFBQVEsQ0FBQyxNQUFNO2dCQUNoQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNqRDtnQkFDSSxNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQ3RFO0lBQ0wsQ0FBQztJQUVPLFVBQVUsQ0FBQyxXQUF3QixFQUFFLElBQXFCLEVBQUUsTUFBYztRQUM5RSxJQUFJO1lBQ0EsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDOUY7UUFBQyxXQUFNO1lBQ0osTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsSUFBSSxnQkFBZ0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDdkY7SUFDTCxDQUFDO0NBQ0osQ0FBQTtBQTdCWSxpQkFBaUI7SUFIN0IsSUFBSSxDQUFDO1FBQ0YsSUFBSSxFQUFFLGVBQWU7S0FDeEIsQ0FBQztJQUdlLG1CQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTs7R0FGdkIsaUJBQWlCLENBNkI3QjtTQTdCWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVElNRV9MT0NBTEUgfSBmcm9tICcuLi90b2tlbnMvdGltZS1sb2NhbGUudG9rZW4nO1xyXG5pbXBvcnQgeyBUaW1lVW5pdCB9IGZyb20gJy4uL21vZGVscy90aW1lLXVuaXQuZW51bSc7XHJcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nO1xyXG5cclxudHlwZSBUaW1lTWVhc3VyZSA9ICdob3VyJyB8ICdtaW51dGUnO1xyXG5cclxuQFBpcGUoe1xyXG4gICAgbmFtZTogJ3RpbWVMb2NhbGl6ZXInXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUaW1lTG9jYWxpemVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoVElNRV9MT0NBTEUpIHByaXZhdGUgbG9jYWxlOiBzdHJpbmcpIHtcclxuICAgIH1cclxuXHJcbiAgICB0cmFuc2Zvcm0odGltZTogbnVtYmVyIHwgc3RyaW5nLCB0aW1lVW5pdDogVGltZVVuaXQpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0aW1lID09IG51bGwgfHwgdGltZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3dpdGNoICh0aW1lVW5pdCkge1xyXG4gICAgICAgICAgICBjYXNlIFRpbWVVbml0LkhPVVI6IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1hdCA9IHRpbWUgPT09IDAgPyAnSEgnIDogJ0gnO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0VGltZSgnaG91cicsIHRpbWUsIGZvcm1hdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBUaW1lVW5pdC5NSU5VVEU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRUaW1lKCdtaW51dGUnLCB0aW1lLCAnbW0nKTtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlcmUgaXMgbm8gVGltZSBVbml0IHdpdGggdHlwZSAke3RpbWVVbml0fWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZvcm1hdFRpbWUodGltZU1lYXN1cmU6IFRpbWVNZWFzdXJlLCB0aW1lOiBzdHJpbmcgfCBudW1iZXIsIGZvcm1hdDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gRGF0ZVRpbWUuZnJvbU9iamVjdCh7W3RpbWVNZWFzdXJlXTogK3RpbWV9KS5zZXRMb2NhbGUodGhpcy5sb2NhbGUpLnRvRm9ybWF0KGZvcm1hdCk7XHJcbiAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGZvcm1hdCBwcm92aWRlZCB0aW1lIC0gJHt0aW1lfSB0byBsb2NhbGUgLSAke3RoaXMubG9jYWxlfWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=