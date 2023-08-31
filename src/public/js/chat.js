const socket = io();

//Para realizar la resolución de una parte, sólo descomentar la que interese
//Los eventos se dividirán en  "message1" para la parte 1 y "message2" para la parte 2 en el backend.

// Primera parte: enviar caracter por caracter.


// const input = document.getElementById('textbox');
// const log = document.getElementById('log')
// input.addEventListener('keyup', evt => {
//     let { key } = evt;
//     evt.target.value = '';
//     socket.emit('message', key)
// })
// socket.on('log', data => {
//     log.innerHTML += data;
// })

const input = document.getElementById('textbox');
const log = document.getElementById('log');

input.addEventListener('keyup', (evt) => {
    if (evt.key === 'Enter') {
        const chatContent = input.value;
        const user = chatContent.split(' ')[0]; // Extrae el ID del usuario
        const message = chatContent.substr(user.length + 7); // Extrae el mensaje
        socket.emit('message', { user, message });
        input.value = '';
    }
});

socket.on('message', (data) => {
    const message = `${data.user} dice: ${data.message}<br>`;
    log.innerHTML += message;
});