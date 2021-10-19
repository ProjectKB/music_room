import React, {useContext, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';
import UserContext from '../contexts/UserContext';
import {Button} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BottomSheet from 'react-native-bottomsheet';
// import ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUser,
  faEnvelope,
  faMusic,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-native-modal';

const Home = () => {
  const {signOut} = useContext(AuthContext);
  const {user} = useContext(UserContext);
  const [avatarSelected, setAvatarSelected] = useState(null);
  const [modal, setModal] = useState(false);

  console.log('uuuse', user);

  function _buttonImage() {
    // ImagePicker.launchCamera()
    ImagePicker.launchImageLibrary(ImagePicker.CameraOptions, response => {
      console.log('response', response);
      if (response.didCancel) {
        // this.setState({loading: false});
        //   console.log('User cancelled image picker');
      } else if (response.error) {
        // this.setState({loading: false})
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // this.setState({loading: false})
        console.log('Customm Error: ', response);
      } else {
        console.log('ress', response);
        const source = {uri: response.uri};
        setAvatarSelected(source);
      }
    });
  }

  const pictureSelector = () =>
    BottomSheet.showBottomSheetWithOptions(
      {
        options: ['Galerie', 'Annuler'],
        dark: true,
        cancelButtonIndex: 2,
      },
      value => {
        if (value === 0) {
          _buttonImage();
        }
      },
    );

  const ImgProfile = () => (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity onPress={() => pictureSelector()}>
        <Image
          style={styles.imgContainer}
          source={{
            uri: user?.avatar
              ? null
              : 'https://geeko.lesoir.be/wp-content/uploads/2020/05/avatar.jpg',
          }}
        />
      </TouchableOpacity>
      <Button onPress={() => pictureSelector()}>
        <Text>Modifier</Text>
      </Button>
    </View>
  );

  const InfosProfile = () => (
    <View style={{marginTop: 30}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <FontAwesomeIcon size={25} icon={faUser} color="#292929" />
        <Text style={{marginLeft: 40, fontSize: 17}}>{user?.login}</Text>
      </View>
      <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
        <FontAwesomeIcon size={25} icon={faEnvelope} color="#292929" />
        <Text style={{marginLeft: 40, fontSize: 17}}>{user?.mail}</Text>
      </View>
      <TouchableOpacity
        style={{
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'red',
        }}
        onPress={() => setModal(true)}>
        <FontAwesomeIcon size={25} icon={faMusic} color="#292929" />
        <Text style={{marginLeft: 40, fontSize: 17}}>
          Préférences musicales
        </Text>
      </TouchableOpacity>
      <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
        <FontAwesomeIcon size={25} icon={faUserFriends} color="#292929" />
        <Text style={{marginLeft: 40, fontSize: 17}}>Amis</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      {/* <Text>Welcome {user.login}</Text> */}
      <Modal
        onBackdropPress={() => setModal(false)}
        isVisible={modal}
        // swipeDirection='down'
        style={styles.modalStyle}
        backdropTransitionOutTiming={0}
        // onRequestClose={() => {this.setState({visible: false})}}
      >
        <View
          style={{
            height: '50%',
            width: '80%',
            backgroundColor: 'green',
            borderRadius: 15,
          }}>
          <Text>ok</Text>
        </View>
      </Modal>
      <View>
        <ImgProfile />
        <InfosProfile />
      </View>
      <Button mode="contained" onPress={() => signOut()}>
        Logout
      </Button>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  imgContainer: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  modalStyle: {
    margin: 0,
    // justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
    // height: 300,
    // width: 300,
  },
});
