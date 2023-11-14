const io = require('socket.io')(4000, { cors: { origin: "http://localhost:8000" } })

io.on('connection', (socket) => {
    socket.emit('connection', socket.id)
    socket.on('send_message', (message) => {
        console.log(message.user)
        socket.to(message.user).emit('recieve_message', message.message)
    })
    socket.on('join', user => {
        socket.join(user)
    })
})

io.use((socket, next) => {
    if (socket.handshake.auth.username) {
        socket.username = socket.handshake.auth.username
        next()
    }
    else {
        next(new Error('error : no username'))
    }
})