import React from 'react';
import {View, Text, Button} from 'react-native';
import {getUsers} from '../api/mock';
import {setToken} from '../api/token';

export default class HomeScreen extends React.Component {
  state = {users: [], hasLoadedUsers: false, userLoadingErrorMessage: ''};

  loadUsers() {
    this.setState({hasLoadedUsers: false, userLoadingErrorMessage: ''});
    getUsers()
      .then(users => {
        this.setState({
          hasLoadedUsers: true,
          users,
        });
      })
      .catch(this.handleUserLoadingError);
  }

  logOut = async () => {
    this.setState({hasLoadedUsers: false, users: []});
    setToken('');
    this.props.navigation.navigate('LoginScreen');
  };

  handleUserLoadingError = res => {
    if (res.error === 401) {
      this.props.navigation.navigate('LoginScreen');
    } else {
      this.setState({
        hasLoadedUsers: false,
        userLoadingErrorMessage: res.message,
      });
    }
  };

  componentDidMount() {
    this.props.navigation.addListener('didFocus', () => {
      if (!this.state.hasLoadedUsers) {
        this.loadUsers();
      }
    });
  }

  render() {
    const {users, userLoadingErrorMessage} = this.state;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>HomeScreen</Text>
        {users.map(user => (
          <Text key={user.email}>{user.email}</Text>
        ))}
        {userLoadingErrorMessage ? (
          <Text>{userLoadingErrorMessage}</Text>
        ) : null}
        <Button title="Log out" onPress={this.logOut} />
      </View>
    );
  }
}
