import {observable, action} from 'mobx';

class User {
  @observable activeUser = ({
    id: ``
  });

  @observable userLogin = ({
    email: ``,
    password: ``,
    error: ``,
    redirect: false
  });

  @observable userRegister = ({
    email: ``,
    password: ``,
    error: ``,
    redirect: false
  })

  @action update(observable, key, value) {

    if (observable === `userLogin`) {
      this.userLogin[key] = value;
    } else if (observable === `userRegister`) {
      this.userRegister[key] = value;
    } else {
      this.activeUser[key] = value;
    }

  }
}

export default new User();
