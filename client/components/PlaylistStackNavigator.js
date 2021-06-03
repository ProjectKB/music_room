import React, {useState, useContext, useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Playlist from '../views/Playlist';
import PlaylistStackHeader from './PlaylistStackHeader';
import SongsList from '../views/SongsList';

const Stack = createStackNavigator();

const PlaylistStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Playlist"
      children={props => <Playlist navigation={props.navigation} />}
      options={{
        title: 'Playlist',
        headerTitle: props => <PlaylistStackHeader navigation={props} />,
      }}
    />
    <Stack.Screen
      name="SongDetails"
      children={props => <SongsList {...props} />}
      options={{
        title: 'Playlist Song',
        headerTitle: props => <PlaylistStackHeader navigation={props} />,
      }}
    />
  </Stack.Navigator>
);

export default PlaylistStackNavigator;

const styles = StyleSheet.create({});
