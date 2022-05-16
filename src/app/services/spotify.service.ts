import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQDsbfgUHkxAKd0Kjy93M6811hCn_TE2H8HuppbIiIjruMd3tX3oq4pkmsa21wlFoyogieWrT1FfxQ4M0sgW9hYFxtmYuxVGshe_mml91KFbaeW89ys6nYwEzuGG_3IuYPvYbcWVqupC6JcQ89TXr8hgk0ftrMwbai0'
    })

    return this.http.get(url, { headers })
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases')
      .pipe(
        map(data => data['albums'].items)
      )
  }

  getArtist(term: string) {
    return this.getQuery(`search?q=${term}&type=artist`)
      .pipe(
        map(data => data['artists'].items)
      )
  }


}
