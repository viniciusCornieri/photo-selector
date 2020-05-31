import fs from 'fs';
import pathConfig from '../config/pathConfig';

async function countSelected(): Promise<number> {
  const selectedFiles = await fs.promises.readdir(pathConfig.selectedDir);
  return selectedFiles.length;
}

export default countSelected;
