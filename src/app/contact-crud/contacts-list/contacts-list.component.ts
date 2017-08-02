import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription, Subject } from 'rxjs/Rx';
import * as _ from 'lodash';

import { ModalComponent } from '../modal/modal.component';
import { ContactsListService } from './contacts-list.service';
import { CRUDContactService } from '../shared/crud-contact.service';
import { i18nService } from '../shared/i18n.service';

import { ScrollDirective } from './scroll.directive';

import { KeysPipe } from  '../shared/keys.pipe';
import { FilterByTextPipe } from '../shared/filterByText.pipe';
import { User } from '../shared/user.class';



class Language {
    constructor(public value: string, public label: string) { }
}


@Component({
    selector: 'contacts-list',
    templateUrl: './contacts-list.component.html',
    styleUrls: ['./contacts-list.component.scss']

})
export class ContactsListComponent implements OnInit, OnDestroy {

    @ViewChild(ModalComponent) modal: ModalComponent;

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    private selectedLanguage: string = this.i18n.getselectedLanguage();
    private searchFilter: string = '';
    private activeLetter: string = 'a';
    private i18nLiterals: any;
    
    languages: Language[];
    langForm: FormGroup;

    contactsList: Object = {};
    isData: boolean = true;

    constructor(private _contactsListService: ContactsListService, private _CRUDContactService: CRUDContactService, public i18n: i18nService, private _formBuilder: FormBuilder) {
        this.selectedLanguage = i18n.getselectedLanguage();
        this.i18nLiterals = i18n.getcomponentLiteralsCache();
    }

    public setActiveLetter(event) {
        this.activeLetter = event;
    }

    private getData() {
        this.modal.showLoading();
        this._contactsListService.getContacts().takeUntil(this.ngUnsubscribe).subscribe(
            data => {
                this.contactsList = data;
                this.isData = !_.isEmpty(this.contactsList);
                this.modal.hideLoading();
            },       
            err => {
                console.error(err);
                this.modal.hideLoading();
                this._CRUDContactService.sendNotification({severity:'error', summary: '', detail: this.i18nLiterals.messages.error.general_error});
            },                  
            () => console.log('loading data: done')
        );
    }
    
    public onLanguageSelected(lang) {
        if (this.i18n.getselectedLanguage() !== lang) {
            this.i18n.setLanguage(lang);
            this.selectedLanguage = lang;
        }
    }

    private initLangForm() {
        let language: string = this.selectedLanguage;
        this.languages = this.i18n.getLanguageList();

        this.langForm = this._formBuilder.group({
            'language': [language]
        });
    }

    ngOnInit() {
        this.initLangForm();
        this.getData();
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}


