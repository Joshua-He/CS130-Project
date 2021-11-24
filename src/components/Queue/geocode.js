import Geocode from "react-geocode";
import {
    googleMapAPIKey
} from '../../configuration';

Geocode.setApiKey(googleMapAPIKey.apiKey);
Geocode.setLanguage("en");
Geocode.setRegion("us");

// Get latitude & longitude from address.
function GetGeocode(address) {
    console.log(address)
    return Geocode.fromAddress(address)
        .then((response) => {
            console.log(response)
            return response.results[0].geometry.location;
        })
}
export default GetGeocode;