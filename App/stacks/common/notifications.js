/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  LayoutAnimation,
  TouchableOpacity,
  Platform,
  UIManager,
} from 'react-native';
import Animated from 'react-native-reanimated';
import SwipeableItem, {UnderlayParams} from 'react-native-swipeable-item';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Sizing} from 'styles';
import NoticationItem from 'components/notificationItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
const {multiply, sub} = Animated;

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const setNotifications = async (notificationsData) => {
  const data = JSON.stringify(notificationsData);
  await AsyncStorage.setItem('notifications', data);
};

const Notifications = () => {
  // const [data, setData] = React.useState(notifications);
  const [storageData, setStorageData] = React.useState(null);

  // setNotifications(notifications);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('notifications');
      // return jsonValue != null ? JSON.parse(jsonValue) : null;
      // console.log(jsonValue);
      setStorageData(jsonValue != null ? JSON.parse(jsonValue) : null);
      return jsonValue;
    } catch (e) {
      // error reading value
      console.log('error', e);
    }
  };

  React.useEffect(() => {
    getData();
    console.log('data in storage', storageData);
    // setData(all);
  }, []);

  const itemRefs = new Map();

  function deleteItem(item) {
    const updatedData = storageData.filter((d) => d !== item);

    // Animate list to close gap when item is deleted
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setStorageData(updatedData);
    setNotifications(updatedData);
  }

  const renderUnderlayLeft = ({item, percentOpen}) => (
    <Animated.View
      style={[styles.row, styles.underlayLeft, {opacity: percentOpen}]} // Fade in on open
    >
      <TouchableOpacity onPressOut={() => deleteItem(item)}>
        <MaterialCommunityIcons
          name="delete-outline"
          size={16}
          color="white"
          style={styles.text}
        />
      </TouchableOpacity>
    </Animated.View>
  );

  const renderUnderlayRight = ({item, percentOpen}) => (
    <Animated.View
      style={[styles.row, styles.underlayRight, {opacity: percentOpen}]} // Fade in on open
    >
      <TouchableOpacity onPressOut={() => deleteItem(item)}>
        <MaterialCommunityIcons
          name="delete-outline"
          size={16}
          color="white"
          style={styles.text}
        />
      </TouchableOpacity>
    </Animated.View>
  );

  const renderItem = ({item, index, drag}) => {
    return (
      <>
        <SwipeableItem
          key={item.key}
          item={item}
          ref={(ref) => {
            if (ref && !itemRefs.get(item.key)) {
              itemRefs.set(item.key, ref);
            }
          }}
          onChange={({open}) => {
            if (open) {
              // Close all other open items
              [...itemRefs.entries()].forEach(([key, ref]) => {
                if (key !== item.key && ref) {
                  ref.close();
                }
              });
            }
          }}
          overSwipe={20}
          renderUnderlayLeft={renderUnderlayLeft}
          renderUnderlayRight={renderUnderlayRight}
          snapPointsLeft={[250]}
          snapPointsRight={[250]}>
          <NoticationItem {...{item}} />
        </SwipeableItem>
        <View
          style={{
            backgroundColor: Colors.neutral.s100,
            height: Sizing.layout.x5,
          }}
        />
      </>
    );
  };

  if (!storageData) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'gray',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white'}}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DraggableFlatList
        keyExtractor={(item) => item.key}
        data={storageData}
        renderItem={renderItem}
        onDragEnd={(data) => setStorageData({data})}
        activationDistance={20}
        // contentContainerStyle={{marginHorizontal: 20}}
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 32,
  },
  underlayRight: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'flex-start',
  },
  underlayLeft: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'flex-end',
  },
});

// const NUM_ITEMS = 20;
// function getColor(i) {
//   const multiplier = 255 / (NUM_ITEMS - 1);
//   const colorVal = i * multiplier;
//   return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
// }

// const initialData = [...Array(NUM_ITEMS)].fill(0).map((d, index) => {
//   const backgroundColor = getColor(index);
//   return {
//     text: `Row ${index}`,
//     key: `key-${backgroundColor}`,
//     backgroundColor,
//     height: 100,
//   };
// });
