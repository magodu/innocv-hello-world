import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from "rxjs/Rx";

import { NotificationComponent } from './notification/notification.component';
import { NotificationModel } from './notification/notificationModel.interface';
import { CRUDContactService } from "./contact-crud/shared/crud-contact.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    @ViewChild(NotificationComponent) notification: NotificationComponent;
    eventNotification: Subscription;

    constructor(private _CRUDContactService: CRUDContactService) { }

    ngOnInit() {
        let method: string;

        this.eventNotification = this._CRUDContactService.notificationEv$.subscribe(
            (notification: NotificationModel) => {
                if (notification.detail !== '') {
                    method = notification.severity || 'error';
                    this.notification[method](notification.detail); 
                }
            }
        );
    }
}