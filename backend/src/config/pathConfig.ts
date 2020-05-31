import path from 'path';

const port = 3333;

export default {
  photosDir: path.resolve(__dirname, '..', '..', 'tmp', 'photos'),
  selectedDir: path.resolve(__dirname, '..', '..', 'tmp', 'selected'),
  discardedDir: path.resolve(__dirname, '..', '..', 'tmp', 'discarded'),
  port,
  baseUrl: `http://localhost:${port}`,
};
