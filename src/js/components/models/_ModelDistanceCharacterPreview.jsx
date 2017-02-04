import React, {Component, PropTypes} from 'react';
import {DragLayer} from 'react-dnd';

@DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
}))
class ModelDistanceCharacterPreview extends Component {

  render() {

    const {item, isDragging, currentOffset, initialOffset} = this.props;
    if (!isDragging) {
      return null;
    }

    const {x, y} = currentOffset;
    const transform = `translate(${x / 10}rem, ${y / 10}rem)`;
    const style = {
      transform: transform
    };
    return (
      <div  className={`character ${item.name} drag-preview`}
            style={style}
      >
        {item.name}
      </div>
    );

  }

}

ModelDistanceCharacterPreview.propTypes = {
  item: PropTypes.object,
  isDragging: PropTypes.bool
};

export default ModelDistanceCharacterPreview;
