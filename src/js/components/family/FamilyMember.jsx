import React, {Component, PropTypes} from 'react';
import {inject, observer} from 'mobx-react';

import {Actions} from '../';

@inject(`families`) @observer
class FamilyMember extends Component {

  //bewegend character = figure ?
  actions = [
    {
      _id: this.props._id,
      icon: `fa-trash`,
      handleAction: this.props.families.handleConfirmation
    }
  ];

  handleActions() {

    const {confirmation} = this.props.families;

    if (confirmation) {
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

  render() {

    const {character, firstName} = this.props;
    this.handleActions();

    return (
      <article className='family-member'>

        <figure className={character}>

        </figure>

        <h2>{firstName}</h2>

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