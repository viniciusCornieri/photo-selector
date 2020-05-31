import fs from 'fs';
import path from 'path';

import pathConfig from '../config/pathConfig';
import actionsRepository from '../repositories/ActionsRepository';

const action = 'discard';

async function discardPhoto(file: string): Promise<void> {
  actionsRepository.create({ action, file });

  const { photosDir, discardedDir } = pathConfig;

  await fs.promises.rename(
    path.resolve(photosDir, file),
    path.resolve(discardedDir, file),
  );
}

export default discardPhoto;
