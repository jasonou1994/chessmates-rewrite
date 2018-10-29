import * as types from './actionTypes'

export const updateStateImages = (displayImages) => ({
  type: types.UPDATE_STATE_IMAGES,
  payload : displayImages
});

export const updateStateCart = (cartObj) => ({
  type: types.UPDATE_STATE_CART,
  payload : cartObj
});

export const setBlowUpImage = (imageData) => ({
  type: types.SET_BLOW_UP_IMAGE,
  payload : imageData
});

export const hideBlowUpImage = () => ({
  type: types.HIDE_BLOW_UP_IMAGE
});

export const showCart = () => ({
  type: types.SHOW_CART,
});

export const hideCart = () => ({
  type: types.HIDE_CART,
});



