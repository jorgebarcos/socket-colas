// Referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button')
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');




const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es oblogatorio');
}

const escritorio = searchParams.get('escritorio'); const socket = io();
lblEscritorio.innerText = escritorio
divAlerta.style.display = 'none';


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



    socket.emit('atender-ticket', { escritorio }, ({ ok, ticket, msg }) => {
        if (!ok) {
            lblTicket.innerText = 'Nadie';
            return divAlerta.style.display = '';
        }

        lblTicket.innerText = `Ticket ${ticket.number}`;
    })


});