const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
    '1043884874324-c6j2mtnspit39tg5mo3nidodglml39q9.apps.googleusercontent.com',
    '5alerPb4b5vnBso9MUlUkOKb',
    'http://localhost:8120/Smonkeyfy/listas'
);

const defaultScope = [
    // 'openid',
    // 'profile',
    // 'email',
    'https://www.googleapis.com/auth/blogger',
    'https://www.googleapis.com/auth/calendar',
];

class GoogleController {

    static getGoogleUrl(req, res, next) {
        const url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: defaultScope
        })
        res.status(200).send({
            data: { url }
        })
    }

    static async getAccessToken(req, res, next) {
        try {
            console.log(req.body)
            const { code } = req.body
            const { tokens } = await oauth2Client.getToken(code)
            oauth2Client.setCredentials(tokens)
            res.status(200).send({
                tokens
            })
        }
        catch (e) {
            console.log(e)
        }
    }
}

module.exports = GoogleController;