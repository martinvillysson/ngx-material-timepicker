import { OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ClockFaceTime } from '../../models/clock-face-time.interface';
import { TimePeriod } from '../../models/time-period.enum';
import { TimeUnit } from '../../models/time-unit.enum';
import { DateTime } from 'luxon';
import { AnimationEvent } from '@angular/animations';
import { NgxMaterialTimepickerService } from '../../services/ngx-material-timepicker.service';
import { Observable } from 'rxjs';
import { TimepickerRef } from '../../models/timepicker-ref.interface';
import { TimepickerConfig } from '../../models/timepicker-config.interface';
export declare enum AnimationState {
    ENTER = "enter",
    LEAVE = "leave"
}
export declare class NgxMaterialTimepickerContentComponent implements OnInit, OnDestroy, TimepickerConfig {
    private timepickerService;
    selectedHour: Observable<ClockFaceTime>;
    selectedMinute: Observable<ClockFaceTime>;
    selectedPeriod: Observable<TimePeriod>;
    timeUnit: typeof TimeUnit;
    activeTimeUnit: TimeUnit;
    animationState: AnimationState;
    cancelBtnTmpl: TemplateRef<Node>;
    editableHintTmpl: TemplateRef<Node>;
    confirmBtnTmpl: TemplateRef<Node>;
    enableKeyboardInput: boolean;
    preventOverlayClick: boolean;
    disableAnimation: boolean;
    disabled: boolean;
    format: number;
    minutesGap: number;
    minTime: DateTime;
    maxTime: DateTime;
    time: string;
    timepickerBaseRef: TimepickerRef;
    defaultTime: string;
    private unsubscribe;
    constructor(timepickerService: NgxMaterialTimepickerService);
    ngOnInit(): void;
    onHourChange(hour: ClockFaceTime): void;
    onHourSelected(hour: number): void;
    onMinuteChange(minute: ClockFaceTime): void;
    changePeriod(period: TimePeriod): void;
    changeTimeUnit(unit: TimeUnit): void;
    setTime(): void;
    close(): void;
    animationDone(event: AnimationEvent): void;
    ngOnDestroy(): void;
    private setDefaultTime;
    private defineTime;
}
