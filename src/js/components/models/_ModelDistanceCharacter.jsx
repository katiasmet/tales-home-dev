import React, {Component, PropTypes} from 'react';
import {DragSource} from 'react-dnd';
import {getEmptyImage} from 'react-dnd-html5-backend';

import {itemTypes} from '../../util/';
import {CharacterGigi, CharacterKiki, CharacterChris, Flag} from '../illustrations';

const characterSource = {
  beginDrag(props) {
    const {_id, name, left} = props;
    return {_id, name, left};
  },
};

@DragSource(itemTypes.CHARACTER, characterSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
}))
class ModelDistanceCharacter extends Component {

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }

  /*renderCharacter(name) {

    if (name === `kiki`) {
      return <CharacterKiki />;
    } else if (name === `chris`) {
      return <CharacterChris />;
    } else {
      return <CharacterGigi />;
    }
  }*/

  renderCharacter(name) {
    return <p>{name}</p>;
  }

  render() {

    const {name, left, connectDragSource, isDragging} = this.props;
    const transform = `translateX(${left / 10}rem)`;

    console.log(isDragging);

    const style = {
      transform,
      WebkitTransform: transform,
      opacity: isDragging ? 0 : 1,
      height: isDragging ? 0 : ``,
    };

    return connectDragSource(
      <div  className={isDragging ? `drag-character ${name} dragging` : `drag-character ${name}`}
            style={style}
      >
        {this.renderCharacter(name)}
      </div>
    );
  }

}

ModelDistanceCharacter.propTypes = {
  name: PropTypes.string,
  connectDragSource: PropTypes.func,
  connectDragPreview: PropTypes.func,
  isDragging: PropTypes.bool,
  left: PropTypes.number
};

export default ModelDistanceCharacter;
