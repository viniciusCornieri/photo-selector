import fs from 'fs';
import pathConfig from '../config/pathConfig';

interface Status {
  missingFiles: number;
  selectedFiles: number;
  discardedFiles: number;
}

async function getStatus(): Promise<Status> {
  const discardedFiles = (await fs.promises.readdir(pathConfig.discardedDir))
    .length;
  const selectedFiles = (await fs.promises.readdir(pathConfig.selectedDir))
    .length;
  const missingFiles = (await fs.promises.readdir(pathConfig.photosDir)).length;
  return { discardedFiles, selectedFiles, missingFiles };
}

export default getStatus;
