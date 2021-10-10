import React from 'react';
import { Line } from 'react-chartjs-2';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

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

const AxieTracker = () => {
  return (
    <div>
      Hello! This is the AxieTracker page
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant='h6'>
            SLP Earnings
          </Typography>
          <Line data={data} options={options} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AxieTracker;