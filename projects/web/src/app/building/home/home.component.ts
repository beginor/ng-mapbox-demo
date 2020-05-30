import { Component, OnInit } from '@angular/core';

import { Map } from 'mapbox-gl';

import { AppSharedService } from 'app-shared';

@Component({
    selector: 'app-building-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(
        private appShared: AppSharedService
    ) { }

    public ngOnInit(): void {
        this.appShared.map.subscribe(map => {
            if (!map) {
                return;
            }
            map.on('load', () => { alert('map loaded') });
        });
    }

}
