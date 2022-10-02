//Ref html
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline')
const txtInput = document.querySelector('#txtInput');
const btnSend = document.querySelector('#btnSend');

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
})