import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiRes } from '../interfaces/api-res';
import { Observable, catchError, tap, throwError } from 'rxjs';
;

@Injectable({
  providedIn: 'root'
})
export class UrlShortenerApiService {

  constructor(
    private http: HttpClient
  ) { }

  srtCodeApiBaseUrl: string = "https://api.shrtco.de/v2"
  srtCodeApiShortenUrl: string = `${this.srtCodeApiBaseUrl}/shorten?url=`

  getShortCode(url: string): Observable<IApiRes> {
    return this.http.get<IApiRes>(`${this.srtCodeApiShortenUrl}${url}`).pipe(
      tap(res => res),
      catchError(this.handleError)
    )
  };


  private handleError(err: HttpErrorResponse){
    let errorMessage = '';
    if(err.error instanceof ErrorEvent){
      errorMessage = `An error occured: ${err.error.message}`;
    }else{
      errorMessage = `Server returned code: ${err.status} error message is ${err.message}`;
    }
    return throwError(() => errorMessage)
  };

}
