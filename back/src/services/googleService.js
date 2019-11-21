const {google} = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
    '1043884874324-c6j2mtnspit39tg5mo3nidodglml39q9.apps.googleusercontent.com',
    '5alerPb4b5vnBso9MUlUkOKb',
    'http://localhost:8120/Smonkeyfy/listas'
);

class GoogleService {

    static getAuthURL() {
        return new Promise((resolve, reject) => {
            oauth2Client.generateAuthUrl({
                access_type: 'offline',
            })
        })
    }

}

module.exports = GoogleService