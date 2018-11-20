import React from 'react';
import {Platform, StyleSheet, Text, View, PROVIDER_GOOGLE} from 'react-native';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

type Props = {};
export default class Map extends React.Component<Props> {
state = {
    position: {
      coordinates: {
        latitude: 38,
        longitude: -98,
        latitudeDelta: 1,
        longitudeDelta: 1,
      }
    },
    markers: [],
    destination: {
      coordinates: {
        latitude: null,
        longitude: null,
      }
    },
    waypoints: [],
  }

  componentDidMount() {
    navigator.geolocation.watchPosition(
      (pos) => {
        this.setState({
          position: {
            coordinates: {
              ...pos.coords,
            }
          },
          markers: [
            {
              coordinates: {
                ...pos.coords,
              }
            }
          ],
          destination: {
            coordinates: {
              ...pos.coords,
            }
          }
        });
        console.log('success:',  pos.coords);
      },
      () => {
        console.log('FAIL');
      }
    )
  }

  addDestination(newMarkerPos) {
    this.addMarker(newMarkerPos)
       //clone new positon as object 
       const pos = Object.assign({}, newMarkerPos);
       //extracts latitude from new object created above
       const lat =  pos.coordinate.latitude;
       //longitude 
       const long = pos.coordinate.longitude;

       const dest = {
         coordinates: {
           latitude: lat,
           longitude: long,
           latitudeDelta: null,
           longitudeDelta: null,
         }
       }

       const destination = this.state.destination;
       const waypoints = this.state.waypoints;

       waypoints.push(this.state.destination.coordinates);

       this.setState({
         destination: dest,
         waypoints: waypoints,
       });
  }
  

  //Creates New Marker 
  addMarker(newMarkerPos) {

    //clone new marker positon as object 
    const pos = Object.assign({}, newMarkerPos);
    //extracts latitude from new object created above
    const lat =  pos.coordinate.latitude;
    //longitude 
    const long= pos.coordinate.longitude;


    //sets new Variable for coordinates in order to push to markers array
    const marker = {
        coordinates: {
          latitude: lat,
          longitude: long,
        }
      }

    //sets variable array to push new marker coords into 
    const Markers = this.state.markers;
    //pushes new markers into markers array
     Markers.push(marker);
    

    this.setState({
      markers: Markers
    });
  }

  

  render() {

    const origin = this.state.position.coordinates;
      console.log(origin);
    const destination = this.state.destination.coordinates;
      console.log('destination:', this.state.destination.coordinates);
      console.log('click:' )
    const GOOGLE_MAPS_APIKEY = 'AIzaSyDxMOfz4tvBwnrf8SiZ0CwWawGWMQNExCg';
    const wayPoints = this.state.waypoints
      console.log('waypoints:', wayPoints);


    return (
      <View style={styles.container}>
        <MapView
        style={styles.map}
        region={this.state.position.coordinates}
        onPress={(e, position) => this.addDestination(e.nativeEvent)}
        >

          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            waypoints={wayPoints}
          />
         
          {this.state.markers.map((marker, index) => (
          <MapView.Marker draggable
            key={index}
            coordinate={marker.coordinates}
            title={marker.title}
            description={marker.description}
          />))}
          
        </MapView >
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
});

