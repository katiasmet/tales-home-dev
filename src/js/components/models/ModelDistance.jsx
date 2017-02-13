import React, {Component, PropTypes} from 'react';
import {inject, observer} from 'mobx-react';
import {isEmpty} from 'lodash';

import {token} from '../../auth';
import {ModelDistanceScene, ModelDistanceTimeline} from './';
import {Loading} from '../';
import {ModelDistanceBg} from '../illustrations';

@inject(`models`, `languages`) @observer
class ModelDistance extends Component {

  componentDidMount() {
    const {getFamiliesLanguages, getDraggableCharacters} = this.props.models;
    const {allLanguages, getLanguages} = this.props.languages;
    if (isEmpty(allLanguages)) getLanguages();
    getFamiliesLanguages();
    getDraggableCharacters();
  }

  handleClick(e, i) {
    e.preventDefault();
    const {handleNextLanguage} = this.props.models;

    if (token.content().scope === `professional`) {
      handleNextLanguage(i);
    }
  }

  renderLanguages() {
    const {familyLanguages, currentLanguage, handleIsPassedLanguage} = this.props.models;
    const scope = token.content().scope;

    return (
      <ul className='model-languages'>

        {
          familyLanguages.slice().map((language, i) => {
            return (
              <li className={(i === currentLanguage) ? `language active ${scope}` : `language ${scope}`}
                  onClick={e => this.handleClick(e, i)}
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

    const {isLoadingDistance, onboarding, handleOnboarding} = this.props.models;

    return (
      <section className={onboarding ? `model-distance onboarding` : `model-distance`}>

        <ModelDistanceBg />

        {
          (!isLoadingDistance && !onboarding) && this.renderLanguages()
        }

        {
          isLoadingDistance ? <Loading />
        : <ModelDistanceScene />
        }

        {
          !isLoadingDistance && <ModelDistanceTimeline />
        }

        {
          (!isLoadingDistance && onboarding) && <button className='btn btn-onboarding' onClick={handleOnboarding}><i className='fa fa-play'></i></button>
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
    handleIsPassedLanguage: PropTypes.func,
    onboarding: PropTypes.bool,
    handleOnboarding: PropTypes.func
  }),
  languages: PropTypes.shape({
    allLanguages: PropTypes.array,
    getLanguages: PropTypes.func
  })
};

export default ModelDistance;
