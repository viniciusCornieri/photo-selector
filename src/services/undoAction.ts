import fs from 'fs';
import path from 'path';

import pathConfig from '../config/pathConfig';
import Action from '../model/Action';
import actionsRepository from '../repositories/ActionsRepository';

async function undoAction(): Promise<Action | null> {
  const lastAction = actionsRepository.pop();

  if (lastAction) {
    const { action, file } = lastAction;

    const { photosDir, selectedDir, discardedDir } = pathConfig;
    const actionDir = action === 'select' ? selectedDir : discardedDir;

    await fs.promises.rename(
      path.resolve(actionDir, file),
      path.resolve(photosDir, file),
    );
  }
  return lastAction;
}

export default undoAction;
