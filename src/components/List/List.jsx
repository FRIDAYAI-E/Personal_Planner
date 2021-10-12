import React from "react";
import {
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import PatientDetails from "../PatientDetails/PatientDetails";

function List(props) {
  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        color="black"
        gutterBottom
        align="left"
        style={{ fontWeight: 600 }}
      >
        Patient List
      </Typography>

      <Grid container spacing={3}>
        {props.patients?.map((place, index) => (
          <Grid item key={index} xs={12}>
            <PatientDetails places={place} handleClick={props.handleChange} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default List;
