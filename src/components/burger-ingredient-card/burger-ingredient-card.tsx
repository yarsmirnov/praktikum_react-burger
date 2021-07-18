import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient-card.module.css';

const BurgerIngredientCard = ({ name, price, img, count = 0}) => {
  return (
    <div className={styles.card}>
      <img
        className={`${styles.image} pb-1`}
        src={img}
        alt={name}
      />
      <span className={`${styles.price} text_type_digits-default mb-1`}>
        {price}
        <i className='ml-2'>
          <CurrencyIcon type="primary" />
        </i>
      </span>

      <h3 className={`${styles.title} text_type_main-default`}>
        {name}
      </h3>

      {count ?
        (<i className={styles.counter}>
          <Counter count={count} size="default" />
        </i>):
        null}
    </div>
  );
}

export default BurgerIngredientCard;
