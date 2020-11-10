import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomStyleRoutingModule } from './custom-style-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        CustomStyleRoutingModule
    ]
})
export class CustomStyleModule { }
