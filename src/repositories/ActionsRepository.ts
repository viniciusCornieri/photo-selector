import Action from '../model/Action';

const actions: Action[] = [];

class ActionsRepository {
  create(action: Action) {
    actions.push(action);
  }

  pop(): Action | null {
    return actions.pop() || null;
  }

  peek(): Action | null {
    if (actions.length) {
      return actions[actions.length - 1];
    }
    return null;
  }
}

export default new ActionsRepository();
