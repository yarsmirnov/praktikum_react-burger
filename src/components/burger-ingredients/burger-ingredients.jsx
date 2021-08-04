import React, { useState, useContext } from 'react';

import styles from './burger-ingredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientSection from '../ingredient-section/ingredient-section';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

import { IngredientsContext } from '../../contexts/ingredients-context';


const navTabs = [
  {id: 'bun', navTitle: 'Булки', sectionTitle: 'Булки'},
  {id: 'sauce', navTitle: 'Соусы', sectionTitle: 'Соусы'},
  {id: 'main', navTitle: 'Начинки', sectionTitle: 'Начинка'},
];

const filterByType = (items, type) => {
  return items.filter(item => item.type === type);
};


const BurgerIngredients = () => {
  const [current, setCurrent] = useState(navTabs[0].id);
  const [ showModal, setShowModal ] = useState(false);
  const [ cardData, setCardData ] = useState({
    name: '',
    imageLarge: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
  });
  const {ingredients} = useContext(IngredientsContext);


  const onCardClick = (showModal) => (data) => {
    showModal(true);
    setCardData(data);
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
      >
        {navTabs.map(tab => (
          <IngredientSection
            key={tab.id}
            title={tab.sectionTitle}
            isActive={current === tab.id}
            ingredients={filterByType(ingredients, tab.id)}
            onCardClick={onCardClick(setShowModal)}
          />)
        )}
      </div>

      {showModal && (
        <Modal toggleModal={setShowModal}>
          <IngredientDetails
            name={cardData.name}
            imageLarge={cardData.imageLarge}
            proteins={cardData.proteins}
            fat={cardData.fat}
            carbohydrates={cardData.carbohydrates}
            calories={cardData.calories}
          />
        </Modal>
      )}
    </section>
  );
}


export default BurgerIngredients;