import { Component } from '@angular/core';
import { NotificationModel } from './notificationModel.interface';


@Component({
    selector: 'notification',
    template: '<p-growl [(value)]="msgs" [immutable]="false"></p-growl>'
})
export class NotificationComponent {
    private msgs: NotificationModel[] = [];

    constructor() {}


    private show(notification: NotificationModel) {
        this.msgs.push({severity: notification.severity, summary: notification.summary, detail: notification.detail});
    }

 
    public success(text: string) {
        let notification: NotificationModel = {
            severity:'success',
            summary:'Success',
            detail: text
        };

        this.show(notification);
    }

    public info(text: string) {
        let notification: NotificationModel = {
            severity:'info',
            summary:'Info',
            detail: text
        };

        this.show(notification);
    }

    public error(text: string) {
        let notification: NotificationModel = {
            severity:'error',
            summary:'Error',
            detail: text
        };

        this.show(notification);
    }


    public clear() {
        this.msgs = [];
    }

}