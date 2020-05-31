import express from 'express';
import HttpServer from 'http';
import createSocket from 'socket.io';

import router from './routes';
import getNextPhoto from './services/getNextPhoto';
import pathConfig from './config/pathConfig';
import getStatus from './services/getStatus';
import selectPhoto from './services/selectPhoto';
import notifyAllUpdateImage from './services/socket/notifyAllUpdateImage';
import discardPhoto from './services/discardPhoto';
import undoAction from './services/undoAction';

const app = express();
const http = HttpServer.createServer(app);
const io = createSocket(http);
app.use(express.json());

app.use(router);

io.on('connection', async socket => {
  console.log('connected');
  const nextPhoto = await getNextPhoto();
  if (nextPhoto) {
    socket.emit('update-image', `${pathConfig.baseUrl}/photos/${nextPhoto}`);
  } else {
    socket.emit('no-image');
  }

  const status = await getStatus();
  socket.emit('update-status', status);

  socket.on('select', async () => {
    console.log('select');
    await selectPhoto();

    notifyAllUpdateImage(io);
  });

  socket.on('discard', async () => {
    console.log('discard');
    await discardPhoto();

    notifyAllUpdateImage(io);
  });

  socket.on('undo', async () => {
    console.log('undo');
    await undoAction();

    notifyAllUpdateImage(io);
  });
});

http.listen(pathConfig.port, () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Server started!');
});
