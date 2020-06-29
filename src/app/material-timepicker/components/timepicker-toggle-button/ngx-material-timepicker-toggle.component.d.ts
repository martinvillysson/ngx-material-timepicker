import { NgxMaterialTimepickerToggleIconDirective } from '../../directives/ngx-material-timepicker-toggle-icon.directive';
import { NgxMaterialTimepickerComponent } from '../../ngx-material-timepicker.component';
export declare class NgxMaterialTimepickerToggleComponent {
    timepicker: NgxMaterialTimepickerComponent;
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    customIcon: NgxMaterialTimepickerToggleIconDirective;
    open(event: any): void;
}
