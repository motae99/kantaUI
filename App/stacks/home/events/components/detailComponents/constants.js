import {Dimensions} from 'react-native';
export const {width, height} = Dimensions.get('window');

export const MIN_HEADER_HEIGHT = 100;
export const HEADER_IMAGE_HEIGHT = height * 0.65;
export const PADDING = 18;
export const SECTIONS_TOP_MARGIN = 30;
export const top = 36;

export const fadeIn = {
  0: {
    opacity: 0,
    translateY: 100,
  },
  1: {
    opacity: 1,
    translateY: 0,
  },
};
