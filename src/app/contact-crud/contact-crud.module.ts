import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateStore } from "@ngx-translate/core/src/translate.store";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DialogModule, ConfirmDialogModule, DropdownModule, ConfirmationService } from 'primeng/primeng';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ContactCRUDRoutingModule, routedCRUDComponents } from './contact-crud.routing';
import { ContactsListService } from './contacts-list/contacts-list.service';
import { CRUDContactService } from './shared/crud-contact.service';
import { i18nService } from './shared/i18n.service';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
    imports: [ 
        ContactCRUDRoutingModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpModule,
        NoopAnimationsModule,
        CalendarModule,
        DialogModule,
        ConfirmDialogModule,
        DropdownModule
    ],
    declarations: [ routedCRUDComponents ],
    providers: [ TranslateStore, ConfirmationService, ContactsListService, CRUDContactService, i18nService ]

})
export class ContactCRUDModule { } 