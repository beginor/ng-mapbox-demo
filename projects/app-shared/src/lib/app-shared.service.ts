import { Injectable } from '@angular/core';

import { Map } from 'mapbox-gl';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AppSharedService {

    private _map = new BehaviorSubject<Map>(null);

    public get map(): Observable<Map> {
        return this._map.pipe(filter(m => !!m));
    }

    constructor() { }

    public setupMap(mapInstance: Map): void {
        if (mapInstance.loaded()) {
            this._map.next(mapInstance);
        }
        else {
            mapInstance.once('load', () => this._map.next(mapInstance));
        }
    }

}
