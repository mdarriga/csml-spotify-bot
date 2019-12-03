
# Spotify integration

## Description
Use the [spotify api](https://github.com/musixmatch/musixmatch-sdk) to manage playlist, songs and data about them

Here is a list of the method availables:

- `search({ q, type, market = 'from_token', limit = 20, offset = 0, include_external })` - Get Spotify Catalog information about artists, albums, tracks or playlists that match a keyword string.
- `_searchArtist({ queryString })` - Search for an artist and only retrieve items in the response.
- `_searchAlbum({ queryString })` - Search for an album and only retrieve items in the response.
- `_searchPlaylist({ queryString })` - Search for a playlist and only retrieve items in the response.
- `_searchTrack({ queryString })` - Search for a track and only retrieve items in the response.
- `getMultipleArtists({ artistIds })` - Get many artists via a list of ids.
- `getArtist({ artistId })` - Get an artist information via it's artist ID.
- `getArtistAlbum({ artistId, include_groups, market = 'from_token', limit = 20, offset = 0 })` - Get an artist album's via it's artist ID.
- `getArtistTopTracks({ artistId, market = 'from_token' })` - Get an artist top tracks via it's artist ID.
- `getArtistRelatedArtists({ artistId })` - Get an artist related artists.
- `getCurrentUserProfile()` - Get the current user profile.
- `getUserProfile({ userId })` - Get a user profile via it's user id.
- `getUserPlaylist()` - Retrieve a user's playlists.
- `getCurrentUserTopArtistAndTracks({ type, limit = 3 })` - Get a user top artist or top tracks.
- `saveTracksForUser({ ids })` - Save one or more tracks to the current user library.
- `removeTracksForUser({ ids })` - Remove one or more tracks to the current user library.
- `getSavedTracksForUser({ limit = 20, offset = 0, market = 'from_token' })` - Get a list of saved tracks for the current user.
- `checkSavedTracksForUser({ ids })` - Check if tracks are followed by the current user.
- `checkSavedalbumsForUser({ ids })` - Check if albums are followed by the current user.
- `saveAlbumsForUser({ ids })` - Save one or more albums to the current user library.
- `removeAlbumsForUser({ ids })` - Remove one or more albums to the current user library.
- `getSavedAlbumsForUser({ limit = 20, offset = 0, market = 'from_token' })` - Get a list of saved albums for the current user.
- `getTrack({ id, market = 'from_token' })` - Get information about a track via it's track id.
- `getAlbum({ id, market = 'from_token' })` - Get information about an album via it's album id.
- `getAlbumTracks({ id, limit = 20, offset = 0, market = 'from_token' })` - Get a list of an album's tracks.
- `getManyAlbums({ ids, market = 'from_token'})` - Get information about many albums via their ids.
- `getFollowingStateForUsersOrArtists({ type, ids })` - Get if you follow a user or an artist.
- `followUsersOrArtists({ type, ids })` - Follow users and / or artists.
- `unfollowUsersOrArtists({ type, ids })` - Unfollow users and / or artists.
- `followPlaylist({ playlist_id })` - Follow a playlist.
- `unfollowPlaylist({ playlist_id })` - Unfollow a playlist.
- `checkUserFollowPlaylist({ playlist_id, ids })` - Check if the user follow a playlist via it's playlist_id.


## Usage
Required environment variables:

-  `SPOTIFY_TOKEN`

```rust
use Fn("spotify", method = "search", type = "artist", q = "Eagles") as searchResult
```
