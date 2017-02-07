import React, {Component, PropTypes} from 'react';
import {inject, observer} from 'mobx-react';

import {CharacterGigi, CharacterKiki, CharacterChris} from '../illustrations';

@inject(`models`) @observer
class ModelDistanceCharacter extends Component {


  renderCharacter(name) {

    if (name === `kiki`) {
      return <CharacterKiki />;
    } else if (name === `chris`) {
      return <CharacterChris />;
    } else {
      return <CharacterGigi />;
    }
  }


  render() {

    const {_id, name, left} = this.props;
    const {handleMoveCharacter, handleEndMoveCharacter} = this.props.models;

    const transform = `translateX(${left}rem)`;

    console.log(left);

    const style = {
      transform,
      WebkitTransform: transform,
    };

    return (
      <div  className={`drag-character ${name}`}
            onTouchMove={e => handleMoveCharacter(_id, e)}
            onTouchEnd={e => handleEndMoveCharacter(e)}
            style={style}
      >
        {this.renderCharacter(name)}
      </div>
    );
  }

}

ModelDistanceCharacter.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  left: PropTypes.number,
  models: PropTypes.shape({
    handleMoveCharacter: PropTypes.func,
    handleEndMoveCharacter: PropTypes.func
  })
};

export default ModelDistanceCharacter;
