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
import Divider from '@mui/material/Divider';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

import SLPImage from '../../../../assets/icons/SLP.png';
import ETHImage from '../../../../assets/icons/eth-diamond-purple.png';
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
  labels: ['Namey 1', 'Namey 2', 'Namey 3', 'Namey 4', 'Namey 5', 'Namey 6', 'Namey 7', 'Namey 8', 'Namey 9', 'Namey 10'],
  datasets: [
    {
      label: 'Scholar performance',
      data: [251, 213, 197, 123, 201, 89, 92, 67, 125, 180],
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

const dateComparisonMapping = {
  useToday: ['Today', 'Yesterday'],
  useYesterday: ['Yesterday', 'Two Days Ago'],
  useThisWeek: ['This Week', 'Two Weeks Ago'],
  useLastWeek: ['Last Week', 'Two Weeks Ago'],
  useThisMonth: ['This Month', 'Two Months Ago'],
  useLastMonth: ['Last Month', 'Two Month Ago'],
  useCustom: ['Custom', 'Custom'],
};

const earningsHeaders = [
  'Range', 'SLP', 'Gain %'
];

const earningsRows = [
  ['Yesterday', 514, '22%'],
  ['3 days', 1540, '65%'],
  ['7 days', 1840, '77%'],
];

const fiatCurrencies = [
  {
    shortHand: 'PHP',
    longHand: 'Philippine Peso',
  },
  {
    shortHand: 'USD',
    longHand: 'US Dollar',
  },
  {
    shortHand: 'VND',
    longHand: 'Vietnamese Dong',
  },
];

const AxieTracker = () => {
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [buttonSelectedTimeframe, setButtonSelectedTimeframe] = useState(dateComparisonMapping.useToday);
  const [fiatCurrencySelected, setFiatCurrencySelected] = useState(fiatCurrencies[1].longHand);
  const [selectedTimeframe, setSelectedTimeframe] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
    autoFocus: true,
  });

  const handleDateRangeSelect = ({ selection }) => {
    setSelectedTimeframe(selection);
    const selectedDate = defaultStaticRanges.filter(range => range.isSelected(selection));
    const reference = selectedDate.length > 0 ? selectedDate[0].label : 'Custom';
    const comparisonKey = `use${reference.replace(/ /g, '')}`;
    setButtonSelectedTimeframe(dateComparisonMapping[comparisonKey]);
    setShowDatepicker(false);
  };

  const handleFiatCurrencySelect = (event) => {
    setFiatCurrencySelected(event.target.value);
  };

  const toggleDatePicker = () => {
    setShowDatepicker(!showDatepicker);
  };

  const renderFiatCurrencyPicker = () => {
    return (
      <Box mx={1} minWidth={130}>
        <FormControl fullWidth size='small'>
          <InputLabel id="fiat-select-label">Fiat Currency</InputLabel>
          <Select
            labelId='fiat-select-label'
            value={fiatCurrencySelected}
            label='Fiat Currency'
            onChange={handleFiatCurrencySelect}
          >
            {fiatCurrencies.map(({ shortHand, longHand }, index) => (
              <MenuItem key={index} value={longHand}>{shortHand}&nbsp;({longHand})</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  };

  const renderDateRangeButtonPicker = () => {
    return (
      <Box mx={1}>
        <Tooltip title='Select time frame'>
          <Button 
            size='small' 
            variant='outlined' 
            startIcon={<CalendarTodayTwoToneIcon />}
            onClick={toggleDatePicker}
          >
            {buttonSelectedTimeframe[0]}
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
      {renderModalDatePicker()}
      <Box sx={{ 
        mb: 4, 
        display: 'flex', flexFlow: 'row wrap', 
        alignItems: 'center', 
        justifyContent: 'space-between',
      }}>
        <Typography component='h1' variant='h4'>Axie Infinity</Typography>
        <Box sx={{ 
          border: 1, borderColor: 'secondary.main', borderRadius: 2,
          p: 1, my: 0.5, 
          width: 'fit-content',
          display: 'flex', flexFlow: 'column nowrap', 
          alignItems: 'center',
          m: {
            xs: '1rem auto 0',
            sm: '0',
          },
        }}>
          <Box sx={{ 
            display: 'flex', alignItems: 'center', 
            borderBottom: 1, borderColor: 'secondary.light',
            mb: 1, pb: 0.5,
          }}>
            <img src={SLPImage} alt='SLP' style={{ maxWidth: 24, maxHeight: 24, paddingRight: 6 }} />
            <Typography variant='h6'>
              1 SLP
            </Typography>
            <Typography variant='h6' mx={1}>
              &asymp;
            </Typography>
            <img src={ETHImage} alt='ETH' style={{ maxWidth: 20, maxHeight: 20, paddingRight: 6 }} />
            <Typography variant='h6'>
              0.000018 ETH
            </Typography>
          </Box>
          <Typography variant='subtitle2' mx={1}>
            1 ETH &asymp; 3,812.71 USD
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box my={4}>
        <Box display='flex' alignItems='center' justifyContent='space-between' mb={4}>
          <Box>
            {renderSectionTitle('SLP')}
          </Box>
          <Box sx={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', }}>
            {renderFiatCurrencyPicker()}
            {renderDateRangeButtonPicker()}
          </Box>
        </Box>
        <GridContainer>
          <PrimaryGridCard id='total-slp-earnings'>
            <Box sx={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: 1,
            }}>
              <Box sx={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'flex-start', }}>
                <Typography variant='h6' component='h6'>
                  Total SLP
                </Typography>
                <Typography variant='caption' component='p'>
                  {buttonSelectedTimeframe[0]}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'flex-end', }}>
                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                  <img src={SLPImage} alt='SLP' style={{ maxWidth: 28, maxHeight: 28, paddingRight: 8 }} />
                  <Typography variant='h6' fontWeight='bold'>
                    2,340 SLP
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                  <Typography variant='caption'>
                    0.042 ETH / 160 USD
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'flex-start', margin: '1rem 0' }}>
              <Typography variant='overline' lineHeight='1.8'>
                {`Compared to ${buttonSelectedTimeframe[1]}`}
              </Typography>
              <Box sx={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', justifyContent: 'space-between', width: '100%', }}>
                <Box  sx={{ display: 'flex', color: '#4e8872' }}>
                  <TrendingUpTwoToneIcon sx={{ marginRight: '4px' }} />
                  <Typography mr='4px'>
                    + 514 SLP
                  </Typography>
                  <Typography mr='4px'>
                    (22%)
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Line data={data} options={options} />
          </PrimaryGridCard>
          <SecondaryGridCard id='top-scholars-slp'>
            <Box sx={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: 1,
            }}>
              <Typography variant='h6' component='h6' fontSize='1rem'>
                Top 10 scholars by SLP
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
          <SecondaryGridCard id='top-scholars-mmr'>
            <Box sx={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: 1,
            }}>
              <Typography variant='h6' component='h6' fontSize='1rem'>
                Top 10 scholars by MMR
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