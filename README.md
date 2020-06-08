# Photo Selector

Created to help me and my wife to select our marriage celebration pictures for the album.

## How to use

- Copy your photos to the `./tmp/photos` folder;
- use the command `yarn` to install the dependencies;
- `yarn start` to run the server;
- Access `<your.ip>:3333` to see the photos and `<your.ip>:3333/control` to select or discard the photos;
- selected photos will be located at `./tmp/selected` and the discarded photos at `./tmp/discarded`;
- all paths can be customized at `./src/config/pathConfig.ts`;

## Expected `tmp` folder structure:

![folder_structure](/others/docs/img/folder_structure.png)

## Control view:

at `<your.ip>:3333/control`

![control_view.png](/others/docs/img/control_view.png)


## Technologies used

- NodeJS
- TypeScript
- [Socket.io](https://socket.io/)
