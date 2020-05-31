import express from 'express';
import path from 'path';

import pathConfig from './config/pathConfig';
import getNextPhoto from './services/getNextPhoto';
import selectPhoto from './services/selectPhoto';
import discardPhoto from './services/discardPhoto';
import undoAction from './services/undoAction';

const app = express();

app.use(express.json());

app.use('/photos', express.static(pathConfig.photosDir));

app.use(async (request, response, next) => {
  const firstPhoto = await getNextPhoto();

  if (firstPhoto == null) {
    return response.status(204).send();
  }

  request.firstPhoto = firstPhoto;

  return next();
});

app.get('/next', async (request, response) => {
  const { firstPhoto } = request;

  return response.sendFile(path.resolve(pathConfig.photosDir, firstPhoto));
});

app.post('/select', async (request, _response, next) => {
  const { firstPhoto } = request;

  await selectPhoto(firstPhoto);

  return next();
});

app.post('/discard', async (request, _response, next) => {
  const { firstPhoto } = request;

  await discardPhoto(firstPhoto);

  return next();
});

app.post('/undo', async (_request, response, next) => {
  const action = await undoAction();
  if (action) {
    return next();
  }
  return response.status(204).send();
});

app.use(async (_request, response) => {
  const nextPhoto = await getNextPhoto();

  if (nextPhoto == null) {
    return response.status(204).send();
  }

  return response.sendFile(path.resolve(pathConfig.photosDir, nextPhoto));
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Server started!');
});
