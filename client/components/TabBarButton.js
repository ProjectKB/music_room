import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const TabBarButton = props => {
  let color =
    props.state.routeNames[props.state.index] === props.title
      ? 'white'
      : 'gray';

  return (
    <View>
      <TouchableOpacity
        style={styles.tabBarButton}
        onPress={() => props.navigation.navigate(props.title)}>
        <FontAwesomeIcon size={props.size} icon={props.icon} color={color} />
        <Text style={[styles.tabBarButtonLabel, {color: color}]}>
          {props.title.toUpperCase()}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  tabBarButton: {
    alignItems: 'center',
  },
  tabBarButtonLabel: {
    fontSize: 12,
    marginTop: 5,
  },
});
