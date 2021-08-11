/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Button} from 'react-native-paper';
import {CreatePlaylist} from '../../api/PlaylistEndpoint';
import {FlashMessage} from '../FlashMessage';
import UserContext from '../../contexts/UserContext';
import {RadioButton} from 'react-native-paper';

const EventCreationModal = props => {

	const [eventName, setEventName] = useState('');
	const [eventStatus, setEventStatus] = useState('public');
	const [inputIsEmpty, setInputIsEmpty] = useState(false);

	const {user} = useContext(UserContext);

	const inputErrorText = inputIsEmpty
		? '* you have to choose a name for your playlist'
		: '';

	const flashMessageSuccess = `${eventName} has been successfully added!`;
	const flashMessageFailure = 'An error has occurred, please retry later!';

	return (
		<View style={styles.mainContainer}>
			<View style={styles.textInputContainer}>
				<TextInput
				style={{fontSize: 25}}
				selectionColor="#8c8c8c"
				mode="flat"
				placeholder="Pick a Name"
				placeholderTextColor='#a1a1a1'
				onChangeText={text => {
					setEventName(text);
					if (text === '') {
					setInputIsEmpty(true);
					} else if (inputIsEmpty && text !== '') {
					setInputIsEmpty(false);
					}
				}}
				/>
				<Text style={styles.textError}>{inputErrorText}</Text>
			</View>
			<View style={styles.visibilityContainer}>
				<RadioButton.Group
				onValueChange={value => {
					setEventStatus(value);
				}}
				value={eventStatus}>
				<View style={styles.radioButtonGroup}>
					<View style={styles.radioButton}>
					<RadioButton
						color="#899ed6"
						value="public"
						status={eventStatus === 'public' ? 'checked' : 'unchecked'}
					/>
					<Text>Public</Text>
					</View>
					<View style={styles.radioButton}>
					<RadioButton
						color="#899ed6"
						value="private"
						status={eventStatus === 'private' ? 'checked' : 'unchecked'}
					/>
					<Text>Private</Text>
					</View>
				</View>
				</RadioButton.Group>
			</View>
			<View style={styles.dialogActionContainer}>
				<Button
				color="#899ed6"
				onPress={() => {
					props.setModalVisibility(false);
					if (inputIsEmpty) {
					setInputIsEmpty(false);
					}
				}}>
				Cancel
				</Button>
				<Button
				color="#899ed6"
				onPress={() => {
					if (eventName === '') {
					if (!inputIsEmpty) {
						setInputIsEmpty(true);
					}
					} else {
					const responseStatus = CreatePlaylist(
						props.setPlaylistCollection,
						eventName,
						eventStatus,
						user.id,
					);

					responseStatus.then(status =>
						FlashMessage(status, flashMessageSuccess, flashMessageFailure),
					);
					props.setModalVisibility(false);
					setEventName('');
					}
				}}>
				Create
				</Button>
			</View>
		</View>
	);
};

export default EventCreationModal;

const styles = StyleSheet.create({
mainContainer: {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	margin: 25,
},
textInputContainer: {
	backgroundColor: '#f3f1f4',
	paddingHorizontal: 10,
	paddingTop: 10,
	borderTopLeftRadius: 5,
	borderTopRightRadius: 5,
	width: '100%',
},
visibilityContainer: {
	backgroundColor: '#f3f1f4',
	width: '100%',
	paddingRight: 20,
	paddingLeft: 10,
	paddingBottom: 5,
},
textError: {
	color: '#b00012',
	fontSize: 12,
	paddingLeft: 5,
	marginTop: -10,
},
dialogActionContainer: {
	flexDirection: 'row',
	padding: 10,
	justifyContent: 'flex-end',
	backgroundColor: '#e8e6e9',
	width: '100%',
	borderBottomEndRadius: 5,
	borderBottomStartRadius: 5,
},
radioButton: {
	flexDirection: 'row',
	justifyContent: 'flex-start',
	alignItems: 'center',
},
radioButtonGroup: {
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
},
});
