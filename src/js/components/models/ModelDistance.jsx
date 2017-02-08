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

  renderLanguages() {
    const {familyLanguages, currentLanguage, handleNextLanguage} = this.props.models;

    return (
      <ul className='model-languages'>

        {
          familyLanguages.slice().map((language, i) => {
            return (
              <li className={(i === currentLanguage) ? `language active` : `language`}
                  onClick={() => handleNextLanguage(i)}
                  key={i}>
                    {language}
              </li>
            );
          })
        }

      </ul>
    );
  }

  render() {

    const {isLoadingDistance} = this.props.models;

    return (
      <section className='model-distance'>

        {
          !isLoadingDistance && this.renderLanguages()
        }

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
    isLoadingDistance: PropTypes.bool,
    handleNextLanguage: PropTypes.func
  })
};

export default ModelDistance;
