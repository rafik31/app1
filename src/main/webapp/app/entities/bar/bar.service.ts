import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Bar } from './bar.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BarService {

    private resourceUrl = 'api/bars';

    constructor(private http: Http) { }

    create(bar: Bar): Observable<Bar> {
        const copy = this.convert(bar);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(bar: Bar): Observable<Bar> {
        const copy = this.convert(bar);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Bar> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(bar: Bar): Bar {
        const copy: Bar = Object.assign({}, bar);
        return copy;
    }
}
