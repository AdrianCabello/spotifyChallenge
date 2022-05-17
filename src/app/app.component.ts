import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { SpotifyService } from './services/spotify.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'spoty';

  constructor(private router: Router, private _spotifyService: SpotifyService, private _location: Location) {
    this.router.events.subscribe(data => {
      if (data instanceof RoutesRecognized) {
        const URL = this._location.path();

        if (URL.split('=')[0] === 'access_token') {
          let param = this.getHashParams(URL);
          const token = param['access_token'];
          token && (sessionStorage.setItem('token', token)), this._spotifyService.updateToken()
        }
      }

    })
  }

  ngOnInit(): void {

  }

  getHashParams(q: any) {
    let hashParams: any = {}, e, r = /([^&;=]+)=?([^&;]*)/g;

    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    return hashParams
  }

}
