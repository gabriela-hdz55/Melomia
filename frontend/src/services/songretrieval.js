import lyricApiClient from "./lyricapi";

export async function fetchLyrics(artist, song, { signal } = {}) {
    try {
        const response = await lyricApiClient.get(
            `/lyrics/?artist=${encodeURIComponent(artist)}&song=${encodeURIComponent(song)}`,
            { signal }
        );
        return response.data;
    } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
            console.error('Error fetching lyrics:', error.response ? error.response.data : error.message);
        }
        throw error;
    }
}

export async function fetchSongMetadata(artist, song) {
    try {
        const response = await lyricApiClient.get(`/metadata/?artist=${encodeURIComponent(artist)}&song=${encodeURIComponent(song)}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching song metadata:', error.response ? error.response.data : error.message);
        throw error;
    }
}
