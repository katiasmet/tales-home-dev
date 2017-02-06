import React, {PropTypes, Component} from 'react';
import {inject, observer} from 'mobx-react';

import {FamilyInfo} from './';
import {Actions, Loading} from '../../';

@inject(`families`) @observer
class FamilyItem extends Component {

  infoIcon = `fa-plus`;

  actions = [
    {
      _id: this.props._id,
      icon: `fa-trash`,
      handleAction: this.props.families.handleFamilyRemove
    },
    {
      _id: this.props._id,
      icon: `fa-plus`,
      handleAction: this.props.families.handleFamilyInfo
    },
    {
      _id: this.props._id,
      icon: `fa-play`,
      handleAction: this.props.families.handleFamilySession
    }
  ];

  handleFamilyInfo() {
    const {isLoading} = this.props.families;
    if (isLoading === `info`) return <Loading />;
    else return <FamilyInfo />;
  }

  handleActionId() {
    const {_id} = this.props;
    this.actions.forEach(action => {
      action._id = _id;
    });
  }

  render() {

    this.handleActionId();

    const {_id, name, origins, homeLocation} = this.props;
    const {showInfo, handleFamilyInfo} = this.props.families;

    return (
        <section className={showInfo ? `family-item active` : `family-item`}>
          <header onClick={() => handleFamilyInfo(_id)}>

            <h2>{name}</h2>

            <Actions actionClass='family-actions' actions={this.actions} />

          </header>

          <p>Comes from {origins} - Lives in {homeLocation}</p>

            {
              (_id === showInfo) && this.handleFamilyInfo()
            }

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
    isLoading: PropTypes.string,
    showInfo: PropTypes.string,
    handleFamilyRemove: PropTypes.func,
    handleFamilyInfo: PropTypes.func,
    handleFamilySession: PropTypes.func
  })
};

export default FamilyItem;
