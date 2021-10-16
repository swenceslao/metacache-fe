import React, { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DefinedRange, defaultStaticRanges } from 'react-date-range';
import { Line, Bar } from 'react-chartjs-2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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
import Divider from '@mui/material/Divider';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';

import SLPImage from '../../../../assets/icons/SLP.png';
import GridContainer from './GridContainer';
import { DataTable, PrimaryGridCard, SecondaryGridCard } from '../../Common/index';

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

const topScholarsData = {
  labels: ['Namey 1', 'Namey 2', 'Namey 3'],
  datasets: [
    {
      label: 'Scholar performance',
      data: [251, 213, 197,],
      fill: false,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
    },
  ],
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
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [buttonSelectedTimeframe, setButtonSelectedTimeframe] = useState('Daily');
  const [selectedTimeframe, setSelectedTimeframe] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
    autoFocus: true,
  });

  const handleDateRangeSelect = ({ selection }) => {
    setSelectedTimeframe(selection);
    const selectedDate = defaultStaticRanges.filter(range => range.isSelected(selection));
    const labelText = selectedDate.length > 0 ? selectedDate[0].label : 'Custom';
    setButtonSelectedTimeframe(labelText);
    setShowDatepicker(false);
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
            onClick={toggleDatePicker}
          >
            {buttonSelectedTimeframe}
          </Button>
        </Tooltip>
      </Box>
    );
  };

  const renderModalDatePicker = () => {
    return (
      <Dialog handleClose={toggleDatePicker} open={showDatepicker}>
        <DialogTitle>Select date range</DialogTitle>
        <DialogContent>
          <DefinedRange
            showSelectionPreview
            ranges={[selectedTimeframe]}
            onChange={handleDateRangeSelect}
          />
        </DialogContent>
      </Dialog>
    );
  };

  const renderSectionTitle = (title) => {
    return (
      <Typography component='h2' variant='h4' fontWeight='bold'>{title}</Typography>
    );
  };

  return (
    <>
      <Box mb={4}>
        <Box display='flex' alignItems='center' justifyContent='space-between' mb={4}>
          {renderSectionTitle('SLP')}
          <Box>
            {dateRangeButtonPicker()}
            {renderModalDatePicker()}
          </Box>
        </Box>
        <GridContainer>
          <PrimaryGridCard id='total-slp-earnings'>
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
          </PrimaryGridCard>
          <SecondaryGridCard id='manager-slp-earnings'>
            <Box sx={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: 1,
            }}>
              <Typography variant='h6' component='h6' fontSize='1rem'>
                Manager SLP
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', }}>
                <img src={SLPImage} alt='SLP' style={{ maxWidth: 28, maxHeight: 28, paddingRight: 8 }} />
                <Typography variant='h6' fontWeight='bold' fontSize='1rem'>
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
          </SecondaryGridCard>
          <SecondaryGridCard id='scholar-slp-earnings'>
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
          </SecondaryGridCard>
          <SecondaryGridCard id='top-3-scholars-slp'>
            <Box sx={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: 1,
            }}>
              <Typography variant='h6' component='h6' fontSize='1rem'>
                Top 3 scholars by SLP
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', }}>
                <img src={SLPImage} alt='SLP' style={{ maxWidth: 28, maxHeight: 28, paddingRight: 8 }} />
              </Box>
            </Box>
            <Divider/>
            <Box mt={4}>
              <Bar data={topScholarsData} options={options} />
            </Box>
          </SecondaryGridCard>
          <SecondaryGridCard id='top-3-scholars-slp'>
            <Box sx={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: 1,
            }}>
              <Typography variant='h6' component='h6' fontSize='1rem'>
                Top 3 scholars by MMR
              </Typography>
            </Box>
            <Divider/>
            <Box mt={4}>
              <Bar data={topScholarsData} options={options} />
            </Box>
          </SecondaryGridCard>
        </GridContainer>
      </Box>
      <Divider />
      <Box my={4}>
        <Box display='flex' alignItems='center' justifyContent='space-between' mb={4}>
          {renderSectionTitle('Scholars')}
        </Box>
        <DataTable />
      </Box>
    </>
  );
};

export default AxieTracker;