const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();


const socketController = (socket) => {

    socket.emit('ultimo-ticket', ticketControl.last)
    socket.emit('estado-actual', ticketControl.last4)


    socket.on('siguiente-ticket', (payload, callback) => {



        const next = ticketControl.nextTicket();

        callback(next);

        // TODO: Notificar que hay u n nuevo ticket pendiente de asignar

    })

    socket.on('atender-ticket', ({ escritorio }, callback) => {

        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            })
        }

        const ticket = ticketControl.attendTicket(escritorio);

        socket.emit('estado-actual', ticketControl.last4);

        if (!ticket) {
            return callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            })
        } else {
            callback({
                ok: true,
                ticket
            })
        }
    })

}



module.exports = {
    socketController
}

