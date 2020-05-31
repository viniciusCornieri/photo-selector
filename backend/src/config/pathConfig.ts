import path from 'path';

export default {
  photosDir: path.resolve(__dirname, '..', '..', 'tmp', 'photos'),
  selectedDir: path.resolve(__dirname, '..', '..', 'tmp', 'selected'),
  discardedDir: path.resolve(__dirname, '..', '..', 'tmp', 'discarded'),
};
