import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { NotificationModel } from '../../notification/notificationModel.interface';

@Injectable()
export class CRUDContactService {

    notificationEvent = new BehaviorSubject<NotificationModel>({severity:'', summary: '', detail: ''});
    notificationEv$ = this.notificationEvent.asObservable();

    private getContactDetailEndpoint: string = 'http://hello-world.innocv.com/api/user/get/ID';
    private updateContactEndpoint: string = 'http://hello-world.innocv.com/api/user/update';
    private createContactEndpoint: string = 'http://hello-world.innocv.com/api/user/create';
    private removeContactEndpoint: string = 'http://hello-world.innocv.com/api/user/remove/ID';


    constructor(private _http: Http) {}

    getContact(id: number) {
        return this._http.get(this.getContactDetailEndpoint.replace(/ID/, id.toString()))
            .map((response: Response) => response.json());

    }

    editContact(id: number, data: any) {
        let newContact = {
            id: id,
            name: data.name,
            birthdate: data.birthdate
        };

        return this._http.post(this.updateContactEndpoint, newContact)
            .map((response: Response) => response.json());
    }

    createContact(data: any) {
        let newContact = {
            name: data.name,
            birthdate: data.birthdate
        };

        return this._http.post(this.createContactEndpoint, newContact)
            .map((response: Response) => response.json());
    }

    deleteContact(id: number) {
        return this._http.get(this.removeContactEndpoint.replace(/ID/, id.toString())).map(() => null);

    }

    /* This function communicates two sibling components and send a notification */
    sendNotification(data: NotificationModel) {
        this.notificationEvent.next(data);
    }

}