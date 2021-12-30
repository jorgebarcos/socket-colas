// Referencias html 
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');



const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');

    btnCrear.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnCrear.disabled = true;
});


socket.on('ultimo-ticket', (last) => {
    console.log(last);
    lblNuevoTicket.innerText = 'Ticket ' + last;
})

btnCrear.addEventListener('click', () => {

    socket.emit('siguiente-ticket', null, (ticket) => {
        lblNuevoTicket.innerText = ticket
    });

});