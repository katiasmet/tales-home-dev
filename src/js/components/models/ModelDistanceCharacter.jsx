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

  handleMove(e) {
    e.preventDefault();

    const {onboarding, handleMoveCharacter} = this.props.models;
    const {_id} = this.props;
    if (!onboarding) handleMoveCharacter(_id, e);
  }

  handleDrag(e) {
    e.preventDefault();

    const {onboarding, handleDragCharacter} = this.props.models;
    const {_id} = this.props;
    if (!onboarding) handleDragCharacter(_id, e);
  }

  handleEndMove(e) {
    e.preventDefault();

    const {onboarding, handleEndMoveCharacter} = this.props.models;
    if (!onboarding) handleEndMoveCharacter();
  }


  render() {
    const {onboarding, handleMoveCharacter, handleDragCharacter, handleEndMoveCharacter} = this.props.models;
    const {_id, name, left} = this.props;

    let transform = `translateX(${left}rem)`;
    if (onboarding) transform = `translateX(20vw)`;

    const style = {
      transform,
      WebkitTransform: transform,
    };

    if (onboarding) {
      return (
       <div  className={`drag-character ${name}`}
             style={style}
       >
         {this.renderCharacter(name)}
       </div>
      );
    }

    return (
      <div  className={`drag-character ${name}`}
            onTouchMove={e => handleMoveCharacter(_id, e)}
            onTouchEnd={e => handleEndMoveCharacter(e)}
            draggable='true'
            onDrag={e => handleDragCharacter(_id, e)}
            onDragEnd={e => handleEndMoveCharacter(e)}
            onDrop={e => handleEndMoveCharacter(e)}
            style={style}
      >
        {this.renderCharacter(name)}
      </div>
    );
  }

}

/*<div  className={`drag-character ${name}`}
      onTouchMove={e => handleMoveCharacter(_id, e)}
      onTouchEnd={e => handleEndMoveCharacter(e)}
      draggable='true'
      onDrag={e => handleDragCharacter(_id, e)}
      onDragEnd={e => handleEndMoveCharacter(e)}
      onDrop={e => handleEndMoveCharacter(e)}
      style={style}
>*/

ModelDistanceCharacter.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  left: PropTypes.number,
  models: PropTypes.shape({
    handleMoveCharacter: PropTypes.func,
    handleDragCharacter: PropTypes.func,
    handleEndMoveCharacter: PropTypes.func,
    onboarding: PropTypes.bool
  })
};

export default ModelDistanceCharacter;
