import fs from 'fs';
import pathConfig from '../config/pathConfig';

async function getFirstPhoto(): Promise<string | null> {
  const photos = await fs.promises.readdir(pathConfig.photosDir);
  if (photos.length) {
    return photos[0];
  }
  return null;
}

export default getFirstPhoto;
