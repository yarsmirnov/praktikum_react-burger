import React from 'react';
import { Link } from 'react-router-dom';

import layoutStyles from './page-layout.module.css';


export const NotFound404 = () => {
  return (
    <div className={`${layoutStyles.pageContainer} text-center pt-30`}>
      <h1 className={`text text_type_main-large mb-20`}>
        404
      </h1>

      <p className={`text text_type_main-medium mb-4`}>
        Страница не найдена
      </p>
      <p>
        <Link to='/' className={`${layoutStyles.link}`}>
          На главную
        </Link>
      </p>
    </div>
  );
};
