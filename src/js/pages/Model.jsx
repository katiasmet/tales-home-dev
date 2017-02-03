import React, {Component, PropTypes} from 'react';
import {Redirect} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {upperFirst, camelCase, isEmpty} from 'lodash';

import {Header, Loading} from '../components/';
import {token} from '../auth';
import {ModelNotes} from '../components/mentor/model';

@inject(`families`, `notes`, `models`) @observer

class Model extends Component {

  componentDidMount() {

    if (token.content().scope === `professional`) {
      const {getNote} = this.props.notes;
      getNote();
    }

  }

  renderModelView(component) {
    console.log(`render model view`);
    return React.createElement(component, {});
  }

  renderNotes() {

    if (token.content().scope === `professional`) {

      const {isLoadingNotes, redirect} = this.props.notes;
      if (isLoadingNotes) return (<Loading />);
      if (redirect) return <Redirect to='/models' />;
      return <ModelNotes />;

    }

  }

  handleFamilyRedirect() {
    //happens when professional stops a model
    if (token.content().scope === `family`) {
      const {activeFamilyModel} = this.props.families;
      const {isLoading} = this.props.models;

      if (isEmpty(activeFamilyModel.name) && !isLoading) {
        return <Redirect to='/models' />;
      }
    }
  }


  render() {
    const {pathname} = this.props.location;
    const component = upperFirst(camelCase(this.props.match.params.id));

    const {isLoading} = this.props.families;

    return (
      <div className='page page-model '>
        <Header pathname={pathname} />

        {
          (!isEmpty(isLoading)) ? <Loading />
          : this.renderModelView(component)
        }

        {
          this.handleFamilyRedirect()
        }

        {
          this.renderNotes()
        }

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
    redirect: PropTypes.bool
  }),
};

export default Model;
