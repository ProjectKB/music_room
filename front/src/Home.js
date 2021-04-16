import * as React from 'react';
import { View, Text, ScrollView, Button } from 'react-native';


class CustomKeyboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	render() {
		return (
			<View
				style={{ position: 'absolute', bottom: 0, width:"100%", backgroundColor: 'red' }}
			>
				<View style={{ justifyContent: 'center', flex:1, flexDirection: 'row'}}>
					<Button style={{ margin: 5 }} title='q' value='q'/>
					<Button style={{ margin: 5 }} title='w' value='w'/>
					<Button style={{ margin: 5 }} title='e' value='e'/>
					<Button style={{ margin: 5 }} title='r' value='r'/>
					<Button style={{ margin: 5 }} title='t' value='t'/>
					<Button style={{ margin: 5 }} title='y' value='y'/>
					<Button style={{ margin: 5 }} title='u' value='u'/>
					<Button style={{ margin: 5 }} title='i' value='i'/>
					<Button style={{ margin: 5 }} title='o' value='o'/>
					<Button style={{ margin: 5 }} title='p' value='p'/>

				</View>
				<View style={{ justifyContent: 'center', flex:1, flexDirection: 'row'}}>
					<Button style={{ margin: 5 }} title='a' value='a'/>
					<Button style={{ margin: 5 }} title='s' value='s'/>
					<Button style={{ margin: 5 }} title='d' value='d'/>
					<Button style={{ margin: 5 }} title='f' value='f'/>
					<Button style={{ margin: 5 }} title='g' value='g'/>
					<Button style={{ margin: 5 }} title='h' value='h'/>
					<Button style={{ margin: 5 }} title='j' value='j'/>
					<Button style={{ margin: 5 }} title='k' value='k'/>
					<Button style={{ margin: 5 }} title='l' value='l'/>

				</View>
				<View style={{ justifyContent: 'center', flex:1, flexDirection: 'row'}}>

					<Button style={{ margin: 5 }} title='z' value='z'/>
					<Button style={{ margin: 5 }} title='x' value='x'/>
					<Button style={{ margin: 5 }} title='c' value='c'/>
					<Button style={{ margin: 5 }} title='v' value='v'/>
					<Button style={{ margin: 5 }} title='b' value='b'/>
					<Button style={{ margin: 5 }} title='n' value='n'/>
					<Button style={{ margin: 5 }} title='m' value='m'/>
				</View>
				<Text
					onPress={this.props.switchShowKeyboard}
				>CLOSE</Text>
			</View>
		)
	}
}

class CustomInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: '',
		};
	}

	render() {
		return (
			<View style={{flex: 1}}>
				<Text style={{ padding: 20, borderWidth: 2 }} onPress={this.props.switchShowKeyboard}>
					Balise text a modifier
				</Text>
				{this.props.showKeyboard && <>
					<CustomKeyboard switchShowKeyboard={this.props.switchShowKeyboard} />
				</>}
			</View>
		)
	}
}


class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			test: "debut",
			showKeyboard: false
		};
		this.changeTest = this.changeTest.bind(this);
		this.switchShowKeyboard = this.switchShowKeyboard.bind(this);
	}

	switchShowKeyboard() {
		this.setState({ showKeyboard: (this.state.showKeyboard !== true) })
	}

	changeTest(input) {
		this.setState({ test: input })
	}

	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center' }}>
				<CustomInput
					switchShowKeyboard={this.switchShowKeyboard}
					showKeyboard={this.state.showKeyboard}
				>Home</CustomInput>


				<Text>{this.state.showKeyboard ? 'KEYBOARD OUVERT' : "KEYBOARD FERME"}</Text>
			</View >


		);
	}
}

export default Home