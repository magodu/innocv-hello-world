import { Component } from '@angular/core';


@Component({
    selector: 'app-main',
    template: `
        <div><h1>HOME VIEW</h1></div>
        <div><a [routerLink]="['/contacts-list']">Go to Contacts list</a></div>
    `
})
export class MainComponent {

    constructor() { }

}