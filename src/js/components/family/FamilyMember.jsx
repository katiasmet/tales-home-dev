import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';

import {CharacterGigiMother, CharacterKikiChild, CharacterChrisFather} from '../illustrations';
import {Actions} from '../';

@inject(`families`) @observer
class FamilyMember extends Component {

  actions = [
    {
      _id: this.props._id,
      icon: `fa-trash`,
      handleAction: this.props.families.handleConfirmation
    }
  ];

  handleActions() {

    const {confirmation} = this.props.families;

    if (confirmation === this.props._id) {
      this.actions = [
        {
          _id: this.props._id,
          icon: `fa-check`,
          handleAction: this.props.families.handleFamilyMemberRemove
        },
        {
          _id: this.props._id,
          icon: `fa-close`,
          handleAction: this.props.families.handleConfirmation
        }
      ];
    } else {
      this.actions = [
        {
          _id: this.props._id,
          icon: `fa-trash`,
          handleAction: this.props.families.handleConfirmation
        }
      ];

    }

  }

  renderCharacter(character) {

    if (character === `kiki`) {
      return <CharacterKikiChild />;
    } else if (character === `chris`) {
      return <CharacterChrisFather />;
    } else {
      return <CharacterGigiMother />;
    }
  }

  render() {

    const {character, firstName, _id} = this.props;
    this.handleActions();

    return (
      <article className={`family-member ${character}`}>

        <Link to={`/editfamilymember/${_id}`}>

          <span className='family-member-character'>
            {this.renderCharacter(character)}
          </span>

          {firstName}
        </Link>

        <Actions actionClass='familymember-actions' actions={this.actions} />

      </article>
    );
  }


}

FamilyMember.propTypes = {
  families: PropTypes.shape({
    confirmation: PropTypes.bool,
    handleConfirmation: PropTypes.func,
    handleFamilyMemberRemove: PropTypes.func
  }),
  character: PropTypes.string,
  firstName: PropTypes.string,
  _id: PropTypes.string
};

export default FamilyMember;
