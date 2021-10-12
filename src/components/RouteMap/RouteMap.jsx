import * as React from "react";
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import Geocode from "react-geocode";
import { useState, useEffect } from "react";

function RouteMap() {
  const GOOGLE_APIKEY = process.env.REACT_APP_GOOGLE_API_KEY;
  //console.log(GOOGLE_API_KEY);
  Geocode.setApiKey(`${GOOGLE_APIKEY}`);

  const [state, setState] = useState({
    address: "",
    city: "",
    area: "",
    state: "",
    zoom: 15,
    height: 400,
    mapPosition: {
      lat: 0,
      lng: 0,
    },
    markerPosition: {
      lat: 0,
      lng: 0,
    },
  });

  const getCity = (ele) => {
    for (let i = 0; i < ele.length; i++) {
      if (
        ele[i].types[0] &&
        "administrative_area_level_2" === ele[i].types[0]
      ) {
        const city = ele[i].long_name;
        return city;
      }
    }
  };

  const getArea = (addressArray) => {
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            "sublocality_level_1" === addressArray[i].types[j] ||
            "locality" === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };

  const getState = (addressArray) => {
    let state = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_1" === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };

  const onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();
    console.log(newLat, newLng);

    Geocode.fromLatLng(newLat, newLng).then((response) => {
      console.log(response);
      const address = `${response.results[0].formatted_address}`;
      const addressArray = response.results[0].address_components;
      const city = getCity(addressArray);
      const area = getArea(addressArray);
      const state = getState(addressArray);
      console.log("Address", response.results[0].formatted_address);

      setState({
        address,
        city,
        area,
        state,
        zoom: 15,
        height: 400,
        mapPosition: {
          lat: newLat,
          lng: newLng,
        },
        markerPosition: {
          lat: newLat,
          lng: newLng,
        },
      });
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setState(
          {
            mapPosition: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            markerPosition: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          },
          () => {
            Geocode.fromLatLng(
              position.coords.latitude,
              position.coords.longitude
            ).then((response) => {
              console.log("response", response);
              const address = response.results[0].formattedAddress;
              const addressArray = response.results[0].address_components;
              const city = getCity(addressArray);
              const area = getArea(addressArray);
              const state = getState(addressArray);
              console.log("state", state);

              setState({
                address,
                city,
                area,
                state,
                zoom: 15,
                height: 400,
              });
              console.log(state);
            });
          }
        );
      });
    }
  }, []);

  const MapWithAMarker = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{
          lat: state.mapPosition.lat,
          lng: state.mapPosition.lng,
        }}
      >
        <Marker
          draggable={true}
          onDragEnd={onMarkerDragEnd}
          position={{
            lat: state.markerPosition.lat,
            lng: state.markerPosition.lng,
          }}
        >
          <InfoWindow>
            <div>{state.address}</div>
          </InfoWindow>
        </Marker>
      </GoogleMap>
    ))
  );

  return (
    <div style={{ padding: "1rem", margin: "0 auto", maxWidth: 1000 }}>
      <h1>Route of the day</h1>

      <MapWithAMarker
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_APIKEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}

export default RouteMap;
