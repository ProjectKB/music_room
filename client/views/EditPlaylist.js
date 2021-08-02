/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const EditPlaylist = props => {
  useEffect(() => {
    props.navigation.setOptions({title: `Edit ${props.playlist.name}`});
  }, []);

  return (
    <View>
      <Text>Edit Playlist</Text>
    </View>
  );
};

export default EditPlaylist;

const styles = StyleSheet.create({});
