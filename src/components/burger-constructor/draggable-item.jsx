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

  const [, dragItem] = useDrag({
    type: 'constructorItem',
    item: {id, uuid},
  });

  const [, dropTarget] = useDrop({
    accept: 'constructorItem',
    drop: (item) => {
      dispatch(insertItemBefore({
        dragged: item.uuid,
        before: uuid,
      }));
      console.log(item);
    },
  });

  const setDndRefs = (node) => {
    dragItem(node);
    dropTarget(node);
  }

  return (
    <li
      key={uuid}
      className={styles.listItem}
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
