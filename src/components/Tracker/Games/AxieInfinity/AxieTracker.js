import React, { useState, useEffect } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DefinedRange } from 'react-date-range';
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
import Divider from '@mui/material/Divider';
import moment from 'moment';
import { grey } from '@mui/material/colors';

import SLPImage from '../../../../assets/icons/SLP.png';
import GridContainer from './GridContainer';
import { DataTable } from '../../utils';

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

const earningsHeaders = [
  'Range', 'SLP', 'Gain %'
];

const earningsRows = [
  ['Yesterday', 514, '22%'],
  ['3 days', 1540, '65%'],
  ['7 days', 1840, '77%'],
];

const timeframeSelection = [
  'daily', 'weekly', 'biweekly', 'monthly', 'bimonthly', 'quarterly', 'semiannually', 'annually',
];

const AxieTracker = () => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const [showDatepicker, setShowDatepicker] = useState(false);
  const [buttonSelectedTimeframe, setButtonSelectedTimeframe] = useState('daily');
  const [selectedTimeframe, setSelectedTimeframe] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
    autoFocus: true,
  });

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

  const dateRangeButtonPicker = () => {
    return (
      <Box>
        <Tooltip title='Select time frame'>
          <Button 
            size='small' 
            variant='outlined' 
            startIcon={<CalendarTodayTwoToneIcon />}
            onClick={() => setShowDatepicker(!showDatepicker)}
          >
            Daily
          </Button>
        </Tooltip>
      </Box>
    );
  };

  const renderDateRangePicker = () => {
    return (
      <Box sx={{ marginBottom: 4, }} display={ !showDatepicker ? 'none' : 'block' }>
        <DefinedRange
          ranges={[selectedTimeframe]}
          onChange={date => {
            const { selection } = date;
            setSelectedTimeframe(selection);
          }}
        />
      </Box>
    );
  };

  useEffect(() => {
    const startMoment = moment(selectedTimeframe.startDate);
    const endMoment = moment(selectedTimeframe.endDate);
    const duration = moment.duration(endMoment.diff(startMoment)).humanize(true);
    console.log(duration);
  }, [selectedTimeframe]);

  return (
    <>
      <Box mb={4}>
        {dateRangeButtonPicker()}
        {renderDateRangePicker()}
      </Box>
      <GridContainer>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Box sx={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: 1,
              }}>
                <Typography variant='h6' component='h6'>
                  Total SLP Earnings
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                  <img src={SLPImage} alt='SLP' style={{ maxWidth: 28, maxHeight: 28, paddingRight: 8 }} />
                  <Typography variant='h6' fontWeight='bold'>
                    SLP 2,340
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'flex-start', margin: '1rem 0' }}>
                <Typography variant='overline' lineHeight='1.8'>
                  Today's gains
                </Typography>
                <Box sx={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', justifyContent: 'space-between', width: '100%', }}>
                  <Box  sx={{ display: 'flex', color: '#4e8872' }}>
                    <TrendingUpTwoToneIcon sx={{ marginRight: '4px' }} />
                    <Typography mr='4px'>
                      22%
                    </Typography>
                    <Typography>
                      / + SLP 514
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Line data={data} options={options} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ backgroundColor: grey['100'], }}>
            <CardContent>
              <Box sx={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: 1,
              }}>
                <Typography variant='h6' component='h6' fontSize='0.5rem'>
                  Manager SLP
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                  <img src={SLPImage} alt='SLP' style={{ maxWidth: 28, maxHeight: 28, paddingRight: 8 }} />
                  <Typography variant='h6' fontWeight='bold' fontSize='0.5rem'>
                    SLP 1,404
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'flex-start', margin: '1rem 0' }}>
                <Typography variant='overline' lineHeight='1.8'>
                  Today's gains
                </Typography>
                <Box sx={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', justifyContent: 'space-between', width: '100%', }}>
                  <Box  sx={{ display: 'flex', color: '#4e8872' }}>
                    <TrendingUpTwoToneIcon sx={{ marginRight: '4px' }} />
                    <Typography mr='4px'>
                      22%
                    </Typography>
                    <Typography>
                      / + SLP 514
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Line data={data} options={options} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ backgroundColor: grey['100'], }}>
            <CardContent>
              <Box sx={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: 1,
              }}>
                <Typography variant='h6' component='h6' fontSize='1rem'>
                  Scholar SLP
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                  <img src={SLPImage} alt='SLP' style={{ maxWidth: 28, maxHeight: 28, paddingRight: 8 }} />
                  <Typography variant='h6' fontWeight='bold' fontSize='1rem'>
                    SLP 936
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'flex-start', margin: '1rem 0' }}>
                <Typography variant='overline' lineHeight='1.8'>
                  Today's gains
                </Typography>
                <Box sx={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', justifyContent: 'space-between', width: '100%', }}>
                  <Box  sx={{ display: 'flex', color: '#4e8872' }}>
                    <TrendingUpTwoToneIcon sx={{ marginRight: '4px' }} />
                    <Typography mr='4px'>
                      22%
                    </Typography>
                    <Typography>
                      / + SLP 514
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Line data={data} options={options} />
            </CardContent>
          </Card>
        </Grid>
      </GridContainer>
      <Box my={4}>
        <DataTable />
      </Box>
    </>
  );
};

export default AxieTracker;