import {observable, action} from 'mobx';

import {selectByProfessionalId} from '../api/families';
import {content} from '../auth/token';

class Families  {

  constructor() {
    this.handleLoading(true);

    selectByProfessionalId({professionalId: content().sub})
      .then(data => {
        this.allFamilies = data.families;
        this.handleLoading(false);
      })
      .catch(err => {
        this.handleError(err);
      });
  }

  @observable isLoading = true;
  @observable allFamilies = [];
  @observable activeCharacter = `A`;

  handleError = error => {
    this.error = error;
  }

  handleLoading = isLoading => {
    console.log(`handle loading`);
    this.isLoading = isLoading;
  }

  handleActiveCharacter = character => {
    this.activeCharacter = character;
  }

  //search by first letter
  //search through origins, location and name
  //add family
  //remove family

  @action searchByFirstLetter = () => {

  }
}

export default new Families();
