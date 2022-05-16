import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Albums } from 'src/app/models/albums';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  albums: Albums;
  loading: boolean;
  subArtists: Subscription;
  artists = []

  constructor(private _spotifyService: SpotifyService, private store: Store) { }

  ngOnInit(): void {

    this.subArtists = this.store.subscribe(
      (data : any) => {
        this.artists = data.artists;
        console.log(this.artists)
    }
    );;

    this.getNewReleases()
  }

  getNewReleases() {
    this.loading = true;
    this._spotifyService.getNewReleases().subscribe(
      (data: any) => {
        this.loading = false;
        this.albums = data
      }
    )
  }

  getSearchArtists() {

  }

}
