import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientCardStyles from './burger-ingredient-card.module.css';

const BurgerIngredientCard = ({ name, price, img, count = 0}) => {
  return (
    <div className={BurgerIngredientCardStyles.card}>
      <img
        className={`${BurgerIngredientCardStyles.image} pb-1`}
        src={img}
        alt={name}
      />
      <span className={`${BurgerIngredientCardStyles.price} text_type_digits-default mb-1`}>
        {price}
        <i className='ml-2'>
          <CurrencyIcon type="primary" />
        </i>
      </span>

      <h3 className={`${BurgerIngredientCardStyles.title} text_type_main-default`}>
        {name}
      </h3>

      {count ?
        (<i className={BurgerIngredientCardStyles.counter}>
          <Counter count={count} size="default" />
        </i>):
        null}
    </div>
  );
}

export default BurgerIngredientCard;
