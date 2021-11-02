/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useCallback, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';
import UserContext from '../contexts/UserContext';
import {Button} from 'react-native-paper';
import {Friend} from '../types/Types';

type HomeProps = {
  newFriend: Friend;
};

const Home = (props: HomeProps) => {
  const {signOut} = useContext(AuthContext);
  const {user, setUser} = useContext(UserContext);

  const updateFriends = useCallback(() => {
    if (props.newFriend) {
      setUser({
        ...user,
        friends: user.friends
          ? [...user.friends, props.newFriend]
          : [props.newFriend],
      });
    }
  }, [props.newFriend]);

  useEffect(() => updateFriends(), [updateFriends]);

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
