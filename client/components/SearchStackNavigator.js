import React, {useState, useContext, useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Search from '../views/Search';

const Stack = createStackNavigator();

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" children={props => <Search />} />
    </Stack.Navigator>
  );
};

export default SearchStackNavigator;

const styles = StyleSheet.create({});
