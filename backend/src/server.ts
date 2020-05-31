import express from 'express';

import pathConfig from './config/pathConfig';
import getFirstPhoto from './services/getFirstPhoto';
import selectPhoto from './services/selectPhoto';
import discardPhoto from './services/discardPhoto';
import undoAction from './services/undoAction';

const app = express();

app.use(express.json());

app.use('/photos', express.static(pathConfig.photosDir));

app.use(async (request, response, next) => {
  const firstPhoto = await getFirstPhoto();

  if (firstPhoto == null) {
    return response.status(204).send();
  }

  request.firstPhoto = firstPhoto;

  return next();
});

app.get('/first', async (request, response) => {
  const { firstPhoto } = request;

  return response.json({ href: `http://localhost:3333/photos/${firstPhoto}` });
});

app.post('/select', async (request, response) => {
  const { firstPhoto } = request;

  await selectPhoto(firstPhoto);

  return response.json({
    selected: `http://localhost:3333/photos/${firstPhoto}`,
  });
});

app.post('/discard', async (request, response) => {
  const { firstPhoto } = request;

  await discardPhoto(firstPhoto);

  return response.json({
    discarded: `http://localhost:3333/photos/${firstPhoto}`,
  });
});

app.post('/undo', async (request, response) => {
  const action = await undoAction();

  return response.json(action);
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Server started!');
});
