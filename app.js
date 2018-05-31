var app  = require('./config/server');

var server = app.listen(80, function(){
    console.log('Servidor Online');
});

var io = require('socket.io').listen(server);

app.set('io',io);

io.on('connection', function(socket){
    console.log('Usuário Conectou');
    
    socket.on('disconnect',function(){
        console.log('Usuário Desconectou');
    });
    
    socket.on('msgParaServidor', function(data){
        socket.emit('msgParaCliente', data)
        socket.broadcast.emit('msgParaCliente', data)
        if(+data.apelidoAtualizado == 0){
            socket.emit('participantesParaCliente', {apelido: data.apelido});
            socket.broadcast.emit('participantesParaCliente', {apelido: data.apelido});
        }
    });
});