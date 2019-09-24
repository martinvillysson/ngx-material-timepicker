import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaterialTimepickerComponent } from './ngx-material-timepicker.component';
import { FormsModule } from '@angular/forms';
import { NgxMaterialTimepickerToggleComponent } from './components/timepicker-toggle-button/ngx-material-timepicker-toggle.component';
import { TimepickerDirective } from './directives/ngx-timepicker.directive';
import { NgxMaterialTimepickerToggleIconDirective } from './directives/ngx-material-timepicker-toggle-icon.directive';
import { NgxMaterialTimepickerThemeDirective } from './directives/ngx-material-timepicker-theme.directive';
import { NgxMaterialTimepicker24HoursFaceComponent } from './components/timepicker-24-hours-face/ngx-material-timepicker-24-hours-face.component';
import { NgxMaterialTimepicker12HoursFaceComponent } from './components/timepicker-12-hours-face/ngx-material-timepicker-12-hours-face.component';
import { NgxMaterialTimepickerMinutesFaceComponent } from './components/timepicker-minutes-face/ngx-material-timepicker-minutes-face.component';
import { NgxMaterialTimepickerFaceComponent } from './components/timepicker-face/ngx-material-timepicker-face.component';
import { NgxMaterialTimepickerButtonComponent } from './components/timepicker-button/ngx-material-timepicker-button.component';
import { NgxMaterialTimepickerDialComponent } from './components/timepicker-dial/ngx-material-timepicker-dial.component';
import { NgxMaterialTimepickerDialControlComponent } from './components/timepicker-dial-control/ngx-material-timepicker-dial-control.component';
import { NgxMaterialTimepickerPeriodComponent } from './components/timepicker-period/ngx-material-timepicker-period.component';
import { StyleSanitizerPipe } from './pipes/style-sanitizer.pipe';
import { TimeFormatterPipe } from './pipes/time-formatter.pipe';
import { MinutesFormatterPipe } from './pipes/minutes-formatter.pipe';
import { NgxTimepickerFieldComponent } from './components/timepicker-field/ngx-timepicker-field.component';
import { NgxTimepickerTimeControlComponent } from './components/timepicker-field/timepicker-time-control/ngx-timepicker-time-control.component';
import { NgxTimepickerPeriodSelectorComponent } from './components/timepicker-field/timepicker-period-selector/ngx-timepicker-period-selector.component';
import { TimeLocalizerPipe } from './pipes/time-localizer.pipe';
import { TIME_LOCALE } from './tokens/time-locale.token';
import { TimeAdapter } from './services/time-adapter';
import { TimeParserPipe } from './pipes/time-parser.pipe';
import { ActiveHourPipe } from './pipes/active-hour.pipe';
import { ActiveMinutePipe } from './pipes/active-minute.pipe';
import { NgxMaterialTimepickerContentComponent } from './components/ngx-material-timepicker-content/ngx-material-timepicker-content.component';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { AutofocusDirective } from './directives/autofocus.directive';
var ɵ0 = TimeAdapter.DEFAULT_LOCALE;
var NgxMaterialTimepickerModule = /** @class */ (function () {
    function NgxMaterialTimepickerModule() {
    }
    NgxMaterialTimepickerModule_1 = NgxMaterialTimepickerModule;
    NgxMaterialTimepickerModule.setLocale = function (locale) {
        return {
            ngModule: NgxMaterialTimepickerModule_1,
            providers: [
                { provide: TIME_LOCALE, useValue: locale }
            ]
        };
    };
    var NgxMaterialTimepickerModule_1;
    NgxMaterialTimepickerModule = NgxMaterialTimepickerModule_1 = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                PortalModule,
                OverlayModule
            ],
            exports: [
                NgxMaterialTimepickerComponent,
                NgxMaterialTimepickerToggleComponent,
                NgxTimepickerFieldComponent,
                TimepickerDirective,
                NgxMaterialTimepickerToggleIconDirective,
                NgxMaterialTimepickerThemeDirective
            ],
            declarations: [
                AutofocusDirective,
                NgxMaterialTimepickerComponent,
                NgxMaterialTimepicker24HoursFaceComponent,
                NgxMaterialTimepicker12HoursFaceComponent,
                NgxMaterialTimepickerMinutesFaceComponent,
                NgxMaterialTimepickerFaceComponent,
                NgxMaterialTimepickerToggleComponent,
                NgxMaterialTimepickerButtonComponent,
                NgxMaterialTimepickerDialComponent,
                NgxMaterialTimepickerDialControlComponent,
                NgxMaterialTimepickerPeriodComponent,
                StyleSanitizerPipe,
                TimeFormatterPipe,
                TimepickerDirective,
                NgxMaterialTimepickerToggleIconDirective,
                MinutesFormatterPipe,
                NgxMaterialTimepickerThemeDirective,
                NgxTimepickerFieldComponent,
                NgxTimepickerTimeControlComponent,
                NgxTimepickerPeriodSelectorComponent,
                TimeLocalizerPipe,
                TimeParserPipe,
                ActiveHourPipe,
                ActiveMinutePipe,
                NgxMaterialTimepickerContentComponent
            ],
            providers: [
                { provide: TIME_LOCALE, useValue: ɵ0 }
            ],
            entryComponents: [NgxMaterialTimepickerContentComponent]
        })
    ], NgxMaterialTimepickerModule);
    return NgxMaterialTimepickerModule;
}());
export { NgxMaterialTimepickerModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDckYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxvQ0FBb0MsRUFBRSxNQUFNLGdGQUFnRixDQUFDO0FBQ3RJLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzVFLE9BQU8sRUFBRSx3Q0FBd0MsRUFBRSxNQUFNLDREQUE0RCxDQUFDO0FBQ3RILE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQzNHLE9BQU8sRUFDTCx5Q0FBeUMsRUFDMUMsTUFBTSx1RkFBdUYsQ0FBQztBQUMvRixPQUFPLEVBQ0wseUNBQXlDLEVBQzFDLE1BQU0sdUZBQXVGLENBQUM7QUFDL0YsT0FBTyxFQUNMLHlDQUF5QyxFQUMxQyxNQUFNLHFGQUFxRixDQUFDO0FBQzdGLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLHFFQUFxRSxDQUFDO0FBQ3pILE9BQU8sRUFBRSxvQ0FBb0MsRUFBRSxNQUFNLHlFQUF5RSxDQUFDO0FBQy9ILE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLHFFQUFxRSxDQUFDO0FBQ3pILE9BQU8sRUFDTCx5Q0FBeUMsRUFDMUMsTUFBTSxxRkFBcUYsQ0FBQztBQUM3RixPQUFPLEVBQUUsb0NBQW9DLEVBQUUsTUFBTSx5RUFBeUUsQ0FBQztBQUMvSCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw4REFBOEQsQ0FBQztBQUMzRyxPQUFPLEVBQ0wsaUNBQWlDLEVBQ2xDLE1BQU0sNkZBQTZGLENBQUM7QUFDckcsT0FBTyxFQUNMLG9DQUFvQyxFQUNyQyxNQUFNLG1HQUFtRyxDQUFDO0FBQzNHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQ0wscUNBQXFDLEVBQ3RDLE1BQU0sd0ZBQXdGLENBQUM7QUFDaEcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztTQTZDaEMsV0FBVyxDQUFDLGNBQWM7QUFJaEU7SUFBQTtJQVVBLENBQUM7b0NBVlksMkJBQTJCO0lBRS9CLHFDQUFTLEdBQWhCLFVBQWlCLE1BQWM7UUFDN0IsT0FBTztZQUNMLFFBQVEsRUFBRSw2QkFBMkI7WUFDckMsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFO2FBQzNDO1NBQ0YsQ0FBQztJQUNKLENBQUM7O0lBVFUsMkJBQTJCO1FBL0N2QyxRQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsWUFBWTtnQkFDWixXQUFXO2dCQUNYLFlBQVk7Z0JBQ1osYUFBYTthQUNkO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLDhCQUE4QjtnQkFDOUIsb0NBQW9DO2dCQUNwQywyQkFBMkI7Z0JBQzNCLG1CQUFtQjtnQkFDbkIsd0NBQXdDO2dCQUN4QyxtQ0FBbUM7YUFDcEM7WUFDRCxZQUFZLEVBQUU7Z0JBQ1osa0JBQWtCO2dCQUNsQiw4QkFBOEI7Z0JBQzlCLHlDQUF5QztnQkFDekMseUNBQXlDO2dCQUN6Qyx5Q0FBeUM7Z0JBQ3pDLGtDQUFrQztnQkFDbEMsb0NBQW9DO2dCQUNwQyxvQ0FBb0M7Z0JBQ3BDLGtDQUFrQztnQkFDbEMseUNBQXlDO2dCQUN6QyxvQ0FBb0M7Z0JBQ3BDLGtCQUFrQjtnQkFDbEIsaUJBQWlCO2dCQUNqQixtQkFBbUI7Z0JBQ25CLHdDQUF3QztnQkFDeEMsb0JBQW9CO2dCQUNwQixtQ0FBbUM7Z0JBQ25DLDJCQUEyQjtnQkFDM0IsaUNBQWlDO2dCQUNqQyxvQ0FBb0M7Z0JBQ3BDLGlCQUFpQjtnQkFDakIsY0FBYztnQkFDZCxjQUFjO2dCQUNkLGdCQUFnQjtnQkFDaEIscUNBQXFDO2FBQ3RDO1lBQ0QsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLElBQTRCLEVBQUU7YUFDL0Q7WUFDRCxlQUFlLEVBQUUsQ0FBQyxxQ0FBcUMsQ0FBQztTQUN6RCxDQUFDO09BQ1csMkJBQTJCLENBVXZDO0lBQUQsa0NBQUM7Q0FBQSxBQVZELElBVUM7U0FWWSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL25neC1tYXRlcmlhbC10aW1lcGlja2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUb2dnbGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdGltZXBpY2tlci10b2dnbGUtYnV0dG9uL25neC1tYXRlcmlhbC10aW1lcGlja2VyLXRvZ2dsZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUaW1lcGlja2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL25neC10aW1lcGlja2VyLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE5neE1hdGVyaWFsVGltZXBpY2tlclRvZ2dsZUljb25EaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItdG9nZ2xlLWljb24uZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItdGhlbWUuZGlyZWN0aXZlJztcclxuaW1wb3J0IHtcclxuICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXIyNEhvdXJzRmFjZUNvbXBvbmVudFxyXG59IGZyb20gJy4vY29tcG9uZW50cy90aW1lcGlja2VyLTI0LWhvdXJzLWZhY2Uvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItMjQtaG91cnMtZmFjZS5jb21wb25lbnQnO1xyXG5pbXBvcnQge1xyXG4gIE5neE1hdGVyaWFsVGltZXBpY2tlcjEySG91cnNGYWNlQ29tcG9uZW50XHJcbn0gZnJvbSAnLi9jb21wb25lbnRzL3RpbWVwaWNrZXItMTItaG91cnMtZmFjZS9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci0xMi1ob3Vycy1mYWNlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7XHJcbiAgTmd4TWF0ZXJpYWxUaW1lcGlja2VyTWludXRlc0ZhY2VDb21wb25lbnRcclxufSBmcm9tICcuL2NvbXBvbmVudHMvdGltZXBpY2tlci1taW51dGVzLWZhY2Uvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItbWludXRlcy1mYWNlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5neE1hdGVyaWFsVGltZXBpY2tlckZhY2VDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdGltZXBpY2tlci1mYWNlL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWZhY2UuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmd4TWF0ZXJpYWxUaW1lcGlja2VyQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RpbWVwaWNrZXItYnV0dG9uL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWJ1dHRvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJEaWFsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RpbWVwaWNrZXItZGlhbC9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1kaWFsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7XHJcbiAgTmd4TWF0ZXJpYWxUaW1lcGlja2VyRGlhbENvbnRyb2xDb21wb25lbnRcclxufSBmcm9tICcuL2NvbXBvbmVudHMvdGltZXBpY2tlci1kaWFsLWNvbnRyb2wvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC1jb250cm9sLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5neE1hdGVyaWFsVGltZXBpY2tlclBlcmlvZENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90aW1lcGlja2VyLXBlcmlvZC9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1wZXJpb2QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3R5bGVTYW5pdGl6ZXJQaXBlIH0gZnJvbSAnLi9waXBlcy9zdHlsZS1zYW5pdGl6ZXIucGlwZSc7XHJcbmltcG9ydCB7IFRpbWVGb3JtYXR0ZXJQaXBlIH0gZnJvbSAnLi9waXBlcy90aW1lLWZvcm1hdHRlci5waXBlJztcclxuaW1wb3J0IHsgTWludXRlc0Zvcm1hdHRlclBpcGUgfSBmcm9tICcuL3BpcGVzL21pbnV0ZXMtZm9ybWF0dGVyLnBpcGUnO1xyXG5pbXBvcnQgeyBOZ3hUaW1lcGlja2VyRmllbGRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdGltZXBpY2tlci1maWVsZC9uZ3gtdGltZXBpY2tlci1maWVsZC5jb21wb25lbnQnO1xyXG5pbXBvcnQge1xyXG4gIE5neFRpbWVwaWNrZXJUaW1lQ29udHJvbENvbXBvbmVudFxyXG59IGZyb20gJy4vY29tcG9uZW50cy90aW1lcGlja2VyLWZpZWxkL3RpbWVwaWNrZXItdGltZS1jb250cm9sL25neC10aW1lcGlja2VyLXRpbWUtY29udHJvbC5jb21wb25lbnQnO1xyXG5pbXBvcnQge1xyXG4gIE5neFRpbWVwaWNrZXJQZXJpb2RTZWxlY3RvckNvbXBvbmVudFxyXG59IGZyb20gJy4vY29tcG9uZW50cy90aW1lcGlja2VyLWZpZWxkL3RpbWVwaWNrZXItcGVyaW9kLXNlbGVjdG9yL25neC10aW1lcGlja2VyLXBlcmlvZC1zZWxlY3Rvci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUaW1lTG9jYWxpemVyUGlwZSB9IGZyb20gJy4vcGlwZXMvdGltZS1sb2NhbGl6ZXIucGlwZSc7XHJcbmltcG9ydCB7IFRJTUVfTE9DQUxFIH0gZnJvbSAnLi90b2tlbnMvdGltZS1sb2NhbGUudG9rZW4nO1xyXG5pbXBvcnQgeyBUaW1lQWRhcHRlciB9IGZyb20gJy4vc2VydmljZXMvdGltZS1hZGFwdGVyJztcclxuaW1wb3J0IHsgVGltZVBhcnNlclBpcGUgfSBmcm9tICcuL3BpcGVzL3RpbWUtcGFyc2VyLnBpcGUnO1xyXG5pbXBvcnQgeyBBY3RpdmVIb3VyUGlwZSB9IGZyb20gJy4vcGlwZXMvYWN0aXZlLWhvdXIucGlwZSc7XHJcbmltcG9ydCB7IEFjdGl2ZU1pbnV0ZVBpcGUgfSBmcm9tICcuL3BpcGVzL2FjdGl2ZS1taW51dGUucGlwZSc7XHJcbmltcG9ydCB7XHJcbiAgTmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudFxyXG59IGZyb20gJy4vY29tcG9uZW50cy9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1jb250ZW50L25neC1tYXRlcmlhbC10aW1lcGlja2VyLWNvbnRlbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUG9ydGFsTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XHJcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XHJcbmltcG9ydCB7IEF1dG9mb2N1c0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9hdXRvZm9jdXMuZGlyZWN0aXZlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBQb3J0YWxNb2R1bGUsXHJcbiAgICBPdmVybGF5TW9kdWxlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb21wb25lbnQsXHJcbiAgICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUb2dnbGVDb21wb25lbnQsXHJcbiAgICBOZ3hUaW1lcGlja2VyRmllbGRDb21wb25lbnQsXHJcbiAgICBUaW1lcGlja2VyRGlyZWN0aXZlLFxyXG4gICAgTmd4TWF0ZXJpYWxUaW1lcGlja2VyVG9nZ2xlSWNvbkRpcmVjdGl2ZSxcclxuICAgIE5neE1hdGVyaWFsVGltZXBpY2tlclRoZW1lRGlyZWN0aXZlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEF1dG9mb2N1c0RpcmVjdGl2ZSxcclxuICAgIE5neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudCxcclxuICAgIE5neE1hdGVyaWFsVGltZXBpY2tlcjI0SG91cnNGYWNlQ29tcG9uZW50LFxyXG4gICAgTmd4TWF0ZXJpYWxUaW1lcGlja2VyMTJIb3Vyc0ZhY2VDb21wb25lbnQsXHJcbiAgICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJNaW51dGVzRmFjZUNvbXBvbmVudCxcclxuICAgIE5neE1hdGVyaWFsVGltZXBpY2tlckZhY2VDb21wb25lbnQsXHJcbiAgICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUb2dnbGVDb21wb25lbnQsXHJcbiAgICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJCdXR0b25Db21wb25lbnQsXHJcbiAgICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJEaWFsQ29tcG9uZW50LFxyXG4gICAgTmd4TWF0ZXJpYWxUaW1lcGlja2VyRGlhbENvbnRyb2xDb21wb25lbnQsXHJcbiAgICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJQZXJpb2RDb21wb25lbnQsXHJcbiAgICBTdHlsZVNhbml0aXplclBpcGUsXHJcbiAgICBUaW1lRm9ybWF0dGVyUGlwZSxcclxuICAgIFRpbWVwaWNrZXJEaXJlY3RpdmUsXHJcbiAgICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUb2dnbGVJY29uRGlyZWN0aXZlLFxyXG4gICAgTWludXRlc0Zvcm1hdHRlclBpcGUsXHJcbiAgICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZURpcmVjdGl2ZSxcclxuICAgIE5neFRpbWVwaWNrZXJGaWVsZENvbXBvbmVudCxcclxuICAgIE5neFRpbWVwaWNrZXJUaW1lQ29udHJvbENvbXBvbmVudCxcclxuICAgIE5neFRpbWVwaWNrZXJQZXJpb2RTZWxlY3RvckNvbXBvbmVudCxcclxuICAgIFRpbWVMb2NhbGl6ZXJQaXBlLFxyXG4gICAgVGltZVBhcnNlclBpcGUsXHJcbiAgICBBY3RpdmVIb3VyUGlwZSxcclxuICAgIEFjdGl2ZU1pbnV0ZVBpcGUsXHJcbiAgICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50XHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHsgcHJvdmlkZTogVElNRV9MT0NBTEUsIHVzZVZhbHVlOiBUaW1lQWRhcHRlci5ERUZBVUxUX0xPQ0FMRSB9XHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxUaW1lcGlja2VyTW9kdWxlIHtcclxuXHJcbiAgc3RhdGljIHNldExvY2FsZShsb2NhbGU6IHN0cmluZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IE5neE1hdGVyaWFsVGltZXBpY2tlck1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgeyBwcm92aWRlOiBUSU1FX0xPQ0FMRSwgdXNlVmFsdWU6IGxvY2FsZSB9XHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==