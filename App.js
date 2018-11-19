import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, PROVIDER_GOOGLE} from 'react-native';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import Map from './src/screens/Map';

console.disableYellowBox = true;



type Props = {};
export default class App extends Component<Props> {

  render() {
    return (
      <Map />
    );
  }
}

