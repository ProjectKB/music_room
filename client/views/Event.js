import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Modal, TextInput } from 'react-native';
import EventSearchContext from '../contexts/EventSearchContext';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import { Headline, Searchbar, Button } from 'react-native-paper';
import OngoingView from '../components/Event/Ongoing.js';
import FinishedView from '../components/Event/Finished.js';
import PendingView from '../components/Event/Pending.js';
import LinearGradient from 'react-native-linear-gradient'
import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-community/picker';

const Event = () => {

	const [EventList, setEventList] = useState({ongoing: [], pending: [], finished: []});
	const [searchQuery, setSearchQuery] = useState('');
	const [createEventName, setCreateEventName] = useState('');
	const [modalVisible, setModalVisible] = useState(false);
	const [eventPrivate, setEventPrivate] = useState(false);
	const [eventStatus, setEventStatus] = useState('pending');

	const resetValues = () => {
		setModalVisible(false);
		setCreateEventName('');
		setEventPrivate(false);
		setEventStatus('pending');
	}

	const createEvent = () => {
		if (createEventName != '')
		{
			axios.post(
				global.URL + '/events',
				JSON.stringify({name: createEventName, private: eventPrivate, status: eventStatus}),
			)
			.then(result => {
				console.log(result);
			})
			.catch(err => {
				console.log(err);
			})
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
						<View style={{flex: 1}}>
							<Headline style={{fontWeight: 'bold', fontSize: 20, flex: 6, color: '#6612E8'}}>Create Event</Headline>
						</View>
						<View style={{flex: 5}}>
							<ScrollView>
								<View style={{justifyContent: 'center', alignItems: 'center'}}>
									<TextInput
										style={styles.input}
										value={createEventName}
										placeholderTextColor="grey"
										placeholder="Name"
										onChangeText={text => setCreateEventName(text)}
									/>

									<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 10}}>
										<CheckBox
											tintColors={{ true: '#6612E8' }}
											value={eventPrivate}
											onValueChange={(newValue) => setEventPrivate(newValue)}
										/>
										<Text>Private</Text>
									</View>

									<View style={{margin: 10}}>
										<Picker
										selectedValue={eventStatus}
										style={{height: 50, width: 150, marginLeft: 50}}
										onValueChange={(itemValue, itemIndex) =>
											setEventStatus(itemValue)
										}>
											<Picker.Item label="pending" value="pending" />
											<Picker.Item label="ongoing" value="ongoing" />
											<Picker.Item label="finished" value="finished" />
										</Picker>
									</View>

									<TouchableOpacity style={styles.inputBlue}>
										<Text style={{color: 'blue'}}>Choose a picture</Text>
									</TouchableOpacity>
								</View>
							</ScrollView>
						</View>
						<View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row'}}>
							<Button
							mode="contained"
							style={{margin: 10}}
							onPress={() => {
								resetValues();
							}}>
								Cancel
							</Button>
							<Button
							mode="contained"
							style={{margin: 10}}
							onPress={async () => {
								await createEvent();
								await fetchEventList("");
							}}>
								Valider
							</Button>
						</View>
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
		alignItems: 'center',
		borderRadius: 10,
		marginVertical: 150,
		marginHorizontal: 50,
		backgroundColor: 'white',
		borderWidth: 1
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
		paddingVertical: 10,
		paddingHorizontal: 50,
		color: 'black',
		margin: 10
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
