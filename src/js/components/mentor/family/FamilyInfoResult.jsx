import React, {Component, PropTypes} from 'react';
import {inject, observer} from 'mobx-react';
import moment from 'moment';

import {Actions} from '../../';

@inject(`results`) @observer
class FamilyInfoResult extends Component {

  actions = [
    {
      _id: this.props._id,
      icon: `fa-align-justify`,
      handleAction: this.handleNotes
    },
    {
      _id: this.props._id,
      icon: `fa-download`,
      handleAction: this.props.results.handleDownload
    },
    {
      _id: this.props._id,
      icon: `fa-trash`,
      handleAction: this.handleRemove
    }
  ];

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
        <span>
          {name}
          <span className='result-date'>, {resultDate}</span>
        </span>

        <Actions actionClass='result-actions' actions={this.actions} />
      </li>
    );
  }

}

FamilyInfoResult.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  created: PropTypes.string,
  results: PropTypes.shape({
    handleDownload: PropTypes.func
  })
};

export default FamilyInfoResult;
