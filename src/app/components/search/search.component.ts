import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Albums } from 'src/app/models/albums';
import { SpotifyService } from 'src/app/services/spotify.service';

import { addArtists } from 'src/app/redux/actions/artists.actions'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private _spotifyService: SpotifyService, private store: Store) { }

  ngOnInit(): void {
  }

  search(term) {
    console.log(term)
    if (term) {
      this._spotifyService.getArtist(term).subscribe(
        (artists: any) => {
          this.store.dispatch(addArtists({ artists }));
        }
      )
    } else {
      this.store.dispatch(addArtists({ artists: [] }));
    }
  }
}
