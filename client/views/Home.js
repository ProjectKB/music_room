import React, {useContext} from 'react';
import {StyleSheet, View, Text, ScrollView, Image} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';
import UserContext from '../contexts/UserContext';
import {Button} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient'


const Home = () => {
  const {signOut} = useContext(AuthContext);
  const {user} = useContext(UserContext);

  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        colors={['purple', 'black']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
          <View style={styles.firstView} >
            <Image source={{uri:user.avatar}} style={styles.avatarContainer}></Image>
            {console.log(user.login)}
            <Text style= {styles.loginUser}>
              {user.login}
            </Text>
          </View>
            <Text>Welcome {user.login}</Text>
              <Button mode="contained" onPress={() => signOut()}>
                Logout
              </Button>
      </LinearGradient>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // justifyContent: 'space-evenly',
    // alignItems: 'center',
  },
  container:{
    flex : 1,
    alignItems: 'center',
  },
  firstView :
  {
    alignItems: 'center',
  },
  avatarContainer : {
    width: 140,
    height:140,
    borderRadius:100,
    marginTop: 80,
    alignItems: 'center',
  },
  loginUser : {
    fontSize: 40,
    color: 'white',
    fontWeight : 'bold',
    alignItems: 'center',
    padding: 10,
  }
});
