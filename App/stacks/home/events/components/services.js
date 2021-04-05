import React, {useRef, useContext, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Catering from './catering';
// import Photography from './photography';
// import WeddingStage from './weddingStage';
// import Other from './other';
const Services = ({provider}) => {
  const services = provider.services;

  if (!services) {
    console.log('no services');
  }

  // services.map((service) => {
  //   if (service === 'catering') {
  //     // console.log('here');
  //     return <Catering provider={provider} />;
  //   }
  //   // if (service === 'photography') {
  //   //   console.log('photography');
  //   // }
  //   // if (service === 'weddingStage') {
  //   //   console.log('weddingStage');
  //   // }
  //   // if (
  //   //   service !== 'catering' &&
  //   //   service !== 'photography' &&
  //   //   service !== 'weddingStage'
  //   // ) {
  //   //   console.log('other Services');
  //   // }
  // });
  if (services.includes('catering')) {
    return <Catering provider={provider} />;
  }
  return null;
};
export default Services;
