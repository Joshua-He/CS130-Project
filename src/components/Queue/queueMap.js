import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import {googleMapAPIKey} from '../../configuration';
const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

class QueueLocation extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <LoadScript
              googleMapsApiKey={googleMapAPIKey.apiKey}
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
              >
                { /* Child components, such as markers, info windows, etc. */ }
                <></>
              </GoogleMap>
            </LoadScript>
          )
    }
}

export default QueueLocation;