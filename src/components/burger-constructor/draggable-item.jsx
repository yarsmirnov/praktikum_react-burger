import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { insertItemBefore } from '../../services/slices/burger-constructor';

import { useDrag, useDrop } from 'react-dnd';

import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './burger-constructor.module.css';


const DraggableItem = ({
  id,
  uuid,
  name,
  price,
  image,
  handleClose
}) => {
  const dispatch = useDispatch();

  const [{isDrag}, dragItem] = useDrag({
    type: 'constructorItem',
    item: {id, uuid},
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [{isHover}, dropTarget] = useDrop({
    accept: 'constructorItem',
    drop: (item) => {
      dispatch(insertItemBefore({
        dragged: item.uuid,
        before: uuid,
      }));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const setDndRefs = (node) => {
    dragItem(node);
    dropTarget(node);
  }

  return (
    <li
      key={uuid}
      className={`${styles.listItem} ${isDrag ? styles.draggingItem : ''} ${isHover ? styles.draggingItem_hover : ''}`}
      ref={setDndRefs}
    >
      <i
        className={`${styles.itemIcon} mr-2`}
      >
        <DragIcon type="primary" />
      </i>
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={handleClose}
      />
    </li>
  );
};


DraggableItem.propTypes = {
  id: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  handleRemoveClick: PropTypes.func.isRequired,
};


export default DraggableItem;
