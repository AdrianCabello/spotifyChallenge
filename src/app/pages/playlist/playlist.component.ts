import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Albums } from 'src/app/models/albums';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  loading: boolean;
  playlist: any;
  tracks: any;
  offset = 0;
  playlistId: string;
  total: number;
  constructor(private router: ActivatedRoute, private _spotifyService: SpotifyService) {
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.playlistId = params['id']
      this.getPlaylist(this.playlistId)
    })
  }

  getPlaylist(id) {
    this.loading = true;
    this._spotifyService.getPlaylist(id).subscribe(
      (playlist => {
        this.loading = false;
        this.playlist = playlist
      })
    )

    this._spotifyService.getTracksPlaylist(id, this.offset).subscribe(
      (data: Albums) => {
        this.loading = false;
        this.tracks = data.items;
        this.offset = data.offset;
        this.total = data.total;
      }
    )
  }

  onScroll() {
    if (this.offset < this.total) {
      this.offset += 10
      this._spotifyService.getTracksPlaylist(this.playlistId, this.offset).subscribe(
        (data: Albums) => {
          this.loading = false;
          this.tracks = this.tracks.concat(data.items)
        }
      )
    }
  }
}
