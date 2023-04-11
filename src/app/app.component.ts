import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UrlShortenerApiService } from './core/url-shortener-api.service';
import { API_RES_INIT, IApiRes, IUrlShortcode, URL_SHORT_CODE_INIT } from './interfaces/api-res';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'URL-shortener-tool';

  urlForm: FormGroup;
  urlShortCode: IUrlShortcode[] = URL_SHORT_CODE_INIT;
  errorMessage = '';
  urlShortStatus:boolean = false;

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

  getShortLink(){
    const url = this.urlForm.get('url')?.value;
    this.srtUrl.getShortCode(url).subscribe(
      {
        next: (res:IApiRes) => {
          const links = [ res.result.short_link, res.result.short_link2]

          this.urlShortCode = links.map(link => {
            this.urlShortStatus = true;
            return {
              short_link: link,
              short_link_href: `https://${link}`,
            }
          })},
        error: err => {
          this.urlShortStatus = false;
          this.errorMessage = err;
        }
      }
    )
  }
}
