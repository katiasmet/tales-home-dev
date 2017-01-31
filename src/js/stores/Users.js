import {observable, action} from 'mobx';
import {filter} from 'lodash';

class Users  {

  @observable allUsers = [];

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

}

export default new Users();
