import Action from '../model/Action';

const actions: Action[] = [];

class ActionsRepository {
  create(action: Action) {
    actions.push(action);
  }

  pop(): Action | null {
    return actions.pop() || null;
  }
}

export default new ActionsRepository();
