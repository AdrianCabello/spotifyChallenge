import { createAction, props } from "@ngrx/store";

export const addArtists = createAction('[Spotify] Get Artists',
    props<{ artists: any }>());
