import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ArtistComponent } from './pages/artist/artist.component';
import { HomeComponent } from './pages/home/home.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';

export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'artist/:id', component: ArtistComponent, canActivate: [AuthGuard]},
    { path: 'playlist/:id', component: PlaylistComponent, canActivate: [AuthGuard] },
    { path: '', pathMatch: 'full', redirectTo: "home" },
    { path: '**', pathMatch: 'full', redirectTo: "home" }
]
