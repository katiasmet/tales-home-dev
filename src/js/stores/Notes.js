import {observable, action} from 'mobx';
import {find, isEmpty} from 'lodash';
import io from 'socket.io-client';

import {selectByProfessional, insert, update} from '../api/notes';
import {token} from '../auth';
import Families from './Families';
import Results from './Results';
import Users from './Users';

class Notes  {

  socket = io(`/`);
  @observable allNotes = [];
  @observable notesInput = ``;
  @observable redirect = false;
  @observable error = ``;
  @observable isLoadingNotes = false;
  @observable activeNote = ``;
  @observable showNotes = true;

  @action handleNoteRemove = id => {
    console.log(`remove notes`);
    console.log(id);
  }

  @action getNotes = () => {
    this.isLoadingNotes = true;
    selectByProfessional({professionalId: token.content().sub})
      .then(notes => {
        this.allNotes = notes.notes;
        this.isLoadingNotes = false;
      })
      .catch(err => {
        this.handleError(err);
      });
  }

  @action getNote = id => {

    this.isLoadingNotes = true;

    let familyModelId;
    if (id) familyModelId = id;
    else Families.activeFamilyModel._id;

    if (this.allNotes.length > 0) {
      const note = find(this.allNotes, note => {
        return note.familyModelId === familyModelId;
      });

      if (note) {
        this.activeNote = note._id;
        this.notesInput = note.notes;
      }
    }

    this.isLoadingNotes = false;

  }

  @action handleNotes = e => {
    this.notesInput = e.target.value;
  }

  @action handleSubmit = e => {

    e.preventDefault();
    if (isEmpty(this.activeNote)) {

      console.log(this.notesInput);

      insert({familyModelId: Families.activeFamilyModel._id, notes: this.notesInput})
        .then(note => {
          this.redirect = true;
          this.allNotes.push(note);
        })
        .catch(error => {
          this.handleError(error.message);
        });
    } else {

      console.log(this.activeNote);
      console.log(`update`);

      console.log(this.notesInput);

      update({notes: this.notesInput}, this.activeNote)
        .then(note => {
          this.allNotes.forEach(availableNote => {
            if (availableNote._id === note._id) availableNote = note;
          });
          this.redirect = true;
        })
        .catch(error => {
          this.handleError(error.message);
        });
    }

    Results.handleSubmit();
    Families.handleConfirmation();

    this.socket.emit(`stopModel`, Users.currentSocketId);

  }

  @action handleRedirect = () => {
    if (this.redirect) this.redirect = false;
  }

  @action handleError = error => {
    this.error = error;
  }

  @action handleCloseNotes = () => {
    this.showNotes = false;
  }

  @action handleOpenNotes = () => {
    this.showNotes = true;
  }

}

export default new Notes();
