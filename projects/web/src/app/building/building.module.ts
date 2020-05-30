import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildingRoutingModule } from './building-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        BuildingRoutingModule
    ]
})
export class BuildingModule { }
