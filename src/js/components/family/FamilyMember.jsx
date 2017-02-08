import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';

import {CharacterGigi, CharacterKiki, CharacterChris} from '../illustrations';
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
      return <CharacterKiki />;
    } else if (character === `chris`) {
      return <CharacterChris />;
    } else {
      return <CharacterGigi />;
    }
  }

  render() {

    const {character, firstName, _id} = this.props;
    this.handleActions();

    return (
      <article className='family-member'>

        <Link to={`/editfamilymember/${_id}`}>

          {this.renderCharacter(character)}

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
