import React from "react";
import GoogleMapReact from "google-map-react";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";

const Map = ({ setCoordinates, coordinates, places }) => {
  console.log("places", places[0].results.geometry);
  const GOOGLE_APIKEY = process.env.REACT_APP_GOOGLE_API_KEY;
  return (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_APIKEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={10}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(e) => {
          setCoordinates = { lat: e.center.lat, lng: e.center.lng };
        }}
        onChildClick={""}
      >
        <div lat={coordinates.lat} lng={coordinates.lng}>
          {
            <LocationOnOutlinedIcon
              color="primary"
              fontsize="large"
            ></LocationOnOutlinedIcon>
          }
        </div>
        {places?.map((place, i) => (
          <div
            lat={Number(place.results[0].geometry.location.lat)}
            lng={Number(place.results[0].geometry.location.lng)}
            key={i}
          >
            {
              <LocationOnOutlinedIcon
                color="primary"
                fontsize="large"
              ></LocationOnOutlinedIcon>
            }
          </div>
        ))}
      </GoogleMapReact>
    </>
  );
};

export default Map;
