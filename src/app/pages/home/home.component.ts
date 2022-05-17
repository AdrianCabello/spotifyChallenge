import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Albums } from 'src/app/models/albums';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  albums: Albums;
  loading: boolean;
  error: boolean;
  errorMessage: string;
  subArtists: Subscription;
  artists = []
  playlist: any;
  constructor(private _spotifyService: SpotifyService, private store: Store) { }

  ngOnInit(): void {

    this.subArtists = this.store.subscribe(
      (data: any) => {
        this.loading = data.loading;
        this.artists = data.artists;
      }
    );;

    this.getPlaylist()
  }

  ngOnDestroy() {
    this.subArtists.unsubscribe()
  }

  getPlaylist() {
    this.loading = true
    this._spotifyService.getPlaylists().subscribe(
      (data) => {
        this.loading = false;
        this.playlist = data;
      },
      (error) => {
        this.loading = false;
        this.error = true;
        this.errorMessage = error.error.error.message
      }
    )
  }
}
