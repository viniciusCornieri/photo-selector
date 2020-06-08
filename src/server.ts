/* eslint-disable no-console */
import express from 'express';
import HttpServer from 'http';
import createSocket from 'socket.io';

import pathConfig from './config/pathConfig';
import photosRepository from './repositories/PhotosRepository';

import router from './routes';

import selectPhoto from './services/photos/selectPhoto';
import notifyAllUpdateImage from './services/socket/notifyAllUpdateImage';
import discardPhoto from './services/photos/discardPhoto';
import undoAction from './services/photos/undoAction';

const app = express();
const http = HttpServer.createServer(app);
const io = createSocket(http);
app.use(express.json());

app.use(router);

io.on('connection', async socket => {
  console.log('connected');
  const nextPhoto = photosRepository.getNextPhoto();
  if (nextPhoto) {
    socket.emit('update-image', `${pathConfig.baseUrl}/photos/${nextPhoto}`);
  } else {
    socket.emit('no-image');
  }

  const status = photosRepository.getStatus();
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
  console.log(`🚀 Server running at ${pathConfig.baseUrl}`);
});
