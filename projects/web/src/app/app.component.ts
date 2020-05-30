import { Component, OnInit, OnDestroy } from '@angular/core';

import { prewarm, clearPrewarmedResources } from 'mapbox-gl';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    public ngOnInit(): void {
        prewarm();
    }

    public ngOnDestroy(): void {
        clearPrewarmedResources();
    }

}
