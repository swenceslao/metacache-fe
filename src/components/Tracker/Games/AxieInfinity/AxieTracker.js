import React from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Line } from 'react-chartjs-2';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TrendingUpTwoToneIcon from '@mui/icons-material/TrendingUpTwoTone';
import { DateRangePicker } from 'react-date-range';

import SLPImage from '../../../../assets/icons/SLP.png';
import GridContainer from './GridContainer';

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: 'SLP',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const dateSelectionRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
}

const AxieTracker = () => {
  const handleSelect = (date) => {
    console.log(date); // native Date object
  };

  return (
    <GridContainer>
      <Grid item xs={12} sm={6} lg={4}>
        <Card>
          <CardContent>
            <Typography variant='subtitle2'>
              Total SLP Earnings
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', }}>
                <img src={SLPImage} alt='SLP' style={{ maxWidth: 28, maxHeight: 28, paddingRight: 8 }} />
                <Typography variant='h5'>
                  SLP 2,340
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'green', fontSize: '24px' }}>
                <TrendingUpTwoToneIcon sx={{ marginRight: '4px' }} />
                <Typography>
                  22%
                </Typography>
              </Box>
            </Box>
            <Line data={data} options={options} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <DateRangePicker
          ranges={[dateSelectionRange]}
          onChange={handleSelect}
        />
      </Grid>
    </GridContainer>
  );
};

export default AxieTracker;