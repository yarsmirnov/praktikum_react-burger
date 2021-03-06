// Libraries
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  FC,
  ReactNode
} from 'react';
import {
  useSelector,
  useDispatch
} from '../../services/hooks';
import {
  useHistory,
  useLocation
} from 'react-router-dom';
import { useDrop } from 'react-dnd';

// Redux
import {
  addItemAction,
  removeItemAction,
  setBunAction,
  clearConstructorAction
} from '../../services/actions/burger-constructor';
import {
  increaseIngredientCountAction,
  decreaseIngredientCountAction,
  resetIngredientsCounterAction
} from '../../services/actions/ingredients';
import {
  resetRequestStatusAction,
  sendOrderRequestAction
} from '../../services/actions/order';
import { openModalAction } from '../../services/actions/modal';

// Components
import {
  ConstructorElement,
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import DraggableItem from './draggable-item';
import OrderDetails from '../order-details/order-details';
import Loader from '../loader/loader';

// Utils
import { v4 as uuidv4 } from 'uuid';

// Types
import { TIngredientDragItem } from '../burger-ingredient-card/burger-ingredient-card';
import { TConstructorIngredient } from '../../services/types/data';

import styles from './burger-constructor.module.css';


const BurgerConstructor: FC<{}> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { items: ingredients } = useSelector((store) => store.burgerConstructor);
  const {
    ORDER_REQUEST,
    ORDER_SUCCESS,
  } = useSelector((store) => store.order);
  const { user } = useSelector((store) => store.user);
  const { isOpen } = useSelector((store) => store.modal);

  useEffect(() => {
    if (ORDER_SUCCESS) {
      history.push(`/order`, { background: location });
      dispatch(openModalAction(OrderDetails));
      dispatch(resetRequestStatusAction());
      dispatch(clearConstructorAction());
      dispatch(resetIngredientsCounterAction());
    }
  }, [history, location, dispatch, isOpen, ORDER_SUCCESS]);

  const [{canAccept}, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item: TIngredientDragItem) {
      item.type === 'bun' ?
        dispatch(setBunAction({ ...item, uuid: uuidv4() })) :
        dispatch(addItemAction({ ...item, uuid: uuidv4() }));

      dispatch(increaseIngredientCountAction({
        id: item.id,
        type: item.type,
      }));
    },
    collect: (monitor) => ({
      canAccept: monitor.canDrop(),
    }),
  });

  const [hasBun, setHasBun] = useState<boolean>(false);

  const bun = useMemo<TConstructorIngredient | null | undefined>(
    () => {
      const target = ingredients.find((item) => item.type === 'bun');

      target ?
        setHasBun(true) :
        setHasBun(false);

      return target;
    }, [ingredients, setHasBun]
  );

  const fillings = useMemo<Array<TConstructorIngredient>>(
    () => ingredients.filter((item) => item.type !== 'bun'),
    [ingredients]
  );

  const orderList = useMemo<Array<TConstructorIngredient>>(
    () => bun ? [bun, ...fillings, bun] : [...fillings],
    [bun, fillings]
  );

  const totalPrice = useMemo<number>(
    () => orderList.reduce((acc, item) => acc + item?.price, 0), [orderList]
  );

  const handleButtonClick = useCallback(() => {
    if (!user) {
      history.replace({
        pathname: '/login',
      })
    }
    else {
      const requestData = {
        ingredients: orderList.map((item) => item.id),
      };
      dispatch(sendOrderRequestAction(requestData));
    }
  }, [user, history, dispatch, orderList]);

  const handleRemoveClick = useMemo(() => ({id, uuid}) => () => {
    dispatch(removeItemAction(uuid));
    dispatch(decreaseIngredientCountAction(id));
  }, [dispatch]);

  const orderButton = useMemo<ReactNode>(() => {
    if (!hasBun) {
      return (
        <Button
          type="primary"
          size="large"
          onClick={() => {}}
        >
          ???????????????? ??????????????
        </Button>
      )
    }

    if (!fillings.length) {
      return (
        <Button
          type="primary"
          size="large"
          onClick={() => {}}
        >
          ???????????????? ??????????????????????
        </Button>
      )
    }

    if (ORDER_REQUEST) {
      return ( <Loader /> )
    }

    return (
      <Button
        type="primary"
        size="large"
        onClick={handleButtonClick}
      >
        ???????????????? ??????????
      </Button>
    );
  }, [fillings, hasBun, ORDER_REQUEST, handleButtonClick]);

  if (ingredients.length === 0) {
    return (
      <section
        className={`column pt-25 pr-4`}
        ref={dropTarget}
      >
        <h2 className='visualliHidden'>
          ???????? ????????????
        </h2>
        <div className={`${styles.emptyConstructor} ${styles.emptyConstructor_maxHeight} ${canAccept ? styles.canAccept: ''}`}>
          <p className={`text text_type_main-medium`}>
            ???????????????????? ?????????????????????? ????????
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`${canAccept ? styles.canAccept: ''} column pt-25 pr-4`}
      ref={dropTarget}
    >
      <h2 className='visualliHidden'>
        ???????? ????????????
      </h2>

    { bun && (
        <div className='mb-4 pl-8 pr-4'>
          <ConstructorElement
            type={'top'}
            isLocked={true}
            text={`${bun.name} (????????)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )
    }

    { !fillings.length && (
        <ul
          className={`${styles.ingredientsList} ${styles.emptyConstructor}`}
        >
          <li>
            <p className={`text text_type_main-medium`}>
              ???????????????? ??????????????????????
            </p>
          </li>
        </ul>
      )
    }

    { fillings.length > 0 && (
        <ul
          className={`${styles.ingredientsList} scroller`}
        >
          { ingredients.map((item, index) => {
              if (item.type === 'bun') {
                return null;
              }
              return (
                <DraggableItem
                  key={item.uuid}
                  id={item.id}
                  uuid={item.uuid}
                  index={index}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  handleClose={handleRemoveClick(
                    {uuid: item.uuid, id: item.id}
                  )}
                />
              );
            })
          }
        </ul>
      )
    }

      { bun && (
          <div className='mt-4 pl-8 pr-4'>
            <ConstructorElement
              type={'bottom'}
              isLocked={true}
              text={`${bun.name} (??????)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )
      }

      <div
        className={`${styles.order} mt-10 pr-4`}
      >
        <span
          className={`${styles.orderTotal} text_type_digits-medium mr-10`}
        >
          { totalPrice }
          <i className={`${styles.orderCurrencyIcon} ml-2`}>
            <CurrencyIcon type="primary" />
          </i>
        </span>

        { orderButton }
      </div>
    </section>
  );
};


export default BurgerConstructor;
