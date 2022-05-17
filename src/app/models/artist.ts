import { externalUrls } from "./externalUrl";
import { Follower } from "./follower";
import { Images } from "./images";

export interface Artist {
    external_urls: externalUrls,
    followers: Follower,
    genres: Array<string>,
    href: string,
    id: string,
    images: Array<Images>,
    name: string,
    popularity: number,
    type: string,
    uri: string
}
