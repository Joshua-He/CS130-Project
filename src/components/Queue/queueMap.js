import React from 'react'
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
const containerStyle = {
  width: '19rem',
  height: '19rem'
};

const center = {
  lat: 34.0689,
  lng: -118.4452
};

class QueueLocation extends React.Component {
    constructor(props) {
      super(props);
    }
    render(){
        return (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={14}
              >
              {this.props.lat && this.props.lng && <InfoWindow position={{lat:this.props.lat,lng:this.props.lng}}><div>{this.props.location}</div></InfoWindow>}
              </GoogleMap>
          )
    }
}

export default QueueLocation;