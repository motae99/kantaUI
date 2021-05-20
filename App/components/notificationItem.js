import React from 'react';
import {
  Text,
  View,
  Pressable,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import {Sizing, Outlines, Colors, Typography} from 'styles';
import moment from 'moment';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  actionText: {
    color: Colors.primary.brand,
    paddingVertical: Sizing.layout.x15,
    ...Typography.header.x20,
  },
  actionButton: {
    borderTopWidth: 0.5,
    // borderTopWidth: Outlines.BorderWidth.smallThin,
    borderColor: Colors.neutral.s300,
  },
  description: {
    color: Colors.neutral.s300,
    paddingBottom: Sizing.layout.x15,
    ...Typography.body.x10,
  },
  title: {
    color: Colors.neutral.black,
    marginTop: Sizing.layout.x20,
    ...Typography.header.x20,
  },
  image: {
    height: height / 5,
    width: '100%',
    paddingVertical: Sizing.layout.x5,
    borderRadius: Outlines.borderRadius.small,
  },
  date: {
    color: Colors.neutral.s300,
    paddingVertical: 10,
    ...Typography.body.x10,
  },
  container: {
    // height: height / 2,
    width: '100%',
    paddingHorizontal: Sizing.layout.x15,
    backgroundColor: 'white',
    // marginVertical: Sizing.layout.x5,
  },
  spacer: {
    backgroundColor: 'transparent',
    height: Sizing.layout.x10,
    // width: width,
  },
});

const NotificationItem = ({item}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>
        {moment(Number(item.timeStamp)).format('ddd, Do MMM, h:mm')}
      </Text>
      {item.image ? (
        <Image source={{uri: item.image}} style={styles.image} />
      ) : null}

      <Text style={styles.title}>{item.title}</Text>
      <Text numberOfLines={2} style={styles.description}>
        {item.description}
      </Text>
      <Pressable
        style={styles.actionButton}
        onPress={() => console.log('action ', item.action)}>
        <Text style={styles.actionText}>{item.actionText}</Text>
      </Pressable>
    </View>
  );
};

export default NotificationItem;
