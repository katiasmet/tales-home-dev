import React, {PropTypes, Component} from 'react';
import {inject, observer} from 'mobx-react';

import {FamilyInfo} from './';
import {Actions} from '../../';

@inject(`families`) @observer
class FamilyItem extends Component {

  show = false;

  actions = [
    {
      _id: this.props._id,
      icon: `fa-trash`,
      handleAction: this.props.families.handleFamilyRemove
    },
    {
      _id: this.props._id,
      icon: `fa-close`,
      handleAction: this.props.families.handleFamilyInfo
    },
    {
      _id: this.props._id,
      icon: `fa-caret-right`,
      handleAction: this.props.families.handleFamilySession
    }
  ];

  render() {

    const {name, origins, homeLocation} = this.props;

    return (
        <section className='family-item'>
          <header>

            <h2>{name}</h2>

            <Actions actionClass='family-actions' actions={this.actions} />

          </header>

          <p>Comes from {origins} - Lives in {homeLocation}</p>

          {this.show && <FamilyInfo />}

        </section>
    );
  }
}

FamilyItem.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  origins: PropTypes.string,
  homeLocation: PropTypes.string,
  families: PropTypes.shape({
    handleFamilyRemove: PropTypes.func,
    handleFamilyInfo: PropTypes.func,
    handleFamilySession: PropTypes.func
  })
};

export default FamilyItem;
