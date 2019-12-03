const axios = require('axios');
const qs = require('qs');

const spotifyApi = {
  request: axios.create({
    baseURL: 'https://api.spotify.com/v1',
    timeout: 2000,
    headers: {
      Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
      'Content-type': 'application/json',
    }
  }),

  /**
   * Get Spotify Catalog information about artists, albums, tracks or playlists that match a keyword string.
   * @async
   * @param {string} q                   - Search query keywords and optional field filters and operators.
   * @param {string} type                - A comma-separated list of item types to search across (album , artist, playlist, and track).
   * @param {string} [market=from_token] - Supply this parameter to limit the response to one particular geographical market.
   * @param {string} [limit=20]          - The number of album objects to return.
   * @param {string} [offset=0]          - The index of the first result to return.
   * @param {string} [include_external]  - Possible values: audio, if include_external=audio is specified the response will include any relevant audio content that is hosted externally.
   */
  search: async ({ q, type, market = 'from_token', limit = 20, offset = 0, include_external }) => {
    const queryString = qs.stringify({ q, type, market, limit, offset, include_external });

    switch (type) {
      case 'artist':
        return spotifyApi._searchArtist(queryString);
      case 'album':
        return spotifyApi._searchAlbum(queryString);
      case 'playlist':
        return spotifyApi._searchPlaylist(queryString);
      case 'track':
      default:
        return spotifyApi._searchTrack(queryString);
    }
  },

  /**
   * Search for an artist and only retrieve items in the response.
   * @async
   * @param {string} queryString
   * @returns {Promise<Array<Object>>}
   */
  _searchArtist: async (queryString) => {
    return spotifyApi.request.get(`/search?${queryString}`).then(res => res.data.artists.items);
  },

  /**
   * Search for an album and only retrieve items in the response.
   * @async
   * @param {string} queryString
   * @returns {Promise<Array<Object>>}
   */
  _searchAlbum: async (queryString) => {
    return spotifyApi.request.get(`/search?${queryString}`).then(res => res.data.albums.items);
  },

  /**
   * Search for a playlist and only retrieve items in the response.
   * @async
   * @param {string} queryString
   * @returns {Promise<Array<Object>>}
   */
  _searchPlaylist: async (queryString) => {
    return spotifyApi.request.get(`/search?${queryString}`).then(res => res.data.playlists.items);
  },

  /**
   * Search for a track and only retrieve items in the response.
   * @async
   * @param {string} queryString
   * @returns {Promise<Array<Object>>}
   */
  _searchTrack: async (queryString) => {
    return spotifyApi.request.get(`/search?${queryString}`).then(res => res.data);
  },

  /**
   * Get many artists via a list of ids.
   * @async
   * @param {string} artistIds - A list of artist ids separated by a comma.
   */
  getMultipleArtists: async ({ artistIds }) => {
    const queryString = qs.stringify({ artistIds });

    return spotifyApi.request.get(`/artists?${queryString}`).then(res => res.data);
  },

  /**
   * Get an artist information via it's artist ID.
   * @async
   * @param {string} artistId - The artist spotify ID.
   * @returns {Promise<object>}
   */
  getArtist: async ({ artistId }) => {
    return spotifyApi.request.get(`/artists/${artistId}`).then(res => res.data);
  },

  /**
   * Get an artist album's via it's artist ID.
   * @async
   * @param {string} artistId             - The artist spotify ID.
   * @param {string} [include_groupes]    - A comma-separated list of keywords that will be used to filter the response. (album, single, appears_on, compilation).
   * @param {string} [market=from_token]  - Supply this parameter to limit the response to one particular geographical market.
   * @param {number} [limit=20]           - The number of album objects to return.
   * @param {number} [offset=0]           - The index of the first album to return.
   * @returns {Promise<Array<object>>}
   */
  getArtistAlbum: async ({ artistId, include_groups, market = 'from_token', limit = 20, offset = 0 }) => {
    const queryString = qs.stringify({ include_groups, market, limit, offset });

    return spotifyApi.request.get(`/artists/${artistId}/albums?${queryString}`).then(res => res.data);
  },

  /**
   * Get an artist top tracks via it's artist ID.
   * @async
   * @param {string} artistId             - The artist spotify ID.
   * @param {string} [market=from_token]  - Supply this parameter to limit the response to one particular geographical market.
   * @returns {Promise<Array<object>>}
   */
  getArtistTopTracks: async ({ artistId, market = 'from_token' }) => {
    const queryString = qs.stringify({ market });

    return spotifyApi.request.get(`/artists/${artistId}/top-tracks?${queryString}`).then(res => res.data);
  },

  /**
   * Get an artist related artists.
   * @async
   * @param {string} artistId - The artist spotify ID.
   * @returns {Promise<Array<object>>}
   */
  getArtistRelatedArtists: async ({ artistId }) => {
    return spotifyApi.request.get(`/artists/${artistId}/related-artists`).then(res => res.data);
  },

  /**
   * Get the current user profile.
   * @async
   * @returns {Promise<object>}
   */
  getCurrentUserProfile: async () => {
    return spotifyApi.request.get('/me').then(res => res.data);
  },

  /**
   * Get a user profile via it's user id.
   * @async
   * @param {string} userId - The user spotify id.
   * @returns {Promise<object>}
   */
  getUserProfile: async ({ userId }) => {
    return spotifyApi.request.get(`/users/${userId}`).then(res => res.data);
  },

  /**
   * Retrieve a user's playlists
   * @async
   * @returns {Promise<Array<object>>}
   */
  getUserPlaylist: async () => {
    return spotifyApi.request.get('me/playlists').then(res => res.data);
  },

  /**
   * Get a user top artist or top tracks.
   * @async
   * @param {string} type - Can be artists or tracks.
   * @returns {Promise<object>}
   */
  getCurrentUserTopArtistAndTracks: async ({ type, limit = 3 }) => {
    return spotifyApi.request.get(`/me/top/${type}`).then(res => {
      return res.data.items.slice(0, limit)
    })
  },

  /**
   * Save one or more tracks to the current user library.
   * @async
   * @param {string} ids - A list of track ids, separated by comma.
   * @returns {string}
   */
  saveTracksForUser: async ({ ids }) => {
    return spotifyApi.request.put(`/me/tracks`, [ids]).then(res => res.status);
  },

  /**
   * Remove one or more tracks to the current user library.
   * @async
   * @param {string} ids - A list of track ids, separated by comma.
   * @returns {string}
   */
  removeTracksForUser: async ({ ids }) => {
    const queryString = qs.stringify({ ids });

    return spotifyApi.request.delete(`/me/tracks?${queryString}`).then(res => res.status);
  },

  /**
   * Get a list of saved tracks for the current user.
   * @param {number} [limit=20]           - The number of album objects to return.
   * @param {number} [offset=0]           - The index of the first album to return.
   * @param {string} [market=from_token]  - Supply this parameter to limit the response to one particular geographical market.
   * @returns {Promise<Array<object>>}
   */
  getSavedTracksForUser: async ({ limit = 20, offset = 0, market = 'from_token' }) => {
    return spotifyApi.request.get('/me/tracks').then(res => res.data.items);
  },

  /**
   * Check if tracks are followed by the current user.
   * @param {string} ids - A comma separated list of track ids.
   * @returns {Promise<Array<object>>}
   */
  checkSavedTracksForUser: async ({ ids }) => {
    const queryString = qs.stringify({ ids });

    return spotifyApi.request.get(`/me/tracks/contains?${queryString}`).then(res => res.data);
  },

  /**
   * Check if albums are followed by the current user.
   * @param {string} ids - A comma separated list of album ids.
   * @returns {Promise<Array<object>>}
   */
  checkSavedalbumsForUser: async ({ ids }) => {
    const queryString = qs.stringify({ ids });

    return spotifyApi.request.get(`/me/albums/contains?${queryString}`).then(res => res.data);
  },

  /**
   * Save one or more albums to the current user library.
   * @async
   * @param {string} ids - A list of album ids, separated by comma.
   * @returns {string}
   */
  saveAlbumsForUser: async ({ ids }) => {
    return spotifyApi.request.put('/me/albums', [ids]).then(res => res.status);
  },

  /**
   * Remove one or more albums to the current user library.
   * @async
   * @param {string} ids - A list of album ids, separated by comma.
   * @returns {string}
   */
  removeAlbumsForUser: async ({ ids }) => {
    const queryString = qs.stringify({ ids });

    return spotifyApi.request.delete(`/me/albums?${queryString}`).then(res => res.status);
  },

  /**
   * Get a list of saved tracks for the current user.
   * @param {number} [limit=20]           - The number of album objects to return.
   * @param {number} [offset=0]           - The index of the first album to return.
   * @param {string} [market=from_token]  - Supply this parameter to limit the response to one particular geographical market.
   * @returns {Promise<Array<object>>
   */
  getSavedAlbumsForUser: async ({ limit = 20, offset = 0, market = 'from_token' }) => {
    const queryString = qs.stringify({ limit, offset, market });

    return spotifyApi.request.get(`/me/albums?${queryString}`).then(res => res.data.items);
  },

  /**
   * Get information about a track via it's track id.
   * @param {string} id                   - The track id.
   * @param {string} [market=from_token]  - Supply this parameter to limit the response to one particular geographical market.
   * @returns {Promise<Array<object>>}
   */
  getTrack: async ({ id, market = 'from_token' }) => {
    const queryString = qs.stringify({ market });

    return spotifyApi.request.get(`/tracks/${id}?${queryString}`).then(res => res.data);
  },


  /**
   * Get information about an album via it's album id.
   * @param {string} id                   - The album id.
   * @param {string} [market=from_token]  - Supply this parameter to limit the response to one particular geographical market.
   * @param {Promise<object>}
   */
  getAlbum: async ({ id, market = 'from_token' }) => {
    const queryString = qs.stringify({ market });

    return spotifyApi.request.get(`/albums/${id}?${queryString}`).then(res => res.data);
  },

  /**
   * Get a list of an album's tracks.
   * @param {string} id                   - The album id
   * @param {number} [limit=20]           - The number of album objects to return.
   * @param {number} [offset=0]           - The index of the first album to return.
   * @param {string} [market=from_token]  - Supply this parameter to limit the response to one particular geographical market.
   * @returns {Promise<Array<object>>}
   */
  getAlbumTracks: async ({ id, limit = 20, offset = 0, market = 'from_token' }) => {
    const queryString = qs.stringify({ limit, offset, market });

    return spotifyApi.request.get(`albums/${id}/tracks`).then(res => res.data.items);
  },

  /**
   * Get information about many albums via their ids.
   * @param {string} ids                  - A list of album ids, separated by commas.
   * @param {string} [market=from_token]  - Supply this parameter to limit the response to one particular geographical market.
   * @returns {Promise<Array<object>>}
   */
  getManyAlbums: async ({ ids, market = 'from_token'}) => {
    const queryString = qs.stringify({ ids, market });

    return spotifyApi.request.get(`/albums?${queryString}`).then(res => res.data.albums);
  },

  /**
   * Get if you follow a user or an artist.
   * @async
   * @param {string} type - Can either be artist or user.
   * @param {string} ids  - A comma separated list of users or artists.
   * @returns {Promise<Array<string>>}
   */
  getFollowingStateForUsersOrArtists: async ({ type, ids }) => {
    const queryString = qs.stringify({ type, ids });
    return spotifyApi.request.get(`/me/following/contains?${queryString}`).then(res => res.data);
  },

  /**
   * Follow users and / or artists.
   * @async
   * @param {string} type - Can either be artist or user.
   * @param {string} ids  - A comma separated list of users and / or artists.
   * @returns {Promise<Array<string>>}
   */
  followUsersOrArtists: async ({ type, ids }) => {
    const queryString = qs.stringify({ type, ids });
    return spotifyApi.request.put(`/me/following?${queryString}`).then(res => res.data);
  },

  /**
   * Unfollow users and / or artists.
   * @async
   * @param {string} type - Can either be artist or user.
   * @param {string} ids  - A comma separated list of users and / or artists.
   * @returns {Promise<Array<string>>}
   */
  unfollowUsersOrArtists: async ({ type, ids }) => {
    const queryString = qs.stringify({ type, ids });
    return spotifyApi.request.delete(`/me/following?${queryString}`).then(res => res.data);
  },

  /**
   * Follow a playlist.
   * @async
   * @param {string} playlist_id - The playlist id to follow.
   */
  followPlaylist: async ({ playlist_id }) => {
    return spotifyApi.request.put(`playlists/${playlist_id}/followers`).then(res => res.data);
  },

  /**
   * Unfollow a playlist.
   * @async
   * @param {string} playlist_id - The playlist id to unfollow.
   */
  unfollowPlaylist: async ({ playlist_id }) => {
    return spotifyApi.request.delete(`playlists/${playlist_id}/followers`).then(res => res.data);
  },

  /**
   * Check if the user follow a playlist via it's playlist_id.
   * @async
   * @param {string} playlist_id - The playlist to check following status.
   * @param {string} ids         - A comma separated list of user ids.
   */
  checkUserFollowPlaylist: async ({ playlist_id, ids }) => {
    const queryString = qs.stringify({ ids });
    return spotifyApi.request.get(`playlists/${playlist_id}/followers/contains?${queryString}`).then(res => res.data);
  },
}

exports.handler = async function handler(event) {
  if (!event || !event.method || typeof spotifyApi[event.method] !== 'function') {
   return { error: 'The method property must be a valid and implemented API call, please take a look at the readme.' };
  }

  try {
    return spotifyApi[event.method](event);
  } catch (error) {
    return { error };
  }
};
