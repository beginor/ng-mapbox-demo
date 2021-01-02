import {
    Component, OnInit, Inject, AfterViewInit, ViewChild, ElementRef, OnDestroy,
    NgZone
} from '@angular/core';
import {
    trigger, animate, style, state, transition
} from '@angular/animations';

import { AppSharedService } from 'app-shared';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('state', [
            state('show', style({ left: '0px' })),
            state('hide', style({ left: '-330px' })),
            transition('show => hide', animate('.3s ease-in-out')),
            transition('hide => show', animate('.3s ease-in-out'))
        ])
    ]
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {

    @ViewChild('mapview', { static: true })
    public mapElRef!: ElementRef<HTMLDivElement>;
    public state = 'show';

    private map!: mapboxgl.Map;

    constructor(
        @Inject('mapboxToken') private mapboxToken: string,
        private appShared: AppSharedService,
        private zone: NgZone
    ) { }

    public ngAfterViewInit(): void {
        this.zone.runOutsideAngular(() => {
            const map = new mapboxgl.Map({
                container: this.mapElRef.nativeElement,
                accessToken: this.mapboxToken,
                style: 'mapbox://styles/beginor/ckjf6ghja1lzt19qrsanpww3i',
                center: [113.259, 23.132],
                zoom: 6
            });
            const navigation = new mapboxgl.NavigationControl({
                showZoom: true,
                showCompass: true,
                visualizePitch: false
            });
            map.addControl(navigation, 'top-right');
            const scale = new mapboxgl.ScaleControl();
            map.addControl(scale, 'bottom-right');
            Object.assign(window, { _mapview: map });
            this.map = map;
            this.appShared.setupMap(map);
        });
    }

    public ngOnInit(): void {
        mapboxgl.prewarm();
    }

    public ngOnDestroy(): void {
        mapboxgl.clearPrewarmedResources();
        if (!!this.map) {
            this.map.remove();
        }
    }

    public toggleState(e: Event): void {
        e.preventDefault();
        e.stopPropagation();
        this.state = (this.state === 'show') ? 'hide' : 'show';
    }

    public getToggleIcon(): string {
        let icon = 'bi/chevron-double-';
        if (this.state === 'show') {
            icon += 'left';
        }
        else {
            icon += 'right';
        }
        return icon;
    }

}
