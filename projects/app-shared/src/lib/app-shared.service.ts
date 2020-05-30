import { Injectable } from '@angular/core';

import { Map } from 'mapbox-gl';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppSharedService {

    private _map = new BehaviorSubject<Map>(null);

    public get map(): BehaviorSubject<Map> { return this._map; }

    constructor() { }

}
