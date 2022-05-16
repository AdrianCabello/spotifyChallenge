import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './pages/login/login.component';
import { SpotifyService } from './services/spotify.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { NoimagePipe } from './pipes/noimage.pipe';
import { StoreModule } from '@ngrx/store';
import { artistsReducer } from './redux/reducers/artists.reducer';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    LoginComponent,
    HeaderComponent,
    CardComponent,
    NoimagePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({
      artists: artistsReducer
    })
  ],
  providers: [SpotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
