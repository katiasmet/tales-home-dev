import {observable, action} from 'mobx';
import {filter} from 'lodash';

import {token, logout} from '../auth';
import Models from './Models';

class Users  {

  @observable allUsers = [];
  @observable currentSocketId = ``;
  @observable isSessionStarted = false;
  @observable currentModelId = ``;
  @observable totalFamilyMembers = 0;

  @action handleUsers = users => {

    this.allUsers = users;
    this.handleSessionStarted();
    this.handleCurrentModel();
    this.handleCurrentLanguage();
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
        if (user.modelInfo) Models.draggableCharacters = user.modelInfo;
      } else if (token.content().scope === `family` && user.familyId === token.content().sub) { /* FAMILY-SIDE */
        if (user.modelInfo)  Models.draggableCharacters = user.modelInfo;
        if (user.modelId) Models.getModel(user.modelId);
        else Models.handleCleanModel();
      }
    });
  }

  handleCurrentLanguage = () => {
    this.allUsers.forEach(user => {
      if (token.content().scope === `family` && user.familyId === token.content().sub) { /* FAMILY-SIDE */
        if (user.currentLanguage) Models.currentLanguage = user.currentLanguage;
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
