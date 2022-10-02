const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/sockets.controllers');

class Server {

    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.server = require('http').createServer(this.app);

        this.io = require('socket.io')(this.server);

        //Middlewares
        this.middlewares();

        //Routas de la app
        this.routes();

        //Sockets
        this.sockets();
    }

    middlewares() {
        this.app.use(cors()); // CORS
        this.app.use(express.static("public")); // Directorio publico (carpeta)
    }

    routes() {
        // this.app.use('/api/auth', require('../routes/user-auth'));
    }

    sockets() {
        this.io.on('connection', socketController);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log("Server listening on port " + this.port);
        })
    }

}

module.exports = Server;