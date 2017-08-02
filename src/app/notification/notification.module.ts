import { NgModule } from '@angular/core';

import { GrowlModule} from 'primeng/primeng';
import { NotificationComponent } from './notification.component';


@NgModule({
    imports: [ 
        GrowlModule
    ],
    exports: [
        NotificationComponent
    ],
    declarations: [ NotificationComponent ],
    providers: []

})
export class NotificationSharedModule { } 
