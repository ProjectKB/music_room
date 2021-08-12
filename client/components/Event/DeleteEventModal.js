// import React, { useState } from 'react'
// import { Text, View, Modal, StyleSheet } from 'react-native'
// import axios from 'axios';
// import { Headline } from 'react-native-paper';
// import {Button} from 'react-native-paper';

// const DeleteEventModal = props => {
//     return(
//         <Modal
//             animationType="slide"
//             transparent={true}
//             visible={props.modalVisible}
//         >
//             <View style={styles.modal}>

//                 <View style={{flexDirection: 'row'}}>
//                     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
//                         <Headline style={styles.playlistStackHeaderTitle}>Delete Event</Headline>
//                     </View>
//                 </View>

//                 <View style={{flex: 1, justifyContent: 'center'}}>
//                     <Text>Do you want to delete this event ?</Text>
//                 </View>

//                 <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row'}}>
//                     <Button
//                     mode="contained"
//                     style={{margin: 10}}
//                     onPress={() => {
//                     }}>
//                         Cancel
//                     </Button>
//                     <Button
//                     mode="contained"
//                     style={{margin: 10}}
//                     onPress={() => {
//                         const id = props.id
//                         axios.delete(global.URL + '/events/' + id);
//                         alert("event supprimé");
//                     }}>
//                         Delete
//                     </Button>
//                 </View>
//             </View>
//         </Modal>
//     );
// }


// const styles = StyleSheet.create ({
//     modal: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		borderRadius: 10,
// 		marginVertical: 300,
// 		marginHorizontal: 50,
// 		backgroundColor: 'white'
// 	}
// })


// export default DeleteEventModal