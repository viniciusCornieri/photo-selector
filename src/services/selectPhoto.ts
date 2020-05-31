import fs from 'fs';
import path from 'path';

import pathConfig from '../config/pathConfig';
import actionsRepository from '../repositories/ActionsRepository';
import getNextPhoto from './getNextPhoto';

const action = 'select';

async function selectPhoto(): Promise<void> {
  const file = await getNextPhoto();
  if (file) {
    actionsRepository.create({ action, file });

    const { photosDir, selectedDir } = pathConfig;

    await fs.promises.rename(
      path.resolve(photosDir, file),
      path.resolve(selectedDir, file),
    );
  }
}

export default selectPhoto;
