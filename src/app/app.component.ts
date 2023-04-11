import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UrlShortenerApiService } from './core/url-shortener-api.service';
import { IApiRes, IUrlShortcode, URL_SHORT_CODE_INIT } from './interfaces/api-res';
import { AppState } from './state/app.state';
import { Store, select } from '@ngrx/store';
import * as appActions from "./state/app.actions";
import * as fromApp from "./state/app.reducer";
import { takeWhile } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  title = 'URL-shortener-tool';

  // UI element States
  urlShortStatus:boolean = false;
  isBtnDisabled:boolean = true;
  isLoading:boolean = false;
  componentActive:boolean = true;


  urlForm: FormGroup;
  urlShortCode: IUrlShortcode[] = URL_SHORT_CODE_INIT;
  errorMessage:string = '';

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
  ){
    this.urlForm = this.fb.group({
      url: '',
    });
  }

  ngOnInit(){
    this.store.pipe(select(fromApp.getShortCodeUrls),
    takeWhile(()=> this.componentActive))
    .subscribe({next: shortenedUrls => {
      this.urlShortCode = shortenedUrls;
      this.urlShortStatus = true;
      this.isLoading = false;
      this.isBtnDisabled = false;
    }
    })

    this.store.pipe(select(fromApp.getApiCallError),
      takeWhile(()=> this.componentActive))
        .subscribe({next: err => {
          this.errorMessage = err;
          this.urlShortStatus = false;
          this.isLoading = false;
        }
      })
  }

  getShortLink(button:any){
    // ensure button is cliked once
    this.isBtnDisabled = true;
    this.isLoading = true;

    const url = this.urlForm.get('url')?.value;
    if (url.split('://')[0] === 'https' || url.split('://')[0] === 'http'){
      this.errorMessage = "";
      this.store.dispatch(appActions.callShortApi({url}));
    }else{
      this.isLoading = false;
      this.errorMessage = "Paste a correct url, ensure it starts with https:// or http://"
      this.isBtnDisabled = false;
    }
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
