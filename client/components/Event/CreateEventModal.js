import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Headline } from 'react-native-paper';
import {Button} from 'react-native-paper';

const CreateEventModal = props => {

	const [createEventName, setCreateEventName] = useState('');
	const [createEventStart, setCreateEventStart] = useState('');
	const [createEventEnd, setCreateEventEnd] = useState('');
	const [modalVisible, setModalVisible] = useState(props.modalVisible);

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
	
	return(
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
                                resetValues();
                                // props.modalVisible = false;
                                setModalVisible(false);
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

export default CreateEventModal
