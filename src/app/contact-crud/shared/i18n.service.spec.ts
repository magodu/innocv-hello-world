import {
   async, inject, TestBed
} from '@angular/core/testing';

import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

import {
  HttpModule, Http, XHRBackend, Response, ResponseOptions
} from '@angular/http';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';


import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateStore } from "@ngx-translate/core/src/translate.store";
import { i18nService } from './i18n.service';
//import { i18nService as i18nServ } from './i18n.service';




describe('i18n service (mockBackend)', () => {

    beforeEach( async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                TranslateModule.forRoot()
            ],
            providers: [
                i18nService,
               
                TranslateStore,
               
                { provide: XHRBackend, useClass: MockBackend }
            ]
        })
        .compileComponents();
    }));

    it('can instantiate service when inject service',
        inject([i18nService], (service: i18nService) => {
        expect(service instanceof i18nService).toBe(true);
    }));



});
