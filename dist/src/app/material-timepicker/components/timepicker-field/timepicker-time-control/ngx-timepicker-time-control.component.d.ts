import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TimeUnit } from '../../../models/time-unit.enum';
import { TimeParserPipe } from '../../../pipes/time-parser.pipe';
export declare class NgxTimepickerTimeControlComponent implements OnInit, OnChanges {
    private timeParser;
    time: number;
    min: number;
    max: number;
    placeholder: string;
    timeUnit: TimeUnit;
    disabled: boolean;
    isDefaultTimeSet: boolean;
    timeChanged: EventEmitter<number>;
    isFocused: boolean;
    constructor(timeParser: TimeParserPipe);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    onKeydown(event: KeyboardEvent): void;
    increase(): void;
    decrease(): void;
    onInput(input: HTMLInputElement): void;
    onFocus(): void;
    onBlur(): void;
    onModelChange(value: string): void;
}
