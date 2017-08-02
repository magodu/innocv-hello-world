import {Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterByText',
    pure: false
})

export class FilterByTextPipe implements PipeTransform {

    transform(items: any[], args?: any): any {
        if (items.length === 0 ) {
            return items;
        } 

        return items.filter(item => { 
            return item.name.toLowerCase().indexOf(args.toLowerCase()) !== -1;
        });

    }
}