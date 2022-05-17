import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  artistId: string;

  artist: any;
  topTracks: Array<any>;

  loading: boolean;

  constructor(private router: ActivatedRoute, private _spotifyService: SpotifyService) {

    this.router.params.subscribe(params => {
      this.getArtist(params['id'])
    })
  }

  ngOnInit(): void {

  }

  getArtist(id) {
    this.loading = true;
    this._spotifyService.getArtist(id).subscribe(
      (artist => {
        this.loading = false;
        this.artist = artist
      })
    )

    this._spotifyService.getTopTracks(id).subscribe(
      (topTracks) => {
        this.topTracks = topTracks
      }
    )
  }
}
