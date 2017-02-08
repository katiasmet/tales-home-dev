import {observable, action} from 'mobx';
import {filter, isEmpty} from 'lodash';

import {selectByProfessional, insert, update} from '../api/results';
import {token} from '../auth';
import models from './Models';
import families from './Families';

class Results  {

  @observable allResults = [];
  @observable activeResult = [];

  @action handleNoteRemove = id => {
    console.log(`remove results`);
    console.log(id);
  }

  @action getResults = () => {
    selectByProfessional({professionalId: token.content().sub})
      .then(results => {
        this.allResults = results;
      })
      .catch(err => {
        this.handleError(err);
      });
  }

  @action getResult = () => {

    if (this.allResults.length > 0) {
      const result = filter(this.allResults, result => {
        return result.familyModelId === families.activeFamilyModel._id;
      })[0][0];

      if (result) {
        this.activeResult = result._id;
      }
    }

  }


  @action handleSubmit = () => {

    if (isEmpty(this.activeResult)) {
      insert({familyModelId: families.activeFamilyModel._id, result: models.currentResult})
        .catch(error => {
          this.handleError(error.message);
        });
    } else {
      update({result: models.currentResult}, this.activeResult)
        .catch(error => {
          this.handleError(error.message);
        });
    }

  }

  @action handleError = error => {
    this.error = error;
  }


}

export default new Results();
