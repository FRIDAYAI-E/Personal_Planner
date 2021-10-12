import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  ButtonBase,
} from "@material-ui/core";

const PatientDetails = (props) => {
  console.log(props.places.name);
  return (
    <Card elevation={6} onClick={props.handleClick}>
      <CardContent>
        <Typography gutterBottom variant="h5">
          {props.places.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Diagnosis:</Typography>
          <Typography gutterBottom variant="subtitle1">
            {props.places.diagnosis}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Address:</Typography>
          <Typography gutterBottom variant="subtitle1">
            {props.places.address}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Postal Code:</Typography>
          <Typography gutterBottom variant="subtitle1">
            {props.places.postalCode}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PatientDetails;
