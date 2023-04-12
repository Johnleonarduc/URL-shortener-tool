import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IUrlShortcode, URL_SHORT_CODE_INIT } from './interfaces/api-res';
import { AppState } from './state/app.state';
import { Store, select } from '@ngrx/store';
import * as appActions from "./state/app.actions";
import * as fromApp from "./state/app.reducer";
import { takeWhile } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'URL Shortener Tool';

  // UI element States
  urlShortStatus:boolean = false;
  isBtnDisabled:boolean = true;
  isLoading:boolean = false;
  componentActive:boolean = true;


  url: FormControl;
  urlShortCode: IUrlShortcode[] = URL_SHORT_CODE_INIT;
  errorMessage:string = '';

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
  ){
    this.url = this.fb.control('');
  }

  ngOnInit(){
    this.store.pipe(select(fromApp.getShortCodeUrls),
    takeWhile(()=> this.componentActive))
    .subscribe({next: shortenedUrls => {
      this.urlShortCode = shortenedUrls;

      // update UI Component Status
      this.urlShortStatus = true;
      this.isLoading = false;
      this.isBtnDisabled = false;
    }
    })

    this.store.pipe(select(fromApp.getApiCallError),
      takeWhile(()=> this.componentActive))
        .subscribe({next: err => {
          this.errorMessage = err;

      // update UI Component Status
          this.urlShortStatus = false;
          this.isLoading = false;
          this.isBtnDisabled = false;
        }
      })
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.getShortLink();
    }
  }


  getShortLink(){
    // ensure button is cliked once
    this.isBtnDisabled = true;
    this.isLoading = true;

    const url = this.url?.value;
    const httpSegment = url.split('://')[0].toLowerCase();
    if (httpSegment === 'https' || httpSegment === 'http'){
      this.errorMessage = "";
      this.store.dispatch(appActions.callShortApi({url}));
    }else{
      this.isLoading = false;
      this.errorMessage = "Paste a correct url, ensure it starts with https:// or http://"
      this.isBtnDisabled = false;
    }
  }

  ngOnDestroy() {
    // remove subscriptions to store
    this.componentActive = false;
  }
}
