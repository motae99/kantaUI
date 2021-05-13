import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const perspective = 1000;
export const cardWidth = width * 0.9;
export const cardHeigh = cardWidth * 0.49;

export const fHeight = cardHeigh * 0.49;
export const fWidth = cardWidth;

export const sHeight = cardHeigh * 0.49;
export const sWidth = cardWidth;
export const fullBorderRadius = 10;
