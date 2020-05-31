import { Server } from 'socket.io';
import pathConfig from '../../config/pathConfig';
import getNextPhoto from '../getNextPhoto';
import getStatus from '../getStatus';

async function notifyAllUpdateImage(io: Server): Promise<void> {
  const nextPhoto = await getNextPhoto();
  if (nextPhoto) {
    io.emit('update-image', `${pathConfig.baseUrl}/photos/${nextPhoto}`);
  } else {
    io.emit('no-image');
  }

  const status = await getStatus();
  io.emit('update-status', status);
}

export default notifyAllUpdateImage;
