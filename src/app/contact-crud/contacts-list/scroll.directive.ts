import { Directive, Input, Output, EventEmitter, Inject } from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

export declare type TargetElement = HTMLElement | string;

@Directive({
    selector: '[scroll]',
    host: {
        '(click)': 'handleClick($event)',
    }
})
export class ScrollDirective {

    @Input() private href: string;
    @Input() disabled: boolean;
    @Output() public pageScrollFinish: EventEmitter<string> = new EventEmitter<string>();

    private document: Document;
    private body: HTMLBodyElement;
    private speed: number = 1 / 1000;
    private scroll: number;
    private isAnimationblocked: boolean = false;


    constructor(@Inject(DOCUMENT) document: Document) {
        this.document = document;
        this.body = <HTMLBodyElement>document.body;
    }

    handleClick(clickEvent: Event): boolean {
        if (this.disabled) {
            return;
        }

        this.scrollAndEmitEvent();
    }

    scrollToElement(targetElementOrId: TargetElement) {
        let anchorTarget: HTMLElement = this.determineElement(targetElementOrId);
        let previousSiblingsHeight: number;

        if (this.isAnimationblocked) {
            return;
        }

        if (anchorTarget !== null) {

            let menu = document.querySelector('#contacts-wrapper');
            this.isAnimationblocked = true;          
            this.getTotalHeight();
            previousSiblingsHeight = this.getpreviousSiblingsHeight(anchorTarget, targetElementOrId);
            this.setScrollTop(menu, previousSiblingsHeight);
        }
    } 

    private scrollAndEmitEvent() {
        this.scrollToElement(this.href);
        this.pageScrollFinish.emit(this.href.replace(/#/, ''));
    }

    private setScrollTop(container: any, previousSiblingsHeight: number) {
        let xTo: number;

        this.scroll = container.scrollTop;

        if (container && typeof container.scrollTop !== 'undefined') {
            xTo = previousSiblingsHeight;

           this.scrollToX(container, this.scroll, xTo, 0, this.speed, 20, this.easeOutQuad);
        }
    }

    private scrollToX(element: any, xFrom: number, xTo: number, t01: number, speed: number, step: number, motion: Function) {
        let _this: any = this;

        if (t01 < 0 || t01 > 1 || speed <= 0) {
            element.scrollTop = xTo;
            this.isAnimationblocked = false;
            return;
        }
        element.scrollTop = xFrom - (xFrom - xTo) * motion(t01);
        t01 += speed * step;
        
        setTimeout(function() {
            _this.scrollToX(element, xFrom, xTo, t01, speed, step, motion);
        }, step);
    }

    private easeOutQuad(t: number) {
        return -t*(t-2);
    }

    private getTotalHeight() {
        let i: number;
        let totalHeight: number = 0
        let array = document.querySelectorAll('#contacts-wrapper .letter-container');
        const arrayLength: number = array.length;

        for (i = 0; i < arrayLength; i++) {
           totalHeight  += array[i].clientHeight;
        }

        return totalHeight;
    }

    private getpreviousSiblingsHeight(element: HTMLElement, identificator: any) {
        const id: string = identificator.replace(/#/, '');
        let height: number = 0;
        let i: number = 0;
        let p = element;
        let array = document.querySelectorAll('#contacts-wrapper .letter-container');

        while (array[i].getAttribute('id') !== id) {
            height += array[i].clientHeight;
            i++;
        }

        return height;
    }

    private determineElement(targetElementOrId: TargetElement): HTMLElement {
        if (typeof targetElementOrId === 'string') {
            return this.document.getElementById((<string>targetElementOrId).substr(1));
        } else {
            return <HTMLElement>targetElementOrId;
        }
    }
}