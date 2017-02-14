import {observable, action} from 'mobx';
import {filter, find} from 'lodash';
import io from 'socket.io-client';

import {token, logout} from '../auth';
import Models from './Models';

class Users  {

  socket = io(`/`);
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
    this.handleOnboarding();
    this.handleFamilyLogOut();

  }

  handleSessionStarted = () => {

    const user = find(this.allUsers, user => {
      return user.socketId === this.currentSocketId;
    });

    if (user) this.isSessionStarted = user.isSessionStarted;

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

  handleOnboarding = () => {
    this.allUsers.forEach(user => {
      if (user.socketId === this.currentSocketId || (token.content().scope === `family` && user.familyId === token.content().sub)) {
        Models.onboarding = user.onboarding;
      }
    });
  }

  handleFamilyLogOut = () => {

    /* if professional refreshes page, force to start a new session by redirecting */
    const family = find(this.allUsers, user => {
      return user.familyId === token.content().sub;
    });

    if (token.content().scope === `family` && !family) {
      logout();
      window.location.href = `/`;
      this.socket.emit(`handlePageRefresh`, token.content().sub);
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
