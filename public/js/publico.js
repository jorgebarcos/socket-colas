
const socket = io();



socket.on('estado-actual', (payload) => {


    console.log(payload)

});

