import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { Subscription, Subject } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { CRUDContactService } from '../shared/crud-contact.service';
import { ConfirmationService } from 'primeng/primeng';
import { User } from '../shared/user.class';
import { ModalComponent } from '../modal/modal.component';
import { i18nService } from '../shared/i18n.service';
import { Literalsi18n } from '../shared/i18n.interface';



@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']

})
export class ContactComponent implements OnInit, OnDestroy {

    @ViewChild(ModalComponent) modal: ModalComponent;

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    private subscription: Subscription;
    private contactIndex: number;
    private mode: string = 'detail';
    private selectedLanguage: string = '';

    private i18nCalendar: any;
    private i18nLiterals: Literalsi18n;

    contactSelected: User;
    contactForm: FormGroup;
    isData: boolean = true;


    constructor(private _CRUDcontactService: CRUDContactService, private _router: Router, private _route: ActivatedRoute, private _formBuilder: FormBuilder, private _confirmationService: ConfirmationService, public i18n: i18nService) {
        this.subscription = this._route.params.subscribe(
            (params: Object) => {                
                this.contactIndex = parseInt(params['id'], 10);
            }
        );

        this.selectedLanguage = i18n.getselectedLanguage();
    }

    private initForm() {
        let name: string = '';
        let birthdate: Date;

        if (this.mode === 'edit') {
            name = this.contactSelected.name;
            birthdate = new Date(this.contactSelected.birthdate);
        }

        this.contactForm = this._formBuilder.group({
            'name': [name, Validators.required],
            'birthdate': [birthdate, Validators.required]
        });
    }

    public editContact() {
        this.mode = 'edit';
        this.initForm();
    }

    public cancelEditContact() {
        this.mode = 'detail';
    }

    public modifyContact() {
        let newContact = this.contactForm.value;

        this.modal.showLoading();
        
        this._CRUDcontactService.editContact(this.contactIndex, newContact).takeUntil(this.ngUnsubscribe).subscribe(
            data => {
                this.contactSelected = data;
                this.modal.hideLoading();
                this._CRUDcontactService.sendNotification({severity:'success', summary: '', detail: this.i18nLiterals.messages.success.contact_update});

            },       
            err => {
                console.error(err);
                this.modal.hideLoading();
                this._CRUDcontactService.sendNotification({severity:'error', summary: '', detail: this.i18nLiterals.messages.error.general_error});

            }
        );

        this.mode = 'detail';
    }

    public deleteContact() {

        this._confirmationService.confirm({
            message: this.i18nLiterals.modals.delete_confirmation.ask_delete,
            header:  this.i18nLiterals.modals.delete_confirmation.confirm_delete,
            icon: 'fa fa-trash',
            accept: () => {

                this.modal.showLoading();

                this._CRUDcontactService.deleteContact(this.contactIndex).takeUntil(this.ngUnsubscribe).subscribe(
                    data => {
                        this._CRUDcontactService.sendNotification({severity:'success', summary: '', detail: this.i18nLiterals.messages.success.contact_delete});
                        this.modal.hideLoading();
                        this._router.navigate(['/contacts-list']);
                    },       
                    err => {
                        console.error(err);
                        this.modal.hideLoading();
                        this._CRUDcontactService.sendNotification({severity:'error', summary: '', detail: this.i18nLiterals.messages.error.general_error});
                    }
                );
                
            },
            reject: () => {}
        });

    }

    ngOnInit() {
        this.modal.showLoading();

        this.i18n.getLiteral('component_literals').then(res => {
            this.initForm();
            this.i18nLiterals = res;
            this.i18nCalendar = res.calendar;
        });


        this._CRUDcontactService.getContact(this.contactIndex).takeUntil(this.ngUnsubscribe).subscribe(
            data => {
                this.contactSelected = data;
                this.isData = !_.isEmpty(this.contactSelected);
                this.modal.hideLoading();
            },       
            err => {
                console.error(err);
                this.modal.hideLoading();
                this._CRUDcontactService.sendNotification({severity:'error', summary: '', detail: this.i18nLiterals.messages.error.general_error});

            }
        );
    }


    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
