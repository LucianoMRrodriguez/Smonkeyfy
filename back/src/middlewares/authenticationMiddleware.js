const jwtDecode = require('jwt-decode');

class AuthenticationMiddleware{

    static isLogged(req, res, next){
		const token = req.headers['authorization']
		if (token) {
			const decoded = jwtDecode(token.split(" ")[1]);
			req.body.usuario = decoded.username;
			next();
		}
		else {
			const error = new Error('logeate gil');
			error.status = 401;
			next(error);
		}
    }
  
}

module.exports = AuthenticationMiddleware