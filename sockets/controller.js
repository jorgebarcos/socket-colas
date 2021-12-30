const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();


const socketController = (socket) => {

    socket.emit('ultimo-ticket', ticketControl.last)


    socket.on('siguiente-ticket', (payload, callback) => {



        const next = ticketControl.nextTicket();

        callback(next);

        // TODO: Notificar que hay u n nuevo ticket pendiente de asignar

    })

}



module.exports = {
    socketController
}

