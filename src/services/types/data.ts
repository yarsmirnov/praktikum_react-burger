export type TRawIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export type TIngredient = {
  id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  imageMobile: string,
  imageLarge: string,
  count: number,
  __v: number;
}

export type TConstructorIngredient = {
  id: string;
  type: string;
  name: string;
  price: number;
  image: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  uuid: string;
}
