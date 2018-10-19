const GenericController = require('./genericController');
const SpotifyService = require('../services/spotifyService');
const SpotifyDTO = require('../dtos/spotifyDTO');
const SpotifyFilter = require('../filters/spotifyFilter');
const SpotifyAssembler = require('../assemblers/spotifyAssembler');

class SpotifyController extends GenericController{

    static getSongs(req, res, next) {
        const filter = new SpotifyFilter();
        filter.fillData(req.query);
        SpotifyController.resolve(next,
			SpotifyService.find(filter), 
			result => { 
				res.status(200).send({
					data: {
						list: SpotifyAssembler.toDTOs(result),
						total: 0,
						offset: 0,
						limit: 0
					}
				}
			)}
		)
    }

}

module.exports = SpotifyController