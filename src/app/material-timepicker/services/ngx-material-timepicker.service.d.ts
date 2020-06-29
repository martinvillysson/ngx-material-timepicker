import { ClockFaceTime } from '../models/clock-face-time.interface';
import { Observable } from 'rxjs';
import { TimePeriod } from '../models/time-period.enum';
import { DateTime } from 'luxon';
export declare class NgxMaterialTimepickerService {
    private hourSubject;
    private minuteSubject;
    private periodSubject;
    set hour(hour: ClockFaceTime);
    get selectedHour(): Observable<ClockFaceTime>;
    set minute(minute: ClockFaceTime);
    get selectedMinute(): Observable<ClockFaceTime>;
    set period(period: TimePeriod);
    get selectedPeriod(): Observable<TimePeriod>;
    setDefaultTimeIfAvailable(time: string, min: DateTime, max: DateTime, format: number, minutesGap?: number): void;
    getFullTime(format: number): string;
    private setDefaultTime;
    private resetTime;
}
