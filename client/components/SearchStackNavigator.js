import React from 'react';
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
