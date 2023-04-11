import { createAction, props } from "@ngrx/store"
import { IApiRes, IUrlShortcode } from "../interfaces/api-res"

export enum AppActionTypes {
  CallShortApi = '[App] Call shortco.de API',
  SetShortApiError = '[App] Set shortco.de Error',
  SetShortenedUrls = '[App] Set shorteened urls',
};


// API Action Creators
export const callShortApi = createAction(
  AppActionTypes.CallShortApi,
  props<{ url: string }>()
);

export const setShortApiError = createAction(
  AppActionTypes.SetShortApiError,
  props<{ error: string }>()
);

export const setShortenedUrls = createAction(
  AppActionTypes.SetShortenedUrls,
  props<{ urls: IUrlShortcode[] }>()
);
