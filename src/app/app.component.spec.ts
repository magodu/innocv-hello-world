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
import { CalendarModule, DialogModule, ConfirmDialogModule, DropdownModule, GrowlModule, ConfirmationService } from 'primeng/primeng';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder } from '@angular/forms';

import { ContactCRUDRoutingModule, routedCRUDComponents } from './contact-crud/contact-crud.routing';
import { ContactsListService } from './contact-crud/contacts-list/contacts-list.service';
import { CRUDContactService } from './contact-crud/shared/crud-contact.service';
import { i18nService } from './contact-crud/shared/i18n.service';

import { NotificationSharedModule } from './notification/notification.module';
import { ContactCRUDModule } from './contact-crud/contact-crud.module';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { MainComponent } from './main.component';
import { ContactsListComponent } from './contact-crud/contacts-list/contacts-list.component';
import { ContactComponent } from './contact-crud/contact/contact.component';
import { NewContactComponent } from './contact-crud/new-contact/new-contact.component';
import { ModalComponent } from './contact-crud/modal/modal.component';
import { ScrollDirective } from './contact-crud/contacts-list/scroll.directive';
import { KeysPipe } from  './contact-crud/shared/keys.pipe';
import { FilterByTextPipe } from './contact-crud/shared/filterByText.pipe';
import { User } from './contact-crud/shared/user.class';




describe('Component: AppComponent', () => {

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
                GrowlModule,
                TranslateModule
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
            providers: [ {provide: APP_BASE_HREF, useValue : '/' }, ConfirmationService, ContactsListService, CRUDContactService, i18nService, FormBuilder, TranslateStore ]
        });


        TestBed.compileComponents();


    });


    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

});

