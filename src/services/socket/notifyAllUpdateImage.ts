import { Server } from 'socket.io';
import pathConfig from '../../config/pathConfig';
import photosRepository from '../../repositories/PhotosRepository';

async function notifyAllUpdateImage(io: Server): Promise<void> {
  const nextPhoto = photosRepository.getNextPhoto();
  if (nextPhoto) {
    io.emit('update-image', `${pathConfig.baseUrl}/photos/${nextPhoto}`);
  } else {
    io.emit('no-image');
  }

  const status = photosRepository.getStatus();
  io.emit('update-status', status);
}

export default notifyAllUpdateImage;
