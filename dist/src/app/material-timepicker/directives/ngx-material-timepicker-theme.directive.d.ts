import { AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { NgxMaterialTimepickerTheme } from '../models/ngx-material-timepicker-theme.interface';
export declare class NgxMaterialTimepickerThemeDirective implements AfterViewInit {
    private renderer;
    theme: NgxMaterialTimepickerTheme;
    private element;
    constructor(elementRef: ElementRef, renderer: Renderer2);
    ngAfterViewInit(): void;
    private setTheme;
}
