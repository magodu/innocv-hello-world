import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';


const APP_ROUTES: Routes = [
    { path: 'home', component: MainComponent },
    { path: '**',  redirectTo: 'home' }  
   
];

export const routing = RouterModule.forRoot(APP_ROUTES);