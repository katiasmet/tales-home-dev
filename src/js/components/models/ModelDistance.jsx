import React, {Component, PropTypes} from 'react';
import {inject, observer} from 'mobx-react';

import {ModelDistanceScene, ModelDistanceTimeline} from './';
import {Loading} from '../';

@inject(`models`) @observer
class ModelDistance extends Component {

  componentDidMount() {
    const {getFamiliesLanguages, getDraggableCharacters} = this.props.models;
    getFamiliesLanguages();
    getDraggableCharacters();
  }

  render() {

    const {isLoadingDistance} = this.props.models;

    return (
      <section className='model-distance'>

        {
          isLoadingDistance ? <Loading />
          : <ModelDistanceScene />
        }

        {
          !isLoadingDistance && <ModelDistanceTimeline />
        }

      </section>
    );
  }

}

ModelDistance.propTypes = {
  models: PropTypes.shape({
    getFamiliesLanguages: PropTypes.func,
    familyLanguages: PropTypes.array,
    currentLanguage: PropTypes.number,
    getDraggableCharacters: PropTypes.func,
    draggableCharacters: PropTypes.array,
    isLoadingDistance: PropTypes.bool
  })
};

export default ModelDistance;
