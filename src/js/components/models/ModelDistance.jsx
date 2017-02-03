import React, {Component, PropTypes} from 'react';
import {inject, observer} from 'mobx-react';

@inject(`models`, `families`) @observer
class ModelDistance extends Component {

  componentDidMount() {
    const {getFamiliesLanguages} = this.props.models;
    getFamiliesLanguages();
  }

  render() {

    const {activeFamily} = this.props.families;
    const {familymembers} = activeFamily;

    const {familyLanguages, currentLanguage} = this.props.models;
    console.log(familyLanguages);

    return (
      <section className='model-distance'>

        <section className='timeline-scene'>

          <div className='flag'>
            {familyLanguages[currentLanguage]}
          </div>

          {
            familymembers.slice().map((familymember, i) => {
              return <div className={`character ${familymember.character}`} key={i}>{familymember.character}</div>;
            })
          }

        </section>

        <ul className='timeline'>
          <li className='timeline-language'>{familyLanguages[currentLanguage]}</li>
          {
            familymembers.slice().map((familymember, i) => {
              return <li className={`timeline-character ${familymember.character}`} key={i}></li>;
            })
          }
        </ul>

      </section>
    );
  }

}

ModelDistance.propTypes = {
  models: PropTypes.shape({
    getFamiliesLanguages: PropTypes.func,
    familyLanguages: PropTypes.array,
    currentLanguage: PropTypes.number
  }),
  families: PropTypes.shape({
    activeFamily: PropTypes.object
  })
};

export default ModelDistance;
