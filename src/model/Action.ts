class Action {
  action: 'select' | 'discard';

  file: string;

  constructor({ action, file }: Action) {
    this.action = action;
    this.file = file;
  }
}

export default Action;
