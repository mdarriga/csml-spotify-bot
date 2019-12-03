# Spotify csml integration

## Description
A simple bot to manage your saved albums / playlist / tracks and to find music on spotify.

Can also find lyrics if you provide a musixmatch api key in the environment.

## Usage
Copy / paste all flows on [studio csml](studio.csml.dev) and name them as the file name.

Required environment variables:

- `SPOTIFY_TOKEN` - An oauth token (This will change once CSML handles Oauth natively)
- `MUSIXMATCH_APIKEY` - To enable the "Trouver les paroles" feature.
