import React, { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DefinedRange, defaultStaticRanges } from 'react-date-range';
import { Bar } from 'react-chartjs-2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import SLPImage from '../../../../assets/icons/SLP.png';
import ETHImage from '../../../../assets/icons/eth-diamond-purple.png';
import GridContainer from '../../Common/GridContainer';
import { TotalSLPCard } from './index';
import { DataTable, SecondaryGridCard, SwipeableCards } from '../../Common/index';

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

const currencies = [
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
  const theme = useTheme();
  const mobileOnly = useMediaQuery(theme.breakpoints.down('sm'));
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [buttonSelectedTimeframe, setButtonSelectedTimeframe] = useState(dateComparisonMapping.useToday);
  const [currencySelected, setCurrencySelected] = useState(currencies[1].longHand);
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

  const handleCurrencySelect = (event) => {
    setCurrencySelected(event.target.value);
  };

  const toggleDatePicker = () => {
    setShowDatepicker(!showDatepicker);
  };

  const renderCurrencyPicker = () => {
    return (
      <Box mx={1} minWidth={130}>
        <FormControl fullWidth size='small'>
          <InputLabel id="fiat-select-label">Currency</InputLabel>
          <Select
            labelId='fiat-select-label'
            value={currencySelected}
            label='Fiat Currency'
            onChange={handleCurrencySelect}
          >
            {currencies.map(({ shortHand, longHand }, index) => (
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
        width: '100%',
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
            <Typography variant='h6'>
              4,241.88 USD
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', }}>
          <img src={ETHImage} alt='ETH' style={{ maxWidth: 16, maxHeight: 16, paddingRight: 2 }} />
            <Typography variant='subtitle2' mx={1}>
              1 ETH &asymp; 3,812.71 USD
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box my={4} width='100%'>
        <Box display='flex' alignItems='center' justifyContent='space-between' mb={4}>
          <Box>
            {renderSectionTitle('SLP')}
          </Box>
          <Box sx={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', }}>
            {renderCurrencyPicker()}
            {renderDateRangeButtonPicker()}
          </Box>
        </Box>
        {mobileOnly && 
          <SwipeableCards>
            <TotalSLPCard 
              referenceTime={dateComparisonMapping.useToday[0]} 
              comparisonTime={dateComparisonMapping.useToday[1]} 
            />
            <TotalSLPCard 
              referenceTime={dateComparisonMapping.useToday[0]} 
              comparisonTime={dateComparisonMapping.useToday[1]} 
            />
            <TotalSLPCard 
              referenceTime={dateComparisonMapping.useToday[0]} 
              comparisonTime={dateComparisonMapping.useToday[1]} 
            />
          </SwipeableCards>
        }
        <GridContainer>
          {!mobileOnly &&
            <TotalSLPCard 
              referenceTime={dateComparisonMapping.useToday[0]} 
              comparisonTime={dateComparisonMapping.useToday[1]} 
            />
          }
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