import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TrendingUpTwoToneIcon from '@mui/icons-material/TrendingUpTwoTone';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';

import SLPImage from '../../../../assets/icons/SLP.png';
import { PrimaryGridCard } from '../../Common/index';
import { lineChartOptions } from '../../Common/ChartOptions';


const SLPCard = ({ cardTitle, cardData, cardTotalValue, referenceTime, comparisonTime }) => {
  const theme = useTheme();
  const { palette } = theme;

  const data = {
    labels: ['Oct 5', 'Oct 6', 'Oct 7', 'Oct 8', 'Oct 9', 'Oct 10', 'Oct 11'],
    datasets: [
      {
        label: referenceTime,
        data: [127, 251, 213, 301, 190, 218, 514],
        fill: true,
        backgroundColor: '#76b99c66',
        borderColor: '#4e8872',
      },
      {
        label: comparisonTime,
        data: [87, 127, 250, 138, 101, 310, 212],
        fill: false,
        backgroundColor: palette.mode === 'light' ? '#324f4266' : '#d6e7df66',
        borderColor: palette.mode === 'light' ? '#192b24' : '#ffffff88',
      },
    ],
  };

  return (
    <PrimaryGridCard id='total-slp-earnings'>
      <Box sx={{ 
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 1,
      }}>
        <Box sx={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'flex-start', }}>
          <Typography variant='h6' component='h6'>
            {cardTitle}
          </Typography>
          <Typography variant='caption' component='p'>
            {referenceTime}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'flex-end', }}>
          <Box sx={{ display: 'flex', alignItems: 'center', }}>
            <img src={SLPImage} alt='SLP' style={{ maxWidth: 28, maxHeight: 28, paddingRight: 8 }} />
            <Typography variant='h6' fontWeight='bold'>
              {Number(cardTotalValue).toLocaleString('en')} SLP
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
          {`Compared to ${comparisonTime}`}
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
      <Line data={data} options={lineChartOptions} />
    </PrimaryGridCard>
  );
};

SLPCard.defaultProps = {
  cardData: {},
  cardTotalValue: 1000
}

SLPCard.propTypes = {
  cardTitle: PropTypes.string.isRequired,
  cardData: PropTypes.object,
  cardTotalValue: PropTypes.number,
  referenceTime: PropTypes.string.isRequired,
  comparisonTime: PropTypes.string.isRequired,
};

export default SLPCard;