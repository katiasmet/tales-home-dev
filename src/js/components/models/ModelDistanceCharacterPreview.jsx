import React, {Component, PropTypes} from 'react';
import {DragLayer} from 'react-dnd';

@DragLayer(monitor => ({
  item: monitor.getItem(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
}))
class ModelDistanceCharacterPreview extends Component {

  getStyles() {
    const {currentOffset} = this.props;
    const {x, y} = currentOffset;
    console.log(currentOffset);
    const transform = `translate(${x / 10}rem, ${y / 10}rem)`;
    return {transform: transform};

  }

  render() {

    const {item, isDragging, currentOffset, initialOffset} = this.props;
    if (!isDragging) {
      return null;
    }

    console.log(this.getStyles());

    return (
      <div className='drag-preview-box'>
        <div  className={`character ${item.name} drag-preview`}
              style={this.getStyles()}
        >
          {item.name}
        </div>
      </div>

    );

  }

}

ModelDistanceCharacterPreview.propTypes = {
  item: PropTypes.object,
  isDragging: PropTypes.bool
};

export default ModelDistanceCharacterPreview;
