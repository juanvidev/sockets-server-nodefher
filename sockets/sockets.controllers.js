

const socketController = (socket) => {
    console.log("Client connected!", socket.id);

    socket.on('disconnect', eventDisconnect);

    // socket.on('send-msg', (payload) => {
    //     this.io.emit('send-msg', payload.msg);    //Responde a todos los sockets incluyendo el que emite el cliente que emite el evento.
    //     console.log("Se envio a todos los sockets");
    // })

    socket.on('send-msg', (payload, callback) => {

        const id = 1235;
        callback(id);
        socket.broadcast.emit('send-msg', payload);

    })


}

const eventDisconnect = (socket) => {
    console.log("Client disconnect", socket.id);

}


module.exports = {
    socketController
}