import React, {useContext, useState} from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
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

const musicPref = [
  'Rap FR',
  'Rap US',
  'Rock',
  'Metal',
  'Classic',
  'Electro',
  'Trance',
  'Low-Fi',
  'House',
];

const Home = () => {
  const {signOut} = useContext(AuthContext);
  const {user} = useContext(UserContext);
  const [avatarSelected, setAvatarSelected] = useState(null);
  const [modal, setModal] = useState(false);
  const [checkActive, setCheckActive] = useState(0);

  console.log('uuuse', user.preferences);

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
        <Text style={{color: 'white'}}>Modifier</Text>
      </Button>
    </View>
  );

  const InfosProfile = () => (
    <View
      style={{
        marginTop: 30,
      }}>
      <View style={styles.line} />
      <View style={styles.containerText}>
        <FontAwesomeIcon size={25} icon={faUser} color="grey" />
        <Text style={styles.textProfile}>{user?.login}</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.containerText}>
        <FontAwesomeIcon size={25} icon={faEnvelope} color="grey" />
        <Text style={styles.textProfile}>{user?.mail}</Text>
      </View>
      <View style={styles.line} />
      <TouchableOpacity
        style={styles.containerText}
        onPress={() => setModal(true)}>
        <FontAwesomeIcon size={25} icon={faMusic} color="white" />
        <Text style={styles.textProfileEditable}>Préférences musicales</Text>
      </TouchableOpacity>
      <View style={styles.line} />
      <TouchableOpacity
        style={styles.containerText}
        onPress={() => setModal(true)}>
        <FontAwesomeIcon size={25} icon={faUserFriends} color="white" />
        <Text style={styles.textProfileEditable}>Amis</Text>
      </TouchableOpacity>
      <View style={styles.line} />
    </View>
  );

  const ModalMusics = () => (
    <View
      style={{
        height: '50%',
        width: '80%',
        backgroundColor: 'silver',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ScrollView
        style={{
          width: '100%',
          margin: 10,
          // backgroundColor: 'red',
          // justifyContent: 'center',
          // alignItems: 'center',
        }}>
        {musicPref.map((e, key) => (
          <>
            <View style={styles.containerFriends}>
              {/* <FontAwesomeIcon size={25} icon={faUserFriends} color="white" /> */}
              {user.preferences.some(e2 => e2 === e) ? (
                <TouchableOpacity
                  onPress={() => console.log('LDLDLD')}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={[
                      styles.containerFriendsText,
                      {color: 'purple', fontWeight: 'bold'},
                    ]}>
                    {e}
                  </Text>
                  <CheckBox
                    value={checkActive === key}
                    onValueChange={() => setCheckActive(key)}
                    style={styles.checkbox}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => console.log('LDLDLD222')}
                  style={{
                    width: '100%',
                    backgroundColor: 'red',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.containerFriendsText}>{e}</Text>
                  <CheckBox
                    value={checkActive === key}
                    onValueChange={() => setCheckActive(key)}
                    style={styles.checkbox}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.line} />
          </>
        ))}
        {/* <View style={styles.line} />
        <View style={styles.containerFriends}>
          <Text style={styles.containerFriendsText}>Amis</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.containerFriends}>
          <Text style={styles.containerFriendsText}>Amis</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.containerFriends}>
          <Text style={styles.containerFriendsText}>Amis</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.containerFriends}>
          <Text style={styles.containerFriendsText}>Amis</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.containerFriends}>
          <Text style={styles.containerFriendsText}>Amis</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.containerFriends}>
          <Text style={styles.containerFriendsText}>Amis</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.containerFriends}>
          <Text style={styles.containerFriendsText}>Amis</Text>
        </View> */}
      </ScrollView>
      <Button
        style={{marginBottom: 10}}
        mode="contained"
        onPress={() => signOut()}>
        Valider
      </Button>
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
        <ModalMusics />
      </Modal>
      <View style={{width: '100%'}}>
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
    backgroundColor: '#1a1a1a',
    // backgroundColor: '#292929'
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
  containerText: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingLeft: '5%',
    // backgroundColor: 'red',
  },
  textProfile: {
    marginLeft: 40,
    fontSize: 17,
    color: 'grey',
  },
  containerFriends: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingLeft: '5%',
    justifyContent: 'center',
    alignContent: 'center',
    // backgroundColor: 'red',
  },
  containerFriendsText: {
    fontSize: 17,
    color: 'white',
  },
  textProfileEditable: {
    marginLeft: 40,
    fontSize: 17,
    color: 'white',
  },
  line: {
    marginLeft: '5%',
    width: '90%',
    height: 1,
    backgroundColor: 'grey',
  },
  checkbox: {
    alignSelf: 'center',
  },
});
