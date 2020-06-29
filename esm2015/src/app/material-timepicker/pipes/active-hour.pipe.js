import { Pipe } from '@angular/core';
export class ActiveHourPipe {
    transform(hour, currentHour, isClockFaceDisabled) {
        if (hour == null || isClockFaceDisabled) {
            return false;
        }
        return hour === currentHour;
    }
}
ActiveHourPipe.decorators = [
    { type: Pipe, args: [{
                name: 'activeHour'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLWhvdXIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9waXBlcy9hY3RpdmUtaG91ci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBS3BELE1BQU0sT0FBTyxjQUFjO0lBRXZCLFNBQVMsQ0FBQyxJQUFZLEVBQUUsV0FBbUIsRUFBRSxtQkFBNEI7UUFDckUsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLG1CQUFtQixFQUFFO1lBQ3JDLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsT0FBTyxJQUFJLEtBQUssV0FBVyxDQUFDO0lBQ2hDLENBQUM7OztZQVhKLElBQUksU0FBQztnQkFDRixJQUFJLEVBQUUsWUFBWTthQUNyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBQaXBlKHtcclxuICAgIG5hbWU6ICdhY3RpdmVIb3VyJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQWN0aXZlSG91clBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuXHJcbiAgICB0cmFuc2Zvcm0oaG91cjogbnVtYmVyLCBjdXJyZW50SG91cjogbnVtYmVyLCBpc0Nsb2NrRmFjZURpc2FibGVkOiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGhvdXIgPT0gbnVsbCB8fCBpc0Nsb2NrRmFjZURpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBob3VyID09PSBjdXJyZW50SG91cjtcclxuICAgIH1cclxuXHJcbn1cclxuIl19