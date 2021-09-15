import React from 'react';
import PropTypes from 'prop-types';

import styles from './preview-item.module.css';


const PreviewItem = ({
  img,
  name,
  count,
  leftItems
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

      { count > 1
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


PreviewItem.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  count: PropTypes.number,
  more: PropTypes.number,
}


export default PreviewItem;
