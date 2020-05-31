import fs from 'fs';
import path from 'path';

import pathConfig from '../config/pathConfig';
import actionsRepository from '../repositories/ActionsRepository';

const action = 'select';

async function selectPhoto(file: string): Promise<void> {
  actionsRepository.create({ action, file });

  const { photosDir, selectedDir } = pathConfig;

  await fs.promises.rename(
    path.resolve(photosDir, file),
    path.resolve(selectedDir, file),
  );
}

export default selectPhoto;
