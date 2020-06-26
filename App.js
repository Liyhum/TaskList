import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React,{Component} from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import Route from './routes/route'

class App extends Component {
  state = {  }
  render() {
    return (
      <Route/>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
