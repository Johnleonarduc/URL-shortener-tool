import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UrlShortenerApiService } from "../core/url-shortener-api.service";
import * as appActions from "./app.actions";
import { IApiRes, IUrlShortcode } from "../interfaces/api-res";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AppEffects {

  constructor(
    private actions$: Actions,
    private srtUrlService: UrlShortenerApiService,
    ){}

  callShortApi$ = createEffect(() =>
  this.actions$.pipe(
    ofType(appActions.callShortApi),
      map((action) => action.url),
      mergeMap((url: string) =>
        this.srtUrlService.getShortCode(url).pipe(
          map((res: IApiRes) => appActions.setShortenedUrls({ urls: this.formatResForComponent(res) })),
          catchError((err) => of(appActions.setShortApiError({ error: err })))
          )
        )
      )
    );


  formatResForComponent (res:IApiRes) {
    // function to fromat the response in IApiRes format to IUrlShortcode[] format
    const links = [ res.result.short_link, res.result.short_link2];

    const urlShortCodes:IUrlShortcode[]  = links.map(link => {
      return {
        short_link: link,
        short_link_href: `https://${link}`,
      }
    });
    return urlShortCodes;
  }
}
