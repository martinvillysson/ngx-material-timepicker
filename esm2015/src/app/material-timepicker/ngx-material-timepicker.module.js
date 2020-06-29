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
const ɵ0 = TimeAdapter.DEFAULT_LOCALE;
export class NgxMaterialTimepickerModule {
    static setLocale(locale) {
        return {
            ngModule: NgxMaterialTimepickerModule,
            providers: [
                { provide: TIME_LOCALE, useValue: locale }
            ]
        };
    }
}
NgxMaterialTimepickerModule.decorators = [
    { type: NgModule, args: [{
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
            },] }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL25neC1tYXRlcmlhbC10aW1lcGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDckYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxvQ0FBb0MsRUFBRSxNQUFNLGdGQUFnRixDQUFDO0FBQ3RJLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzVFLE9BQU8sRUFBRSx3Q0FBd0MsRUFBRSxNQUFNLDREQUE0RCxDQUFDO0FBQ3RILE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQzNHLE9BQU8sRUFDTCx5Q0FBeUMsRUFDMUMsTUFBTSx1RkFBdUYsQ0FBQztBQUMvRixPQUFPLEVBQ0wseUNBQXlDLEVBQzFDLE1BQU0sdUZBQXVGLENBQUM7QUFDL0YsT0FBTyxFQUNMLHlDQUF5QyxFQUMxQyxNQUFNLHFGQUFxRixDQUFDO0FBQzdGLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLHFFQUFxRSxDQUFDO0FBQ3pILE9BQU8sRUFBRSxvQ0FBb0MsRUFBRSxNQUFNLHlFQUF5RSxDQUFDO0FBQy9ILE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLHFFQUFxRSxDQUFDO0FBQ3pILE9BQU8sRUFDTCx5Q0FBeUMsRUFDMUMsTUFBTSxxRkFBcUYsQ0FBQztBQUM3RixPQUFPLEVBQUUsb0NBQW9DLEVBQUUsTUFBTSx5RUFBeUUsQ0FBQztBQUMvSCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw4REFBOEQsQ0FBQztBQUMzRyxPQUFPLEVBQ0wsaUNBQWlDLEVBQ2xDLE1BQU0sNkZBQTZGLENBQUM7QUFDckcsT0FBTyxFQUNMLG9DQUFvQyxFQUNyQyxNQUFNLG1HQUFtRyxDQUFDO0FBQzNHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQ0wscUNBQXFDLEVBQ3RDLE1BQU0sd0ZBQXdGLENBQUM7QUFDaEcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztXQTZDaEMsV0FBVyxDQUFDLGNBQWM7QUFJaEUsTUFBTSxPQUFPLDJCQUEyQjtJQUV0QyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQWM7UUFDN0IsT0FBTztZQUNMLFFBQVEsRUFBRSwyQkFBMkI7WUFDckMsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFO2FBQzNDO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQXhERixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxZQUFZO29CQUNaLGFBQWE7aUJBQ2Q7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLDhCQUE4QjtvQkFDOUIsb0NBQW9DO29CQUNwQywyQkFBMkI7b0JBQzNCLG1CQUFtQjtvQkFDbkIsd0NBQXdDO29CQUN4QyxtQ0FBbUM7aUJBQ3BDO2dCQUNELFlBQVksRUFBRTtvQkFDWixrQkFBa0I7b0JBQ2xCLDhCQUE4QjtvQkFDOUIseUNBQXlDO29CQUN6Qyx5Q0FBeUM7b0JBQ3pDLHlDQUF5QztvQkFDekMsa0NBQWtDO29CQUNsQyxvQ0FBb0M7b0JBQ3BDLG9DQUFvQztvQkFDcEMsa0NBQWtDO29CQUNsQyx5Q0FBeUM7b0JBQ3pDLG9DQUFvQztvQkFDcEMsa0JBQWtCO29CQUNsQixpQkFBaUI7b0JBQ2pCLG1CQUFtQjtvQkFDbkIsd0NBQXdDO29CQUN4QyxvQkFBb0I7b0JBQ3BCLG1DQUFtQztvQkFDbkMsMkJBQTJCO29CQUMzQixpQ0FBaUM7b0JBQ2pDLG9DQUFvQztvQkFDcEMsaUJBQWlCO29CQUNqQixjQUFjO29CQUNkLGNBQWM7b0JBQ2QsZ0JBQWdCO29CQUNoQixxQ0FBcUM7aUJBQ3RDO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxJQUE0QixFQUFFO2lCQUMvRDtnQkFDRCxlQUFlLEVBQUUsQ0FBQyxxQ0FBcUMsQ0FBQzthQUN6RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE5neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE5neE1hdGVyaWFsVGltZXBpY2tlclRvZ2dsZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90aW1lcGlja2VyLXRvZ2dsZS1idXR0b24vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItdG9nZ2xlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRpbWVwaWNrZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmd4LXRpbWVwaWNrZXIuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTmd4TWF0ZXJpYWxUaW1lcGlja2VyVG9nZ2xlSWNvbkRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci10b2dnbGUtaWNvbi5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci10aGVtZS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQge1xyXG4gIE5neE1hdGVyaWFsVGltZXBpY2tlcjI0SG91cnNGYWNlQ29tcG9uZW50XHJcbn0gZnJvbSAnLi9jb21wb25lbnRzL3RpbWVwaWNrZXItMjQtaG91cnMtZmFjZS9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci0yNC1ob3Vycy1mYWNlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7XHJcbiAgTmd4TWF0ZXJpYWxUaW1lcGlja2VyMTJIb3Vyc0ZhY2VDb21wb25lbnRcclxufSBmcm9tICcuL2NvbXBvbmVudHMvdGltZXBpY2tlci0xMi1ob3Vycy1mYWNlL25neC1tYXRlcmlhbC10aW1lcGlja2VyLTEyLWhvdXJzLWZhY2UuY29tcG9uZW50JztcclxuaW1wb3J0IHtcclxuICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJNaW51dGVzRmFjZUNvbXBvbmVudFxyXG59IGZyb20gJy4vY29tcG9uZW50cy90aW1lcGlja2VyLW1pbnV0ZXMtZmFjZS9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1taW51dGVzLWZhY2UuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmd4TWF0ZXJpYWxUaW1lcGlja2VyRmFjZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90aW1lcGlja2VyLWZhY2Uvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZmFjZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdGltZXBpY2tlci1idXR0b24vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItYnV0dG9uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5neE1hdGVyaWFsVGltZXBpY2tlckRpYWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdGltZXBpY2tlci1kaWFsL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWRpYWwuY29tcG9uZW50JztcclxuaW1wb3J0IHtcclxuICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJEaWFsQ29udHJvbENvbXBvbmVudFxyXG59IGZyb20gJy4vY29tcG9uZW50cy90aW1lcGlja2VyLWRpYWwtY29udHJvbC9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1kaWFsLWNvbnRyb2wuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmd4TWF0ZXJpYWxUaW1lcGlja2VyUGVyaW9kQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RpbWVwaWNrZXItcGVyaW9kL25neC1tYXRlcmlhbC10aW1lcGlja2VyLXBlcmlvZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdHlsZVNhbml0aXplclBpcGUgfSBmcm9tICcuL3BpcGVzL3N0eWxlLXNhbml0aXplci5waXBlJztcclxuaW1wb3J0IHsgVGltZUZvcm1hdHRlclBpcGUgfSBmcm9tICcuL3BpcGVzL3RpbWUtZm9ybWF0dGVyLnBpcGUnO1xyXG5pbXBvcnQgeyBNaW51dGVzRm9ybWF0dGVyUGlwZSB9IGZyb20gJy4vcGlwZXMvbWludXRlcy1mb3JtYXR0ZXIucGlwZSc7XHJcbmltcG9ydCB7IE5neFRpbWVwaWNrZXJGaWVsZENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90aW1lcGlja2VyLWZpZWxkL25neC10aW1lcGlja2VyLWZpZWxkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7XHJcbiAgTmd4VGltZXBpY2tlclRpbWVDb250cm9sQ29tcG9uZW50XHJcbn0gZnJvbSAnLi9jb21wb25lbnRzL3RpbWVwaWNrZXItZmllbGQvdGltZXBpY2tlci10aW1lLWNvbnRyb2wvbmd4LXRpbWVwaWNrZXItdGltZS1jb250cm9sLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7XHJcbiAgTmd4VGltZXBpY2tlclBlcmlvZFNlbGVjdG9yQ29tcG9uZW50XHJcbn0gZnJvbSAnLi9jb21wb25lbnRzL3RpbWVwaWNrZXItZmllbGQvdGltZXBpY2tlci1wZXJpb2Qtc2VsZWN0b3Ivbmd4LXRpbWVwaWNrZXItcGVyaW9kLXNlbGVjdG9yLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRpbWVMb2NhbGl6ZXJQaXBlIH0gZnJvbSAnLi9waXBlcy90aW1lLWxvY2FsaXplci5waXBlJztcclxuaW1wb3J0IHsgVElNRV9MT0NBTEUgfSBmcm9tICcuL3Rva2Vucy90aW1lLWxvY2FsZS50b2tlbic7XHJcbmltcG9ydCB7IFRpbWVBZGFwdGVyIH0gZnJvbSAnLi9zZXJ2aWNlcy90aW1lLWFkYXB0ZXInO1xyXG5pbXBvcnQgeyBUaW1lUGFyc2VyUGlwZSB9IGZyb20gJy4vcGlwZXMvdGltZS1wYXJzZXIucGlwZSc7XHJcbmltcG9ydCB7IEFjdGl2ZUhvdXJQaXBlIH0gZnJvbSAnLi9waXBlcy9hY3RpdmUtaG91ci5waXBlJztcclxuaW1wb3J0IHsgQWN0aXZlTWludXRlUGlwZSB9IGZyb20gJy4vcGlwZXMvYWN0aXZlLW1pbnV0ZS5waXBlJztcclxuaW1wb3J0IHtcclxuICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50XHJcbn0gZnJvbSAnLi9jb21wb25lbnRzL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWNvbnRlbnQvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItY29udGVudC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQb3J0YWxNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcclxuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcclxuaW1wb3J0IHsgQXV0b2ZvY3VzRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2F1dG9mb2N1cy5kaXJlY3RpdmUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIFBvcnRhbE1vZHVsZSxcclxuICAgIE92ZXJsYXlNb2R1bGVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIE5neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudCxcclxuICAgIE5neE1hdGVyaWFsVGltZXBpY2tlclRvZ2dsZUNvbXBvbmVudCxcclxuICAgIE5neFRpbWVwaWNrZXJGaWVsZENvbXBvbmVudCxcclxuICAgIFRpbWVwaWNrZXJEaXJlY3RpdmUsXHJcbiAgICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUb2dnbGVJY29uRGlyZWN0aXZlLFxyXG4gICAgTmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWVEaXJlY3RpdmVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgQXV0b2ZvY3VzRGlyZWN0aXZlLFxyXG4gICAgTmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29tcG9uZW50LFxyXG4gICAgTmd4TWF0ZXJpYWxUaW1lcGlja2VyMjRIb3Vyc0ZhY2VDb21wb25lbnQsXHJcbiAgICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXIxMkhvdXJzRmFjZUNvbXBvbmVudCxcclxuICAgIE5neE1hdGVyaWFsVGltZXBpY2tlck1pbnV0ZXNGYWNlQ29tcG9uZW50LFxyXG4gICAgTmd4TWF0ZXJpYWxUaW1lcGlja2VyRmFjZUNvbXBvbmVudCxcclxuICAgIE5neE1hdGVyaWFsVGltZXBpY2tlclRvZ2dsZUNvbXBvbmVudCxcclxuICAgIE5neE1hdGVyaWFsVGltZXBpY2tlckJ1dHRvbkNvbXBvbmVudCxcclxuICAgIE5neE1hdGVyaWFsVGltZXBpY2tlckRpYWxDb21wb25lbnQsXHJcbiAgICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJEaWFsQ29udHJvbENvbXBvbmVudCxcclxuICAgIE5neE1hdGVyaWFsVGltZXBpY2tlclBlcmlvZENvbXBvbmVudCxcclxuICAgIFN0eWxlU2FuaXRpemVyUGlwZSxcclxuICAgIFRpbWVGb3JtYXR0ZXJQaXBlLFxyXG4gICAgVGltZXBpY2tlckRpcmVjdGl2ZSxcclxuICAgIE5neE1hdGVyaWFsVGltZXBpY2tlclRvZ2dsZUljb25EaXJlY3RpdmUsXHJcbiAgICBNaW51dGVzRm9ybWF0dGVyUGlwZSxcclxuICAgIE5neE1hdGVyaWFsVGltZXBpY2tlclRoZW1lRGlyZWN0aXZlLFxyXG4gICAgTmd4VGltZXBpY2tlckZpZWxkQ29tcG9uZW50LFxyXG4gICAgTmd4VGltZXBpY2tlclRpbWVDb250cm9sQ29tcG9uZW50LFxyXG4gICAgTmd4VGltZXBpY2tlclBlcmlvZFNlbGVjdG9yQ29tcG9uZW50LFxyXG4gICAgVGltZUxvY2FsaXplclBpcGUsXHJcbiAgICBUaW1lUGFyc2VyUGlwZSxcclxuICAgIEFjdGl2ZUhvdXJQaXBlLFxyXG4gICAgQWN0aXZlTWludXRlUGlwZSxcclxuICAgIE5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnRcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgeyBwcm92aWRlOiBUSU1FX0xPQ0FMRSwgdXNlVmFsdWU6IFRpbWVBZGFwdGVyLkRFRkFVTFRfTE9DQUxFIH1cclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW05neE1hdGVyaWFsVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJNb2R1bGUge1xyXG5cclxuICBzdGF0aWMgc2V0TG9jYWxlKGxvY2FsZTogc3RyaW5nKTogTW9kdWxlV2l0aFByb3ZpZGVyczxOZ3hNYXRlcmlhbFRpbWVwaWNrZXJNb2R1bGU+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIHsgcHJvdmlkZTogVElNRV9MT0NBTEUsIHVzZVZhbHVlOiBsb2NhbGUgfVxyXG4gICAgICBdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=