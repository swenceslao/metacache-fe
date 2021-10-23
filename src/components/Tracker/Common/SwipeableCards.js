import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import MobileStepper from '@mui/material/MobileStepper';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

export const SwipeableCards = ({ children }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = children.length;

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ 
      maxWidth: '88vw', 
      flexGrow: 1, 
      mb: 2,
    }}>
      <Card>
        <BindKeyboardSwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {children.map((card, index) => (
            <div key={index}>
              {card}
            </div>
          ))}
        </BindKeyboardSwipeableViews>
      </Card>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{ flexGrow: 1, justifyContent: 'center', mt: 2, }}
      />
    </Box>
  );
};
