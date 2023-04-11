import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UrlShortenerApiService } from './core/url-shortener-api.service';
import { API_RES_INIT, IApiRes, IUrlShortcode, URL_SHORT_CODE_INIT } from './interfaces/api-res';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  title = 'URL-shortener-tool';

  urlForm: FormGroup;
  urlShortCode: IUrlShortcode[] = URL_SHORT_CODE_INIT;
  errorMessage:string = '';
  urlShortStatus:boolean = false;
  isBtnDisabled:boolean = true;
  isLoading:boolean = false;


  constructor(
    private fb: FormBuilder,
    private srtUrl: UrlShortenerApiService
  ){
    this.urlForm = this.fb.group({
      url: '',
    });
  }



  ngOnInit(){


  }

  getShortLink(button:any){
    // ensure button is cliked once
    button.disabled = true;
    this.isLoading = true;
    const url = this.urlForm.get('url')?.value;
    if (url.split('://')[0] === 'https' || url.split('://')[0] === 'http'){
      this.errorMessage = "";
      this.srtUrl.getShortCode(url).subscribe(
        {
          next: (res:IApiRes) => {
            button.disabled = false;
            this.isLoading = false;
            const links = [ res.result.short_link, res.result.short_link2];

            this.urlShortCode = links.map(link => {
            this.urlShortStatus = true;
              return {
                short_link: link,
                short_link_href: `https://${link}`,
              }
            })},
          error: err => {
            this.isLoading = false;
            this.urlShortStatus = false;
            button.disabled = false;
            this.errorMessage = err;
          }
        }
      )
    }else{
      this.isLoading = false;
      this.errorMessage = "Paste a correct url, ensure it starts with https:// or http://"
      button.disabled = false;
    }
  }
}
