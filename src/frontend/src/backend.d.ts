import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Song {
    id: bigint;
    title: string;
    duration: bigint;
    album: string;
    audioFile: string;
    artist: string;
}
export interface Playlist {
    name: string;
    songs: Array<bigint>;
}
export interface backendInterface {
    addSong(title: string, artist: string, album: string, duration: bigint, audioFile: string): Promise<bigint>;
    addSongToPlaylist(playlistName: string, songId: bigint): Promise<void>;
    createPlaylist(name: string): Promise<void>;
    getAllSongs(): Promise<Array<Song>>;
    getPlaylist(playlistName: string): Promise<Playlist | null>;
    searchSongs(searchTerm: string): Promise<Array<Song>>;
}
