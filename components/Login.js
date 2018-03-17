import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  AsyncStorage,
  KeyboardAvoidingView
} from 'react-native';
import firebase from 'firebase';
import { Input } from './Input';
import { Button } from './Button';
import { LiveUpdate } from './LiveUpdate';

export default class Login extends React.Component {
    state = {
      email: '',
      password: '',
      authenticating: false,
    };
  
    componentWillMount() {
      const firebaseConfig = {
        apiKey: 'AIzaSyDktkqjYjjdtOSj_QgWK1psmuCVFPavuq0',
        authDomain: 'green-day-app.firebaseapp.com',
      };
  
      firebase.initializeApp(firebaseConfig);
  
      firebase.auth().onAuthStateChanged((user) => {
        console.log('user: ', user);
      });
    }

    componentDidMount() {
        AsyncStorage.removeItem('user');
        this.loadInitialState().done();
    }
  
    onPressSignIn() {
      this.setState({
        authenticating: true,
      });
      firebase.auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(r => {
            AsyncStorage.setItem('user', 'y');
            console.log('sign in ', r);
        })
        .then(() => {
          this.setState({
            authenticating: false,
          });
          this.props.navigation.navigate('Profile');
        })
        .catch(() => {
            alert(123);
            this.setState({
                authenticating: false,
              });
        });
    }

    loadInitialState = async () => {
        const value = await AsyncStorage.getItem('user');

        console.log('value ', value);
        
        if (value !== null) {
            this.props.navigation.navigate('Profile');
        }
    };
  
    renderCurrentState() {
      if (this.state.authenticating) {
        return (
          <View style={styles.form}>
            <ActivityIndicator size="large" />
          </View>
        );
      }
  
      return (
        <View style={styles.form}>
          <LiveUpdate />
          <Text style={styles.header}>- LOGIN -</Text>  
          <Input
            placeholder="Enter your email..."
            label="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <Input
            placeholder="Enter your password..."
            label="Password"
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <Button onPress={() => this.onPressSignIn()}>Log in</Button>
        </View>
      );
    }
  
    render() {
      return (
        <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>  
            <View style={styles.container}>
                {this.renderCurrentState()}
            </View>
        </KeyboardAvoidingView>
      );
    }
  }
  
  const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    header: {
        fontSize: 24,
        marginBottom: 60,
        color: '#333',
        fontWeight: '700',
        textAlign: 'center',
    },
    container: {
      flex: 1,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    form: {
      flex: 1,
    },
  });