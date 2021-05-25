import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SongDetails = ({navigation, route}) => {
  navigation.setOptions({title: route.params.title});

  return (
    <View>
      <Text>Song Details</Text>
    </View>
  );
};

export default SongDetails;

const styles = StyleSheet.create({});
