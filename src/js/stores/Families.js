import {observable, action} from 'mobx';

import {selectByProfessionalId} from '../api/families';
import {content} from '../auth/token';

class Families  {

  @observable isLoading = true;
  @observable allFamilies = [];
  @observable activeCharacter = `A`;

  @action getFamilies = () => {
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

  handleError = error => {
    this.error = error;
  }

  handleLoading = isLoading => {
    this.isLoading = isLoading;
  }

  handleActiveCharacter = character => {
    this.activeCharacter = character;
  }

  handleActiveFamilies = () => {
    //get all objects where first letter == active character
  }

  /*handleFamilyInfo = id => {
    //fetch familymembers, results, familymodels, notes from this family

  }

  handleRemoveFamily = id => {
    //remove members, result, family, familymodels, notes
  }*/

  //search by first letter
  //search through origins, location and name
  //add family
  //remove family
}

export default new Families();
