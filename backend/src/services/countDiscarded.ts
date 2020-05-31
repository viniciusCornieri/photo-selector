import fs from 'fs';
import pathConfig from '../config/pathConfig';

async function countDiscarded(): Promise<number> {
  const discardedFiles = await fs.promises.readdir(pathConfig.discardedDir);
  return discardedFiles.length;
}

export default countDiscarded;
