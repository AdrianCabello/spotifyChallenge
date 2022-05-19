import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() album: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showArtist() {
    let artistId;
    switch (this.album.type) {
      case 'artist':
        artistId = this.album.id
        this.router.navigate(['/artist', artistId])
        break;

      case 'album':
        artistId = this.album.artists[0].id;
        this.router.navigate(['/artist', artistId])
        break;

      case 'playlist':
        this.router.navigate(['/playlist', this.album.id])
        break;

      default:
        break;
    }
  }
}
