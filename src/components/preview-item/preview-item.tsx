import React, { FC } from 'react';

import styles from './preview-item.module.css';


type TPreviewItemProps = {
  key?: string;
  img?: string;
  name?: string;
  count?: number;
  leftItems?: number;
}


const PreviewItem: FC<TPreviewItemProps> = ({
  img,
  name,
  count,
  leftItems = null
}) => {
  if (leftItems) {
    return (
      <li className={`${styles.item_last}`}>
        <p className={`${styles.more} text text_type_main-default text_color_inactive`}>
          {`...${leftItems}`}
        </p>
      </li>
    );
  }

  return (
    <li className={`${styles.item}`}>
      <img
        className={`${styles.image}`}
        src={img}
        alt={name}
      />

      { count && count > 1
        ? (
          <span
            className={`${styles.count} text text_type_main-default`}
          >
            { `+${count}` }
          </span>
        )
        : null
      }
    </li>
  );
};


export default PreviewItem;
