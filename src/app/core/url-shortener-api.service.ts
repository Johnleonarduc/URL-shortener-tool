import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiRes } from '../interfaces/api-res';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AppState } from '../state/app.state';
import { Store } from '@ngrx/store';
import * as appActions from '../state/app.actions';
;

@Injectable({
  providedIn: 'root'
})
export class UrlShortenerApiService {

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) { }

  srtCodeApiBaseUrl: string = "https://api.shrtco.de/v2"
  srtCodeApiShortenUrl: string = `${this.srtCodeApiBaseUrl}/shorten?url=`

  getShortCode(url: string): Observable<IApiRes> {
    return this.http.get<IApiRes>(`${this.srtCodeApiShortenUrl}${url}`).pipe(
      tap(res => {
        // this.store.dispatch(appActions.callShortApi({url}));
        return res;
      }),
      catchError(this.handleError)
    )
  };


  private handleError(err: HttpErrorResponse){
    return throwError(() => err.error.error)
  };

}
