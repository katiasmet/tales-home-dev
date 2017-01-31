import React, {Component} from 'react';
import {Provider} from 'mobx-react';
import io from 'socket.io-client';

import Router from '../router/';
import stores from '../stores';
import {isLoggedIn} from '../auth';

class App extends Component {

  componentDidMount() {
    this.initSockets();
  }

  initSockets() {
    this.socket = io(`/`);
    this.socket.on(`init`, this.handleWSInit); //ME
    this.socket.on(`leave`, this.handleWSLeave);
    this.socket.on(`join`, this.handleWSJoin); //OTHER USERS
    this.socket.on(`recheck`, this.handleWSRecheck);
  }

  handleWSInit = users => {

    const {handleUsers} = stores.users;
    handleUsers(users);

    if (isLoggedIn()) {
      const {id: socketId} = this.socket;
      this.socket.emit(`setProfessionalId`, socketId, `blub`);
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
        formLogin={stores.formLogin}
        formRegister={stores.formRegister}
        formEditUser={stores.formEditUser}
        formAddFamily={stores.formAddFamily}
        families={stores.families}
        models={stores.models}
        notes={stores.notes}
        results={stores.results}
      >

        <Router />

      </Provider>
    );
  }

}

export default App;
