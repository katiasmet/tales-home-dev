import React, {Component, PropTypes} from 'react';
import {Redirect} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {upperFirst, camelCase, isEmpty} from 'lodash';

import {Header, Loading} from '../components/';
import {token} from '../auth';
import {ModelNotes} from '../components/mentor/model';

import {ModelDistance, ModelModel1, ModelModel3} from '../components/models';

@inject(`families`, `notes`, `models`) @observer

class Model extends Component {

  renderModelView() {
    const model = upperFirst(camelCase(this.props.match.params.id));

    switch (model) {
    case `Distance`:
      return <ModelDistance />;
    case `Model1`:
      return <ModelModel1 />;
    case `Model3`:
      return <ModelModel3 />;
    }
  }

  renderNotes() {

    if (token.content().scope === `professional`) {

      const {isLoadingNotes, redirect, showNotes} = this.props.notes;
      if (isLoadingNotes) return (<Loading />);
      if (redirect) return <Redirect to='/models' />;
      if (showNotes) return <ModelNotes />;

    }

  }

  handleFamilyRedirect() {
    //happens when professional stops a model
    if (token.content().scope === `family`) {
      const {activeFamilyModel} = this.props.families;
      const {isLoading} = this.props.models;

      if (isEmpty(activeFamilyModel.name) && (!isLoading)) {
        return <Redirect to='/models' />;
      }
    }
  }

  render() {
    const {pathname} = this.props.location;
    const {isLoading} = this.props.families;
    const {showNotes} = this.props.notes;

    return (
      <div className='page page-model '>
        <Header pathname={pathname} model={true} />

        <section className={(token.content().scope === `professional` && showNotes) ? `model active-notes`  : `model`}>

          {
            (!isEmpty(isLoading)) ? <Loading />
            : this.renderModelView()
          }

          {
            this.handleFamilyRedirect()
          }

          {
            this.renderNotes()
          }

        </section>

      </div>

    );
  }
}


Model.propTypes = {
  match: PropTypes.object,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  families: PropTypes.shape({
    isLoading: PropTypes.string,
    activeFamilyModel: PropTypes.object
  }),
  models: PropTypes.shape({
    isLoading: PropTypes.bool
  }),
  notes: PropTypes.shape({
    isLoadingNotes: PropTypes.bool,
    getNote: PropTypes.func,
    redirect: PropTypes.bool,
    showNotes: PropTypes.bool
  }),
};

export default Model;
