import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { grey } from '@mui/material/colors';

export const PrimaryGridCard = ({ children }) => {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </Grid>
  );
};

export const SecondaryGridCard = ({ children }) => {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card sx={{ backgroundColor: grey['100'], paddingBottom: 0.8 }}>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </Grid>
  );
};