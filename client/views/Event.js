import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Modal, Button, TextInput, Alert } from 'react-native';
import { Searchbar } from 'react-native-paper';
import EventSearchContext from '../contexts/EventSearchContext';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import { Headline } from 'react-native-paper';
import OngoingView from '../components/Event/Ongoing.js';
import FinishedView from '../components/Event/Finished.js';
import PendingView from '../components/Event/Pending.js';


const Event = () => {

	const [EventList, setEventList] = useState({ongoing: [], pending: [], finished: []});
	const [searchQuery, setSearchQuery] = useState('');
	const [createEventName, setCreateEventName] = useState('');
	const [createEventStart, setCreateEventStart] = useState('');
	const [createEventEnd, setCreateEventEnd] = useState('');
	const [modalVisible, setModalVisible] = useState(false);

	const resetValues = () => {
		setCreateEventName('')
		setCreateEventStart('')
		setCreateEventEnd('')
	}

	const createEvent = () => {
		if (createEventName != '' && createEventStart != '' && createEventEnd != '')
		{
			console.log(createEventName);
			console.log(createEventStart);
			console.log(createEventEnd);
			console.log("envoie au back");
			setModalVisible(false);
			resetValues();
		}
		else
		{
			Alert.alert("invalid form", "");
		}
	}
	
	const fetchEventList = useCallback( async (search) =>
	{
		await axios.post(
			global.URL + '/events/searchEvent',
			JSON.stringify(search),
		)
		.then (result => {
			setEventList(result.data);
		})
		.catch(err => {
			console.log(err);
		})
	}, [searchQuery])
	
	useEffect(() => {
		fetchEventList();
	}, [fetchEventList])

	return(
		<View style={{flex: 1}}>
			<View style={styles.playlistStackHeaderContainer}>
				<Headline style={styles.playlistStackHeaderTitle}>
					Event
				</Headline>
				<TouchableOpacity
					onPress={() => {
						setModalVisible(true);
					}}
				>
					<FontAwesomeIcon size={25} icon={faPlus} />
				</TouchableOpacity>
			</View>

			<EventSearchContext.Provider value={searchQuery}>
			<Searchbar
				style={styles.searchBar}
				selectionColor="gray"
				placeholder="Search"
				icon={() => <FontAwesomeIcon size={20} color={'gray'} icon={faSearch} />}
				onChangeText={(text) => {
					fetchEventList(text);
				}}
			/>
			{
				EventList?
				<ScrollView>

					{EventList.ongoing && EventList.ongoing.length != 0?
						<OngoingView
							EventList={EventList}
						/>
						:
						null}

					{EventList.finished && EventList.finished.length != 0?
						<FinishedView
							EventList={EventList}
						/>
						:
						null}

					{EventList.pending && EventList.pending.length != 0?
						<PendingView
							EventList={EventList}
						/>
						:
						null}

				</ScrollView>
				:
				null
			}

			</EventSearchContext.Provider>

			<Modal
				animationType="slide"
				visible={modalVisible}
				style={styles.modal}
			>
					<View style={{flexDirection: 'row'}}>
						<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
							<Headline style={styles.playlistStackHeaderTitle}>Create Event</Headline>
						</View>
						<View style={{justifyContent: 'center', alignItems: 'center', margin: 10}}>
							<Button
								title=" X "
								color="red"
								onPress={() => {	
									setModalVisible(false);
								}}
								/>
						</View>
					</View>
					<View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>

						<TextInput
							style={styles.input}
							value={createEventName}
							placeholderTextColor="grey"
							placeholder="Name"
							onChangeText={text => setCreateEventName(text)}
						/>

						<View style={{flexDirection: 'row'}}>
							<TextInput
								style={styles.input}
								value={createEventStart}
								placeholderTextColor="grey"
								placeholder="Start"
								onChangeText={text => setCreateEventStart(text)}
							/>

							<TextInput
								style={styles.input}
								value={createEventEnd}
								placeholderTextColor="grey"
								placeholder="End"
								onChangeText={text => setCreateEventEnd(text)}
							/>
						</View>

						<TouchableOpacity style={styles.inputBlue}>
							<Text style={{color: 'blue'}}>Choose a picture</Text>
						</TouchableOpacity>
					</View>
					<View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
						<TouchableOpacity style={styles.validButton}
						onPress={() => {
							createEvent();
						}}
						>
							<Text style={{color: 'white'}}>Valider</Text>
						</TouchableOpacity>
					</View>
					
			</Modal>

		</View>
	);
}

const styles = StyleSheet.create ({
	modal: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderRadius: 10,
		margin: 10
	},

	picture: {
		width: 100,
		height: 100,
		borderRadius: 20
	},

	searchBar: {
		marginHorizontal: 10,
		marginTop: 10,
	},

	playlistStackHeaderContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: 'white',
		padding: 10
	},

	playlistStackHeaderTitle: {
	  fontWeight: 'bold',
	  fontSize: 20,
	  flex: 6,
	},

	input: {
		borderWidth: 2,
		borderRadius: 5,
		borderColor: 'black',
		padding: 20,
		margin: 20,
		color: 'black'
	},

	inputBlue: {
		borderWidth: 2,
		borderRadius: 5,
		borderColor: 'blue',
		padding: 20,
		margin: 20,
		color: 'blue'
	},

	nameInput: {
		paddingHorizontal: 20
	},

	validButton: {
		padding: 20,
		margin: 10,
		borderRadius: 10,
		backgroundColor: 'blue'
	}
})

export default Event
