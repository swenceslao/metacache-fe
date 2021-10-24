import React, { useState, useEffect, useCallback } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DefinedRange, defaultStaticRanges } from 'react-date-range';
import { Bar } from 'react-chartjs-2';
import InnerHTML from 'dangerously-set-html-content';
import axios from 'axios';
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
import LinearProgress from '@mui/material/LinearProgress';

import SLPImage from '../../../../assets/icons/SLP.png';
import GridContainer from '../../Common/GridContainer';
import { SLPCard, ScholarsTable } from './index';
import { SecondaryGridCard, SwipeableCards, useScript } from '../../Common/index';
import { lineChartOptions } from '../../Common/ChartOptions';

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
  const { palette } = theme;
  const [data, setData] = useState({});
  const [totalSLPData, setTotalSLPData] = useState({
    cardTitle: 'Total SLP',
    cardTotalValue: 0,
  });
  const [tableLoading, setTableLoading] = useState(0);
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

  const columns = [
    { field: 'date', headerName: 'Date', },
    { field: 'ronin_slp', headerName: 'Ronin SLP', valueFormatter: 'x.toLocaleString("en")', },
    { field: 'in_game_slp', headerName: 'In-game SLP', valueFormatter: 'x.toLocaleString("en")', },
    { field: 'overall_claimed_slp', headerName: 'Claimed SLP', valueFormatter: 'x.toLocaleString("en")', },
    { field: 'total_slp', headerName: 'Total SLP', valueFormatter: 'x.toLocaleString("en")', },
    { field: 'rank', headerName: 'In-game Rank', valueFormatter: '"# " + x.toLocaleString("en")', },
    { field: 'mmr', headerName: 'Current MMR', valueFormatter: 'x.toLocaleString("en")', },
    { field: 'wins', headerName: 'Wins today', valueFormatter: 'x.toLocaleString("en")', },
    { field: 'losses', headerName: 'Losses today', valueFormatter: 'x.toLocaleString("en")', },
    { field: 'draws', headerName: 'Draws today', valueFormatter: 'x.toLocaleString("en")', },
  ];

  const getData = useCallback(async () => {
    try {
      const res = await axios.get('https://api.metacache.app/data/0xac26560d9788f7863b704493125d419246d59cb6/historical', {
        onDownloadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setTableLoading(percentCompleted);
        }
      });
      console.log(res);
      setData(res);
      const { total_slp } = addTotalSLP('total_slp',res.data.daily_data);
      setTotalSLPData({ ...totalSLPData, cardTotalValue: total_slp });
    } catch (error) {
      console.error(error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addTotalSLP = (key, data) => {
    const sum = data.reduce((acc, curr) => ({
      total_slp: acc[key] + curr[key]
    }));
    return sum;
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

  useEffect(() => {
    getData();
  }, [getData]);

  const scriptStatus = useScript('https://widgets.coingecko.com/coingecko-coin-price-marquee-widget.js');
  const priceTickerLight = `
    <div>
      <coingecko-coin-price-marquee-widget coin-ids="ethereum,axie-infinity,smooth-love-potion" currency="usd" background-color="#ffffff" locale="en"></coingecko-coin-price-marquee-widget>          
    </div>
  `;
  const priceTickerDark = `
    <div>
      <coingecko-coin-price-marquee-widget coin-ids="ethereum,axie-infinity,smooth-love-potion" currency="usd" background-color="#121212" locale="en" font-color="#F2F2F2"></coingecko-coin-price-marquee-widget>
    </div>
  `;

  return (
    <>
      {renderModalDatePicker()}
      <Box sx={{ 
        mb: 0, 
        display: 'flex', flexFlow: 'row wrap', 
        alignItems: 'center', 
        justifyContent: 'center',
      }}>
        {scriptStatus === "ready" && (
          <Box sx={{ 
            width: '85vw',
          }}>
            <InnerHTML html={palette.mode === 'light' ? priceTickerLight : priceTickerDark} />
          </Box>
        )}
      </Box>
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
            <SLPCard
              cardTitle={totalSLPData.cardTitle}
              cardTotalValue={totalSLPData.cardTotalValue} 
              referenceTime={buttonSelectedTimeframe[0]} 
              comparisonTime={buttonSelectedTimeframe[1]} 
            />
            <SLPCard
              cardTitle="Manager SLP" 
              referenceTime={buttonSelectedTimeframe[0]} 
              comparisonTime={buttonSelectedTimeframe[1]} 
            />
            <SLPCard
              cardTitle="Scholars SLP" 
              referenceTime={buttonSelectedTimeframe[0]} 
              comparisonTime={buttonSelectedTimeframe[1]} 
            />
          </SwipeableCards>
        }
        <GridContainer>
          {!mobileOnly &&
            <>
              <SLPCard
                cardTitle={totalSLPData.cardTitle}
                cardTotalValue={totalSLPData.cardTotalValue} 
                referenceTime={buttonSelectedTimeframe[0]} 
                comparisonTime={buttonSelectedTimeframe[1]} 
              />
              <SLPCard
                cardTitle="Manager SLP" 
                referenceTime={buttonSelectedTimeframe[0]} 
                comparisonTime={buttonSelectedTimeframe[1]} 
              />
              <SLPCard
                cardTitle="Scholars SLP" 
                referenceTime={buttonSelectedTimeframe[0]} 
                comparisonTime={buttonSelectedTimeframe[1]} 
              />
            </>
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
              <Bar data={topScholarsData} options={lineChartOptions} />
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
              <Bar data={topScholarsData} options={lineChartOptions} />
            </Box>
          </SecondaryGridCard>
        </GridContainer>
      </Box>
      <Divider />
      <Box my={4}>
        <Box display='flex' alignItems='center' justifyContent='space-between' mb={4}>
          {renderSectionTitle('Scholars')}
        </Box>
        {tableLoading < 100 ? 
          <Box sx={{
            width: '50%',
            maxWidth: 800,
            mx: 'auto',
            my: 4,
          }}>
            <LinearProgress /> 
          </Box>
          : 
          <ScholarsTable columns={columns} rows={data} />
        }
        
      </Box>
    </>
  );
};

export default AxieTracker;