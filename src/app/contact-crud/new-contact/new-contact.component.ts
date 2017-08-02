import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { i18nService } from '../shared/i18n.service';
import { Literalsi18n } from '../shared/i18n.interface';
import { CRUDContactService } from '../shared/crud-contact.service';
import { ModalComponent } from '../modal/modal.component';


@Component({
    selector: 'contact',
    templateUrl: './new-contact.component.html',
    styleUrls: ['./new-contact.component.scss']

})
export class NewContactComponent implements OnInit, OnDestroy {

    @ViewChild(ModalComponent) modal: ModalComponent;

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    private selectedLanguage: string = '';
    private i18nCalendar: any;
    private i18nLiterals: Literalsi18n;
    contactForm: FormGroup;


    constructor(private _CRUDcontactService: CRUDContactService, private _router: Router, private _formBuilder: FormBuilder, public i18n: i18nService) {
        this.selectedLanguage = i18n.getselectedLanguage();
    }


    public addNewContact() {
        let newContact = this.contactForm.value;

        this.modal.showLoading();

        this._CRUDcontactService.createContact(newContact).takeUntil(this.ngUnsubscribe).subscribe(
            data => {
                this._CRUDcontactService.sendNotification({severity:'success', summary: '', detail: this.i18nLiterals.messages.success.contact_creation});
                this.modal.hideLoading();
                this._router.navigate(['/contacts-list']);
            },       
            err => {
                this.modal.hideLoading();
                this._CRUDcontactService.sendNotification({severity:'error', summary: '', detail: this.i18nLiterals.messages.error.creation_error});
                console.error(err);
            }
        );
    }

    public cancelNewContact() {
        this._router.navigate(['/contacts-list']);
    }

    private initForm() {
        let name: string = '';
        let birthdate: Date;

        this.contactForm = this._formBuilder.group({
            'name': [name, Validators.required],
            'birthdate': [birthdate, Validators.required]
        });
    }

    ngOnInit() {
        this.i18n.getLiteral('component_literals').then(res => {
            this.initForm();
            this.i18nLiterals = res;
            this.i18nCalendar = res.calendar;
        });
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
