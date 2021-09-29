import React, { useRef, FC } from 'react';

import { useDispatch } from '../../services/hooks';
import { moveItemAction } from '../../services/actions/burger-constructor';

import { useDrag, useDrop } from 'react-dnd';

import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './burger-constructor.module.css';


type TDraggableItemProps = {
  key: string;
  id: string;
  uuid: string;
  index: number;
  name: string;
  price: number;
  image: string;
  handleClose: () => void;
}

const DraggableItem: FC<TDraggableItemProps> = ({
  id,
  uuid,
  index,
  name,
  price,
  image,
  handleClose
}) => {
  const dispatch = useDispatch();
  const dragabbleRef = useRef<HTMLLIElement|null>(null);

  const [{isDrag}, dragItem] = useDrag({
    type: 'constructorItem',
    item: {id, uuid, index},
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, dropTarget] = useDrop({
    accept: 'constructorItem',
    hover: (item: { id: string; uuid: string; index: number; }, monitor) => {
      if (!dragabbleRef.current) {
        return;
      }

      const dragged = item.index;
      const hovered = index;

      if (dragged === hovered) {
        return;
      }

      const hoverBoundingRect = dragabbleRef.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();

      if (clientOffset) {
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (dragged < hovered && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragged > hovered && hoverClientY > hoverMiddleY) {
          return;
        }
      }


      dispatch(moveItemAction({dragged, hovered}));
      item.index = hovered;
    },
  });

  const setDndRefs = (node) => {
    dragabbleRef.current = node;
    dragItem(node);
    dropTarget(node);
  }

  return (
    <li
      key={uuid}
      className={`${styles.listItem} ${isDrag ? styles.draggingItem : ''}`}
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


export default DraggableItem;
