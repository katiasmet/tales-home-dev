import React, {Component, PropTypes} from 'react';
import {inject, observer} from 'mobx-react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import {ModelDistanceScene, ModelDistanceCharacterPreview, ModelDistanceTimeline} from './';
import {Loading} from '../';

@DragDropContext(HTML5Backend)
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
          !isLoadingDistance && <ModelDistanceCharacterPreview />
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
