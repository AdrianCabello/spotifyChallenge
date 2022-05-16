
import { createReducer, on } from '@ngrx/store';
import { addArtists } from '../actions/artists.actions';

export const initialState = [];

export const artistsReducer = createReducer(
  initialState,
  on(addArtists, (state, { artists }) => artists));