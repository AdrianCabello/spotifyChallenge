import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Albums } from 'src/app/models/albums';
import { SpotifyService } from 'src/app/services/spotify.service';

import { addArtists } from 'src/app/redux/actions/artists.actions'
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { setLoading } from 'src/app/redux/actions/loading.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  term = new FormControl();
  termSub: Subscription;

  constructor(private _spotifyService: SpotifyService, private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.searchSub();
  }

  searchSub() {
    this.termSub = this.term.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.router.navigate([''])

      this.store.dispatch(setLoading({ loading: true }))

      if (term) {
        this._spotifyService.getArtists(term).subscribe(
          (artists: any) => {
            this.store.dispatch(addArtists({ artists }));
            this.store.dispatch(setLoading({ loading: false }))
          }
        )
      } else {
        this.store.dispatch(addArtists({ artists: [] }));
        this.store.dispatch(setLoading({ loading: false }))
      }
    });
  }
}
