import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Literalsi18n } from './i18n.interface';


@Injectable()
export class i18nService {

    private selectedLanguage: string;
    private browserLanguage: string;
    private componentLiteralsCache: Literalsi18n;
    private languageList = [
        {value: 'en', label: 'English' },
        {value: 'es', label: 'Spanish' }
    ];


    constructor(public translate: TranslateService) {
        translate.addLangs(['en', 'es']);
        this.browserLanguage = translate.getBrowserLang();
        this.selectedLanguage = translate.getBrowserLang();
        translate.use(this.browserLanguage.match(/en|es/) ? this.browserLanguage : 'en');
        this.getComponentLiterals();
    }

    private setLanguageList() {
        let languageList = this.componentLiteralsCache.language_list;
        this.languageList.forEach(language => {
            language.label = languageList[language.value];
        })
    }

    getComponentLiterals() {
        this.getLiteral('component_literals').then(response => {
            this.componentLiteralsCache = response;
            this.setLanguageList();
        });
    }

    setLanguage(lang: string) {
        this.selectedLanguage = lang;
        this.translate.use(lang);
        this.getComponentLiterals();
    }

    getselectedLanguage() {
        return this.selectedLanguage;
    }

    setDefaultLang(lang: string) {
        this.translate.setDefaultLang(lang);
    }

    getLanguageList() {
        return this.languageList;
    }

    getLiteral(code: string): Promise<any> {
        
        return new Promise<Object>((resolve, reject) => {
            this.translate.get(code).subscribe((response: Object) => {
                resolve(response);
            });
        });
    }

    getcomponentLiteralsCache() {
        if (!this.componentLiteralsCache) {
            this.getComponentLiterals();
        }

        return this.componentLiteralsCache;
    }

    getCalendarDefaulti18n() {
        return this.getLiteral('calendar');
    }

}