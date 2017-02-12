import {observable, action} from 'mobx';
import {find, isEmpty} from 'lodash';

import {selectByProfessional, insert, update} from '../api/results';
import {token} from '../auth';
import Models from './Models';
import Families from './Families';

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
        this.allResults = results.results;
      })
      .catch(err => {
        this.handleError(err);
      });
  }

  @action getResult = () => {

    if (this.allResults.length > 0) {
      const result = find(this.allResults, result => {
        return result.familyModelId === Families.activeFamilyModel._id;
      });

      if (result) {
        this.activeResult = result._id;
      }
    }

  }


  @action handleSubmit = () => {

    console.log(Models.currentResult);

    if (isEmpty(this.activeResult)) {
      insert({familyModelId: Families.activeFamilyModel._id, result: Models.currentResult})
        .then(result => {
          this.allResults.push(result);
        })
        .catch(error => {
          this.handleError(error.message);
        });
    } else {
      update({result: Models.currentResult}, this.activeResult)
        .then(result => {
          this.allResults.forEach(availableResult => {
            if (availableResult._id === result._id) availableResult = result;
          });
        })
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
