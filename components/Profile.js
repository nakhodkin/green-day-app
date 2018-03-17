import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';

export class Profile extends React.Component {
    render() {
      return (
            <View style={styles.container}>
                <Text style={styles.text}>Welcome to the Member Area</Text>  
            </View>
      );
    }
  }

export default TabNavigator(
  {
    First: { screen: Profile },
    Second: { screen: Profile },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);
  
  const styles = StyleSheet.create({
    text: {
        color: '#333',
    },
    container: {
      flex: 1,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
  });