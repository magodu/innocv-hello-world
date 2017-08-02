import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/Rx';


@Injectable()
export class ContactsListService {

    private getAllEndpoint: string = "http://hello-world.innocv.com/api/user/getall";

    constructor(private _http: Http, private _router: Router ) {}

    getContacts() {
        let data: any;

        return this._http.get(this.getAllEndpoint)
            .map((response: Response) =>  {
                data = response.json();

                return this.sortData(data);
            });
    }

    private sortData(data) {
        const numberRegExp = new RegExp(/^\d+$/);
        const alphanumericRegExp = new RegExp(/^[A-Za-z0-9ñÑ]$/);
        const imageName: string = 'unknown-photo.jpg';  // harcoded image name
        let letter: string;
        let sortedContacts = {
            'a': [],
            'b': [],
            'c': [],
            'd': [],
            'e': [],
            'f': [],
            'g': [],
            'h': [],
            'i': [],
            'j': [],
            'k': [],
            'l': [],
            'm': [],
            'n': [],
            'ñ': [],
            'o': [],
            'p': [],
            'q': [],
            'r': [],
            's': [],
            't': [],
            'u': [],
            'v': [],
            'w': [],
            'x': [],
            'y': [],
            'z': [],
            '#': [],
            '?': []
        };

        data.forEach(contact => {
            contact.imageUrl = imageName;
            if (contact.name === null || !alphanumericRegExp.test(contact.name.charAt(0))) {  // Error prevent: if name is null or special character, assign a default empty name to show and add it to numbers section.
                contact.name = contact.name === null ? '' : contact.name;
                sortedContacts['?'].push(contact);

            } else if (numberRegExp.test(contact.name.charAt(0))) {  // Numbers section for contact names starting with a number
                sortedContacts['#'].push(contact);

            } else {    // contacts sorted by starting letter
                letter = contact.name.charAt(0).toLowerCase();
                sortedContacts[letter].push(contact);
            }
        })

        return sortedContacts;
    }

}