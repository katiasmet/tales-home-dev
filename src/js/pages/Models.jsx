import React, {Component, PropTypes} from 'react';
import {inject, observer} from 'mobx-react';

import {Header, Loading} from '../components/';
import {ModelsOverview, ModelsOverviewGrid} from '../components/mentor';
import {token} from '../auth';

@inject(`models`) @observer
class Models extends Component {

  componentDidMount() {
    if (token.content().scope === `professional`) this.props.models.getModels();
  }

  render() {

    const {isLoading, handleShowGrid} = this.props.models;

    return (
      <div className='page page-models'>
        <Header />

        {
          (token.content().scope === `professional` && !isLoading) ? (
            <main>
              <ModelsOverview />
              <button className='btn btn-show-grid'
                onClick={handleShowGrid}
              >
              </button>
              <ModelsOverviewGrid />
            </main>
          ) : (
            <main>
              <Loading />
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
    isLoading: PropTypes.bool,
    handleShowGrid: PropTypes.func,
    showGrid: PropTypes.bool
  })
};

export default Models;
