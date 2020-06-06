import fs from 'fs';
import pathConfig from '../config/pathConfig';
import ActionsRepository from './ActionsRepository';

interface Status {
  missingFiles: number;
  selectedFiles: number;
  discardedFiles: number;
}

let missingPhotos: string[] = [];

fs.promises.readdir(pathConfig.photosDir).then(files => {
  missingPhotos = files.reverse();
});

let selectedPhotos: string[] = [];

fs.promises.readdir(pathConfig.selectedDir).then(files => {
  selectedPhotos = files.reverse();

  selectedPhotos.forEach(file => {
    ActionsRepository.create({ action: 'select', file });
  });
});

let discardedPhotos: string[] = [];

fs.promises.readdir(pathConfig.discardedDir).then(files => {
  discardedPhotos = files.reverse();

  discardedPhotos.forEach(file => {
    ActionsRepository.create({ action: 'discard', file });
  });
});

class PhotosRepository {
  public getNextPhoto(): string | null {
    if (missingPhotos.length) {
      return missingPhotos[missingPhotos.length - 1];
    }
    return null;
  }

  public selectPhoto(): void {
    const file = missingPhotos.pop();
    if (file) {
      selectedPhotos.push(file);
    }
  }

  public undoSelect(): void {
    const file = selectedPhotos.pop();
    if (file) {
      missingPhotos.push(file);
    }
  }

  public discardPhoto(): void {
    const file = missingPhotos.pop();
    if (file) {
      discardedPhotos.push(file);
    }
  }

  public undoDiscard(): void {
    const file = discardedPhotos.pop();
    if (file) {
      missingPhotos.push(file);
    }
  }

  public getStatus(): Status {
    return {
      missingFiles: missingPhotos.length,
      selectedFiles: selectedPhotos.length,
      discardedFiles: discardedPhotos.length,
    };
  }
}

export default new PhotosRepository();
