// Referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button')


const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es oblogatorio');
}

const escritorio = searchParams.get('escritorio'); const socket = io();
lblEscritorio.innerText = escritorio


socket.on('connect', () => {


    btnAtender.disabled = false;

});

socket.on('disconnect', () => {


    btnAtender.disabled = true;
});


socket.on('ultimo-ticket', (last) => {

    // lblNuevoTicket.innerText = 'Ticket ' + last;
})

btnAtender.addEventListener('click', () => {

    // socket.emit('siguiente-ticket', null, (ticket) => {
    //     lblNuevoTicket.innerText = ticket
    // });

});