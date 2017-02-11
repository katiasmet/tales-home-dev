import React, {Component} from 'react';
import {Provider} from 'mobx-react';
import io from 'socket.io-client';

import Router from '../router/';
import stores from '../stores';
import {isLoggedIn, token} from '../auth';

class App extends Component {

  componentDidMount() {
    this.initSockets();
  }

  initSockets() {
    this.socket = io(`/`);
    this.socket.on(`init`, this.handleWSInit);
    this.socket.on(`leave`, this.handleWSLeave);
    this.socket.on(`join`, this.handleWSJoin);
    this.socket.on(`recheck`, this.handleWSRecheck);
  }

  handleWSInit = users => {

    const {handleUsers} = stores.users;
    handleUsers(users);

    if (isLoggedIn() === `professional`) {

      const {id: socketId} = this.socket;
      const {handleCurrentSocketId} = stores.users;
      handleCurrentSocketId(socketId);
      this.socket.emit(`setProfessionalId`, socketId, token.content().sub);
    }

  }

  handleWSJoin = user => {
    const {handleJoinUser} = stores.users;
    handleJoinUser(user);
  }

  handleWSLeave = socketId => {
    const {handleLeaveUser} = stores.users;
    handleLeaveUser(socketId);
  }

  handleWSRecheck = newUsers => {
    const {handleUsers} = stores.users;
    handleUsers(newUsers);
  }

  render() {
    return (
      <Provider
        users={stores.Users}
        formLogin={stores.FormLogin}
        formRegister={stores.FormRegister}
        formEditUser={stores.FormEditUser}
        formJoin={stores.FormJoin}
        formAddFamily={stores.FormAddFamily}
        formAddFamilyMember={stores.FormAddFamilyMember}
        formEditFamilyMember={stores.FormEditFamilyMember}
        families={stores.Families}
        models={stores.Models}
        notes={stores.Notes}
        results={stores.Results}
        languages={stores.Languages}
      >

        <Router />

      </Provider>
    );
  }

}

export default App;
