import * as React from "react";
import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import List from "../List/List";
import patientsData from "../patients";
import Map from "./Map";
import locations from "../Locations";

function RouteMap() {
  //const GOOGLE_APIKEY = process.env.REACT_APP_GOOGLE_API_KEY;
  // to be replaced by API in the future
  let address = [];
  //const [patient, setPatient] = useState([]);
  //const [places, setPlaces] = useState([]);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);

  const handleClick = (event) => {
    console.log("Clicked", event);
    address.push(event.address);
    console.log(address);
  };

  // give the current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  // patientsData.map((element, i) => {
  //   console.log("Patient address", element.address);
  //   return address.push(element.address);
  // });
  // //console.log("Tampines", locations);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       for (let i = 0; i < address.length; i++) {
  //         const res = await fetch(
  //           `https://maps.googleapis.com/maps/api/geocode/json?address=${address[i]}&key=${GOOGLE_APIKEY}`
  //         );
  //         const data = await res.json();
  //         setPlaces([...places, { data }]);
  //         console.log("data saved");
  //         // setPatient([...places, { data }]);
  //       }
  //     } catch (error) {}
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   locations.map((element) => {
  //     setPlaces([element.results]);
  //     return element;
  //   });
  // }, [coordinates]);

  //console.log(places);
  console.log("places", locations);

  return (
    <>
      <h1>Route of the day</h1>
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List patients={patientsData} handleChange={handleClick} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={locations}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default RouteMap;
