import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  credentials = {
    clientId: 'bb2002a1ba4f4823b153e572d044054a',
    clientSecret: '5682d48927c34d58adae1a5fcfcd2808',
    accessToken: ''
  }

  redirectUri = encodeURIComponent('http://localhost:4200');

  poolUrls = {
    authorize: `https://accounts.spotify.com/es-ES/authorize?client_id=${this.credentials.clientId}&response_type=token&redirect_uri=${this.redirectUri}&expires_in=3600`,
    refreshAccessToken: 'https://accounts.spotify.com/api/token'
  }

  constructor(private http: HttpClient) {
    this.updateToken()
  }

  /* LOGIN */

  checkTokenLogin() {
    this.checkTokenSpotify() || (sessionStorage.setItem('refererURL', location.href), location.href = this.poolUrls.authorize);
  }

  checkTokenSpotify() {
    return !!this.credentials.accessToken;
  }

  tokenRefreshURL() {
    this.checkTokenSpotify && alert('Expiro la sesion');

    this.credentials.accessToken = '';
    sessionStorage.removeItem('token');
    this.checkTokenLogin()
  }

  updateToken() {
    this.credentials.accessToken = sessionStorage.getItem('token') || '';
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.credentials.accessToken}`
    })

    return this.http.get(url, { headers })
  }

  /* Releases */

  getNewReleases() {
    return this.getQuery('browse/new-releases')
      .pipe(
        map(data => {
          return data['albums'].items
        })
      )
  }

  /* ARTIST */

  getArtists(term: string) {
    return this.getQuery(`search?q=${term}&type=artist`)
      .pipe(
        map(data => data['artists'].items)
      )
  }

  getArtist(id) {
    return this.getQuery(`artists/${id}`)
  }

  /* TRACKS */

  getTopTracks(id) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
      .pipe(
        map(data => data['tracks'])
      )
  }

  /* PLAYLIST */

  getPlaylists() {
    return this.getQuery(`browse/featured-playlists`)
      .pipe(
        map(data => data['playlists'].items)
      )
  }

  getPlaylist(id) {
    return this.getQuery(`playlists/${id}`)
  }

  getTracksPlaylist(id, offset) {
    return this.getQuery(`playlists/${id}/tracks?limit=10&offset=${offset}`)
  }

}
