import { AfterViewInit, ElementRef, EventEmitter, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ClockFaceTime } from '../../models/clock-face-time.interface';
import { TimeUnit } from '../../models/time-unit.enum';
export declare class NgxMaterialTimepickerFaceComponent implements AfterViewInit, OnChanges, OnDestroy {
    timeUnit: typeof TimeUnit;
    isClockFaceDisabled: boolean;
    innerClockFaceSize: number;
    faceTime: ClockFaceTime[];
    selectedTime: ClockFaceTime;
    unit: TimeUnit;
    format: number;
    minutesGap: number;
    timeChange: EventEmitter<ClockFaceTime>;
    timeSelected: EventEmitter<number>;
    clockFace: ElementRef;
    clockHand: ElementRef;
    private isStarted;
    private touchStartHandler;
    private touchEndHandler;
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    trackByTime(_: any, time: ClockFaceTime): string | number;
    onMousedown(e: MouseEvent | TouchEvent): void;
    selectTime(e: MouseEvent | Touch): void;
    onMouseup(e: MouseEvent | TouchEvent): void;
    ngOnDestroy(): void;
    private addTouchEvents;
    private removeTouchEvents;
    private setClockHandPosition;
    private selectAvailableTime;
    private isInnerClockFace;
    private decreaseClockHand;
    private increaseClockHand;
}
