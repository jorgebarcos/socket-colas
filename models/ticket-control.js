const path = require('path');
const fs = require('fs');

class Ticket {
    constructor() {
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketControl {

    constructor() {
        this.last = 0;
        this.today = new Date().getDate(); // Obtenemos el día de la fecha actual
        this.tickets = [];
        this.last4 = [];

        this.init();
    }

    get toJSON() {
        return {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4
        }

    }

    init() {
        const { today, tickets, last, last4 } = require('../db/data.json');
        if (today === this.today) {
            this.tickets = tickets;
            this.last = last;
            this.last4 = last4;
        } else {
            this.saveDB();
        }
    }

    saveDB() {

        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJSON));
    }

    nextTicket() {
        this.last += 1;
        const ticket = new Ticket(this.last, null)
        this.tickets.push(this.last);
        this.saveDB();
        return 'Ticket' + ticket.number;
    }

    attendTicket(desktop) {
        // no tenemos tickets
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }
        const numberTicket = this.tickets[0];
        this.tickets.shift();
        const ticket = new Ticket(numberTicket, desktop);
        this.last4.unshift(ticket);
        if (this.last4.length > 4) {
            this.last4.splice(-1, 1);
        }
        this.saveDB();
        return ticket;
    }

}

module.exports = TicketControl;

