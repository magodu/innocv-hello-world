import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { MainComponent } from './main.component';
import { NotificationSharedModule } from './notification/notification.module';
import { ContactCRUDModule } from './contact-crud/contact-crud.module';


@NgModule({
    declarations: [
        AppComponent,
        MainComponent
    ],
    imports: [
        BrowserModule,
        NotificationSharedModule,
        ContactCRUDModule,
        routing
    ],
    providers: 
        [ {provide: APP_BASE_HREF, useValue : '/' }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }