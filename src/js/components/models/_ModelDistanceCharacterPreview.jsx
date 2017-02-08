import React, {Component, PropTypes} from 'react';
import {DragLayer} from 'react-dnd';

@DragLayer(monitor => ({
  item: monitor.getItem(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
}))
class ModelDistanceCharacterPreview extends Component {

  getWrapperStyles() {
    return {
      position: `fixed`,
      pointerEvents: `none`,
      zIndex: 100,
      left: 0,
      top: 0,
      width: `100%`,
      height: `100%`,
    };
  }

  getStyles() {
    const {currentOffset, initialOffset} = this.props;

    if (!initialOffset || !currentOffset) return {display: `none`};
    const {x, y} = currentOffset;

    const transform = `translate(${x / 10}rem, ${y / 10}rem)`;
    return {
      transform,
      WebkitTransform: transform
    };

  }

  render() {

    const {item, isDragging} = this.props;

    if (!isDragging) {
      return null;
    }

    return (
      <div className='drag-preview-wrapper' style={this.getWrapperStyles()}>
        <div  className={`${item.name} drag-preview`}
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
  isDragging: PropTypes.bool,
  currentOffset: PropTypes.object,
  initialOffset: PropTypes.object
};

export default ModelDistanceCharacterPreview;
