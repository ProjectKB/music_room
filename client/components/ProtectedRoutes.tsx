import React, {useReducer, useMemo} from 'react';
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
};

const ProtectedRoutes = () => {
  const authReducer = (prevState: ReducerState, newState: ReducerState) => {
    switch (newState.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: newState.userToken,
          userId: newState.userId,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userToken: newState.userToken,
          userId: newState.userId,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userToken: null,
          userId: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(authReducer, {
    type: 'RETRIEVE_TOKEN',
    isLoading: true,
    userToken: null,
    userId: null,
  });

  const authContext = useMemo(
    () => ({
      retrieveContext: async () => {
        let userToken: null | string;
        let userId: null | string;

        try {
          userToken = await AsyncStorage.getItem('userToken');
          userId = await AsyncStorage.getItem('userId');
        } catch (e) {
          console.log(e);
        }

        dispatch({
          type: 'RETRIEVE_TOKEN',
          userToken: userToken,
          userId: userId,
        });
      },

      signIn: async (user: User) => {
        try {
          await AsyncStorage.setItem('userToken', user.token);
          await AsyncStorage.setItem('userId', user.id);
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGIN', userToken: user.token, userId: user.id});
      },

      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
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
          <AppContent />
        ) : (
          <AuthStackNavigator />
        )}
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

export default ProtectedRoutes;
