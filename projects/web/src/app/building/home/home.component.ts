import { Component, OnInit, OnDestroy } from '@angular/core';

import { Map, CameraOptions } from 'mapbox-gl';

import { AppSharedService } from 'app-shared';

@Component({
    selector: 'app-building-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    private mapOpts!: CameraOptions;

    constructor(
        private appShared: AppSharedService
    ) { }

    public ngOnInit(): void {
        this.appShared.map.subscribe(map => {
            this.mapOpts = {
                center: map.getCenter(),
                zoom: map.getZoom(),
                pitch: map.getPitch(),
                bearing: map.getBearing()
            };
            this.addBuildingLayer(map);
        });
    }

    public ngOnDestroy(): void {
        this.appShared.map.subscribe(map => {
            this.removeBuildingLayer(map);
        });
    }

    private addBuildingLayer(map: Map): void {
        // add source
        map.addSource('gd_bas_building', {
            type: 'vector',
            scheme: 'tms',
            tiles: [
                'http://192.168.6.102:8080/geoserver/gwc/service/tms/1.0.0/postgis:building@EPSG:3857@pbf/{z}/{x}/{y}.pbf'
            ]
        });
        map.addLayer({
            id: 'gd_bas_building',
            metadata: {
              title: '建筑物',
              'mapbox:group': 'building',
              type: 'operational'
            },
            type: 'fill-extrusion',
            source: 'gd_bas_building',
            'source-layer': 'building',
            minzoom: 13,
            maxzoom: 23,
            layout: {
              visibility: 'visible'
            },
            paint: {
              'fill-extrusion-opacity': 0.8,
              'fill-extrusion-height': [
                'to-number', ['get', 'height'], 0
              ],
              'fill-extrusion-color': [
                'case',
                ['<=', ['to-number', ['get', 'height']], 20], '#feedde',
                ['<=', ['to-number', ['get', 'height']], 50], '#fdd0a2',
                ['<=', ['to-number', ['get', 'height']], 100], '#fdae6b',
                ['<=', ['to-number', ['get', 'height']], 150], '#fd8d3c',
                ['<=', ['to-number', ['get', 'height']], 200], '#f16913',
                ['<=', ['to-number', ['get', 'height']], 300], '#d94801',
                '#8c2d04'
              ]
            }
        });
        // fly to building;
        map.flyTo({
            center: { lng: 113.35773700852451, lat: 23.152798260893263 },
            zoom: 14,
            pitch: 0,
            bearing: 0
        });
    }

    private removeBuildingLayer(map: Map): void {
        // remove layer;
        map.removeLayer('gd_bas_building');
        // remove source;
        map.removeSource('gd_bas_building');
        // fly back;
        map.flyTo(this.mapOpts);
    }

}
