import React, {Component, PropTypes} from 'react';
import moment from 'moment';

import {Actions} from '../../';

class FamilyInfoResult extends Component {

  actions = [
    {
      id: this.props._id,
      icon: `fa-trash`,
      handleAction: this.handleRemove
    },
    {
      id: this.props._id,
      icon: `fa-align-justify`,
      handleAction: this.handleNotes
    },
    {
      id: this.props._id,
      icon: `fa-download`,
      handleAction: this.handleDownload
    }
  ];

  handleDownload() {
    console.log(`download`);
  }

  handleNotes() {
    console.log(`notes`);
  }

  handleRemove() {
    console.log(`remove`);
  }

  render() {

    const {name, created} = this.props;

    const resultDate = moment(created).format(`D MMMM YYYY`);

    return (
      <li className='family-info-result'>
        {name}
        <span className='result-date'> - {resultDate}</span>

        <Actions actionClass='result-actions' actions={this.actions} />
      </li>
    );
  }

}

FamilyInfoResult.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  created: PropTypes.string
};

export default FamilyInfoResult;
