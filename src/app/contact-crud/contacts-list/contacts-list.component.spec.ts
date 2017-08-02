/* tslint:disable:no-unused-variable */

import {
    HttpModule,
    Http,
    Response,
    ResponseOptions,
    BaseRequestOptions,
    XHRBackend,
    RequestMethod
} from '@angular/http';

import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async, fakeAsync, tick, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockBackend, MockConnection } from '@angular/http/testing';


import { Observable } from "rxjs/Observable";

import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateStore } from "@ngx-translate/core/src/translate.store";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DialogModule, ConfirmDialogModule, DropdownModule, ConfirmationService } from 'primeng/primeng';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder } from '@angular/forms';

import { ContactCRUDRoutingModule, routedCRUDComponents } from '../contact-crud.routing';
import { ContactsListService } from './contacts-list.service';
import { CRUDContactService } from '../shared/crud-contact.service';
import { i18nService } from '../shared/i18n.service';

import { NotificationSharedModule } from '../../notification/notification.module';
import { ContactCRUDModule } from '../../contact-crud/contact-crud.module';
import { routing } from '../../app.routing';
import { AppComponent } from '../../app.component';
import { MainComponent } from '../../main.component';
import { ContactsListComponent } from './contacts-list.component';
import { ContactComponent } from '../contact/contact.component';
import { NewContactComponent } from '../new-contact/new-contact.component';
import { ModalComponent } from '../modal/modal.component';
import { ScrollDirective } from './scroll.directive';
import { KeysPipe } from  '../shared/keys.pipe';
import { FilterByTextPipe } from '../shared/filterByText.pipe';
import { User } from '../shared/user.class';




describe('Component: ContactsListComponent', () => {

    let component: ContactsListComponent;
    let fixture: ComponentFixture < ContactsListComponent > ;
    let contactsListService: ContactsListService;
    let crudContactService: CRUDContactService;
    let i18nService: i18nService;
    let formBuilder: FormBuilder;


    beforeEach(() => {

        // define the test module by declaring the test component
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                NotificationSharedModule,
                routing,
                ContactCRUDRoutingModule,
                FormsModule,
                ReactiveFormsModule,
                HttpClientModule,
                HttpModule,
                NoopAnimationsModule,
                CalendarModule,
                DialogModule,
                ConfirmDialogModule,
                DropdownModule,
                TranslateModule.forChild({})
            ],
            declarations: [
                AppComponent,
                MainComponent,
                ContactsListComponent,
                NewContactComponent,
                ContactComponent,
                ModalComponent,
                ScrollDirective,
                KeysPipe,
                FilterByTextPipe
            ],
            providers: [ {provide: APP_BASE_HREF, useValue : '/' }, ConfirmationService, ContactsListService, CRUDContactService, i18nService, FormBuilder ]
        });


        fixture = TestBed.createComponent(ContactsListComponent);

        component = fixture.componentInstance;

        contactsListService = TestBed.get(ContactsListService);
        crudContactService = TestBed.get(CRUDContactService);
        i18nService = TestBed.get(i18nService);
        formBuilder = TestBed.get(formBuilder);

    });


    it('should create component ContactsListComponent', () => {
        let app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
  
   

    xit('should retrieve data from HTTP request', done => {

        let app = fixture.debugElement.componentInstance;
        let contactsListService = fixture.debugElement.injector.get(ContactsListService);
        let crudContactService = fixture.debugElement.injector.get(CRUDContactService);
        

       

        fixture.detectChanges();

       
            console.log('Retrieve data from HTTP request');

            contactsListService.getContacts().subscribe((contacts) => {
                expect(app.contactsList).toBeDefined();
                done();
         
            });


        
    });
});
