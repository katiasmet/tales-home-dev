import React, {Component, PropTypes} from 'react';
import {inject, observer} from 'mobx-react';
import {DropTarget} from 'react-dnd';

import {ModelDistanceCharacter} from './';
import {itemTypes, snapToGrid} from '../../util/';
import {Flag} from '../illustrations';

const characterTarget = {
  drop(props, monitor, component) {
    const delta = monitor.getDifferenceFromInitialOffset();
    const item = monitor.getItem();

    let left = Math.round(item.left + delta.x);
    left = snapToGrid(left);
    component.context.mobxStores.models.handleMoveCharacter(item._id, left);
  },
};

@DropTarget(itemTypes.CHARACTER, characterTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@inject(`models`) @observer
class ModelDistanceScene extends Component {

  render() {
    const {connectDropTarget} = this.props;
    const {familyLanguages, currentLanguage, draggableCharacters} = this.props.models;

    return connectDropTarget(
      <section className='timeline-scene'>

        {
          draggableCharacters.slice().map((character, i) => {
            return <ModelDistanceCharacter {...character} key={i} />;
          })
        }

      </section>
    );
  }
}

/*<div className='flag'>
  <Flag />
  <span className='flag-language'>{familyLanguages[currentLanguage]}</span>
</div>*/

ModelDistanceScene.propTypes = {
  models: PropTypes.shape({
    familyLanguages: PropTypes.array,
    currentLanguage: PropTypes.number,
    draggableCharacters: PropTypes.array,
    handleMoveCharacter: PropTypes.func
  }),
  connectDropTarget: PropTypes.func
};

export default ModelDistanceScene;
