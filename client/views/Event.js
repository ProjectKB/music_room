import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, ScrollView, View, Image, TouchableOpacity, Modal, Button } from 'react-native';
import { Searchbar } from 'react-native-paper';
import EventSearchContext from '../contexts/EventSearchContext';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import { Headline } from 'react-native-paper';


const Event = () =>{

	const defaultImg = 'data:image/png;base64,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';
	const [EventList, setEventList] = useState([])
	const [searchQuery, setSearchQuery] = useState('')
	const [ongoingVisible, setOngoingVisible] = useState(false)
	const [pendingVisible, setPendingVisible] = useState(false)
	const [finishedVisible, setFinishedVisible] = useState(false)
	const [modalVisible, setModalVisible] = useState(false)
	
	const eventListVisible = () =>
	{
		let a = false
		let b = false
		let c = false
		for (const event in EventList)
		{
			if (EventList[event].status == "ongoing") {
				a = true
			}
			else if (EventList[event].status == "pending") {
				b = true
			}
			else if (EventList[event].status == "finished") {
				c = true
			}
		}
		
		setOngoingVisible(a)
		setPendingVisible(b)
		setFinishedVisible(c)
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
		eventListVisible();
	}, [fetchEventList])

	return(
		<View style={{flex: 1}}>
			<View style={styles.playlistStackHeaderContainer}>
				<Headline style={styles.playlistStackHeaderTitle}>
					Event
				</Headline>
				<TouchableOpacity
					onPress={() => {
						// setState({modalVisible: true})
					}}
				>
					<FontAwesomeIcon size={20} icon={faPlus} />
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

			<ScrollView>
				{
					ongoingVisible == true?
					<View>
						{
							ongoingVisible == true?
							<Text style={{fontFamily: 'Cochin'}}>On Going</Text>
							:
							null
						}
						
						<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
							<ScrollView horizontal={true}>
								{
									EventList ?
									EventList.map((event, i) =>
										<View key={i}>
											{
												event.status == "ongoing"?
												<TouchableOpacity style={{flex: 1, margin: 5, alignItems: 'center', justifyContent: 'center'}}>
													{
														event.picture != null && event.picture != "path_to_default_picture"?
														<Image
															style={styles.picture}
															source={{uri: event.picture}}
														/>
														:
														<Image
															style={styles.picture}
															source={{uri: defaultImg}}
														/>
													}
													<Text style={{marginLeft: 10}}>{event.name}</Text>
												</TouchableOpacity>
												:
												null
											}
										</View>
									)
									:
									<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
										<View style={{flex: 1}}>
											<Text style={{color: 'red'}}>No Event</Text>
										</View>
									</View>
								}
							</ScrollView>
						</View>

					</View>
					:
					null
				}

				{
					finishedVisible == true?
					<View>
						<Text style={{fontFamily: 'Cochin'}}>Finished</Text>
						<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
							<ScrollView horizontal={true}>
								{
									EventList ?
									EventList.map((event, i) =>
										<View key={i}>
											{
												event.status == "finished"?
												<TouchableOpacity style={{flex: 1, margin: 5, alignItems: 'center', justifyContent: 'center'}}>
													{
														event.picture != null && event.picture != "path_to_default_picture"?
														<Image
															style={styles.picture}
															source={{uri: event.picture}}
														/>
														:
														<Image
															style={styles.picture}
															source={{uri: defaultImg}}
														/>
													}
													<Text style={{marginLeft: 10}}>{event.name}</Text>
												</TouchableOpacity>
												:
												null
											}
										</View>
									)
									:
									<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
										<View style={{flex: 1}}>
											<Text style={{color: 'red'}}>No Event</Text>
										</View>
									</View>
								}
							</ScrollView>
						</View>

					</View>
					:
					null
				}

				{
					pendingVisible == true?
					<View>
						<Text style={{fontFamily: 'Cochin'}}>Pending</Text>
						<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
							<ScrollView horizontal={true}>
								{
									EventList ?
									EventList.map((event, i) =>
										<View key={i}>
											{
												event.status == "pending"?
												<TouchableOpacity style={{flex: 1, margin: 5, alignItems: 'center', justifyContent: 'center'}}>
													{
														event.picture != null && event.picture != "path_to_default_picture"?
														<Image
															style={styles.picture}
															source={{uri: event.picture}}
														/>
														:
														<Image
															style={styles.picture}
															source={{uri: defaultImg}}
														/>
													}
													<Text style={{marginLeft: 10}}>{event.name}</Text>
												</TouchableOpacity>
												:
												null
											}
										</View>
									)
									:
									<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
										<View style={{flex: 1}}>
											<Text style={{color: 'red'}}>No Event</Text>
										</View>
									</View>
								}
							</ScrollView>
						</View>

					</View>
					:
					null
				}
			</ScrollView>

			</EventSearchContext.Provider>

			<Modal
				animationType="slide"
				visible={modalVisible}
				style={styles.modal}
			>
					<View style={{flexDirection: 'row'}}>
						<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
							<Text>Create Event</Text>
						</View>
						<View style={{justifyContent: 'center', alignItems: 'center', margin: 10}}>
							<Button
								title=" X "
								color="red"
								onPress={() => {	
									setState({modalVisible: false});
								}}
								/>
						</View>
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
	}
})

export default Event
