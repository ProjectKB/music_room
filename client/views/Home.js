import React, {useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';
import UserContext from '../contexts/UserContext';
import {Button} from 'react-native-paper';

const Home = () => {
  const {signOut} = useContext(AuthContext);
  const {user} = useContext(UserContext);

  return (
    <View style={styles.mainContainer}>
      <Text>Welcome {user.login}</Text>
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
});
