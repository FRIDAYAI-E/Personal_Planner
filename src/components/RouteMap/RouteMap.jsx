import * as React from "react";
import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import List from "../List/List";
import patientsData from "../patients";
import Map from "./Map";

function RouteMap() {
  // to be replaced by API in the future
  const [patient, setPatient] = useState([
    {
      name: "Danny Carter",
      diagnosis: "Fever",
      address: "381 Tampines Street 32",
      postalCode: "520381",
    },
  ]);

  const handleClick = (event) => {
    console.log("Clicked", event.currentTarget.value);
  };
  return (
    <>
      <h1>Route of the day</h1>
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List patients={patientsData} handleChange={handleClick} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map patients={patient} />
        </Grid>
      </Grid>
    </>
  );
}

export default RouteMap;
