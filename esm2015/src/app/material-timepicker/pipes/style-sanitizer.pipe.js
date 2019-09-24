import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
let StyleSanitizerPipe = class StyleSanitizerPipe {
    constructor(domSanitizer) {
        this.domSanitizer = domSanitizer;
    }
    transform(value) {
        if (!value) {
            return value;
        }
        return this.domSanitizer.bypassSecurityTrustStyle(value);
    }
};
StyleSanitizerPipe = tslib_1.__decorate([
    Pipe({
        name: 'styleSanitizer'
    }),
    tslib_1.__metadata("design:paramtypes", [DomSanitizer])
], StyleSanitizerPipe);
export { StyleSanitizerPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUtc2FuaXRpemVyLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9waXBlcy9zdHlsZS1zYW5pdGl6ZXIucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLElBQUksRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBS3ZELElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBRTNCLFlBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBQzlDLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBYTtRQUNuQixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0QsQ0FBQztDQUVKLENBQUE7QUFaWSxrQkFBa0I7SUFIOUIsSUFBSSxDQUFDO1FBQ0YsSUFBSSxFQUFFLGdCQUFnQjtLQUN6QixDQUFDOzZDQUdvQyxZQUFZO0dBRnJDLGtCQUFrQixDQVk5QjtTQVpZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RG9tU2FuaXRpemVyfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuXHJcbkBQaXBlKHtcclxuICAgIG5hbWU6ICdzdHlsZVNhbml0aXplcidcclxufSlcclxuZXhwb3J0IGNsYXNzIFN0eWxlU2FuaXRpemVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZG9tU2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHtcclxuICAgIH1cclxuXHJcbiAgICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmRvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUodmFsdWUpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=