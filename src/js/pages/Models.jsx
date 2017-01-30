import React, {Component, PropTypes} from 'react';
import {inject, observer} from 'mobx-react';

import {Header, Loading} from '../components/';
import {ModelsOverview, ModelsOverviewGrid} from '../components/mentor';

@inject(`models`) @observer
class Models extends Component {

  componentDidMount() {
    this.props.models.getModels();
  }

  render() {

    const {isLoading} = this.props.models;

    return (
      <div className='page page-models'>
        <Header />

          {
            isLoading ? (
              <main>
                <Loading />
              </main>
            )
            : (
              <main>
                <ModelsOverview />
                <ModelsOverviewGrid />
              </main>
            )
          }


      </div>

    );
  }
}

Models.propTypes = {
  models: PropTypes.shape({
    getModels: PropTypes.func,
    isLoading: PropTypes.bool
  })
};

export default Models;
