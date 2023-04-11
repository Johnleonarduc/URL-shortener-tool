import { IUrlShortcode } from "../interfaces/api-res";

// ngrx store state
export interface AppState {
  apiCallSuccess: boolean;
  apiCallError: string;
  shortenedUrls: IUrlShortcode[];
}
