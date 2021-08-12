import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { Searchbar } from 'react-native-paper';
import EventSearchContext from '../contexts/EventSearchContext';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import { Headline } from 'react-native-paper';
import OngoingView from '../components/Event/Ongoing.js';
import FinishedView from '../components/Event/Finished.js';
import PendingView from '../components/Event/Pending.js';
import {Button} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient'

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
			axios.post(
				global.URL + '/events',
				JSON.stringify({name: createEventName, start: createEventStart, end: createEventEnd}),
			)
			.then(result => {
				console.log(result);
			})
			.catch(err => {
				console.log(err);
			})
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
			<LinearGradient
				colors={['purple', 'black']}
				style={{flex: 1}}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
			>
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

	{/**************************** MODAL *********************************/}
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
				>
					<View style={styles.modal}>

						<View style={{flexDirection: 'row'}}>
							<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
								<Headline style={styles.playlistStackHeaderTitle}>Create Event</Headline>
							</View>
						</View>
							<ScrollView>
								<View style={{flex: 5, justifyContent: 'center', alignItems: 'center'}}>
									<TextInput
										style={styles.input}
										value={createEventName}
										placeholderTextColor="grey"
										placeholder="Name"
										onChangeText={text => setCreateEventName(text)}
									/>
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

									<TouchableOpacity style={styles.inputBlue}>
										<Text style={{color: 'blue'}}>Choose a picture</Text>
									</TouchableOpacity>
								</View>
								<View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row'}}>
									<Button
									mode="contained"
									style={{margin: 10}}
									onPress={() => {
										setModalVisible(false);
										setCreateEventStart('');
										setCreateEventEnd('');
										setCreateEventName('');
									}}>
										Cancel
									</Button>
									<Button
									mode="contained"
									style={{margin: 10}}
									onPress={() => {
										createEvent();
									}}>
										Valider
									</Button>
								</View>
							</ScrollView>
					</View>
				</Modal>
	{/*************************************************************/}
			</LinearGradient>

		</View>
	);
}

const styles = StyleSheet.create ({
	modal: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		marginVertical: 200,
		marginHorizontal: 50,
		backgroundColor: 'white'
	},

	picture: {
		width: 100,
		height: 100,
		borderRadius: 20
	},

	searchBar: {
		marginHorizontal: 10,
		marginVertical: 10,
	},

	playlistStackHeaderContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 10
	},

	playlistStackHeaderTitle: {
	  fontWeight: 'bold',
	  fontSize: 20,
	  flex: 6,
	  color: 'white'
	},

	input: {
		borderTopColor: 'black',
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		borderTopWidth: 1,
		borderRadius: 5,
		borderColor: 'black',
		paddingVertical: 10,
		paddingHorizontal: 50,
		margin: 10,
		color: 'black'
	},

	inputBlue: {
		borderWidth: 2,
		borderRadius: 5,
		borderColor: 'blue',
		padding: 20,
		margin: 10,
		color: 'blue'
	}
})

export default Event
