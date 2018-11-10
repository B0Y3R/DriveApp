/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import MapView from 'react-native-maps';
import { Marker }  from 'react-native-maps';



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  state = {
    position: {
      coordinates: {
        latitude: 38,
        longitude: -98,
        latitudeDelta: 1,
        longitudeDelta: 1,
      }
    }
  }


  componentDidMount() {
    navigator.geolocation.watchPosition(
      (pos) => {
        this.setState({
          position: {
            coordinates: {
              ...pos.coords,
              longitudeDelta: 1,
              latitudeDelta: 1,
            }
          }
        });
        debugger;
        console.log('success:',  pos.coords);
      },
      () => {
        console.log('FAIL');
      }
    )
  }

  render() {
    debugger;
    console.log("oh fuck yeah bud")
    console.log('state:', this.state.position)
    return (
      <View style={styles.container}>
        <MapView
        style={styles.map}
        region={this.state.position.coordinates}
        initialRegion={this.state}


        />  
      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
