/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Subheading, Divider, Text} from 'react-native-paper';

const SearchSongElement = props => (
  <>
    <TouchableOpacity style={styles.searchElementContainer}>
      <Image style={styles.pictureContainer} source={{uri: props.picture}} />
      <View>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{alignItems: 'flex-end'}}>
          <Subheading>{props.title}</Subheading>
        </ScrollView>
        <ScrollView horizontal={true}>
          <Text>{props.channelTitle}</Text>
        </ScrollView>
      </View>
    </TouchableOpacity>
    <Divider />
  </>
);

export default SearchSongElement;

const styles = StyleSheet.create({
  searchElementContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  pictureContainer: {
    width: 90,
    height: 70,
    marginRight: 10,
  },
});
