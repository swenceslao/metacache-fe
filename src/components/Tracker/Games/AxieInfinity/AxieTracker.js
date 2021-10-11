import React, { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { Line } from 'react-chartjs-2';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TrendingUpTwoToneIcon from '@mui/icons-material/TrendingUpTwoTone';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';

import SLPImage from '../../../../assets/icons/SLP.png';
import GridContainer from './GridContainer';

const data = {
  labels: ['Oct 5', 'Oct 6', 'Oct 7', 'Oct 8', 'Oct 9', 'Oct 10', 'Oct 11'],
  datasets: [
    {
      label: 'SLP daily gains',
      data: [127, 251, 213, 301, 190, 218, 514],
      fill: false,
      backgroundColor: '#76b99c',
      borderColor: '#4e8872',
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
};

const earningsHeaders = [
  'Range', 'SLP', 'Gain %'
];

const earningsRows = [
  ['Yesterday', 514, '22%'],
  ['3 days', 1540, '65%'],
  ['7 days', 1840, '77%'],
];

const AxieTracker = () => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const [showDatepicker, setShowDatepicker] = useState(false);

  const handleSelect = (date) => {
    console.log(date); // native Date object
  };

  const toggleDatePicker = () => {
    setShowDatepicker(!showDatepicker);
  };

  const renderTableMockData = () => (
    <Box width='100%' my={4}>
      <TableContainer>
        <Table aria-label='quick slp stats table' size='small'>
          <TableHead>
            <TableRow>
              {earningsHeaders.map(header => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {earningsRows.map((row, index) => (
              <TableRow key={index}>
                {row.map((cell, index) => (
                  <TableCell key={index}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  return (
      <GridContainer>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Box sx={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: 1,
              }}>
                <Typography variant='h6' component='h6'>
                  Total SLP Balance
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                  <img src={SLPImage} alt='SLP' style={{ maxWidth: 28, maxHeight: 28, paddingRight: 8 }} />
                  <Typography variant='h6' fontWeight='bold'>
                    SLP 2,340
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'flex-start', marginBottom: 4 }}>
                <Typography variant='overline' lineHeight='1.8'>
                  Today's gains
                </Typography>
                <Box sx={{ display: 'flex', color: '#4e8872' }}>
                  <TrendingUpTwoToneIcon sx={{ marginRight: '4px' }} />
                  <Typography mr='4px'>
                    22%
                  </Typography>
                  <Typography>
                    / + SLP 514
                  </Typography>
                </Box>
              </Box>
              <Line data={data} options={options} />
              {/* <Tooltip title='Select date range'>
                <Button size='small' variant='outlined' startIcon={<CalendarTodayTwoToneIcon />}>
                  Daily
                </Button>
              </Tooltip> */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} display='none'>
          <DateRangePicker
            ranges={[dateSelectionRange]}
            onChange={handleSelect}
          />
        </Grid>
      </GridContainer>
  );
};

export default AxieTracker;