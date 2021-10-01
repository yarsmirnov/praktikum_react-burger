import PropTypes from 'prop-types';


export const ingredientType = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  imageMobile: PropTypes.string.isRequired,
  imageLarge: PropTypes.string.isRequired,
};

export const orderType = {
  _id: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  status: PropTypes.oneOf(['done', 'cooking']).isRequired,
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};
