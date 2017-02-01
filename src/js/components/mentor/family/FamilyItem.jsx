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
      icon: `fa-caret-right`,
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

  handleInfoIcon() {
    const {families, _id} = this.props;
    if (families.showInfo === _id) this.actions[1].icon = `fa-close`;
    else this.actions[1].icon = `fa-plus`;
  }

  render() {

    this.handleInfoIcon();
    this.handleActionId();

    const {_id, name, origins, homeLocation} = this.props;
    const {showInfo} = this.props.families;

    return (
        <section className='family-item'>
          <header>

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
