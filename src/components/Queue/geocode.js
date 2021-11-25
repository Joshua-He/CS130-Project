import Geocode from "react-geocode";
import {
    geoencodingKey
} from '../../configuration';

Geocode.setApiKey(geoencodingKey.apiKey);
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
        .catch((error) => {
            console.log(error)
        })
}
export default GetGeocode;