import Box from '@mui/material/Box';

import { DrawerHeader } from './utils';
import NavBar from './NavBar';

const MainContainer = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <NavBar />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default MainContainer;