import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";

actor {
  type Song = {
    id : Nat;
    title : Text;
    artist : Text;
    album : Text;
    duration : Nat;
    audioFile : Text;
  };

  type Playlist = {
    name : Text;
    songs : [Nat];
  };

  let songs = Map.empty<Nat, Song>();
  let playlists = Map.empty<Text, Playlist>();
  var nextSongId = 0;

  func matchesIgnoreCase(text : Text, searchTerm : Text) : Bool {
    text.toLower().contains(#text(searchTerm.toLower()));
  };

  public shared ({ caller }) func addSong(title : Text, artist : Text, album : Text, duration : Nat, audioFile : Text) : async Nat {
    let song : Song = {
      id = nextSongId;
      title;
      artist;
      album;
      duration;
      audioFile;
    };

    songs.add(nextSongId, song);
    nextSongId += 1;
    song.id;
  };

  public query ({ caller }) func searchSongs(searchTerm : Text) : async [Song] {
    let results = songs.values().toArray().filter(
      func(song) {
        matchesIgnoreCase(song.title, searchTerm) or matchesIgnoreCase(song.artist, searchTerm)
      }
    );
    results;
  };

  public shared ({ caller }) func createPlaylist(name : Text) : async () {
    let playlist : Playlist = {
      name;
      songs = [];
    };
    playlists.add(name, playlist);
  };

  public shared ({ caller }) func addSongToPlaylist(playlistName : Text, songId : Nat) : async () {
    switch (playlists.get(playlistName)) {
      case (null) { () };
      case (?playlist) {
        let updatedSongs = playlist.songs.concat([songId]);
        let updatedPlaylist : Playlist = {
          name = playlist.name;
          songs = updatedSongs;
        };
        playlists.add(playlistName, updatedPlaylist);
      };
    };
  };

  public query ({ caller }) func getPlaylist(playlistName : Text) : async ?Playlist {
    playlists.get(playlistName);
  };

  public query ({ caller }) func getAllSongs() : async [Song] {
    songs.values().toArray();
  };
};
