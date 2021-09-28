import { TIngredient, TCardIngredient } from '../services/types/data';


export const countUniqueItems =
  ( itemsArr: Array<string> ): { [key: string]: number } => {
    return itemsArr.reduce(
      (acc, id) => {
        const key = id.toString();
        acc[key] = acc[key] ? acc[key] + 1 : 1;
        return acc;
      }, {})
  };


export const getIngredientsData = (
  idList: Array<string>,
  ingredientsDatabase: Array<TIngredient>
): Array<TCardIngredient> => {
  let ingredientsToShow: Array<TCardIngredient> = [];

  if (!idList
    || !ingredientsDatabase
    || !idList.length
    || !ingredientsDatabase.length) {
    return ingredientsToShow;
  }

  const uniqueIdsWithCount = countUniqueItems(idList);

  for (const [ id, count ] of Object.entries(uniqueIdsWithCount)) {
    if(!id) {
      continue;
    }

    const ingredientData = ingredientsDatabase.find(
      (ingredient) => ingredient.id === id
    );

    if (!ingredientData) {
      console.error(`Cant't find ingredient with id "${id}" on local database`);
      continue;
    }

    const data = {
      count,
      price: ingredientData?.price,
      img: ingredientData?.imageMobile,
      name: ingredientData?.name,
    }

    if (ingredientData?.type === 'bun') {
      ingredientsToShow.unshift(data);
    } else {
      ingredientsToShow.push(data);
    }
  }

  return ingredientsToShow;
};
