export const countUniqueItems = (itemsArr) => {
  return itemsArr.reduce(
    (acc, id) => {
      acc[id] = acc[id] ? acc[id] + 1 : 1;
      return acc;
    }, {})
};


export const getIngredientsData = (idList, ingredientsDatabase) => {
  let ingredientsToShow = [];

  if (!idList
    || !ingredientsDatabase
    || !idList.length
    || !ingredientsDatabase.length) {
    return ingredientsToShow;
  }

  const uniqueIdsWithCount = countUniqueItems(idList);

  for (const [ id, count ] of Object.entries(uniqueIdsWithCount)) {
    const ingredientData = ingredientsDatabase.find(
      (ingredient) => ingredient.id === id
    );

    const data = {
      count,
      price: ingredientData.price,
      img: ingredientData.imageMobile,
      name: ingredientData.name,
    }

    if (ingredientData.type === 'bun') {
      ingredientsToShow.unshift(data);
    } else {
      ingredientsToShow.push(data);
    }
  }

  return ingredientsToShow;
};
