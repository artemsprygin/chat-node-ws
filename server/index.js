const server = require('ws').Server;
const s = new server({port: 5001});

s.on('connection',(ws) => {
  ws.on('message',(message) => {

    message = JSON.parse(message);

    if (message.type == 'name'){
        ws.personName = message.data
        return;
    }

    console.log('From ' + message.data + ' recieved');
    // if (message == 'hello') {
    //   ws.send('hi from server');
    // }
    s.clients.forEach(function e(client) {
      if (client != ws)
      client.send(JSON.stringify({
        name: ws.personName,
        data: message.data
      }));
    });
    // ws.send('From server: ' + message);
  });
  ws.on('close',() => {
    console.log('I lost a client');
  });
  console.log('one more client connected');
});
