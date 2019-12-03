
# Musixmatch integration

## Description
Use the [musixmatch api](https://github.com/musixmatch/musixmatch-sdk) to find and retrieve songs and lyrics

## Usage
Required environment variables:

-  `MUSIXMATCH_APIKEY`

```rust
use Fn("musixmatch", method="getLyrics", artist="Eagles", track="Hotel California")
```
