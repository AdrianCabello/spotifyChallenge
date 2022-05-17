import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './pages/login/login.component';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/header/header.component';
import { ArtistComponent } from './pages/artist/artist.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';

import { SpotifyService } from './services/spotify.service';

import { NoImagePipe } from './pipes/noimage.pipe';
import { DomSecurityPipe } from './pipes/dom-security';

import { artistsReducer } from './redux/reducers/artists.reducer';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoadingComponent } from './components/loading/loading.component';
import { loadingReducer } from './redux/reducers/loading.reducer';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    LoginComponent,
    HeaderComponent,
    CardComponent,
    NoImagePipe,
    DomSecurityPipe,
    ArtistComponent,
    PlaylistComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    StoreModule.forRoot({
      artists: artistsReducer,
      loading: loadingReducer
    })
  ],
  providers: [SpotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
