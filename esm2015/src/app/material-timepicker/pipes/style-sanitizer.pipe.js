import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export class StyleSanitizerPipe {
    constructor(domSanitizer) {
        this.domSanitizer = domSanitizer;
    }
    transform(value) {
        if (!value) {
            return value;
        }
        return this.domSanitizer.bypassSecurityTrustStyle(value);
    }
}
StyleSanitizerPipe.decorators = [
    { type: Pipe, args: [{
                name: 'styleSanitizer'
            },] }
];
StyleSanitizerPipe.ctorParameters = () => [
    { type: DomSanitizer }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUtc2FuaXRpemVyLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvcGlwZXMvc3R5bGUtc2FuaXRpemVyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLElBQUksRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBS3ZELE1BQU0sT0FBTyxrQkFBa0I7SUFFM0IsWUFBb0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7SUFDOUMsQ0FBQztJQUVELFNBQVMsQ0FBQyxLQUFhO1FBQ25CLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3RCxDQUFDOzs7WUFiSixJQUFJLFNBQUM7Z0JBQ0YsSUFBSSxFQUFFLGdCQUFnQjthQUN6Qjs7O1lBSk8sWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RG9tU2FuaXRpemVyfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuXHJcbkBQaXBlKHtcclxuICAgIG5hbWU6ICdzdHlsZVNhbml0aXplcidcclxufSlcclxuZXhwb3J0IGNsYXNzIFN0eWxlU2FuaXRpemVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZG9tU2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHtcclxuICAgIH1cclxuXHJcbiAgICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmRvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUodmFsdWUpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=