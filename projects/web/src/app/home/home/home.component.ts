import {
    Component, OnInit, Inject, AfterViewInit, ViewChild, ElementRef, OnDestroy
} from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnInit, OnDestroy {

    @ViewChild('mapview', { static: true })
    public mapElRef: ElementRef<HTMLDivElement>;

    private map: Map;

    constructor(
        @Inject('mapboxToken') private mapboxToken: string
    ) { }

    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
        if (!!this.map) {
            this.map.remove();
        }
    }

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

}
