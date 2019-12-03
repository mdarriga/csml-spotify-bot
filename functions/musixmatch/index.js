const Musixmatch = require('musixmatch-node')
const mxm = new Musixmatch(process.env.MUSIXMATCH_APIKEY)

const musixMatch = {
  getLyrics: async (event) => {
    const lyrics = await mxm.getLyricsMatcher({
      q_track: event.track || '',
      q_artist: event.artist || '',
    })

    if (lyrics.message.body.lyrics) return lyrics.message.body.lyrics.lyrics_body;
    if (lyrics.message.header.status_code === 404) throw new Error("Désolé, nous n'avons pas trouvé de son correspondant.");
  }
}

exports.handler = async function handler(event) {
  if (!event || !event.method || typeof musixMatch[event.method] !== 'function') {
   return { error: 'The method property must be a valid and implemented API call, please take a look at the readme.' };
  }

  try {
    return musixMatch[event.method](event);
  } catch (error) {
    return { error };
  }
};
