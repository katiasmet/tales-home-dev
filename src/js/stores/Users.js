import {observable, action} from 'mobx';
import {filter} from 'lodash';

class Users  {

  @observable allUsers = [];
  @observable currentSocketId = ``;

  @action handleUsers = users => {
    this.allUsers = users;
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
