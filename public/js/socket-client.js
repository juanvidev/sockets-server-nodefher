//Ref html
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline')
const txtInput = document.querySelector('#txtInput');
const btnSend = document.querySelector('#btnSend');
const messageRecived = document.querySelector('#messageRecived');
const messagesSent = document.querySelector('#messagesSent');
const messagesParent = document.querySelector('#messagesParent');

const socketClient = io();

socketClient.on('connect', () => {
    console.log("connected listener");
    lblOffline.style.display = 'none';
    lblOnline.style.display = ''
});

socketClient.on('disconnect', () => {
    console.log("disconnected listener");
    lblOnline.style.display = 'none'
    lblOffline.style.display = ''
});

btnSend.addEventListener('click', () => {
    const msg = txtInput.value;
    const newMessage = document.createElement('p');
    newMessage.style.textAlign = 'right';
    newMessage.innerHTML = msg;
    messagesParent.append(newMessage);
    const payload = {
        msg,
        id: 'asDF3Rsd34',
        date: new Date().getTime()
    }

    socketClient.emit('send-msg', payload, (id) => {
        console.log("El server respondio: ", id);
    });
    txtInput.value = '';
})

socketClient.on('send-msg', (payload) => {
    console.log(payload);
    const newMessageFromOut = document.createElement('p');
    newMessageFromOut.innerHTML = payload.msg;
    messagesParent.append(newMessageFromOut);
})