const GenericAssembler = require('./genericAssembler');
const SpotifyDTO = require('../dtos/spotifyDTO');

class SpotifyAssembler extends GenericAssembler{
	
	static toDTO(entity){
		const dto = new SpotifyDTO();
		GenericAssembler.convertIn(entity,dto.data)
		return dto;
	}

	static toDTOs(entities){
		const list = entities
			.map(entity => SpotifyAssembler.toDTO(entity))
			.map(dto => dto.data)
		return list
	}

};

module.exports = SpotifyAssembler