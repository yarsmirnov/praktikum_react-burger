import { TRawIngredient, TIngredient } from '../services/types/data';


const adaptIngredients =
  (ingredients: Array<TRawIngredient>): Array<TIngredient> => {
    if (ingredients.length === 0) {
      return [];
    }

    return ingredients.map(item => (
      {
        id: item._id,
        name: item.name,
        type: item.type,
        proteins: item.proteins,
        fat: item.fat,
        carbohydrates: item.carbohydrates,
        calories: item.calories,
        price: item.price,
        image: item.image,
        imageMobile: item.image_mobile,
        imageLarge: item.image_large,
        count: 0,
        __v: item.__v,
      }
    ));
  };


export { adaptIngredients };
