import React, {useContext} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {Subheading, Divider, Text} from 'react-native-paper';
import TextTicker from 'react-native-text-ticker';

const SearchElement = props => {
  console.log(props.picture);

  return (
    <>
      <TouchableOpacity style={styles.searchElementContainer}>
        <Image style={{width: 90, height: 70}} source={{uri: props.picture}} />
        <TextTicker
          scrollSpeed={15}
          bounceSpeed={150}
          loop
          scroll={false}
          repeatSpacer={50}
          marqueeDelay={1000}>
          <Subheading>{props.title}</Subheading>
        </TextTicker>
      </TouchableOpacity>
      <Divider />
    </>
  );
};

export default SearchElement;

const styles = StyleSheet.create({
  searchElementContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  searchElementContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
});
