import { Component, ViewChild } from '@angular/core';


@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    outputs: ['modalOutput']
})
export class ModalComponent {

    @ViewChild('loadingModal') public _loadingModal: ModalComponent;    //'_loadingModal' is the identifier #loadingModal in the template

    private display: boolean = true;

    constructor() {}
   
    private show(modal: ModalComponent) {
        modal.display = true;
    }

    private hide(modal: ModalComponent) {
        modal.display = false;
    }


    public showLoading() {
        this.show(this._loadingModal);
    }

    public hideLoading() {
        this.hide(this._loadingModal);
    }

}