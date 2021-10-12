/* eslint-disable no-undef */
import React, {useReducer, useMemo, useRef} from 'react';
import AppContent from './AppContent';
import {AuthContext} from '../contexts/AuthContext';
import AuthStackNavigator from './Auth/AuthStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../views/SplashScreen';
import {User} from '../types/Types';

type ReducerState = {
  type: 'RETRIEVE_TOKEN' | 'LOGIN' | 'LOGOUT';
  isLoading?: boolean;
  userToken?: null | string;
  userId?: null | string;
  userLogin?: null | string;
};

const ProtectedRoutes = () => {
  const ws = useRef(undefined);

  const initWebSocket = (userLogin: string) => {
    ws.current = new WebSocket(global.URL + '/websocket');

    ws.current.onopen = function () {
      ws.current.send(
        new Blob([JSON.stringify({to: '', content: userLogin})], {
          type: 'application/json',
        }),
      );
    };
  };

  const authReducer = (prevState: ReducerState, newState: ReducerState) => {
    switch (newState.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: newState.userToken,
          userId: newState.userId,
          userLogin: newState.userLogin,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userToken: newState.userToken,
          userId: newState.userId,
          userLogin: newState.userLogin,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userToken: null,
          userId: null,
          userLogin: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(authReducer, {
    type: 'RETRIEVE_TOKEN',
    isLoading: true,
    userToken: null,
    userId: null,
    userLogin: null,
  });

  const authContext = useMemo(
    () => ({
      retrieveContext: async () => {
        let userToken: null | string;
        let userId: null | string;
        let userLogin: null | string;

        try {
          userToken = await AsyncStorage.getItem('userToken');
          userId = await AsyncStorage.getItem('userId');
          userLogin = await AsyncStorage.getItem('userLogin');

          if (userLogin) {
            initWebSocket(userLogin);
          }
        } catch (e) {
          console.log(e);
        }

        dispatch({
          type: 'RETRIEVE_TOKEN',
          userToken: userToken,
          userId: userId,
          userLogin: userLogin,
        });
      },

      signIn: async (user: User) => {
        try {
          await AsyncStorage.setItem('userToken', user.token);
          await AsyncStorage.setItem('userId', user.id);
          await AsyncStorage.setItem('userLogin', user.login);

          initWebSocket(user.login);
        } catch (e) {
          console.log(e);
        }
        dispatch({
          type: 'LOGIN',
          userToken: user.token,
          userId: user.id,
          userLogin: user.login,
        });
      },

      signOut: async () => {
        let userLogin: null | string;

        try {
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('userId');

          userLogin = await AsyncStorage.getItem('userLogin');

          ws.current.send(userLogin);

          await AsyncStorage.removeItem('userLogin');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
    }),
    [],
  );

  if (loginState.isLoading) {
    return <SplashScreen {...authContext} />;
  }

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        {loginState.userToken !== null ? (
          <AppContent ws={ws.current} />
        ) : (
          <AuthStackNavigator />
        )}
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

export default ProtectedRoutes;
