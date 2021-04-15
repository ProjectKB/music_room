import React from 'react';
import { View, Text } from 'react-native';

class Home extends React.Component {

	componentDidMount()
	{
		console.log("Mounted")
	}

	render()
	{

		return(
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<Text>Home</Text>
			</View>
		);
	}
}


export default Home