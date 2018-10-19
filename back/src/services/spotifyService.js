const Spotify = require('../models/spotify');
const axios = require('axios');
const qs = require('qs');

let moment;
let token;

class SpotifyService{
	static async find(filter) {
		if (!filter.data.name) {
			throw new Error("name is required");
		} else {
			try{
				if (!token | SpotifyService.tokenIsExpired()) {
					moment = Date.now();
					const headers = {
						'Authorization': 'Basic MGM2NDc4NDljMzc3NGVkMWJlMzc4OWMzNzg5MDRjM2Q6ZjY0YzM2MTFmOTAxNGFkOWJiZTlkYTRjZjFmNmMwMWU=',
						'Content-Type': 'application/x-www-form-urlencoded',
					}
					const body = {
						grant_type: 'client_credentials',
					}
					token = (await axios.post('https://accounts.spotify.com/api/token', qs.stringify(body),{headers})).data.access_token;
				}
				const tracksHeaders = { Authorization: `Bearer ${token}` }
				let response = await axios.get("https://api.spotify.com/v1/search?type=track&market=AR&q="+filter.data.name,{headers:tracksHeaders})
				const tracks = response.data.tracks.items.map(item => {
					return {
						id: item.id,
						name: item.name,
					}
				});
				return tracks
			} catch(error) {
				throw error
			}
		}
	}

	static tokenIsExpired(){
		const now = new Date();
		const diff = now - moment;
		const seconds = Math.floor(diff/1000);
		const minutes = Math.floor(seconds/60);
		return minutes > 50;
	}


}

module.exports = SpotifyService