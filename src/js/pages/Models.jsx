import React, {Component, PropTypes} from 'react';
import {Redirect} from 'mobx-react';
import {inject, observer} from 'mobx-react';
import {isEmpty} from 'lodash';

import {Header, Loading} from '../components/';
import {ModelsOverview, ModelsOverviewGrid} from '../components/mentor';
import {token} from '../auth';

@inject(`models`, `families`) @observer
class Models extends Component {

  componentDidMount() {
    if (token.content().scope === `professional`) {
      this.props.models.getModels();
    } else {
      const {handleFamilyMembersVisites} = this.props.families;
      handleFamilyMembersVisites();
    }
  }

  renderModels() {

    if (token.content().scope === `family`) {
      const {activeFamily} = this.props.families;

      if (isEmpty(activeFamily.familymodel.name)) {
        return (
          <main>
            <Loading />
          </main>
        );
      } else {
        return (
          <Redirect to={`/models/${activeFamily.familymodel.name}`} />
        );
      }
    } else {
      return (
        <main>
          <Loading />
        </main>
      );
    }

  }

  render() {

    const {pathname} = this.props.location;
    const {isLoading, handleShowGrid} = this.props.models;

    console.log(`render models`);

    return (
      <div className='page page-models'>
        <Header pathname={pathname} />

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
          ) : this.renderModels()
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
  }),
  families: PropTypes.shape({
    handleFamilyMembersVisites: PropTypes.func,
    activeFamily: PropTypes.object
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

export default Models;
