import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SongsList = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({title: route.params.title});
  }, [navigation, route]);

  return (
    <View>
      <Text>Song Details</Text>
    </View>
  );
};

export default SongsList;

const styles = StyleSheet.create({});
