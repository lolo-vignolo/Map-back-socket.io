const MarkList = require('./mark-list');

class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
    this.markList = new MarkList();
  }

  socketEvents() {
    //TODO: mostrar todo los marcadores

    //TODO: crear un nuevo marcador

    //TODO: mover un marcador

    //on conecta el socket
    this.io.on('connection', (socket) => {
      console.log('a user connected');
      //escuchar (recibir /enviar) envento: mensaje-to-server
      socket.on('mensaje-to-server', (data) => {
        console.log(data.texto);
        this.io.emit('mensaje-from-server', data);
      });

      //envío todos los marcadores
      socket.emit('allMarks', this.markList.markList);

      socket.on('newMark', (data) => {
        this.markList.createMark(data);
        // este es el evento que se emite a todos los sockets de usuarios, menos al mio ya que en el mapa ya lo cree con el frot
        socket.broadcast.emit('newMark', data);
      });

      socket.on('moveMark', (data) => {
        this.markList.moveMark(data);
        socket.broadcast.emit('moveMark', data);
      });
    });
  }
}

module.exports = Sockets;
