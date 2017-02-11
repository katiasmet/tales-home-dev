import React, {Component, PropTypes} from 'react';
import {inject, observer} from 'mobx-react';
import {isEmpty} from 'lodash';

import {token} from '../../auth';
import {ModelDistanceScene, ModelDistanceTimeline} from './';
import {Loading} from '../';

@inject(`models`, `languages`) @observer
class ModelDistance extends Component {

  componentDidMount() {
    const {getFamiliesLanguages, getDraggableCharacters} = this.props.models;
    const {allLanguages, getLanguages} = this.props.languages;
    if (isEmpty(allLanguages)) getLanguages();
    getFamiliesLanguages();
    getDraggableCharacters();
  }

  handleClick(i) {

    console.log(`handle click`);

    const {handleNextLanguage} = this.props.models;

    if (token.content().scope === `professional`) {
      console.log(`handle next language`);
      handleNextLanguage(i);
    }
  }

  renderLanguages() {
    const {familyLanguages, currentLanguage, handleIsPassedLanguage} = this.props.models;
    const scope = token.content().scope;

    console.log(familyLanguages);

    return (
      <ul className='model-languages'>

        {
          familyLanguages.slice().map((language, i) => {
            return (
              <li className={(i === currentLanguage) ? `language active ${scope}` : `language ${scope}`}
                  onClick={() => this.handleNextLanguage(i)}
                  key={i}>
                    {language}
                    {handleIsPassedLanguage(language) && <i className='fa fa-check'></i>}
              </li>
            );
          })
        }

      </ul>
    );
  }

  render() {

    const {isLoadingDistance} = this.props.models;
    console.log(isLoadingDistance);

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
    handleNextLanguage: PropTypes.func,
    handleIsPassedLanguage: PropTypes.func
  }),
  languages: PropTypes.shape({
    allLanguages: PropTypes.array,
    getLanguages: PropTypes.func
  })
};

export default ModelDistance;
