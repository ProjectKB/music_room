import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';
import {Button} from 'react-native-paper';

const Home = () => {
  const {signOut} = useContext(AuthContext);

  return (
    <View style={styles.mainContainer}>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
