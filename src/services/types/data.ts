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

export type TOrderSent = {
  ingredients: Array<string>;
}

export type TOrderSentResponse = {
  success: boolean;
  name: string;
  order: TOrderRecieved;
}


export type TOrderRecieved = {
  ingredients: Array<TRawIngredient>
  _id: string;
  owner: {
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  },
  status: 'created'| 'pending' | 'done' | 'canceled';
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  price: number;
}

export type TOrdersTapeResponse = {
  success: boolean;
  name: string;
  order: TOrderRecieved;
}
