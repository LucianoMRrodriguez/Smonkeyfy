const express = require('express');
const bodyParser = require('body-parser');
//<import-routes>
const listaRouter = require('./routes/listaRouter')
const spotifyRouter = require('./routes/spotifyRouter')
//</import-routes>
const app = express();
const server = require('http').Server(app);
const socket = require('./sockets/listaWebSocket').config(server);


//middleware
    //body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
    //cors
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept')
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    next()
})

//<routes>
app.use('/listas', listaRouter)
app.use('/spotify', spotifyRouter)
//</routes>

//erros
app.use((req, res, next) => {
    const error = new Error('Not found.')
    error.status = 404
    next(error)
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send({
        message: err.message
    })
})


module.exports = server;