const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongsInPlaylist(playlistId) {
    // console.log(playlistId);
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer
        FROM playlistsongs
        LEFT JOIN songs ON songs.id = playlistsongs.song_id
        WHERE playlist_id = $1`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    // console.log(result.rows);
    return result.rows;
  }
}

module.exports = PlaylistsService;
