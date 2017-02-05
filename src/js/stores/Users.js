import {observable, action} from 'mobx';
import {filter} from 'lodash';

import {token, logout} from '../auth';
import models from './Models';

class Users  {

  @observable allUsers = [];
  @observable currentSocketId = ``;
  @observable isSessionStarted = false;
  @observable currentModelId = ``;

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
      if (user.socketId === this.currentSocketId) { /* PRO-SIDE */
        if (user.modelId) this.currentModelId = user.modelId;
        if (user.modelInfo) models.draggableCharacters = user.modelInfo;
      } else if (token.content().scope === `family` && user.familyId === token.content().sub) { /* FAMILY-SIDE */
        if (user.modelId) models.getModel(user.modelId);
        else models.handleCleanModel();
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
