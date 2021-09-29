import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';

import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import styles from './burger-ingredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientSection from '../ingredient-section/ingredient-section';


const navTabs = [
  {id: 'bun', navTitle: 'Булки', sectionTitle: 'Булки'},
  {id: 'sauce', navTitle: 'Соусы', sectionTitle: 'Соусы'},
  {id: 'main', navTitle: 'Начинки', sectionTitle: 'Начинка'},
];

const filterByType = (items, type) => {
  return items.filter((item) => item.type === type);
};

const BurgerIngredients = () => {
  const { items: ingredients } = useSelector((store) => store.ingredients);

  const [current, setCurrent] = useState('bun');

  const { ref: bunSectionRef, inView: bunInView } = useInView({
    threshold: 0,
  });
  const { ref: sauceSectionRef, inView: sauceInView } = useInView({
    threshold: 0,
  });
  const { ref: mainSectionRef, inView: mainInView } = useInView({
    threshold: 0,
  });

  const sectionRefs = {
    bunSectionRef,
    sauceSectionRef,
    mainSectionRef,
  };

  const bunTitleRef = useRef(null);
  const sauceTitleRef = useRef(null);
  const mainTitleRef = useRef(null);

  const titleRefs = useMemo(() => ({
    bunTitleRef,
    sauceTitleRef,
    mainTitleRef,
  }), [bunTitleRef, sauceTitleRef, mainTitleRef]);


  useEffect(() => {
    if (bunInView) {
      setCurrent('bun');
      return;
    }
    if (!bunInView && sauceInView) {
      setCurrent('sauce');
      return;
    }
    if (!sauceInView && mainInView) {
      setCurrent('main');
      return;
    }
  }, [bunInView, sauceInView, mainInView]);

  const scrollToSection = useCallback((id) => {
    const scrollSettings = {
      behavior: 'smooth',
      block: 'start',
    };

    const {bunTitleRef, sauceTitleRef} = titleRefs;

    switch (id) {
      case 'bun': {
        bunTitleRef.current?.scrollIntoView(scrollSettings);
        break;
      }
      case 'sauce': {
        sauceTitleRef.current?.scrollIntoView(scrollSettings);
        break;
      }
      case 'main': {
        mainTitleRef.current?.scrollIntoView(scrollSettings);
        break;
      }
      default: {
        return;
      }
    }
  }, [titleRefs]);


  return (
    <section className='column mr-10'>
      <h1 className={`${styles.sectionTitle} text_type_main-large pt-10 mb-5`}>
        Соберите бургер
      </h1>

      <div className={styles.navigation}>
        { navTabs.map(tab => {
            return (
              <Tab
                key={tab.id}
                value={tab.id}
                active={current === tab.id}
                onClick={() => {
                  setCurrent(tab.id);
                  scrollToSection(tab.id);
                }}
              >
                { tab.navTitle }
              </Tab>
            );
          })
        }
      </div>

      <div className={`${styles.catalog} scroller`}>
        { navTabs.map(tab => (
            <IngredientSection
              key={tab.id}
              title={tab.sectionTitle}
              isActive={current === tab.id}
              ingredients={filterByType(ingredients, tab.id)}
              sectionRef={sectionRefs[`${tab.id}SectionRef`]}
              titleRef={titleRefs[`${tab.id}TitleRef`]}
            />)
          )
        }
      </div>
    </section>
  );
}


export default BurgerIngredients;
