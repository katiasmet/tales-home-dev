import {observable, action} from 'mobx';
import {filter} from 'lodash';

import {token, logout} from '../auth';

class Users  {

  @observable allUsers = [];
  @observable currentSocketId = ``;
  @observable isSessionStarted = false;
  @observable currentModel = ``;

  @action handleUsers = users => {
    this.allUsers = users;
    this.handleSessionStarted();
    this.handleCurrentModel();
    this.handleFamilyLogOut();
  }

  handleSessionStarted = () => {
    this.allUsers.forEach(user => {
      if (user.socketId === this.currentSocketId) {
        this.isSessionStarted = user.isSessionStarted;
      }
    });
  }

  handleCurrentModel = () => {
    this.allUsers.forEach(user => {
      if (user.socketId === this.currentSocketId) {
        if (user.modelId) this.currentModel = user.modelId;
      }
    });
  }

  handleFamilyLogOut = () => {

    const family = filter(this.allUsers, user => {
      return user.familyId === token.content().sub;
    })[0];

    if (token.content().scope === `family` && !family) {
      logout();
      window.location.href = `/`;
    }

  }

  @action handleJoinUser = user => {
    this.allUsers.push(user);
  }

  @action handleLeaveUser = socketId => {
    this.allUsers = filter(this.allUsers, user => {
      return user.socketId !== socketId;
    });
  }

  @action handleCurrentSocketId = socketId => {
    this.currentSocketId = socketId;
  }

}

export default new Users();
