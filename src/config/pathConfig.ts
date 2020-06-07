import path from 'path';

import os from 'os';

function getLocalIpAddress(): string {
  const interfaces = os.networkInterfaces();
  const addresses: string[] = [];
  Object.values(interfaces).forEach(interfacesArray => {
    if (interfacesArray) {
      interfacesArray.forEach(networkInterfaceInfo => {
        if (
          networkInterfaceInfo.family === 'IPv4' &&
          !networkInterfaceInfo.internal
        ) {
          addresses.push(networkInterfaceInfo.address);
        }
      });
    }
  });

  return addresses[0];
}

const port = 3333;

export default {
  photosDir: path.resolve(__dirname, '..', '..', 'tmp', 'photos'),
  selectedDir: path.resolve(__dirname, '..', '..', 'tmp', 'selected'),
  discardedDir: path.resolve(__dirname, '..', '..', 'tmp', 'discarded'),
  port,
  baseUrl: `http://${getLocalIpAddress()}:${port}`,
};
