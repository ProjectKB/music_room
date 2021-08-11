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
import {NETWORK} from '@env';



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
			alert("invalid form");
		}
	}
	
	const fetchEventList = useCallback( async (search) =>
	{
		await axios.post(
			NETWORK + '/events/searchEvent',
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
		<View style={{flex: 1, backgroundColor: '#1a1a1a'}}>

{/******************************** MODAL *******************************************/}
{/* <RNModal
  isVisible={modalVisible}
  onSwipeComplete={() => setModalVisible(false)}
  swipeDirection="left">
  <View style={{flex: 1}}>
    <Text>I am the modal content!</Text>
  </View>
</RNModal> */}

			{/* <RNModal
				// animationType="slide"
				isVisible={modalVisible}
				// transparent={true}
				swipeDirection="Down"
				onSwipeComplete={() => setModalVisible(false)}
			>
				<View style={{flex: 1, backgroundColor: 'white', marginHorizontal: 50, marginVertical: 100, borderRadius: 10, borderWidth: 1}}>

					<View>
						<TouchableOpacity
						style={{margin: 10, borderWidth: 2, padding: 20}}
						onPress={() => {
							setModalVisible(false);
						}}
						>
							<Text>Fermer</Text>
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
					
				</View>
			</RNModal> */}
{/***************************************************************************/}
			<View style={styles.playlistStackHeaderContainer}>
				<Headline style={styles.playlistStackHeaderTitle}>
					Event
				</Headline>
				<TouchableOpacity
					onPress={() => {
						setModalVisible(true);
					}}
				>
					<FontAwesomeIcon size={25} icon={faPlus} color="white" />
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
		</View>
	);
}

const styles = StyleSheet.create ({

	modal: {
		// flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderRadius: 10,
		margin: 10,
		shadowOpacity: 0.50
	},

	picture: {
		width: 100,
		height: 100,
		borderRadius: 20
	},

	searchBar: {
		marginHorizontal: 10,
		marginTop: 10,
		marginBottom: 5
	},

	playlistStackHeaderContainer: {
		backgroundColor: '#1a1a1a',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 10
	},

	playlistStackHeaderTitle: {
		backgroundColor: '#1a1a1a',
		fontWeight: 'bold',
		fontSize: 20,
		color: 'white',
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
