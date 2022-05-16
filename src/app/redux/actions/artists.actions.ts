/* import { Action } from '@ngrx/store';

export const GET_ARTISTS = '[Spotify] Get Artists';

export class GetArtists implements Action {
    readonly type = GET_ARTISTS;

    constructor(public artists: any) { }
}


export type actions = GetArtists;

 */

import { createAction, props } from "@ngrx/store";

export const addArtists = createAction('[Spotify] Get Artists',
    props<{ artists: any }>());
