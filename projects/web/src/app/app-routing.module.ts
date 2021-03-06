import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';

// tslint:disable: max-line-length
const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
    },
    {
        path: 'building',
        loadChildren: () => import('./building/building.module').then(m => m.BuildingModule)
    },
    {
        path: 'custom-style',
        loadChildren: () => import('./custom-style/custom-style.module').then(m => m.CustomStyleModule)
    }
];
// tslint:enable: max-line-length

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,
            enableTracing: !environment.production
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
