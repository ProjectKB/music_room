import React, {useReducer, useMemo} from 'react';
import AppContent from './AppContent';
import {AuthContext} from '../contexts/AuthContext';
import AuthStackNavigator from './Auth/AuthStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../views/SplashScreen';

const ProtectedRoutes = () => {
  const initialLoginState = {
    isLoading: true,
    userToken: null,
  };

  const authReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.userToken,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.userToken,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(authReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      retrieveContext: async () => {
        let userToken;

        try {
          userToken = await AsyncStorage.getItem('userToken');
        } catch (e) {
          console.log(e);
        }

        dispatch({
          type: 'RETRIEVE_TOKEN',
          userToken: userToken,
        });
      },

      signIn: async userToken => {
        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGIN', userToken: userToken});
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
