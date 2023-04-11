import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { AppState } from "./app.state";
import * as appActions from "./app.actions";
import { URL_SHORT_CODE_INIT } from "../interfaces/api-res";


const initialState: AppState = {
  apiCallSuccess: false,
  apiCallError: '',
  shortenedUrls: URL_SHORT_CODE_INIT,
}

const getAppState = createFeatureSelector<AppState>('app');


//create selector for app list of fields
export const getApiCallSuccess = createSelector(
  getAppState,
  state => state.apiCallSuccess
);

export const getApiCallError = createSelector(
  getAppState,
  state => state.apiCallError
);

export const getShortCodeUrls = createSelector(
  getAppState,
  state => state.shortenedUrls
);



export const appReducer = createReducer(
  initialState,
  on(appActions.callShortApi, (state) => ({
    ...state,
    apiCallSuccess: false,
    apiCallError: "",
  })),
  on(appActions.setShortApiError, (state, { error }) => ({
    ...state,
    apiCallSuccess: false,
    apiCallError: error,
  })),
  on(appActions.setShortenedUrls, (state, { urls }) => ({
    ...state,
    apiCallSuccess: true,
    apiCallError: "",
    shortenedUrls: urls,
  }))
);
