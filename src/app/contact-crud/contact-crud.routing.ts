import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactComponent } from './contact/contact.component';
import { NewContactComponent } from './new-contact/new-contact.component';
import { ModalComponent } from './modal/modal.component';
import { ScrollDirective } from './contacts-list/scroll.directive';
import { KeysPipe } from  './shared/keys.pipe';
import { FilterByTextPipe } from './shared/filterByText.pipe';


const CONTACT_CRUD_ROUTES: Routes = [
    { path: 'contacts-list', component: ContactsListComponent },
    { path: 'new', component: NewContactComponent },
    { path: 'detail/:id', component: ContactComponent }
];


@NgModule({
  imports: [ RouterModule.forChild(CONTACT_CRUD_ROUTES) ],
  exports: [ RouterModule ]
})
export class ContactCRUDRoutingModule { }

export const routedCRUDComponents = [ContactsListComponent, NewContactComponent, ContactComponent, ModalComponent, ScrollDirective, KeysPipe, FilterByTextPipe]; 