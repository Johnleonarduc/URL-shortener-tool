import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UrlShortenerApiService } from "../core/url-shortener-api.service";
import * as appActions from "./app.actions";
import { IApiRes, IUrlShortcode } from "../interfaces/api-res";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AppEffects {

  callShortApi$ = createEffect(() =>
  this.actions$.pipe(
    ofType(appActions.callShortApi),
      map((action) => action.url),
      mergeMap((url: string) =>
        this.srtUrlService.getShortCode(url).pipe(
          map((res: IApiRes) => {
            console.log(res);
            return appActions.setShortenedUrls({ urls: this.generateFormUrls(res) })
          }
          ),
          catchError((err) => of(appActions.setShortApiError({ error: err })))
          )
        )
      )
    );

  constructor(
    private actions$: Actions,
    private srtUrlService: UrlShortenerApiService,
    ){}

  generateFormUrls (res:IApiRes) {
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
