import React from 'react';
import { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './src/Home.js';

const routes = createStackNavigator(
{
	Home: {
		screen: Home,
		navigationOptions: {
			headerShown: false,
		}
	}
},
{
	initialRouteName: 'Home'
});

const AppContainer = createAppContainer(routes);

class App extends Component {
	render () {
		return (
			<AppContainer/>
		);
	}
}

export default App;
