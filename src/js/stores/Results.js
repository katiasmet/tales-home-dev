import {observable, action} from 'mobx';
import {find, isEmpty, snakeCase} from 'lodash';
import jsPDF from 'jsPDF';
import moment from 'moment';

import {selectByProfessional, insert, update} from '../api/results';
import {token} from '../auth';
import Models from './Models';
import Families from './Families';
import Notes from './Notes';

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
        /*Models.currentResult = result;*/
      }
    }

  }


  @action handleSubmit = () => {

    if (isEmpty(this.activeResult)) {

      console.log(`insert result`);

      insert({familyModelId: Families.activeFamilyModel._id, result: Models.currentResult})
        .then(result => {
          this.allResults.push(result);
        })
        .catch(error => {
          this.handleError(error.message);
        });
    } else {

      console.log(Models.currentResult);

      console.log(`update result`);
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

  @action handleDownload = id => {
    console.log(`handle download`);
    const doc = new jsPDF();
    Notes.getNote(id);

    const familyModel = find(Families.activeFamily.familymodels, familymodel => {
      return familymodel._id === id;
    });
    const resultDate = moment(familyModel.created).format(`D M YYYY`);

    if (Notes.notesInput) {
      doc.setFont(`helvetica`);
      doc.setTextColor(84, 39, 170);
      doc.setFontSize(20);
      doc.setFontType(`bold`);
      doc.text(`Results - ${Families.activeFamily.name}`, 15, 20);

      doc.setTextColor(168, 168, 168);
      doc.setFontSize(10);
      doc.setFontType(`italic`);
      doc.text(`Model: ${familyModel.name} - ${resultDate}`, 15, 30);

      doc.setTextColor(51, 33, 127);
      doc.setFontSize(10);
      doc.setFontType(`normal`);
      doc.text(`${Notes.notesInput}`, 15, 40);


      const name = snakeCase(`${Families.activeFamily.name}_${familyModel.name}_${resultDate}`);
      doc.save(`${name}.pdf`);
    }
  }


}

export default new Results();
