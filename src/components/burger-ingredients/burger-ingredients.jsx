import React, { useState, useRef, useEffect, useCallback } from 'react';

import { useSelector } from 'react-redux';

import styles from './burger-ingredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientSection from '../ingredient-section/ingredient-section';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';


const navTabs = [
  {id: 'bun', navTitle: 'Булки', sectionTitle: 'Булки'},
  {id: 'sauce', navTitle: 'Соусы', sectionTitle: 'Соусы'},
  {id: 'main', navTitle: 'Начинки', sectionTitle: 'Начинка'},
];

const filterByType = (items, type) => {
  return items.filter(item => item.type === type);
};

const BurgerIngredients = () => {
  const [current, setCurrent] = useState('bun');
  const [ showModal, setShowModal ] = useState(false);
  const containerRef = useRef(null);
  const titleRefs = {
    bunTitleRef: useRef(null),
    sauceTitleRef: useRef(null),
    mainTitleRef: useRef(null),
  };

  const handleScroll = useCallback(() => {
    const containerEl = containerRef.current;
    const bunTitleEl = titleRefs.bunTitleRef.current;
    const sauceTitleEl = titleRefs.sauceTitleRef.current;
    const mainTitleEl = titleRefs.mainTitleRef.current;

    const containerOffset = containerEl.getBoundingClientRect().top;

    const bunTitle = {
      id: 'bun',
      bottomCoords: bunTitleEl.getBoundingClientRect().bottom
    };
    const sauceTitle = {
      id: 'sauce',
      bottomCoords: sauceTitleEl.getBoundingClientRect().bottom
    }
    const mainTitle = {
      id: 'sauce',
      bottomCoords: mainTitleEl.getBoundingClientRect().bottom
    }

    const closestTitle = [bunTitle, sauceTitle, mainTitle]
      .reduce((prev, current) => {
        const prevValue = Math.abs(prev.bottomCoords - containerOffset);
        const currentValue = Math.abs(current.bottomCoords - containerOffset);
        return prevValue < currentValue ?
          prev :
          current;
      });

      setCurrent(closestTitle.id);
  }, [titleRefs.bunTitleRef,
      titleRefs.sauceTitleRef,
      titleRefs.mainTitleRef]);

  useEffect(() => {
    const containerEl = containerRef.current;


    containerEl.addEventListener('scroll', handleScroll);

    return () => {
      containerEl.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const { value: ingredients } = useSelector(store => store.ingredients);



  const onCardClick = (showModal) => (data) => {
    showModal(true);
  }


  return (
    <section className='column mr-10'>
      <h1 className={`${styles.sectionTitle} text_type_main-large pt-10 mb-5`}>
        Соберите бургер
      </h1>

      <div className={styles.navigation}>
        {navTabs.map(tab => {
          return (
            <Tab
              key={tab.id}
              value={tab.id}
              active={current === tab.id}
              onClick={() => setCurrent(tab.id)}
            >
              {tab.navTitle}
            </Tab>
          );
        })}
      </div>

      <div
        className={`${styles.catalog} scroller`}
        ref={containerRef}
      >
        {navTabs.map(tab => (
          <IngredientSection
            key={tab.id}
            title={tab.sectionTitle}
            isActive={current === tab.id}
            ingredients={filterByType(ingredients, tab.id)}
            onCardClick={onCardClick(setShowModal)}
            titleRef={titleRefs[`${tab.id}TitleRef`]}
          />)
        )}
      </div>

      {showModal && (
        <Modal toggleModal={setShowModal}>
          <IngredientDetails />
        </Modal>
      )}
    </section>
  );
}


export default BurgerIngredients;
