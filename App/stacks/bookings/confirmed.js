/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Animated} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import BookingCard from 'stacks/bookings/components/bookingCard';
import BottomSheet from 'stacks/bookings/components/bottomSheet';
import {Sizing, Outlines, Colors, Typography} from 'styles';
import moment from 'moment';

const ConfirmedList = ({
  bottomSheetModalRef,
  handleSheetChanges,
  snapPoints,
  action,
  selected,
  requestedAction,
  process,
  confimedBookings,
}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.neutral.s200}}>
      <Animated.FlatList
        data={confimedBookings}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        initialNumToRender={3}
        contentContainerStyle={{
          marginHorizontal: Sizing.x20,
          paddingTop: Sizing.x10,
        }}
        renderItem={({item, index}) => {
          return <BookingCard {...{item, index, action}} />;
        }}
      />

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <BottomSheet {...{selected, requestedAction, process}} />
      </BottomSheetModal>
    </View>
  );
};
export default ConfirmedList;
