/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useReducer, useEffect} from 'react';
import {StyleSheet, StatusBar, View, Dimensions} from 'react-native';
import Video from 'react-native-video';
import AppContent from './components/AppContent';
import {NETWORK} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './contexts/AuthContext';
import AuthStackNavigator from './components/Auth/AuthStackNavigator';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  global.URL = NETWORK;

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(
    () => ({
      signIn: async foundUser => {
        // call API SIGNIN
        const userToken = 'token';
        const userName = 'username';

        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGIN', id: userName, token: userToken});
      },

      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },

      signUp: () => {
        // call api SIGNUP
      },
    }),
    [],
  );

  const ProtectedRoutes = () => {
    if (loginState.isLoading) {
      return (
        <Video
          source={require('./assets/video/intro.mp4')}
          style={styles.introVideo}
          onEnd={async () => {
            let userToken = null;

            try {
              userToken = await AsyncStorage.getItem('userToken');
            } catch (e) {
              console.log(e);
            }

            dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
          }}
        />
      );
    }

    return (
      <NavigationContainer>
        <AuthContext.Provider value={authContext}>
          {loginState.userToken !== null ? (
            <AppContent />
          ) : (
            <AuthStackNavigator />
          )}
        </AuthContext.Provider>
      </NavigationContainer>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="#1a1a1a" />
      <ProtectedRoutes />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  introVideo: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2 - 120,
    left: Dimensions.get('window').width / 2 - 134,
    bottom: 0,
    right: 0,
  },
});
