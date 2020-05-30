import {
    Component, OnInit, Inject, AfterViewInit, ViewChild, ElementRef, OnDestroy
} from '@angular/core';
import {
    trigger, animate, style, state, transition
} from '@angular/animations';

import { Map, prewarm, clearPrewarmedResources } from 'mapbox-gl';

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
    public mapElRef: ElementRef<HTMLDivElement>;
    public state = 'show';

    private map: Map;

    constructor(
        @Inject('mapboxToken') private mapboxToken: string
    ) { }

    public ngAfterViewInit(): void {
        this.map = new Map({
            container: this.mapElRef.nativeElement,
            accessToken: this.mapboxToken,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [113.259, 23.132],
            zoom: 7
        });
        window['_mapview'] = this.map;
    }

    public ngOnInit(): void {
        prewarm();
    }

    public ngOnDestroy(): void {
        clearPrewarmedResources();
        if (!!this.map) {
            this.map.remove();
        }
    }

    public toggleState(e: Event): void {
        e.preventDefault();
        e.stopPropagation();
        this.state = (this.state === 'show') ? 'hide' : 'show';
    }

    public getToggleIconClass(): string {
        let classeName = 'fas fa-chevron-';
        if (this.state === 'show') {
            classeName += 'left';
        }
        else {
            classeName += 'right';
        }
        return classeName;
    }

}
