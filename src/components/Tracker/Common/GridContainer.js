import React from 'react';
import Grid from '@mui/material/Grid';

const GridContainer = ({ children }) => {
  return (
    <Grid container spacing={2}>
      {children}
    </Grid>
  );
};

export default GridContainer;