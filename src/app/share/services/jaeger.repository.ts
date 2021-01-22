import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Jaeger, JaegerResponse} from '../models/jaeger';

const API = '/datafeed/api/v1/trace';

@Injectable({
  providedIn: 'root'
})
export class JaegerRepository {
  constructor(
    private httpClient: HttpClient
  ) {}

  queryAll(q?: {[key: string]: any}): Observable<Jaeger> {
    const params = this.genParams(q);
    const requestUrl = `${API}/traces?${params.toString()}`;
    return this.httpClient.get<Jaeger>(requestUrl);
  }
  queryOneById(id: string): Observable<JaegerResponse> {
    return this.httpClient.get<JaegerResponse>(`${API}/search?requestId=${id}`);
  }

  protected genParams(q?: {[key: string]: any}): URLSearchParams {
    const params = new URLSearchParams();
    const addValue = (key, value) => {
      if (value === 0) {
        value = '0';
      }
      if (value === false) {
        value = 'false';
      }
      if (value) {
        params.append(key, value);
      }
    };
    if (q) {
      Object.keys(q).forEach(k => {
        const v = q[k];
        if (v instanceof Array) {
          v.forEach(vv => addValue(k, vv));
          return;
        }
        addValue(k, v);
      });
    }
    return params;
  }
}
