import express, { Router } from 'express';
import path from 'path';

import pathConfig from './config/pathConfig';

const router = Router();

router.use('/photos', express.static(pathConfig.photosDir));
router.use('/selected', express.static(pathConfig.selectedDir));
router.use('/discarded', express.static(pathConfig.discardedDir));

router.get('/', (_request, response) => {
  response.sendFile(path.resolve(__dirname, 'views', 'index.html'));
});

router.get('/control', (_request, response) => {
  response.sendFile(path.resolve(__dirname, 'views', 'control.html'));
});

export default router;
