const express = require('express');
const app = express();

//Trabalha com o http nátivo do node e faz o express e o socket.io rodar no mesmo servidor http.
const http = require('http').createServer(app)
const io = require('socket.io')(http) //io é o servidor

app.set('view engine', 'ejs');

const routes = require('./route')
app.use(routes)

//Conexã0 do cliente com o socket
io.on('connection', (socket) => {

    //Detecta cliente desconectado
    socket.on('disconnect', () => {
        console.log('X desconectou: ' + socket.id)
    })

    socket.on('msg', (data) => {

        //Envia novamente para o frontend a msg envida.
        io.emit('showmsg', data)
        //socket.broadcast.emit('showmsg', data) -> Msg é enviado a todos os sockets (clientes), menos ao socket que a enviou.
        
        console.log(data)
    })
})

http.listen(3131, () => {
    console.log('App rodando!')
    console.log('http://localhost:3131')
})