import Box from "@mui/material/Box";

import { DrawerHeader } from "./utils";
import ResponsiveDrawer from "./NavBar";

const MainContainer = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <ResponsiveDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default MainContainer;
