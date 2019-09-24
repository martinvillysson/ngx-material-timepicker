import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
var StyleSanitizerPipe = /** @class */ (function () {
    function StyleSanitizerPipe(domSanitizer) {
        this.domSanitizer = domSanitizer;
    }
    StyleSanitizerPipe.prototype.transform = function (value) {
        if (!value) {
            return value;
        }
        return this.domSanitizer.bypassSecurityTrustStyle(value);
    };
    StyleSanitizerPipe = tslib_1.__decorate([
        Pipe({
            name: 'styleSanitizer'
        }),
        tslib_1.__metadata("design:paramtypes", [DomSanitizer])
    ], StyleSanitizerPipe);
    return StyleSanitizerPipe;
}());
export { StyleSanitizerPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUtc2FuaXRpemVyLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9waXBlcy9zdHlsZS1zYW5pdGl6ZXIucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLElBQUksRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBS3ZEO0lBRUksNEJBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBQzlDLENBQUM7SUFFRCxzQ0FBUyxHQUFULFVBQVUsS0FBYTtRQUNuQixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQVZRLGtCQUFrQjtRQUg5QixJQUFJLENBQUM7WUFDRixJQUFJLEVBQUUsZ0JBQWdCO1NBQ3pCLENBQUM7aURBR29DLFlBQVk7T0FGckMsa0JBQWtCLENBWTlCO0lBQUQseUJBQUM7Q0FBQSxBQVpELElBWUM7U0FaWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0RvbVNhbml0aXplcn0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAnc3R5bGVTYW5pdGl6ZXInXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdHlsZVNhbml0aXplclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRvbVNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNmb3JtKHZhbHVlOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5kb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKHZhbHVlKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19