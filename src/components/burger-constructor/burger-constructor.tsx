import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from './burger-constructor.module.css';


const generateCornerBun = (bun, type = 'top') => {
  const bunType = type === 'bottom' ? type : 'top';
  const postfix = type === 'bottom' ? '(низ)' : '(верх)';

  return (
    <ConstructorElement
      type={bunType}
      isLocked={true}
      text={`${bun.name} ${postfix}`}
      price={bun.price}
      thumbnail={bun.image}
    />
  );
};

const generateFillings = (items) => {
  return items.map(item => {
    if (item.type === 'bun') {
      return (
        <ConstructorElement
        text={`${item.name} (верх)`}
        price={item.price}
        thumbnail={item.image}
      />
      );
    }

    return (
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
      />
    );
  });
}


const BurgerConstructor = ({ ingredients }) => {
  const cornerBun = ingredients[0];
  const fillings = ingredients.slice(1);

  return (
    <section className={`${BurgerConstructorStyles.section} column pt-25`}>
      <h2 className='visualliHidden'>
        Ваша сборка
      </h2>

      <div
        className={BurgerConstructorStyles.bunTop}
      >
        {generateCornerBun(cornerBun, 'top')}
      </div>

      <div
        className={`${BurgerConstructorStyles.ingredients} scroller`}
      >
        {generateFillings(fillings)}
      </div>

      <div
        className={BurgerConstructorStyles.bunBotton}
      >
        {generateCornerBun(cornerBun, 'bottom')}
      </div>
    </section>
  );
};


export default BurgerConstructor;
