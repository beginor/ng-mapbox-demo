import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';

import { AppSharedService } from 'app-shared';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    public layers: mapboxgl.Layer[] = [];

    constructor(
        private appShared: AppSharedService,
        private http: HttpClient,
        private ngZone: NgZone
    ) { }

    public ngOnInit(): void {
        this.appShared.map.subscribe(map => {
            this.setMapStyle(map);
        });
    }

    public ngOnDestroy(): void {

    }

    public setLayerVisibility(e: Event, layerId: string): void {
        this.appShared.map.subscribe(map => {
            const checkbox = e.target as HTMLInputElement;
            const visibility = checkbox.checked ? 'visible' : 'none';
            map.setLayoutProperty(layerId, 'visibility', visibility);
        });
    }

    private async setMapStyle(map: mapboxgl.Map): Promise<void> {
        const style = await this.http.get<mapboxgl.Style>('assets/vector-tile.json').toPromise();
        map.setStyle(style);
        this.ngZone.run(() => {
            this.layers = style.layers?.filter(
                l => l.type !== 'background'
            ) as [];
        });
    }

}
