import React, {Component, PropTypes} from 'react';
import {Redirect} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {isEmpty} from 'lodash';

import {Header, Loading} from '../components/';
import {ModelsOverview, ModelsOverviewGrid} from '../components/mentor';
import {token} from '../auth';

@inject(`models`, `families`, `notes`, `results`) @observer
class Models extends Component {

  componentDidMount() {
    if (token.content().scope === `professional`) {
      this.props.models.getModels();
      this.props.notes.getNotes();
      this.props.results.getResults();
      this.props.notes.handleRedirect();
    } else {
      const {handleFamilyMembersVisites} = this.props.families;
      handleFamilyMembersVisites();
    }
  }

  renderModels() {

    if (token.content().scope === `family`) {
      const {activeFamilyModel} = this.props.families;

      if (isEmpty(activeFamilyModel.name)) {
        return (
          <main>
            <Loading />
          </main>
        );
      } else {
        return (
          <main>
            <Redirect to={`/models/${activeFamilyModel.name}`} />
          </main>
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
    const {isLoading} = this.props.models;

    return (
      <div className='page page-models'>
        <Header pathname={pathname} />

        {
          (token.content().scope === `professional` && !isLoading) ? (
            <main>
              <ModelsOverview />
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
    activeFamilyModel: PropTypes.object
  }),
  notes: PropTypes.shape({
    getNotes: PropTypes.func,
    handleRedirect: PropTypes.func
  }),
  results: PropTypes.shape({
    getResults: PropTypes.func
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

export default Models;
